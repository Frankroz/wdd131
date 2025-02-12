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

const gameTypes = [...new Set(games.map((game) => game.type))];

const yearFilter = document.getElementById("game-year");
const typeFilter = document.getElementById("game-type");
const resetBtn = document.getElementById("reset");

// Create the options for the filters
function createTypeOptions(types) {
  typeFilter.innerHTML =
    '<option value="def" selected="">Game type...</option>';
  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.innerHTML = type;
    typeFilter.appendChild(option);
  });
}

createTypeOptions(gameTypes);
// Depending on the value of the filter, sort the games 
function filterGames() {
  const selectedYear = yearFilter.value;
  const selectedType = typeFilter.value;

  const newGames = games.filter((gamesInfo) => {
    let matchesYear = true;
    let matchesType = true;

    if (resetBtn.disabled === true) {
      resetBtn.disabled = false;
    }

    if (selectedYear !== "def") {
      if (selectedYear === "before") {
        matchesYear = gamesInfo.releaseYear < 2000;
      } else if (selectedYear === "after") {
        matchesYear = gamesInfo.releaseYear >= 2000;
      }
    }

    if (selectedType !== "def") {
      if (selectedType) {
        matchesType = gamesInfo.type === selectedType;
      }
    }

    return matchesYear && matchesType;
  });

  displayCards(newGames);
}

yearFilter.addEventListener("change", filterGames);
typeFilter.addEventListener("change", filterGames);
// Reset button
resetBtn.addEventListener("click", () => {
  yearFilter.value = "def";
  typeFilter.value = "def";

  resetBtn.disabled = true;
  displayCards(games);
});

const cardList = document.getElementById("container");

// Display the cards in the container
function displayCards(games) {
  cardList.innerHTML = "";
  games.forEach((gameInfo) => {
    const card = document.createElement("a");
    card.href = `description.html?game=${gameInfo.name.replaceAll(" ", "_")}`;
    card.className = "card";
    card.id = gameInfo.name.replaceAll(" ", "_");
    const cardContent = `<img src=${gameInfo.image} alt="${gameInfo.name}" loading="lazy"/>
             <h3>${gameInfo.name}</h3>
             <p><strong>Release year: </strong>${gameInfo.releaseYear}</p>
             <p><strong>Type: </strong>${gameInfo.type}</p>`;

    card.innerHTML = cardContent;
    cardList.appendChild(card);
  });
}

displayCards(games);
// Search by name/description
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("searchInput");
searchBtn.addEventListener("click", () => {
  const newGames = games.filter((gameInfo) => {
    return gameInfo.name
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());
  });

  displayCards(newGames);
});