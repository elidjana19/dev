const pokContainer = document.getElementById("container");

function getData() {
  // fetch(`https://pokeapi.co/api/v2/pokemon/`)
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("no data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.results);
      displayCards(data.results); //data.result is an array of objects
    });
}

getData();

function displayCards(results) {
  results.forEach((pokemon) => {
    const divPokemon = document.createElement("div");

    const url = pokemon.url;
    const segments = url.split("/").filter(Boolean); // Split by '/' and remove empty elements
    const pokemonId = segments[segments.length - 1];
    console.log(pokemonId); //pokemonId holds all the ID-s

    const cardInnerHTML = `
    <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${
            pokemon.id
        }.png" alt="">
    </div>
    <div class="info">
    <span class="number">#${pokemonId}</span>
        <h3 class="name">${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h3>
    </div>
    `;

    divPokemon.innerHTML = cardInnerHTML;
    divPokemon.classList.add("card");

    divPokemon.style.backgroundColor = getRandomColor();

    pokContainer.appendChild(divPokemon);
  });
}

 function getRandomColor() {
  var hue = Math.floor(Math.random() * 360); //hue= type of color
  

  var saturation = Math.floor(Math.random() * 20) + 80;  //intensity or vividness of color
  var lightness = Math.floor(Math.random() * 20) + 80; 
  
  return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
}
