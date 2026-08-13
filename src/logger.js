// src/logger.js
const noop = () => {};

const silentLogger = {
  debug: noop,
  info: noop,
  warn: noop,
  error: noop,
};

const consoleLogger = {
  debug: (...args) => console.debug(...args),
  info: (...args) => console.info(...args),
  warn: (...args) => console.warn(...args),
  error: (...args) => console.error(...args),
};

export const logger = { ...consoleLogger };

/**
 * Подменяет логгер библиотеки.
 * @param {object|null} customLogger - Объект с методами debug/info/warn/error.
 *   Передайте null, чтобы полностью отключить вывод, или не передавайте ничего,
 *   чтобы вернуть логирование в console (поведение по умолчанию).
 *   Можно переопределить только часть методов — остальные останутся дефолтными.
 */
export function setLogger(customLogger) {
  if (customLogger === null) {
    Object.assign(logger, silentLogger);
    return;
  }
  Object.assign(logger, consoleLogger, customLogger ?? {});
}
