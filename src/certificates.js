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
