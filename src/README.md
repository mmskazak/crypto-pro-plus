# Структура модулей

Библиотека разбита на логические модули для удобства использования и поддержки:

## 📁 Модули

### `common.js`
Общие функции и утилиты для работы с плагином
- `pluginVersion()` - получение версии плагина
- `openCertificateStore()` - открытие хранилища сертификатов

### `certificates.js`
Функции для работы с сертификатами
- `countCertificates()` - подсчет сертификатов
- `getCertificateByThumbprint()` - получение сертификата по отпечатку
- `getCertificateInfo()` - получение информации о сертификате
- `getCertificates()` - получение списка всех сертификатов

### `signing.js`
Функции для простой подписи данных
- `signBase64Detached()` - отсоединенная подпись
- `signBase64DetachedWithTimestamp()` - отсоединенная подпись с меткой времени
- `signBase64Attached()` - встроенная подпись
- `signBase64AttachedWithTimestamp()` - встроенная подпись с меткой времени

### `multiple-signing.js`
Функции для множественных подписей
- `coSignBase64()` - добавление соподписи
- `coSignBase64WithTimestamp()` - соподпись с меткой времени
- `createCollectiveSignature()` - коллективная подпись (все подписывают исходные данные)
- `createWorkflowSignature()` - workflow подпись (цепочка согласования)
- `createMultipleSignature()` - алиас для createCollectiveSignature
- `createSequentialSignature()` - алиас для createWorkflowSignature

### `hashing.js`
Функции для создания хешей
- `createHash()` - универсальная функция хеширования
- `createSHA1Hash()`, `createSHA256Hash()`, `createSHA384Hash()`, `createSHA512Hash()` - SHA хеши
- `createGost2012_256Hash()`, `createGost2012_512Hash()`, `createGost94Hash()` - ГОСТ хеши

### `hash-signing.js`
Функции для подписи хешей
- `signHashDetached()` - универсальная подпись хеша
- `signHashDetachedWithTimestamp()` - универсальная подпись хеша с меткой времени
- Специализированные функции для разных алгоритмов хеширования

### `verification.js`
Функции для проверки подписей
- `verifyDetachedSignature()` - проверка detached подписи
- `verifyAttachedSignature()` - проверка attached подписи
- `verifyTimestampedSignature()` - проверка подписи с меткой времени
- `getSignersInfo()` - получение информации о подписчиках
- `verifySignature()` - универсальная проверка

### `countersigning.js`
Функции для контрподписей
- `counterSign()` - создание контрподписи
- `counterSignBySigner()` - контрподпись конкретного подписчика
- `counterSignAll()` - контрподпись всех подписчиков
- `getCounterSignersInfo()` - информация о контрподписях

### `utils.js`
Утилитарные функции
- `toBase64Unicode()` - конвертация строк в base64

## 💡 Использование модулей

Каждый модуль импортируется отдельно:

```javascript
// Работа с сертификатами
import { getCertificates } from '@mmskazak/crypto-pro-plus/certificates';

// Создание хешей
import { createSHA256Hash } from '@mmskazak/crypto-pro-plus/hashing';

// Подпись данных
import { signBase64Detached } from '@mmskazak/crypto-pro-plus/signing';

// Подпись хешей
import { signSHA256HashDetached } from '@mmskazak/crypto-pro-plus/hash-signing';

// Проверка подписей
import { verifyDetachedSignature } from '@mmskazak/crypto-pro-plus/verification';

// Множественные подписи
import { coSignBase64, createMultipleSignature } from '@mmskazak/crypto-pro-plus/multiple-signing';

// Контрподписи
import { counterSign } from '@mmskazak/crypto-pro-plus/countersigning';

// Утилиты
import { toBase64Unicode } from '@mmskazak/crypto-pro-plus/utils';

// Общие функции
import { pluginVersion } from '@mmskazak/crypto-pro-plus/common';
```
