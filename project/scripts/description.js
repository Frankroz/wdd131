const url = window.location.href;
const item = url.split("=").pop();

let info;
let content = `<h1>404</h1>
                <h2>Content not found</h2>`;

if (url.includes("game")) {
  const games = await fetch("./scripts/json/games.json")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
  info = games
    .filter((game) => {
      return game.name === item.replaceAll("_", " ");
    })
    .pop();
  if (info) {
    content = `<img src=${info.image} alt="${info.name}" loading="lazy"/>
        <h2>${info.name}</h2>
        <p><strong>Release year: </strong>${info.releaseYear}</p>
        <p><strong>Type: </strong>${info.type}</p>
        <p class="description">${info.description}</p>`;
  }
} else if (url.includes("console")) {
  const consoles = await fetch("./scripts/json/consoles.json")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
  info = consoles
    .filter((console) => {
      return console.name === item.replaceAll("_", " ");
    })
    .pop();
  if (info) {
    content = `<img src=${info.image} alt="${info.name}" loading="lazy"/>
        <h2>${info.name}</h2>
        <p><strong>Release year: </strong>${info.year}</p>
        <p><strong>Type: </strong>${info.type}</p>
        <p class="description">${info.longer_description}</p>`;
  }
} else if (url.includes("news")) {
  const news = await fetch("./scripts/json/news.json")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });

  info = news
    .filter((newInfo) => {
      return newInfo.title === item.replaceAll("_", " ");
    })
    .pop();
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
