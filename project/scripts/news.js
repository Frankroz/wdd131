var news = {};
// Get news from localStorage or "database"
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

const cardList = document.getElementById("container");

// Display the cards in the container
function displayCards(news) {
  cardList.innerHTML = "";
  news.forEach((newsInfo) => {
    const card = document.createElement("a");
    card.href = `description.html?news=${newsInfo.title.replaceAll(" ", "_")}`;
    card.className = "card";
    card.id = newsInfo.title.replace(" ", "-");
    const cardContent = `<img src=${newsInfo.image} alt="${
      newsInfo.title
    }" loading="lazy"/>
               <h3>${newsInfo.title}</h3>
               <p>${newsInfo.content}</p>
               <p class="cardDate"><strong>${new Date(
                 Date.parse(newsInfo.date)
               ).toDateString()}</strong></p>`;

    card.innerHTML = cardContent;
    cardList.appendChild(card);
  });
}

displayCards(news);

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("searchInput");
// Search by name/description
searchBtn.addEventListener("click", () => {
  const newNews = news.filter((card) => {
    return (
      card.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      card.content.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  });

  displayCards(newNews);
});

const dateSort = document.getElementById("sort-date");
const resetBtn = document.getElementById("reset");
// Depending on the value of the filter, sort the News 
function sortNews() {
  let newNews = [];

  if (resetBtn.disabled === true) {
    resetBtn.disabled = false;
  }

  if (dateSort.value === "latest") {
    newNews = news.toSorted((a, b) => (a.date < b.date ? 1 : -1));
  } else if (dateSort.value === "oldest") {
    newNews = news.toSorted((a, b) => (a.date > b.date ? 1 : -1));
  }

  displayCards(newNews);
}

// Reset button
resetBtn.addEventListener("click", () => {
  dateSort.value = "def";

  resetBtn.disabled = true;
  displayCards(news);
});

dateSort.addEventListener("change", sortNews);
