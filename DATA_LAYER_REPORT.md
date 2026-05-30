# DATA_LAYER_REPORT.md

# Shared Config & Data Layer v1 — Макс-Клининг

Дата этапа: 2026-05-30.

## Что централизовано

- Публичные бизнес-данные в `assets/js/site-config.js`.
- Placeholder-контакты: телефон, WhatsApp, Telegram.
- Список услуг для будущей JS-логики.
- Общие пояснения по ценам.
- Данные калькулятора: услуги, base price, minimum, единицы расчёта, min/max, дополнительные опции.
- CRM mode: `mock`.

## Изменённые файлы

- `assets/js/site-config.js`
- `assets/js/main.js`
- `assets/js/calculator.js`
- `assets/js/forms.js`
- все HTML-страницы с подключением `site-config.js` перед runtime-скриптами;
- `README.md`
- `CONTENT_TODO.md`
- `DATA_MODEL.md`
- `DATA_LAYER_REPORT.md`

## Что осталось placeholder

- Реальный телефон.
- WhatsApp.
- Telegram.
- Город.
- Зоны выезда.
- Адрес или район работы.
- Реальные цены и минимальный заказ.
- Финальные ограничения калькулятора.
- Политика обработки персональных данных.
- CRM-интеграция.

## Риски

- Header/footer по-прежнему статически продублированы в HTML.
- SEO-контент услуг намеренно остаётся в HTML, а список услуг в `site-config.js` нужно синхронизировать вручную.
- Placeholder-контакты безопасны, но перед публикацией их обязательно нужно заменить.
- CRM mode остаётся `mock`; реальная отправка требует backend/serverless proxy.

## Что проверено

- `site-config.js` подключён перед `main.js`, `calculator.js` и `forms.js`.
- `main.js` берёт контакты из `window.MAX_CLEANING_CONFIG` и имеет fallback.
- `calculator.js` берёт цены, ограничения и опции из конфига и имеет fallback.
- `forms.js` читает `crm.mode` и работает в mock-режиме.
- Статические HTML-страницы услуг не зависят от JS-генерации SEO-контента.
- Секреты, токены, API keys и реальные webhook URL не добавлены.

## Следующий рекомендуемый этап

- Заполнить `site-config.js` реальными публичными контактами и городом.
- Синхронизировать реальные цены в `prices.html` и `calculator.services`.
- Добавить политику обработки персональных данных.
- После этого проектировать backend/serverless proxy для безопасной отправки заявок.
