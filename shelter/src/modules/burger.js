const burgerIcon = document.querySelector(".nav__burger-icon");
const burgerMenu = document.querySelector(".burger__menu");
const overlay = document.querySelector(".overlay");

burgerIcon.addEventListener("click", () => {
  document.body.style.overflow = "";
  burgerMenu.style.display = "flex";
  setTimeout(() => {
    burgerIcon.classList.toggle("burger-icon_active");
    burgerMenu.classList.toggle("burger__menu_active");
    overlay.classList.toggle("overlay_active");
    if (burgerIcon.classList.contains("burger-icon_active")) {
      document.body.style.overflow = "hidden";
    }
  }, 100);
});

burgerMenu.addEventListener("click", () => {
  document.body.style.overflow = "";
  burgerIcon.classList.toggle("burger-icon_active");
  burgerMenu.classList.toggle("burger__menu_active");
  overlay.classList.toggle("overlay_active");
  if (burgerIcon.classList.contains("burger-icon_active")) {
    document.body.style.overflow = "hidden";
  }
});
