import { translations } from "../i18n/translations.js";

function updateLanguage(lang, langTitle) {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    const keys = key.split(".");
    let translation = translations[lang];

    for (const k of keys) {
      translation = translation?.[k];
    }

    if (translation) {
      element.textContent = translation;
    }
  });

  document.querySelectorAll(".language-picker-button").forEach((button) => {
    button.classList.remove("active");
    if (
      button.getAttribute("title").toLowerCase() === langTitle.toLowerCase()
    ) {
      button.classList.add("active");
    }
  });

  localStorage.setItem("preferredLanguage", lang);
}

// Event Listeners
document.querySelectorAll(".language-picker-button").forEach((button) => {
  button.addEventListener("click", () => {
    const langTitle = button.getAttribute("title");
    let lang = "";
    if (langTitle === "Bosanski") {
      lang = "ba";
    } else if (langTitle === "English") {
      lang = "en";
    } else if (langTitle === "Deutsch") {
      lang = "de";
    }

    updateLanguage(lang, langTitle);
  });
});

// Initialize language on page load
window.addEventListener("load", () => {
  const savedLang = localStorage.getItem("preferredLanguage");
  const savedLangTitle =
    savedLang === "ba"
      ? "Bosanski"
      : savedLang === "en"
        ? "English"
        : "Deutsch";
  if (savedLang && translations[savedLang]) {
    updateLanguage(savedLang, savedLangTitle);
  } else {
    // Set default language if none is saved
    updateLanguage("ba", "Bosanski");
  }
});
