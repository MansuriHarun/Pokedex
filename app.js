const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 1008; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()))
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            images: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', '),
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map((pokeman) => `
    <li class="card">
        <img class="card-image" src="${pokeman.images}"/>
        <h2 class="card-title">${pokeman.name}</h2>
        <p class="card-subtitle">ID: ${pokeman.id}</p>
        <span class="type ${pokeman.type}">${pokeman.type}</span>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
};  


fetchPokemon();