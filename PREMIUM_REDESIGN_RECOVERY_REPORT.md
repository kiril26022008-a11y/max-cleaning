# Premium Redesign Recovery & Consistency Pass v1

## 1. Краткий вердикт

Premium Art Direction Redesign v2 был оборван не на полностью сломанном HTML, а на этапе массовой синхронизации статических шаблонов. Основная часть новой dark editorial / quiet luxury дизайн-системы уже была в проекте, но часть страниц оставалась в незавершённом состоянии по консистентности: service-страницы, `privacy.html` и `thanks.html` имели однострочные массовые вставки header/main/footer и не имели общей мобильной CTA-панели.

После recovery-pass проект приведён к целостному состоянию и готов к приёмке Premium Redesign v2.

## 2. Изменённые файлы

- `assets/css/styles.css`
- `assets/js/main.js`
- `assets/js/forms.js`
- `assets/js/site-config.js`
- `about.html`
- `calculator.html`
- `contacts.html`
- `index.html`
- `prices.html`
- `privacy.html`
- `services.html`
- `thanks.html`
- `service-apartment-cleaning.html`
- `service-carpet-cleaning.html`
- `service-chair-cleaning.html`
- `service-mattress-cleaning.html`
- `service-office-cleaning.html`
- `service-sofa-cleaning.html`
- `PREMIUM_REDESIGN_RECOVERY_REPORT.md`

## 3. Где был оборван прошлый редизайн

Обрыв был на consistency-pass после внедрения новой визуальной системы. Главная, каталог, цены, контакты, калькулятор и about уже были ближе к новой системе. Service-страницы, `privacy.html` и `thanks.html` были частично переведены: использовали новые классы и контентные секции, но header/page-hero/footer были вставлены однострочно, без общей mobile CTA и без полного поведения активного пункта меню.

## 4. Найденные дубли и дефекты

- Git-репозиторий в текущей папке отсутствует, `git status` недоступен.
- HTML-конфликтов `<<<<<<<`, `=======`, `>>>>>>>` не найдено.
- У всех HTML-страниц был один `html/head/body/header/main/footer/h1`; стек тегов сходился.
- Дубли старого и нового header/footer не обнаружены.
- Найден рассинхрон mobile CTA: она отсутствовала на `privacy.html`, `thanks.html` и всех `service-*.html`.
- Runtime-файлы содержали Telegram TODO-заглушку, хотя реальная ссылка Telegram не предоставлена.
- Активный пункт меню на `service-*.html` не подсвечивал раздел `Услуги`.
- В CSS был лишний `@import` Google Fonts при уже подключённых font links в HTML.
- В CSS оставались отрицательные `letter-spacing` в display-типографике.

## 5. Что исправлено

- Все HTML-файлы приведены к `<!DOCTYPE html>`.
- Mobile CTA добавлена на все HTML-страницы.
- Runtime Telegram-заглушки удалены из `site-config.js`, `main.js`, `forms.js`.
- `main.js` теперь подсвечивает `services.html` как активный пункт для всех `service-*.html`.
- CSS оставлен как единая Premium Art Direction система, без добавления второй темы.
- Удалён дублирующий CSS `@import` шрифтов.
- Отрицательные `letter-spacing` заменены на `0`.
- Исправлен mobile hero-контейнер: `.hero-grid` больше не перебивает ширину `.container`, поэтому hero-текст не прилипает к краю экрана.
- Phone и WhatsApp CTA сохранены.
- Формы оставлены в demo/mock-режиме.

## 6. HTML-целостность

Проверено для:

- `index.html`
- `services.html`
- `prices.html`
- `calculator.html`
- `contacts.html`
- `about.html`
- `thanks.html`
- `privacy.html`
- все `service-*.html`

Статус: OK.

На каждой странице:

- ровно один `<!DOCTYPE html>`;
- ровно один `<html>`;
- ровно один `<head>`;
- ровно один `<body>`;
- ровно один `<header>`;
- ровно один `<main>`;
- ровно один `<footer>`;
- ровно один `<h1>`;
- стек секций/div/form/details сходится по базовой проверке;
- пустых `href=""` нет;
- `javascript:void(0)` нет;
- inline `onclick` нет.

## 7. CSS

Статус: OK.

`assets/css/styles.css` представляет единую дизайн-систему Premium Art Direction v2:

