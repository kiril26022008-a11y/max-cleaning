# Photo Integration QA Report — Макс-Клининг

**Дата:** 2026-05-30  
**Этап:** Photo Integration QA v1  
**Тестировщик:** Claude Code QA audit

---

## 1. Краткий вердикт

**Фото-интеграция готова к статическому запуску.**

Все truthfulness-дефекты устранены: страницы не утверждают, что фото являются подтверждёнными работами компании или что изображённые люди — сотрудники Макс-Клининг. Язык нейтральный и честный. Технические проверки: HTTP 200 — 27/27, JS syntax — OK, отсутствуют локальные пути, старые ссылки и inline-обработчики.

Единственное, что остаётся перед production: **оригиналы изображений не должны попасть на хостинг** (суммарно ~10 MB). Веб-версии (`-web.*`) — единственное, что нужно деплоить.

---

## 2. Список изменённых файлов

| Файл | Тип изменений |
|---|---|
| `index.html` | Добавлены `width`/`height` к hero img; исправлены h2 и p в секции галереи |
| `about.html` | Eyebrow «Команда» → «Выезд на объект»; нейтральный alt к фото |
| `service-sofa-cleaning.html` | Нейтральный alt к process-фото; добавлен дисклеймер к before/after |

---

## 3. Что проверено

### Truthfulness / честность
- [x] Нет фраз «реальные фото работ» без подтверждения
- [x] Нет фраз «наша команда» / «наши мастера» применительно к неподтверждённым людям на фото
- [x] Нет утверждения «гарантированно удалим все пятна»
- [x] Before/after подписаны нейтрально («До» / «После»)
- [x] Дисклеймер о результате присутствует в обоих местах галереи

### Технические проверки
- [x] JS syntax: `site-config.js`, `main.js`, `calculator.js`, `forms.js` — **ALL OK**
- [x] HTTP 200: все 27 страниц и ресурсов — **27/27**
- [x] Нет `href=""`, `javascript:void(0)`, inline `onclick`
- [x] Нет `localhost`, `127.0.0.1`, `/Users/hatss`, `file://`
- [x] Нет старых ссылок на `hero-cleaning.jpg` в HTML/CSS/JS
- [x] Нет fake rating / legalName / webhook / aggregateRating

### Изображения
- [x] Все `<img>` имеют атрибут `alt` (decorative hero — `alt=""`)
- [x] Все неключевые изображения имеют `loading="lazy"`
- [x] Все изображения имеют `width` и `height` (layout shift минимизирован)
- [x] Все файлы `*-web.*` физически существуют
- [x] Все пути относительные, без локальных абсолютных путей

### CSS
- [x] `.before-after` — grid с `gap: 16px`, responsive (2 колонки от 680px)
- [x] `.before-after img` — `aspect-ratio: 4/3`, `object-fit: cover` — нет деформации
- [x] `.process-photo img` — `max-height: 520px`, `object-fit: cover` — нет растяжения
- [x] `.brand-logo-block img` — белый фон `background: #fff`, padding 24px — логотип виден на тёмной теме
- [x] Нет горизонтального скролла (overflow нет в новых классах)

### SEO / Open Graph
- [x] `og:image` обновлён на всех 14 страницах
- [x] 13 страниц — `team-apartment-web.jpg`; service-sofa — `sofa-process-web.jpg`
- [x] Оба файла существуют и отдаются HTTP 200
- [x] Alt-тексты содержательные, без SEO-спама

---

## 4. Что исправлено

| # | Файл | Дефект | Исправление |
|---|---|---|---|
| 1 | `index.html` | `<img>` hero без `width`/`height` | Добавлено `width="1600" height="900"` |
| 2 | `index.html` | h2 «Результат химчистки дивана» — как реальная работа | → «Пример результата: химчистка дивана» |
| 3 | `index.html` | p «Диван до и после профессиональной чистки с выездом» | → «Визуальный пример до и после... Реальный результат зависит от ткани...» |
| 4 | `about.html` | Eyebrow «Команда» — имплицирует подтверждённых сотрудников | → «Выезд на объект» |
| 5 | `about.html` | alt «Команда Макс-Клининг убирает квартиру...» | → «Профессиональный клининг квартиры — специалисты с оборудованием» |
| 6 | `service-sofa-cleaning.html` | alt «Мастер Макс-Клининг чистит диван...» | → «Экстракторная химчистка дивана — профессиональное оборудование» |
| 7 | `service-sofa-cleaning.html` | p «Бежевый диван с загрязнениями после профессиональной чистки» | → «Визуальный пример до и после. Реальный результат зависит от ткани...» |

---

## 5. Какие изображения используются на сайте

