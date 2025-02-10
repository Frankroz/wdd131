const consoles = await fetch("./scripts/json/consoles.json")
  .then((response) => response.json())
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });

const consoleCardList = document.getElementById("container");

function displayCards(consoles) {
  consoleCardList.innerHTML = "";
  consoles.forEach((consoleinfo) => {
    const consoleCard = document.createElement("a");
    consoleCard.href = `description.html?console=${consoleinfo.name.replaceAll(
      " ",
      "_"
    )}`;
    consoleCard.className = "card";
    consoleCard.id = consoleinfo.name.replace(" ", "-");
    const consoleCardContent = `<img src=${consoleinfo.image} alt="${consoleinfo.name}" loading="lazy"/>
             <h3>${consoleinfo.name}</h3>
             <p>${consoleinfo.description}</p>
             <p><strong>Console release year: </strong>${consoleinfo.year}</p>
             <p><strong>Console type: </strong>${consoleinfo.type}</p>`;

    consoleCard.innerHTML = consoleCardContent;
    consoleCardList.appendChild(consoleCard);
  });
}

displayCards(consoles);

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("searchInput");
searchBtn.addEventListener("click", () => {
  const newConsoles = consoles.filter((consoleinfo) => {
    return (
      consoleinfo.name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) ||
      consoleinfo.description
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    );
  });

  displayCards(newConsoles);
});

const yearFilter = document.getElementById("console-year");
const typeFilter = document.getElementById("console-type");
const resetBtn = document.getElementById("reset");
function filterConsoles() {
  const selectedYear = yearFilter.value;
  const selectedType = typeFilter.value;

  const newConsoles = consoles.filter((consoleinfo) => {
    let matchesYear = true;
    let matchesType = true;

    if (resetBtn.disabled === true) {
      resetBtn.disabled = false;
    }

    if (selectedYear !== "def") {
      if (selectedYear === "before") {
        matchesYear = consoleinfo.year < 2000;
      } else if (selectedYear === "after") {
        matchesYear = consoleinfo.year >= 2000;
      }
    }

    if (selectedType !== "def") {
      if (selectedType) {
        matchesType = consoleinfo.type === selectedType;
      }
    }

    return matchesYear && matchesType;
  });

  displayCards(newConsoles);
}

yearFilter.addEventListener("change", filterConsoles);
typeFilter.addEventListener("change", filterConsoles);

resetBtn.addEventListener("click", () => {
  yearFilter.value = "def";
  typeFilter.value = "def";

  resetBtn.disabled = true;
  displayCards(consoles);
});
