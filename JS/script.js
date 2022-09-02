let pokemonName = document.querySelector('.pokemon_name');
let pokemonNumber = document.querySelector('.pokemon_number');
let pokemonImage = document.querySelector('.pokemon_image');

let form = document.querySelector('.form');
let input = document.querySelector('.input_search');
let buttonPrev = document.querySelector('.btn-prev');
let buttonNext = document.querySelector('.btn-next');

let searchPokemon = 25;

let fetchPokemon = async (pokemon) => {
    let APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200){
        let data = await APIResponse.json(); 
        return data;
    }   
}

let renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    
    let data = await fetchPokemon(pokemon);

    if(data){
    pokemonName.innerHTML = data.name;
    pokemonImage.style.display = 'block';
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon)
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);

