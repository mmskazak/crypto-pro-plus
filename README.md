# @mmskazak/crypto-pro-plus

📦 Современная обёртка над [CryptoPro CAdES plugin](https://www.cryptopro.ru/products/cades)  
Позволяет удобно работать с сертификатами, получать информацию, подписывать данные и добавлять метку времени — всё на `async/await`, без боли.

---

## 🚀 Установка

```bash
npm install @mmskazak/crypto-pro-plus
```

> ⚠️ Требуется установленный [CryptoPro CSP](https://www.cryptopro.ru/products/csp) и загруженный плагин `cadesplugin`.

---

## 🧠 Возможности

* 🔎 Проверка версии плагина
* 🔐 Получение списка сертификатов
* 🧾 Получение информации по сертификату
* ✍️ Подпись base64-данных (CAdES-BES)
* ⏱ Подпись с меткой времени (CAdES-T)
* 🧮 Перевод строки в корректный base64 (с поддержкой Unicode)

---

## 📘 Примеры

### ✅ Проверка плагина

```js
import { pluginVersion, countCertificates } from '@mmskazak/crypto-pro-plus';

const version = await pluginVersion();
console.log("Версия плагина:", version);

const certCount = await countCertificates();
console.log("Сертификатов найдено:", certCount);
```

---

### 📜 Получить все сертификаты

```js
import { getCertificates } from '@mmskazak/crypto-pro-plus';

const certs = await getCertificates();
certs.forEach(cert => {
  console.log(cert.subjectName, cert.thumbprint, cert.validToDate);
});
```

---

### 📄 Получить подробную информацию о сертификате

```js
import { getCertificateByThumbprint, getCertificateInfo } from '@mmskazak/crypto-pro-plus';

const cert = await getCertificateByThumbprint("DA9142...");
const info = await getCertificateInfo(cert);

console.log("Информация:", info);
```

---

### ✍️ Подпись (CAdES-BES)

```js
import { signBase64Detached, toBase64Unicode } from '@mmskazak/crypto-pro-plus';

const base64 = toBase64Unicode("Строка для подписи");
const signature = await signBase64Detached(base64, "DA9142...");
console.log("Подпись:", signature);
```

---

### ⏱ Подпись с меткой времени (CAdES-T)

```js
import { signBase64WithTimestamp } from '@mmskazak/crypto-pro-plus';

const signature = await signBase64WithTimestamp(base64, "DA9142...", "http://testca.cryptopro.ru/tsp/");
console.log("Подпись с меткой времени:", signature);
```

---

## 📌 Список функций

| Метод                                                 | Описание                                                                   |
| ----------------------------------------------------- | -------------------------------------------------------------------------- |
| `pluginVersion()`                                     | Возвращает версию установленного плагина                                   |
| `countCertificates()`                                 | Считает количество сертификатов в личном хранилище                         |
| `getCertificates()`                                   | Получает список сертификатов с SubjectName, Thumbprint, сроками и объектом |
| `getCertificateByThumbprint(thumbprint)`              | Возвращает объект сертификата по отпечатку                                 |
| `getCertificateInfo(cert)`                            | Возвращает подробную информацию о сертификате                              |
| `signBase64Detached(base64, thumbprint)`              | Подпись без метки времени (CAdES-BES)                                      |
| `signBase64WithTimestamp(base64, thumbprint, tspUrl)` | Подпись с меткой времени (CAdES-T)                                         |
| `toBase64Unicode(str)`                                | Кодирует строку в корректный base64 с поддержкой Unicode                   |

---

## 🧑‍💻 Автор

Михаил Мельников — [github.com/mmskazak](https://github.com/mmskazak)

---

## 📜 Лицензия

MIT

```
