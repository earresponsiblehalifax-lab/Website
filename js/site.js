(function () {
  "use strict";

  var cfg = window.EAR_RESPONSIBLE || {};
  var stripeLink = cfg.stripePaymentLink || "";
  var stripeReady = /^https:\/\/buy\.stripe\.com\//.test(stripeLink);

  document.querySelectorAll(".js-buy").forEach(function (el) {
    if (stripeReady) el.setAttribute("href", stripeLink);
  });

  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");

  function setNavOpen(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setNavOpen(!document.body.classList.contains("nav-open"));
    });
  }
  if (nav) {
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setNavOpen(false);
  });

  var stage = document.querySelector("[data-product-stage]");
  document.querySelectorAll("[data-product-thumb]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = btn.getAttribute("data-src");
      var alt = btn.getAttribute("data-alt") || "";
      if (stage && src) {
        stage.setAttribute("src", src);
        stage.setAttribute("alt", alt);
      }
      document.querySelectorAll("[data-product-thumb]").forEach(function (b) {
        b.removeAttribute("aria-current");
      });
      btn.setAttribute("aria-current", "true");
    });
  });

  document.querySelectorAll("form[data-contact-form]").forEach(function (form) {
    var endpoint = cfg.formspreeEndpoint || "";
    var isPlaceholder = !endpoint || /PLACEHOLDER|YOUR_FORM_ID/i.test(endpoint);
    var note = form.parentElement ? form.parentElement.querySelector("[data-mailto-note]") : null;

    if (!isPlaceholder) {
      form.setAttribute("action", endpoint);
      form.setAttribute("method", "POST");
      form.removeAttribute("enctype");
      if (note) note.hidden = true;
      return;
    }

    if (note) note.hidden = false;
    form.setAttribute("action", "mailto:earresponsiblehalifax@gmail.com");
    form.setAttribute("method", "post");
    form.setAttribute("enctype", "text/plain");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.elements.namedItem("name") || {}).value || "";
      var email = (form.elements.namedItem("email") || {}).value || "";
      var message = (form.elements.namedItem("message") || {}).value || "";
      var subject = "Ear Responsible website enquiry" + (name.trim() ? " from " + name.trim() : "");
      var body =
        (name.trim() ? "Name: " + name.trim() + "\n" : "") +
        (email.trim() ? "Email: " + email.trim() + "\n\n" : "") +
        message;
      window.location.href =
        "mailto:earresponsiblehalifax@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  });
})();
