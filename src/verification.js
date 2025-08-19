// src/verification.js
import { cadesplugin } from '../cadesplugin-wrapper.js';

/**
 * Проверяет detached подпись CAdES
 * @param {string} dataBase64 - Исходные данные в base64
 * @param {string} signatureBase64 - Подпись в base64
 * @param {boolean} checkCertificate - Проверять ли сертификат (по умолчанию true)
 * @returns {Promise<boolean>} - true если подпись валидна
 */
export async function verifyDetachedSignature(dataBase64, signatureBase64, checkCertificate = true) {
  try {
    await cadesplugin;
    
    const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
    
    // Устанавливаем кодировку содержимого
    await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
    
    // Устанавливаем исходные данные
    await signedData.propset_Content(dataBase64);
    
    // Проверяем detached подпись
    await signedData.VerifyCades(signatureBase64, cadesplugin.CADESCOM_CADES_BES, true);
    
    return true;
  } catch (err) {
    console.error('Ошибка при проверке detached подписи:', err);
    return false;
  }
}

/**
 * Проверяет attached подпись CAdES
 * @param {string} signatureBase64 - Подписанное сообщение в base64
 * @param {boolean} checkCertificate - Проверять ли сертификат (по умолчанию true)
 * @returns {Promise<{isValid: boolean, content?: string}>} - результат проверки и содержимое
 */
export async function verifyAttachedSignature(signatureBase64, checkCertificate = true) {
  try {
    await cadesplugin;
    
    const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
    
    // Проверяем attached подпись (false = attached)
    await signedData.VerifyCades(signatureBase64, cadesplugin.CADESCOM_CADES_BES, false);
    
    // Получаем содержимое из подписи
    const content = await signedData.Content;
    
    return {
      isValid: true,
      content: content
    };
  } catch (err) {
    console.error('Ошибка при проверке attached подписи:', err);
    return {
      isValid: false
    };
  }
}

/**
 * Проверяет подпись с меткой времени CAdES-T
 * @param {string} dataBase64 - Исходные данные в base64 (для detached) или null (для attached)
 * @param {string} signatureBase64 - Подпись в base64
 * @param {boolean} isDetached - true для detached, false для attached
 * @returns {Promise<{isValid: boolean, content?: string, timestampInfo?: object}>}
 */
export async function verifyTimestampedSignature(dataBase64, signatureBase64, isDetached = true) {
  try {
    await cadesplugin;
    
    const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
    
    if (isDetached && dataBase64) {
      // Для detached подписи устанавливаем исходные данные
      await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
      await signedData.propset_Content(dataBase64);
    }
    
    // Проверяем подпись с меткой времени
    await signedData.VerifyCades(signatureBase64, cadesplugin.CADESCOM_CADES_T, isDetached);
    
    const result = {
      isValid: true
    };
    
    // Для attached подписи извлекаем содержимое
    if (!isDetached) {
      result.content = await signedData.Content;
    }
    
    // Получаем информацию о подписчиках (содержит информацию о метке времени)
    try {
      const signers = await signedData.Signers;
      const signersCount = await signers.Count;
      
      if (signersCount > 0) {
        const firstSigner = await signers.Item(1);
        const signingTime = await firstSigner.SigningTime;
        
        result.timestampInfo = {
          signingTime: signingTime,
          signersCount: signersCount
        };
      }
    } catch (timestampErr) {
      console.warn('Не удалось получить информацию о метке времени:', timestampErr);
    }
    
    return result;
  } catch (err) {
    console.error('Ошибка при проверке подписи с меткой времени:', err);
    return {
      isValid: false
    };
  }
}

/**
 * Получает информацию о всех подписчиках из подписи
 * Поддерживает множественные подписи (коллективные, последовательные, контрподписи)
 * @param {string} signatureBase64 - Подпись в base64
 * @param {boolean} isDetached - true для detached, false для attached
 * @param {string} dataBase64 - Исходные данные для detached подписи
 * @returns {Promise<Array>} - массив с информацией о всех подписчиках
 */
export async function getSignersInfo(signatureBase64, isDetached = true, dataBase64 = null) {
  try {
    await cadesplugin;
    
    const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
    
    if (isDetached && dataBase64) {
      await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
      await signedData.propset_Content(dataBase64);
    }
    
    // Проверяем подпись
    await signedData.VerifyCades(signatureBase64, cadesplugin.CADESCOM_CADES_BES, isDetached);
    
    const signers = await signedData.Signers;
    const signersCount = await signers.Count;
    const signersInfo = [];
    
    for (let i = 1; i <= signersCount; i++) {
      const signer = await signers.Item(i);
      const certificate = await signer.Certificate;
      
      const signerInfo = {
        subjectName: await certificate.SubjectName,
        issuerName: await certificate.IssuerName,
        serialNumber: await certificate.SerialNumber,
        thumbprint: await certificate.Thumbprint,
        validFromDate: await certificate.ValidFromDate,
        validToDate: await certificate.ValidToDate,
        signingTime: await signer.SigningTime
      };
      
      signersInfo.push(signerInfo);
    }
    
    return signersInfo;
  } catch (err) {
    console.error('Ошибка при получении информации о подписчиках:', err);
    return [];
  }
}

/**
 * Универсальная функция проверки подписи
 * @param {string} signatureBase64 - Подпись в base64
 * @param {object} options - Опции проверки
 * @param {string} options.data - Исходные данные в base64 (для detached)
 * @param {boolean} options.isDetached - true для detached, false для attached
 * @param {boolean} options.hasTimestamp - true если подпись содержит метку времени
 * @param {boolean} options.checkCertificate - проверять ли сертификат
 * @returns {Promise<object>} - результат проверки
 */
export async function verifySignature(signatureBase64, options = {}) {
  const {
    data = null,
    isDetached = true,
    hasTimestamp = false,
    checkCertificate = true
  } = options;
  
  if (hasTimestamp) {
    return await verifyTimestampedSignature(data, signatureBase64, isDetached);
  } else if (isDetached) {
    const isValid = await verifyDetachedSignature(data, signatureBase64, checkCertificate);
    return { isValid };
  } else {
    return await verifyAttachedSignature(signatureBase64, checkCertificate);
  }
}
