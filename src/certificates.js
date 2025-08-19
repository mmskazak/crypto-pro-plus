// src/certificates.js
import { cadesplugin } from '../cadesplugin-wrapper.js';
import { openCertificateStore } from './common.js';

export async function countCertificates() {
  try {
    const { store, certs } = await openCertificateStore();
    const count = await certs.Count;
    console.log('Перечисление объектов плагина завершено. Найдено сертификатов:', count);
    await store.Close();
    return count;
  } catch (err) {
    console.error('Ошибка при проверке плагина:', err);
    return null;
  }
}

export async function getCertificateByThumbprint(thumbprint) {
  const { store, certs } = await openCertificateStore();
  const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);

  const count = await foundCerts.Count;
  if (count === 0) {
    await store.Close();
    console.log('Сертификат с указанным отпечатком не найден');
    return null;
  }

  const cert = await foundCerts.Item(1);
  await store.Close();

  return cert;
}

export async function getCertificateInfo(cert) {
  const subjectName = await cert.SubjectName;
  const issuerName = await cert.IssuerName;
  const validFromDate = await cert.ValidFromDate;
  const validToDate = await cert.ValidToDate;
  const thumbprint = await cert.Thumbprint;

  return {
    subjectName,
    issuerName,
    validFromDate,
    validToDate,
    thumbprint,
  };
}

export async function getCertificates() {
  // Открываем хранилище сертификатов
  const { store, certs } = await openCertificateStore();

  // Получаем количество сертификатов
  const count = await certs.Count;

  const result = [];

  // Перебираем каждый сертификат (нумерация с 1, как в COM API)
  for (let i = 1; i <= count; i++) {
      const cert = await certs.Item(i); // Получаем сертификат
      const subjectName = await cert.SubjectName; // Имя владельца
      const thumbprint = await cert.Thumbprint;   // Отпечаток (уникальный идентификатор)
      const validToDate = await cert.ValidToDate; // Дата окончания действия

      // Добавляем данные о сертификате в результирующий массив
      result.push({
          subjectName,
          thumbprint,
          validToDate,
          cert, // сам объект сертификата (на случай, если потребуется дальнейшая работа)
      });
  }

  // Закрываем хранилище сертификатов
  await store.Close();

  // Возвращаем массив сертификатов
  return result;
}

/**
 * Показывает диалог выбора сертификата пользователю
 * @param {string} title - Заголовок диалога (опционально)
 * @returns {Promise<Object|null>} - Выбранный сертификат или null при отмене
 */
export async function selectCertificateFromDialog(title = "Выберите сертификат для подписания") {
  try {
    const { store, certs } = await openCertificateStore();
    
    // Используем встроенный диалог CryptoPro для выбора сертификата
    const selectedCerts = await certs.Select(
      cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED,
      title,
      "Выберите сертификат из списка:",
      false // только один сертификат
    );
    
    await store.Close();
    
    const count = await selectedCerts.Count;
    if (count === 0) {
      console.log('Пользователь отменил выбор сертификата');
      return null;
    }
    
    const selectedCert = await selectedCerts.Item(1);
    const info = await getCertificateInfo(selectedCert);
    
    return {
      cert: selectedCert,
      ...info
    };
    
  } catch (error) {
    console.error('Ошибка при выборе сертификата:', error);
    throw new Error(`Не удалось показать диалог выбора сертификата: ${error.message}`);
  }
}

/**
 * Получает список всех действующих сертификатов с проверкой валидности
 * @returns {Promise<Array>} - Массив действующих сертификатов
 */
export async function getValidCertificates() {
  const allCerts = await getCertificates();
  const validCerts = [];
  
  for (const certInfo of allCerts) {
    try {
      const now = new Date();
      const validTo = new Date(certInfo.validToDate);
      
      // Проверяем срок действия
      if (validTo > now) {
        // Дополнительные проверки можно добавить здесь
        const extendedInfo = await getCertificateInfo(certInfo.cert);
        validCerts.push({
          ...certInfo,
          ...extendedInfo,
          isValid: true,
          daysToExpiry: Math.ceil((validTo - now) / (1000 * 60 * 60 * 24))
        });
      }
    } catch (error) {
      console.warn(`Ошибка при проверке сертификата ${certInfo.thumbprint}:`, error);
    }
  }
  
  return validCerts;
}

/**
 * Проверяет может ли сертификат использоваться для подписания
 * @param {string} thumbprint - Отпечаток сертификата
 * @returns {Promise<{isValid: boolean, reason?: string, details?: Object}>}
 */
export async function validateCertificateForSigning(thumbprint) {
  try {
    const cert = await getCertificateByThumbprint(thumbprint);
    if (!cert) {
      return {
        isValid: false,
        reason: 'Сертификат с указанным отпечатком не найден'
      };
    }
    
    const info = await getCertificateInfo(cert);
    const now = new Date();
    const validTo = new Date(info.validToDate);
    const validFrom = new Date(info.validFromDate);
    
    // Проверка срока действия
    if (now < validFrom) {
      return {
        isValid: false,
        reason: 'Сертификат еще не вступил в силу',
        details: { validFrom: info.validFromDate }
      };
    }
    
    if (now > validTo) {
      return {
        isValid: false,
        reason: 'Срок действия сертификата истек',
        details: { validTo: info.validToDate }
      };
    }
    
    // Проверка что срок не истекает в ближайшие 7 дней (предупреждение)
    const daysToExpiry = Math.ceil((validTo - now) / (1000 * 60 * 60 * 24));
    const warnings = [];
    
    if (daysToExpiry <= 7) {
      warnings.push(`Сертификат истекает через ${daysToExpiry} дней`);
    }
    
    return {
      isValid: true,
      details: {
        subjectName: info.subjectName,
        validTo: info.validToDate,
        daysToExpiry,
        warnings
      }
    };
    
  } catch (error) {
    return {
      isValid: false,
      reason: `Ошибка при проверке сертификата: ${error.message}`
    };
  }
}
