"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createAttachedSignature: () => createAttachedSignature,
  createDetachedSignature: () => createDetachedSignature_default,
  createHash: () => createHash,
  createSignature: () => createSignature,
  createTimestampedDetachedSignature: () => createTimestampedDetachedSignature_default,
  ensureReady: () => ensureReady,
  execute: () => execute,
  getSystemInfo: () => getSystemInfo,
  isValidSystemSetup: () => isValidSystemSetup
});
module.exports = __toCommonJS(index_exports);

// src/api/ensureReady.ts
var import_cadesplugin_api = require("https://cdn.jsdelivr.net/npm/crypto-pro-actual-cades-plugin@2.4.1/cadesplugin_api.js");
var CADES = window.cadesplugin;
async function ensureReady() {
  try {
    await CADES;
  } catch (e) {
    throw new Error("CryptoPro browser\u2011extension \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0438\u043B\u0438 \u043D\u0435 \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u043E\u0441\u044C");
  }
  const about = await CADES.CreateObjectAsync("CAdESCOM.About");
  const pluginVer = await about.PluginVersion;
  if (!pluginVer) {
    throw new Error("Native\u2011host \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D. \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 'CAdES Browser Plug\u2011in \u2265 2.0.15400'");
  }
  const store = await CADES.CreateObjectAsync("CAdESCOM.Store");
  await store.Open(
    CADES.CAPICOM_CURRENT_USER_STORE,
    // область — CurrentUser
    CADES.CAPICOM_MY_STORE,
    // имя — «MY» («Personal»)
    CADES.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
    // максимальные права
  );
  const certs = await store.Certificates;
  const count = await certs.Count;
  if (count === 0) {
    throw new Error("\u0412 \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 \u043D\u0435\u0442 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432 \u0441 \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u043C \u043A\u043B\u044E\u0447\u043E\u043C");
  }
  const cert = await certs.Item(1);
  if (!await cert.HasPrivateKey()) {
    throw new Error("\u0423 \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u043E\u0433\u043E \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u044B\u0439 \u043A\u043B\u044E\u0447");
  }
  return cert;
}

// src/api/createDetachedSignature.ts
var CADES2 = window.cadesplugin;
async function createDetachedSignature(hashBase64) {
  const cert = await ensureReady();
  const hashObj = await CADES2.CreateObjectAsync("CAdESCOM.HashedData");
  await hashObj.propset_Algorithm(CADES2.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256);
  await hashObj.propset_DataEncoding(CADES2.CADESCOM_BASE64_TO_BINARY);
  await hashObj.propset_HashValue(hashBase64);
  const signer = await CADES2.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(cert);
  const signature = await hashObj.SignHash(
    signer,
    CADES2.CADESCOM_CADES_BES,
    // тип подписи
    true
    // detached = true
  );
  return signature;
}
var createDetachedSignature_default = createDetachedSignature;

// src/api/createTimestampedDetachedSignature.ts
var CADES3 = window.cadesplugin;
var ALG = CADES3.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256;
var ENC = CADES3.CADESCOM_BASE64_TO_BINARY;
async function createTimestampedDetachedSignature(hashBase64, tspURL) {
  const cert = await ensureReady();
  const hashObj = await CADES3.CreateObjectAsync("CAdESCOM.HashedData");
  await hashObj.propset_Algorithm(ALG);
  await hashObj.propset_DataEncoding(ENC);
  await hashObj.propset_HashValue(hashBase64);
  const signer = await CADES3.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(cert);
  const rawSig = await hashObj.SignHash(
    signer,
    CADES3.CADESCOM_CADES_BES,
    true
    // detached
  );
  const sd = await CADES3.CreateObjectAsync("CAdESCOM.CadesSignedData");
  await sd.propset_ContentEncoding(ENC);
  await sd.VerifyHash(rawSig);
  await sd.AddTimeStamp(tspURL);
  const finalSig = await sd.SignHash(
    /* signer = */
    null,
    /* reuse исходного   */
    /* CADES type */
    0,
    /* same as original */
    /* detached?  */
    true
  );
  return finalSig;
}
var createTimestampedDetachedSignature_default = createTimestampedDetachedSignature;

// src/api/createAttachedSignature.ts
var CADES4 = window.cadesplugin;
var ALG2 = CADES4.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256;
var ENC_STR = CADES4.CADESCOM_STRING_TO_UCS2LE;
async function createAttachedSignature(message) {
  const cert = await ensureReady();
  const sd = await CADES4.CreateObjectAsync("CAdESCOM.CadesSignedData");
  await sd.propset_ContentEncoding(ENC_STR);
  await sd.propset_Content(message);
  const signer = await CADES4.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(cert);
  const signature = await sd.SignCades(
    signer,
    CADES4.CADESCOM_CADES_BES,
    // тип подписи
    /* detached = */
    false
  );
  return signature;
}

// src/index.ts
var CADES5 = window.cadesplugin;
var ALG3 = CADES5.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256;
var ENC2 = CADES5.CADESCOM_BASE64_TO_BINARY;
var STR = CADES5.CADESCOM_STRING_TO_UCS2LE;
async function getSystemInfo() {
  await CADES5;
  const about = await CADES5.CreateObjectAsync("CAdESCOM.About");
  return {
    pluginVersion: await about.PluginVersion,
    cspVersion: await about.CSPVersion
  };
}
async function isValidSystemSetup() {
  try {
    await ensureReady();
    return true;
  } catch (e) {
    return false;
  }
}
async function createHash(message) {
  await CADES5;
  const hd = await CADES5.CreateObjectAsync("CAdESCOM.HashedData");
  await hd.propset_Algorithm(ALG3);
  await hd.propset_DataEncoding(STR);
  await hd.propset_SourceData(message);
  return await hd.HashValue;
}
var createSignature = createDetachedSignature_default;
async function execute(fn) {
  await ensureReady();
  return await fn();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAttachedSignature,
  createDetachedSignature,
  createHash,
  createSignature,
  createTimestampedDetachedSignature,
  ensureReady,
  execute,
  getSystemInfo,
  isValidSystemSetup
});
