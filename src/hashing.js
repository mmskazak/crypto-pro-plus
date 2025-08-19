// src/hashing.js
import { cadesplugin } from '../cadesplugin-wrapper.js';

export async function createHash(dataBase64, algorithm) {
  // Создаем объект для хеширования
  const hashObj = await cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
  
  // Устанавливаем указанный алгоритм хеширования
  await hashObj.propset_Algorithm(algorithm);
  
  // Устанавливаем данные для хеширования (base64)
  await hashObj.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await hashObj.Hash(dataBase64);
  
  // Получаем значение хеша в base64
  const hashValue = await hashObj.Value;
  return hashValue;
}

// Алиасы для популярных алгоритмов хеширования
export async function createSHA1Hash(dataBase64) {
  return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA1);
}

export async function createSHA256Hash(dataBase64) {
  return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_256);
}

export async function createSHA384Hash(dataBase64) {
  return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_384);
}

export async function createSHA512Hash(dataBase64) {
  return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_512);
}

export async function createGost2012_256Hash(dataBase64) {
  return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256);
}

export async function createGost2012_512Hash(dataBase64) {
  return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512);
}

export async function createGost94Hash(dataBase64) {
  return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411);
}


