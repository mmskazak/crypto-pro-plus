// src/multiple-signing.js
import { cadesplugin } from '../cadesplugin-wrapper.js';
import { getCertificateByThumbprint } from './certificates.js';
import { 
  signBase64Detached, 
  signBase64DetachedWithTimestamp, 
  signBase64Attached, 
  signBase64AttachedWithTimestamp 
} from './signing.js';

/**
 * Добавляет дополнительную подпись к уже существующей (коллективная подпись)
 * @param {string} dataBase64 - Исходные данные в base64
 * @param {string} existingSignature - Существующая подпись в base64
 * @param {string} thumbprint - Отпечаток сертификата нового подписчика
 * @param {boolean} isDetached - true для detached, false для attached
 * @returns {Promise<string>} - Подпись с добавленным подписчиком
 */
export async function coSignBase64(dataBase64, existingSignature, thumbprint, isDetached = true) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  
  if (isDetached) {
    // Для detached подписи устанавливаем исходные данные
    await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
    await signedData.propset_Content(dataBase64);
  }

  // Проверяем существующую подпись и добавляем новую
  await signedData.VerifyCades(existingSignature, cadesplugin.CADESCOM_CADES_BES, isDetached);
  
  // Добавляем соподпись
  const newSignature = await signedData.CoSignCades(signer, cadesplugin.CADESCOM_CADES_BES);
  return newSignature;
}

/**
 * Добавляет дополнительную подпись с меткой времени к существующей подписи
 * @param {string} dataBase64 - Исходные данные в base64
 * @param {string} existingSignature - Существующая подпись в base64
 * @param {string} thumbprint - Отпечаток сертификата нового подписчика
 * @param {string} tspUrl - URL службы меток времени
 * @param {boolean} isDetached - true для detached, false для attached
 * @returns {Promise<string>} - Подпись с добавленным подписчиком и меткой времени
 */
export async function coSignBase64WithTimestamp(dataBase64, existingSignature, thumbprint, tspUrl, isDetached = true) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);
  await signer.propset_CheckCertificate(true);
  await signer.propset_TSAAddress(tspUrl);

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  
  if (isDetached) {
    await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
    await signedData.propset_Content(dataBase64);
  }

  // Проверяем существующую подпись и добавляем новую с меткой времени
  await signedData.VerifyCades(existingSignature, cadesplugin.CADESCOM_CADES_BES, isDetached);
  
  const newSignature = await signedData.CoSignCades(signer, cadesplugin.CADESCOM_CADES_T);
  return newSignature;
}

/**
 * Создает коллективную подпись несколькими подписчиками одновременно
 * Все подписчики подписывают одни и те же исходные данные
 * @param {string} dataBase64 - Исходные данные в base64
 * @param {Array<string>} thumbprints - Массив отпечатков сертификатов подписчиков
 * @param {boolean} isDetached - true для detached, false для attached
 * @param {string} tspUrl - URL службы меток времени (опционально)
 * @returns {Promise<string>} - Подпись со всеми подписчиками
 */
export async function createCollectiveSignature(dataBase64, thumbprints, isDetached = true, tspUrl = null) {
  if (!thumbprints || thumbprints.length === 0) {
    throw new Error('Необходимо указать хотя бы одного подписчика');
  }

  // Создаем первую подпись
  let signature;
  if (tspUrl) {
    signature = isDetached 
      ? await signBase64DetachedWithTimestamp(dataBase64, thumbprints[0], tspUrl)
      : await signBase64AttachedWithTimestamp(dataBase64, thumbprints[0], tspUrl);
  } else {
    signature = isDetached 
      ? await signBase64Detached(dataBase64, thumbprints[0])
      : await signBase64Attached(dataBase64, thumbprints[0]);
  }

  // Добавляем остальные подписи
  for (let i = 1; i < thumbprints.length; i++) {
    if (tspUrl) {
      signature = await coSignBase64WithTimestamp(dataBase64, signature, thumbprints[i], tspUrl, isDetached);
    } else {
      signature = await coSignBase64(dataBase64, signature, thumbprints[i], isDetached);
    }
  }

  return signature;
}

/**
 * Создает цепочку подписей (каждый подписчик подписывает результат предыдущего)
 * Подходит для документооборота и поэтапного согласования
 * @param {string} initialData - Начальные данные в base64
 * @param {Array<{thumbprint: string, tspUrl?: string}>} signers - Массив подписчиков с опциональными TSP
 * @param {boolean} isDetached - true для detached, false для attached
 * @returns {Promise<{signature: string, history: Array}>} - Финальная подпись и история подписания
 */
export async function createWorkflowSignature(initialData, signers, isDetached = true) {
  if (!signers || signers.length === 0) {
    throw new Error('Необходимо указать хотя бы одного подписчика');
  }

  const history = [];
  let currentData = initialData; // Данные для подписания (меняются на каждом шаге)

  // Последовательное подписание: каждый подписывает результат предыдущего
  for (let i = 0; i < signers.length; i++) {
    const signer = signers[i];
    let newSignature;
    
    if (signer.tspUrl) {
      newSignature = isDetached 
        ? await signBase64DetachedWithTimestamp(currentData, signer.thumbprint, signer.tspUrl)
        : await signBase64AttachedWithTimestamp(currentData, signer.thumbprint, signer.tspUrl);
    } else {
      newSignature = isDetached 
        ? await signBase64Detached(currentData, signer.thumbprint)
        : await signBase64Attached(currentData, signer.thumbprint);
    }

    history.push({
      step: i + 1,
      signer: signer.thumbprint,
      timestamp: new Date().toISOString(),
      hasTSA: !!signer.tspUrl,
      signedData: i === 0 ? 'original_data' : `signature_from_step_${i}`
    });

    // Для следующего шага подписываем уже созданную подпись
    currentData = newSignature;
  }

  return {
    signature: currentData,
    history: history
  };
}

// Алиасы для обратной совместимости
export const createMultipleSignature = createCollectiveSignature;
export const createSequentialSignature = createWorkflowSignature;
