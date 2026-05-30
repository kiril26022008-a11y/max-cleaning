# Макс-Клининг

Статический многостраничный сайт клининговой компании «Макс-Клининг» на чистом HTML/CSS/JS. Проект не использует npm, сборщики, фреймворки, Bootstrap, Tailwind или внешние CDN.

## Структура проекта

- `index.html` — главная страница.
- `services.html` — каталог услуг.
- `service-carpet-cleaning.html` — посадочная страница химчистки ковров.
- `service-sofa-cleaning.html` — посадочная страница химчистки диванов.
- `service-mattress-cleaning.html` — посадочная страница химчистки матрасов.
- `service-chair-cleaning.html` — посадочная страница химчистки кресел и стульев.
- `service-apartment-cleaning.html` — посадочная страница уборки квартир и домов.
- `service-office-cleaning.html` — посадочная страница уборки офисов.
- `calculator.html` — калькулятор предварительной стоимости.
- `prices.html` — таблица ориентировочных цен.
- `about.html` — о компании.
- `contacts.html` — контакты, карта-заглушка и mock-форма заявки.
- `privacy.html` — шаблон политики обработки персональных данных.
- `thanks.html` — страница благодарности после mock-отправки.
- `robots.txt` — базовые правила индексации, Sitemap-директива указывает на GitHub Pages URL.
- `sitemap.xml` — карта сайта с абсолютными URL на GitHub Pages.
- `assets/css/styles.css` — дизайн-система, адаптивные стили, focus-состояния.
- `assets/js/site-config.js` — единый публичный конфиг сайта.
- `assets/js/main.js` — мобильное меню, активный пункт навигации, FAQ, placeholder-контакты.
- `assets/js/calculator.js` — логика калькулятора.
- `assets/js/forms.js` — валидация и mock-отправка формы.
- `assets/img/hero-cleaning.jpg` — локальный hero-ассет.
- `CONTENT_TODO.md` — список данных, которые нужно получить от владельца.
- `CONTENT_SEO_REPORT.md` — отчёт Content/SEO Foundation v1.
- `DATA_MODEL.md` — описание общей модели данных.
- `DATA_LAYER_REPORT.md` — отчёт Shared Config & Data Layer v1.
- `LEAD_CAPTURE_SPEC.md` — спецификация mock-заявок и будущего CRM payload.
- `LEGAL_LEAD_CAPTURE_REPORT.md` — отчёт Legal & Lead Capture Foundation v1.
- `QA_REPORT.md` — отчёт QA/HARDENING v1.

## Важный риск имени папки

Ранее проект находился в папке с пробелом в конце имени:

```text
клининг 
```

Это может ломать команды, автодополнение, shell-скрипты, деплой и работу редакторов. Безопаснее переименовать папку вручную после согласования, например:

```text
max-cleaning
```

или:

```text
klining
```

Текущая рабочая папка: `max-cleaning`. Если проект снова будет перемещён в путь с пробелами, используйте кавычки во всех командах.

## Как запустить локально

```bash
cd "path/to/max-cleaning"
python3 -m http.server 8080
```

После запуска откройте:

```text
http://localhost:8080/index.html
```

## Как проверить страницы

Откройте вручную:

- `http://localhost:8080/index.html`
- `http://localhost:8080/services.html`
- `http://localhost:8080/calculator.html`
- `http://localhost:8080/prices.html`
- `http://localhost:8080/about.html`
- `http://localhost:8080/contacts.html`
- `http://localhost:8080/thanks.html`
- `http://localhost:8080/privacy.html`
- `http://localhost:8080/service-carpet-cleaning.html`
- `http://localhost:8080/service-sofa-cleaning.html`
- `http://localhost:8080/service-mattress-cleaning.html`
- `http://localhost:8080/service-chair-cleaning.html`
- `http://localhost:8080/service-apartment-cleaning.html`
- `http://localhost:8080/service-office-cleaning.html`

Проверьте:

- мобильное меню открывается и закрывается;
- активный пункт меню подсвечивается через `aria-current`;
- CTA ведут на калькулятор, контакты или placeholder-ссылки;
- FAQ на главной открывается с клавиатуры;
- калькулятор обновляет стоимость без отправки формы;
- форма контактов показывает ошибки и после валидного ввода ведёт на `thanks.html`.

