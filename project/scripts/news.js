const news = await fetch("./scripts/json/news.json")
  .then((response) => response.json())
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

const cardList = document.getElementById("container");

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
function sortNews() {
  const dateSortValue = dateSort.value;
  var newNews = [];

  if (dateSortValue === "latest") {
    newNews = news.sort((a, b) => (a.date < b.date ? 1 : -1));
  } else if (dateSortValue === "oldest") {
    newNews = news.sort((a, b) => (a.date > b.date ? 1 : -1));
  }

  displayCards(newNews);
}

dateSort.addEventListener("change", sortNews);
