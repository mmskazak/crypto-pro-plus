// src/api/createAttachedSignature.ts
// Формирует **attached** CAdES‑BES: подпись + данные в одном PKCS#7.

import { ensureReady, type CADESCertificate } from "./ensureReady";

// объявляем глобальный объект плагина для TS
declare global { interface Window { cadesplugin: any } }

const CADES = window.cadesplugin;
const ALG   = CADES.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256;
const ENC_STR = CADES.CADESCOM_STRING_TO_UCS2LE;       // вход = обычная строка

/**
 * Подписывает текстовое сообщение и возвращает **attached** PKCS #7 (base64).
 *
 * @param message  данные, которые нужно подписать (строка)
 * @returns        base64‑PKCS#7, содержащий и подпись, и сами данные
 *
 * Бросает Error, если плагин/сертификат не готовы.
 */
export default async function createAttachedSignature(
  message: string
): Promise<string> {
  // 0. Проверяем окружение, берём действующий сертификат
  const cert: CADESCertificate = await ensureReady();

  // 1. Создаём объект CadesSignedData и кладём туда контент
  const sd = await CADES.CreateObjectAsync("CAdESCOM.CadesSignedData");
  await sd.propset_ContentEncoding(ENC_STR);           // сообщение → UCS‑2 LE
  await sd.propset_Content(message);

  // 2. Готовим подписанта
  const signer = await CADES.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(cert);

  // 3. Подписываем — detached=false  ⇒  attached PKCS#7
  const signature: string = await sd.SignCades(
    signer,
    CADES.CADESCOM_CADES_BES,  // тип подписи
    /* detached = */ false
  );

  return signature;
}
