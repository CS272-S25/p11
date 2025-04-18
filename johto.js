const container = document.getElementById('card-container');

fetch('https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[152 TO 251]')
  .then(res => res.json())
  .then(data => {
    const cards = data.data;

    cards.forEach(card => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');

      const img = document.createElement('img');
      img.src = card.images.small;
      img.alt = card.name;
      img.classList.add('card-img');

      const name = document.createElement('h2');
      name.textContent = card.name;
      name.classList.add('card-title');

      const dex = document.createElement('p');
      dex.textContent = `#${card.nationalPokedexNumbers?.[0] || '???'}`;
      dex.classList.add('card-dex');

      cardDiv.appendChild(img);
      cardDiv.appendChild(name);
      cardDiv.appendChild(dex);
      container.appendChild(cardDiv);
    });
  })