## Технические проверки

```bash
cd "path/to/max-cleaning"
node --check "assets/js/main.js"
node --check "assets/js/site-config.js"
node --check "assets/js/calculator.js"
node --check "assets/js/forms.js"
```

Статические проверки:

```bash
cd "path/to/max-cleaning"
rg -n 'href=""|javascript:void\\(0\\)|onclick=|webhook|token|secret|api_key' -S .
```

Слова про webhook, token и secret допустимы в документации, но не должны появляться как реальные значения в frontend-коде.

## Где менять контакты

Контакты находятся в объекте `contacts`:

```text
assets/js/site-config.js
```

Менять нужно:

- `phoneLabel`
- `phoneHref`
- `whatsappLabel`
- `whatsappHref`
- `telegramLabel`
- `telegramHref`
- `placeholder`

Телефон и WhatsApp уже заполнены реальными публичными данными. Для WhatsApp используется готовый текст сообщения: общий текст хранится в `whatsappDefaultText`, а service-страницы задают контекст через `data-whatsapp-message`. Telegram остаётся TODO, потому что публичная ссылка или username не предоставлены.

## Заполненные production-данные

- Город: Сочи.
- Зоны выезда: Сочи, село Весёлое, Сириус, посёлок городского типа Красная Поляна, село Эстосадок.
- Адрес/район работы: Сочи, микрорайон Центральный, улица Островского, 55.
- График: с 9:00 до 21:00 каждый день.
- Телефон: +7 901 159-82-67.
- WhatsApp: +7 901 159-82-67.
- Основные цены на химчистку и уборку.
- Реальные отзывы из предоставленного списка.

Telegram пока TODO: менять `telegramLabel` и `telegramHref` в `assets/js/site-config.js`, когда появится публичная ссылка.

## Режим первого запуска

Сайт готовится к первому запуску как статическая визитка, Local SEO landing, каталог услуг и калькулятор предварительной стоимости.

Основные каналы реальных заявок на этом этапе:

- звонок на `+7 901 159-82-67`;
- WhatsApp `https://wa.me/79011598267`.

CRM/backend не подключены. Формы работают в mock/demo-режиме и не должны восприниматься как production-отправка заявки. Перед полноценным production нужно реализовать backend/serverless lead capture и финализировать `privacy.html`.

## Единый конфиг сайта

Общий публичный конфиг находится в:

```text
assets/js/site-config.js
```

В нём можно безопасно менять публичные контакты, город и зоны выезда, список услуг для JS-логики, подписи цен, параметры калькулятора и режим формы `crm.mode`, пока он остаётся `mock`.

Нельзя хранить во frontend CRM webhook URL, токены, API keys, секреты и приватные данные клиентов.

Проверка контактов после изменения:

1. Обновите `assets/js/site-config.js`.
2. Запустите локальный сервер.
3. Откройте главную, контакты и одну service-страницу.
4. Убедитесь, что телефон и WhatsApp отображаются одинаково.
5. Проверьте, что WhatsApp-ссылки ведут на `wa.me/79011598267` и содержат параметр `text`.
6. Убедитесь, что Telegram остаётся TODO/placeholder до появления реальной ссылки.

Проверка калькулятора после изменения цен:

1. Измените `calculator.services` и `calculator.options` в `assets/js/site-config.js`.
2. Откройте `calculator.html`.
3. Проверьте каждую услугу в select.
4. Введите пустые, нулевые, максимальные и обычные значения.
5. Убедитесь, что итог остаётся предварительным и не становится отрицательным.

## Где менять цены

Ориентировочные цены на странице:

```text
prices.html
```

Логика расчёта:

```text
assets/js/site-config.js
```

Основные структуры:

- `calculator.services` — базовые ставки, минимальные цены и единицы расчёта;
- `calculator.options` — дополнительные опции.

Видимые таблицы цен и данные калькулятора нужно обновлять синхронно. Минимальная сумма заказа пока TODO и не указана как реальный факт.

## Где менять зоны выезда

