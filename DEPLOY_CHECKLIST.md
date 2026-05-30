# DEPLOY_CHECKLIST.md

# Static Deploy Checklist

## Перед деплоем

- [ ] Проверить финальный домен.
- [ ] Если домен известен, заменить URL в `sitemap.xml` на абсолютные URL.
- [ ] Если домен известен, заменить `Sitemap: sitemap.xml` в `robots.txt` на абсолютный URL sitemap.
- [ ] Проверить, что `robots.txt` не блокирует сайт.
- [ ] Проверить телефон `tel:+79011598267`.
- [ ] Проверить WhatsApp `https://wa.me/79011598267` и текст сообщения.
- [ ] Проверить, что Telegram остаётся TODO и не ведёт на фейковую ссылку.
- [ ] Проверить все HTML-страницы.
- [ ] Проверить `privacy.html`: это черновик, без фейковых реквизитов.
- [ ] Проверить, что форма на `contacts.html` обозначена как demo/mock.
- [ ] Проверить мобильную версию главной, услуг, цен, калькулятора и контактов.
- [ ] Проверить `favicon.svg`.
- [ ] Проверить `site.webmanifest`.
- [ ] Проверить `og:image`: `assets/img/hero-cleaning.jpg`.
- [ ] Проверить отсутствие `localhost` в runtime HTML/CSS/JS/XML/TXT.
- [ ] Проверить отсутствие локальных путей вида `/Users/...` в runtime HTML/CSS/JS/XML/TXT.
- [ ] Проверить отсутствие `href=""`, `javascript:void(0)` и inline `onclick`.
- [ ] Проверить отсутствие webhook URL, token, secret, api_key в runtime-коде.

## После деплоя

- [ ] Открыть главную страницу.
- [ ] Открыть `services.html`.
- [ ] Открыть `prices.html`.
- [ ] Открыть `calculator.html`.
- [ ] Открыть `contacts.html`.
- [ ] Открыть 2–3 service-страницы.
- [ ] Проверить звонок с телефона.
- [ ] Проверить WhatsApp с готовым текстом.
- [ ] Проверить расчёт в калькуляторе и кнопку `Отправить расчёт в WhatsApp`.
- [ ] Проверить `sitemap.xml`.
- [ ] Проверить `robots.txt`.
- [ ] Проверить footer-ссылку на `privacy.html`.
- [ ] Проверить, что `thanks.html` не обещает реальную CRM-отправку.
