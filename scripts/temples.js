const menu = document.querySelector("nav");
const header_title = document.getElementById("header_title");
const menu_icon = document.getElementById("menu_icon");
const close_icon = document.getElementById("close_icon");
const header = document.querySelector("header");

// Create a function for the menu icon
menu_icon.addEventListener("click", () => {
  menu.classList.add("show");
  header_title.classList.toggle("show");
  menu_icon.style.display = "none";
  close_icon.style.display = "block";
  header.style.flexDirection = "column";
  header.style.justifyContent = "center";
});

// Create a function for the close icon
close_icon.addEventListener("click", () => {
  menu.classList.remove("show");
  header_title.classList.toggle("show");
  menu_icon.style.display = "block";
  close_icon.style.display = "none";
  header.style.flexDirection = "row";
  header.style.justifyContent = "space-between";
});

// Check size of the screen to hide buttons
function hideBtns() {
  if (window.innerWidth >= 874) {
    menu_icon.style.display = "none";
    close_icon.style.display = "none";
  } else {
    menu_icon.style.display = "block";
  }
}

window.addEventListener("resize", hideBtns);
