const toggleLoadingIndicator = () => {
    const loading = document.getElementById("loading");
    loading.classList.toggle("hidden");
}

const getCachedData = () => {
    const cachedData = localStorage.getItem("hoenn");
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
}

const renderCards = (cards) => {
    // create a new node for each card
    cards.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
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
    toggleLoadingIndicator();
}

const container = document.getElementById("card-container");
const cachedData = getCachedData();
toggleLoadingIndicator();

if (cachedData) {
    renderCards(cachedData);
} else {
    fetch(
      "https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[252 TO 386]")
      .then((res) => res.json())
      .then((data) => {
        // order the pokedex indicies so they appear in ascending order
        const cards = data.data
        .filter(card => Array.isArray(card.nationalPokedexNumbers) && card.nationalPokedexNumbers.length > 0)
        .sort((a, b) => a.nationalPokedexNumbers[0] - b.nationalPokedexNumbers[0]);
    
        localStorage.setItem("hoenn", JSON.stringify(cards));
        renderCards(cards);
    });
}