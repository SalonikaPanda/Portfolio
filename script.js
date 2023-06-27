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
