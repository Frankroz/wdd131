const games = await fetch("./scripts/json/games.json")
  .then((response) => response.json())
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

const news = await fetch("./scripts/json/news.json")
  .then((response) => response.json())
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

const newNews = news.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);
const newGames = games.slice(games.length - 3, games.length);

const newNews_container = document.getElementById("new_news");
const newGames_container = document.getElementById("new_games");

function displayLatestNews() {
  newNews_container.innerHTML = "";

  newNews.forEach((newsInfo) => {
    const card = document.createElement("a");
    card.href = `description.html?news=${newsInfo.title.replaceAll(" ", "_")}`;
    card.className = "card";
    card.id = newsInfo.title.replace(" ", "-");
    const cardContent = `<img src="${
      newsInfo.image
    }" alt="${newsInfo.title.replaceAll(" ", "_")}" loading="lazy" />
    <h3>${newsInfo.title}</h3>
    <p>${newsInfo.content}</p>`;

    card.innerHTML = cardContent;
    newNews_container.appendChild(card);
  });
}

function displayLatestGames() {
  newGames_container.innerHTML = "";

  newGames.forEach((game) => {
    const card = document.createElement("a");
    card.href = `description.html?game=${game.name.replaceAll(" ", "_")}`;
    card.className = "card";
    card.id = game.name.replace(" ", "-");
    const cardContent = `<img src="${game.image}" alt="${game.name.replaceAll(
      " ",
      "_"
    )}" loading="lazy" />
      <h3>${game.name}</h3>`;

    card.innerHTML = cardContent;
    newGames_container.appendChild(card);
  });
}

displayLatestNews();
displayLatestGames();
