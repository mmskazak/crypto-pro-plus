// index.js
import { cadesplugin } from './cadesplugin-wrapper.js'; 

// Вспомогательная функция для открытия хранилища сертификатов
async function openCertificateStore() {
  await cadesplugin;
  const store = await cadesplugin.CreateObjectAsync('CAdESCOM.Store');
  await store.Open(cadesplugin.CADESCOM_CURRENT_USER_STORE, 'My', cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);
  const certs = await store.Certificates;
  return { store, certs };
}

  export async function pluginVersion() {
    try {
      // Ожидаем загрузки плагина
      await cadesplugin;
      // Пробуем создать объект "About"
      const about = await cadesplugin.CreateObjectAsync('CAdESCOM.About');
      // Получаем версию плагина
      const version = await about.Version;
      console.info('Плагин КриптоПро успешно загружен. Версия:', version);
      return version;
    } catch (err) {
      console.error('Ошибка при проверке статуса плагина:', err);
      return null;
    }
  }

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

  export async function signBase64Detached(dataBase64, thumbprint) {
    const { store, certs } = await openCertificateStore();
    const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await foundCerts.Item(1);
    await store.Close();
  
    const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
    await signer.propset_Certificate(cert);
  
    const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
    await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
    await signedData.propset_Content(dataBase64);
  
    const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_BES, true);
    return signature;
  }

  export async function signBase64DetachedWithTimestamp(dataBase64, thumbprint, tspUrl) {
    const { store, certs } = await openCertificateStore();
    const selectedCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await selectedCerts.Item(1);
    await store.Close();
  
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
    const { store, certs } = await openCertificateStore();
    const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await foundCerts.Item(1);
    await store.Close();

    const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
    await signer.propset_Certificate(cert);

    const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
    await signedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
    await signedData.propset_Content(dataBase64);

    const signature = await signedData.SignCades(signer, cadesplugin.CADESCOM_CADES_BES, false);
  return signature;
  }

  export async function signBase64AttachedWithTimestamp(dataBase64, thumbprint, tspUrl) {
    const { store, certs } = await openCertificateStore();
    const selectedCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await selectedCerts.Item(1);
    await store.Close();

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

  export async function signGostHashDetached(hashBase64, thumbprint, hashedAlgorithm) {
    const { store, certs } = await openCertificateStore();
    const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await foundCerts.Item(1);
    await store.Close();

    // Создаем необходимые объекты
    const cadesHashedData = await cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
    const cadesSignedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
    const cadesSigner = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');

    // Создаем атрибут времени подписи
    const cadesAttrs = await cadesplugin.CreateObjectAsync('CADESCOM.CPAttribute');
    const currentTime = new Date();

    try {
      // Устанавливаем атрибут времени подписи
      await cadesAttrs.propset_Name(cadesplugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);
      await cadesAttrs.propset_Value(currentTime);

      // Настраиваем signer
      await cadesSigner.propset_Certificate(cert);
      const cadesAuthAttrs = await cadesSigner.AuthenticatedAttributes2;
      await cadesAuthAttrs.Add(cadesAttrs);
      await cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN);

      // Настраиваем хеш
      const algorithm = hashedAlgorithm || cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256;
      await cadesHashedData.propset_Algorithm(algorithm);
      await cadesHashedData.SetHashValue(hashBase64);

      // Подписываем хеш (используем PKCS7_TYPE как в референсе)
      const signature = await cadesSignedData.SignHash(cadesHashedData, cadesSigner, cadesplugin.CADESCOM_PKCS7_TYPE);
      return signature;

    } catch (error) {
      console.error('Ошибка при подписании хеша:', error);
      throw new Error(`Ошибка при подписании хеша: ${error.message}`);
    }
  }

  export async function signGostHashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl, hashedAlgorithm) {
    const { store, certs } = await openCertificateStore();
    const selectedCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await selectedCerts.Item(1);
    await store.Close();

    // Создаем необходимые объекты
    const cadesHashedData = await cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
    const cadesSignedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
    const cadesSigner = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');

    // Создаем атрибут времени подписи
    const cadesAttrs = await cadesplugin.CreateObjectAsync('CADESCOM.CPAttribute');
    const currentTime = new Date();

    try {
      // Устанавливаем атрибут времени подписи
      await cadesAttrs.propset_Name(cadesplugin.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME);
      await cadesAttrs.propset_Value(currentTime);

      // Настраиваем signer с TSP
      await cadesSigner.propset_Certificate(cert);
      await cadesSigner.propset_CheckCertificate(true);
      await cadesSigner.propset_TSAAddress(tspUrl);
      
      const cadesAuthAttrs = await cadesSigner.AuthenticatedAttributes2;
      await cadesAuthAttrs.Add(cadesAttrs);
      await cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN);

      // Настраиваем хеш
      const algorithm = hashedAlgorithm || cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256;
      await cadesHashedData.propset_Algorithm(algorithm);
      await cadesHashedData.SetHashValue(hashBase64);

      // Подписываем хеш с временной меткой (используем CADES_T для TSP)
      const signature = await cadesSignedData.SignHash(cadesHashedData, cadesSigner, cadesplugin.CADESCOM_CADES_T);
      return signature;

    } catch (error) {
      console.error('Ошибка при подписании хеша с временной меткой:', error);
      throw new Error(`Ошибка при подписании хеша с временной меткой: ${error.message}`);
    }
  }

  export async function signGostHashDetachedLowLevel(hashBase64, thumbprint) {
    // Альтернативный метод через CAPICOM (для случаев когда CAdESCOM не работает)
    const { store, certs } = await openCertificateStore();
    const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await foundCerts.Item(1);
    await store.Close();

    try {
      // Используем CAPICOM.Signer для низкоуровневой подписи
      const signer = await cadesplugin.CreateObjectAsync('CAPICOM.Signer');
      await signer.propset_Certificate(cert);
      
      // Создаем SignedData объект
      const signedData = await cadesplugin.CreateObjectAsync('CAPICOM.SignedData');
      
      // Конвертируем base64 хеш в бинарные данные и устанавливаем как контент
      await signedData.propset_Content(hashBase64);
      
      // Подписываем как detached
      const signature = await signedData.Sign(signer, true, cadesplugin.CAPICOM_ENCODE_BASE64);
      return signature;
    } catch (error) {
      throw new Error(`Все методы подписания хеша не удались. Последняя ошибка: ${error.message}`);
    }
  }

  export async function signGostHashDetachedSimple(hashBase64, thumbprint, hashedAlgorithm) {
    // Упрощенная версия без authenticated attributes (если основная не работает)
    const { store, certs } = await openCertificateStore();
    const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await foundCerts.Item(1);
    await store.Close();

    try {
      // Создаем необходимые объекты
      const cadesHashedData = await cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
      const cadesSignedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
      const cadesSigner = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');

      // Настраиваем signer (без authenticated attributes)
      await cadesSigner.propset_Certificate(cert);
      await cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN);

      // Настраиваем хеш
      const algorithm = hashedAlgorithm || cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256;
      await cadesHashedData.propset_Algorithm(algorithm);
      await cadesHashedData.SetHashValue(hashBase64);

      // Подписываем хеш
      const signature = await cadesSignedData.SignHash(cadesHashedData, cadesSigner, cadesplugin.CADESCOM_PKCS7_TYPE);
      return signature;

    } catch (error) {
      console.error('Ошибка при простом подписании хеша:', error);
      throw new Error(`Ошибка при простом подписании хеша: ${error.message}`);
    }
  }

  export async function createGostHash(dataBase64) {
    // Создаем объект для хеширования
    const hashObj = await cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
    
    // Устанавливаем алгоритм ГОСТ Р 34.11-2012 256 бит
    await hashObj.propset_Algorithm(cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256);
    
    // Устанавливаем данные для хеширования (base64)
    await hashObj.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
    await hashObj.Hash(dataBase64);
    
    // Получаем значение хеша в base64
    const hashValue = await hashObj.Value;
    return hashValue;
  }

  export function toBase64Unicode(str) {
    const utf8Bytes = new TextEncoder().encode(str);
    let binary = '';
    utf8Bytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }
  
