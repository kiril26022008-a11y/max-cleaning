(function () {
  "use strict";

  var FALLBACK_CONTACTS = {
    phoneLabel: "TODO: указать телефон",
    phoneHref: "#contacts-placeholder",
    whatsappLabel: "TODO: указать WhatsApp",
    whatsappHref: "#contacts-placeholder",
    whatsappDefaultText: "Здравствуйте! Хочу узнать стоимость услуги Макс-Клининг в Сочи.",
    placeholder: true
  };

  function getContacts() {
    return Object.assign(
      {},
      FALLBACK_CONTACTS,
      window.MAX_CLEANING_CONFIG && window.MAX_CLEANING_CONFIG.contacts
    );
  }

  function isPlaceholderContact(label, href, fallback) {
    return Boolean(fallback || !href || href.charAt(0) === "#" || label.indexOf("TODO") === 0);
  }

  function withWhatsappText(href, text) {
    if (!href || href.charAt(0) === "#") {
      return href || "#contacts-placeholder";
    }
    var baseHref = href.split("?")[0];
    var message = text || getContacts().whatsappDefaultText;
    return message ? baseHref + "?text=" + encodeURIComponent(message) : href;
  }

  function shouldReplaceContactText(element) {
    var text = element.textContent.trim();
    return element.hasAttribute("data-contact-label") || text.indexOf("TODO") === 0 || text.charAt(0) === "+";
  }

  function updateContactElement(element, label, href, isPlaceholder) {
    var nextHref = element.hasAttribute("data-contact-whatsapp-href")
      ? withWhatsappText(href, element.getAttribute("data-whatsapp-message"))
      : href;

    if (
      element.hasAttribute("data-contact-phone-href") ||
      element.hasAttribute("data-contact-whatsapp-href")
    ) {
      element.href = nextHref || "#contacts-placeholder";
    }

    if (
      (element.hasAttribute("data-contact-phone") ||
        element.hasAttribute("data-contact-whatsapp")) &&
      shouldReplaceContactText(element)
    ) {
      element.textContent = label;
    }

    element.setAttribute("data-contact-placeholder", String(Boolean(isPlaceholder)));

    if (isPlaceholder) {
      element.title = "Контакт является заглушкой и должен быть заменён перед публикацией.";
      element.setAttribute("aria-label", label + ". Контакт пока является заглушкой.");
    } else {
      element.removeAttribute("title");
      element.removeAttribute("aria-label");
    }
  }

  function applyContactLinks() {
    var contacts = getContacts();

    document.querySelectorAll("[data-contact-phone], [data-contact-phone-href]").forEach(function (el) {
      updateContactElement(el, contacts.phoneLabel, contacts.phoneHref, isPlaceholderContact(contacts.phoneLabel, contacts.phoneHref, false));
    });

    document.querySelectorAll("[data-contact-whatsapp], [data-contact-whatsapp-href]").forEach(function (el) {
      updateContactElement(el, contacts.whatsappLabel, contacts.whatsappHref, isPlaceholderContact(contacts.whatsappLabel, contacts.whatsappHref, false));
    });
  }

  function initMenu() {
    var header = document.querySelector("[data-header]");
    var toggle = document.querySelector("[data-menu-toggle]");
    var nav = document.querySelector("[data-nav]");

    if (!header || !toggle || !nav) return;

    function closeMenu() {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню");
    }

    toggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  function markCurrentPage() {
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    var activePage = currentPage.indexOf("service-") === 0 ? "services.html" : currentPage;

    document.querySelectorAll(".site-nav a").forEach(function (link) {
      if (link.getAttribute("href") === activePage) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-list details").forEach(function (details) {
      details.addEventListener("toggle", function () {
        if (!details.open) return;
        document.querySelectorAll(".faq-list details").forEach(function (item) {
          if (item !== details) item.removeAttribute("open");
        });
      });
    });
  }

  function initHeaderShadow() {
    var header = document.querySelector("[data-header]");
    if (!header) return;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* Soft reveal via IntersectionObserver — respects prefers-reduced-motion */
  function initReveal() {
    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      /* Make all reveal elements immediately visible */
      document.querySelectorAll("[data-reveal]").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0.08 }
    );

    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      observer.observe(el);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyContactLinks();
    initMenu();
    markCurrentPage();
    initFaq();
    initHeaderShadow();
    initReveal();
  });
})();
