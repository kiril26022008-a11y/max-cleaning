# LEAD_CAPTURE_SPEC.md

# Lead Capture Foundation v1

## Текущий режим

Формы работают в mock-режиме. Это означает:

- данные валидируются в браузере;
- CRM не подключена;
- внешние запросы не выполняются;
- персональные данные не пишутся в `console.log`;
- после успешной проверки создаётся только технический sessionStorage-флаг без персональных данных;
- пользователь перенаправляется на `thanks.html`.

Режим задаётся в:

```text
assets/js/site-config.js
```

Поля:

```js
crm.mode = "mock"
leadCapture.mode = "mock"
```

## Какие поля собираются формой

- Имя.
- Телефон.
- Услуга.
- Комментарий.
- Предпочтительный способ связи: phone, whatsapp или telegram.
- Согласие на обработку персональных данных.

## UTM/source capture

Поддерживаются параметры:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

UTM сохраняются в `sessionStorage`, если он доступен. Если `sessionStorage` недоступен, сайт не падает и продолжает работать без сохранения UTM.

## Структура будущего CRM payload

```json
{
  "payloadVersion": "v1",
  "formId": "contacts-main",
  "pageUrl": "https://example.test/contacts.html",
  "pageTitle": "Контакты и заявка — Макс-Клининг",
  "source": "website",
  "utm_source": "",
  "utm_medium": "",
  "utm_campaign": "",
  "utm_content": "",
  "utm_term": "",
  "submittedAt": "2026-05-30T00:00:00.000Z",
  "name": "Имя пользователя",
  "phone": "+7 000 000-00-00",
  "service": "Химчистка ковра",
  "comment": "Комментарий пользователя",
  "preferredContactMethod": "phone",
  "consentAccepted": true,
  "consentText": "Текст согласия"
}
```

В текущем frontend mock-режиме payload не отправляется наружу.

## Что нельзя хранить во frontend

- CRM webhook.
- Токены.
- API keys.
- Секреты.
- Доступы к мессенджерам.
- Приватные данные клиентов.

## Почему webhook должен быть только через backend/serverless proxy

Статический frontend доступен любому пользователю в браузере. Любой закрытый URL или ключ в JS-коде можно извлечь и использовать. Поэтому CRM-интеграция должна жить на backend/serverless стороне.

## Безопасный backend flow

1. Frontend отправляет заявку на backend endpoint.
2. Backend валидирует данные и применяет антиспам/rate limit.
3. Backend добавляет секретный CRM webhook из переменных окружения.
4. Backend отправляет заявку в CRM.
5. Backend возвращает frontend безопасный статус без раскрытия внутренних деталей.

## Будущие backend/serverless задачи

- Endpoint для приёма заявки.
- Серверная валидация полей.
- Rate limit и антиспам.
- Хранение CRM webhook в переменных окружения.
- Отправка в CRM.
- Безопасное логирование без лишних персональных данных.
- Обработка ошибок CRM.
- Возврат безопасного статуса frontend.

## Юридические данные до production

- Оператор персональных данных.
- ИП/ООО.
- ИНН/ОГРН, если применимо.
- Юридический адрес.
- Контакт для вопросов по персональным данным.
- Дата утверждения политики.
- Финальный текст политики.
- Порядок отзыва согласия.
