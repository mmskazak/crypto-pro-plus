// src/countersigning.js
import { cadesplugin } from '../cadesplugin-wrapper.js';
import { getCertificateByThumbprint } from './certificates.js';

/**
 * Создает контрподпись (подписывает существующую подпись)
 * @param {string} existingSignature - Существующая подпись в base64
 * @param {string} thumbprint - Отпечаток сертификата для контрподписи
 * @param {string} tspUrl - URL службы меток времени (опционально)
 * @returns {Promise<string>} - Подпись с контрподписью
 */
export async function counterSign(existingSignature, thumbprint, tspUrl = null) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);
  
  if (tspUrl) {
    await signer.propset_CheckCertificate(true);
    await signer.propset_TSAAddress(tspUrl);
  }

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  
  // Загружаем существующую подпись
  await signedData.VerifyCades(existingSignature, cadesplugin.CADESCOM_CADES_BES, true);
  
  // Получаем подписчиков из существующей подписи
  const signers = await signedData.Signers;
  const signersCount = await signers.Count;
  
  if (signersCount === 0) {
    throw new Error('В подписи не найдено подписчиков для контрподписи');
  }
  
  // Берем первого подписчика для контрподписи
  const targetSigner = await signers.Item(1);
  
  // Создаем контрподпись
  const counterSignatureType = tspUrl ? cadesplugin.CADESCOM_CADES_T : cadesplugin.CADESCOM_CADES_BES;
  const counterSignature = await targetSigner.CounterSign(signer, counterSignatureType);
  
  return counterSignature;
}

/**
 * Создает контрподпись для конкретного подписчика (по индексу)
 * @param {string} existingSignature - Существующая подпись в base64
 * @param {string} thumbprint - Отпечаток сертификата для контрподписи
 * @param {number} signerIndex - Индекс подписчика (начиная с 1)
 * @param {string} tspUrl - URL службы меток времени (опционально)
 * @returns {Promise<string>} - Подпись с контрподписью
 */
export async function counterSignBySigner(existingSignature, thumbprint, signerIndex, tspUrl = null) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);
  
  if (tspUrl) {
    await signer.propset_CheckCertificate(true);
    await signer.propset_TSAAddress(tspUrl);
  }

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  
  // Загружаем существующую подпись
  await signedData.VerifyCades(existingSignature, cadesplugin.CADESCOM_CADES_BES, true);
  
  // Получаем подписчиков
  const signers = await signedData.Signers;
  const signersCount = await signers.Count;
  
  if (signerIndex < 1 || signerIndex > signersCount) {
    throw new Error(`Неверный индекс подписчика. Доступно: 1-${signersCount}, указан: ${signerIndex}`);
  }
  
  // Берем нужного подписчика
  const targetSigner = await signers.Item(signerIndex);
  
  // Создаем контрподпись
  const counterSignatureType = tspUrl ? cadesplugin.CADESCOM_CADES_T : cadesplugin.CADESCOM_CADES_BES;
  const counterSignature = await targetSigner.CounterSign(signer, counterSignatureType);
  
  return counterSignature;
}

/**
 * Создает контрподписи для всех подписчиков в подписи
 * @param {string} existingSignature - Существующая подпись в base64
 * @param {string} thumbprint - Отпечаток сертификата для контрподписи
 * @param {string} tspUrl - URL службы меток времени (опционально)
 * @returns {Promise<string>} - Подпись с контрподписями для всех подписчиков
 */
export async function counterSignAll(existingSignature, thumbprint, tspUrl = null) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);
  
  if (tspUrl) {
    await signer.propset_CheckCertificate(true);
    await signer.propset_TSAAddress(tspUrl);
  }

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  
  // Загружаем существующую подпись
  await signedData.VerifyCades(existingSignature, cadesplugin.CADESCOM_CADES_BES, true);
  
  // Получаем подписчиков
  const signers = await signedData.Signers;
  const signersCount = await signers.Count;
  
  if (signersCount === 0) {
    throw new Error('В подписи не найдено подписчиков для контрподписи');
  }

  let resultSignature = existingSignature;
  const counterSignatureType = tspUrl ? cadesplugin.CADESCOM_CADES_T : cadesplugin.CADESCOM_CADES_BES;
  
  // Создаем контрподписи для всех подписчиков
  for (let i = 1; i <= signersCount; i++) {
    const targetSigner = await signers.Item(i);
    resultSignature = await targetSigner.CounterSign(signer, counterSignatureType);
  }
  
  return resultSignature;
}

/**
 * Проверяет наличие контрподписей в подписи
 * @param {string} signatureBase64 - Подпись в base64
 * @param {string} dataBase64 - Исходные данные (для detached подписи)
 * @param {boolean} isDetached - true для detached, false для attached
 * @returns {Promise<Array>} - Информация о контрподписях
 */
export async function getCounterSignersInfo(signatureBase64, dataBase64 = null, isDetached = true) {
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
    const counterSignersInfo = [];
    
    for (let i = 1; i <= signersCount; i++) {
      const signer = await signers.Item(i);
      
      try {
        // Проверяем наличие контрподписей у данного подписчика
        const counterSigners = await signer.CounterSigners;
        const counterSignersCount = await counterSigners.Count;
        
        if (counterSignersCount > 0) {
          const signerCert = await signer.Certificate;
          const signerInfo = {
            signerIndex: i,
            signerName: await signerCert.SubjectName,
            signerThumbprint: await signerCert.Thumbprint,
            counterSignatures: []
          };
          
          for (let j = 1; j <= counterSignersCount; j++) {
            const counterSigner = await counterSigners.Item(j);
            const counterCert = await counterSigner.Certificate;
            
            signerInfo.counterSignatures.push({
              counterSignerName: await counterCert.SubjectName,
              counterSignerThumbprint: await counterCert.Thumbprint,
              counterSigningTime: await counterSigner.SigningTime
            });
          }
          
          counterSignersInfo.push(signerInfo);
        }
      } catch (err) {
        // У данного подписчика нет контрподписей
        continue;
      }
    }
    
    return counterSignersInfo;
  } catch (err) {
    console.error('Ошибка при получении информации о контрподписчиках:', err);
    return [];
  }
}
