(function () {
  "use strict";

  const FALLBACK_CALCULATOR = {
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
  };

  const currency = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  });

  function getCalculatorConfig() {
    const config = window.MAX_CLEANING_CONFIG && window.MAX_CLEANING_CONFIG.calculator;

    return {
      limits: Object.assign({}, FALLBACK_CALCULATOR.limits, config && config.limits),
      services: Object.assign({}, FALLBACK_CALCULATOR.services, config && config.services),
      options: Object.assign({}, FALLBACK_CALCULATOR.options, config && config.options)
    };
  }

  function getBoundedNumber(value, fallback, min, max) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return fallback;
    }

    return Math.min(Math.max(number, min), max);
  }

  function calculate(form) {
    const calculator = getCalculatorConfig();
    const serviceKey = form.service.value;
    const service = calculator.services[serviceKey] || calculator.services.carpet;
    const areaLimits = calculator.limits.area || FALLBACK_CALCULATOR.limits.area;
    const quantityLimits = calculator.limits.quantity || FALLBACK_CALCULATOR.limits.quantity;
    const area = getBoundedNumber(form.area.value, areaLimits.fallback, areaLimits.min, areaLimits.max);
    const quantity = getBoundedNumber(form.quantity.value, quantityLimits.fallback, quantityLimits.min, quantityLimits.max);
    const volume = service.unit === "area" ? area : quantity;
    let total = Math.max(service.basePrice * volume, service.minimum);
    const options = Array.from(form.querySelectorAll('input[name="options"]:checked')).map((input) => input.value);

    options.forEach((key) => {
      const option = calculator.options[key];

      if (!option) {
        return;
      }

      total += option.type === "percent" ? total * option.value : option.value;
    });

    return {
      total: Math.max(0, Math.round(total / 50) * 50),
      service,
      options,
      area,
      quantity
    };
  }

  function getContacts() {
    return Object.assign(
      {
        phoneHref: "tel:+79011598267",
        whatsappHref: "https://wa.me/79011598267"
      },
      window.MAX_CLEANING_CONFIG && window.MAX_CLEANING_CONFIG.contacts
    );
  }

  function getBusinessCity() {
    const business = window.MAX_CLEANING_CONFIG && window.MAX_CLEANING_CONFIG.business;

    return (business && business.city) || "Сочи";
  }

  function buildWhatsappHref(result, optionLabels) {
    const contacts = getContacts();
    const baseHref = (contacts.whatsappHref || "https://wa.me/79011598267").split("?")[0];
    const volumeText = result.service.unit === "area"
      ? `площадь ${result.area} м²`
      : `количество ${result.quantity}`;
    const optionsText = optionLabels.length ? `, опции: ${optionLabels.join(", ")}` : "";
    const message = `Здравствуйте! Рассчитал(а) на сайте предварительную стоимость: ${result.service.label.toLowerCase()}, ${volumeText}${optionsText}, итог от ${currency.format(result.total)}. Город: ${getBusinessCity()}. Хочу уточнить детали.`;

    return `${baseHref}?text=${encodeURIComponent(message)}`;
  }

  function renderResult(form, output, note, whatsappLink) {
    const calculator = getCalculatorConfig();
    const result = calculate(form);
    const optionLabels = result.options.map((key) => calculator.options[key] && calculator.options[key].label).filter(Boolean);
    const optionText = optionLabels.length ? ` Включено: ${optionLabels.join(", ")}.` : "";

    output.value = `от ${currency.format(result.total)}`;
    output.textContent = `от ${currency.format(result.total)}`;
    note.textContent = `${result.service.label}: предварительная стоимость без осмотра.${optionText} Цена уточняется после оценки материала, состояния и адреса выезда.`;

    if (whatsappLink) {
      whatsappLink.href = buildWhatsappHref(result, optionLabels);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#calculator-form");
    const output = document.querySelector("#calculator-result");
    const note = document.querySelector("#calculator-note");
    const whatsappLink = document.querySelector("[data-calculator-whatsapp]");

    if (!form || !output || !note) {
      return;
    }

    const update = () => renderResult(form, output, note, whatsappLink);
    const calculator = getCalculatorConfig();
    const areaLimits = calculator.limits.area || FALLBACK_CALCULATOR.limits.area;
    const quantityLimits = calculator.limits.quantity || FALLBACK_CALCULATOR.limits.quantity;

    form.area.min = areaLimits.min;
    form.area.max = areaLimits.max;
    form.quantity.min = quantityLimits.min;
    form.quantity.max = quantityLimits.max;

    form.addEventListener("input", update);
    form.addEventListener("change", update);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      update();
    });

    update();
  });
})();
