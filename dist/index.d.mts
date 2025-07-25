declare global {
    interface Window {
        cadesplugin: any;
    }
}
type CADESCertificate = any;
/**
 * ensureReady()
 * ‑ ждёт загрузку браузерного плагина/host’а,
 * ‑ проверяет, что в личном хранилище есть хотя бы один сертификат,
 * ‑ возвращает первый найденный сертификат (перед подписью можешь фильтровать).
 *
 * Бросает Error, если что‑то не готово.
 */
declare function ensureReady(): Promise<CADESCertificate>;

declare global {
    interface Window {
        cadesplugin: any;
    }
}
/**
 * Создаёт **detached** CAdES-BES подпись над уже посчитанным ГОСТ-хэшем (в base64).
 *
 * @param hashBase64  ГОТОВЫЙ хэш сообщения в base64
 * @returns           Подпись (PKCS#7) в base64
 *
 * Бросает Error, если плагин/сертификат не готовы.
 */
declare function createDetachedSignature(hashBase64: string): Promise<string>;

declare global {
    interface Window {
        cadesplugin: any;
    }
}
/**
 * Подпись + штамп времени
 *
 * @param hashBase64  ГОТОВЫЙ хэш сообщения (base64)
 * @param tspURL      URL TSA‑сервиса (http/https, RFC 3161)
 * @returns           Detached PKCS#7 (base64) с атрибутом TST
 *
 * Бросает Error, если TSA недоступна или окружение не готово.
 */
declare function createTimestampedDetachedSignature(hashBase64: string, tspURL: string): Promise<string>;

declare global {
    interface Window {
        cadesplugin: any;
    }
}
/**
 * Подписывает текстовое сообщение и возвращает **attached** PKCS #7 (base64).
 *
 * @param message  данные, которые нужно подписать (строка)
 * @returns        base64‑PKCS#7, содержащий и подпись, и сами данные
 *
 * Бросает Error, если плагин/сертификат не готовы.
 */
declare function createAttachedSignature(message: string): Promise<string>;

declare global {
    interface Window {
        cadesplugin: any;
    }
}
/** Аналог cryptoPro.getSystemInfo() */
declare function getSystemInfo(): Promise<{
    pluginVersion: any;
    cspVersion: any;
}>;
/** Аналог cryptoPro.isValidSystemSetup()  (true/false) */
declare function isValidSystemSetup(): Promise<boolean>;

/** Аналог cryptoPro.createHash() — ГОСТ‑хэш + base64 */
declare function createHash(message: string): Promise<string>;
/** Deprecated alias (сохраняем совместимость) */
declare const createSignature: typeof createDetachedSignature;
/** Utility: run arbitrary code after ensureReady() (совпадает с execute()) */
declare function execute<T>(fn: () => Promise<T> | T): Promise<T>;

export { createAttachedSignature, createDetachedSignature, createHash, createSignature, createTimestampedDetachedSignature, ensureReady, execute, getSystemInfo, isValidSystemSetup };
