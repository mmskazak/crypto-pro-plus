// src/signing.js
import { cadesplugin } from '../cadesplugin-wrapper.js';
import { getCertificateByThumbprint } from './certificates.js';

export async function signBase64Detached(dataBase64, thumbprint) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await signedData.propset_Content(dataBase64);

  const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_BES, true);
  return signature;
}

export async function signBase64DetachedWithTimestamp(dataBase64, thumbprint, tspUrl) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);
  await signer.propset_CheckCertificate(true); // проверка валидности сертификата
  // Установка адреса TSP-сервера
  await signer.propset_TSAAddress(tspUrl);

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await signedData.propset_Content(dataBase64);

  const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_T, true);
  return signature;
}

export async function signBase64Attached(dataBase64, thumbprint) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await signedData.propset_Content(dataBase64);

  const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_BES, false);
return signature;
}

export async function signBase64AttachedWithTimestamp(dataBase64, thumbprint, tspUrl) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);
  await signer.propset_CheckCertificate(true);
  await signer.propset_TSAAddress(tspUrl);

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await signedData.propset_Content(dataBase64);

  const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_T, false);
  return signature;
}
