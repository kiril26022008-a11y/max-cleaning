# DATA_MODEL.md

# Единая модель данных сайта

Общий публичный конфиг находится в:

```text
assets/js/site-config.js
```

Он создаёт объект `window.MAX_CLEANING_CONFIG`. Файл нужен для данных, которые должны одинаково использоваться на разных страницах: контакты, список услуг для JS-логики, параметры калькулятора и режим формы.

## Что лежит в site-config.js

`business`:

- `name` — название компании.
- `experienceYears` — опыт в годах.
- `schedule` — график.
- `city` — TODO-город.
- `serviceArea` — TODO-зоны выезда.
- `address` — TODO-адрес или район работы.

`contacts`:

- `phoneLabel`, `phoneHref`.
- `whatsappLabel`, `whatsappHref`.
- `telegramLabel`, `telegramHref`.
- `placeholder` — признак, что контакты ещё не финальные.

`services`:

- `id`
- `title`
- `url`
- `category`
- `shortDescription`
- `priceLabel`
- `calculatorKey`

Основной SEO-контент услуг остаётся в статических HTML-страницах и не генерируется через JavaScript.

`calculator`:

- `limits.area` — min/max/fallback для площади.
- `limits.quantity` — min/max/fallback для количества.
- `services` — базовые цены, минимальные суммы и единицы расчёта.
- `options` — дополнительные опции и надбавки.

`legal`:

- `privacyUrl` — ссылка на страницу политики.
- `consentRequired` — обязательность согласия.
- `consentText` — текст согласия формы.
- `policyStatus` — статус политики.
- `operatorName` — TODO-оператор.
- `operatorContact` — TODO-контакт оператора.

`leadCapture`:

- `mode` — текущий режим сбора заявок.
- `sourceDefault` — источник по умолчанию.
- `allowedContactMethods` — разрешённые способы связи.
- `payloadVersion` — версия структуры payload.

## Где менять контакты

```text
assets/js/site-config.js
```

После внесения реальных контактов обновите `contacts.*` и смените `contacts.placeholder` на `false`.

## Где менять услуги

SEO и видимый контент:

```text
services.html
service-*.html
```

Общая JS-модель:

```text
assets/js/site-config.js
```

## Где менять цены

Видимый прайс:

```text
prices.html
```

Калькулятор:

```text
assets/js/site-config.js
```

Разделы `calculator.services` и `calculator.options`.

## Где менять ограничения калькулятора

```text
assets/js/site-config.js
```

Раздел `calculator.limits`.

## Почему нельзя хранить CRM webhook и секреты во frontend

Любой JS-файл на статическом сайте доступен пользователю в браузере. Если положить туда webhook, токен, API key или secret, их можно увидеть, скопировать и использовать без разрешения.

Во frontend нельзя хранить CRM webhook URL, токены, API keys, секреты, приватные данные клиентов и ключи доступа к мессенджерам.

## Что потом перенести в backend/serverless proxy

- CRM webhook.
- API keys и токены.
- Антиспам и rate limit.
- Серверную валидацию формы.
- Логирование заявок.
- Интеграции с CRM, Telegram bot API или email-сервисом.

## Что остаётся статичным в HTML

- SEO-тексты.
- H1/H2/H3.
- FAQ.
- Описания услуг.
- Внутренняя перелинковка.
- Open Graph и JSON-LD, если они содержат SEO-смысл страницы.

Так страницы остаются доступными без JavaScript и индексируются как обычный статический сайт.
