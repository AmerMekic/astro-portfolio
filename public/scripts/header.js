const links = document.querySelectorAll(".link-item");
const underline = document.querySelector(".underline");
const sections = document.querySelectorAll(".section");
let isClickScrolling = false;

// Click handlers
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

const menuButton = document.querySelector(".menu-button");
const linkContainer = document.querySelector(".link-container");

menuButton?.addEventListener("click", () => {
  linkContainer?.classList.toggle("open");
});

// Close menu when clicking a link
document.querySelectorAll(".link-item").forEach((link) => {
  link.addEventListener("click", () => {
    linkContainer?.classList.remove("open");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".header")) {
    linkContainer?.classList.remove("open");
  }
});

// Scroll handler
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

// Debounce function
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

// Wrap the scroll handler in a debounce
const debouncedHighlightNav = debounce(highlightNavOnScroll, 20);

// Add scroll event listener with debounced function
window.addEventListener("scroll", debouncedHighlightNav);
