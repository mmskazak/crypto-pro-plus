# @mmskazak/crypto-pro-plus

📦 Современная обёртка над [CryptoPro CAdES plugin](https://www.cryptopro.ru/products/cades)  
Позволяет удобно работать с сертификатами, получать информацию, подписывать данные (attached/detached) и добавлять метку времени — всё на `async/await`.

---

## 🚀 Установка

```bash
npm install @mmskazak/crypto-pro-plus
```

> ⚠️ Требуется установленный [CryptoPro CSP](https://www.cryptopro.ru/products/csp) и плагин `cadesplugin`.

---

## 🧠 Возможности

* 🔍 Проверка версии плагина
* 📋 Получение списка сертификатов
* 🧾 Получение информации по сертификату
* ✍️ Detached/Attached подпись (CAdES-BES)
* ⏱ Подпись с меткой времени (CAdES-T)
* 👥 Множественные подписи (коллективные, последовательные)
* 🛡️ Контрподписи (заверение подписей)
* ✅ Проверка валидности цифровых подписей (включая множественные подписи)
* 🔐 Создание хешей (SHA-1/256/384/512, ГОСТ Р 34.11-94/2012-256/2012-512)
* ✍️ Подпись хешей любых алгоритмов (detached с поддержкой меток времени)
* 🔄 Конвертация Unicode-строк в корректный base64

---

## 🏗 Модульная структура

Библиотека полностью организована по модульному принципу. Каждый модуль отвечает за свою область функциональности:

```
crypto-pro-plus/
├── src/
│   ├── common.js          # Общие функции (pluginVersion, openCertificateStore)
│   ├── certificates.js    # Работа с сертификатами
│   ├── signing.js         # Подпись данных (attached/detached)
│   ├── multiple-signing.js # Множественные подписи (коллективные, последовательные)
│   ├── hashing.js         # Создание хешей
│   ├── hash-signing.js    # Подпись хешей
│   ├── verification.js    # Проверка подписей
│   ├── countersigning.js  # Контрподписи
│   └── utils.js           # Утилиты (toBase64Unicode)
├── cadesplugin-wrapper.js
└── cadesplugin_api.js
```

### Импорт модулей:

```js
// Работа с сертификатами
import { getCertificates, getCertificateInfo } from '@mmskazak/crypto-pro-plus/certificates';

// Подпись данных
import { signBase64Detached } from '@mmskazak/crypto-pro-plus/signing';

// Создание хешей
import { createSHA256Hash, createGost2012_256Hash } from '@mmskazak/crypto-pro-plus/hashing';

// Подпись хешей
import { signSHA256HashDetached } from '@mmskazak/crypto-pro-plus/hash-signing';

// Проверка подписей
import { verifyDetachedSignature } from '@mmskazak/crypto-pro-plus/verification';

// Множественные подписи
import { coSignBase64, createCollectiveSignature, createWorkflowSignature } from '@mmskazak/crypto-pro-plus/multiple-signing';

// Контрподписи
import { counterSign } from '@mmskazak/crypto-pro-plus/countersigning';

// Утилиты
import { toBase64Unicode } from '@mmskazak/crypto-pro-plus/utils';

// Общие функции
import { pluginVersion } from '@mmskazak/crypto-pro-plus/common';
```

---

## 📘 Примеры

### ✅ Проверка плагина

```js
import { pluginVersion } from '@mmskazak/crypto-pro-plus/common';
import { countCertificates } from '@mmskazak/crypto-pro-plus/certificates';

const version = await pluginVersion();
console.log("Версия плагина:", version);

const count = await countCertificates();
console.log("Сертификатов найдено:", count);
```

---

### 📜 Получение всех сертификатов

```js
import { getCertificates } from '@mmskazak/crypto-pro-plus/certificates';

const certs = await getCertificates();
certs.forEach(cert => {
  console.log(cert.subjectName, cert.thumbprint, cert.validToDate);
});
```

---

### 📄 Информация по сертификату

```js
import { getCertificateByThumbprint, getCertificateInfo } from '@mmskazak/crypto-pro-plus/certificates';

const cert = await getCertificateByThumbprint("DA9142...");
const info = await getCertificateInfo(cert);
console.log(info);
```

---

### ✍️ Detached-подпись (без метки)

```js
import { signBase64Detached } from '@mmskazak/crypto-pro-plus/signing';
import { toBase64Unicode } from '@mmskazak/crypto-pro-plus/utils';

const data = toBase64Unicode("Данные для подписи");
const signature = await signBase64Detached(data, "DA9142...");
console.log(signature);
```

---

### ⏱ Detached-подпись с меткой времени

```js
import { signBase64DetachedWithTimestamp } from '@mmskazak/crypto-pro-plus/signing';

const signature = await signBase64DetachedWithTimestamp(data, "DA9142...", "http://testca.cryptopro.ru/tsp/");
console.log(signature);
```

---

### 📎 Attached-подпись (встроенная)

```js
import { signBase64Attached } from '@mmskazak/crypto-pro-plus/signing';

const signature = await signBase64Attached(data, "DA9142...");
console.log(signature);
```

---

### 📎⏱ Attached-подпись с меткой времени

```js
import { signBase64AttachedWithTimestamp } from '@mmskazak/crypto-pro-plus/signing';

const signature = await signBase64AttachedWithTimestamp(data, "DA9142...", "http://testca.cryptopro.ru/tsp/");
console.log(signature);
```

---

### 🎯 Подпись с выбором сертификата

```js
import { signWithCertificateSelection } from '@mmskazak/crypto-pro-plus/signing';
import { toBase64Unicode } from '@mmskazak/crypto-pro-plus/utils';

const data = toBase64Unicode("Важный документ");

// Пользователю покажется диалог выбора сертификата
const result = await signWithCertificateSelection(
  data, 
  true, // isDetached
  "http://testca.cryptopro.ru/tsp/" // опционально TSP
);

console.log('Подпись:', result.signature);
console.log('Сертификат:', result.certificateInfo.subjectName);
console.log('Предупреждения:', result.certificateInfo.warnings);
```

---

### 🛡️ Безопасное подписание с проверкой

```js
import { signWithValidation, validateCertificateForSigning } from '@mmskazak/crypto-pro-plus/signing';

// Сначала проверим сертификат
const validation = await validateCertificateForSigning("DA9142...");
if (!validation.isValid) {
  console.error('Сертификат недействителен:', validation.reason);
  return;
}

// Подписываем с проверкой
try {
  const result = await signWithValidation(data, "DA9142...", true);
  console.log('Подпись создана:', result.signature);
} catch (error) {
  console.error('Ошибка подписания:', error.message);
}
```

---

### 🔐 Создание хешей

```js
import { 
  createGost2012_256Hash,
  createSHA256Hash,
  createSHA512Hash,
  createHash
} from '@mmskazak/crypto-pro-plus/hashing';
import { toBase64Unicode } from '@mmskazak/crypto-pro-plus/utils';

const data = toBase64Unicode("Данные для хеширования");

// ГОСТ Р 34.11-2012 256 бит
const gost256Hash = await createGost2012_256Hash(data);

// SHA-256
const sha256Hash = await createSHA256Hash(data);

// SHA-512  
const sha512Hash = await createSHA512Hash(data);

// Универсальная функция с любым алгоритмом
import { cadesplugin } from '@mmskazak/crypto-pro-plus/cadesplugin-wrapper';
const customHash = await createHash(data, cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_384);
```

---

### ✍️ Подпись хешей (detached)

```js
import { 
  signGost2012_256HashDetached,
  signSHA256HashDetached,
  signHashDetached
} from '@mmskazak/crypto-pro-plus/hash-signing';

// Подпись ГОСТ-хеша
const gost256Signature = await signGost2012_256HashDetached(gost256Hash, "DA9142...");

// Подпись SHA-256 хеша
const sha256Signature = await signSHA256HashDetached(sha256Hash, "DA9142...");

// Универсальная функция
import { cadesplugin } from '@mmskazak/crypto-pro-plus/cadesplugin-wrapper';
const customSignature = await signHashDetached(
  customHash, 
  "DA9142...", 
  cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_384
);
```

---

### ✍️⏱ Подпись хешей с меткой времени

```js
import { 
  signGost2012_256HashDetachedWithTimestamp,
  signSHA256HashDetachedWithTimestamp,
  signHashDetachedWithTimestamp
} from '@mmskazak/crypto-pro-plus/hash-signing';

// ГОСТ с меткой времени
const gost256Signature = await signGost2012_256HashDetachedWithTimestamp(
  gost256Hash, 
  "DA9142...", 
  "http://testca.cryptopro.ru/tsp/"
);

// SHA-256 с меткой времени
const sha256Signature = await signSHA256HashDetachedWithTimestamp(
  sha256Hash, 
  "DA9142...", 
  "http://testca.cryptopro.ru/tsp/"
);

// Универсальная функция с меткой времени
import { cadesplugin } from '@mmskazak/crypto-pro-plus/cadesplugin-wrapper';
const customSignature = await signHashDetachedWithTimestamp(
  customHash, 
  "DA9142...", 
  cadesplugin.CADESCOM_HASH_ALGORITHM_SHA_384,
  "http://testca.cryptopro.ru/tsp/"
);
```

---

### ✅ Проверка подписей

```js
import { 
  verifyDetachedSignature, 
  verifyAttachedSignature,
  verifyTimestampedSignature,
  getSignersInfo 
} from '@mmskazak/crypto-pro-plus/verification';

// Проверка detached подписи
const isValidDetached = await verifyDetachedSignature(originalData, signature);
console.log('Detached подпись валидна:', isValidDetached);

// Проверка attached подписи
const attachedResult = await verifyAttachedSignature(signedMessage);
console.log('Attached подпись валидна:', attachedResult.isValid);
if (attachedResult.isValid) {
  console.log('Извлеченные данные:', attachedResult.content);
}

// Проверка подписи с меткой времени
const timestampResult = await verifyTimestampedSignature(originalData, signature, true);
console.log('Подпись с меткой времени валидна:', timestampResult.isValid);
if (timestampResult.timestampInfo) {
  console.log('Время подписи:', timestampResult.timestampInfo.signingTime);
}

// Получение информации о всех подписчиках (может быть несколько!)
const signersInfo = await getSignersInfo(signature, true, originalData);
console.log(`Найдено подписчиков: ${signersInfo.length}`);

signersInfo.forEach((signer, index) => {
  console.log(`\n--- Подписчик ${index + 1} ---`);
  console.log('Имя:', signer.subjectName);
  console.log('Издатель сертификата:', signer.issuerName);
  console.log('Отпечаток сертификата:', signer.thumbprint);
  console.log('Время подписи:', signer.signingTime);
  console.log('Сертификат действителен с:', signer.validFromDate);
  console.log('Сертификат действителен до:', signer.validToDate);
});
```

---

### 👥 Множественные подписи

```js
import { 
  coSignBase64,
  coSignBase64WithTimestamp,
  createMultipleSignature,
  createSequentialSignature 
} from '@mmskazak/crypto-pro-plus/multiple-signing';

// Добавление соподписи к существующей подписи
const coSignedData = await coSignBase64(
  originalData,
  existingSignature,
  secondSignerThumbprint,
  true // isDetached
);

// Создание коллективной подписи сразу несколькими подписчиками
const thumbprints = ["cert1_thumbprint", "cert2_thumbprint", "cert3_thumbprint"];
// Коллективная подпись (все подписывают исходные данные одновременно)
const collectiveSignature = await createCollectiveSignature(
  originalData,
  thumbprints,
  true, // isDetached
  "http://testca.cryptopro.ru/tsp/" // опционально TSP для всех
);

// Workflow подпись (цепочка: каждый подписывает результат предыдущего)
const signers = [
  { thumbprint: "manager_cert", tspUrl: "http://testca.cryptopro.ru/tsp/" },
  { thumbprint: "director_cert", tspUrl: "http://testca.cryptopro.ru/tsp/" },
  { thumbprint: "accountant_cert" } // без TSP
];

const workflowResult = await createWorkflowSignature(originalData, signers, true);
console.log('Финальная подпись:', workflowResult.signature);
console.log('История подписания:', workflowResult.history);
```

---

### 🛡️ Контрподписи (заверение подписей)

```js
import { 
  counterSign,
  counterSignBySigner,
  counterSignAll,
  getCounterSignersInfo
} from '@mmskazak/crypto-pro-plus/countersigning';

// Создание контрподписи (заверение первого подписчика)
const counterSignedData = await counterSign(
  existingSignature,
  notaryThumbprint,
  "http://testca.cryptopro.ru/tsp/" // опционально
);

// Контрподпись конкретного подписчика (по индексу)
const counterSignedSpecific = await counterSignBySigner(
  existingSignature,
  notaryThumbprint,
  2, // индекс подписчика
  "http://testca.cryptopro.ru/tsp/"
);

// Контрподпись всех подписчиков
const counterSignedAll = await counterSignAll(
  existingSignature,
  notaryThumbprint,
  "http://testca.cryptopro.ru/tsp/"
);

// Получение информации о контрподписях
const counterSignersInfo = await getCounterSignersInfo(signature, originalData, true);
counterSignersInfo.forEach(info => {
  console.log(`Подписчик: ${info.signerName}`);
  info.counterSignatures.forEach(cs => {
    console.log(`  Заверил: ${cs.counterSignerName} в ${cs.counterSigningTime}`);
  });
});
```

---

## 🔐 Поддерживаемые алгоритмы хеширования

| Алгоритм | Константа | Функции |
|----------|-----------|---------|
| SHA-1 | `CADESCOM_HASH_ALGORITHM_SHA1` | `createSHA1Hash`, `signSHA1HashDetached*` |
| SHA-256 | `CADESCOM_HASH_ALGORITHM_SHA_256` | `createSHA256Hash`, `signSHA256HashDetached*` |
| SHA-384 | `CADESCOM_HASH_ALGORITHM_SHA_384` | `createSHA384Hash`, `signSHA384HashDetached*` |
| SHA-512 | `CADESCOM_HASH_ALGORITHM_SHA_512` | `createSHA512Hash`, `signSHA512HashDetached*` |
| ГОСТ Р 34.11-94 | `CADESCOM_HASH_ALGORITHM_CP_GOST_3411` | `createGost94Hash`, `signGost94HashDetached*` |
| ГОСТ Р 34.11-2012 256 | `CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256` | `createGost2012_256Hash`, `signGost2012_256HashDetached*` |
| ГОСТ Р 34.11-2012 512 | `CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512` | `createGost2012_512Hash`, `signGost2012_512HashDetached*` |

> **Примечание**: `*` означает, что доступны варианты как без метки времени, так и с меткой времени (`WithTimestamp`)



---

## 📌 API

| Метод                                                            | Описание                                                                   |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| pluginVersion()                                                  | Возвращает версию установленного плагина                                   |
| countCertificates()                                              | Считает количество сертификатов в личном хранилище                         |
| getCertificates()                                                | Получает список сертификатов с SubjectName, Thumbprint, сроками и объектом |
| getCertificateByThumbprint(thumbprint)                           | Возвращает объект сертификата по отпечатку                                 |
| getCertificateInfo(cert)                                         | Возвращает подробную информацию о сертификате                              |
| selectCertificateFromDialog(title)                               | Показывает диалог выбора сертификата пользователю                         |
| getValidCertificates()                                           | Получает список всех действующих сертификатов                             |
| validateCertificateForSigning(thumbprint)                       | Проверяет может ли сертификат использоваться для подписания               |
| signBase64Detached(dataBase64, thumbprint)                       | Detached-подпись без метки времени (CAdES-BES)                             |
| signBase64DetachedWithTimestamp(dataBase64, thumbprint, tspUrl)  | Detached-подпись с меткой времени (CAdES-T)                                |
| signBase64Attached(dataBase64, thumbprint)                       | Attached-подпись без метки времени (CAdES-BES)                             |
| signBase64AttachedWithTimestamp(dataBase64, thumbprint, tspUrl)  | Attached-подпись с меткой времени (CAdES-T)                                |
| signWithCertificateSelection(dataBase64, isDetached, tspUrl)     | Подпись с выбором сертификата через диалог                                |
| signWithValidation(dataBase64, thumbprint, isDetached, tspUrl)   | Безопасное подписание с проверкой сертификата                             |

| **Функции хеширования**                                         |                                                                            |
| createHash(dataBase64, algorithm)                               | Универсальная функция создания хеша с любым алгоритмом                     |
| createGost2012_256Hash(dataBase64)                               | Создает ГОСТ-хеш данных (ГОСТ Р 34.11-2012 256 бит)                       |
| createSHA1Hash(dataBase64)                                       | Создает SHA-1 хеш данных                                                  |
| createSHA256Hash(dataBase64)                                     | Создает SHA-256 хеш данных                                                |
| createSHA384Hash(dataBase64)                                     | Создает SHA-384 хеш данных                                                |
| createSHA512Hash(dataBase64)                                     | Создает SHA-512 хеш данных                                                |
| createGost2012_512Hash(dataBase64)                               | Создает ГОСТ Р 34.11-2012 512 бит хеш данных                              |
| createGost94Hash(dataBase64)                                     | Создает ГОСТ Р 34.11-94 хеш данных                                        |
| **Функции подписи хешей**                                       |                                                                            |
| signHashDetached(hashBase64, thumbprint, algorithm)              | Универсальная detached-подпись хеша без метки времени                      |
| signHashDetachedWithTimestamp(hashBase64, thumbprint, algorithm, tspUrl) | Универсальная detached-подпись хеша с меткой времени           |
| signGost2012_256HashDetached(hashBase64, thumbprint)             | Detached-подпись ГОСТ 2012-256 хеша без метки времени (CAdES-BES)          |
| signGost2012_256HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl)| Detached-подпись ГОСТ 2012-256 хеша с меткой времени (CAdES-T)   |
| signSHA1HashDetached(hashBase64, thumbprint)                     | Detached-подпись SHA-1 хеша без метки времени                              |
| signSHA1HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl)| Detached-подпись SHA-1 хеша с меткой времени                               |
| signSHA256HashDetached(hashBase64, thumbprint)                   | Detached-подпись SHA-256 хеша без метки времени                            |
| signSHA256HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl)| Detached-подпись SHA-256 хеша с меткой времени                           |
| signSHA384HashDetached(hashBase64, thumbprint)                   | Detached-подпись SHA-384 хеша без метки времени                            |
| signSHA384HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl)| Detached-подпись SHA-384 хеша с меткой времени                           |
| signSHA512HashDetached(hashBase64, thumbprint)                   | Detached-подпись SHA-512 хеша без метки времени                            |
| signSHA512HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl)| Detached-подпись SHA-512 хеша с меткой времени                           |
| signGost2012_512HashDetached(hashBase64, thumbprint)             | Detached-подпись ГОСТ 2012-512 хеша без метки времени                      |
| signGost2012_512HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl)| Detached-подпись ГОСТ 2012-512 хеша с меткой времени            |
| signGost94HashDetached(hashBase64, thumbprint)                   | Detached-подпись ГОСТ-94 хеша без метки времени                            |
| signGost94HashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl)| Detached-подпись ГОСТ-94 хеша с меткой времени                           |
| **Функции множественных подписей**                              |                                                                            |
| coSignBase64(dataBase64, existingSignature, thumbprint, isDetached) | Добавляет соподпись к существующей подписи                             |
| coSignBase64WithTimestamp(dataBase64, existingSignature, thumbprint, tspUrl, isDetached) | Добавляет соподпись с меткой времени |
| createCollectiveSignature(dataBase64, thumbprints, isDetached, tspUrl) | Создает коллективную подпись (все подписывают исходные данные)    |
| createWorkflowSignature(dataBase64, signers, isDetached)          | Создает workflow подпись (цепочка согласования)                     |
| createMultipleSignature(dataBase64, thumbprints, isDetached, tspUrl) | Алиас для createCollectiveSignature (обратная совместимость)      |
| createSequentialSignature(dataBase64, signers, isDetached)       | Алиас для createWorkflowSignature (обратная совместимость)         |
| **Функции проверки подписей**                                   |                                                                            |
| verifyDetachedSignature(dataBase64, signatureBase64, checkCert)  | Проверяет detached подпись CAdES                                          |
| verifyAttachedSignature(signatureBase64, checkCert)              | Проверяет attached подпись CAdES                                          |
| verifyTimestampedSignature(dataBase64, signatureBase64, isDetached)| Проверяет подпись с меткой времени CAdES-T                               |
| getSignersInfo(signatureBase64, isDetached, dataBase64)          | Получает информацию о всех подписчиках (поддержка множественных подписей) |
| verifySignature(signatureBase64, options)                        | Универсальная функция проверки подписи                                    |
| **Функции контрподписей**                                       |                                                                            |
| counterSign(existingSignature, thumbprint, tspUrl)               | Создает контрподпись (заверение подписи)                                  |
| counterSignBySigner(existingSignature, thumbprint, signerIndex, tspUrl) | Контрподпись конкретного подписчика                              |
| counterSignAll(existingSignature, thumbprint, tspUrl)            | Контрподпись всех подписчиков                                             |
| getCounterSignersInfo(signatureBase64, dataBase64, isDetached)   | Получает информацию о контрподписях                                       |
| **Утилиты**                                                     |                                                                            |
| toBase64Unicode(str)                                             | Кодирует строку в корректный base64 с поддержкой Unicode                   |

---

## 🧑‍💻 Автор

Михаил Мельников — [github.com/mmskazak](https://github.com/mmskazak)

---

## 📜 Лицензия

MIT
