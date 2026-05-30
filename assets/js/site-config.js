(function () {
  "use strict";

  /*
   * Shared public site config.
   * Keep external integrations and private client data outside this frontend file.
   */
  window.MAX_CLEANING_CONFIG = {
    business: {
      name: "Макс-Клининг",
      experienceYears: 3,
      schedule: "с 9:00 до 21:00 каждый день",
      city: "Сочи",
      serviceArea: ["Сочи", "село Весёлое", "Сириус", "посёлок городского типа Красная Поляна", "село Эстосадок"],
      address: "Сочи, микрорайон Центральный, улица Островского, 55"
    },
    contacts: {
      phoneLabel: "+7 901 159-82-67",
      phoneHref: "tel:+79011598267",
      whatsappLabel: "+7 901 159-82-67",
      whatsappHref: "https://wa.me/79011598267",
      whatsappDefaultText: "Здравствуйте! Хочу узнать стоимость услуги Макс-Клининг в Сочи.",
      placeholder: false
    },
    crm: {
      mode: "mock",
      note: "CRM подключать только через серверный слой, не напрямую из frontend"
    },
    legal: {
      privacyUrl: "privacy.html",
      consentRequired: true,
      consentText: "Я согласен(на) на обработку персональных данных и ознакомлен(а) с политикой.",
      policyStatus: "draft",
      operatorName: "TODO: уточнить юридического оператора персональных данных",
      operatorContact: "+7 901 159-82-67"
    },
    leadCapture: {
      mode: "mock",
      sourceDefault: "website",
      allowedContactMethods: ["phone", "whatsapp"],
      payloadVersion: "v1"
    },
    services: [
      {
        id: "carpet",
        title: "Химчистка ковров",
        url: "service-carpet-cleaning.html",
        category: "Ковры",
        shortDescription: "Чистка ковров и ковровых покрытий с учётом материала и состояния.",
        priceLabel: "от 200 ₽/м²",
        calculatorKey: "carpet"
      },
      {
        id: "sofa",
        title: "Химчистка диванов",
        url: "service-sofa-cleaning.html",
        category: "Мягкая мебель",
        shortDescription: "Чистка диванов, секций и обивки с выездом по адресу.",
        priceLabel: "от 1 500 ₽",
        calculatorKey: "sofa"
      },
      {
        id: "mattress",
        title: "Химчистка матрасов",
        url: "service-mattress-cleaning.html",
        category: "Матрасы",
        shortDescription: "Обработка поверхности матраса и зон частого контакта.",
        priceLabel: "от 1 000 ₽",
        calculatorKey: "mattress"
      },
      {
        id: "chair",
        title: "Химчистка кресел и стульев",
        url: "service-chair-cleaning.html",
        category: "Мягкая мебель",
        shortDescription: "Чистка офисных кресел, мягких стульев и компактной мебели.",
        priceLabel: "от 850 ₽",
        calculatorKey: "chair"
      },
      {
        id: "apartment",
        title: "Уборка квартир и домов",
        url: "service-apartment-cleaning.html",
        category: "Уборка помещений",
        shortDescription: "Поддерживающий, генеральный и послеремонтный формат.",
        priceLabel: "от 70 ₽/м²",
        calculatorKey: "apartment"
      },
      {
        id: "office",
        title: "Уборка офисов",
        url: "service-office-cleaning.html",
        category: "Уборка помещений",
        shortDescription: "Разовые и регулярные выезды для небольших офисов.",
        priceLabel: "от 80 ₽/м²",
        calculatorKey: "office"
      }
    ],
    priceNotes: [
      "Все цены предварительные.",
      "Финальная стоимость зависит от площади, материала, загрязнения, объёма работ и адреса выезда.",
      "Минимальная сумма заказа: TODO, уточнить."
    ],
    calculator: {
      limits: {
        area: { min: 0, max: 1000, fallback: 0 },
        quantity: { min: 1, max: 50, fallback: 1 }
      },
      services: {
        carpet: { label: "Химчистка ковров", unit: "area", basePrice: 200, minimum: 1000 },
        carpetFlooring: { label: "Химчистка ковролина", unit: "area", basePrice: 250, minimum: 1000 },
        sofa: { label: "Химчистка дивана", unit: "quantity", basePrice: 1500, minimum: 1500 },
        mattress: { label: "Химчистка матраса", unit: "quantity", basePrice: 1000, minimum: 1000 },
        chair: { label: "Химчистка кресла", unit: "quantity", basePrice: 850, minimum: 850 },
        stool: { label: "Химчистка стула", unit: "quantity", basePrice: 300, minimum: 300 },
        apartment: { label: "Уборка квартиры", unit: "area", basePrice: 70, minimum: 1000 },
        office: { label: "Уборка офиса", unit: "area", basePrice: 80, minimum: 1000 },
        generalCleaning: { label: "Генеральная уборка", unit: "area", basePrice: 120, minimum: 1500 },
        postRenovation: { label: "Уборка после ремонта", unit: "area", basePrice: 150, minimum: 1500 },
        windows: { label: "Мытьё окон", unit: "area", basePrice: 150, minimum: 500 }
      },
      options: {
        stain: { label: "сложные пятна", type: "percent", value: 0.18 },
        odor: { label: "обработка от запаха", type: "fixed", value: 700 },
        express: { label: "срочный выезд", type: "fixed", value: 1000 }
      }
    }
  };
})();
