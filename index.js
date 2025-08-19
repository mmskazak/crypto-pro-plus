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

  export async function signGost2012_256HashDetached(hashBase64, thumbprint) {
    const { store, certs } = await openCertificateStore();
    const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await foundCerts.Item(1);
    await store.Close();

    // Создаем объект для хеширования
    const hashObj = await cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
    
    // Устанавливаем алгоритм ГОСТ Р 34.11-2012 256 бит
    await hashObj.propset_Algorithm(cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256);
    
    await hashObj.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
    await hashObj.SetHashValue(hashBase64); // <-- вместо propset_Value

    // Создаем объект подписи
    const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
    await signer.propset_Certificate(cert);

    // Создаем объект для подписанных данных
    const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
    
    // Подписываем хеш
    const signature = await signedData.SignHash(hashObj, signer, cadesplugin.CADESCOM_CADES_BES);
    return signature;
  }

  export async function signGost2012_256HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
    const { store, certs } = await openCertificateStore();
    const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await foundCerts.Item(1);
    await store.Close();
  
    const hashObj = await cadesplugin.CreateObjectAsync("CAdESCOM.HashedData");
    await hashObj.propset_Algorithm(cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256);
    await hashObj.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
    await hashObj.SetHashValue(hashBase64);
  
    const signer = await cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
    await signer.propset_Certificate(cert);
  
    // Ключевая строка: URL службы штампов времени (RFC 3161)
    await signer.propset_TSAAddress(tspUrl); // свой TSA тут
  
    const signedData = await cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
    // Просим сразу CAdES-T (отсоединённая подпись хеша)
    return await signedData.SignHash(hashObj, signer, cadesplugin.CADESCOM_CADES_T);
  }

  // Алиасы для обратной совместимости
  export const signGostHashDetached = signGost2012_256HashDetached;
  export const signGostHashDetachedWithTimestamp = signGost2012_256HashDetachedWithTimestamp;

  export async function createGost2012_256Hash(dataBase64) {
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

  // Алиас для обратной совместимости
  export const createGostHash = createGost2012_256Hash;

  export async function createHash(dataBase64, algorithm) {
    // Создаем объект для хеширования
    const hashObj = await cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
    
    // Устанавливаем указанный алгоритм хеширования
    await hashObj.propset_Algorithm(algorithm);
    
    // Устанавливаем данные для хеширования (base64)
    await hashObj.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
    await hashObj.Hash(dataBase64);
    
    // Получаем значение хеша в base64
    const hashValue = await hashObj.Value;
    return hashValue;
  }

  // Алиасы для популярных алгоритмов хеширования
  export async function createSHA1Hash(dataBase64) {
    return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA1);
  }

  export async function createSHA256Hash(dataBase64) {
    return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_256);
  }

  export async function createSHA384Hash(dataBase64) {
    return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_384);
  }

  export async function createSHA512Hash(dataBase64) {
    return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_512);
  }

  export async function createGost2012_512Hash(dataBase64) {
    return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512);
  }

  export async function createGost94Hash(dataBase64) {
    return createHash(dataBase64, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411);
  }

  export async function signHashDetached(hashBase64, thumbprint, algorithm) {
    const { store, certs } = await openCertificateStore();
    const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await foundCerts.Item(1);
    await store.Close();

    // Создаем объект для хеширования
    const hashObj = await cadesplugin.CreateObjectAsync('CAdESCOM.HashedData');
    
    // Устанавливаем указанный алгоритм хеширования
    await hashObj.propset_Algorithm(algorithm);
    
    await hashObj.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
    await hashObj.SetHashValue(hashBase64);

    // Создаем объект подписи
    const signer = await cadesplugin.CreateObjectAsync('CAdESCOM.CPSigner');
    await signer.propset_Certificate(cert);

    // Создаем объект для подписанных данных
    const signedData = await cadesplugin.CreateObjectAsync('CAdESCOM.CadesSignedData');
    
    // Подписываем хеш
    const signature = await signedData.SignHash(hashObj, signer, cadesplugin.CADESCOM_CADES_BES);
    return signature;
  }

  export async function signHashDetachedWithTimestamp(hashBase64, thumbprint, algorithm, tspUrl) {
    const { store, certs } = await openCertificateStore();
    const foundCerts = await certs.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
    const cert = await foundCerts.Item(1);
    await store.Close();
  
    const hashObj = await cadesplugin.CreateObjectAsync("CAdESCOM.HashedData");
    await hashObj.propset_Algorithm(algorithm);
    await hashObj.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
    await hashObj.SetHashValue(hashBase64);
  
    const signer = await cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
    await signer.propset_Certificate(cert);
    await signer.propset_TSAAddress(tspUrl);
  
    const signedData = await cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
    return await signedData.SignHash(hashObj, signer, cadesplugin.CADESCOM_CADES_T);
  }

  // Алиасы для подписи конкретных типов хешей
  export async function signSHA1HashDetached(hashBase64, thumbprint) {
    return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA1);
  }

  export async function signSHA1HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
    return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA1, tspUrl);
  }

  export async function signSHA256HashDetached(hashBase64, thumbprint) {
    return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_256);
  }

  export async function signSHA256HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
    return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_256, tspUrl);
  }

  export async function signSHA384HashDetached(hashBase64, thumbprint) {
    return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_384);
  }

  export async function signSHA384HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
    return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_384, tspUrl);
  }

  export async function signSHA512HashDetached(hashBase64, thumbprint) {
    return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_512);
  }

  export async function signSHA512HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
    return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_512, tspUrl);
  }

  export async function signGost2012_512HashDetached(hashBase64, thumbprint) {
    return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512);
  }

  export async function signGost2012_512HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
    return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512, tspUrl);
  }

  export async function signGost94HashDetached(hashBase64, thumbprint) {
    return signHashDetached(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411);
  }

  export async function signGost94HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl) {
    return signHashDetachedWithTimestamp(hashBase64, thumbprint, cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411, tspUrl);
  }

  export function toBase64Unicode(str) {
    const utf8Bytes = new TextEncoder().encode(str);
    let binary = '';
    utf8Bytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }
  