```text
assets/js/site-config.js
```

Раздел `business.serviceArea`. Также проверьте тексты на главной, услугах и контактах.

## Где обновлять отзывы

Отзывы сейчас добавлены на главной странице в `index.html`. Используйте только реальные отзывы с подтверждённым текстом, датой и именем. Не добавляйте звёзды или рейтинг без исходных данных.

## Где менять услуги

Карточки услуг находятся в:

```text
index.html
services.html
```

SEO-контент услуг находится в отдельных страницах:

```text
service-carpet-cleaning.html
service-sofa-cleaning.html
service-mattress-cleaning.html
service-chair-cleaning.html
service-apartment-cleaning.html
service-office-cleaning.html
```

Меняйте там `title`, `meta description`, H1, FAQ, описания услуги и JSON-LD, если меняется смысл страницы.

## Где менять SEO-контент

- Главная: `index.html`.
- Каталог услуг: `services.html`.
- Посадочные страницы услуг: `service-*.html`.
- Цены: `prices.html`.
- Карта сайта: `sitemap.xml`.

После появления реального домена можно обновить sitemap и добавить абсолютные canonical/OG URL.

## CRM и заявки

Форма сейчас работает только в mock-режиме:

1. Проверяет имя, телефон, услугу и согласие.
2. Блокирует кнопку на время mock-отправки.
3. Переводит пользователя на `thanks.html`.
4. Никуда не отправляет реальные данные.

CRM пока не подключена. Реальную CRM нельзя подключать напрямую из frontend. Безопасная схема:

1. Frontend отправляет заявку на backend или serverless proxy.
2. Backend валидирует данные и применяет антиспам/rate limit.
3. Секреты CRM хранятся только в переменных окружения backend.
4. Backend отправляет данные в CRM.

Реальные заявки до появления backend принимаются только через телефон и WhatsApp.

## Формы и заявки

Основная форма заявки находится на странице:

```text
contacts.html
```

Форма собирает имя, телефон, услугу, комментарий, предпочтительный способ связи и согласие на обработку персональных данных только для demo-проверки. Калькулятор не отправляет заявку и остаётся отдельным инструментом предварительного расчёта.

## Mock-режим

Сейчас формы работают в mock-режиме:

- данные проверяются на клиенте;
- внешняя отправка не выполняется;
- персональные данные не пишутся в console;
- в sessionStorage сохраняется только технический факт успешной mock-отправки;
- после успешной проверки пользователь переходит на `thanks.html`.

Режим задаётся в `assets/js/site-config.js`:

```text
crm.mode
leadCapture.mode
```

## Согласие на обработку данных

Текст согласия и ссылка на политику задаются в:

```text
assets/js/site-config.js
```

Раздел:

```text
legal
```

Страница политики:

```text
privacy.html
```

Это шаблон, не финальный юридический документ.

## UTM capture

`forms.js` сохраняет UTM-метки в sessionStorage, если они есть в URL:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Если sessionStorage недоступен, сайт продолжает работать без ошибки.

## Почему CRM webhook нельзя хранить во frontend

Статический JS доступен пользователю в браузере. Любой закрытый endpoint или ключ можно извлечь из frontend-кода. Поэтому CRM webhook, токены, API keys и секреты должны храниться только на backend/serverless стороне.

## Как проверить формы вручную

1. Откройте `contacts.html`.
2. Попробуйте отправить пустую форму.
3. Проверьте ошибки рядом с полями.
4. Заполните имя, телефон, услугу и способ связи, но не ставьте согласие.
5. Убедитесь, что отправка не проходит.
6. Поставьте согласие и отправьте форму.
7. Убедитесь, что открылась `thanks.html`.
8. Проверьте, что в console нет персональных данных.

## Заглушки

- Telegram username/link (в `site-config.js` → `telegramHref`).
- Карта зоны выезда.
- Юридические тексты и политика обработки данных.
- Финальная CRM-интеграция.
- Минимальный заказ и условия выезда.
- Финальный юридический оператор персональных данных.
- Privacy всё ещё требует юридической проверки.

## Публикация через GitHub Pages

