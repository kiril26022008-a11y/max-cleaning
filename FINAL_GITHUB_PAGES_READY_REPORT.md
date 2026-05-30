# Final GitHub Pages Ready Report

## 1. Краткий вердикт

Папка `/Users/hatss/Downloads/max-cleaning-main` подготовлена к безопасной загрузке в GitHub repository `https://github.com/kiril26022008-a11y/max-cleaning` для публикации через GitHub Pages `main` / root.

Сайт остаётся статическим: backend, CRM, webhook, закрытые ключи и реальные внешние интеграции не добавлялись. Бизнес-данные не менялись.

## 2. Фактическая рабочая папка

`/Users/hatss/Downloads/max-cleaning-main`

Эта папка считается актуальной версией сайта для дальнейшей загрузки на GitHub.

## 3. Есть ли .git

`.git` в папке отсутствует.

Это не блокирует подготовку файлов, но означает, что загрузку нужно делать отдельным шагом: либо инициализировать/подключить репозиторий в этой папке, либо перенести содержимое в GitHub working tree.

## 4. Готова ли папка к загрузке на GitHub

Да, папка готова к загрузке как root сайта GitHub Pages.

В корне присутствуют:

- `index.html`
- `services.html`
- `calculator.html`
- `prices.html`
- `about.html`
- `contacts.html`
- `thanks.html`
- `privacy.html`
- все `service-*.html`
- `robots.txt`
- `sitemap.xml`
- `favicon.svg`
- `site.webmanifest`
- `.nojekyll`
- `assets/`

## 5. Статус sitemap.xml

`sitemap.xml` содержит абсолютные URL под GitHub Pages:

`https://kiril26022008-a11y.github.io/max-cleaning/`

Проверенный список URL совпадает с требуемым набором страниц, включая все service pages.

## 6. Статус robots.txt

`robots.txt` не блокирует сайт:

```txt
User-agent: *
Allow: /
```

Sitemap указан корректно:

`Sitemap: https://kiril26022008-a11y.github.io/max-cleaning/sitemap.xml`

## 7. Статус og:image

На всех HTML-страницах `og:image` абсолютный и указывает на GitHub Pages URL.

Основной URL:

`https://kiril26022008-a11y.github.io/max-cleaning/assets/img/team-apartment-web.jpg`

Для `service-sofa-cleaning.html`:

`https://kiril26022008-a11y.github.io/max-cleaning/assets/img/sofa-process-web.jpg`

## 8. Статус путей

Пути совместимы с GitHub Pages `/max-cleaning/`:

- root-relative `href="/..."` не найдены.
- root-relative `src="/..."` не найдены.
- `href="/assets/..."` и `src="/assets/..."` не найдены.
- `/Users/hatss` в runtime-файлах не найден.
- `localhost` в runtime-файлах не найден.
- `file://` не найден.

README и отчёты могут содержать локальные инструкции, но runtime HTML/CSS/JS/XML/TXT чистый.

## 9. Статус изображений

В HTML/CSS/JS используются только web-версии:

- `team-apartment-web.jpg`
- `sofa-before-web.jpg`
- `sofa-after-web.jpg`
- `sofa-process-web.jpg`
- `logo-web.png`

В `assets/img/` также лежит `hero-cleaning.jpg`. Runtime его не использует. Без отдельного разрешения файл не удалялся. Для аккуратной публикации его можно не загружать или позже перенести в `assets/originals/`, если он является исходником/резервом.

## 10. Статус CTA/WhatsApp/calculator

Проверено:

- `tel:+79011598267` сохранён.
- `https://wa.me/79011598267` сохранён.
- WhatsApp-сообщения кодируются через `encodeURIComponent`.
- Калькулятор работает.
- Calculator WhatsApp message работает.
- Формы остаются в demo/mock режиме.
- `thanks.html` прямо сообщает, что CRM/backend не подключены и реальная заявка во внешнюю систему не отправляется.
- Fake Telegram-ссылок нет; placeholder Telegram убран из runtime.

## 11. Статус светлой палитры под логотип

Сайт находится в светлой clean premium системе под логотип:

- light blue;
- aqua;
- white;
- soft green;
- deep navy text.

Основная black/gold/dark-luxury тема не используется. Проверка по прежним gold/dark токенам в runtime CSS/HTML/JS чистая.

## 12. Результаты проверок

HTTP 200 через `python3 -m http.server 8080`:

- все HTML-страницы;
- `robots.txt`;
- `sitemap.xml`;
- `favicon.svg`;
- `site.webmanifest`;
- используемые CSS/JS;
- используемые web-изображения.

JS syntax:

- `node --check assets/js/site-config.js` — OK.
- `node --check assets/js/main.js` — OK.
- `node --check assets/js/calculator.js` — OK.
- `node --check assets/js/forms.js` — OK.

Static checks:

- `href=""` не найден.
- `javascript:void(0)` не найден.
- inline `onclick` не найден.
- webhook URL не найден.
- runtime `token/secret/api_key` не найден.
- fake Telegram не найден.
- fake `legalName` не найден.
- fake `ratingValue/aggregateRating` не найден.
- `/Users/hatss` в runtime не найден.
- `localhost` в runtime не найден.
- root-relative пути не найдены.
- `focus-visible` сохранён.
- `prefers-reduced-motion` сохранён.

Browser checks:

- horizontal scroll на 390px не найден на 14 HTML-страницах.
- калькулятор: услуга `sofa`, количество `2`, результат `от 3 000 ₽`.
- calculator WhatsApp href содержит encoded message.
- `leadCapture.mode` и `crm.mode` остаются `mock`.

## 13. Можно ли загружать эту папку на GitHub

Да. Текущую папку можно загружать в GitHub repository `kiril26022008-a11y/max-cleaning` в ветку `main`, root.

Push автоматически не выполнялся.

## 14. Что проверить после публикации

После публикации проверить:

- `https://kiril26022008-a11y.github.io/max-cleaning/`
- все основные страницы и service pages открываются без 404.
- CSS/JS/изображения загружаются из `/max-cleaning/assets/...`.
- `robots.txt` доступен.
- `sitemap.xml` доступен.
- `og:image` открывается по абсолютному URL.
- CTA звонка и WhatsApp работают на опубликованном сайте.
- Калькулятор пересчитывает стоимость и формирует WhatsApp-сообщение.
- На мобильном 390px нет горизонтального скролла.
