// src/api/ensureReady.ts
// Мини‑SDK: проверяем, что CryptoPro‑плагин готов к работе
// ─────────────────────────────────────────────────────────

/* Подтягиваем «обёртку» плагина прямо из npm-пакета.
   Она создаст Promise window.cadesplugin.                  */
import "crypto-pro-actual-cades-plugin";

/* Подсказываем TypeScript, что в window появится cadesplugin */
declare global {
  interface Window { cadesplugin: any }
}

export type CADESCertificate = any;        // точных типов нет в публичных d.ts

/**
 * ensureReady()                       
 * ‑ ждёт загрузку браузерного плагина/host’а, 
 * ‑ проверяет, что в личном хранилище есть хотя бы один сертификат,
 * ‑ возвращает первый найденный сертификат (перед подписью можешь фильтровать).
 *
 * Бросает Error, если что‑то не готово.
 */
export async function ensureReady(): Promise<CADESCertificate> {
  await window.cadesplugin;
  const CADES = window.cadesplugin;          // alias, чтобы короче писать

  /* 0. Ждём промис плагина.
        Если расширение/host отсутствуют, Promise так и не resolve — ловим. */
  try {
    await CADES;
  } catch {
    throw new Error("CryptoPro browser‑extension не найдено или не запустилось");
  }

  /* 1. Быстрая диагностика host’а (cadesplugin.exe) */
  const about = await CADES.CreateObjectAsync("CAdESCOM.About");
  const pluginVer: string = await about.PluginVersion;   // «2.0.15400» или пусто
  if (!pluginVer) {
    throw new Error("Native‑host не найден. Установите 'CAdES Browser Plug‑in ≥ 2.0.15400'");
  }

  /* 2. Открываем «Личное» хранилище текущего пользователя */
  const store = await CADES.CreateObjectAsync("CAdESCOM.Store");
  await store.Open(
    CADES.CAPICOM_CURRENT_USER_STORE,          // область — CurrentUser
    CADES.CAPICOM_MY_STORE,                    // имя — «MY» («Personal»)
    CADES.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED   // максимальные права
  );

  /* 3. Достаём коллекцию сертификатов и смотрим, сколько их */
  const certs = await store.Certificates;
  const count: number = await certs.Count;
  if (count === 0) {
    throw new Error("В хранилище нет сертификатов с закрытым ключом");
  }

  /* 4. Берём первый сертификат.
        В рабочем коде лучше фильтровать по отпечатку, Subject, OID и т.д. */
  const cert: CADESCertificate = await certs.Item(1);

  /* 5. Доп. проверка: у выбранного сертификата действительно есть приватный ключ */
  if (!(await cert.HasPrivateKey())) {
    throw new Error("У найденного сертификата отсутствует приватный ключ");
  }

  return cert;                                // ← передаём дальше в подпись
}
   