Репозиторий: [kiril26022008-a11y/max-cleaning](https://github.com/kiril26022008-a11y/max-cleaning)

Сайт опубликован по адресу: **https://kiril26022008-a11y.github.io/max-cleaning/**

Настройка в репозитории: Settings → Pages → Deploy from a branch → `main` → `/root`.

Файл `.nojekyll` в корне проекта обязателен — без него GitHub Pages пропускает Jekyll-обработку через свои правила и может не отдать файлы из папок с символом `_` (например, `_data/`).

### Чеклист после публикации

1. Откройте `https://kiril26022008-a11y.github.io/max-cleaning/` — должна открыться главная.
2. Откройте несколько страниц: услуги, калькулятор, контакты.
3. Проверьте `https://kiril26022008-a11y.github.io/max-cleaning/robots.txt` — должен содержать `Sitemap:` с абсолютным URL.
4. Проверьте `https://kiril26022008-a11y.github.io/max-cleaning/sitemap.xml` — должны быть абсолютные URL.
5. Откройте одну из service-страниц и убедитесь, что изображения загрузились.
6. Проверьте WhatsApp-ссылки и телефон в header и footer.

### Если позже появится собственный домен

Нужно заменить во всех файлах `https://kiril26022008-a11y.github.io/max-cleaning/` на реальный домен:

- `sitemap.xml` — все `<loc>` URL.
- `robots.txt` — директива `Sitemap:`.
- Все HTML-страницы — `og:image` в `<head>`.

## Первый статический запуск

Сайт можно деплоить как обычный static site на Timeweb, Vercel, Netlify, GitHub Pages или классический хостинг: backend, сборка и npm-зависимости не требуются.

Перед публикацией с доменом:

1. Загрузите все файлы проекта на static hosting.
2. Если появляется реальный домен, замените локально-безопасные URL в `sitemap.xml` на абсолютные URL с доменом.
3. В `robots.txt` замените `Sitemap: sitemap.xml` на абсолютный URL sitemap, например `Sitemap: https://example.ru/sitemap.xml`.
4. Проверьте, что `og:image` указывает на доступный файл `assets/img/hero-cleaning.jpg`. Это preview-изображение сайта, а не подтверждённое фото работ.
5. Проверьте `favicon.svg` и `site.webmanifest` после загрузки.

Реальные заявки в первой версии принимаются только через:

- `tel:+79011598267`;
- `https://wa.me/79011598267`.

CRM/backend не подключены. Форма на `contacts.html` остаётся demo/mock и не отправляет данные во внешние системы. `privacy.html` остаётся черновиком до юридической проверки.

Проверка после деплоя:

1. Откройте главную, услуги, цены, калькулятор, контакты и 2–3 service-страницы.
2. Проверьте звонок с мобильного устройства.
3. Проверьте WhatsApp-ссылки и текст сообщения.
4. Откройте `sitemap.xml` и `robots.txt`.
5. Убедитесь, что footer содержит ссылку на `privacy.html`.
6. Убедитесь, что на сайте нет ссылок на `localhost` или локальные пути.

## Чеклист ручной проверки

- На каждой странице ровно один `h1`.
- Все пункты меню доступны с клавиатуры.
- Видимый focus есть у ссылок, кнопок, полей, `select`, `textarea`.
- Нет кликабельных `div`.
- Все страницы имеют уникальные `title` и `description`.
- Все страницы имеют `og:title`, `og:description`, `og:type`, `og:image`.
- `robots.txt` и `sitemap.xml` открываются локально.
- Калькулятор не показывает отрицательную стоимость.
- Пустые значения калькулятора не ломают расчёт.
- Форма не отправляется с пустым именем или телефоном.
- Повторная отправка формы блокируется.
- `thanks.html` честно сообщает о demo-режиме.
- CTA на ключевых страницах ведут на звонок, WhatsApp или калькулятор.

## Следующие этапы

- Финализировать юридические тексты и оператора персональных данных.
- Добавить Telegram username, когда появится публичная ссылка.
- Реализовать backend/serverless proxy для CRM.
- При появлении собственного домена — заменить GitHub Pages URL в sitemap.xml, robots.txt и og:image.
