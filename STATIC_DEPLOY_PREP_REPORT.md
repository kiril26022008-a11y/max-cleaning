# STATIC_DEPLOY_PREP_REPORT.md

# Static Deploy Prep v1

## Вердикт

Сайт готов к статическому деплою как первая версия: визитка, Local SEO, каталог услуг, цены, калькулятор, звонок и WhatsApp.

CRM/backend не подключены. Формы остаются demo/mock.

## Что исправлено и подготовлено

- Добавлен `favicon.svg` без внешних зависимостей и чужих логотипов.
- Добавлен `site.webmanifest`.
- `favicon.svg` и `site.webmanifest` подключены на всех HTML-страницах.
- `robots.txt` не блокирует сайт и содержит TODO-комментарий для абсолютного sitemap URL после появления домена.
- Проверены sitemap, service-страницы, privacy footer links, phone/WhatsApp CTA.
- README дополнен разделом `Первый статический запуск`.
- Добавлен `DEPLOY_CHECKLIST.md`.

## Sitemap

`sitemap.xml` готов в локально-безопасном относительном формате, потому что production-домен не предоставлен.

Содержит:

- `index.html`
- `services.html`
- `calculator.html`
- `prices.html`
- `about.html`
- `contacts.html`
- `thanks.html`
- `privacy.html`
- все текущие `service-*.html`

После появления домена рекомендуется заменить `<loc>` на абсолютные URL.

## Robots

`robots.txt`:

- не блокирует сайт;
- содержит `Allow: /`;
- не содержит фейкового домена;
- оставляет TODO для замены sitemap URL после появления домена.

## Runtime-риски

- Абсолютные локальные пути в HTML/CSS/JS/XML/TXT не найдены.
- `localhost` в runtime HTML/CSS/JS/XML/TXT не найден.
- CRM endpoint, webhook URL, token, secret, api_key в runtime-коде не найдены.
- Fake Telegram URL не найден.
- Fake rating/aggregateRating/legalName не найдены.

## Что осталось TODO

- Production-домен и абсолютные URL в sitemap/robots.
- Финальная юридическая проверка `privacy.html`.
- Юридический оператор персональных данных.
- Backend/serverless lead capture для production-форм.
- Карта или профиль организации.
- Telegram username/link, если канал нужен.
- Реальные фото работ.
- Минимальная сумма заказа.

## Можно ли запускать без CRM

Да. Сайт можно запускать без CRM как статический сайт, если реальные заявки принимаются через телефон и WhatsApp.

Форма на `contacts.html` честно обозначена как demo/mock и не отправляет данные наружу.

## Следующий этап

Deploy Smoke Test v1 после публикации:

- проверить страницы на реальном домене;
- обновить sitemap/robots под домен;
- проверить мобильные CTA;
- проверить WhatsApp с телефона;
- проверить индексационные файлы;
- провести финальную юридическую проверку privacy.
