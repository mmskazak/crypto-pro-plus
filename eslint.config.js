// Импортируем официальный плагин для базовых правил JS
import js from '@eslint/js';

// Импортируем набор глобальных переменных (например, window, document для браузера)
import globals from 'globals';

// Импортируем defineConfig — современный способ объявления конфигурации
import { defineConfig } from 'eslint/config';

// Экспортируем конфигурацию через defineConfig
export default defineConfig([
  {
    // 🔍 Указываем, какие файлы линтить
    files: ['**/*.{js,mjs,cjs}'],

    // 🔍 Игнорируем файлы из исключений
    ignores: ['cadesplugin_api.js', 'dist', 'node_modules'],

    // 🔌 Подключаем плагины (в данном случае только базовый js)
    plugins: {
      js,
    },

    // 📜 Наследуем рекомендованные правила от ESLint
    extends: ['js/recommended'],

    // 🌍 Настраиваем глобальные переменные (например, browser окружение)
    languageOptions: {
      globals: globals.browser,
    },

    // ✅ Дополнительные кастомные правила можно указать здесь
    rules: {
      'no-console': 'off',      // полностью отключить console.log
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Ошибка при неиспользуемых переменных (кроме параметров вида _foo)
      'quotes': ['error', 'single'], // Требует одинарные кавычки
    },
  },
]);
