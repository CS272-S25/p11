const REGION = "hoenn";
const RANGE = [252, 386];

let loaded = false; // var to storen loading state, false if loading, true if loaded

const showLoading = () => {
  document.getElementById("loading").classList.remove("hidden");
};

const hideLoading = () => {
  document.getElementById("loading").classList.add("hidden");
};

const getCachedData = () => {
  const cachedData = localStorage.getItem(REGION);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
};

const renderCards = (cards) => {
  // create a new node for each card
  cards.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add("flex");
    cardDiv.classList.add("flex-col");
    cardDiv.classList.add("items-center");
    cardDiv.classList.add("justify-center");

    const img = document.createElement("img");
    img.src = card.images.small;
    img.alt = card.name;
    img.classList.add("card-img");

    const name = document.createElement("h2");
    name.textContent = card.name;
    name.classList.add("card-title");

    const dex = document.createElement("p");
    dex.textContent = `#${card.nationalPokedexNumbers?.[0] || "???"}`;
    dex.classList.add("card-dex");

    cardDiv.appendChild(img);
    cardDiv.appendChild(name);
    cardDiv.appendChild(dex);
    container.appendChild(cardDiv);
  });
  hideLoading();
};

const searchCards = (cards) => {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");

  form.addEventListener("submit", (press) => {
    press.preventDefault();
    // check if data loaded
    if (!loaded) return;
    const exactCard = input.value.trim().toLowerCase();
    container.innerHTML = "";
    const filtered = cards.filter((card) =>
      card.name.toLowerCase().includes(exactCard)
    );
    renderCards(filtered);
  });
};

const container = document.getElementById("card-container");

const cachedData = getCachedData();

showLoading();

if (cachedData) {
  renderCards(cachedData);
  searchCards(cachedData);
  loaded = true;
} else {
  fetch(
    `https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[${RANGE[0]} TO ${RANGE[1]}]`
  )
    .then((res) => res.json())
    .then((data) => {
      // order the pokedex indices so they appear in ascending order
      const cards = data.data
        .filter(
          (card) =>
            Array.isArray(card.nationalPokedexNumbers) &&
            card.nationalPokedexNumbers.length > 0
        )
        .sort(
          (a, b) => a.nationalPokedexNumbers[0] - b.nationalPokedexNumbers[0]
        );

      localStorage.setItem(REGION, JSON.stringify(cards));
      renderCards(cards);
      searchCards(cards); // pick form the cards that matched search
      loaded = true;
    });
}
