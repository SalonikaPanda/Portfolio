document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu functionality
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links li a");

  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      // Remove the active class from all links
      navLinksItems.forEach((link) => {
        link.classList.remove("active");
      });

      // Add the active class to the clicked link
      link.classList.add("active");

      // Close the hamburger menu (if it's open)
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        hamburger.classList.remove("open");
      }
    });
  });

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
  });
})
// Project section cards functionality
const cardsContainer = document.querySelector(".cards-container");
const firstCardWidth = cardsContainer.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".card-slider i");

let isDragging = false;
const AUTOPLAY_INTERVAL = 2500;
let autoplayTimer;
let isAutoPlay = true; 


function cloneCardsForInfiniteScroll() {
  const cards = Array.from(cardsContainer.children);
  const cardPerView = Math.round(cardsContainer.offsetWidth / firstCardWidth);

  for (let i = cards.length - cardPerView; i < cards.length; i++) {
    const card = cards[i].cloneNode(true);
    cardsContainer.insertBefore(card, cardsContainer.firstChild);
  }

  for (let i = 0; i < cardPerView; i++) {
    const card = cards[i].cloneNode(true);
    cardsContainer.appendChild(card);
  }
}

function scrollCarousel(amount) {
  cardsContainer.scrollLeft += amount;
}

function dragStart(e) {
  isDragging = true;
  cardsContainer.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = cardsContainer.scrollLeft;
}

function dragging(e) {
  if (!isDragging) return;
  cardsContainer.scrollLeft = startScrollLeft - (e.pageX - startX);
}

function dragStop() {
  isDragging = false;
  cardsContainer.classList.remove("dragging");
}

function infiniteScroll() {
  const scrollLeft = cardsContainer.scrollLeft;
  const maxScrollLeft = cardsContainer.scrollWidth - cardsContainer.offsetWidth;
  if (scrollLeft === 0) {
    scrollCarousel(maxScrollLeft - cardsContainer.offsetWidth);
  } else if (Math.ceil(scrollLeft) >= maxScrollLeft) {
    scrollCarousel(cardsContainer.offsetWidth - maxScrollLeft);
  }
  clearTimeout(autoplayTimer);
  if (!cardsContainer.matches(":hover")) autoPlay();
}

function autoPlay() {
  if (window.innerWidth >= 800 && isAutoPlay) {
    autoplayTimer = setTimeout(() => scrollCarousel(firstCardWidth), AUTOPLAY_INTERVAL);
  }
}

cloneCardsForInfiniteScroll();
autoPlay();

arrowBtns.forEach(btn => {
  const scrollAmount = btn.id === "left" ? -firstCardWidth : firstCardWidth;
  btn.addEventListener("click", () => scrollCarousel(scrollAmount));
});

cardsContainer.addEventListener("mousedown", dragStart);
cardsContainer.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
cardsContainer.addEventListener("scroll", infiniteScroll);
cardsContainer.addEventListener("mouseenter", () => clearTimeout(autoplayTimer));
cardsContainer.addEventListener("mouseleave", autoPlay);
