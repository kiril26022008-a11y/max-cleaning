# Premium Redesign Visual Acceptance & Repo Sync v1

## 1. Краткий вердикт

Premium Redesign v2 можно показывать заказчику для визуальной приёмки. Сайт выглядит как цельная dark editorial / quiet luxury система, а не как generic cleaning template. Найденный mobile overflow на `calculator.html` исправлен точечно.

Push делать нельзя из этой папки как из repo working tree: в `/Users/hatss/Downloads/max-cleaning-main` нет `.git`. Перед публикацией изменения нужно перенести или синхронизировать с настоящим GitHub Pages репозиторием.

## 2. Фактическая рабочая папка

`/Users/hatss/Downloads/max-cleaning-main`

## 3. Git / repo sync

- `.git` в текущей папке: нет.
- `git status`: недоступен, потому что папка не является Git-репозиторием.
- `.nojekyll`: есть.
- Поиск `.git` по `/Users/hatss` не нашёл отдельный repo `max-cleaning`.
- Делать push именно из этой папки нельзя, пока она не будет реальным repo working tree.

## 4. Изменённые файлы в этом pass

Так как Git отсутствует, точный `git diff` недоступен. В рамках текущего pass изменялись:

- `assets/css/styles.css`
- `prices.html`
- `PREMIUM_VISUAL_ACCEPTANCE_REPORT.md`
- `QA_SCREENSHOTS/`

## 5. Список созданных скриншотов

Desktop 1440px:

- `QA_SCREENSHOTS/desktop-index.png`
- `QA_SCREENSHOTS/desktop-services.png`
- `QA_SCREENSHOTS/desktop-sofa.png`
- `QA_SCREENSHOTS/desktop-calculator.png`
- `QA_SCREENSHOTS/desktop-prices.png`
- `QA_SCREENSHOTS/desktop-contacts.png`

Mobile 390px:

- `QA_SCREENSHOTS/mobile-index.png`
- `QA_SCREENSHOTS/mobile-services.png`
- `QA_SCREENSHOTS/mobile-sofa.png`
- `QA_SCREENSHOTS/mobile-calculator.png`
- `QA_SCREENSHOTS/mobile-contacts.png`

## 6. Оценка по 8 требованиям заказчика

### 01 Point of view, not a template

Статус: pass.

Есть чёткая арт-дирекция: тёмная editorial-подача, quiet luxury палитра, крупная serif-типографика, спокойные CTA и restrained сетка. Сайт не выглядит как типовой bright-blue/green cleaning шаблон.

### 02 Typography that does work

Статус: pass.

Используется пара `Playfair Display` + `Manrope`, не Inter/Roboto. Заголовки крупные, но после правки mobile h1 не создаёт horizontal overflow и не ломает длинные русские слова на калькуляторе.

### 03 Restrained color system

Статус: pass.

Палитра сдержанная: тёмный фон, тёплый off-white текст, muted text, gold accent, тонкие borders. Нет rainbow-палитры и дешёвого cleaning-градиента.

### 04 Hierarchy that breathes

Статус: pass.

Есть разделение hero, cards, muted sections, CTA panels, tables и footer. Whitespace достаточный на desktop и mobile, длинных стен текста на ключевых страницах нет.

### 05 Imagery with intent

Статус: pass with known content risk.

Фото встроены в арт-дирекцию: hero затемнён overlay, sofa page использует process/before-after фото по смыслу. Подписи осторожные и не обещают неподтверждённые “реальные фото работ”. Риск: происхождение фото не подтверждалось в рамках этого pass.

### 06 Motion that whispers

Статус: pass.

Reveal-анимации мягкие, hover states restrained, нет тяжёлого AOS-style шоу. `prefers-reduced-motion` есть и делает reveal сразу видимым.

### 07 Mobile designed, not shrunk

Статус: pass after fix.

Mobile CTA сразу доступна, burger работает, cards переходят в одну колонку. Горизонтальный overflow на 390px исправлен для всех 14 HTML-страниц.

### 08 Invisible expensive stuff

