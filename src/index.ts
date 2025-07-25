// src/index.ts
// ─────────────────────────────────────────────────────────────
// Public entry point «crypto‑pro‑plus».
// • Сохраняет API vgoma/crypto‑pro (v2.x): getSystemInfo, createDetachedSignature…
// • Добавляет createTimestampedDetachedSignature (detached + TSP).
// • Экспортирует ensureReady для собственных нужд.
// ─────────────────────────────────────────────────────────────

import { ensureReady, type CADESCertificate } from './api/ensureReady';
import createDetachedSignature from './api/createDetachedSignature';
import createTimestampedDetachedSignature from './api/createTimestampedDetachedSignature';

/* ---------------------------------------------------------------- *\
 *  Глобальный плагин и «константы по ГОСТ» – пригодятся ниже
\* ---------------------------------------------------------------- */
declare global { interface Window { cadesplugin: any } }

const CADES = window.cadesplugin;
const ALG   = CADES.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256;
const ENC   = CADES.CADESCOM_BASE64_TO_BINARY;
const STR   = CADES.CADESCOM_STRING_TO_UCS2LE;

/* ════════════════════════════════
   1.  PUBLIC  API  (совместимый)
   ════════════════════════════════ */

/** Аналог cryptoPro.getSystemInfo() */
export async function getSystemInfo() {
  await CADES;                                           // ждём загрузку плагина
  const about = await CADES.CreateObjectAsync('CAdESCOM.About');
  return {
    pluginVersion: await about.PluginVersion,
    cspVersion:    await about.CSPVersion,
  };
}

/** Аналог cryptoPro.isValidSystemSetup()  (true/false) */
export async function isValidSystemSetup(): Promise<boolean> {
  try {
    await ensureReady();
    return true;
  } catch {
    return false;
  }
}

/** Аналог cryptoPro.createDetachedSignature() */
export { createDetachedSignature };

/**  NEW!  Detached CAdES‑BES  +  TSP‑штамп  */
export { createTimestampedDetachedSignature };

/** Упрощённая attached‑подпись (PKCS#7 внутри данных) */
export async function createAttachedSignature(message: string): Promise<string> {
  const cert: CADESCertificate = await ensureReady();

  const sd = await CADES.CreateObjectAsync('CAdESCOM.CadesSignedData');
  await sd.propset_ContentEncoding(STR);                 // строка → UCS‑2 LE
  await sd.propset_Content(message);

  const signer = await CADES.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);

  /* detached = false → «attached» */
  return await sd.SignCades(signer, CADES.CADESCOM_CADES_BES, /* detached */ false);
}

/** Аналог cryptoPro.createHash() — ГОСТ‑хэш + base64 */
export async function createHash(message: string): Promise<string> {
  await CADES;

  const hd = await CADES.CreateObjectAsync('CAdESCOM.HashedData');
  await hd.propset_Algorithm(ALG);
  await hd.propset_DataEncoding(STR);           // вход – обычная строка
  await hd.propset_SourceData(message);         // считаем хэш

  return await hd.HashValue;                    // base64‑digest
}

/** Deprecated alias (сохраняем совместимость) */
export const createSignature = createDetachedSignature;

/** Utility: run arbitrary code after ensureReady() (совпадает с execute()) */
export async function execute<T>(fn: () => Promise<T> | T): Promise<T> {
  await ensureReady();
  return await fn();
}

/* ════════════════════════════════
   2.  RE‑EXPORTS
   ════════════════════════════════ */
export { ensureReady };
