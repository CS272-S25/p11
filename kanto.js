const apiKey = "7eb93994-815d-4358-850c-14e9a07f6118";

function getCards () {

    //TODO will need to be sorted by game title, doesn't have region in API
    fetch (`https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1 TO 151]`)
        .then(res => res.json())
        .then(data => {
            const cards = data.data;

            cards.forEach(card => {

            });
        })
}