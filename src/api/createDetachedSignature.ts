// src/api/createDetachedSignature.ts
// Detached CAdES-BES подпись уже **готового base64-хэша**
// Если хочешь подписывать «сырые» данные — хешируй их заранее и передавай сюда base64-хэш.

import { ensureReady } from "./ensureReady.js";

/* Подсказываем TS про глобальный объект, который создаёт cadesplugin_api.js */
declare global {
  interface Window {
    cadesplugin: any;
  }
}

const CADES = window.cadesplugin;

/**
 * Создаёт **detached** CAdES-BES подпись над уже посчитанным ГОСТ-хэшем (в base64).
 *
 * @param hashBase64  ГОТОВЫЙ хэш сообщения в base64
 * @returns           Подпись (PKCS#7) в base64
 *
 * Бросает Error, если плагин/сертификат не готовы.
 */
export async function createDetachedSignature(hashBase64: string): Promise<string> {
  // 1) Убедимся, что плагин жив и у нас есть сертификат с приватным ключом
  const cert = await ensureReady();

  // 2) Настраиваем объект хэша (плагину нужно знать, что это base64 и какой алгоритм)
  const hashObj = await CADES.CreateObjectAsync("CAdESCOM.HashedData");
  await hashObj.propset_Algorithm(CADES.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256);
  await hashObj.propset_DataEncoding(CADES.CADESCOM_BASE64_TO_BINARY);
  await hashObj.propset_HashValue(hashBase64);

  // 3) Готовим подписанта
  const signer = await CADES.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(cert);

  // 4) Выполняем detached-подпись (отдельный PKCS#7 без данных)
  const signature: string = await hashObj.SignHash(
    signer,
    CADES.CADESCOM_CADES_BES, // тип подписи
    true                      // detached = true
  );

  return signature;
}

export default createDetachedSignature;
