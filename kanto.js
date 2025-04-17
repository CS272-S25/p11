const apiKey = "7eb93994-815d-4358-850c-14e9a07f6118";

const container = document.getElementById('card-container');

fetch('https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1 TO 151]')
  .then(res => res.json())
  .then(data => {
    const cards = data.data;

    cards.forEach(card => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add(
        'bg-white', 'rounded-xl', 'shadow-md', 'overflow-hidden', 'transition',
        'hover:shadow-lg', 'flex', 'flex-col', 'items-center', 'p-4', 'w-full'
      );      

      const img = document.createElement('img');
      img.src = card.images.small;
      img.alt = card.name;
      img.classList.add('mb-2', 'w-full', 'h-auto');

      const name = document.createElement('h2');
      name.textContent = card.name;
      name.classList.add('text-lg', 'font-semibold', 'text-center', 'text-gray-800');

      const dex = document.createElement('p');
      dex.textContent = `#${card.nationalPokedexNumbers?.[0] || '???'}`;
      dex.classList.add('text-sm', 'text-gray-500');

      cardDiv.appendChild(img);
      cardDiv.appendChild(name);
      cardDiv.appendChild(dex);
      container.appendChild(cardDiv);
    });
  })