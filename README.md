# **@mmskazak/crypto-pro-plus**

Drop‑in replacement for the original [`crypto-pro`](https://www.npmjs.com/package/crypto-pro) package, rewritten from scratch for ⚡ **compact size**, 🕒 **TSP‑timestamp support**, and full **TypeScript** typings.

[![npm version](https://img.shields.io/npm/v/@mmskazak/crypto-pro-plus)](https://www.npmjs.com/package/@mmskazak/crypto-pro-plus)
[![CI](https://github.com/your-name/crypto-pro-plus/actions/workflows/ci.yml/badge.svg)](https://github.com/your-name/crypto-pro-plus/actions/workflows/ci.yml)

---

## ✨ Why this package?

| Need                   | `crypto‑pro` | **crypto‑pro‑plus**                      |
| ---------------------- | ------------ | ---------------------------------------- |
| ⬇  Small bundle        | \~80 kB      | **≈ 5 kB** (tree‑shaken, ES 2017)        |
| ✔  TypeScript typings  | –            | **Yes** (`.d.ts` shipped)                |
| 🕒  RFC 3161 timestamp | –            | **`createTimestampedDetachedSignature`** |
| ✅  Same API names      | Yes          | **Yes** (100 % compatible)               |

---

## 📦 Installation

```bash
npm i @mmskazak/crypto-pro-plus
# или
yarn add @mmskazak/crypto-pro-plus
```

> **Peer dependency**: браузерное расширение *CryptoPro CAdES* ≥ 1.3 and host ≥ 2.0.15400 must be installed on the client PC.

---

## 🚀 Quick start

```ts
import * as cryptoPro from '@mmskazak/crypto-pro-plus';

const hash = await cryptoPro.createHash('Hello, world!');
const pkcs7 = await cryptoPro.createTimestampedDetachedSignature(
  hash,
  'http://testca.cryptopro.ru/tsp/tsp.srf'
);
console.log('PKCS#7:', pkcs7);
```

---

## 🛠️ API reference

| Function                                                 | Description                                                                 |
| -------------------------------------------------------- | --------------------------------------------------------------------------- |
| `ensureReady()`                                          | Проверяет плагин, host, наличие сертификата. Возвращает `CADESCertificate`. |
| `isValidSystemSetup()`                                   | Boolean‑обёртка над `ensureReady()`.                                        |
| `getSystemInfo()`                                        | Версия host’a и CSP.                                                        |
| `createHash(message)`                                    | ГОСТ 34.11‑2012‑256 хэш строки → base64.                                    |
| `createDetachedSignature(hashBase64)`                    | Detached CAdES‑BES.                                                         |
| `createAttachedSignature(message)`                       | Attached CAdES‑BES.                                                         |
| `createTimestampedDetachedSignature(hashBase64, tspURL)` | **NEW.** Detached подпись + TSA‑штамп.                                      |
| `execute(fn)`                                            | Выполняет произвольный код после `ensureReady()`.                           |

All methods return `Promise< string \| boolean \| CADESCertificate >`.

---

## 🔄 Migrating from `crypto-pro`

1. `npm rm crypto-pro`
2. `npm i @mikhail/crypto-pro-plus`
3. **No code changes needed** – the same global names work:

   ```js
   // bootstrap.js
   import * as cryptoPro from '@mikhail/crypto-pro-plus';
   window.cryptoPro = cryptoPro;
   ```
4. Want timestamps? Call the new method:

   ```js
   cryptoPro.createTimestampedDetachedSignature(hash, tspURL);
   ```

---

## 🌐 Browser & host compatibility

| Component                       | Minimum version                                     |
| ------------------------------- | --------------------------------------------------- |
| CryptoPro browser extension     | **1.3.x** (Manifest V3)                             |
| Native host (`cadesplugin.exe`) | **2.0.15400**                                       |
| CryptoPro CSP                   | 5.0 R3                                              |
| Browser engines                 | Chrome 58+, Edge 79+, Firefox 60+ (with NPAPI host) |

If you must support IE 11, transpile your bundle to **ES5** and polyfill `Promise` (`core‑js`, `regenerator-runtime`).

---

## 🏗️ Build & development

```bash
# lint + build + tests
npm run build
npm test

# watch mode
yarn dev
```

`tsup` outputs ESM, CJS, and `.d.ts` into **/dist**.

---

## 🤝 Contributing

PRs welcome! Please run `npm test` before submitting.

---

## 📄 License

MIT © Михаил & Contributors
