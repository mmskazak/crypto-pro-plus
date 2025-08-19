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
│   ├── hashing.js         # Создание хешей
│   ├── hash-signing.js    # Подпись хешей
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
| signBase64Detached(dataBase64, thumbprint)                       | Detached-подпись без метки времени (CAdES-BES)                             |
| signBase64DetachedWithTimestamp(dataBase64, thumbprint, tspUrl)  | Detached-подпись с меткой времени (CAdES-T)                                |
| signBase64Attached(dataBase64, thumbprint)                       | Attached-подпись без метки времени (CAdES-BES)                             |
| signBase64AttachedWithTimestamp(dataBase64, thumbprint, tspUrl)  | Attached-подпись с меткой времени (CAdES-T)                                |
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
| **Утилиты**                                                     |                                                                            |
| toBase64Unicode(str)                                             | Кодирует строку в корректный base64 с поддержкой Unicode                   |

---

## 🧑‍💻 Автор

Михаил Мельников — [github.com/mmskazak](https://github.com/mmskazak)

---

## 📜 Лицензия

MIT
