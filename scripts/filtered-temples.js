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

// Create temple list
const temple_list = document.getElementById("temple_list");

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Bern Switzerland Temple",
    location: "Bern, Switzerland",
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/bern-switzerland-temple/bern-switzerland-temple-54641-main.jpg",
    area: 68525,
    dedicated: "1955, September, 11",
  },
  {
    templeName: "Frankfurt Germany Temple",
    location: "Frankfurt, Germany",
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/frankfurt-germany-temple/frankfurt-germany-temple-38924-main.jpg",
    area: 98600,
    dedicated: "1987, November, 7",
  },
  {
    templeName: "London England Temple",
    location: "London, England",
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/london-england-temple/london-england-temple-4243-main.jpg",
    area: 114000,
    dedicated: "1958, September, 7",
  },
  {
    templeName: "Tokyo Japan Temple",
    location: "Tokyo, Japan",
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-26340-main.jpg",
    area: 104000,
    dedicated: "1980, August, 21",
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah",
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg",
    area: 382207,
    dedicated: "1893, April, 6",
  },
];

function displayTemples(filteredTemples) {
  temple_list.innerHTML = "";

  filteredTemples.forEach((temple) => {
    const templeCard = document.createElement("figure");

    const templeCardContent = `
            <h2>${temple.templeName}</h2>
            <img src="${temple.imageUrl}" alt="${
      temple.templeName
    }" loading="lazy">
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Size:</strong> ${temple.area.toLocaleString(
              "en-US"
            )} sq ft</p>
            <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
          `;

    templeCard.innerHTML = templeCardContent;
    temple_list.appendChild(templeCard);
  });
}

// Create filters\
//      Home
const homeButton = document.getElementById("homeBtn");
homeButton.addEventListener("click", () => displayTemples(temples));

//      Old filter
const filterOldButton = document.getElementById("filterOld");
filterOldButton.addEventListener("click", () => {
  const oldTemples = temples.filter((temple) => {
    return parseInt(temple.dedicated.split(",")[0]) < 1900;
  });

  displayTemples(oldTemples);
});

//      New filter
const filterNewButton = document.getElementById("filterNew");
filterNewButton.addEventListener("click", () => {
  const oldTemples = temples.filter((temple) => {
    return parseInt(temple.dedicated.split(",")[0]) > 2000;
  });

  displayTemples(oldTemples);
});

//      Large filter
const filterLargeButton = document.getElementById("filterLarge");
filterLargeButton.addEventListener("click", () => {
  const oldTemples = temples.filter((temple) => {
    return temple.area > 90000;
  });

  displayTemples(oldTemples);
});

//      Small filter
const filterSmallButton = document.getElementById("filterSmall");
filterSmallButton.addEventListener("click", () => {
  const oldTemples = temples.filter((temple) => {
    return temple.area < 10000;
  });

  displayTemples(oldTemples);
});

displayTemples(temples);
