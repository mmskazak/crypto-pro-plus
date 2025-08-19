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
* 🔐 Создание ГОСТ-хешей (ГОСТ Р 34.11-2012 256 бит)
* ✍️ Подпись ГОСТ-хешей (detached с поддержкой меток времени)
* 🔄 Конвертация Unicode-строк в корректный base64

---

## 📘 Примеры

### ✅ Проверка плагина

```js
import { pluginVersion, countCertificates } from '@mmskazak/crypto-pro-plus';

const version = await pluginVersion();
console.log("Версия плагина:", version);

const count = await countCertificates();
console.log("Сертификатов найдено:", count);
```

---

### 📜 Получение всех сертификатов

```js
import { getCertificates } from '@mmskazak/crypto-pro-plus';

const certs = await getCertificates();
certs.forEach(cert => {
  console.log(cert.subjectName, cert.thumbprint, cert.validToDate);
});
```

---

### 📄 Информация по сертификату

```js
import { getCertificateByThumbprint, getCertificateInfo } from '@mmskazak/crypto-pro-plus';

const cert = await getCertificateByThumbprint("DA9142...");
const info = await getCertificateInfo(cert);
console.log(info);
```

---

### ✍️ Detached-подпись (без метки)

```js
import { signBase64Detached, toBase64Unicode } from '@mmskazak/crypto-pro-plus';

const data = toBase64Unicode("Данные для подписи");
const signature = await signBase64Detached(data, "DA9142...");
console.log(signature);
```

---

### ⏱ Detached-подпись с меткой времени

```js
import { signBase64DetachedWithTimestamp } from '@mmskazak/crypto-pro-plus';

const signature = await signBase64DetachedWithTimestamp(data, "DA9142...", "http://testca.cryptopro.ru/tsp/");
console.log(signature);
```

---

### 📎 Attached-подпись (встроенная)

```js
import { signBase64Attached } from '@mmskazak/crypto-pro-plus';

const signature = await signBase64Attached(data, "DA9142...");
console.log(signature);
```

---

### 📎⏱ Attached-подпись с меткой времени

```js
import { signBase64AttachedWithTimestamp } from '@mmskazak/crypto-pro-plus';

const signature = await signBase64AttachedWithTimestamp(data, "DA9142...", "http://testca.cryptopro.ru/tsp/");
console.log(signature);
```

---

### 🔐 Создание ГОСТ-хеша

```js
import { createGostHash, toBase64Unicode } from '@mmskazak/crypto-pro-plus';

const data = toBase64Unicode("Данные для хеширования");
const hash = await createGostHash(data);
console.log("ГОСТ-хеш:", hash);
```

---

### ✍️ Подпись ГОСТ-хеша (detached)

```js
import { signGostHashDetached } from '@mmskazak/crypto-pro-plus';

const signature = await signGostHashDetached(hash, "DA9142...");
console.log("Подпись хеша:", signature);
```

---

### ✍️⏱ Подпись ГОСТ-хеша с меткой времени

```js
import { signGostHashDetachedWithTimestamp } from '@mmskazak/crypto-pro-plus';

const signature = await signGostHashDetachedWithTimestamp(hash, "DA9142...", "http://testca.cryptopro.ru/tsp/");
console.log("Подпись хеша с меткой времени:", signature);
```

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
| createGostHash(dataBase64)                                       | Создает ГОСТ-хеш данных (ГОСТ Р 34.11-2012 256 бит)                       |
| signGostHashDetached(hashBase64, thumbprint)                     | Detached-подпись ГОСТ-хеша без метки времени (CAdES-BES)                   |
| signGostHashDetachedWithTimestamp(hashBase64, thumbprint, tspUrl)| Detached-подпись ГОСТ-хеша с меткой времени (CAdES-T)                      |
| toBase64Unicode(str)                                             | Кодирует строку в корректный base64 с поддержкой Unicode                   |

---

## 🧑‍💻 Автор

Михаил Мельников — [github.com/mmskazak](https://github.com/mmskazak)

---

## 📜 Лицензия

MIT
