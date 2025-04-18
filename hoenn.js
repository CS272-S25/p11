const container = document.getElementById("card-container");

fetch(
  "https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[252 TO 386]")
  .then((res) => res.json())
  .then((data) => {

    // order the pokedex indicies so they appear in acending order
    const cards = data.data
    .filter(card => Array.isArray(card.nationalPokedexNumbers) && card.nationalPokedexNumbers.length > 0)
    .sort((a, b) => a.nationalPokedexNumbers[0] - b.nationalPokedexNumbers[0]);

    // create a new node for each card
    cards.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");

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
  });
