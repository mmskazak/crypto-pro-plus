// src/common.js
import { cadesplugin } from '../cadesplugin-wrapper.js';
import { logger } from './logger.js';

// Вспомогательная функция для открытия хранилища сертификатов
export async function openCertificateStore() {
  await cadesplugin;
  const store = await cadesplugin.CreateObjectAsync('CAdESCOM.Store');
  await store.Open(cadesplugin.CADESCOM_CURRENT_USER_STORE, 'My', cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);
  const certs = await store.Certificates;
  return { store, certs };
}

export async function pluginVersion() {
  // Ожидаем загрузки плагина
  await cadesplugin;
  // Пробуем создать объект "About"
  const about = await cadesplugin.CreateObjectAsync('CAdESCOM.About');
  // Получаем версию плагина
  const version = await about.Version;
  logger.info('Плагин КриптоПро успешно загружен. Версия:', version);
  return version;
}
