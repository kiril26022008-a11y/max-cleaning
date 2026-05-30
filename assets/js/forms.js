(function () {
  "use strict";

  const PHONE_PATTERN = /^[+\d][\d\s()\-]{9,}$/;
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  function getConfig() {
    return window.MAX_CLEANING_CONFIG || {};
  }

  function getCrmMode() {
    const config = getConfig();
    return (config.leadCapture && config.leadCapture.mode) || (config.crm && config.crm.mode) || "mock";
  }

  function getLegalConfig() {
    const config = getConfig();

    return Object.assign(
      {
        consentRequired: true,
        consentText: "Я согласен(на) на обработку персональных данных и ознакомлен(а) с политикой.",
        privacyUrl: "privacy.html"
      },
      config.legal
    );
  }

  function getLeadConfig() {
    const config = getConfig();

    return Object.assign(
      {
        mode: "mock",
        sourceDefault: "website",
        allowedContactMethods: ["phone", "whatsapp"],
        payloadVersion: "v1"
      },
      config.leadCapture
    );
  }

  function safeSessionSet(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  function safeSessionGet(key) {
    try {
      return window.sessionStorage.getItem(key) || "";
    } catch (error) {
      return "";
    }
  }

  function captureUtmParams() {
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    let hasUtm = false;

    UTM_KEYS.forEach((key) => {
      const value = params.get(key);

      if (value) {
        utm[key] = value.slice(0, 180);
        hasUtm = true;
      }
    });

    if (hasUtm) {
      safeSessionSet("maxCleaningUtm", JSON.stringify(utm));
    }
  }

  function getStoredUtm() {
    const empty = {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: ""
    };

    try {
      return Object.assign(empty, JSON.parse(safeSessionGet("maxCleaningUtm") || "{}"));
    } catch (error) {
      return empty;
    }
  }

  function setError(field, message) {
    const form = field.closest("form");
    const error = form.querySelector(`[data-error-for="${field.id || field.name}"]`);

    field.setAttribute("aria-invalid", message ? "true" : "false");

    if (error) {
      error.textContent = message;
    }
  }

  function validateForm(form) {
    let isValid = true;
    const legal = getLegalConfig();
    const lead = getLeadConfig();
    const name = form.elements.name;
    const phone = form.elements.phone;
    const service = form.elements.service;
    const consent = form.elements.consent;
    const preferredContactMethod = form.elements.preferredContactMethod;

    if (name.value.trim().length < 2) {
      setError(name, "Укажите имя минимум из двух символов.");
      isValid = false;
    } else {
      setError(name, "");
    }

    if (!PHONE_PATTERN.test(phone.value.trim())) {
      setError(phone, "Укажите телефон в международном или городском формате.");
      isValid = false;
    } else {
      setError(phone, "");
    }

    if (!service.value) {
      setError(service, "Выберите услугу.");
      isValid = false;
    } else {
      setError(service, "");
    }

    if (preferredContactMethod) {
      const selectedMethod = form.querySelector('input[name="preferredContactMethod"]:checked');

      if (!selectedMethod || !lead.allowedContactMethods.includes(selectedMethod.value)) {
        const error = form.querySelector('[data-error-for="preferredContactMethod"]');

        if (error) {
          error.textContent = "Выберите удобный способ связи.";
        }

        isValid = false;
      } else {
        const error = form.querySelector('[data-error-for="preferredContactMethod"]');

        if (error) {
          error.textContent = "";
        }
      }
    }

    if (legal.consentRequired && !consent.checked) {
      setError(consent, "Нужно согласие для обратной связи.");
      isValid = false;
    } else {
      setError(consent, "");
    }

    return isValid;
  }

  function buildMockPayload(form) {
    const lead = getLeadConfig();
    const legal = getLegalConfig();
    const utm = getStoredUtm();
    const selectedMethod = form.querySelector('input[name="preferredContactMethod"]:checked');

    return {
      payloadVersion: lead.payloadVersion,
      formId: form.dataset.formId || form.id || "lead-form",
      pageUrl: window.location.href,
      pageTitle: document.title,
      source: utm.utm_source || lead.sourceDefault,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content,
      utm_term: utm.utm_term,
      submittedAt: new Date().toISOString(),
      name: form.elements.name.value.trim(),
      phone: form.elements.phone.value.trim(),
      service: form.elements.service.value,
      comment: (form.elements.message && form.elements.message.value.trim()) || "",
      preferredContactMethod: selectedMethod ? selectedMethod.value : "",
      consentAccepted: Boolean(form.elements.consent.checked),
      consentText: legal.consentText
    };
  }

  function mockSubmit(form) {
    if (form.dataset.submitting === "true") {
      return;
    }

    form.dataset.submitting = "true";
    buildMockPayload(form);
    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Отправляем...";
    }

    window.setTimeout(() => {
      safeSessionSet("maxCleaningLeadSubmitted", JSON.stringify({
        mode: "mock",
        submittedAt: new Date().toISOString()
      }));
      window.location.href = "thanks.html";
    }, 500);
  }

  function applyLegalText() {
    const legal = getLegalConfig();

    document.querySelectorAll("[data-consent-text]").forEach((element) => {
      element.innerHTML = `${legal.consentText} <a href="${legal.privacyUrl}">Политика обработки персональных данных</a>`;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    captureUtmParams();
    applyLegalText();

    document.querySelectorAll("[data-lead-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (form.dataset.submitting === "true") {
          return;
        }

        if (!validateForm(form)) {
          const firstInvalid = form.querySelector('[aria-invalid="true"]');

          if (firstInvalid && typeof firstInvalid.focus === "function") {
            firstInvalid.focus();
          }

          return;
        }

        if (getCrmMode() === "mock") {
          mockSubmit(form);
        }
      });
    });
  });
})();
