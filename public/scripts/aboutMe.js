const seeMoreIcon = document.querySelector(".lucide-chevron-down");
const aboutMeText = document.querySelector(".about-me-text");
const seeMoreIconContainer = document.querySelector(".see-more-icon-container");

seeMoreIconContainer?.addEventListener("click", () => {
  seeMoreIconContainer?.classList.toggle("icon-expanded");
  aboutMeText?.classList.toggle("expanded");

  if (!seeMoreIconContainer.classList.contains("icon-expanded")) {
    window.scrollBy(0, -900);
  }
});
