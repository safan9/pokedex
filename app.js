const pokedex = document.getElementById("pokedex");
const pokeCahe = {};
const fetchPokemon = async () => {
    const promises = [];
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemons = data.results.map((data, index) => ({
        name: data.name,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
    }))
    displayPokemons(pokemons);
};

const displayPokemons = (pokemons) => {
    // console.log(pokemon);
    const pokemonHTMLString = pokemons.map(pokemon => `
    <li class="card" onclick="selectPokemon(${pokemon.id})">
        <img class="card-image  " src="${pokemon.image}" />
        <h2 class="card-title" >${pokemon.id+". "+pokemon.name}</h2>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;

};

const selectPokemon = async (id) => {
    if(!pokeCahe[id]){
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokemon = await res.json();
        pokeCahe[id] = pokemon;
        displayPokemon(pokemon);
    }
    displayPokemon(pokeCahe[id]);
};

const displayPokemon = (pokemon) => {
    const type = pokemon.types.map( type => type.type.name).join(", ");
    const image = pokemon.sprites['front_default'];
    const htmlString = `
        <div class="popup">
            <button id="close-btn" onclick="closePopup()">Close</button>
            <div class="card" onclick="selectPokemon(${pokemon.id})">
                <img class="card-image" src="${image}" />
                <h2 class="card-title" >${pokemon.id+". "+pokemon.name}</h2>
                <div class="card-subtitle">
                    <p>Type: ${type} | XP: ${pokemon.base_experience}</p>
                    <p>Height: ${pokemon.height} | Weight: ${pokemon.weight }</p>
                </div>
            </div>
        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();