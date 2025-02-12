const imageElements = document.querySelectorAll(".image");
const images = [
  { src: "src/assets/Elmira-pocetna.jpg", alt: "Image 1" },
  { src: "src/assets/slika2.jpg", alt: "Image 2" },
  { src: "src/assets/slika3.jpg", alt: "Image 3" },
  { src: "src/assets/slika2.jpg", alt: "Image 4" },
  { src: "src/assets/Elmira-pocetna.jpg", alt: "Image 1" },
  { src: "src/assets/slika2.jpg", alt: "Image 2" },
  { src: "src/assets/slika3.jpg", alt: "Image 3" },
  { src: "src/assets/slika2.jpg", alt: "Image 4" },
];

let currentIndex = 0;

imageElements.forEach((image) => {
  image.setAttribute("width", "600px");
  image.setAttribute("height", "450px");
});

function createPaginationDots() {
  const paginationContainer = document.getElementById("pagination");
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";
  imageElements.forEach(() => {
    const dot = document.createElement("div");
    dot.className = "dot";
    paginationContainer.appendChild(dot);
  });
}

function updatePaginationDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function updateImages(direction = null) {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  if (prevButton) prevButton.disabled = true;
  if (nextButton) nextButton.disabled = true;

  updatePaginationDots();

  imageElements.forEach((image, index) => {
    image.className = "image";

    if (direction === "next") {
      if (index === currentIndex - 2) {
        image.className = "image hidden-left";
      } else if (index === currentIndex - 1) {
        image.className = "image prev-image";
      } else if (index === currentIndex) {
        image.className = "image current-image";
      } else if (index === currentIndex + 1) {
        image.className = "image next-image";
      } else if (index < currentIndex - 2) {
        image.className = "image hidden-left";
      } else {
        image.className = "image hidden-right";
      }
    } else if (direction === "prev") {
      if (index === currentIndex - 1) {
        image.className = "image prev-image";
      } else if (index === currentIndex) {
        image.className = "image current-image";
      } else if (index === currentIndex + 1) {
        image.className = "image next-image";
      } else if (index === currentIndex + 2) {
        image.className = "image hidden-right";
      } else if (index < currentIndex - 1) {
        image.className = "image hidden-left";
      } else {
        image.className = "image hidden-right";
      }
    } else {
      if (index === currentIndex - 1) {
        image.className = "image prev-image";
      } else if (index === currentIndex) {
        image.className = "image current-image";
      } else if (index === currentIndex + 1) {
        image.className = "image next-image";
      } else if (index < currentIndex - 1) {
        image.className = "image hidden-left";
      } else {
        image.className = "image hidden-right";
      }
    }
  });

  setTimeout(() => {
    if (prevButton) prevButton.disabled = false;
    if (nextButton) nextButton.disabled = false;
  }, 500);
}

// Add debouncing to prevent rapid clicking
let isTransitioning = false;

document.getElementById("prevButton")?.addEventListener("click", () => {
  if (isTransitioning) return;
  if (currentIndex <= 0) return;
  isTransitioning = true;
  currentIndex--;
  updateImages("prev");
  setTimeout(() => {
    isTransitioning = false;
  }, 500);
});

document.getElementById("nextButton")?.addEventListener("click", () => {
  if (isTransitioning) return;
  if (currentIndex >= images.length + 1) return;
  isTransitioning = true;
  currentIndex++;
  updateImages("next");
  setTimeout(() => {
    isTransitioning = false;
  }, 500);
});

// Initialize the gallery
window.addEventListener("load", () => {
  createPaginationDots();
  updateImages();
});
