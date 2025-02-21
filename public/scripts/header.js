const links = document.querySelectorAll(".link-item");
const underline = document.querySelector(".underline");
const sections = document.querySelectorAll(".section");
const menuButton = document.querySelector(".menu-button");
const menuIcon = document.querySelector(".menu-icon");

const mobileMenuContainer = document.querySelector(".mobile-menu-container");
const linkContainer = document.querySelector(".link-container");
let isClickScrolling = false;

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function highlightNavOnScroll() {
  if (isClickScrolling) return;

  const scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 500;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.id;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      links.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
          underline.style.left = `${link.offsetLeft + link.offsetWidth / 2}px`;
          underline.style.width = `${link.offsetWidth}px`;
        }
      });
    }
  });
}

function updateLanguage(lang) {
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

  localStorage.setItem("preferredLanguage", lang);
}

// Event Listeners
const debouncedHighlightNav = debounce(highlightNavOnScroll, 20);

links.forEach((link) => {
  link.addEventListener("click", function () {
    isClickScrolling = true;
    links.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
    underline.style.left = `${this.offsetLeft + this.offsetWidth / 2}px`;
    underline.style.width = `${this.offsetWidth}px`;

    setTimeout(() => {
      isClickScrolling = false;
    }, 500);
  });
});

document.querySelectorAll(".link-item").forEach((link) => {
  link.addEventListener("click", () => {
    linkContainer?.classList.remove("open");
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".header")) {
    linkContainer?.classList.remove("open");
  }
});

menuButton?.addEventListener("click", () => {
  mobileMenuContainer?.classList.toggle("hidden");
  menuIcon?.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

mobileMenuContainer.childNodes.forEach((child) => {
  child.addEventListener("click", () => {
    mobileMenuContainer.classList.add("hidden");
    menuIcon?.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

window.addEventListener("scroll", debouncedHighlightNav);
