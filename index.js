// index.js
import { cadesplugin } from "./cadesplugin-wrapper.js";

export async function getCertificates() {
  const store = await cadesplugin.CreateObjectAsync("CAdESCOM.Store");
  await store.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

  const certs = await store.Certificates;
  const count = await certs.Count;
  const result = [];

  for (let i = 1; i <= count; i++) {
    const cert = await certs.Item(i);
    const hasPrivateKey = await cert.HasPrivateKey();
    if (!hasPrivateKey) continue;

    const subjectName = await cert.SubjectName;
    const thumbprint = await cert.Thumbprint;

    result.push({ subjectName, thumbprint });
  }

  await store.Close();
  return result;
}

export function toBase64Unicode(str) {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = "";
  utf8Bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

export async function signSimple(base64Data, thumbprint) {
  const store = await cadesplugin.CreateObjectAsync("CAdESCOM.Store");
  await store.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

  const certs = await store.Certificates;
  const cert = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
  const signer = await cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(await cert.Item(1));
  await signer.propset_CheckCertificate(false);
  await signer.propset_Options(cadesplugin.CADESCOM_AllowUntrustedCertificate);

  const signedData = await cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
  await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await signedData.propset_Content(base64Data);

  const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_BES);
  await store.Close();
  return signature;
}

export async function signWithTimestamp(base64Data, thumbprint, tspUrl) {
  const store = await cadesplugin.CreateObjectAsync("CAdESCOM.Store");
  await store.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

  const certs = await store.Certificates;
  const cert = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
  const signer = await cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(await cert.Item(1));
  await signer.propset_CheckCertificate(false);
  await signer.propset_Options(
    cadesplugin.CADESCOM_AllowUntrustedCertificate |
    cadesplugin.CADESCOM_AllowNoOutstandingRequest |
    cadesplugin.CADESCOM_AllowUntrustedRoot
  );
  await signer.propset_TSAAddress(tspUrl);

  const signedData = await cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
  await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await signedData.propset_Content(base64Data);

  const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_T);
  await store.Close();
  return signature;
}
