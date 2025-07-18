# Лендинг тактических очков

## Настройка EmailJS

### 1. Получение кредов EmailJS
1. Зарегистрируйтесь на [EmailJS](https://www.emailjs.com/)
2. Создайте Email Service (Gmail, Outlook и т.д.)
3. Создайте Email Template
4. Скопируйте Service ID, Template ID и Public Key

### 2. Настройка конфигурации
Заполните в `config.js` ваши реальные данные:
   ```javascript
   const EMAILJS_CONFIG = {
       serviceId: 'ваш_service_id',
       templateId: 'ваш_template_id', 
       publicKey: 'ваш_public_key'
   };
   ```

## Запуск проекта

```bash
# Запуск локального сервера
python3 -m http.server 8000

# Откройте http://localhost:8000
```

## Структура файлов

- `index.html` - главная страница
- `thank-you.html` - страница благодарности
- `styles.css` - стили
- `script.js` - основная логика
- `config.js` - конфигурация EmailJS (не в git)