| Файл | Размер | Разрешение | Где используется |
|---|---|---|---|
| `team-apartment-web.jpg` | 196 KB | 1600×900 | hero `index.html`; секция «Выезд на объект» `about.html`; og:image на 13 страницах |
| `sofa-before-web.jpg` | 184 KB | 960×720 | Галерея до/после: `index.html`, `service-sofa-cleaning.html` |
| `sofa-after-web.jpg` | 136 KB | 960×720 | Галерея до/после: `index.html`, `service-sofa-cleaning.html` |
| `sofa-process-web.jpg` | 156 KB | 1200×675 | Process-фото `service-sofa-cleaning.html`; og:image этой страницы |
| `logo-web.png` | 140 KB | 380×380 | Блок логотипа `about.html` |

**Итого веб-изображений:** 5 файлов, **812 KB** суммарно.

---

## 6. Риск misleading / fake real photos

| Риск | Оценка | Обоснование |
|---|---|---|
| Фото не подтверждённых сотрудников как «наша команда» | **Устранён** | Eyebrow и alt переписаны нейтрально |
| Before/after как гарантия результата | **Устранён** | Дисклеймер добавлен в обоих местах галереи |
| Утверждение «реальные работы компании» | **Устранён** | Формулировки «Пример результата», «Визуальный пример» |
| Fake ratingValue / aggregateRating | **Отсутствует** | Не добавлялось |
| Fake legalName / ИНН / ОГРН | **Отсутствует** | Не добавлялось |

---

## 7. Рекомендация по оригиналам

Оригинальные файлы в `assets/img/` **не должны деплоиться** на хостинг:

| Файл | Размер | Статус |
|---|---|---|
| `sofa-before.jpg` | 2.9 MB | не используется в HTML |
| `sofa-after.jpg` | 2.5 MB | не используется в HTML |
| `sofa-process.jpg` | 2.1 MB | не используется в HTML |
| `team-apartment.jpg` | 1.5 MB | не используется в HTML |
| `logo.png` | 880 KB | не используется в HTML |
| `hero-cleaning.jpg` | 348 KB | не используется в HTML |

**Рекомендация:** перед деплоем переместить оригиналы из `assets/img/` в папку `assets/originals/` или исключить через `.gitignore` / настройки хостинга. Удалять без разрешения не стали.

---

## 8. Результаты проверок

### HTTP 200 (python3 -m http.server 8081)

| Ресурс | Статус |
|---|---|
| `/`, `/index.html` | 200 ✓ |
| `/services.html`, `/calculator.html`, `/prices.html` | 200 ✓ |
| `/about.html`, `/contacts.html`, `/thanks.html` | 200 ✓ |
| `/privacy.html`, `/robots.txt`, `/sitemap.xml` | 200 ✓ |
| `/favicon.svg`, `/site.webmanifest` | 200 ✓ |
| Все 6 service-страниц | 200 ✓ |
| `/assets/img/team-apartment-web.jpg` | 200 ✓ |
| `/assets/img/sofa-before-web.jpg` | 200 ✓ |
| `/assets/img/sofa-after-web.jpg` | 200 ✓ |
| `/assets/img/sofa-process-web.jpg` | 200 ✓ |
| `/assets/img/logo-web.png` | 200 ✓ |
| `/assets/css/styles.css`, `/assets/js/main.js` | 200 ✓ |

**Итого: 27/27 — все HTTP 200**

### JS syntax

```
node --check assets/js/site-config.js  → OK
node --check assets/js/main.js         → OK
node --check assets/js/calculator.js   → OK
node --check assets/js/forms.js        → OK
```

### Static checks

| Проверка | Результат |
|---|---|
| Нет `localhost` / `127.0.0.1` | ✓ |
| Нет `/Users/hatss` / `file://` | ✓ |
| Нет `href=""` | ✓ |
| Нет `javascript:void(0)` | ✓ |
| Нет inline `onclick=` | ✓ |
| Нет `hero-cleaning.jpg` в runtime | ✓ |
| Нет «реальные фото работ» / «наша команда» | ✓ |
| Нет fake rating / legalName / webhook | ✓ |
| Все `<img>` имеют `alt` | ✓ |
| Все неключевые img имеют `loading="lazy"` | ✓ |
| Все img имеют `width` и `height` | ✓ |

---

## 9. Следующий рекомендуемый этап

### Немедленно (до деплоя)
1. **Переместить оригиналы** из `assets/img/` в `assets/originals/` или добавить в `.gitignore` — на хостинг должны попасть только `*-web.*` файлы (~812 KB против ~10 MB оригиналов)

### После получения домена
2. **Обновить `sitemap.xml`** — заменить относительные `<loc>` на `https://домен.ru/страница.html`
3. **Обновить `robots.txt`** — `Sitemap: https://домен.ru/sitemap.xml`
4. **Обновить `og:image`** во всех HTML — абсолютный URL `https://домен.ru/assets/img/team-apartment-web.jpg`
5. **Обновить `url` в JSON-LD** Schema.org — абсолютные URL

### Контент (по готовности)
6. Если фото подтверждены как реальные работы Макс-Клининг — можно заменить «Пример результата» на «Результат химчистки» без оговорок
7. Если человек на process-фото подтверждён как сотрудник — можно уточнить alt и подписи
8. Добавить Telegram, когда username будет известен
9. Заполнить `privacy.html` реальными юридическими данными оператора