Статус: pass.

Семантическая структура сохранена, meta/OG есть, sitemap/robots настроены под GitHub Pages. `:focus-visible` сохранён. Контраст визуально соответствует тёмной high-contrast системе; автоматический WCAG-аудит отдельным инструментом не запускался.

## 7. Что исправлено

- Устранён horizontal overflow на `calculator.html` при 390px.
- Mobile h1 уменьшен до 36px, desktop h1 остаётся крупным через desktop media query.
- Для heading добавлены `overflow-wrap: break-word` и `hyphens: auto` как защита от длинных русских слов.
- Исправлена опечатка в encoded WhatsApp href в footer `prices.html`; runtime `data-whatsapp-message` уже был корректным.

## 8. Desktop status

Статус: pass.

Проверены скриншоты:

- `index.html`
- `services.html`
- `service-sofa-cleaning.html`
- `calculator.html`
- `prices.html`
- `contacts.html`

Desktop выглядит цельно: header/footer синхронны, hero и inner page headers соответствуют системе, cards/tables/forms читаются, CTA заметны.

## 9. Mobile status

Статус: pass.

Проверены скриншоты:

- `index.html`
- `services.html`
- `service-sofa-cleaning.html`
- `calculator.html`
- `contacts.html`

Проверка `scrollWidth` на 390px для всех 14 HTML-страниц: OK, горизонтального скролла нет.

## 10. CTA / WhatsApp / calculator

Статус: pass.

- `tel:+79011598267` сохранён.
- `https://wa.me/79011598267` сохранён.
- Mobile CTA содержит `Позвонить` и `WhatsApp`.
- Калькулятор работает: `sofa x 2` -> `от 3 000 ₽`.
- Calculator WhatsApp href содержит encoded `text=`.
- `leadCapture.mode`: `mock`.
- `crm.mode`: `mock`.
- `thanks.html` честно сообщает, что CRM/backend не подключены и реальная заявка принимается через звонок/WhatsApp.

## 11. GitHub Pages compatibility

Статус: pass for files, blocked for push from this folder.

- Root-relative `href="/..."`: не найден.
- `src="/assets/..."`: не найден.
- `/Users/hatss` в runtime-файлах: не найден.
- `localhost` в runtime-файлах: не найден.
- `.nojekyll`: есть.
- `robots.txt`, `sitemap.xml`, `og:image` используют `https://kiril26022008-a11y.github.io/max-cleaning/`.
- Push из текущей папки невозможен без Git working tree.

## 12. Проверки

HTTP 200:

- Проверено 28 путей.
- Failures: 0.

JS:

- `node --check assets/js/site-config.js`: OK
- `node --check assets/js/main.js`: OK
- `node --check assets/js/calculator.js`: OK
- `node --check assets/js/forms.js`: OK

Static checks:

- `href=""`: не найден.
- `javascript:void(0)`: не найден.
- inline `onclick`: не найден.
- webhook URL: не найден.
- runtime `token/secret/api_key`: не найден.
- fake Telegram / `t.me`: не найден.
- fake `legalName`: не найден.
- fake rating / `aggregateRating`: не найден.
- `реальные фото работ`: не найдено.
- `наша команда`: не найдено.
- `focus-visible`: есть.
- `prefers-reduced-motion`: есть.

## 13. Можно ли показывать заказчику

Да. Сайт можно показывать заказчику как Premium Redesign v2 visual acceptance candidate.

## 14. Можно ли делать push

Нет, не из текущей папки. Сначала нужно синхронизировать изменения с настоящим GitHub repo working tree или инициализировать/подключить корректный репозиторий по команде владельца.

## 15. Остались риски

- Текущая папка не является Git-репозиторием.
- Юридические данные в `privacy.html` остаются draft/TODO, реальные данные не предоставлены.
- Происхождение и подтверждение фото не проверялись в этом pass.
- Автоматический WCAG-аудит через Lighthouse/axe не запускался; выполнена визуальная и статическая проверка контраста/focus/semantic structure.
