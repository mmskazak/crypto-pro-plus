// src/api/createTimestampedDetachedSignature.ts
// Detached CAdES‑BES подпись + официальный штамп времени (RFC 3161)
//
// Использование:
//   import { createTimestampedDetachedSignature } from '@mikhail/crypto-pro-plus';
//   const pkcs7 = await createTimestampedDetachedSignature(base64Hash, tsaUrl);

import { ensureReady } from "./ensureReady.js";

/* объявляем глоб. плагин для TypeScript */
declare global {
  interface Window { cadesplugin: any }
}

const CADES = window.cadesplugin;
const ALG   = CADES.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256;
const ENC   = CADES.CADESCOM_BASE64_TO_BINARY;

/**
 * Подпись + штамп времени
 *
 * @param hashBase64  ГОТОВЫЙ хэш сообщения (base64)
 * @param tspURL      URL TSA‑сервиса (http/https, RFC 3161)
 * @returns           Detached PKCS#7 (base64) с атрибутом TST
 *
 * Бросает Error, если TSA недоступна или окружение не готово.
 */
export async function createTimestampedDetachedSignature(
  hashBase64: string,
  tspURL: string
): Promise<string> {
  /* 0. Проверяем плагин + берём сертификат */
  const cert = await ensureReady();

  /* 1. Собираем обычную detached‑подпись ============================== */
  const hashObj = await CADES.CreateObjectAsync("CAdESCOM.HashedData");
  await hashObj.propset_Algorithm(ALG);
  await hashObj.propset_DataEncoding(ENC);
  await hashObj.propset_HashValue(hashBase64);

  const signer = await CADES.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(cert);

  const rawSig: string = await hashObj.SignHash(
    signer,
    CADES.CADESCOM_CADES_BES,
    true                               // detached
  );

  /* 2. «Раскрываем» подпись и добавляем штамп времени ================= */
  const sd = await CADES.CreateObjectAsync("CAdESCOM.CadesSignedData");
  await sd.propset_ContentEncoding(ENC);
  await sd.VerifyHash(rawSig);               // связываем объект с подписью

  await sd.AddTimeStamp(tspURL);             // обращение к TSA (может занять ~1 с)

  /* 3. Экспортируем обновлённый PKCS#7 ================================ */
  const finalSig: string = await sd.SignHash(
    /* signer = */ null,  /* reuse исходного   */
    /* CADES type */ 0,   /* same as original */
    /* detached?  */ true
  );

  return finalSig;
}

export default createTimestampedDetachedSignature;
