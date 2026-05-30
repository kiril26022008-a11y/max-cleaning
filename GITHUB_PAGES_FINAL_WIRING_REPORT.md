# GitHub Pages Final Wiring Report v1

Дата: 2026-05-30  
Страница: https://kiril26022008-a11y.github.io/max-cleaning/  
Репозиторий: https://github.com/kiril26022008-a11y/max-cleaning

---

## Итог

| Задача | Статус |
|---|---|
| `.nojekyll` создан | ГОТОВО |
| `sitemap.xml` — абсолютные URL | ГОТОВО |
| `robots.txt` — абсолютная Sitemap-директива | ГОТОВО |
| `og:image` — абсолютные URL на всех 14 страницах | ГОТОВО |
| Относительные пути внутри сайта | ЧИСТО (нет /... путей) |
| Нет runtime-артефактов (localhost, /Users, токены) | ЧИСТО |
| JS синтаксис всех 4 скриптов | ЧИСТО |
| HTTP 200 на все 27 файлов (локально) | ЧИСТО |
| `.gitignore` создан | ГОТОВО |
| `README.md` — раздел GitHub Pages | ГОТОВО |
| Дублирующая папка `max-cleaning/` удалена | ГОТОВО |
| Коммит создан | ГОТОВО |
| Push в origin/main | ОЖИДАЕТ (смена аккаунта) |

---

## Детали по задачам

### 1. `.nojekyll`

Создан в корне проекта. Пустой файл, предотвращает Jekyll-обработку на GitHub Pages.

### 2. `sitemap.xml`

Обновлён с 15 абсолютными URL. Формат:

```
https://kiril26022008-a11y.github.io/max-cleaning/
https://kiril26022008-a11y.github.io/max-cleaning/index.html
...
https://kiril26022008-a11y.github.io/max-cleaning/service-office-cleaning.html
```

Все записи содержат `<changefreq>` и `<priority>`.

### 3. `robots.txt`

Директива `Sitemap:` обновлена:

```
Sitemap: https://kiril26022008-a11y.github.io/max-cleaning/sitemap.xml
```

### 4. `og:image` на всех страницах

Обновлены на всех 14 HTML-страницах. 13 страниц → `team-apartment-web.jpg`, 1 страница (`service-sofa-cleaning.html`) → `sofa-process-web.jpg`. Все URL абсолютные вида:

```
https://kiril26022008-a11y.github.io/max-cleaning/assets/img/...
```

### 5. Проверка путей

Нет ни одного `href="/..."` или `src="/..."` с абсолютным корневым путём. Все внутренние ссылки — относительные (например, `href="services.html"`).

### 6. Нет runtime-артефактов

Grep по `localhost`, `/Users/hatss`, `webhook`, `token`, `api_key`, `secret` в JS-файлах — всё чисто. `crm.mode: "mock"` и `leadCapture.mode: "mock"` сохранены без изменений.

### 7. JS синтаксис

```
node --check assets/js/site-config.js  OK
node --check assets/js/main.js         OK
node --check assets/js/calculator.js   OK
node --check assets/js/forms.js        OK
```

### 8. HTTP 200

Проверка через `python3 -m http.server`:

- 14 HTML-страниц: 200 OK
- 5 веб-изображений: 200 OK
- CSS: 200 OK
- 4 JS-скрипта: 200 OK
- `sitemap.xml`, `robots.txt`, `.nojekyll`: 200 OK

Итого: 27/27 — все 200 OK.

### 9. `.gitignore`

Создан с исключением `.DS_Store` и `Thumbs.db`.

### 10. `README.md`

Добавлен раздел **«Публикация через GitHub Pages»** с:

- URL репозитория и Pages-адресом
- Настройкой Settings → Pages → Deploy from a branch → main → /root
- Чеклистом проверки после публикации
- Инструкцией по замене URL при переходе на собственный домен

Обновлён раздел «Заглушки» — убраны устаревшие пункты про фото. Обновлён «Следующие этапы».

### 11. Удаление `max-cleaning/` subfolder

В репозитории находилась дублирующая папка `max-cleaning/` (артефакт двойной загрузки через GitHub UI). Папка удалена из индекса через `git rm -r --cached max-cleaning/` и включена в коммит. На GitHub Pages она создавала бы недопустимые URL вида `/max-cleaning/max-cleaning/index.html`.

### 12. Коммит

```
550c353 GitHub Pages Final Wiring: .nojekyll, absolute sitemap/robots/og:image URLs
```

### 13. Push — ожидает

Push заблокирован: git и `gh` на этой машине аутентифицированы как другой аккаунт (`ncatofthe`). Коммит готов локально. Для публикации см. раздел ниже.

---

## Как запушить

### Вариант 1 — через `gh auth login` (рекомендован)

```bash
gh auth login
# Выберите GitHub.com → HTTPS → Paste an authentication token
# Вставьте PAT аккаунта kiril26022008-a11y (Settings → Developer settings → PATs)

cd /Users/hatss/Documents/max-cleaning
git push origin main
```

### Вариант 2 — через URL с токеном

```bash
cd /Users/hatss/Documents/max-cleaning
git remote set-url origin https://kiril26022008-a11y:ВАШ_PAT@github.com/kiril26022008-a11y/max-cleaning.git
git push origin main
git remote set-url origin https://github.com/kiril26022008-a11y/max-cleaning.git  # убрать токен из URL
```

PAT нужен с правом `repo` (Contents: Read and Write). Создаётся в GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens.

---

## Чеклист после публикации

После успешного push и деплоя GitHub Pages (~1–2 минуты):

1. [ ] Открыть `https://kiril26022008-a11y.github.io/max-cleaning/` — главная открывается.
2. [ ] Открыть `/services.html`, `/calculator.html`, `/contacts.html`.
3. [ ] Открыть `/robots.txt` — содержит `Sitemap: https://kiril26022008-a11y.github.io/max-cleaning/sitemap.xml`.
4. [ ] Открыть `/sitemap.xml` — все `<loc>` начинаются с `https://kiril26022008-a11y.github.io/max-cleaning/`.
5. [ ] Открыть `/service-sofa-cleaning.html` — фото до/после загружаются.
6. [ ] Нажать кнопку «Позвонить» — должен набрать `+79011598267`.
7. [ ] Нажать кнопку «Написать в WhatsApp» — должен открыть `wa.me/79011598267`.

---

## Что остаётся после этого этапа

- Telegram username/link (`telegramHref` в `site-config.js`).
- Финализировать `privacy.html` с юридическим оператором.
- При появлении собственного домена заменить `sitemap.xml`, `robots.txt` и `og:image` на URL нового домена.
- CRM/backend для реальной обработки заявок.
