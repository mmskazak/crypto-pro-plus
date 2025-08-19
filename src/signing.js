// src/signing.js
import { cadesplugin } from '../cadesplugin-wrapper.js';
import { getCertificateByThumbprint, selectCertificateFromDialog, validateCertificateForSigning } from './certificates.js';

export async function signBase64Detached(dataBase64, thumbprint) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await signedData.propset_Content(dataBase64);

  const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_BES, true);
  return signature;
}

export async function signBase64DetachedWithTimestamp(dataBase64, thumbprint, tspUrl) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);
  await signer.propset_CheckCertificate(true); // проверка валидности сертификата
  // Установка адреса TSP-сервера
  await signer.propset_TSAAddress(tspUrl);

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await signedData.propset_Content(dataBase64);

  const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_T, true);
  return signature;
}

export async function signBase64Attached(dataBase64, thumbprint) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await signedData.propset_Content(dataBase64);

  const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_BES, false);
return signature;
}

export async function signBase64AttachedWithTimestamp(dataBase64, thumbprint, tspUrl) {
  const cert = await getCertificateByThumbprint(thumbprint);
  if (!cert) {
    throw new Error('Сертификат с указанным отпечатком не найден');
  }

  const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
  await signer.propset_Certificate(cert);
  await signer.propset_CheckCertificate(true);
  await signer.propset_TSAAddress(tspUrl);

  const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
  await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
  await signedData.propset_Content(dataBase64);

  const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_T, false);
  return signature;
}

/**
 * Подписывает данные с выбором сертификата через диалог
 * @param {string} dataBase64 - Данные для подписи в base64
 * @param {boolean} isDetached - true для detached, false для attached
 * @param {string} tspUrl - URL TSP сервера (опционально)
 * @returns {Promise<{signature: string, certificateInfo: Object}>}
 */
export async function signWithCertificateSelection(dataBase64, isDetached = true, tspUrl = null) {
  // Показываем диалог выбора сертификата
  const selectedCert = await selectCertificateFromDialog("Выберите сертификат для подписания документа");
  
  if (!selectedCert) {
    throw new Error('Подписание отменено пользователем');
  }
  
  // Проверяем валидность выбранного сертификата
  const validation = await validateCertificateForSigning(selectedCert.thumbprint);
  
  if (!validation.isValid) {
    throw new Error(`Выбранный сертификат не может быть использован для подписания: ${validation.reason}`);
  }
  
  // Показываем предупреждения, если есть
  if (validation.details?.warnings?.length > 0) {
    console.warn('Предупреждения по сертификату:', validation.details.warnings);
  }
  
  // Выполняем подписание
  let signature;
  if (tspUrl) {
    signature = isDetached 
      ? await signBase64DetachedWithTimestamp(dataBase64, selectedCert.thumbprint, tspUrl)
      : await signBase64AttachedWithTimestamp(dataBase64, selectedCert.thumbprint, tspUrl);
  } else {
    signature = isDetached 
      ? await signBase64Detached(dataBase64, selectedCert.thumbprint)
      : await signBase64Attached(dataBase64, selectedCert.thumbprint);
  }
  
  return {
    signature,
    certificateInfo: {
      thumbprint: selectedCert.thumbprint,
      subjectName: selectedCert.subjectName,
      validTo: selectedCert.validToDate,
      warnings: validation.details?.warnings || []
    }
  };
}

/**
 * Безопасное подписание с проверкой сертификата
 * @param {string} dataBase64 - Данные для подписи в base64
 * @param {string} thumbprint - Отпечаток сертификата
 * @param {boolean} isDetached - true для detached, false для attached
 * @param {string} tspUrl - URL TSP сервера (опционально)
 * @returns {Promise<{signature: string, validation: Object}>}
 */
export async function signWithValidation(dataBase64, thumbprint, isDetached = true, tspUrl = null) {
  // Сначала проверяем сертификат
  const validation = await validateCertificateForSigning(thumbprint);
  
  if (!validation.isValid) {
    throw new Error(`Сертификат не может быть использован: ${validation.reason}`);
  }
  
  // Показываем предупреждения
  if (validation.details?.warnings?.length > 0) {
    console.warn('Предупреждения по сертификату:', validation.details.warnings);
  }
  
  // Выполняем подписание
  let signature;
  if (tspUrl) {
    signature = isDetached 
      ? await signBase64DetachedWithTimestamp(dataBase64, thumbprint, tspUrl)
      : await signBase64AttachedWithTimestamp(dataBase64, thumbprint, tspUrl);
  } else {
    signature = isDetached 
      ? await signBase64Detached(dataBase64, thumbprint)
      : await signBase64Attached(dataBase64, thumbprint);
  }
  
  return {
    signature,
    validation
  };
}