- dark editorial / quiet luxury палитра;
- Playfair Display для display-типографики;
- Manrope для UI/body;
- крупные заголовки, whitespace, restrained palette;
- mobile-first layout;
- `:focus-visible` сохранён;
- `prefers-reduced-motion` сохранён;
- конфликтующего старого CSS-блока поверх/снизу не найдено.

## 8. JS

Статус: OK.

Проверки:

- `node --check assets/js/site-config.js` — OK
- `node --check assets/js/main.js` — OK
- `node --check assets/js/calculator.js` — OK
- `node --check assets/js/forms.js` — OK

Runtime:

- mobile menu открывается и закрывается через state `is-open`;
- active nav работает, включая `service-*.html` -> `services.html`;
- FAQ открывает один `details`;
- header scroll state и reveal-логика не падают;
- `prefers-reduced-motion` учтён;
- страницы без FAQ/reveal/calculator/form не ломают JS.

## 9. Mobile

Статус: OK.

Проверка на viewport `390x844`:

- burger visible;
- nav скрыт до открытия;
- после клика nav и header actions видимы;
- `aria-expanded="true"` выставляется;
- `.mobile-cta-bar` видима;
- body имеет нижний padding под fixed CTA.
- hero-контейнер на 390px viewport имеет боковые отступы 16px и не растягивается на полный край экрана.

## 10. GitHub Pages compatibility

Статус: OK.

- `.nojekyll` сохранён.
- Внутренние ссылки относительные.
- `href="/..."` не найден.
- `src="/assets/..."` не найден.
- `href="/assets/..."` не найден.
- `robots.txt` указывает на sitemap для `https://kiril26022008-a11y.github.io/max-cleaning/`.
- `sitemap.xml` содержит production URL под GitHub Pages.
- `site.webmanifest` использует относительные `start_url`, `scope` и `favicon.svg`.
- `og:image` использует production absolute URL GitHub Pages.

## 11. HTTP 200

Локальный сервер:

```bash
python3 -m http.server 8080
```

Все 28 проверенных URL вернули HTTP 200:

- 14 HTML-страниц;
- `robots.txt`;
- `sitemap.xml`;
- `favicon.svg`;
- `site.webmanifest`;
- `assets/css/styles.css`;
- все используемые web-изображения;
- `assets/js/site-config.js`;
- `assets/js/main.js`;
- `assets/js/calculator.js`;
- `assets/js/forms.js`.

## 12. Static checks

Статус: OK для runtime-файлов (`*.html`, `assets/js`, `assets/css`, `robots.txt`, `sitemap.xml`, `site.webmanifest`).

Не найдено:

- `href=""`;
- `javascript:void(0)`;
- inline `onclick`;
- webhook URL;
- runtime `token`, `secret`, `api_key`;
- fake Telegram / `t.me`;
- fake `legalName`;
- fake `ratingValue` / `aggregateRating`;
- `/Users/hatss`;
- `localhost`;
- root-relative `href="/..."`;
- `src="/assets/..."`;
- `href="/assets/..."`;
- фразы `реальные фото работ`;
- фразы `наша команда`.

## 13. Business/conversion

Статус: OK.

- `tel:+79011598267` сохранён.
- `https://wa.me/79011598267` сохранён.
- WhatsApp-сообщения формируются encoded.
- Калькулятор работает: пример проверки `sofa x 2` -> `от 3 000 ₽`.
- Формы остаются demo/mock.
- `thanks.html` не обещает реальную CRM-отправку.
- Цены и отзывы не удалялись.
- Local SEO по Сочи и зонам выезда сохранён.

## 14. Остались ли риски

- В текущей папке нет `.git`, поэтому невозможно дать настоящий git-based список изменённых файлов и diff.
- `privacy.html` остаётся черновиком с TODO по юридическим данным. Это намеренно: реальные юр. данные не предоставлены и не выдумывались.
- Минимальная сумма заказа остаётся TODO/уточняется там, где так было заложено ранее.
- Фотографии сохранены как существующие assets; дополнительная верификация происхождения фото вне текущего recovery-pass не выполнялась.

## 15. Следующий рекомендуемый этап

Premium Redesign v2 можно отдавать на визуальную приёмку. Следующий этап: ручная проверка текстов, юридической политики и подтверждение production-данных владельцем бизнеса перед публикацией.
