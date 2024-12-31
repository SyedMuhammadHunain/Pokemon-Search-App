const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const  specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const sprite = document.getElementById("sprite");

searchBtn.addEventListener("click", () => {
  const pokemonNameOrId = searchInput.value.toLowerCase();
  const pokemon = inputValidation(pokemonNameOrId);
  
  if (pokemon) {
    fetchPokemon(pokemon);
  }
});

// Fetched API
const fetchPokemon = (pokemon) => {
  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`)
    .then((res) => res.json())
    .then((data) => {
      const pokemonData = data;
      displayStats(pokemonData);
  })
  .catch((error) => {
      alert("Pokémon Not found.");
    });
}

// UI Update
const displayStats = (pokemonData) => {
  pokemonName.textContent = `Name: ${pokemonData.name.toUpperCase()}`;
  pokemonId.textContent = `ID: ${pokemonData.id}`;
  weight.textContent = `Weight: ${pokemonData.weight}`;
  height.textContent = `Height: ${pokemonData.height}`;
  hp.textContent = `HP: ${pokemonData.stats[0].base_stat}`;
  attack.textContent = `Attack: ${pokemonData.stats[1].base_stat}`;
  defense.textContent = `Defense: ${pokemonData.stats[2].base_stat}`;
  specialAttack.textContent = `Special Attack: ${pokemonData.stats[3].base_stat}`;
  specialDefense.textContent = `Special Defense: ${pokemonData.stats[4].base_stat}`;
  speed.textContent = `Speed: ${pokemonData.stats[5].base_stat}`;
  displayImage(pokemonData);

  displayTypes(pokemonData.types);
}

// Types
const displayTypes = (typesArray) => {
  types.innerHTML = ''; // Clear previous types
  typesArray.forEach(type => {
    const typeElement = document.createElement('div');
    typeElement.textContent = type.type.name.toUpperCase();
    types.appendChild(typeElement);
  });
}

// Image
const displayImage = (pokemonData) => {
  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
  sprite.src = imageURL;
}

// Input Validation
const inputValidation = (pokemonNameOrId) => {
  const check = pokemonNameOrId.replace(/[^a-z0-9]/i, '');
  if (check && check.length > 0) {
    return check;
  }else {
    alert("Pokémon Not found.");
    return null;
  }
}