const cards = document.querySelectorAll(".book-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        if (card.classList.contains("book-card-left")) {
          card.style.animation = "slideInLeft 0.5s ease-in-out forwards";
        } else if (card.classList.contains("book-card-right")) {
          card.style.animation = "slideInRight 0.5s ease-in-out forwards";
        }
        observer.unobserve(card);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "-200px 0px",
  }
);

cards.forEach((card) => {
  observer.observe(card);
});
