# Brand Color Rework Recovery v1

## 1. Краткий вердикт

Сайт переведён из ошибочной dark/gold luxury темы в светлую фирменную систему под логотип «Макс-Клининг»: Clean Premium / Fresh Editorial / Light Service Luxury. Основная визуальная база теперь светлая, чистая, голубо-синяя, с aqua и мягким зелёным акцентом для WhatsApp/success-состояний.

Сайт можно показывать заказчику как color rework candidate. Push из текущей папки делать нельзя, потому что `.git` отсутствует.

## 2. Фактическая папка проекта

`/Users/hatss/Downloads/max-cleaning-main`

## 3. Есть ли .git

Нет. Текущая папка не является Git working tree.

- `git status` недоступен.
- `.nojekyll` есть.
- Push из этой папки невозможен.
- Перед публикацией изменения нужно перенести в настоящий GitHub working tree.

## 4. Какие файлы изменены

Так как `.git` отсутствует, точный git diff недоступен. В рамках rework изменялись/созданы:

- `assets/css/styles.css`
- `QA_SCREENSHOTS_COLOR_REWORK/`
- `COLOR_REWORK_REPORT.md`

## 5. Новая палитра

Новая CSS color system:

- Background: `#f6fbff`
- Surface: `#ffffff`
- Surface soft: `#eaf6ff`
- Text: `#102033`
- Muted text: `#5f7185`
- Primary blue: `#0877d8`
- Strong blue: `#065fb2`
- Aqua: `#38bdf8`
- Green accent: `#49b83f`
- Border: `rgba(8, 119, 216, 0.14)`

Чёрно-золотая база удалена из `assets/css/styles.css`: старые ключевые цвета `#0f0e0c`, `#161510`, `#1c1a15`, `#0a0a08`, `#c9a464`, `#b59050`, `#d4b478` больше не используются.

## 6. Какие цвета взяты из логотипа

Новая система визуально опирается на цвета логотипа:

- синий как primary CTA и nav/focus/accent;
- голубой/aqua как свежая сервисная подложка;
- белый как основной surface;
- зелёный как мягкий WhatsApp/success accent.

## 7. Что изменено в hero

- Убран тяжёлый dark overlay.
- Hero получил светлую голубо-белую атмосферу с мягким clean gradient.
- Фото сохранено, но осветлено через более лёгкую композицию.
- Заголовок и proof points сохранены.
- CTA сохранены: `Позвонить`, `WhatsApp`, `Рассчитать стоимость`.
- Hero больше не ощущается как black luxury landing.

## 8. Что изменено в карточках/секциях

- Карточки услуг, отзывов, FAQ, related services, contact/form panels переведены в white/light-blue surfaces.
- Borders стали голубыми и мягкими.
- Shadows стали светлыми, без тяжёлого чёрного веса.
- Цены, таблицы, калькулятор и contact cards получили clean service look.
- Before/after и process images получили мягкие светлые рамки и shadows.

## 9. Что изменено в header/footer

Header:

- стал белым/полупрозрачным;
- получил лёгкий голубой border;
- scroll shadow стал мягким голубым;
- nav и CTA читаются на светлой теме.

Footer:

- тяжёлый тёмный footer заменён на light blue / white footer;
- колонки и ссылки остались структурными;
- контакты и privacy link читаемы.

## 10. Что изменено на mobile

- Sticky mobile CTA переведена в светлую тему.
- Primary phone CTA синий.
- WhatsApp CTA мягко зелёный.
- Проверен viewport 390px.
- Horizontal scroll отсутствует на всех 14 HTML-страницах.
- Карточки и калькулятор читаемы в одной колонке.

## 11. Список скриншотов

Создана папка `QA_SCREENSHOTS_COLOR_REWORK/`.

Desktop:

- `desktop-index.png`
- `desktop-services.png`
- `desktop-sofa.png`
- `desktop-calculator.png`
- `desktop-prices.png`
- `desktop-contacts.png`

Mobile:

- `mobile-index.png`
- `mobile-services.png`
- `mobile-sofa.png`
- `mobile-calculator.png`
- `mobile-contacts.png`

## 12. Результаты проверок

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
- `/Users/hatss` в runtime-файлах: не найден.
- `localhost` в runtime-файлах: не найден.
- root-relative `href="/..."`: не найден.
- `src="/assets/..."`: не найден.
- old black/gold CSS base: не найдена.
- `:focus-visible`: сохранён.
- `prefers-reduced-motion`: сохранён.
- horizontal scroll на 390px: нет на всех 14 HTML-страницах.

Conversion/functionality:

- `tel:+79011598267`: сохранён.
- `wa.me/79011598267`: сохранён.
- Calculator WhatsApp message encoded.
- Проверка калькулятора: `sofa x 2` -> `от 3 000 ₽`.
- `leadCapture.mode`: `mock`.
- `crm.mode`: `mock`.
- `thanks.html` не обещает реальную CRM-отправку.

GitHub Pages:

- `.nojekyll`: есть.
- `robots.txt`, `sitemap.xml`, `og:image` указывают на `https://kiril26022008-a11y.github.io/max-cleaning/`.
- Файлы совместимы с GitHub Pages, но текущая папка не является Git working tree.

## 13. Можно ли показывать заказчику

Да. Сайт можно показывать заказчику как Brand Color Rework candidate.

## 14. Можно ли делать push

Нет, не из `/Users/hatss/Downloads/max-cleaning-main`, потому что здесь нет `.git`. Нужно перенести изменения в реальный GitHub working tree или подключить корректный репозиторий по команде владельца.

## 15. Остались риски

- Repo-sync остаётся главным риском: текущая папка без Git.
- Юридические данные остаются draft/TODO, реальные данные не предоставлены.
- Происхождение фото не проверялось в этом pass.
- Автоматический Lighthouse/axe аудит не запускался; выполнены визуальная, статическая, JS, HTTP и responsive проверки.
