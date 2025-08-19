// src/hash-signing.js
import { cadesplugin } from '../cadesplugin-wrapper.js';
import { openCertificateStore } from './common.js';

export async function signHashDetached(hashBase64, thumbprint, algorithm) {
  const { store, certs } = await openCertificateStore();
  const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
  const cert = await foundCerts.Item(1);
  await store.Close();

  // Создаем объект для хеширования
  const hashObj = await cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
  
  // Устанавливаем указанный алгоритм хеширования
  await hashObj.propset_Algorithm(algorithm);
  
  await hashObj.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await hashObj.SetHashValue(hashBase64);

  // Создаем объект подписи
  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);

  // Создаем объект для подписанных данных
  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  
  // Подписываем хеш
  const signature = await signedData.SignHash(hashObj, signer, cadesplugin.CADESCOM_CADES_BES);
  return signature;
}

export async function signHashDetachedWithTimestamp(hashBase64, thumbprint, algorithm, tspUrl) {
  const { store, certs } = await openCertificateStore();
  const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
  const cert = await foundCerts.Item(1);
  await store.Close();

  const hashObj = await cadesplugin.CreateObjectAsync("CAdESCOM.HashedData");
  await hashObj.propset_Algorithm(algorithm);
  await hashObj.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await hashObj.SetHashValue(hashBase64);

  const signer = await cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(cert);
  await signer.propset_TSAAddress(tspUrl);

  const signedData = await cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
  return await signedData.SignHash(hashObj, signer, cadesplugin.CADESCOM_CADES_T);
}

// Специализированные функции для ГОСТ 2012-256
export async function signGost2012_256HashDetached(hashBase64, thumbprint) {
  const { store, certs } = await openCertificateStore();
  const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
  const cert = await foundCerts.Item(1);
  await store.Close();

  // Создаем объект для хеширования
  const hashObj = await cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
  
  // Устанавливаем алгоритм ГОСТ Р 34.11-2012 256 бит
  await hashObj.propset_Algorithm(cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256);
  
  await hashObj.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await hashObj.SetHashValue(hashBase64); // <-- вместо propset_Value

  // Создаем объект подписи
  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);

  // Создаем объект для подписанных данных
  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  
  // Подписываем хеш
  const signature = await signedData.SignHash(hashObj, signer, cadesplugin.CADESCOM_CADES_BES);
  return signature;
}

export async function signGost2012_256HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
  return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256, tspUrl);
}



// Алиасы для подписи конкретных типов хешей
export async function signSHA1HashDetached(hashBase64, thumbprint) {
  return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA1);
}

export async function signSHA1HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
  return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA1, tspUrl);
}

export async function signSHA256HashDetached(hashBase64, thumbprint) {
  return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_256);
}

export async function signSHA256HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
  return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_256, tspUrl);
}

export async function signSHA384HashDetached(hashBase64, thumbprint) {
  return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_384);
}

export async function signSHA384HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
  return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_384, tspUrl);
}

export async function signSHA512HashDetached(hashBase64, thumbprint) {
  return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_512);
}

export async function signSHA512HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
  return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_512, tspUrl);
}

export async function signGost2012_512HashDetached(hashBase64, thumbprint) {
  return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512);
}

export async function signGost2012_512HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
  return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512, tspUrl);
}

export async function signGost94HashDetached(hashBase64, thumbprint) {
  return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411);
}

export async function signGost94HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
  return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411, tspUrl);
}
