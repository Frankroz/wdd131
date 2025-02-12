const url = window.location.href;
const item = url.split("=").pop();

let info;
let content = `<h1>404</h1>
                <h2>Content not found</h2>`;

// Search by game
if (url.includes("game")) {
  var games = {};

  // Get games from localStorage or "database"
  if (localStorage.games) {
    games = JSON.parse(localStorage.games);
  } else {
    games = await fetch("./scripts/json/games.json")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error loading JSON:", error);
      });

    localStorage.games = JSON.stringify(games);
  }

  // Search the info we need
  info = games
    .filter((game) => {
      return game.name === item.replaceAll("_", " ");
    })
    .pop();

  // Create content for the website
  if (info) {
    content = `<img src=${info.image} alt="${info.name}" loading="lazy"/>
        <h2>${info.name}</h2>
        <p><strong>Release year: </strong>${info.releaseYear}</p>
        <p><strong>Type: </strong>${info.type}</p>
        <p class="description">${info.description}</p>`;
  }
  // Search by console
} else if (url.includes("console")) {
  var consoles = {};

  // Get consoles from localStorage or "database"
  if (localStorage.consoles) {
    consoles = JSON.parse(localStorage.consoles);
  } else {
    consoles = await fetch("./scripts/json/consoles.json")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error loading JSON:", error);
      });

    localStorage.consoles = JSON.stringify(consoles);
  }
  // Search the info we need
  info = consoles
    .filter((console) => {
      return console.name === item.replaceAll("_", " ");
    })
    .pop();

  // Create content for the website
  if (info) {
    content = `<img src=${info.image} alt="${info.name}" loading="lazy"/>
        <h2>${info.name}</h2>
        <p><strong>Release year: </strong>${info.year}</p>
        <p><strong>Type: </strong>${info.type}</p>
        <p class="description">${info.longer_description}</p>`;
  }
  // Search by console
} else if (url.includes("news")) {
  var news = {};
  // Get consoles from localStorage or "database"
  if (localStorage.news) {
    news = JSON.parse(localStorage.news);
  } else {
    news = await fetch("./scripts/json/news.json")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error loading JSON:", error);
      });

    localStorage.news = JSON.stringify(news);
  }
  // Search the info we need
  info = news
    .filter((newInfo) => {
      return newInfo.title === item.replaceAll("_", " ");
    })
    .pop();
  // Create content for the website
  if (info) {
    content = `<img src=${info.image} alt="${info.name}" loading="lazy"/>
        <h2>${info.title}</h2>
        <p class="cardDate"><strong>${new Date(
          Date.parse(info.date)
        ).toDateString()}</strong></p>
        <p class="description">${info.longer_description}</p>`;
  }
}

const container = document.getElementById("content");
if (content.includes("404")) {
  document.querySelector("main").style.minHeight = "70vh";
}
container.innerHTML = content;