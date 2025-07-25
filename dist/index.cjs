"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/crypto-pro-actual-cades-plugin/lib/crypto-pro-actual-cades-plugin.js
var require_crypto_pro_actual_cades_plugin = __commonJS({
  "node_modules/crypto-pro-actual-cades-plugin/lib/crypto-pro-actual-cades-plugin.js"(exports, module) {
    "use strict";
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define("cryptoPro", [], factory);
      else if (typeof exports === "object")
        exports["cryptoPro"] = factory();
      else
        root["cryptoPro"] = factory();
    })(window, function() {
      return (
        /******/
        function(modules) {
          var installedModules = {};
          function __webpack_require__2(moduleId) {
            if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
            }
            var module2 = installedModules[moduleId] = {
              /******/
              i: moduleId,
              /******/
              l: false,
              /******/
              exports: {}
              /******/
            };
            modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__2);
            module2.l = true;
            return module2.exports;
          }
          __webpack_require__2.m = modules;
          __webpack_require__2.c = installedModules;
          __webpack_require__2.d = function(exports2, name, getter) {
            if (!__webpack_require__2.o(exports2, name)) {
              Object.defineProperty(exports2, name, { enumerable: true, get: getter });
            }
          };
          __webpack_require__2.r = function(exports2) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
              Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
            }
            Object.defineProperty(exports2, "__esModule", { value: true });
          };
          __webpack_require__2.t = function(value, mode) {
            if (mode & 1) value = __webpack_require__2(value);
            if (mode & 8) return value;
            if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
            var ns = /* @__PURE__ */ Object.create(null);
            __webpack_require__2.r(ns);
            Object.defineProperty(ns, "default", { enumerable: true, value });
            if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__2.d(ns, key, function(key2) {
              return value[key2];
            }.bind(null, key));
            return ns;
          };
          __webpack_require__2.n = function(module2) {
            var getter = module2 && module2.__esModule ? (
              /******/
              function getDefault() {
                return module2["default"];
              }
            ) : (
              /******/
              function getModuleExports() {
                return module2;
              }
            );
            __webpack_require__2.d(getter, "a", getter);
            return getter;
          };
          __webpack_require__2.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          __webpack_require__2.p = "";
          return __webpack_require__2(__webpack_require__2.s = "./crypto-pro-actual-cades-plugin.ts");
        }({
          /***/
          "../node_modules/base64-js/index.js": (
            /*!******************************************!*\
              !*** ../node_modules/base64-js/index.js ***!
              \******************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              exports2.byteLength = byteLength;
              exports2.toByteArray = toByteArray;
              exports2.fromByteArray = fromByteArray;
              var lookup = [];
              var revLookup = [];
              var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
              var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
              for (var i = 0, len = code.length; i < len; ++i) {
                lookup[i] = code[i];
                revLookup[code.charCodeAt(i)] = i;
              }
              revLookup["-".charCodeAt(0)] = 62;
              revLookup["_".charCodeAt(0)] = 63;
              function getLens(b64) {
                var len2 = b64.length;
                if (len2 % 4 > 0) {
                  throw new Error("Invalid string. Length must be a multiple of 4");
                }
                var validLen = b64.indexOf("=");
                if (validLen === -1) validLen = len2;
                var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
                return [validLen, placeHoldersLen];
              }
              function byteLength(b64) {
                var lens = getLens(b64);
                var validLen = lens[0];
                var placeHoldersLen = lens[1];
                return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
              }
              function _byteLength(b64, validLen, placeHoldersLen) {
                return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
              }
              function toByteArray(b64) {
                var tmp;
                var lens = getLens(b64);
                var validLen = lens[0];
                var placeHoldersLen = lens[1];
                var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
                var curByte = 0;
                var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
                var i2;
                for (i2 = 0; i2 < len2; i2 += 4) {
                  tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
                  arr[curByte++] = tmp >> 16 & 255;
                  arr[curByte++] = tmp >> 8 & 255;
                  arr[curByte++] = tmp & 255;
                }
                if (placeHoldersLen === 2) {
                  tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
                  arr[curByte++] = tmp & 255;
                }
                if (placeHoldersLen === 1) {
                  tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
                  arr[curByte++] = tmp >> 8 & 255;
                  arr[curByte++] = tmp & 255;
                }
                return arr;
              }
              function tripletToBase64(num) {
                return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
              }
              function encodeChunk(uint8, start, end) {
                var tmp;
                var output = [];
                for (var i2 = start; i2 < end; i2 += 3) {
                  tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
                  output.push(tripletToBase64(tmp));
                }
                return output.join("");
              }
              function fromByteArray(uint8) {
                var tmp;
                var len2 = uint8.length;
                var extraBytes = len2 % 3;
                var parts = [];
                var maxChunkLength = 16383;
                for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
                  parts.push(encodeChunk(
                    uint8,
                    i2,
                    i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength
                  ));
                }
                if (extraBytes === 1) {
                  tmp = uint8[len2 - 1];
                  parts.push(
                    lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
                  );
                } else if (extraBytes === 2) {
                  tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
                  parts.push(
                    lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
                  );
                }
                return parts.join("");
              }
            }
          ),
          /***/
          "../node_modules/buffer/index.js": (
            /*!***************************************!*\
              !*** ../node_modules/buffer/index.js ***!
              \***************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              (function(global) {
                var base64 = __webpack_require__2(
                  /*! base64-js */
                  "../node_modules/base64-js/index.js"
                );
                var ieee754 = __webpack_require__2(
                  /*! ieee754 */
                  "../node_modules/ieee754/index.js"
                );
                var isArray = __webpack_require__2(
                  /*! isarray */
                  "../node_modules/isarray/index.js"
                );
                exports2.Buffer = Buffer2;
                exports2.SlowBuffer = SlowBuffer;
                exports2.INSPECT_MAX_BYTES = 50;
                Buffer2.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== void 0 ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
                exports2.kMaxLength = kMaxLength();
                function typedArraySupport() {
                  try {
                    var arr = new Uint8Array(1);
                    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
                      return 42;
                    } };
                    return arr.foo() === 42 && // typed array instances can be augmented
                    typeof arr.subarray === "function" && // chrome 9-10 lack `subarray`
                    arr.subarray(1, 1).byteLength === 0;
                  } catch (e) {
                    return false;
                  }
                }
                function kMaxLength() {
                  return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
                }
                function createBuffer(that, length) {
                  if (kMaxLength() < length) {
                    throw new RangeError("Invalid typed array length");
                  }
                  if (Buffer2.TYPED_ARRAY_SUPPORT) {
                    that = new Uint8Array(length);
                    that.__proto__ = Buffer2.prototype;
                  } else {
                    if (that === null) {
                      that = new Buffer2(length);
                    }
                    that.length = length;
                  }
                  return that;
                }
                function Buffer2(arg, encodingOrOffset, length) {
                  if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
                    return new Buffer2(arg, encodingOrOffset, length);
                  }
                  if (typeof arg === "number") {
                    if (typeof encodingOrOffset === "string") {
                      throw new Error(
                        "If encoding is specified then the first argument must be a string"
                      );
                    }
                    return allocUnsafe(this, arg);
                  }
                  return from(this, arg, encodingOrOffset, length);
                }
                Buffer2.poolSize = 8192;
                Buffer2._augment = function(arr) {
                  arr.__proto__ = Buffer2.prototype;
                  return arr;
                };
                function from(that, value, encodingOrOffset, length) {
                  if (typeof value === "number") {
                    throw new TypeError('"value" argument must not be a number');
                  }
                  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
                    return fromArrayBuffer(that, value, encodingOrOffset, length);
                  }
                  if (typeof value === "string") {
                    return fromString(that, value, encodingOrOffset);
                  }
                  return fromObject(that, value);
                }
                Buffer2.from = function(value, encodingOrOffset, length) {
                  return from(null, value, encodingOrOffset, length);
                };
                if (Buffer2.TYPED_ARRAY_SUPPORT) {
                  Buffer2.prototype.__proto__ = Uint8Array.prototype;
                  Buffer2.__proto__ = Uint8Array;
                  if (typeof Symbol !== "undefined" && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
                    Object.defineProperty(Buffer2, Symbol.species, {
                      value: null,
                      configurable: true
                    });
                  }
                }
                function assertSize(size) {
                  if (typeof size !== "number") {
                    throw new TypeError('"size" argument must be a number');
                  } else if (size < 0) {
                    throw new RangeError('"size" argument must not be negative');
                  }
                }
                function alloc(that, size, fill, encoding) {
                  assertSize(size);
                  if (size <= 0) {
                    return createBuffer(that, size);
                  }
                  if (fill !== void 0) {
                    return typeof encoding === "string" ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
                  }
                  return createBuffer(that, size);
                }
                Buffer2.alloc = function(size, fill, encoding) {
                  return alloc(null, size, fill, encoding);
                };
                function allocUnsafe(that, size) {
                  assertSize(size);
                  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
                  if (!Buffer2.TYPED_ARRAY_SUPPORT) {
                    for (var i = 0; i < size; ++i) {
                      that[i] = 0;
                    }
                  }
                  return that;
                }
                Buffer2.allocUnsafe = function(size) {
                  return allocUnsafe(null, size);
                };
                Buffer2.allocUnsafeSlow = function(size) {
                  return allocUnsafe(null, size);
                };
                function fromString(that, string, encoding) {
                  if (typeof encoding !== "string" || encoding === "") {
                    encoding = "utf8";
                  }
                  if (!Buffer2.isEncoding(encoding)) {
                    throw new TypeError('"encoding" must be a valid string encoding');
                  }
                  var length = byteLength(string, encoding) | 0;
                  that = createBuffer(that, length);
                  var actual = that.write(string, encoding);
                  if (actual !== length) {
                    that = that.slice(0, actual);
                  }
                  return that;
                }
                function fromArrayLike(that, array) {
                  var length = array.length < 0 ? 0 : checked(array.length) | 0;
                  that = createBuffer(that, length);
                  for (var i = 0; i < length; i += 1) {
                    that[i] = array[i] & 255;
                  }
                  return that;
                }
                function fromArrayBuffer(that, array, byteOffset, length) {
                  array.byteLength;
                  if (byteOffset < 0 || array.byteLength < byteOffset) {
                    throw new RangeError("'offset' is out of bounds");
                  }
                  if (array.byteLength < byteOffset + (length || 0)) {
                    throw new RangeError("'length' is out of bounds");
                  }
                  if (byteOffset === void 0 && length === void 0) {
                    array = new Uint8Array(array);
                  } else if (length === void 0) {
                    array = new Uint8Array(array, byteOffset);
                  } else {
                    array = new Uint8Array(array, byteOffset, length);
                  }
                  if (Buffer2.TYPED_ARRAY_SUPPORT) {
                    that = array;
                    that.__proto__ = Buffer2.prototype;
                  } else {
                    that = fromArrayLike(that, array);
                  }
                  return that;
                }
                function fromObject(that, obj) {
                  if (Buffer2.isBuffer(obj)) {
                    var len = checked(obj.length) | 0;
                    that = createBuffer(that, len);
                    if (that.length === 0) {
                      return that;
                    }
                    obj.copy(that, 0, 0, len);
                    return that;
                  }
                  if (obj) {
                    if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
                      if (typeof obj.length !== "number" || isnan(obj.length)) {
                        return createBuffer(that, 0);
                      }
                      return fromArrayLike(that, obj);
                    }
                    if (obj.type === "Buffer" && isArray(obj.data)) {
                      return fromArrayLike(that, obj.data);
                    }
                  }
                  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
                }
                function checked(length) {
                  if (length >= kMaxLength()) {
                    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
                  }
                  return length | 0;
                }
                function SlowBuffer(length) {
                  if (+length != length) {
                    length = 0;
                  }
                  return Buffer2.alloc(+length);
                }
                Buffer2.isBuffer = function isBuffer(b) {
                  return !!(b != null && b._isBuffer);
                };
                Buffer2.compare = function compare(a, b) {
                  if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
                    throw new TypeError("Arguments must be Buffers");
                  }
                  if (a === b) return 0;
                  var x = a.length;
                  var y = b.length;
                  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
                    if (a[i] !== b[i]) {
                      x = a[i];
                      y = b[i];
                      break;
                    }
                  }
                  if (x < y) return -1;
                  if (y < x) return 1;
                  return 0;
                };
                Buffer2.isEncoding = function isEncoding(encoding) {
                  switch (String(encoding).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return true;
                    default:
                      return false;
                  }
                };
                Buffer2.concat = function concat(list, length) {
                  if (!isArray(list)) {
                    throw new TypeError('"list" argument must be an Array of Buffers');
                  }
                  if (list.length === 0) {
                    return Buffer2.alloc(0);
                  }
                  var i;
                  if (length === void 0) {
                    length = 0;
                    for (i = 0; i < list.length; ++i) {
                      length += list[i].length;
                    }
                  }
                  var buffer = Buffer2.allocUnsafe(length);
                  var pos = 0;
                  for (i = 0; i < list.length; ++i) {
                    var buf = list[i];
                    if (!Buffer2.isBuffer(buf)) {
                      throw new TypeError('"list" argument must be an Array of Buffers');
                    }
                    buf.copy(buffer, pos);
                    pos += buf.length;
                  }
                  return buffer;
                };
                function byteLength(string, encoding) {
                  if (Buffer2.isBuffer(string)) {
                    return string.length;
                  }
                  if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
                    return string.byteLength;
                  }
                  if (typeof string !== "string") {
                    string = "" + string;
                  }
                  var len = string.length;
                  if (len === 0) return 0;
                  var loweredCase = false;
                  for (; ; ) {
                    switch (encoding) {
                      case "ascii":
                      case "latin1":
                      case "binary":
                        return len;
                      case "utf8":
                      case "utf-8":
                      case void 0:
                        return utf8ToBytes(string).length;
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return len * 2;
                      case "hex":
                        return len >>> 1;
                      case "base64":
                        return base64ToBytes(string).length;
                      default:
                        if (loweredCase) return utf8ToBytes(string).length;
                        encoding = ("" + encoding).toLowerCase();
                        loweredCase = true;
                    }
                  }
                }
                Buffer2.byteLength = byteLength;
                function slowToString(encoding, start, end) {
                  var loweredCase = false;
                  if (start === void 0 || start < 0) {
                    start = 0;
                  }
                  if (start > this.length) {
                    return "";
                  }
                  if (end === void 0 || end > this.length) {
                    end = this.length;
                  }
                  if (end <= 0) {
                    return "";
                  }
                  end >>>= 0;
                  start >>>= 0;
                  if (end <= start) {
                    return "";
                  }
                  if (!encoding) encoding = "utf8";
                  while (true) {
                    switch (encoding) {
                      case "hex":
                        return hexSlice(this, start, end);
                      case "utf8":
                      case "utf-8":
                        return utf8Slice(this, start, end);
                      case "ascii":
                        return asciiSlice(this, start, end);
                      case "latin1":
                      case "binary":
                        return latin1Slice(this, start, end);
                      case "base64":
                        return base64Slice(this, start, end);
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return utf16leSlice(this, start, end);
                      default:
                        if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
                        encoding = (encoding + "").toLowerCase();
                        loweredCase = true;
                    }
                  }
                }
                Buffer2.prototype._isBuffer = true;
                function swap(b, n, m) {
                  var i = b[n];
                  b[n] = b[m];
                  b[m] = i;
                }
                Buffer2.prototype.swap16 = function swap16() {
                  var len = this.length;
                  if (len % 2 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 16-bits");
                  }
                  for (var i = 0; i < len; i += 2) {
                    swap(this, i, i + 1);
                  }
                  return this;
                };
                Buffer2.prototype.swap32 = function swap32() {
                  var len = this.length;
                  if (len % 4 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 32-bits");
                  }
                  for (var i = 0; i < len; i += 4) {
                    swap(this, i, i + 3);
                    swap(this, i + 1, i + 2);
                  }
                  return this;
                };
                Buffer2.prototype.swap64 = function swap64() {
                  var len = this.length;
                  if (len % 8 !== 0) {
                    throw new RangeError("Buffer size must be a multiple of 64-bits");
                  }
                  for (var i = 0; i < len; i += 8) {
                    swap(this, i, i + 7);
                    swap(this, i + 1, i + 6);
                    swap(this, i + 2, i + 5);
                    swap(this, i + 3, i + 4);
                  }
                  return this;
                };
                Buffer2.prototype.toString = function toString() {
                  var length = this.length | 0;
                  if (length === 0) return "";
                  if (arguments.length === 0) return utf8Slice(this, 0, length);
                  return slowToString.apply(this, arguments);
                };
                Buffer2.prototype.equals = function equals(b) {
                  if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
                  if (this === b) return true;
                  return Buffer2.compare(this, b) === 0;
                };
                Buffer2.prototype.inspect = function inspect() {
                  var str = "";
                  var max = exports2.INSPECT_MAX_BYTES;
                  if (this.length > 0) {
                    str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
                    if (this.length > max) str += " ... ";
                  }
                  return "<Buffer " + str + ">";
                };
                Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
                  if (!Buffer2.isBuffer(target)) {
                    throw new TypeError("Argument must be a Buffer");
                  }
                  if (start === void 0) {
                    start = 0;
                  }
                  if (end === void 0) {
                    end = target ? target.length : 0;
                  }
                  if (thisStart === void 0) {
                    thisStart = 0;
                  }
                  if (thisEnd === void 0) {
                    thisEnd = this.length;
                  }
                  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
                    throw new RangeError("out of range index");
                  }
                  if (thisStart >= thisEnd && start >= end) {
                    return 0;
                  }
                  if (thisStart >= thisEnd) {
                    return -1;
                  }
                  if (start >= end) {
                    return 1;
                  }
                  start >>>= 0;
                  end >>>= 0;
                  thisStart >>>= 0;
                  thisEnd >>>= 0;
                  if (this === target) return 0;
                  var x = thisEnd - thisStart;
                  var y = end - start;
                  var len = Math.min(x, y);
                  var thisCopy = this.slice(thisStart, thisEnd);
                  var targetCopy = target.slice(start, end);
                  for (var i = 0; i < len; ++i) {
                    if (thisCopy[i] !== targetCopy[i]) {
                      x = thisCopy[i];
                      y = targetCopy[i];
                      break;
                    }
                  }
                  if (x < y) return -1;
                  if (y < x) return 1;
                  return 0;
                };
                function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
                  if (buffer.length === 0) return -1;
                  if (typeof byteOffset === "string") {
                    encoding = byteOffset;
                    byteOffset = 0;
                  } else if (byteOffset > 2147483647) {
                    byteOffset = 2147483647;
                  } else if (byteOffset < -2147483648) {
                    byteOffset = -2147483648;
                  }
                  byteOffset = +byteOffset;
                  if (isNaN(byteOffset)) {
                    byteOffset = dir ? 0 : buffer.length - 1;
                  }
                  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
                  if (byteOffset >= buffer.length) {
                    if (dir) return -1;
                    else byteOffset = buffer.length - 1;
                  } else if (byteOffset < 0) {
                    if (dir) byteOffset = 0;
                    else return -1;
                  }
                  if (typeof val === "string") {
                    val = Buffer2.from(val, encoding);
                  }
                  if (Buffer2.isBuffer(val)) {
                    if (val.length === 0) {
                      return -1;
                    }
                    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
                  } else if (typeof val === "number") {
                    val = val & 255;
                    if (Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
                      if (dir) {
                        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
                      } else {
                        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
                      }
                    }
                    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
                  }
                  throw new TypeError("val must be string, number or Buffer");
                }
                function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
                  var indexSize = 1;
                  var arrLength = arr.length;
                  var valLength = val.length;
                  if (encoding !== void 0) {
                    encoding = String(encoding).toLowerCase();
                    if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
                      if (arr.length < 2 || val.length < 2) {
                        return -1;
                      }
                      indexSize = 2;
                      arrLength /= 2;
                      valLength /= 2;
                      byteOffset /= 2;
                    }
                  }
                  function read(buf, i2) {
                    if (indexSize === 1) {
                      return buf[i2];
                    } else {
                      return buf.readUInt16BE(i2 * indexSize);
                    }
                  }
                  var i;
                  if (dir) {
                    var foundIndex = -1;
                    for (i = byteOffset; i < arrLength; i++) {
                      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                        if (foundIndex === -1) foundIndex = i;
                        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
                      } else {
                        if (foundIndex !== -1) i -= i - foundIndex;
                        foundIndex = -1;
                      }
                    }
                  } else {
                    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
                    for (i = byteOffset; i >= 0; i--) {
                      var found = true;
                      for (var j = 0; j < valLength; j++) {
                        if (read(arr, i + j) !== read(val, j)) {
                          found = false;
                          break;
                        }
                      }
                      if (found) return i;
                    }
                  }
                  return -1;
                }
                Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
                  return this.indexOf(val, byteOffset, encoding) !== -1;
                };
                Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
                  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
                };
                Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
                  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
                };
                function hexWrite(buf, string, offset, length) {
                  offset = Number(offset) || 0;
                  var remaining = buf.length - offset;
                  if (!length) {
                    length = remaining;
                  } else {
                    length = Number(length);
                    if (length > remaining) {
                      length = remaining;
                    }
                  }
                  var strLen = string.length;
                  if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
                  if (length > strLen / 2) {
                    length = strLen / 2;
                  }
                  for (var i = 0; i < length; ++i) {
                    var parsed = parseInt(string.substr(i * 2, 2), 16);
                    if (isNaN(parsed)) return i;
                    buf[offset + i] = parsed;
                  }
                  return i;
                }
                function utf8Write(buf, string, offset, length) {
                  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
                }
                function asciiWrite(buf, string, offset, length) {
                  return blitBuffer(asciiToBytes(string), buf, offset, length);
                }
                function latin1Write(buf, string, offset, length) {
                  return asciiWrite(buf, string, offset, length);
                }
                function base64Write(buf, string, offset, length) {
                  return blitBuffer(base64ToBytes(string), buf, offset, length);
                }
                function ucs2Write(buf, string, offset, length) {
                  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
                }
                Buffer2.prototype.write = function write(string, offset, length, encoding) {
                  if (offset === void 0) {
                    encoding = "utf8";
                    length = this.length;
                    offset = 0;
                  } else if (length === void 0 && typeof offset === "string") {
                    encoding = offset;
                    length = this.length;
                    offset = 0;
                  } else if (isFinite(offset)) {
                    offset = offset | 0;
                    if (isFinite(length)) {
                      length = length | 0;
                      if (encoding === void 0) encoding = "utf8";
                    } else {
                      encoding = length;
                      length = void 0;
                    }
                  } else {
                    throw new Error(
                      "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                    );
                  }
                  var remaining = this.length - offset;
                  if (length === void 0 || length > remaining) length = remaining;
                  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
                    throw new RangeError("Attempt to write outside buffer bounds");
                  }
                  if (!encoding) encoding = "utf8";
                  var loweredCase = false;
                  for (; ; ) {
                    switch (encoding) {
                      case "hex":
                        return hexWrite(this, string, offset, length);
                      case "utf8":
                      case "utf-8":
                        return utf8Write(this, string, offset, length);
                      case "ascii":
                        return asciiWrite(this, string, offset, length);
                      case "latin1":
                      case "binary":
                        return latin1Write(this, string, offset, length);
                      case "base64":
                        return base64Write(this, string, offset, length);
                      case "ucs2":
                      case "ucs-2":
                      case "utf16le":
                      case "utf-16le":
                        return ucs2Write(this, string, offset, length);
                      default:
                        if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
                        encoding = ("" + encoding).toLowerCase();
                        loweredCase = true;
                    }
                  }
                };
                Buffer2.prototype.toJSON = function toJSON() {
                  return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                  };
                };
                function base64Slice(buf, start, end) {
                  if (start === 0 && end === buf.length) {
                    return base64.fromByteArray(buf);
                  } else {
                    return base64.fromByteArray(buf.slice(start, end));
                  }
                }
                function utf8Slice(buf, start, end) {
                  end = Math.min(buf.length, end);
                  var res = [];
                  var i = start;
                  while (i < end) {
                    var firstByte = buf[i];
                    var codePoint = null;
                    var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
                    if (i + bytesPerSequence <= end) {
                      var secondByte, thirdByte, fourthByte, tempCodePoint;
                      switch (bytesPerSequence) {
                        case 1:
                          if (firstByte < 128) {
                            codePoint = firstByte;
                          }
                          break;
                        case 2:
                          secondByte = buf[i + 1];
                          if ((secondByte & 192) === 128) {
                            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                            if (tempCodePoint > 127) {
                              codePoint = tempCodePoint;
                            }
                          }
                          break;
                        case 3:
                          secondByte = buf[i + 1];
                          thirdByte = buf[i + 2];
                          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                              codePoint = tempCodePoint;
                            }
                          }
                          break;
                        case 4:
                          secondByte = buf[i + 1];
                          thirdByte = buf[i + 2];
                          fourthByte = buf[i + 3];
                          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                              codePoint = tempCodePoint;
                            }
                          }
                      }
                    }
                    if (codePoint === null) {
                      codePoint = 65533;
                      bytesPerSequence = 1;
                    } else if (codePoint > 65535) {
                      codePoint -= 65536;
                      res.push(codePoint >>> 10 & 1023 | 55296);
                      codePoint = 56320 | codePoint & 1023;
                    }
                    res.push(codePoint);
                    i += bytesPerSequence;
                  }
                  return decodeCodePointsArray(res);
                }
                var MAX_ARGUMENTS_LENGTH = 4096;
                function decodeCodePointsArray(codePoints) {
                  var len = codePoints.length;
                  if (len <= MAX_ARGUMENTS_LENGTH) {
                    return String.fromCharCode.apply(String, codePoints);
                  }
                  var res = "";
                  var i = 0;
                  while (i < len) {
                    res += String.fromCharCode.apply(
                      String,
                      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
                    );
                  }
                  return res;
                }
                function asciiSlice(buf, start, end) {
                  var ret = "";
                  end = Math.min(buf.length, end);
                  for (var i = start; i < end; ++i) {
                    ret += String.fromCharCode(buf[i] & 127);
                  }
                  return ret;
                }
                function latin1Slice(buf, start, end) {
                  var ret = "";
                  end = Math.min(buf.length, end);
                  for (var i = start; i < end; ++i) {
                    ret += String.fromCharCode(buf[i]);
                  }
                  return ret;
                }
                function hexSlice(buf, start, end) {
                  var len = buf.length;
                  if (!start || start < 0) start = 0;
                  if (!end || end < 0 || end > len) end = len;
                  var out = "";
                  for (var i = start; i < end; ++i) {
                    out += toHex(buf[i]);
                  }
                  return out;
                }
                function utf16leSlice(buf, start, end) {
                  var bytes = buf.slice(start, end);
                  var res = "";
                  for (var i = 0; i < bytes.length; i += 2) {
                    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
                  }
                  return res;
                }
                Buffer2.prototype.slice = function slice(start, end) {
                  var len = this.length;
                  start = ~~start;
                  end = end === void 0 ? len : ~~end;
                  if (start < 0) {
                    start += len;
                    if (start < 0) start = 0;
                  } else if (start > len) {
                    start = len;
                  }
                  if (end < 0) {
                    end += len;
                    if (end < 0) end = 0;
                  } else if (end > len) {
                    end = len;
                  }
                  if (end < start) end = start;
                  var newBuf;
                  if (Buffer2.TYPED_ARRAY_SUPPORT) {
                    newBuf = this.subarray(start, end);
                    newBuf.__proto__ = Buffer2.prototype;
                  } else {
                    var sliceLen = end - start;
                    newBuf = new Buffer2(sliceLen, void 0);
                    for (var i = 0; i < sliceLen; ++i) {
                      newBuf[i] = this[i + start];
                    }
                  }
                  return newBuf;
                };
                function checkOffset(offset, ext, length) {
                  if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
                  if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
                }
                Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
                  offset = offset | 0;
                  byteLength2 = byteLength2 | 0;
                  if (!noAssert) checkOffset(offset, byteLength2, this.length);
                  var val = this[offset];
                  var mul = 1;
                  var i = 0;
                  while (++i < byteLength2 && (mul *= 256)) {
                    val += this[offset + i] * mul;
                  }
                  return val;
                };
                Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
                  offset = offset | 0;
                  byteLength2 = byteLength2 | 0;
                  if (!noAssert) {
                    checkOffset(offset, byteLength2, this.length);
                  }
                  var val = this[offset + --byteLength2];
                  var mul = 1;
                  while (byteLength2 > 0 && (mul *= 256)) {
                    val += this[offset + --byteLength2] * mul;
                  }
                  return val;
                };
                Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 1, this.length);
                  return this[offset];
                };
                Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 2, this.length);
                  return this[offset] | this[offset + 1] << 8;
                };
                Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 2, this.length);
                  return this[offset] << 8 | this[offset + 1];
                };
                Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 4, this.length);
                  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
                };
                Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 4, this.length);
                  return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
                };
                Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
                  offset = offset | 0;
                  byteLength2 = byteLength2 | 0;
                  if (!noAssert) checkOffset(offset, byteLength2, this.length);
                  var val = this[offset];
                  var mul = 1;
                  var i = 0;
                  while (++i < byteLength2 && (mul *= 256)) {
                    val += this[offset + i] * mul;
                  }
                  mul *= 128;
                  if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
                  return val;
                };
                Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
                  offset = offset | 0;
                  byteLength2 = byteLength2 | 0;
                  if (!noAssert) checkOffset(offset, byteLength2, this.length);
                  var i = byteLength2;
                  var mul = 1;
                  var val = this[offset + --i];
                  while (i > 0 && (mul *= 256)) {
                    val += this[offset + --i] * mul;
                  }
                  mul *= 128;
                  if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
                  return val;
                };
                Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 1, this.length);
                  if (!(this[offset] & 128)) return this[offset];
                  return (255 - this[offset] + 1) * -1;
                };
                Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 2, this.length);
                  var val = this[offset] | this[offset + 1] << 8;
                  return val & 32768 ? val | 4294901760 : val;
                };
                Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 2, this.length);
                  var val = this[offset + 1] | this[offset] << 8;
                  return val & 32768 ? val | 4294901760 : val;
                };
                Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 4, this.length);
                  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
                };
                Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 4, this.length);
                  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
                };
                Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 4, this.length);
                  return ieee754.read(this, offset, true, 23, 4);
                };
                Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 4, this.length);
                  return ieee754.read(this, offset, false, 23, 4);
                };
                Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 8, this.length);
                  return ieee754.read(this, offset, true, 52, 8);
                };
                Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
                  if (!noAssert) checkOffset(offset, 8, this.length);
                  return ieee754.read(this, offset, false, 52, 8);
                };
                function checkInt(buf, value, offset, ext, max, min) {
                  if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
                  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
                  if (offset + ext > buf.length) throw new RangeError("Index out of range");
                }
                Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  byteLength2 = byteLength2 | 0;
                  if (!noAssert) {
                    var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
                    checkInt(this, value, offset, byteLength2, maxBytes, 0);
                  }
                  var mul = 1;
                  var i = 0;
                  this[offset] = value & 255;
                  while (++i < byteLength2 && (mul *= 256)) {
                    this[offset + i] = value / mul & 255;
                  }
                  return offset + byteLength2;
                };
                Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  byteLength2 = byteLength2 | 0;
                  if (!noAssert) {
                    var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
                    checkInt(this, value, offset, byteLength2, maxBytes, 0);
                  }
                  var i = byteLength2 - 1;
                  var mul = 1;
                  this[offset + i] = value & 255;
                  while (--i >= 0 && (mul *= 256)) {
                    this[offset + i] = value / mul & 255;
                  }
                  return offset + byteLength2;
                };
                Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
                  if (!Buffer2.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
                  this[offset] = value & 255;
                  return offset + 1;
                };
                function objectWriteUInt16(buf, value, offset, littleEndian) {
                  if (value < 0) value = 65535 + value + 1;
                  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
                    buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
                  }
                }
                Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
                  if (Buffer2.TYPED_ARRAY_SUPPORT) {
                    this[offset] = value & 255;
                    this[offset + 1] = value >>> 8;
                  } else {
                    objectWriteUInt16(this, value, offset, true);
                  }
                  return offset + 2;
                };
                Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
                  if (Buffer2.TYPED_ARRAY_SUPPORT) {
                    this[offset] = value >>> 8;
                    this[offset + 1] = value & 255;
                  } else {
                    objectWriteUInt16(this, value, offset, false);
                  }
                  return offset + 2;
                };
                function objectWriteUInt32(buf, value, offset, littleEndian) {
                  if (value < 0) value = 4294967295 + value + 1;
                  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
                    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
                  }
                }
                Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
                  if (Buffer2.TYPED_ARRAY_SUPPORT) {
                    this[offset + 3] = value >>> 24;
                    this[offset + 2] = value >>> 16;
                    this[offset + 1] = value >>> 8;
                    this[offset] = value & 255;
                  } else {
                    objectWriteUInt32(this, value, offset, true);
                  }
                  return offset + 4;
                };
                Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
                  if (Buffer2.TYPED_ARRAY_SUPPORT) {
                    this[offset] = value >>> 24;
                    this[offset + 1] = value >>> 16;
                    this[offset + 2] = value >>> 8;
                    this[offset + 3] = value & 255;
                  } else {
                    objectWriteUInt32(this, value, offset, false);
                  }
                  return offset + 4;
                };
                Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) {
                    var limit = Math.pow(2, 8 * byteLength2 - 1);
                    checkInt(this, value, offset, byteLength2, limit - 1, -limit);
                  }
                  var i = 0;
                  var mul = 1;
                  var sub = 0;
                  this[offset] = value & 255;
                  while (++i < byteLength2 && (mul *= 256)) {
                    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                      sub = 1;
                    }
                    this[offset + i] = (value / mul >> 0) - sub & 255;
                  }
                  return offset + byteLength2;
                };
                Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) {
                    var limit = Math.pow(2, 8 * byteLength2 - 1);
                    checkInt(this, value, offset, byteLength2, limit - 1, -limit);
                  }
                  var i = byteLength2 - 1;
                  var mul = 1;
                  var sub = 0;
                  this[offset + i] = value & 255;
                  while (--i >= 0 && (mul *= 256)) {
                    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                      sub = 1;
                    }
                    this[offset + i] = (value / mul >> 0) - sub & 255;
                  }
                  return offset + byteLength2;
                };
                Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
                  if (!Buffer2.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
                  if (value < 0) value = 255 + value + 1;
                  this[offset] = value & 255;
                  return offset + 1;
                };
                Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
                  if (Buffer2.TYPED_ARRAY_SUPPORT) {
                    this[offset] = value & 255;
                    this[offset + 1] = value >>> 8;
                  } else {
                    objectWriteUInt16(this, value, offset, true);
                  }
                  return offset + 2;
                };
                Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
                  if (Buffer2.TYPED_ARRAY_SUPPORT) {
                    this[offset] = value >>> 8;
                    this[offset + 1] = value & 255;
                  } else {
                    objectWriteUInt16(this, value, offset, false);
                  }
                  return offset + 2;
                };
                Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
                  if (Buffer2.TYPED_ARRAY_SUPPORT) {
                    this[offset] = value & 255;
                    this[offset + 1] = value >>> 8;
                    this[offset + 2] = value >>> 16;
                    this[offset + 3] = value >>> 24;
                  } else {
                    objectWriteUInt32(this, value, offset, true);
                  }
                  return offset + 4;
                };
                Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
                  value = +value;
                  offset = offset | 0;
                  if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
                  if (value < 0) value = 4294967295 + value + 1;
                  if (Buffer2.TYPED_ARRAY_SUPPORT) {
                    this[offset] = value >>> 24;
                    this[offset + 1] = value >>> 16;
                    this[offset + 2] = value >>> 8;
                    this[offset + 3] = value & 255;
                  } else {
                    objectWriteUInt32(this, value, offset, false);
                  }
                  return offset + 4;
                };
                function checkIEEE754(buf, value, offset, ext, max, min) {
                  if (offset + ext > buf.length) throw new RangeError("Index out of range");
                  if (offset < 0) throw new RangeError("Index out of range");
                }
                function writeFloat(buf, value, offset, littleEndian, noAssert) {
                  if (!noAssert) {
                    checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
                  }
                  ieee754.write(buf, value, offset, littleEndian, 23, 4);
                  return offset + 4;
                }
                Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
                  return writeFloat(this, value, offset, true, noAssert);
                };
                Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
                  return writeFloat(this, value, offset, false, noAssert);
                };
                function writeDouble(buf, value, offset, littleEndian, noAssert) {
                  if (!noAssert) {
                    checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
                  }
                  ieee754.write(buf, value, offset, littleEndian, 52, 8);
                  return offset + 8;
                }
                Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
                  return writeDouble(this, value, offset, true, noAssert);
                };
                Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
                  return writeDouble(this, value, offset, false, noAssert);
                };
                Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
                  if (!start) start = 0;
                  if (!end && end !== 0) end = this.length;
                  if (targetStart >= target.length) targetStart = target.length;
                  if (!targetStart) targetStart = 0;
                  if (end > 0 && end < start) end = start;
                  if (end === start) return 0;
                  if (target.length === 0 || this.length === 0) return 0;
                  if (targetStart < 0) {
                    throw new RangeError("targetStart out of bounds");
                  }
                  if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
                  if (end < 0) throw new RangeError("sourceEnd out of bounds");
                  if (end > this.length) end = this.length;
                  if (target.length - targetStart < end - start) {
                    end = target.length - targetStart + start;
                  }
                  var len = end - start;
                  var i;
                  if (this === target && start < targetStart && targetStart < end) {
                    for (i = len - 1; i >= 0; --i) {
                      target[i + targetStart] = this[i + start];
                    }
                  } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
                    for (i = 0; i < len; ++i) {
                      target[i + targetStart] = this[i + start];
                    }
                  } else {
                    Uint8Array.prototype.set.call(
                      target,
                      this.subarray(start, start + len),
                      targetStart
                    );
                  }
                  return len;
                };
                Buffer2.prototype.fill = function fill(val, start, end, encoding) {
                  if (typeof val === "string") {
                    if (typeof start === "string") {
                      encoding = start;
                      start = 0;
                      end = this.length;
                    } else if (typeof end === "string") {
                      encoding = end;
                      end = this.length;
                    }
                    if (val.length === 1) {
                      var code = val.charCodeAt(0);
                      if (code < 256) {
                        val = code;
                      }
                    }
                    if (encoding !== void 0 && typeof encoding !== "string") {
                      throw new TypeError("encoding must be a string");
                    }
                    if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
                      throw new TypeError("Unknown encoding: " + encoding);
                    }
                  } else if (typeof val === "number") {
                    val = val & 255;
                  }
                  if (start < 0 || this.length < start || this.length < end) {
                    throw new RangeError("Out of range index");
                  }
                  if (end <= start) {
                    return this;
                  }
                  start = start >>> 0;
                  end = end === void 0 ? this.length : end >>> 0;
                  if (!val) val = 0;
                  var i;
                  if (typeof val === "number") {
                    for (i = start; i < end; ++i) {
                      this[i] = val;
                    }
                  } else {
                    var bytes = Buffer2.isBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString());
                    var len = bytes.length;
                    for (i = 0; i < end - start; ++i) {
                      this[i + start] = bytes[i % len];
                    }
                  }
                  return this;
                };
                var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
                function base64clean(str) {
                  str = stringtrim(str).replace(INVALID_BASE64_RE, "");
                  if (str.length < 2) return "";
                  while (str.length % 4 !== 0) {
                    str = str + "=";
                  }
                  return str;
                }
                function stringtrim(str) {
                  if (str.trim) return str.trim();
                  return str.replace(/^\s+|\s+$/g, "");
                }
                function toHex(n) {
                  if (n < 16) return "0" + n.toString(16);
                  return n.toString(16);
                }
                function utf8ToBytes(string, units) {
                  units = units || Infinity;
                  var codePoint;
                  var length = string.length;
                  var leadSurrogate = null;
                  var bytes = [];
                  for (var i = 0; i < length; ++i) {
                    codePoint = string.charCodeAt(i);
                    if (codePoint > 55295 && codePoint < 57344) {
                      if (!leadSurrogate) {
                        if (codePoint > 56319) {
                          if ((units -= 3) > -1) bytes.push(239, 191, 189);
                          continue;
                        } else if (i + 1 === length) {
                          if ((units -= 3) > -1) bytes.push(239, 191, 189);
                          continue;
                        }
                        leadSurrogate = codePoint;
                        continue;
                      }
                      if (codePoint < 56320) {
                        if ((units -= 3) > -1) bytes.push(239, 191, 189);
                        leadSurrogate = codePoint;
                        continue;
                      }
                      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
                    } else if (leadSurrogate) {
                      if ((units -= 3) > -1) bytes.push(239, 191, 189);
                    }
                    leadSurrogate = null;
                    if (codePoint < 128) {
                      if ((units -= 1) < 0) break;
                      bytes.push(codePoint);
                    } else if (codePoint < 2048) {
                      if ((units -= 2) < 0) break;
                      bytes.push(
                        codePoint >> 6 | 192,
                        codePoint & 63 | 128
                      );
                    } else if (codePoint < 65536) {
                      if ((units -= 3) < 0) break;
                      bytes.push(
                        codePoint >> 12 | 224,
                        codePoint >> 6 & 63 | 128,
                        codePoint & 63 | 128
                      );
                    } else if (codePoint < 1114112) {
                      if ((units -= 4) < 0) break;
                      bytes.push(
                        codePoint >> 18 | 240,
                        codePoint >> 12 & 63 | 128,
                        codePoint >> 6 & 63 | 128,
                        codePoint & 63 | 128
                      );
                    } else {
                      throw new Error("Invalid code point");
                    }
                  }
                  return bytes;
                }
                function asciiToBytes(str) {
                  var byteArray = [];
                  for (var i = 0; i < str.length; ++i) {
                    byteArray.push(str.charCodeAt(i) & 255);
                  }
                  return byteArray;
                }
                function utf16leToBytes(str, units) {
                  var c, hi, lo;
                  var byteArray = [];
                  for (var i = 0; i < str.length; ++i) {
                    if ((units -= 2) < 0) break;
                    c = str.charCodeAt(i);
                    hi = c >> 8;
                    lo = c % 256;
                    byteArray.push(lo);
                    byteArray.push(hi);
                  }
                  return byteArray;
                }
                function base64ToBytes(str) {
                  return base64.toByteArray(base64clean(str));
                }
                function blitBuffer(src, dst, offset, length) {
                  for (var i = 0; i < length; ++i) {
                    if (i + offset >= dst.length || i >= src.length) break;
                    dst[i + offset] = src[i];
                  }
                  return i;
                }
                function isnan(val) {
                  return val !== val;
                }
              }).call(this, __webpack_require__2(
                /*! ./../webpack/buildin/global.js */
                "../node_modules/webpack/buildin/global.js"
              ));
            }
          ),
          /***/
          "../node_modules/cadesplugin_api.js-actual/dist/cadesplugin_api.js": (
            /*!*************************************************************************!*\
              !*** ../node_modules/cadesplugin_api.js-actual/dist/cadesplugin_api.js ***!
              \*************************************************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2) {
              ;
              (function() {
                if (window.cadesplugin && window.cadesplugin.LOG_LEVEL_DEBUG) {
                  return;
                }
                var pluginObject;
                var plugin_resolved = 0;
                var plugin_reject;
                var plugin_resolve;
                var isOpera = 0;
                var isFireFox = 0;
                var isSafari = 0;
                var isYandex = 0;
                var canPromise = !!window.Promise;
                var cadesplugin_loaded_event_recieved = false;
                var isFireFoxExtensionLoaded = false;
                var cadesplugin2 = {};
                if (canPromise) {
                  cadesplugin2 = new window.Promise(function(resolve, reject) {
                    plugin_resolve = resolve;
                    plugin_reject = reject;
                  });
                }
                function check_browser() {
                  var ua = window.navigator.userAgent, tem, M = ua.match(/(opera|yabrowser|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                  if (/trident/i.test(M[1])) {
                    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return { name: "IE", version: tem[1] || "" };
                  }
                  if (M[1] === "Chrome") {
                    tem = ua.match(/\b(OPR|Edg|YaBrowser)\/(\d+)/);
                    if (tem != null && tem.length > 2) {
                      return { name: tem[1].replace("OPR", "Opera"), version: tem[2] };
                    }
                  }
                  M = M[2] ? [M[1], M[2]] : [window.navigator.appName, window.navigator.appVersion, "-?"];
                  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
                    M.splice(1, 1, tem[1]);
                  }
                  return { name: M[0], version: M[1] };
                }
                var browserSpecs = check_browser();
                function cpcsp_console_log(level, msg) {
                  if (typeof console === "undefined") {
                    return;
                  }
                  if (level <= cadesplugin2.current_log_level) {
                    if (level === cadesplugin2.LOG_LEVEL_DEBUG) {
                      console.log("DEBUG: %s", msg);
                    }
                    if (level === cadesplugin2.LOG_LEVEL_INFO) {
                      console.info("INFO: %s", msg);
                    }
                    if (level === cadesplugin2.LOG_LEVEL_ERROR) {
                      console.error("ERROR: %s", msg);
                    }
                  }
                }
                function get_extension_version(callback) {
                  window.postMessage("cadesplugin_extension_version_request", "*");
                  window.addEventListener("message", function(event) {
                    var resp_prefix = "cadesplugin_extension_version_response:";
                    if (typeof event.data !== "string" || event.data.indexOf(resp_prefix) !== 0) {
                      return;
                    }
                    var ext_version = event.data.substring(resp_prefix.length);
                    callback(ext_version);
                  }, false);
                }
                function get_extension_id(callback) {
                  window.postMessage("cadesplugin_extension_id_request", "*");
                  window.addEventListener("message", function(event) {
                    var resp_prefix = "cadesplugin_extension_id_response:";
                    if (typeof event.data !== "string" || event.data.indexOf(resp_prefix) !== 0) {
                      return;
                    }
                    var ext_id = event.data.substring(resp_prefix.length);
                    callback(ext_id);
                  }, false);
                }
                function set_log_level(level) {
                  if (!(level === cadesplugin2.LOG_LEVEL_DEBUG || level === cadesplugin2.LOG_LEVEL_INFO || level === cadesplugin2.LOG_LEVEL_ERROR)) {
                    cpcsp_console_log(cadesplugin2.LOG_LEVEL_ERROR, "cadesplugin_api.js: Incorrect log_level: " + level);
                    return;
                  }
                  cadesplugin2.current_log_level = level;
                  if (cadesplugin2.current_log_level === cadesplugin2.LOG_LEVEL_DEBUG) {
                    cpcsp_console_log(cadesplugin2.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = DEBUG");
                  }
                  if (cadesplugin2.current_log_level === cadesplugin2.LOG_LEVEL_INFO) {
                    cpcsp_console_log(cadesplugin2.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = INFO");
                  }
                  if (cadesplugin2.current_log_level === cadesplugin2.LOG_LEVEL_ERROR) {
                    cpcsp_console_log(cadesplugin2.LOG_LEVEL_INFO, "cadesplugin_api.js: log_level = ERROR");
                  }
                  if (isNativeMessageSupported()) {
                    if (cadesplugin2.current_log_level === cadesplugin2.LOG_LEVEL_DEBUG) {
                      window.postMessage("set_log_level=debug", "*");
                    }
                    if (cadesplugin2.current_log_level === cadesplugin2.LOG_LEVEL_INFO) {
                      window.postMessage("set_log_level=info", "*");
                    }
                    if (cadesplugin2.current_log_level === cadesplugin2.LOG_LEVEL_ERROR) {
                      window.postMessage("set_log_level=error", "*");
                    }
                  }
                }
                function set_constantValues() {
                  cadesplugin2.CAPICOM_MEMORY_STORE = 0;
                  cadesplugin2.CAPICOM_LOCAL_MACHINE_STORE = 1;
                  cadesplugin2.CAPICOM_CURRENT_USER_STORE = 2;
                  cadesplugin2.CAPICOM_SMART_CARD_USER_STORE = 4;
                  cadesplugin2.CADESCOM_MEMORY_STORE = 0;
                  cadesplugin2.CADESCOM_LOCAL_MACHINE_STORE = 1;
                  cadesplugin2.CADESCOM_CURRENT_USER_STORE = 2;
                  cadesplugin2.CADESCOM_SMART_CARD_USER_STORE = 4;
                  cadesplugin2.CADESCOM_CONTAINER_STORE = 100;
                  cadesplugin2.CAPICOM_ROOT_STORE = "Root";
                  cadesplugin2.CAPICOM_CA_STORE = "CA";
                  cadesplugin2.CAPICOM_MY_STORE = "My";
                  cadesplugin2.CAPICOM_ADDRESSBOOK_STORE = "AddressBook";
                  cadesplugin2.CAPICOM_STORE_OPEN_READ_WRITE = 1;
                  cadesplugin2.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
                  cadesplugin2.CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED = 256;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
                  cadesplugin2.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED = 0;
                  cadesplugin2.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING = 1;
                  cadesplugin2.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE = 2;
                  cadesplugin2.CADESCOM_XADES_DEFAULT = 16;
                  cadesplugin2.CADESCOM_XADES_BES = 32;
                  cadesplugin2.CADESCOM_XADES_T = 80;
                  cadesplugin2.CADESCOM_XADES_X_LONG_TYPE_1 = 1488;
                  cadesplugin2.CADESCOM_XMLDSIG_TYPE = 0;
                  cadesplugin2.XmlDsigGost3410UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411";
                  cadesplugin2.XmlDsigGost3411UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr3411";
                  cadesplugin2.XmlDsigGost3410Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411";
                  cadesplugin2.XmlDsigGost3411Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411";
                  cadesplugin2.XmlDsigGost3411Url2012256 = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256";
                  cadesplugin2.XmlDsigGost3410Url2012256 = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-256";
                  cadesplugin2.XmlDsigGost3411Url2012512 = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-512";
                  cadesplugin2.XmlDsigGost3410Url2012512 = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-512";
                  cadesplugin2.CADESCOM_CADES_DEFAULT = 0;
                  cadesplugin2.CADESCOM_CADES_BES = 1;
                  cadesplugin2.CADESCOM_CADES_T = 5;
                  cadesplugin2.CADESCOM_CADES_X_LONG_TYPE_1 = 93;
                  cadesplugin2.CADESCOM_CADES_A = 221;
                  cadesplugin2.CADESCOM_PKCS7_TYPE = 65535;
                  cadesplugin2.CADESCOM_ENCODE_BASE64 = 0;
                  cadesplugin2.CADESCOM_ENCODE_BINARY = 1;
                  cadesplugin2.CADESCOM_ENCODE_ANY = -1;
                  cadesplugin2.CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT = 0;
                  cadesplugin2.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN = 1;
                  cadesplugin2.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY = 2;
                  cadesplugin2.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME = 0;
                  cadesplugin2.CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME = 1;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_SHA1_HASH = 0;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_ISSUER_NAME = 2;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_ROOT_NAME = 3;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME = 4;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_EXTENSION = 5;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY = 6;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY = 7;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY = 8;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_TIME_VALID = 9;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID = 10;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED = 11;
                  cadesplugin2.CAPICOM_CERTIFICATE_FIND_KEY_USAGE = 12;
                  cadesplugin2.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE = 128;
                  cadesplugin2.CAPICOM_PROPID_ENHKEY_USAGE = 9;
                  cadesplugin2.CAPICOM_OID_OTHER = 0;
                  cadesplugin2.CAPICOM_OID_KEY_USAGE_EXTENSION = 10;
                  cadesplugin2.CAPICOM_EKU_CLIENT_AUTH = 2;
                  cadesplugin2.CAPICOM_EKU_SMARTCARD_LOGON = 5;
                  cadesplugin2.CAPICOM_EKU_OTHER = 0;
                  cadesplugin2.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
                  cadesplugin2.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
                  cadesplugin2.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
                  cadesplugin2.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
                  cadesplugin2.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
                  cadesplugin2.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
                  cadesplugin2.CADESCOM_AUTHENTICATED_ATTRIBUTE_MACHINE_INFO = 256;
                  cadesplugin2.CADESCOM_ATTRIBUTE_OTHER = -1;
                  cadesplugin2.CADESCOM_STRING_TO_UCS2LE = 0;
                  cadesplugin2.CADESCOM_BASE64_TO_BINARY = 1;
                  cadesplugin2.CADESCOM_DISPLAY_DATA_NONE = 0;
                  cadesplugin2.CADESCOM_DISPLAY_DATA_CONTENT = 1;
                  cadesplugin2.CADESCOM_DISPLAY_DATA_ATTRIBUTE = 2;
                  cadesplugin2.CADESCOM_ENCRYPTION_ALGORITHM_RC2 = 0;
                  cadesplugin2.CADESCOM_ENCRYPTION_ALGORITHM_RC4 = 1;
                  cadesplugin2.CADESCOM_ENCRYPTION_ALGORITHM_DES = 2;
                  cadesplugin2.CADESCOM_ENCRYPTION_ALGORITHM_3DES = 3;
                  cadesplugin2.CADESCOM_ENCRYPTION_ALGORITHM_AES = 4;
                  cadesplugin2.CADESCOM_ENCRYPTION_ALGORITHM_GOST_28147_89 = 25;
                  cadesplugin2.CADESCOM_ENCRYPTION_ALGORITHM_GOST_MAGMA = 35;
                  cadesplugin2.CADESCOM_ENCRYPTION_ALGORITHM_GOST_MAGMA_OMAC = 36;
                  cadesplugin2.CADESCOM_ENCRYPTION_ALGORITHM_GOST_KUZNYECHIK = 45;
                  cadesplugin2.CADESCOM_ENCRYPTION_ALGORITHM_GOST_KUZNYECHIK_OMAC = 46;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_SHA1 = 0;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_MD2 = 1;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_MD4 = 2;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_MD5 = 3;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_SHA_256 = 4;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_SHA_384 = 5;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_SHA_512 = 6;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411 = 100;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256 = 101;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512 = 102;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_HMAC = 110;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256_HMAC = 111;
                  cadesplugin2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512_HMAC = 112;
                  cadesplugin2.CADESCOM_CERT_INFO_ROLE = 100;
                  cadesplugin2.CADESCOM_ROLE_ROOT = "ROOT";
                  cadesplugin2.CADESCOM_ROLE_CA = "CA";
                  cadesplugin2.CADESCOM_ROLE_LEAF = "LEAF";
                  cadesplugin2.LOG_LEVEL_DEBUG = 4;
                  cadesplugin2.LOG_LEVEL_INFO = 2;
                  cadesplugin2.LOG_LEVEL_ERROR = 1;
                  cadesplugin2.CADESCOM_AllowNone = 0;
                  cadesplugin2.CADESCOM_AllowNoOutstandingRequest = 1;
                  cadesplugin2.CADESCOM_AllowUntrustedCertificate = 2;
                  cadesplugin2.CADESCOM_AllowUntrustedRoot = 4;
                  cadesplugin2.CADESCOM_SkipInstallToStore = 268435456;
                  cadesplugin2.CADESCOM_InstallCertChainToContainer = 536870912;
                  cadesplugin2.CADESCOM_UseContainerStore = 1073741824;
                  cadesplugin2.ContextNone = 0;
                  cadesplugin2.ContextUser = 1;
                  cadesplugin2.ContextMachine = 2;
                  cadesplugin2.ContextAdministratorForceMachine = 3;
                  cadesplugin2.ENABLE_CARRIER_TYPE_CSP = 1;
                  cadesplugin2.ENABLE_CARRIER_TYPE_FKC_NO_SM = 2;
                  cadesplugin2.ENABLE_CARRIER_TYPE_FKC_SM = 4;
                  cadesplugin2.ENABLE_ANY_CARRIER_TYPE = 7;
                  cadesplugin2.DISABLE_EVERY_CARRIER_OPERATION = 0;
                  cadesplugin2.ENABLE_CARRIER_OPEN_ENUM = 1;
                  cadesplugin2.ENABLE_CARRIER_CREATE = 2;
                  cadesplugin2.ENABLE_ANY_OPERATION = 3;
                  cadesplugin2.CADESCOM_PRODUCT_CSP = 0;
                  cadesplugin2.CADESCOM_PRODUCT_OCSP = 1;
                  cadesplugin2.CADESCOM_PRODUCT_TSP = 2;
                  cadesplugin2.MEDIA_TYPE_DEFAULT = 0;
                  cadesplugin2.MEDIA_TYPE_REGISTRY = 1;
                  cadesplugin2.MEDIA_TYPE_HDIMAGE = 2;
                  cadesplugin2.MEDIA_TYPE_CLOUD = 4;
                  cadesplugin2.MEDIA_TYPE_SCARD = 8;
                  cadesplugin2.XCN_CRYPT_STRING_BASE64HEADER = 0;
                  cadesplugin2.XCN_CRYPT_STRING_BASE64 = 1;
                  cadesplugin2.XCN_CRYPT_STRING_BINARY = 2;
                  cadesplugin2.XCN_CRYPT_STRING_BASE64REQUESTHEADER = 3;
                  cadesplugin2.XCN_CRYPT_STRING_HEX = 4;
                  cadesplugin2.XCN_CRYPT_STRING_HEXASCII = 5;
                  cadesplugin2.XCN_CRYPT_STRING_BASE64_ANY = 6;
                  cadesplugin2.XCN_CRYPT_STRING_ANY = 7;
                  cadesplugin2.XCN_CRYPT_STRING_HEX_ANY = 8;
                  cadesplugin2.XCN_CRYPT_STRING_BASE64X509CRLHEADER = 9;
                  cadesplugin2.XCN_CRYPT_STRING_HEXADDR = 10;
                  cadesplugin2.XCN_CRYPT_STRING_HEXASCIIADDR = 11;
                  cadesplugin2.XCN_CRYPT_STRING_HEXRAW = 12;
                  cadesplugin2.XCN_CRYPT_STRING_BASE64URI = 13;
                  cadesplugin2.XCN_CRYPT_STRING_ENCODEMASK = 255;
                  cadesplugin2.XCN_CRYPT_STRING_CHAIN = 256;
                  cadesplugin2.XCN_CRYPT_STRING_TEXT = 512;
                  cadesplugin2.XCN_CRYPT_STRING_PERCENTESCAPE = 134217728;
                  cadesplugin2.XCN_CRYPT_STRING_HASHDATA = 268435456;
                  cadesplugin2.XCN_CRYPT_STRING_STRICT = 536870912;
                  cadesplugin2.XCN_CRYPT_STRING_NOCRLF = 1073741824;
                  cadesplugin2.XCN_CRYPT_STRING_NOCR = 2147483648;
                  cadesplugin2.XCN_CERT_NAME_STR_NONE = 0;
                  cadesplugin2.XCN_AT_NONE = 0;
                  cadesplugin2.XCN_AT_KEYEXCHANGE = 1;
                  cadesplugin2.XCN_AT_SIGNATURE = 2;
                  cadesplugin2.AT_KEYEXCHANGE = 1;
                  cadesplugin2.AT_SIGNATURE = 2;
                  cadesplugin2.CARRIER_FLAG_REMOVABLE = 1;
                  cadesplugin2.CARRIER_FLAG_UNIQUE = 2;
                  cadesplugin2.CARRIER_FLAG_PROTECTED = 4;
                  cadesplugin2.CARRIER_FLAG_FUNCTIONAL_CARRIER = 8;
                  cadesplugin2.CARRIER_FLAG_SECURE_MESSAGING = 16;
                  cadesplugin2.CARRIER_FLAG_ABLE_SET_KEY = 32;
                  cadesplugin2.CARRIER_FLAG_ABLE_VISUALISE_SIGNATURE = 64;
                  cadesplugin2.CARRIER_FLAG_VIRTUAL = 128;
                  cadesplugin2.CRYPT_MODE_CBCSTRICT = 1;
                  cadesplugin2.CRYPT_MODE_CNT = 3;
                  cadesplugin2.CRYPT_MODE_CBCRFC4357 = 31;
                  cadesplugin2.CRYPT_MODE_CTR = 32;
                  cadesplugin2.CRYPT_MODE_MGM = 33;
                  cadesplugin2.CRYPT_MODE_GCM = 34;
                  cadesplugin2.CRYPT_MODE_OMAC_CTR = 35;
                  cadesplugin2.CRYPT_MODE_WRAP = 36;
                  cadesplugin2.CRYPT_MODE_WRAP_PAD = 37;
                  cadesplugin2.PKCS5_PADDING = 1;
                  cadesplugin2.RANDOM_PADDING = 2;
                  cadesplugin2.ZERO_PADDING = 3;
                  cadesplugin2.ISO10126_PADDING = 4;
                  cadesplugin2.ANSI_X923_PADDING = 5;
                  cadesplugin2.TLS_1_0_PADDING = 6;
                  cadesplugin2.ISO_IEC_7816_4_PADDING = 7;
                  cadesplugin2.CAPICOM_STORE_SAVE_AS_SERIALIZED = 0;
                  cadesplugin2.CAPICOM_STORE_SAVE_AS_PKCS7 = 1;
                  cadesplugin2.CERT_TRUST_NO_ERROR = 0;
                  cadesplugin2.CERT_TRUST_IS_NOT_TIME_VALID = 1;
                  cadesplugin2.CERT_TRUST_IS_REVOKED = 4;
                  cadesplugin2.CERT_TRUST_IS_NOT_SIGNATURE_VALID = 8;
                  cadesplugin2.CERT_TRUST_IS_NOT_VALID_FOR_USAGE = 16;
                  cadesplugin2.CERT_TRUST_IS_UNTRUSTED_ROOT = 32;
                  cadesplugin2.CERT_TRUST_REVOCATION_STATUS_UNKNOWN = 64;
                  cadesplugin2.CERT_TRUST_IS_CYCLIC = 128;
                  cadesplugin2.CERT_TRUST_INVALID_EXTENSION = 256;
                  cadesplugin2.CERT_TRUST_INVALID_POLICY_CONSTRAINTS = 512;
                  cadesplugin2.CERT_TRUST_INVALID_BASIC_CONSTRAINTS = 1024;
                  cadesplugin2.CERT_TRUST_INVALID_NAME_CONSTRAINTS = 2048;
                  cadesplugin2.CERT_TRUST_HAS_NOT_SUPPORTED_NAME_CONSTRAINT = 4096;
                  cadesplugin2.CERT_TRUST_HAS_NOT_DEFINED_NAME_CONSTRAINT = 8192;
                  cadesplugin2.CERT_TRUST_HAS_NOT_PERMITTED_NAME_CONSTRAINT = 16384;
                  cadesplugin2.CERT_TRUST_HAS_EXCLUDED_NAME_CONSTRAINT = 32768;
                  cadesplugin2.CERT_TRUST_IS_OFFLINE_REVOCATION = 16777216;
                  cadesplugin2.CERT_TRUST_NO_ISSUANCE_CHAIN_POLICY = 33554432;
                  cadesplugin2.CERT_TRUST_IS_EXPLICIT_DISTRUST = 67108864;
                  cadesplugin2.CERT_TRUST_HAS_NOT_SUPPORTED_CRITICAL_EXT = 134217728;
                  cadesplugin2.CERT_TRUST_HAS_WEAK_SIGNATURE = 1048576;
                  cadesplugin2.XCN_CERT_NO_KEY_USAGE = 0;
                  cadesplugin2.XCN_CERT_DIGITAL_SIGNATURE_KEY_USAGE = 128;
                  cadesplugin2.XCN_CERT_NON_REPUDIATION_KEY_USAGE = 64;
                  cadesplugin2.XCN_CERT_KEY_ENCIPHERMENT_KEY_USAGE = 32;
                  cadesplugin2.XCN_CERT_DATA_ENCIPHERMENT_KEY_USAGE = 16;
                  cadesplugin2.XCN_CERT_KEY_AGREEMENT_KEY_USAGE = 8;
                  cadesplugin2.XCN_CERT_KEY_CERT_SIGN_KEY_USAGE = 4;
                  cadesplugin2.XCN_CERT_OFFLINE_CRL_SIGN_KEY_USAGE = 2;
                  cadesplugin2.XCN_CERT_CRL_SIGN_KEY_USAGE = 2;
                  cadesplugin2.XCN_CERT_ENCIPHER_ONLY_KEY_USAGE = 1;
                  cadesplugin2.XCN_CERT_DECIPHER_ONLY_KEY_USAGE = 32768;
                  cadesplugin2.CADESCOM_XADES_ACCEPT_ANY_ID_ATTR_NAMESPACE = 1;
                  cadesplugin2.CADES_USE_OCSP_AUTHORIZED_POLICY = 131072;
                  cadesplugin2.XCN_NCRYPT_NO_OPERATION = 0;
                  cadesplugin2.XCN_NCRYPT_CIPHER_OPERATION = 1;
                  cadesplugin2.XCN_NCRYPT_HASH_OPERATION = 2;
                  cadesplugin2.XCN_NCRYPT_ASYMMETRIC_ENCRYPTION_OPERATION = 4;
                  cadesplugin2.XCN_NCRYPT_SECRET_AGREEMENT_OPERATION = 8;
                  cadesplugin2.XCN_NCRYPT_SIGNATURE_OPERATION = 16;
                  cadesplugin2.XCN_NCRYPT_RNG_OPERATION = 32;
                  cadesplugin2.XCN_CRYPT_ANY_GROUP_ID = 0;
                  cadesplugin2.XCN_CRYPT_HASH_ALG_OID_GROUP_ID = 1;
                  cadesplugin2.XCN_CRYPT_ENCRYPT_ALG_OID_GROUP_ID = 2;
                  cadesplugin2.XCN_CRYPT_PUBKEY_ALG_OID_GROUP_ID = 3;
                  cadesplugin2.XCN_CRYPT_SIGN_ALG_OID_GROUP_ID = 4;
                  cadesplugin2.XCN_CRYPT_RDN_ATTR_OID_GROUP_ID = 5;
                  cadesplugin2.XCN_CRYPT_EXT_OR_ATTR_OID_GROUP_ID = 6;
                  cadesplugin2.XCN_CRYPT_ENHKEY_USAGE_OID_GROUP_ID = 7;
                  cadesplugin2.XCN_CRYPT_POLICY_OID_GROUP_ID = 8;
                  cadesplugin2.XCN_CRYPT_TEMPLATE_OID_GROUP_ID = 9;
                  cadesplugin2.XCN_CRYPT_OID_INFO_PUBKEY_ANY = 0;
                  cadesplugin2.XCN_CRYPT_OID_INFO_PUBKEY_SIGN_KEY_FLAG = 2147483648;
                  cadesplugin2.XCN_CRYPT_OID_INFO_PUBKEY_ENCRYPT_KEY_FLAG = 1073741824;
                  cadesplugin2.CONTROL_KEY_TIME_VALIDITY_DISABLED = 0;
                  cadesplugin2.CONTROL_KEY_TIME_VALIDITY_ENABLED = 1;
                  cadesplugin2.CONTROL_KEY_TIME_VALIDITY_STRICT = 2;
                  cadesplugin2.AlgorithmFlagsNone = 0;
                  cadesplugin2.AlgorithmFlagsWrap = 1;
                }
                function async_spawn(generatorFunc) {
                  function continuer(verb, arg) {
                    var result;
                    try {
                      result = generator[verb](arg);
                    } catch (err) {
                      return window.Promise.reject(err);
                    }
                    if (result.done) {
                      return result.value;
                    } else {
                      return window.Promise.resolve(result.value).then(onFulfilled, onRejected);
                    }
                  }
                  var generator = generatorFunc(Array.prototype.slice.call(arguments, 1));
                  var onFulfilled = continuer.bind(continuer, "next");
                  var onRejected = continuer.bind(continuer, "throw");
                  return onFulfilled();
                }
                function isIE() {
                  return browserSpecs.name === "IE" || browserSpecs.name === "MSIE";
                }
                function isIOS() {
                  return window.navigator.userAgent.match(/ipod/i) || window.navigator.userAgent.match(/ipad/i) || window.navigator.userAgent.match(/iphone/i);
                }
                function isNativeMessageSupported() {
                  if (isIE()) {
                    return false;
                  }
                  if (browserSpecs.name === "Edg") {
                    return true;
                  }
                  if (browserSpecs.name === "YaBrowser") {
                    isYandex = true;
                    return true;
                  }
                  if (browserSpecs.name === "Opera") {
                    isOpera = true;
                    return browserSpecs.version >= 33;
                  }
                  if (browserSpecs.name === "Firefox") {
                    isFireFox = true;
                    return browserSpecs.version >= 52;
                  }
                  if (browserSpecs.name === "Chrome") {
                    return browserSpecs.version >= 42;
                  }
                  if (browserSpecs.name === "Safari") {
                    isSafari = true;
                    return browserSpecs.version >= 12;
                  }
                }
                function CreateObject(name) {
                  if (isIOS()) {
                    return call_ru_cryptopro_npcades_10_native_bridge("CreateObject", [name]);
                  }
                  var objWebClassFactory;
                  if (isIE()) {
                    if (name.match(/X509Enrollment/i)) {
                      try {
                        objWebClassFactory = document.getElementById("webClassFactory");
                        return objWebClassFactory.CreateObject(name);
                      } catch (e) {
                        try {
                          var objCertEnrollClassFactory = document.getElementById("certEnrollClassFactory");
                          return objCertEnrollClassFactory.CreateObject(name);
                        } catch (err) {
                          throw "\u0414\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043E\u0431\u044C\u0435\u043A\u0442\u043E\u0432 X509Enrollment \u0441\u043B\u0435\u0434\u0443\u0435\u0442 \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0432\u0435\u0431-\u0443\u0437\u0435\u043B \u043D\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043F\u043E\u0434\u043B\u0438\u043D\u043D\u043E\u0441\u0442\u0438 \u043F\u043E \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0443 HTTPS";
                        }
                      }
                    }
                    try {
                      objWebClassFactory = document.getElementById("webClassFactory");
                      return objWebClassFactory.CreateObject(name);
                    } catch (e) {
                      return new window.ActiveXObject(name);
                    }
                  }
                  return pluginObject.CreateObject(name);
                }
                function decimalToHexString(number) {
                  if (number < 0) {
                    number = 4294967295 + number + 1;
                  }
                  return number.toString(16).toUpperCase();
                }
                function GetMessageFromException(e) {
                  var err = e.message;
                  if (!err) {
                    err = e;
                  } else if (e.number) {
                    err += " (0x" + decimalToHexString(e.number) + ")";
                  }
                  return err;
                }
                function getLastError(exception) {
                  if (isNativeMessageSupported() || isIE() || isIOS()) {
                    return GetMessageFromException(exception);
                  }
                  try {
                    return pluginObject.getLastError();
                  } catch (e) {
                    return GetMessageFromException(exception);
                  }
                }
                function ReleasePluginObjects() {
                  return cpcsp_chrome_nmcades.ReleasePluginObjects();
                }
                function CreateObjectAsync(name) {
                  return pluginObject.CreateObjectAsync(name);
                }
                var ru_cryptopro_npcades_10_native_bridge = {
                  callbacksCount: 1,
                  callbacks: {},
                  // Automatically called by native layer when a result is available
                  resultForCallback: function resultForCallback(callbackId, resultArray) {
                    var callback = ru_cryptopro_npcades_10_native_bridge.callbacks[callbackId];
                    if (!callback) {
                      return;
                    }
                    callback.apply(null, resultArray);
                  },
                  // Use this in javascript to request native objective-c code
                  // functionName : string (I think the name is explicit :p)
                  // args : array of arguments
                  // callback : function with n-arguments that is going to be called when the native code returned
                  call: function call(functionName, args, callback) {
                    var hasCallback = callback && typeof callback === "function";
                    var callbackId = hasCallback ? ru_cryptopro_npcades_10_native_bridge.callbacksCount++ : 0;
                    if (hasCallback) {
                      ru_cryptopro_npcades_10_native_bridge.callbacks[callbackId] = callback;
                    }
                    var iframe = document.createElement("IFRAME");
                    var arrObjs = new Array("_CPNP_handle");
                    try {
                      iframe.setAttribute("src", "cpnp-js-call:" + functionName + ":" + callbackId + ":" + encodeURIComponent(window.JSON.stringify(args, arrObjs)));
                    } catch (e) {
                      window.alert(e);
                    }
                    document.documentElement.appendChild(iframe);
                    iframe.parentNode.removeChild(iframe);
                    iframe = null;
                  }
                };
                function call_ru_cryptopro_npcades_10_native_bridge(functionName, array) {
                  var tmpobj;
                  var ex;
                  ru_cryptopro_npcades_10_native_bridge.call(functionName, array, function(e, response) {
                    ex = e;
                    var tmpobj2 = "";
                    try {
                      tmpobj2 = window.JSON.parse(response);
                    } catch (err) {
                      tmpobj2 = response;
                    }
                    if (typeof tmpobj2 === "string") {
                      tmpobj2 = tmpobj2.replace(/\\\n/gm, "\n");
                      tmpobj2 = tmpobj2.replace(/\\\r/gm, "\r");
                    }
                  });
                  if (ex) {
                    throw ex;
                  }
                  return tmpobj;
                }
                function show_firefox_missing_extension_dialog() {
                  if (!window.cadesplugin_skip_extension_install) {
                    var ovr = document.createElement("div");
                    ovr.id = "cadesplugin_ovr";
                    ovr.style = "visibility: hidden; position: fixed; left: 0; top: 0; width:100%; height:100%; background-color: rgba(0,0,0,0.7)";
                    ovr.innerHTML = "<div id='cadesplugin_ovr_item' style='position:relative; max-width:400px; margin:100px auto; background-color:#fff; border:2px solid #000; padding:10px; text-align:center; opacity: 1; z-index: 1500'><button id='cadesplugin_close_install' style='float: right; font-size: 10px; background: transparent; border: 1; margin: -5px'>X</button><p>\u0414\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u041A\u0440\u0438\u043F\u0442\u043E\u041F\u0440\u043E \u042D\u0426\u041F Browser plugin \u043D\u0430 \u0434\u0430\u043D\u043D\u043E\u043C \u0441\u0430\u0439\u0442\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u043E\u043D\u043E \u0443 \u0412\u0430\u0441 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u0438\u043B\u0438 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0435\u0433\u043E.<p><a href='https://www.cryptopro.ru/sites/default/files/products/cades/extensions/firefox_cryptopro_extension_latest.xpi'>\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435</a></p></div>";
                    document.getElementsByTagName("Body")[0].appendChild(ovr);
                    document.getElementById("cadesplugin_close_install").addEventListener("click", function() {
                      plugin_loaded_error("\u041F\u043B\u0430\u0433\u0438\u043D \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D");
                      document.getElementById("cadesplugin_ovr").style.visibility = "hidden";
                    });
                    ovr.addEventListener("click", function() {
                      plugin_loaded_error("\u041F\u043B\u0430\u0433\u0438\u043D \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D");
                      document.getElementById("cadesplugin_ovr").style.visibility = "hidden";
                    });
                    ovr.style.visibility = "visible";
                  }
                }
                function firefox_or_safari_nmcades_onload() {
                  if (window.cadesplugin_extension_loaded_callback) {
                    window.cadesplugin_extension_loaded_callback();
                  }
                  isFireFoxExtensionLoaded = true;
                  cpcsp_chrome_nmcades.check_chrome_plugin(plugin_loaded, plugin_loaded_error);
                }
                function load_js_script(url, successFunc, errorFunc) {
                  var script = document.createElement("script");
                  script.setAttribute("type", "text/javascript");
                  script.setAttribute("src", url);
                  script.onerror = errorFunc;
                  script.onload = successFunc;
                  document.getElementsByTagName("head")[0].appendChild(script);
                }
                function nmcades_api_onload() {
                  if (!isIE() && !isFireFox && !isSafari) {
                    if (window.cadesplugin_extension_loaded_callback) {
                      window.cadesplugin_extension_loaded_callback();
                    }
                  }
                  window.postMessage("cadesplugin_echo_request", "*");
                  window.addEventListener("message", function(event) {
                    if (typeof event.data !== "string" || !event.data.match("cadesplugin_loaded")) {
                      return;
                    }
                    if (cadesplugin_loaded_event_recieved) {
                      return;
                    }
                    if (isFireFox || isSafari) {
                      var url = event.data.substring(event.data.indexOf("url:") + 4);
                      if (!url.match("^(moz|safari)-extension://[a-zA-Z0-9/_-]+/nmcades_plugin_api.js$")) {
                        cpcsp_console_log(cadesplugin2.LOG_LEVEL_ERROR, 'Bad url "' + url + '" for load CryptoPro Extension for CAdES Browser plug-in');
                        plugin_loaded_error();
                        return;
                      }
                      load_js_script(url, firefox_or_safari_nmcades_onload, plugin_loaded_error);
                    } else {
                      cpcsp_chrome_nmcades.check_chrome_plugin(plugin_loaded, plugin_loaded_error);
                    }
                    cadesplugin_loaded_event_recieved = true;
                  }, false);
                }
                function load_extension() {
                  if (isFireFox || isSafari) {
                    nmcades_api_onload();
                    return;
                  }
                  var operaUrl = "chrome-extension://epebfcehmdedogndhlcacafjaacknbcm/nmcades_plugin_api.js";
                  var manifestv2Url = "chrome-extension://iifchhfnnmpdbibifmljnfjhpififfog/nmcades_plugin_api.js";
                  var manifestv3Url = "chrome-extension://pfhgbfnnjiafkhfdkmpiflachepdcjod/nmcades_plugin_api.js";
                  if (isYandex) {
                    load_js_script(operaUrl, nmcades_api_onload, function() {
                      load_js_script(manifestv2Url, nmcades_api_onload, function() {
                        load_js_script(manifestv3Url, nmcades_api_onload, plugin_loaded_error);
                      });
                    });
                    return;
                  }
                  if (isOpera) {
                    load_js_script(operaUrl, nmcades_api_onload, plugin_loaded_error);
                    return;
                  }
                  load_js_script(manifestv2Url, nmcades_api_onload, function() {
                    load_js_script(manifestv3Url, nmcades_api_onload, plugin_loaded_error);
                  });
                }
                function load_npapi_plugin() {
                  var elem = document.createElement("object");
                  elem.setAttribute("id", "cadesplugin_object");
                  elem.setAttribute("type", "application/x-cades");
                  elem.setAttribute("style", "visibility: hidden");
                  document.getElementsByTagName("body")[0].appendChild(elem);
                  pluginObject = document.getElementById("cadesplugin_object");
                  if (isIE()) {
                    var elem1 = document.createElement("object");
                    elem1.setAttribute("id", "certEnrollClassFactory");
                    elem1.setAttribute("classid", "clsid:884e2049-217d-11da-b2a4-000e7bbb2b09");
                    elem1.setAttribute("style", "visibility: hidden");
                    document.getElementsByTagName("body")[0].appendChild(elem1);
                    var elem2 = document.createElement("object");
                    elem2.setAttribute("id", "webClassFactory");
                    elem2.setAttribute("classid", "clsid:B04C8637-10BD-484E-B0DA-B8A039F60024");
                    elem2.setAttribute("style", "visibility: hidden");
                    document.getElementsByTagName("body")[0].appendChild(elem2);
                  }
                }
                function plugin_loaded() {
                  plugin_resolved = 1;
                  if (canPromise) {
                    plugin_resolve();
                  } else {
                    window.postMessage("cadesplugin_loaded", "*");
                  }
                }
                function plugin_loaded_error(msg) {
                  if (typeof msg === "undefined" || typeof msg === "object") {
                    msg = "\u041F\u043B\u0430\u0433\u0438\u043D \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D";
                  }
                  plugin_resolved = 1;
                  if (canPromise) {
                    plugin_reject(msg);
                  } else {
                    window.postMessage("cadesplugin_load_error", "*");
                  }
                }
                function check_load_timeout() {
                  if (plugin_resolved === 1) {
                    return;
                  }
                  if (isFireFox && !isFireFoxExtensionLoaded) {
                    show_firefox_missing_extension_dialog();
                  }
                  plugin_resolved = 1;
                  if (canPromise) {
                    plugin_reject("\u0418\u0441\u0442\u0435\u043A\u043B\u043E \u0432\u0440\u0435\u043C\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430");
                  } else {
                    window.postMessage("cadesplugin_load_error", "*");
                  }
                }
                function check_npapi_plugin() {
                  try {
                    CreateObject("CAdESCOM.About");
                    plugin_loaded();
                  } catch (err) {
                    document.getElementById("cadesplugin_object").style.display = "none";
                    var mimetype = window.navigator.mimeTypes["application/x-cades"];
                    if (mimetype) {
                      var plugin = mimetype.enabledPlugin;
                      if (plugin) {
                        plugin_loaded_error("\u041F\u043B\u0430\u0433\u0438\u043D \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D, \u043D\u043E \u043D\u0435 \u0441\u043E\u0437\u0434\u0430\u044E\u0442\u0441\u044F \u043E\u0431\u044C\u0435\u043A\u0442\u044B");
                      } else {
                        plugin_loaded_error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u0430");
                      }
                    } else {
                      plugin_loaded_error("\u041F\u043B\u0430\u0433\u0438\u043D \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D");
                    }
                  }
                }
                function check_plugin_working() {
                  var div = document.createElement("div");
                  div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
                  var isIeLessThan9 = div.getElementsByTagName("i").length === 1;
                  if (isIeLessThan9) {
                    plugin_loaded_error("Internet Explorer \u0432\u0435\u0440\u0441\u0438\u0438 8 \u0438 \u043D\u0438\u0436\u0435 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F");
                    return;
                  }
                  if (isNativeMessageSupported()) {
                    load_extension();
                  } else if (!canPromise) {
                    window.addEventListener("message", function(event) {
                      if (event.data !== "cadesplugin_echo_request") {
                        return;
                      }
                      load_npapi_plugin();
                      check_npapi_plugin();
                    }, false);
                  } else {
                    if (document.readyState === "complete") {
                      load_npapi_plugin();
                      check_npapi_plugin();
                    } else {
                      window.addEventListener("load", function(event) {
                        load_npapi_plugin();
                        check_npapi_plugin();
                      }, false);
                    }
                  }
                }
                function set_pluginObject(obj) {
                  pluginObject = obj;
                }
                function is_capilite_enabled() {
                  return typeof cadesplugin2.EnableInternalCSP !== "undefined" && cadesplugin2.EnableInternalCSP;
                }
                function set_load_timeout() {
                  if (window.cadesplugin_load_timeout) {
                    window.setTimeout(check_load_timeout, window.cadesplugin_load_timeout);
                  } else {
                    window.setTimeout(check_load_timeout, 2e4);
                  }
                }
                var onVisibilityChange = function(event) {
                  if (document.hidden === false) {
                    document.removeEventListener("visibilitychange", onVisibilityChange);
                    set_load_timeout();
                    check_plugin_working();
                  }
                };
                cadesplugin2.JSModuleVersion = "2.4.1";
                cadesplugin2.async_spawn = async_spawn;
                cadesplugin2.set = set_pluginObject;
                cadesplugin2.set_log_level = set_log_level;
                cadesplugin2.get_extension_version = get_extension_version;
                cadesplugin2.get_extension_id = get_extension_id;
                cadesplugin2.getLastError = getLastError;
                cadesplugin2.is_capilite_enabled = is_capilite_enabled;
                if (isNativeMessageSupported()) {
                  cadesplugin2.CreateObjectAsync = CreateObjectAsync;
                  cadesplugin2.ReleasePluginObjects = ReleasePluginObjects;
                }
                if (!isNativeMessageSupported()) {
                  cadesplugin2.CreateObject = CreateObject;
                }
                set_constantValues();
                cadesplugin2.current_log_level = cadesplugin2.LOG_LEVEL_ERROR;
                window.cadesplugin = cadesplugin2;
                if (isSafari && document.hidden) {
                  document.addEventListener("visibilitychange", onVisibilityChange);
                  return;
                }
                set_load_timeout();
                check_plugin_working();
              })();
            }
          ),
          /***/
          "../node_modules/ieee754/index.js": (
            /*!****************************************!*\
              !*** ../node_modules/ieee754/index.js ***!
              \****************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2) {
              exports2.read = function(buffer, offset, isLE, mLen, nBytes) {
                var e, m;
                var eLen = nBytes * 8 - mLen - 1;
                var eMax = (1 << eLen) - 1;
                var eBias = eMax >> 1;
                var nBits = -7;
                var i = isLE ? nBytes - 1 : 0;
                var d = isLE ? -1 : 1;
                var s = buffer[offset + i];
                i += d;
                e = s & (1 << -nBits) - 1;
                s >>= -nBits;
                nBits += eLen;
                for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
                }
                m = e & (1 << -nBits) - 1;
                e >>= -nBits;
                nBits += mLen;
                for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
                }
                if (e === 0) {
                  e = 1 - eBias;
                } else if (e === eMax) {
                  return m ? NaN : (s ? -1 : 1) * Infinity;
                } else {
                  m = m + Math.pow(2, mLen);
                  e = e - eBias;
                }
                return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
              };
              exports2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
                var e, m, c;
                var eLen = nBytes * 8 - mLen - 1;
                var eMax = (1 << eLen) - 1;
                var eBias = eMax >> 1;
                var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
                var i = isLE ? 0 : nBytes - 1;
                var d = isLE ? 1 : -1;
                var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
                value = Math.abs(value);
                if (isNaN(value) || value === Infinity) {
                  m = isNaN(value) ? 1 : 0;
                  e = eMax;
                } else {
                  e = Math.floor(Math.log(value) / Math.LN2);
                  if (value * (c = Math.pow(2, -e)) < 1) {
                    e--;
                    c *= 2;
                  }
                  if (e + eBias >= 1) {
                    value += rt / c;
                  } else {
                    value += rt * Math.pow(2, 1 - eBias);
                  }
                  if (value * c >= 2) {
                    e++;
                    c /= 2;
                  }
                  if (e + eBias >= eMax) {
                    m = 0;
                    e = eMax;
                  } else if (e + eBias >= 1) {
                    m = (value * c - 1) * Math.pow(2, mLen);
                    e = e + eBias;
                  } else {
                    m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
                    e = 0;
                  }
                }
                for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
                }
                e = e << mLen | m;
                eLen += mLen;
                for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
                }
                buffer[offset + i - d] |= s * 128;
              };
            }
          ),
          /***/
          "../node_modules/isarray/index.js": (
            /*!****************************************!*\
              !*** ../node_modules/isarray/index.js ***!
              \****************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2) {
              var toString = {}.toString;
              module2.exports = Array.isArray || function(arr) {
                return toString.call(arr) == "[object Array]";
              };
            }
          ),
          /***/
          "../node_modules/webpack/buildin/global.js": (
            /*!*************************************************!*\
              !*** ../node_modules/webpack/buildin/global.js ***!
              \*************************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2) {
              var g;
              g = /* @__PURE__ */ function() {
                return this;
              }();
              try {
                g = g || new Function("return this")();
              } catch (e) {
                if (typeof window === "object") g = window;
              }
              module2.exports = g;
            }
          ),
          /***/
          "./api/certificate/certificate.ts": (
            /*!****************************************!*\
              !*** ./api/certificate/certificate.ts ***!
              \****************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              const constants_12 = __webpack_require__2(
                /*! ../../constants */
                "./constants/index.ts"
              );
              const exportBase64_1 = __webpack_require__2(
                /*! ./exportBase64 */
                "./api/certificate/exportBase64.ts"
              );
              const getAlgorithm_1 = __webpack_require__2(
                /*! ./getAlgorithm */
                "./api/certificate/getAlgorithm.ts"
              );
              const getCadesProp_1 = __webpack_require__2(
                /*! ./getCadesProp */
                "./api/certificate/getCadesProp.ts"
              );
              const getDecodedExtendedKeyUsage_1 = __webpack_require__2(
                /*! ./getDecodedExtendedKeyUsage */
                "./api/certificate/getDecodedExtendedKeyUsage.ts"
              );
              const getExtendedKeyUsage_1 = __webpack_require__2(
                /*! ./getExtendedKeyUsage */
                "./api/certificate/getExtendedKeyUsage.ts"
              );
              const getInfo_1 = __webpack_require__2(
                /*! ./getInfo */
                "./api/certificate/getInfo.ts"
              );
              const hasExtendedKeyUsage_1 = __webpack_require__2(
                /*! ./hasExtendedKeyUsage */
                "./api/certificate/hasExtendedKeyUsage.ts"
              );
              const isValid_1 = __webpack_require__2(
                /*! ./isValid */
                "./api/certificate/isValid.ts"
              );
              class Certificate {
                constructor(_cadesCertificate, name, issuerName, subjectName, thumbprint2, validFrom, validTo) {
                  this._cadesCertificate = _cadesCertificate;
                  this.name = name;
                  this.issuerName = issuerName;
                  this.subjectName = subjectName;
                  this.thumbprint = thumbprint2;
                  this.validFrom = validFrom;
                  this.validTo = validTo;
                }
                getOwnerInfo() {
                  return getInfo_1.getInfo.call(this, constants_12.SUBJECT_TAGS_TRANSLATIONS, "SubjectName");
                }
                getIssuerInfo() {
                  return getInfo_1.getInfo.call(this, constants_12.ISSUER_TAGS_TRANSLATIONS, "IssuerName");
                }
                getExtendedKeyUsage() {
                  return getExtendedKeyUsage_1.getExtendedKeyUsage.call(this);
                }
                getDecodedExtendedKeyUsage() {
                  return getDecodedExtendedKeyUsage_1.getDecodedExtendedKeyUsage.call(this);
                }
                getAlgorithm() {
                  return getAlgorithm_1.getAlgorithm.call(this);
                }
                getCadesProp(propName2) {
                  return getCadesProp_1.getCadesProp.call(this, propName2);
                }
                isValid() {
                  return isValid_1.isValid.call(this);
                }
                exportBase64() {
                  return exportBase64_1.exportBase64.call(this);
                }
                hasExtendedKeyUsage(oids) {
                  return hasExtendedKeyUsage_1.hasExtendedKeyUsage.call(this, oids);
                }
              }
              exports2.Certificate = Certificate;
            }
          ),
          /***/
          "./api/certificate/exportBase64.ts": (
            /*!*****************************************!*\
              !*** ./api/certificate/exportBase64.ts ***!
              \*****************************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports, "__esModule", { value: true });
              const _afterPluginsLoaded_1 = __webpack_require__(
                /*! ../../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                /*! ../../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_1 = __webpack_require__(
                /*! ../../helpers/_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              exports.exportBase64 = _afterPluginsLoaded_1._afterPluginsLoaded(function() {
                const cadesCertificate = this._cadesCertificate;
                return eval(_generateCadesFn_1._generateCadesFn(function exportBase64() {
                  let base64;
                  try {
                    base64 = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.Export(0);
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430");
                  }
                  return base64;
                }));
              });
            }
          ),
          /***/
          "./api/certificate/getAlgorithm.ts": (
            /*!*****************************************!*\
              !*** ./api/certificate/getAlgorithm.ts ***!
              \*****************************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports, "__esModule", { value: true });
              const _afterPluginsLoaded_1 = __webpack_require__(
                /*! ../../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                /*! ../../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_1 = __webpack_require__(
                /*! ../../helpers/_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              exports.getAlgorithm = _afterPluginsLoaded_1._afterPluginsLoaded(function() {
                const cadesCertificate = this._cadesCertificate;
                return eval(_generateCadesFn_1._generateCadesFn(function getAlgorithm() {
                  const algorithmInfo = {
                    algorithm: null,
                    oid: null
                  };
                  let cadesPublicKey;
                  try {
                    cadesPublicKey = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.PublicKey();
                    cadesPublicKey = _generateCadesFn_1.__cadesAsyncToken__ + cadesPublicKey.Algorithm;
                    algorithmInfo.algorithm = _generateCadesFn_1.__cadesAsyncToken__ + cadesPublicKey.FriendlyName;
                    algorithmInfo.oid = _generateCadesFn_1.__cadesAsyncToken__ + cadesPublicKey.Value;
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u0430");
                  }
                  return algorithmInfo;
                }));
              });
            }
          ),
          /***/
          "./api/certificate/getCadesProp.ts": (
            /*!*****************************************!*\
              !*** ./api/certificate/getCadesProp.ts ***!
              \*****************************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports, "__esModule", { value: true });
              const _afterPluginsLoaded_1 = __webpack_require__(
                /*! ../../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                /*! ../../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_1 = __webpack_require__(
                /*! ../../helpers/_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              exports.getCadesProp = _afterPluginsLoaded_1._afterPluginsLoaded(function(propName) {
                const cadesCertificate = this._cadesCertificate;
                return eval(_generateCadesFn_1._generateCadesFn(function getCadesProp() {
                  let propertyValue;
                  try {
                    propertyValue = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate[propName];
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0438 \u043A \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0443 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430");
                  }
                  return propertyValue;
                }));
              });
            }
          ),
          /***/
          "./api/certificate/getDecodedExtendedKeyUsage.ts": (
            /*!*******************************************************!*\
              !*** ./api/certificate/getDecodedExtendedKeyUsage.ts ***!
              \*******************************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              var __awaiter2 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              Object.defineProperty(exports2, "__esModule", { value: true });
              const constants_12 = __webpack_require__2(
                /*! ../../constants */
                "./constants/index.ts"
              );
              const _afterPluginsLoaded_12 = __webpack_require__2(
                /*! ../../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              exports2.getDecodedExtendedKeyUsage = _afterPluginsLoaded_12._afterPluginsLoaded(function() {
                return __awaiter2(this, void 0, void 0, function* () {
                  const certificateOids = yield this.getExtendedKeyUsage();
                  return certificateOids.reduce((decodedOids, oidCode) => Object.assign(Object.assign({}, decodedOids), { [oidCode]: constants_12.OIDS_DICTIONARY[oidCode] || null }), {});
                });
              });
            }
          ),
          /***/
          "./api/certificate/getExtendedKeyUsage.ts": (
            /*!************************************************!*\
              !*** ./api/certificate/getExtendedKeyUsage.ts ***!
              \************************************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports, "__esModule", { value: true });
              const _afterPluginsLoaded_1 = __webpack_require__(
                /*! ../../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                /*! ../../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_1 = __webpack_require__(
                /*! ../../helpers/_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              exports.getExtendedKeyUsage = _afterPluginsLoaded_1._afterPluginsLoaded(function() {
                const cadesCertificate = this._cadesCertificate;
                return eval(_generateCadesFn_1._generateCadesFn(function getExtendedKeyUsage() {
                  const OIDS = [];
                  let count;
                  try {
                    count = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.ExtendedKeyUsage();
                    count = _generateCadesFn_1.__cadesAsyncToken__ + count.EKUs;
                    count = _generateCadesFn_1.__cadesAsyncToken__ + count.Count;
                    if (count > 0) {
                      while (count > 0) {
                        let cadesExtendedKeyUsage;
                        cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.ExtendedKeyUsage();
                        cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesExtendedKeyUsage.EKUs;
                        cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesExtendedKeyUsage.Item(count);
                        cadesExtendedKeyUsage = _generateCadesFn_1.__cadesAsyncToken__ + cadesExtendedKeyUsage.OID;
                        OIDS.push(cadesExtendedKeyUsage);
                        count--;
                      }
                    }
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u041E\u0418\u0414'\u043E\u0432");
                  }
                  return OIDS;
                }));
              });
            }
          ),
          /***/
          "./api/certificate/getInfo.ts": (
            /*!************************************!*\
              !*** ./api/certificate/getInfo.ts ***!
              \************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              var __awaiter2 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              Object.defineProperty(exports2, "__esModule", { value: true });
              const _afterPluginsLoaded_12 = __webpack_require__2(
                /*! ../../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_12 = __webpack_require__2(
                /*! ../../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _parseCertInfo_1 = __webpack_require__2(
                /*! ../../helpers/_parseCertInfo */
                "./helpers/_parseCertInfo.ts"
              );
              const getCadesProp_1 = __webpack_require__2(
                /*! ./getCadesProp */
                "./api/certificate/getCadesProp.ts"
              );
              exports2.getInfo = _afterPluginsLoaded_12._afterPluginsLoaded(function(tags, entitiesPath) {
                return __awaiter2(this, void 0, void 0, function* () {
                  let entities;
                  try {
                    entities = yield getCadesProp_1.getCadesProp.call(this, entitiesPath);
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_12._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0438\u0437 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430");
                  }
                  return _parseCertInfo_1._parseCertInfo(tags, entities);
                });
              });
            }
          ),
          /***/
          "./api/certificate/hasExtendedKeyUsage.ts": (
            /*!************************************************!*\
              !*** ./api/certificate/hasExtendedKeyUsage.ts ***!
              \************************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              var __awaiter2 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              Object.defineProperty(exports2, "__esModule", { value: true });
              const _afterPluginsLoaded_12 = __webpack_require__2(
                /*! ../../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              exports2.hasExtendedKeyUsage = _afterPluginsLoaded_12._afterPluginsLoaded(function(oids) {
                return __awaiter2(this, void 0, void 0, function* () {
                  const certOids = yield this.getExtendedKeyUsage();
                  let result;
                  if (Array.isArray(oids)) {
                    result = oids.every((oidToCheck) => certOids.some((certOid) => certOid === oidToCheck));
                  } else {
                    result = certOids.some((certOid) => certOid === oids);
                  }
                  return result;
                });
              });
            }
          ),
          /***/
          "./api/certificate/index.ts": (
            /*!**********************************!*\
              !*** ./api/certificate/index.ts ***!
              \**********************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              function __export2(m) {
                for (var p in m) if (!exports2.hasOwnProperty(p)) exports2[p] = m[p];
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
              __export2(__webpack_require__2(
                /*! ./certificate */
                "./api/certificate/certificate.ts"
              ));
            }
          ),
          /***/
          "./api/certificate/isValid.ts": (
            /*!************************************!*\
              !*** ./api/certificate/isValid.ts ***!
              \************************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports, "__esModule", { value: true });
              const _afterPluginsLoaded_1 = __webpack_require__(
                /*! ../../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                /*! ../../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_1 = __webpack_require__(
                /*! ../../helpers/_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              exports.isValid = _afterPluginsLoaded_1._afterPluginsLoaded(function() {
                const cadesCertificate = this._cadesCertificate;
                return eval(_generateCadesFn_1._generateCadesFn(function isValid() {
                  let isValid2;
                  try {
                    isValid2 = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate.IsValid();
                    isValid2 = _generateCadesFn_1.__cadesAsyncToken__ + isValid2.Result;
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430");
                  }
                  return Boolean(isValid2);
                }));
              });
            }
          ),
          /***/
          "./api/createAttachedSignature.ts": (
            /*!****************************************!*\
              !*** ./api/createAttachedSignature.ts ***!
              \****************************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              (function(Buffer) {
                var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                  function adopt(value) {
                    return value instanceof P ? value : new P(function(resolve) {
                      resolve(value);
                    });
                  }
                  return new (P || (P = Promise))(function(resolve, reject) {
                    function fulfilled(value) {
                      try {
                        step(generator.next(value));
                      } catch (e) {
                        reject(e);
                      }
                    }
                    function rejected(value) {
                      try {
                        step(generator["throw"](value));
                      } catch (e) {
                        reject(e);
                      }
                    }
                    function step(result) {
                      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                  });
                };
                Object.defineProperty(exports, "__esModule", { value: true });
                const constants_1 = __webpack_require__(
                  /*! ../constants */
                  "./constants/index.ts"
                );
                const _afterPluginsLoaded_1 = __webpack_require__(
                  /*! ../helpers/_afterPluginsLoaded */
                  "./helpers/_afterPluginsLoaded.ts"
                );
                const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                  /*! ../helpers/_extractMeaningfulErrorMessage */
                  "./helpers/_extractMeaningfulErrorMessage.ts"
                );
                const _generateCadesFn_1 = __webpack_require__(
                  /*! ../helpers/_generateCadesFn */
                  "./helpers/_generateCadesFn.ts"
                );
                const _getCadesCert_1 = __webpack_require__(
                  /*! ../helpers/_getCadesCert */
                  "./helpers/_getCadesCert.ts"
                );
                const _getDateObj_1 = __webpack_require__(
                  /*! ../helpers/_getDateObj */
                  "./helpers/_getDateObj.ts"
                );
                exports.createAttachedSignature = _afterPluginsLoaded_1._afterPluginsLoaded((thumbprint, unencryptedMessage) => __awaiter(void 0, void 0, void 0, function* () {
                  const { cadesplugin } = window;
                  const cadesCertificate = yield _getCadesCert_1._getCadesCert(thumbprint);
                  return eval(_generateCadesFn_1._generateCadesFn(function createAttachedSignature2() {
                    let cadesAttrs;
                    let cadesSignedData;
                    let cadesSigner;
                    try {
                      cadesAttrs = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CADESCOM.CPAttribute");
                      cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.CadesSignedData");
                      cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.CPSigner");
                    } catch (error) {
                      console.error(error);
                      throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438");
                    }
                    const currentTime = _getDateObj_1._getDateObj(/* @__PURE__ */ new Date());
                    try {
                      void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Name(constants_1.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
                      void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
                    } catch (error) {
                      console.error(error);
                      throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438");
                    }
                    let messageBase64;
                    try {
                      messageBase64 = Buffer.from(unencryptedMessage).toString("base64");
                    } catch (error) {
                      console.error(error);
                      throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u0435\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0432 Base64");
                    }
                    let cadesAuthAttrs;
                    try {
                      void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
                      cadesAuthAttrs = _generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
                      void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
                      void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
                      void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_Content(messageBase64));
                      void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));
                    } catch (error) {
                      console.error(error);
                      throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u0438");
                    }
                    let signature;
                    try {
                      signature = _generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.SignCades(cadesSigner, cadesplugin.CADESCOM_PKCS7_TYPE);
                    } catch (error) {
                      console.error(error);
                      throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445");
                    }
                    return signature;
                  }));
                }));
              }).call(this, __webpack_require__(
                /*! ./../../node_modules/buffer/index.js */
                "../node_modules/buffer/index.js"
              ).Buffer);
            }
          ),
          /***/
          "./api/createDetachedSignature.ts": (
            /*!****************************************!*\
              !*** ./api/createDetachedSignature.ts ***!
              \****************************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              Object.defineProperty(exports, "__esModule", { value: true });
              const constants_1 = __webpack_require__(
                /*! ../constants */
                "./constants/index.ts"
              );
              const _afterPluginsLoaded_1 = __webpack_require__(
                /*! ../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                /*! ../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_1 = __webpack_require__(
                /*! ../helpers/_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              const _getCadesCert_1 = __webpack_require__(
                /*! ../helpers/_getCadesCert */
                "./helpers/_getCadesCert.ts"
              );
              const _getDateObj_1 = __webpack_require__(
                /*! ../helpers/_getDateObj */
                "./helpers/_getDateObj.ts"
              );
              exports.createDetachedSignature = _afterPluginsLoaded_1._afterPluginsLoaded((thumbprint, messageHash, options) => __awaiter(void 0, void 0, void 0, function* () {
                const { cadesplugin } = window;
                const cadesCertificate = yield _getCadesCert_1._getCadesCert(thumbprint);
                return eval(_generateCadesFn_1._generateCadesFn(function createDetachedSignature2() {
                  var _a;
                  let cadesAttrs;
                  let cadesHashedData;
                  let cadesSignedData;
                  let cadesSigner;
                  try {
                    cadesAttrs = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CADESCOM.CPAttribute");
                    cadesHashedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.HashedData");
                    cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.CadesSignedData");
                    cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.CPSigner");
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438");
                  }
                  const currentTime = _getDateObj_1._getDateObj(/* @__PURE__ */ new Date());
                  try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Name(constants_1.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438");
                  }
                  let cadesAuthAttrs;
                  try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
                    cadesAuthAttrs = _generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN));
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430");
                  }
                  try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_Algorithm((_a = options === null || options === void 0 ? void 0 : options.hashedAlgorithm) !== null && _a !== void 0 ? _a : cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.SetHashValue(messageHash));
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435 \u0445\u0435\u0448\u0430");
                  }
                  let signature;
                  try {
                    signature = _generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.SignHash(cadesHashedData, cadesSigner, cadesplugin.CADESCOM_PKCS7_TYPE);
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445");
                  }
                  return signature;
                }));
              }));
            }
          ),
          /***/
          "./api/createHash.ts": (
            /*!***************************!*\
              !*** ./api/createHash.ts ***!
              \***************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              (function(Buffer) {
                var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                  function adopt(value) {
                    return value instanceof P ? value : new P(function(resolve) {
                      resolve(value);
                    });
                  }
                  return new (P || (P = Promise))(function(resolve, reject) {
                    function fulfilled(value) {
                      try {
                        step(generator.next(value));
                      } catch (e) {
                        reject(e);
                      }
                    }
                    function rejected(value) {
                      try {
                        step(generator["throw"](value));
                      } catch (e) {
                        reject(e);
                      }
                    }
                    function step(result) {
                      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                  });
                };
                Object.defineProperty(exports, "__esModule", { value: true });
                const _afterPluginsLoaded_1 = __webpack_require__(
                  /*! ../helpers/_afterPluginsLoaded */
                  "./helpers/_afterPluginsLoaded.ts"
                );
                const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                  /*! ../helpers/_extractMeaningfulErrorMessage */
                  "./helpers/_extractMeaningfulErrorMessage.ts"
                );
                const _generateCadesFn_1 = __webpack_require__(
                  /*! ../helpers/_generateCadesFn */
                  "./helpers/_generateCadesFn.ts"
                );
                exports.createHash = _afterPluginsLoaded_1._afterPluginsLoaded((unencryptedMessage, options) => __awaiter(void 0, void 0, void 0, function* () {
                  const { cadesplugin } = window;
                  return eval(_generateCadesFn_1._generateCadesFn(function createHash2() {
                    var _a;
                    const cadesHashedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.HashedData");
                    let messageBase64;
                    let hash;
                    try {
                      if ((options === null || options === void 0 ? void 0 : options.encoding) && typeof unencryptedMessage === "string") {
                        messageBase64 = Buffer.from(unencryptedMessage, options === null || options === void 0 ? void 0 : options.encoding).toString("base64");
                      } else {
                        messageBase64 = Buffer.from(unencryptedMessage).toString("base64");
                      }
                    } catch (error) {
                      console.error(error);
                      throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u0435\u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0432 Base64");
                    }
                    try {
                      void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_Algorithm((_a = options === null || options === void 0 ? void 0 : options.hashedAlgorithm) !== null && _a !== void 0 ? _a : cadesplugin.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256));
                      void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.propset_DataEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
                      void (_generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.Hash(messageBase64));
                    } catch (error) {
                      console.error(error);
                      throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u0445\u044D\u0448\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F");
                    }
                    try {
                      hash = _generateCadesFn_1.__cadesAsyncToken__ + cadesHashedData.Value;
                    } catch (error) {
                      console.error(error);
                      throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0445\u044D\u0448\u0430");
                    }
                    return hash;
                  }));
                }));
              }).call(this, __webpack_require__(
                /*! ./../../node_modules/buffer/index.js */
                "../node_modules/buffer/index.js"
              ).Buffer);
            }
          ),
          /***/
          "./api/createSignature.ts": (
            /*!********************************!*\
              !*** ./api/createSignature.ts ***!
              \********************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              Object.defineProperty(exports, "__esModule", { value: true });
              const constants_1 = __webpack_require__(
                /*! ../constants */
                "./constants/index.ts"
              );
              const _afterPluginsLoaded_1 = __webpack_require__(
                /*! ../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                /*! ../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_1 = __webpack_require__(
                /*! ../helpers/_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              const _getCadesCert_1 = __webpack_require__(
                /*! ../helpers/_getCadesCert */
                "./helpers/_getCadesCert.ts"
              );
              const _getDateObj_1 = __webpack_require__(
                /*! ../helpers/_getDateObj */
                "./helpers/_getDateObj.ts"
              );
              exports.createSignature = _afterPluginsLoaded_1._afterPluginsLoaded((thumbprint, messageHash, detachedSignature = true) => __awaiter(void 0, void 0, void 0, function* () {
                console.warn([
                  'cryptoPro: \u041C\u0435\u0442\u043E\u0434 "createSignature" \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0443\u0441\u0442\u0430\u0440\u0435\u0432\u0448\u0438\u043C \u0438 \u0431\u0443\u0434\u0435\u0442 \u0443\u0431\u0440\u0430\u043D \u0438\u0437 \u0431\u0443\u0434\u0443\u0449\u0438\u0445 \u0432\u0435\u0440\u0441\u0438\u0439.',
                  '\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 "createAttachedSignature" \u0438 "createDetachedSignature".'
                ].join("\n"));
                const { cadesplugin } = window;
                const cadesCertificate = yield _getCadesCert_1._getCadesCert(thumbprint);
                return eval(_generateCadesFn_1._generateCadesFn(function createSignature2() {
                  let cadesAttrs;
                  let cadesSignedData;
                  let cadesSigner;
                  try {
                    cadesAttrs = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CADESCOM.CPAttribute");
                    cadesSignedData = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.CadesSignedData");
                    cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.CPSigner");
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438");
                  }
                  const currentTime = _getDateObj_1._getDateObj(/* @__PURE__ */ new Date());
                  try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Name(constants_1.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAttrs.propset_Value(currentTime));
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438");
                  }
                  let cadesAuthAttrs;
                  try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
                    cadesAuthAttrs = _generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.AuthenticatedAttributes2;
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesAuthAttrs.Add(cadesAttrs));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.propset_Content(messageHash));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Options(cadesplugin.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY));
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u0438");
                  }
                  let signature;
                  try {
                    signature = _generateCadesFn_1.__cadesAsyncToken__ + cadesSignedData.SignCades(cadesSigner, cadesplugin.CADESCOM_CADES_BES, detachedSignature);
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445");
                  }
                  return signature;
                }));
              }));
            }
          ),
          /***/
          "./api/createXMLSignature.ts": (
            /*!***********************************!*\
              !*** ./api/createXMLSignature.ts ***!
              \***********************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              Object.defineProperty(exports, "__esModule", { value: true });
              const _afterPluginsLoaded_1 = __webpack_require__(
                /*! ../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                /*! ../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_1 = __webpack_require__(
                /*! ../helpers/_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              const _getCadesCert_1 = __webpack_require__(
                /*! ../helpers/_getCadesCert */
                "./helpers/_getCadesCert.ts"
              );
              exports.createXMLSignature = _afterPluginsLoaded_1._afterPluginsLoaded((thumbprint, unencryptedMessage, options) => __awaiter(void 0, void 0, void 0, function* () {
                const { cadesplugin } = window;
                const cadesCertificate = yield _getCadesCert_1._getCadesCert(thumbprint);
                return eval(_generateCadesFn_1._generateCadesFn(function createXMLSignature() {
                  var _a, _b;
                  let cadesSigner;
                  let cadesSignedXML;
                  try {
                    cadesSigner = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.CPSigner");
                    cadesSignedXML = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.SignedXML");
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438");
                  }
                  try {
                    const signatureMethod = (_a = options === null || options === void 0 ? void 0 : options.signatureMethod) !== null && _a !== void 0 ? _a : cadesplugin.XmlDsigGost3410Url2012256;
                    const digestMethod = (_b = options === null || options === void 0 ? void 0 : options.digestMethod) !== null && _b !== void 0 ? _b : cadesplugin.XmlDsigGost3411Url2012256;
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSigner.propset_CheckCertificate(true));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedXML.propset_Content(unencryptedMessage));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedXML.propset_SignatureType(cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedXML.propset_SignatureMethod(signatureMethod));
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesSignedXML.propset_DigestMethod(digestMethod));
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u0438");
                  }
                  let signature;
                  try {
                    signature = _generateCadesFn_1.__cadesAsyncToken__ + cadesSignedXML.Sign(cadesSigner);
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445");
                  }
                  return signature;
                }));
              }));
            }
          ),
          /***/
          "./api/execute.ts": (
            /*!************************!*\
              !*** ./api/execute.ts ***!
              \************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              var __awaiter2 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              Object.defineProperty(exports2, "__esModule", { value: true });
              const _afterPluginsLoaded_12 = __webpack_require__2(
                /*! ../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_12 = __webpack_require__2(
                /*! ../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_12 = __webpack_require__2(
                /*! ../helpers/_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              exports2.execute = _afterPluginsLoaded_12._afterPluginsLoaded((callback) => __awaiter2(void 0, void 0, void 0, function* () {
                return yield callback({
                  cadesplugin: window.cadesplugin,
                  _generateCadesFn: _generateCadesFn_12._generateCadesFn,
                  __cadesAsyncToken__: _generateCadesFn_12.__cadesAsyncToken__,
                  __createCadesPluginObject__: _generateCadesFn_12.__createCadesPluginObject__,
                  _extractMeaningfulErrorMessage: _extractMeaningfulErrorMessage_12._extractMeaningfulErrorMessage
                });
              }));
            }
          ),
          /***/
          "./api/getCertificate.ts": (
            /*!*******************************!*\
              !*** ./api/getCertificate.ts ***!
              \*******************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              var __awaiter2 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              Object.defineProperty(exports2, "__esModule", { value: true });
              const _afterPluginsLoaded_12 = __webpack_require__2(
                /*! ../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const getUserCertificates_1 = __webpack_require__2(
                /*! ./getUserCertificates */
                "./api/getUserCertificates.ts"
              );
              exports2.getCertificate = _afterPluginsLoaded_12._afterPluginsLoaded((thumbprint2) => __awaiter2(void 0, void 0, void 0, function* () {
                if (!thumbprint2) {
                  throw new Error("\u041E\u0442\u043F\u0435\u0447\u0430\u0442\u043E\u043A \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D");
                }
                const availableCertificates = yield getUserCertificates_1.getUserCertificates();
                const foundCertificate = availableCertificates.find((cert) => cert.thumbprint === thumbprint2);
                if (!foundCertificate) {
                  throw new Error(`\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u0441 \u043E\u0442\u043F\u0435\u0447\u0430\u0442\u043A\u043E\u043C: "${thumbprint2}" \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D`);
                }
                return foundCertificate;
              }));
            }
          ),
          /***/
          "./api/getSystemInfo.ts": (
            /*!******************************!*\
              !*** ./api/getSystemInfo.ts ***!
              \******************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports, "__esModule", { value: true });
              const _afterPluginsLoaded_1 = __webpack_require__(
                /*! ../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                /*! ../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_1 = __webpack_require__(
                /*! ../helpers/_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              exports.getSystemInfo = _afterPluginsLoaded_1._afterPluginsLoaded(() => {
                const sysInfo = {
                  cadesVersion: null,
                  cspVersion: null
                };
                return eval(_generateCadesFn_1._generateCadesFn(function getSystemInfo2() {
                  let cadesAbout;
                  try {
                    cadesAbout = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.About");
                    sysInfo.cadesVersion = _generateCadesFn_1.__cadesAsyncToken__ + cadesAbout.PluginVersion;
                    sysInfo.cspVersion = _generateCadesFn_1.__cadesAsyncToken__ + cadesAbout.CSPVersion();
                    if (!sysInfo.cadesVersion) {
                      sysInfo.cadesVersion = _generateCadesFn_1.__cadesAsyncToken__ + cadesAbout.Version;
                    }
                    sysInfo.cadesVersion = _generateCadesFn_1.__cadesAsyncToken__ + sysInfo.cadesVersion.toString();
                    sysInfo.cspVersion = _generateCadesFn_1.__cadesAsyncToken__ + sysInfo.cspVersion.toString();
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u0441\u0438\u0441\u0442\u0435\u043C\u0435");
                  }
                  return sysInfo;
                }));
              });
            }
          ),
          /***/
          "./api/getUserCertificates.ts": (
            /*!************************************!*\
              !*** ./api/getUserCertificates.ts ***!
              \************************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports, "__esModule", { value: true });
              const certificate_1 = __webpack_require__(
                /*! ./certificate */
                "./api/certificate/index.ts"
              );
              const constants_1 = __webpack_require__(
                /*! ../constants */
                "./constants/index.ts"
              );
              const _afterPluginsLoaded_1 = __webpack_require__(
                /*! ../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractCommonName_1 = __webpack_require__(
                /*! ../helpers/_extractCommonName */
                "./helpers/_extractCommonName.ts"
              );
              const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                /*! ../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_1 = __webpack_require__(
                /*! ../helpers/_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              let certificatesCache;
              exports.getUserCertificates = _afterPluginsLoaded_1._afterPluginsLoaded((resetCache = false) => {
                const { cadesplugin } = window;
                if (!resetCache && certificatesCache) {
                  return certificatesCache;
                }
                return eval(_generateCadesFn_1._generateCadesFn(function getUserCertificates() {
                  let cadesStore;
                  try {
                    cadesStore = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.Store");
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0443");
                  }
                  try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED));
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0438 \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430");
                  }
                  let cadesCertificates;
                  let cadesCertificatesCount;
                  try {
                    cadesCertificates = _generateCadesFn_1.__cadesAsyncToken__ + cadesStore.Certificates;
                    if (cadesCertificates) {
                      cadesCertificates = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_TIME_VALID);
                      cadesCertificates = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificates.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY, constants_1.CAPICOM_PROPID_KEY_PROV_INFO);
                      cadesCertificatesCount = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificates.Count;
                    }
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u043F\u0438\u0441\u043A\u0430 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432");
                  }
                  if (!cadesCertificatesCount) {
                    throw new Error("\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432");
                  }
                  const certificateList = [];
                  try {
                    while (cadesCertificatesCount) {
                      const cadesCertificate2 = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificates.Item(cadesCertificatesCount);
                      certificateList.push(new certificate_1.Certificate(cadesCertificate2, _extractCommonName_1._extractCommonName(_generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate2.SubjectName), _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate2.IssuerName, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate2.SubjectName, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate2.Thumbprint, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate2.ValidFromDate, _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificate2.ValidToDate));
                      cadesCertificatesCount--;
                    }
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432");
                  }
                  cadesStore.Close();
                  certificatesCache = certificateList;
                  return certificatesCache;
                }));
              });
            }
          ),
          /***/
          "./api/index.ts": (
            /*!**********************!*\
              !*** ./api/index.ts ***!
              \**********************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              function __export2(m) {
                for (var p in m) if (!exports2.hasOwnProperty(p)) exports2[p] = m[p];
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
              __export2(__webpack_require__2(
                /*! ./getCertificate */
                "./api/getCertificate.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./getUserCertificates */
                "./api/getUserCertificates.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./getSystemInfo */
                "./api/getSystemInfo.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./isValidSystemSetup */
                "./api/isValidSystemSetup.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./createSignature */
                "./api/createSignature.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./createXMLSignature */
                "./api/createXMLSignature.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./createDetachedSignature */
                "./api/createDetachedSignature.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./createAttachedSignature */
                "./api/createAttachedSignature.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./createHash */
                "./api/createHash.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./certificate */
                "./api/certificate/index.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./execute */
                "./api/execute.ts"
              ));
            }
          ),
          /***/
          "./api/isValidSystemSetup.ts": (
            /*!***********************************!*\
              !*** ./api/isValidSystemSetup.ts ***!
              \***********************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              var __awaiter2 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              Object.defineProperty(exports2, "__esModule", { value: true });
              const _afterPluginsLoaded_12 = __webpack_require__2(
                /*! ../helpers/_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_12 = __webpack_require__2(
                /*! ../helpers/_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _isSupportedCadesVersion_1 = __webpack_require__2(
                /*! ../helpers/_isSupportedCadesVersion */
                "./helpers/_isSupportedCadesVersion.ts"
              );
              const _isSupportedCSPVersion_1 = __webpack_require__2(
                /*! ../helpers/_isSupportedCSPVersion */
                "./helpers/_isSupportedCSPVersion.ts"
              );
              const getSystemInfo_1 = __webpack_require__2(
                /*! ./getSystemInfo */
                "./api/getSystemInfo.ts"
              );
              exports2.isValidSystemSetup = _afterPluginsLoaded_12._afterPluginsLoaded(() => __awaiter2(void 0, void 0, void 0, function* () {
                let systemInfo;
                try {
                  systemInfo = yield getSystemInfo_1.getSystemInfo();
                } catch (error) {
                  console.error(error);
                  throw new Error(_extractMeaningfulErrorMessage_12._extractMeaningfulErrorMessage(error) || "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u042D\u041F \u043D\u0430 \u0434\u0430\u043D\u043D\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u0435 \u043D\u0435 \u0432\u0435\u0440\u043D\u044B");
                }
                if (!_isSupportedCadesVersion_1._isSupportedCadesVersion(systemInfo.cadesVersion)) {
                  throw new Error("\u041D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u043F\u043B\u0430\u0433\u0438\u043D\u0430");
                }
                if (!_isSupportedCSPVersion_1._isSupportedCSPVersion(systemInfo.cspVersion)) {
                  throw new Error("\u041D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F CSP");
                }
                return true;
              }));
            }
          ),
          /***/
          "./constants/cades-constants.ts": (
            /*!**************************************!*\
              !*** ./constants/cades-constants.ts ***!
              \**************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.CADESCOM_ATTRIBUTE_OTHER = -1;
              exports2.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
              exports2.CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
              exports2.CADESCOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
              exports2.CADESCOM_AllowNoOutstandingRequest = 1;
              exports2.CADESCOM_AllowNone = 0;
              exports2.CADESCOM_AllowUntrustedCertificate = 2;
              exports2.CADESCOM_AllowUntrustedRoot = 4;
              exports2.CADESCOM_BASE64_TO_BINARY = 1;
              exports2.CADESCOM_CADES_BES = 1;
              exports2.CADESCOM_CADES_DEFAULT = 0;
              exports2.CADESCOM_CADES_T = 5;
              exports2.CADESCOM_CADES_X_LONG_TYPE_1 = 93;
              exports2.CADESCOM_CONTAINER_STORE = 100;
              exports2.CADESCOM_CURRENT_USER_STORE = 2;
              exports2.CADESCOM_DISPLAY_DATA_ATTRIBUTE = 2;
              exports2.CADESCOM_DISPLAY_DATA_CONTENT = 1;
              exports2.CADESCOM_DISPLAY_DATA_NONE = 0;
              exports2.CADESCOM_ENCODE_ANY = -1;
              exports2.CADESCOM_ENCODE_BASE64 = 0;
              exports2.CADESCOM_ENCODE_BINARY = 1;
              exports2.CADESCOM_ENCRYPTION_ALGORITHM_3DES = 3;
              exports2.CADESCOM_ENCRYPTION_ALGORITHM_AES = 4;
              exports2.CADESCOM_ENCRYPTION_ALGORITHM_DES = 2;
              exports2.CADESCOM_ENCRYPTION_ALGORITHM_GOST_28147_89 = 25;
              exports2.CADESCOM_ENCRYPTION_ALGORITHM_RC2 = 0;
              exports2.CADESCOM_ENCRYPTION_ALGORITHM_RC4 = 1;
              exports2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411 = 100;
              exports2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256 = 101;
              exports2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_256_HMAC = 111;
              exports2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512 = 102;
              exports2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_2012_512_HMAC = 112;
              exports2.CADESCOM_HASH_ALGORITHM_CP_GOST_3411_HMAC = 110;
              exports2.CADESCOM_HASH_ALGORITHM_MD2 = 1;
              exports2.CADESCOM_HASH_ALGORITHM_MD4 = 2;
              exports2.CADESCOM_HASH_ALGORITHM_MD5 = 3;
              exports2.CADESCOM_HASH_ALGORITHM_SHA1 = 0;
              exports2.CADESCOM_HASH_ALGORITHM_SHA_256 = 4;
              exports2.CADESCOM_HASH_ALGORITHM_SHA_384 = 5;
              exports2.CADESCOM_HASH_ALGORITHM_SHA_512 = 6;
              exports2.CADESCOM_LOCAL_MACHINE_STORE = 1;
              exports2.CADESCOM_PKCS7_TYPE = 65535;
              exports2.CADESCOM_STRING_TO_UCS2LE = 0;
              exports2.CADESCOM_SkipInstallToStore = 268435456;
              exports2.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPED = 0;
              exports2.CADESCOM_XML_SIGNATURE_TYPE_ENVELOPING = 1;
              exports2.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE = 2;
              exports2.CAPICOM_ACTIVE_DIRECTORY_USER_STORE = 3;
              exports2.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION = 2;
              exports2.CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME = 1;
              exports2.CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
              exports2.CAPICOM_CERTIFICATE_FIND_APPLICATION_POLICY = 7;
              exports2.CAPICOM_CERTIFICATE_FIND_CERTIFICATE_POLICY = 8;
              exports2.CAPICOM_CERTIFICATE_FIND_EXTENDED_PROPERTY = 6;
              exports2.CAPICOM_CERTIFICATE_FIND_EXTENSION = 5;
              exports2.CAPICOM_CERTIFICATE_FIND_ISSUER_NAME = 2;
              exports2.CAPICOM_CERTIFICATE_FIND_KEY_USAGE = 12;
              exports2.CAPICOM_CERTIFICATE_FIND_ROOT_NAME = 3;
              exports2.CAPICOM_CERTIFICATE_FIND_SHA1_HASH = 0;
              exports2.CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
              exports2.CAPICOM_CERTIFICATE_FIND_TEMPLATE_NAME = 4;
              exports2.CAPICOM_CERTIFICATE_FIND_TIME_EXPIRED = 11;
              exports2.CAPICOM_CERTIFICATE_FIND_TIME_NOT_YET_VALID = 10;
              exports2.CAPICOM_CERTIFICATE_FIND_TIME_VALID = 9;
              exports2.CAPICOM_CERTIFICATE_INCLUDE_CHAIN_EXCEPT_ROOT = 0;
              exports2.CAPICOM_CERTIFICATE_INCLUDE_END_ENTITY_ONLY = 2;
              exports2.CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN = 1;
              exports2.CAPICOM_CERT_INFO_ISSUER_SIMPLE_NAME = 1;
              exports2.CAPICOM_CERT_INFO_SUBJECT_SIMPLE_NAME = 0;
              exports2.CAPICOM_CURRENT_USER_STORE = 2;
              exports2.CAPICOM_DIGITAL_SIGNATURE_KEY_USAGE = 128;
              exports2.CAPICOM_EKU_CLIENT_AUTH = 2;
              exports2.CAPICOM_EKU_OTHER = 0;
              exports2.CAPICOM_EKU_SMARTCARD_LOGON = 5;
              exports2.CAPICOM_LOCAL_MACHINE_STORE = 1;
              exports2.CAPICOM_MEMORY_STORE = 0;
              exports2.CAPICOM_MY_STORE = "My";
              exports2.CAPICOM_OID_KEY_USAGE_EXTENSION = 10;
              exports2.CAPICOM_OID_OTHER = 0;
              exports2.CAPICOM_PROPID_ACCESS_STATE = 14;
              exports2.CAPICOM_PROPID_ARCHIVED = 19;
              exports2.CAPICOM_PROPID_ARCHIVED_KEY_HASH = 65;
              exports2.CAPICOM_PROPID_AUTO_ENROLL = 21;
              exports2.CAPICOM_PROPID_CROSS_CERT_DIST_POINTS = 23;
              exports2.CAPICOM_PROPID_CTL_USAGE = 9;
              exports2.CAPICOM_PROPID_DATE_STAMP = 27;
              exports2.CAPICOM_PROPID_DESCRIPTION = 13;
              exports2.CAPICOM_PROPID_EFS = 17;
              exports2.CAPICOM_PROPID_ENHKEY_USAGE = 9;
              exports2.CAPICOM_PROPID_ENROLLMENT = 26;
              exports2.CAPICOM_PROPID_EXTENDED_ERROR_INFO = 30;
              exports2.CAPICOM_PROPID_FIRST_RESERVED = 66;
              exports2.CAPICOM_PROPID_FIRST_USER = 32768;
              exports2.CAPICOM_PROPID_FORTEZZA_DATA = 18;
              exports2.CAPICOM_PROPID_FRIENDLY_NAME = 11;
              exports2.CAPICOM_PROPID_HASH_PROP = 3;
              exports2.CAPICOM_PROPID_IE30_RESERVED = 7;
              exports2.CAPICOM_PROPID_ISSUER_PUBLIC_KEY_MD5_HASH = 24;
              exports2.CAPICOM_PROPID_ISSUER_SERIAL_NUMBER_MD5_HASH = 28;
              exports2.CAPICOM_PROPID_KEY_CONTEXT = 5;
              exports2.CAPICOM_PROPID_KEY_IDENTIFIER = 20;
              exports2.CAPICOM_PROPID_KEY_PROV_HANDLE = 1;
              exports2.CAPICOM_PROPID_KEY_PROV_INFO = 2;
              exports2.CAPICOM_PROPID_KEY_SPEC = 6;
              exports2.CAPICOM_PROPID_LAST_RESERVED = 32767;
              exports2.CAPICOM_PROPID_LAST_USER = 65535;
              exports2.CAPICOM_PROPID_MD5_HASH = 4;
              exports2.CAPICOM_PROPID_NEXT_UPDATE_LOCATION = 10;
              exports2.CAPICOM_PROPID_PUBKEY_ALG_PARA = 22;
              exports2.CAPICOM_PROPID_PUBKEY_HASH_RESERVED = 8;
              exports2.CAPICOM_PROPID_PVK_FILE = 12;
              exports2.CAPICOM_PROPID_RENEWAL = 64;
              exports2.CAPICOM_PROPID_SHA1_HASH = 3;
              exports2.CAPICOM_PROPID_SIGNATURE_HASH = 15;
              exports2.CAPICOM_PROPID_SMART_CARD_DATA = 16;
              exports2.CAPICOM_PROPID_SUBJECT_NAME_MD5_HASH = 29;
              exports2.CAPICOM_PROPID_SUBJECT_PUBLIC_KEY_MD5_HASH = 25;
              exports2.CAPICOM_PROPID_UNKNOWN = 0;
              exports2.CAPICOM_SMART_CARD_USER_STORE = 4;
              exports2.CAPICOM_STORE_OPEN_EXISTING_ONLY = 128;
              exports2.CAPICOM_STORE_OPEN_INCLUDE_ARCHIVED = 256;
              exports2.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
              exports2.CAPICOM_STORE_OPEN_READ_ONLY = 0;
              exports2.CAPICOM_STORE_OPEN_READ_WRITE = 1;
              exports2.CHECK_NONE = 0;
              exports2.CHECK_OFFLINE_REVOCATION_STATUS = 16;
              exports2.CHECK_ONLINE_REVOCATION_STATUS = 8;
              exports2.CHECK_SIGNATURE_VALIDITY = 4;
              exports2.CHECK_TIME_VALIDITY = 2;
              exports2.CHECK_TRUSTED_ROOT = 1;
              exports2.LOG_LEVEL_DEBUG = 4;
              exports2.LOG_LEVEL_ERROR = 1;
              exports2.LOG_LEVEL_INFO = 2;
              exports2.TRUST_CTL_IS_NOT_SIGNATURE_VALID = 262144;
              exports2.TRUST_CTL_IS_NOT_TIME_VALID = 131072;
              exports2.TRUST_CTL_IS_NOT_VALID_FOR_USAGE = 524288;
              exports2.TRUST_IS_CYCLIC = 128;
              exports2.TRUST_IS_NOT_SIGNATURE_VALID = 8;
              exports2.TRUST_IS_NOT_TIME_NESTED = 2;
              exports2.TRUST_IS_NOT_TIME_VALID = 1;
              exports2.TRUST_IS_NOT_VALID_FOR_USAGE = 16;
              exports2.TRUST_IS_PARTIAL_CHAIN = 65536;
              exports2.TRUST_IS_REVOKED = 4;
              exports2.TRUST_IS_UNTRUSTED_ROOT = 32;
              exports2.TRUST_REVOCATION_STATUS_UNKNOWN = 64;
              exports2.XmlDsigGost3410Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102001-gostr3411";
              exports2.XmlDsigGost3410UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411";
              exports2.XmlDsigGost3411Url = "urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr3411";
              exports2.XmlDsigGost3411UrlObsolete = "http://www.w3.org/2001/04/xmldsig-more#gostr3411";
            }
          ),
          /***/
          "./constants/index.ts": (
            /*!****************************!*\
              !*** ./constants/index.ts ***!
              \****************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              function __export2(m) {
                for (var p in m) if (!exports2.hasOwnProperty(p)) exports2[p] = m[p];
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
              __export2(__webpack_require__2(
                /*! ./cades-constants */
                "./constants/cades-constants.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./issuer-tags-translations */
                "./constants/issuer-tags-translations.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./oids-dictionary */
                "./constants/oids-dictionary.ts"
              ));
              __export2(__webpack_require__2(
                /*! ./subject-tags-translations */
                "./constants/subject-tags-translations.ts"
              ));
            }
          ),
          /***/
          "./constants/issuer-tags-translations.ts": (
            /*!***********************************************!*\
              !*** ./constants/issuer-tags-translations.ts ***!
              \***********************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.ISSUER_TAGS_TRANSLATIONS = [
                { possibleNames: ["UnstructuredName"], translation: "\u041D\u0435\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u0438\u043C\u044F" },
                { possibleNames: ["CN"], translation: "\u0423\u0434\u043E\u0441\u0442\u043E\u0432\u0435\u0440\u044F\u044E\u0449\u0438\u0439 \u0446\u0435\u043D\u0442\u0440" },
                { possibleNames: ["C"], translation: "\u0421\u0442\u0440\u0430\u043D\u0430" },
                { possibleNames: ["S"], translation: "\u0420\u0435\u0433\u0438\u043E\u043D" },
                { possibleNames: ["STREET"], translation: "\u0410\u0434\u0440\u0435\u0441" },
                { possibleNames: ["O"], translation: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F" },
                { possibleNames: ["OU"], translation: "\u0422\u0438\u043F" },
                { possibleNames: ["T"], translation: "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C" },
                { possibleNames: ["\u041E\u0413\u0420\u041D", "OGRN"], translation: "\u041E\u0413\u0420\u041D" },
                { possibleNames: ["\u041E\u0413\u0420\u041D\u0418\u041F", "OGRNIP"], translation: "\u041E\u0413\u0420\u041D\u0418\u041F" },
                { possibleNames: ["\u0421\u041D\u0418\u041B\u0421", "SNILS"], translation: "\u0421\u041D\u0418\u041B\u0421" },
                { possibleNames: ["\u0418\u041D\u041D", "INN", "\u0418\u041D\u041D \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438"], translation: "\u0418\u041D\u041D" },
                { possibleNames: ["E"], translation: "Email" },
                { possibleNames: ["L"], translation: "\u0413\u043E\u0440\u043E\u0434" }
              ];
            }
          ),
          /***/
          "./constants/oids-dictionary.ts": (
            /*!**************************************!*\
              !*** ./constants/oids-dictionary.ts ***!
              \**************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.OIDS_DICTIONARY = {
                "1.2.643.2.2.34.6": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0426\u0435\u043D\u0442\u0440\u0430 \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438",
                "1.2.643.2.39.1.1": '\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u043D\u044B\u0445 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430\u0445 \u0441\u0438\u0441\u0442\u0435\u043C\u044B "1\u0421:\u041F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u0435 8"',
                "1.2.643.3.131.1.1": "\u0418\u041D\u041D",
                "1.2.643.3.141.1.1": "\u0420\u041D\u0421 \u0424\u0421\u0421",
                "1.2.643.3.141.1.2": "\u041A\u041F \u0424\u0421\u0421",
                "1.2.643.3.2.100.65.13.11": '\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u0410\u0418\u0421 "\u0413\u043E\u0441\u0437\u0430\u043A\u0443\u043F\u043A\u0438" \u0421\u0430\u0445\u0430\u043B\u0438\u043D\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438.',
                "1.2.643.3.8.100.1": '\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u0442\u0438\u043F\u0430 "ekey-\u0413\u041E\u0421\u0422"',
                "1.2.643.3.8.100.1.1": "\u041E\u0431\u0449\u0435\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u0445 \u0418\u041E\u041A \u0431\u0435\u0437 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0432\u0435\u0440\u0435\u043D\u0438\u044F \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432",
                "1.2.643.3.8.100.1.10": "\u0414\u043B\u044F \u0443\u0447\u0430\u0441\u0442\u0438\u044F \u0432 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u0442\u043E\u0440\u0433\u0430\u0445 \u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0438\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u0430 \u0432  \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u0445 \u0422\u0435\u043D\u0434\u0435\u0440\u043D\u043E\u0433\u043E \u043A\u043E\u043C\u0438\u0442\u0435\u0442\u0430 \u0433\u043E\u0440\u043E\u0434\u0430 \u041C\u043E\u0441\u043A\u0432\u044B \u0443\u043F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0435\u043D\u043D\u044B\u043C\u0438  \u043B\u0438\u0446\u0430\u043C\u0438 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u0430 \u0433\u043E\u0440\u043E\u0434\u0430 \u041C\u043E\u0441\u043A\u0432\u044B",
                "1.2.643.3.8.100.1.11": "\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0432 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0439  \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0438 \u043C\u0443\u043D\u0438\u0446\u0438\u043F\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u0430 \u0421\u0430\u0440\u0430\u0442\u043E\u0432\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
                "1.2.643.3.8.100.1.12": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u0430 \u0418\u0440\u043A\u0443\u0442\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438",
                "1.2.643.3.8.100.1.13": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u0442\u043E\u0440\u0433\u043E\u0432\u043E\u0439 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0430 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E  \u0437\u0430\u043A\u0430\u0437\u0430 \u041A\u0440\u0430\u0441\u043D\u043E\u044F\u0440\u0441\u043A\u043E\u0433\u043E \u043A\u0440\u0430\u044F",
                "1.2.643.3.8.100.1.14": '\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u0442\u043E\u0440\u0433\u043E\u0432\u043E\u0439 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0435 "\u0422\u0435\u043D\u0434\u0435\u0440"',
                "1.2.643.3.8.100.1.2": "\u041F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u043E\u0442\u0447\u0435\u0442\u043D\u043E\u0441\u0442\u0438 \u043F\u043E \u0422\u041A\u0421",
                "1.2.643.3.8.100.1.3": "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0432\u0437\u0430\u0438\u043C\u043D\u044B\u0445 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432, \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0439, \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u043E\u0432, \u0430\u043A\u0442\u043E\u0432 \u0438 \u0442.\u043F.",
                "1.2.643.3.8.100.1.4": "\u0412\u043D\u0443\u0442\u0440\u0438\u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u043E\u0431\u043E\u0440\u043E\u0442",
                "1.2.643.3.8.100.1.5": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u0445 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u0442\u043E\u0440\u0433\u043E\u0432\u043B\u0438",
                "1.2.643.3.8.100.1.6": '\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u0442\u043E\u0440\u0433\u043E\u0432\u043E-\u0437\u0430\u043A\u0443\u043F\u043E\u0447\u043D\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 "\u042D\u041B\u0415\u041A\u0422\u0420\u0410"',
                "1.2.643.3.8.100.1.7": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u041F\u043E\u0440\u0442\u0430\u043B \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u043A\u0443\u043F\u043E\u043A \u0421\u0442\u0430\u0432\u0440\u043E\u043F\u043E\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u043A\u0440\u0430\u044F.",
                "1.2.643.3.8.100.1.8": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u0415\u0434\u0438\u043D\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u0442\u043E\u0440\u0433\u043E\u0432\u043B\u0438 B2B-Center \u0438 B2G.",
                "1.2.643.3.8.100.1.9": "\u0414\u043B\u044F \u0443\u0447\u0430\u0441\u0442\u0438\u044F \u0432 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u0442\u043E\u0440\u0433\u0430\u0445 \u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043D\u0438\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u0430 \u0432  \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0435 \u041E\u0410\u041E \xAB\u0415\u042D\u0422\u041F\xBB \u0443\u043F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0435\u043D\u043D\u044B\u043C\u0438 \u043B\u0438\u0446\u0430\u043C\u0438 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F  \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0438\u043B\u0438 \u043C\u0443\u043D\u0438\u0446\u0438\u043F\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u0430",
                "1.2.643.5.1.24.2.1.3": "\u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445  \u0443\u0441\u043B\u0443\u0433 \u0432 \u0441\u0444\u0435\u0440\u0435 \u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u043A\u0430\u0434\u0430\u0441\u0442\u0440\u0430 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438 \u0441\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u0437\u0430\u044F\u0432\u0438\u0442\u0435\u043B\u044F",
                "1.2.643.5.1.24.2.1.3.1": "\u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0434\u0430\u0441\u0442\u0440\u043E\u0432\u044B\u043C \u0438\u043D\u0436\u0435\u043D\u0435\u0440\u043E\u043C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432  \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0443\u0441\u043B\u0443\u0433 \u0432 \u0441\u0444\u0435\u0440\u0435 \u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u043A\u0430\u0434\u0430\u0441\u0442\u0440\u0430 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438 \u0441\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u044B  \u0437\u0430\u044F\u0432\u0438\u0442\u0435\u043B\u044F",
                "1.2.643.5.1.24.2.2.2": "\u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043A\u0430\u043A \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430 \u043E\u043A\u0430\u0437\u0430\u043D\u0438\u044F  \u0443\u0441\u043B\u0443\u0433\u0438 \u0441\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u043E\u0440\u0433\u0430\u043D\u043E\u0432 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u043F\u0440\u0430\u0432",
                "1.2.643.5.1.24.2.2.3": "\u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445  \u0443\u0441\u043B\u0443\u0433 \u0432 \u0441\u0444\u0435\u0440\u0435 \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u043F\u0440\u0430\u0432 \u043D\u0430 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0435 \u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u043E \u0438 \u0441\u0434\u0435\u043B\u043E\u043A \u0441 \u043D\u0438\u043C \u0441\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u0437\u0430\u044F\u0432\u0438\u0442\u0435\u043B\u044F",
                "1.2.643.6.2.1.7.1": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0435\u0434\u0438\u043D\u043E\u043B\u0438\u0447\u043D\u044B\u043C \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C \u043E\u0440\u0433\u0430\u043D\u043E\u043C \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043B\u0438\u0446\u0430 \u0438\u043B\u0438 \u0443\u043F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0435\u043D\u043D\u044B\u043C\u0438 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044F\u043C\u0438 \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043B\u0438\u0446\u0430 \u0432 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F\u0445, \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0441 \u0432\u043E\u0437\u043D\u0438\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u0435\u043C, \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435\u043C (\u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u0435\u043D\u0438\u0435\u043C) \u0438 \u043F\u0440\u0435\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u0435\u043C \u0433\u0440\u0430\u0436\u0434\u0430\u043D\u0441\u043A\u0438\u0445 \u0438 \u0438\u043D\u044B\u0445 \u043F\u0440\u0430\u0432 \u0438 \u043E\u0431\u044F\u0437\u0430\u043D\u043D\u043E\u0441\u0442\u0435\u0439 \u0432 \u0441\u0444\u0435\u0440\u0435 \u043D\u0435\u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u043F\u0435\u043D\u0441\u0438\u043E\u043D\u043D\u043E\u0433\u043E \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u044F, \u043D\u0435\u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u043F\u0435\u043D\u0441\u0438\u043E\u043D\u043D\u043E\u0433\u043E \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u044F, \u0432 \u0441\u0444\u0435\u0440\u0435 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043F\u0430\u0435\u0432\u044B\u0445 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0444\u043E\u043D\u0434\u043E\u0432, \u0430\u043A\u0446\u0438\u043E\u043D\u0435\u0440\u043D\u044B\u0445 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0444\u043E\u043D\u0434\u043E\u0432, \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0440\u044B\u043D\u043A\u0430 \u0446\u0435\u043D\u043D\u044B\u0445 \u0431\u0443\u043C\u0430\u0433, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u043E\u0439 \u0441 \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435\u043C \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0439 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0443\u0441\u043B\u0443\u0433 \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u044B\u0445 \u0438 \u0438\u043D\u044B\u0445 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0439",
                "1.2.643.6.2.1.7.2": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u043B\u0438\u0446\u043E\u043C \u0432 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F\u0445, \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0441 \u0432\u043E\u0437\u043D\u0438\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u0435\u043C, \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435\u043C (\u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u0435\u043D\u0438\u0435\u043C) \u0438 \u043F\u0440\u0435\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u0435\u043C \u0433\u0440\u0430\u0436\u0434\u0430\u043D\u0441\u043A\u0438\u0445 \u043F\u0440\u0430\u0432 \u0438 \u043E\u0431\u044F\u0437\u0430\u043D\u043D\u043E\u0441\u0442\u0435\u0439 \u0432 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0438 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u043F\u0430\u0435\u0432 \u043F\u0430\u0435\u0432\u044B\u0445 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0444\u043E\u043D\u0434\u043E\u0432, \u0432 \u0442\u043E\u043C \u0447\u0438\u0441\u043B\u0435 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F, \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0435 \u0441 \u0443\u0447\u0435\u0442\u043E\u043C \u0438/\u0438\u043B\u0438 \u0444\u0438\u043A\u0441\u0430\u0446\u0438\u0435\u0439 \u043F\u0440\u0430\u0432 \u043D\u0430 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u043F\u0430\u0438 \u043F\u0430\u0435\u0432\u044B\u0445 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0444\u043E\u043D\u0434\u043E\u0432",
                "1.2.643.6.3": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0445 \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u0445 \u0438 \u0432 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u043D\u043E\u043C \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0438, \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u043C \u0441 \u043E\u0431\u043C\u0435\u043D\u043E\u043C \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439",
                "1.2.643.6.3.1.1": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u043F\u043B\u043E\u0449\u0430\u0434\u043E\u043A \u043E\u0442\u043E\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0430\u0443\u043A\u0446\u0438\u043E\u043D\u0430\u0445 \u0432 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u0444\u043E\u0440\u043C\u0435",
                "1.2.643.6.3.1.2.1": "\u0422\u0438\u043F \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 - \u042E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043B\u0438\u0446\u043E",
                "1.2.643.6.3.1.2.2": "\u0422\u0438\u043F \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 - \u0424\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043B\u0438\u0446\u043E",
                "1.2.643.6.3.1.2.3": "\u0422\u0438\u043F \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 - \u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044C",
                "1.2.643.6.3.1.3.1": "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430",
                "1.2.643.6.3.1.4.1": "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438",
                "1.2.643.6.3.1.4.2": "\u0423\u043F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0435\u043D\u043D\u044B\u0439 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442",
                "1.2.643.6.3.1.4.3": "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442 \u0441 \u043F\u0440\u0430\u0432\u043E\u043C \u043F\u043E\u0434\u043F\u0438\u0441\u0438 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u0430",
                "1.2.840.113549.1.9.2": "\u041D\u0435\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u0438\u043C\u044F",
                "1.3.6.1.4.1.24138.1.1.8.1": '\u041E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0435 \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0437\u043D\u0430\u0447\u0438\u043C\u043E\u0441\u0442\u0438 \u0432 \u0421\u0438\u0441\u0442\u0435\u043C\u0435 "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u0422\u043E\u0440\u0433\u043E\u0432\u0430\u044F \u041F\u043B\u043E\u0449\u0430\u0434\u043A\u0430"',
                "1.3.6.1.4.1.29919.21": '\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u041F\u043E\u0440\u0442\u0430\u043B \u0433\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u0437\u0430\u043A\u0443\u043F\u043E\u043A  \u0420\u043E\u0441\u0442\u043E\u0432\u0441\u043A\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438 "\u0420\u0435\u0444\u0435\u0440\u0438".',
                "1.3.6.1.5.5.7.3.2": "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u043E\u0434\u043B\u0438\u043D\u043D\u043E\u0441\u0442\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0430",
                "1.3.6.1.5.5.7.3.4": "\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u0430\u044F \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430",
                "1.3.643.3.8.100.15": '\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u042D\u0422\u041F "uTender"'
              };
            }
          ),
          /***/
          "./constants/subject-tags-translations.ts": (
            /*!************************************************!*\
              !*** ./constants/subject-tags-translations.ts ***!
              \************************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.SUBJECT_TAGS_TRANSLATIONS = [
                { possibleNames: ["UnstructuredName"], translation: "\u041D\u0435\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u0438\u043C\u044F" },
                { possibleNames: ["CN"], translation: "\u0412\u043B\u0430\u0434\u0435\u043B\u0435\u0446" },
                { possibleNames: ["SN"], translation: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F" },
                { possibleNames: ["G"], translation: "\u0418\u043C\u044F \u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E" },
                { possibleNames: ["C"], translation: "\u0421\u0442\u0440\u0430\u043D\u0430" },
                { possibleNames: ["S"], translation: "\u0420\u0435\u0433\u0438\u043E\u043D" },
                { possibleNames: ["STREET"], translation: "\u0410\u0434\u0440\u0435\u0441" },
                { possibleNames: ["O"], translation: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F" },
                { possibleNames: ["OU"], translation: "\u041E\u0442\u0434\u0435\u043B/\u043F\u043E\u0434\u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0435" },
                { possibleNames: ["T"], translation: "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C" },
                { possibleNames: ["\u041E\u0413\u0420\u041D", "OGRN"], translation: "\u041E\u0413\u0420\u041D" },
                { possibleNames: ["\u041E\u0413\u0420\u041D\u0418\u041F", "OGRNIP"], translation: "\u041E\u0413\u0420\u041D\u0418\u041F" },
                { possibleNames: ["\u0421\u041D\u0418\u041B\u0421", "SNILS"], translation: "\u0421\u041D\u0418\u041B\u0421" },
                { possibleNames: ["\u0418\u041D\u041D", "INN", "\u0418\u041D\u041D \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438"], translation: "\u0418\u041D\u041D" },
                { possibleNames: ["E"], translation: "Email" },
                { possibleNames: ["L"], translation: "\u0413\u043E\u0440\u043E\u0434" }
              ];
            }
          ),
          /***/
          "./crypto-pro-actual-cades-plugin.ts": (
            /*!*******************************************!*\
              !*** ./crypto-pro-actual-cades-plugin.ts ***!
              \*******************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              function __export2(m) {
                for (var p in m) if (!exports2.hasOwnProperty(p)) exports2[p] = m[p];
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
              __export2(__webpack_require__2(
                /*! ./api */
                "./api/index.ts"
              ));
            }
          ),
          /***/
          "./helpers/_afterPluginsLoaded.ts": (
            /*!****************************************!*\
              !*** ./helpers/_afterPluginsLoaded.ts ***!
              \****************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              var __awaiter2 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
                function adopt(value) {
                  return value instanceof P ? value : new P(function(resolve) {
                    resolve(value);
                  });
                }
                return new (P || (P = Promise))(function(resolve, reject) {
                  function fulfilled(value) {
                    try {
                      step(generator.next(value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function rejected(value) {
                    try {
                      step(generator["throw"](value));
                    } catch (e) {
                      reject(e);
                    }
                  }
                  function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                  }
                  step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
              };
              Object.defineProperty(exports2, "__esModule", { value: true });
              const _extractMeaningfulErrorMessage_12 = __webpack_require__2(
                /*! ./_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              let isSetLogLevel = false;
              let isPluginLoaded = false;
              exports2._afterPluginsLoaded = (fn) => {
                const canPromise = Boolean(window.Promise);
                return function(...args) {
                  return __awaiter2(this, void 0, void 0, function* () {
                    if (!isPluginLoaded) {
                      try {
                        __webpack_require__2(
                          /*! cadesplugin_api.js-actual */
                          "../node_modules/cadesplugin_api.js-actual/dist/cadesplugin_api.js"
                        );
                      } catch (error) {
                        console.error(error);
                        throw new Error(_extractMeaningfulErrorMessage_12._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438 \u043C\u043E\u0434\u0443\u043B\u044F \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441 Cades plugin");
                      }
                      isPluginLoaded = true;
                    }
                    const { cadesplugin: cadesplugin2 } = window;
                    if (!canPromise) {
                      throw new Error("\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C \u043F\u043E\u043B\u0438\u0444\u0438\u043B\u043B \u0434\u043B\u044F Promise");
                    }
                    if (!cadesplugin2) {
                      throw new Error("\u041D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D \u043C\u043E\u0434\u0443\u043B\u044C \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441 Cades plugin");
                    }
                    if (!isSetLogLevel) {
                      cadesplugin2.set_log_level(cadesplugin2.LOG_LEVEL_ERROR);
                      isSetLogLevel = true;
                    }
                    try {
                      yield cadesplugin2;
                    } catch (error) {
                      console.error(error);
                      throw new Error(_extractMeaningfulErrorMessage_12._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043C\u043E\u0434\u0443\u043B\u044F \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441 Cades plugin");
                    }
                    return yield fn.apply(this, args);
                  });
                };
              };
            }
          ),
          /***/
          "./helpers/_extractCommonName.ts": (
            /*!***************************************!*\
              !*** ./helpers/_extractCommonName.ts ***!
              \***************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2._extractCommonName = (subjectName) => {
                var _a;
                return (_a = subjectName.match(/CN=(.+?)(?:,|$)/)) === null || _a === void 0 ? void 0 : _a[1];
              };
            }
          ),
          /***/
          "./helpers/_extractMeaningfulErrorMessage.ts": (
            /*!***************************************************!*\
              !*** ./helpers/_extractMeaningfulErrorMessage.ts ***!
              \***************************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2._extractMeaningfulErrorMessage = (error) => {
                var _a;
                let errorContainer = ((_a = window.cadesplugin) === null || _a === void 0 ? void 0 : _a.getLastError) && window.cadesplugin.getLastError(error);
                if (!(errorContainer === null || errorContainer === void 0 ? void 0 : errorContainer.message)) {
                  if (!error.message) {
                    return null;
                  }
                  errorContainer = error;
                }
                const containsRussianLetters = /[а-яА-Я]/.test(errorContainer.message);
                if (!containsRussianLetters) {
                  return null;
                }
                const searchResult = errorContainer.message.match(/^(.*?)(?:(?:\.?\s?\(?0x)|(?:\.?$))/);
                return searchResult ? searchResult[1] : null;
              };
            }
          ),
          /***/
          "./helpers/_generateCadesFn.ts": (
            /*!*************************************!*\
              !*** ./helpers/_generateCadesFn.ts ***!
              \*************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2.__cadesAsyncToken__ = {};
              exports2.__createCadesPluginObject__ = (...args) => ({});
              function getGeneratorConstructor() {
                return new Function("", "return Object.getPrototypeOf(function*(){}).constructor")();
              }
              exports2._generateCadesFn = (callback) => {
                var _a;
                const { cadesplugin: cadesplugin2 } = window;
                const cadesGeneratorsAPI = Boolean(cadesplugin2.CreateObjectAsync);
                const callbackName = callback.name || "dynamicFn";
                const callbackLiteral = String(callback);
                const callbackArguments = ((_a = callbackLiteral.match(/^function[\s\w]*?\((.*?)\)/)) === null || _a === void 0 ? void 0 : _a[1]) || "";
                const callbackBody = callbackLiteral.replace(/^.*?{([\s\S]*?)}$/, "$1");
                let crossEnvCallbackLiteral = String(new (cadesGeneratorsAPI ? getGeneratorConstructor() : Function)(callbackArguments, callbackBody));
                crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(/(?:\w+?\.)?__createCadesPluginObject__(\([\s\S]*?\))/gm, `cadesplugin.CreateObject${cadesGeneratorsAPI ? "Async" : ""}$1`);
                crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(/(?:\w+?\.)?__cadesAsyncToken__\s*?\+\s*?\b/gm, cadesGeneratorsAPI ? "yield " : "");
                if (!cadesGeneratorsAPI) {
                  crossEnvCallbackLiteral = crossEnvCallbackLiteral.replace(/propset_(.*?)\((.*?)\)/gm, "$1 = $2");
                }
                return [
                  cadesGeneratorsAPI ? `cadesplugin.async_spawn(${crossEnvCallbackLiteral});` : `(${crossEnvCallbackLiteral})();`,
                  `//# sourceURL=crypto-pro_${callbackName}.js`
                ].join("");
              };
            }
          ),
          /***/
          "./helpers/_getCadesCert.ts": (
            /*!**********************************!*\
              !*** ./helpers/_getCadesCert.ts ***!
              \**********************************/
            /*! no static exports found */
            /***/
            function(module, exports, __webpack_require__) {
              "use strict";
              Object.defineProperty(exports, "__esModule", { value: true });
              const _afterPluginsLoaded_1 = __webpack_require__(
                /*! ./_afterPluginsLoaded */
                "./helpers/_afterPluginsLoaded.ts"
              );
              const _extractMeaningfulErrorMessage_1 = __webpack_require__(
                /*! ./_extractMeaningfulErrorMessage */
                "./helpers/_extractMeaningfulErrorMessage.ts"
              );
              const _generateCadesFn_1 = __webpack_require__(
                /*! ./_generateCadesFn */
                "./helpers/_generateCadesFn.ts"
              );
              exports._getCadesCert = _afterPluginsLoaded_1._afterPluginsLoaded((thumbprint) => {
                const { cadesplugin } = window;
                return eval(_generateCadesFn_1._generateCadesFn(function _getCadesCert() {
                  let cadesStore;
                  try {
                    cadesStore = _generateCadesFn_1.__cadesAsyncToken__ + _generateCadesFn_1.__createCadesPluginObject__("CAdESCOM.Store");
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0443");
                  }
                  if (!cadesStore) {
                    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0443 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432");
                  }
                  try {
                    void (_generateCadesFn_1.__cadesAsyncToken__ + cadesStore.Open(cadesplugin.CAPICOM_CURRENT_USER_STORE, cadesplugin.CAPICOM_MY_STORE, cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED));
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0438 \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430");
                  }
                  let cadesCertificateList;
                  let certificatesCount;
                  try {
                    cadesCertificateList = _generateCadesFn_1.__cadesAsyncToken__ + cadesStore.Certificates;
                    certificatesCount = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Count;
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u043F\u0438\u0441\u043A\u0430 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432");
                  }
                  if (!certificatesCount) {
                    throw new Error("\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432");
                  }
                  let cadesCertificate2;
                  try {
                    cadesCertificateList = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Find(cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH, thumbprint);
                    const count = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Count;
                    if (!count) {
                      throw new Error(`\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u0441 \u043E\u0442\u043F\u0435\u0447\u0430\u0442\u043A\u043E\u043C: "${thumbprint}" \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D`);
                    }
                    cadesCertificate2 = _generateCadesFn_1.__cadesAsyncToken__ + cadesCertificateList.Item(1);
                  } catch (error) {
                    console.error(error);
                    throw new Error(_extractMeaningfulErrorMessage_1._extractMeaningfulErrorMessage(error) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430");
                  }
                  cadesStore.Close();
                  return cadesCertificate2;
                }));
              });
            }
          ),
          /***/
          "./helpers/_getDateObj.ts": (
            /*!********************************!*\
              !*** ./helpers/_getDateObj.ts ***!
              \********************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2._getDateObj = (dateObj) => dateObj.getVarDate ? dateObj.getVarDate() : dateObj;
            }
          ),
          /***/
          "./helpers/_isSupportedCSPVersion.ts": (
            /*!*******************************************!*\
              !*** ./helpers/_isSupportedCSPVersion.ts ***!
              \*******************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              const oldestSupportedCSPVersion = 4;
              exports2._isSupportedCSPVersion = (version) => {
                var _a;
                version = (_a = version.match(/\d+?\b(?:\.\d+)?/)) === null || _a === void 0 ? void 0 : _a[0];
                return Number(version) >= oldestSupportedCSPVersion;
              };
            }
          ),
          /***/
          "./helpers/_isSupportedCadesVersion.ts": (
            /*!*********************************************!*\
              !*** ./helpers/_isSupportedCadesVersion.ts ***!
              \*********************************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              exports2._isSupportedCadesVersion = (version) => {
                const match = version.match(/(\d+)\.(\d+)\.(\d+)/);
                if (!match) {
                  return false;
                }
                const [, major, minor, patch] = match;
                if (Number(major) < 2) {
                  return false;
                }
                if (Number(major) === 2 && Number(patch) < 12438) {
                  return false;
                }
                return true;
              };
            }
          ),
          /***/
          "./helpers/_parseCertInfo.ts": (
            /*!***********************************!*\
              !*** ./helpers/_parseCertInfo.ts ***!
              \***********************************/
            /*! no static exports found */
            /***/
            function(module2, exports2, __webpack_require__2) {
              "use strict";
              Object.defineProperty(exports2, "__esModule", { value: true });
              const constants_12 = __webpack_require__2(
                /*! ../constants */
                "./constants/index.ts"
              );
              exports2._parseCertInfo = (tagsTranslations, rawInfo) => {
                const extractedEntities = rawInfo.match(/([а-яА-Яa-zA-Z0-9\s.]+)=(?:("[^"]+?")|(.+?))(?:,|$)/g);
                if (extractedEntities) {
                  return extractedEntities.map((group) => {
                    var _a, _b, _c;
                    const segmentsMatch = group.trim().match(/^([а-яА-Яa-zA-Z0-9\s.]+)=(.+?),?$/);
                    let title = segmentsMatch === null || segmentsMatch === void 0 ? void 0 : segmentsMatch[1];
                    const description = (_b = (_a = segmentsMatch === null || segmentsMatch === void 0 ? void 0 : segmentsMatch[2]) === null || _a === void 0 ? void 0 : _a.replace(/^"(.*)"/, "$1")) === null || _b === void 0 ? void 0 : _b.replace(/"{2}/g, '"');
                    const oidIdentifierMatch = title === null || title === void 0 ? void 0 : title.match(/^OID\.(.*)/);
                    const oidIdentifier = oidIdentifierMatch === null || oidIdentifierMatch === void 0 ? void 0 : oidIdentifierMatch[1];
                    let isTranslated = false;
                    if (oidIdentifier) {
                      const oidTranslation = constants_12.OIDS_DICTIONARY[oidIdentifier];
                      if (oidTranslation) {
                        title = oidTranslation;
                        isTranslated = true;
                      }
                    }
                    const tagTranslation = (_c = tagsTranslations.find((tag) => tag.possibleNames.find((name) => name === title))) === null || _c === void 0 ? void 0 : _c.translation;
                    if (tagTranslation) {
                      title = tagTranslation;
                      isTranslated = true;
                    }
                    return { description, title, isTranslated };
                  });
                }
              };
            }
          )
          /******/
        })
      );
    });
  }
});

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
var import_crypto_pro_actual_cades_plugin = __toESM(require_crypto_pro_actual_cades_plugin(), 1);
async function ensureReady() {
  await window.cadesplugin;
  const CADES5 = window.cadesplugin;
  try {
    await CADES5;
  } catch {
    throw new Error("CryptoPro browser\u2011extension \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0438\u043B\u0438 \u043D\u0435 \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u043E\u0441\u044C");
  }
  const about = await CADES5.CreateObjectAsync("CAdESCOM.About");
  const pluginVer = await about.PluginVersion;
  if (!pluginVer) {
    throw new Error("Native\u2011host \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D. \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 'CAdES Browser Plug\u2011in \u2265 2.0.15400'");
  }
  const store = await CADES5.CreateObjectAsync("CAdESCOM.Store");
  await store.Open(
    CADES5.CAPICOM_CURRENT_USER_STORE,
    // область — CurrentUser
    CADES5.CAPICOM_MY_STORE,
    // имя — «MY» («Personal»)
    CADES5.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
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
var CADES = window.cadesplugin;
async function createDetachedSignature(hashBase64) {
  const cert = await ensureReady();
  const hashObj = await CADES.CreateObjectAsync("CAdESCOM.HashedData");
  await hashObj.propset_Algorithm(CADES.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256);
  await hashObj.propset_DataEncoding(CADES.CADESCOM_BASE64_TO_BINARY);
  await hashObj.propset_HashValue(hashBase64);
  const signer = await CADES.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(cert);
  const signature = await hashObj.SignHash(
    signer,
    CADES.CADESCOM_CADES_BES,
    // тип подписи
    true
    // detached = true
  );
  return signature;
}
var createDetachedSignature_default = createDetachedSignature;

// src/api/createTimestampedDetachedSignature.ts
var CADES2 = window.cadesplugin;
var ALG = CADES2.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256;
var ENC = CADES2.CADESCOM_BASE64_TO_BINARY;
async function createTimestampedDetachedSignature(hashBase64, tspURL) {
  const cert = await ensureReady();
  const hashObj = await CADES2.CreateObjectAsync("CAdESCOM.HashedData");
  await hashObj.propset_Algorithm(ALG);
  await hashObj.propset_DataEncoding(ENC);
  await hashObj.propset_HashValue(hashBase64);
  const signer = await CADES2.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(cert);
  const rawSig = await hashObj.SignHash(
    signer,
    CADES2.CADESCOM_CADES_BES,
    true
    // detached
  );
  const sd = await CADES2.CreateObjectAsync("CAdESCOM.CadesSignedData");
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
var CADES3 = window.cadesplugin;
var ALG2 = CADES3.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256;
var ENC_STR = CADES3.CADESCOM_STRING_TO_UCS2LE;
async function createAttachedSignature(message) {
  const cert = await ensureReady();
  const sd = await CADES3.CreateObjectAsync("CAdESCOM.CadesSignedData");
  await sd.propset_ContentEncoding(ENC_STR);
  await sd.propset_Content(message);
  const signer = await CADES3.CreateObjectAsync("CAdESCOM.CPSigner");
  await signer.propset_Certificate(cert);
  const signature = await sd.SignCades(
    signer,
    CADES3.CADESCOM_CADES_BES,
    // тип подписи
    /* detached = */
    false
  );
  return signature;
}

// src/index.ts
var CADES4 = window.cadesplugin;
var ALG3 = CADES4.CADESCOM_HASH_ALGORITHM_GOST_34_11_2012_256;
var ENC2 = CADES4.CADESCOM_BASE64_TO_BINARY;
var STR = CADES4.CADESCOM_STRING_TO_UCS2LE;
async function getSystemInfo() {
  await CADES4;
  const about = await CADES4.CreateObjectAsync("CAdESCOM.About");
  return {
    pluginVersion: await about.PluginVersion,
    cspVersion: await about.CSPVersion
  };
}
async function isValidSystemSetup() {
  try {
    await ensureReady();
    return true;
  } catch {
    return false;
  }
}
async function createHash(message) {
  await CADES4;
  const hd = await CADES4.CreateObjectAsync("CAdESCOM.HashedData");
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
/*! Bundled license information:

crypto-pro-actual-cades-plugin/lib/crypto-pro-actual-cades-plugin.js:
  (*!
  * The buffer module from node.js, for the browser.
  *
  * @author   Feross Aboukhadijeh <http://feross.org>
  * @license  MIT
  *)
*/
