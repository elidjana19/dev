const pokContainer = document.getElementById("container");

function getData() {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("no data");
      }
      return response.json();
    })
    .then((data) => {
      displayCards(data.results);
    });
}

getData();

function displayCards(results) {
  results.forEach((pokemon) => {
    const divPokemon = document.createElement("div");

    const url = pokemon.url;
    const segments = url.split("/").filter(Boolean);
    const pokemonId = segments[segments.length - 1];

    const cardInnerHTML = `
      <div class="img-container">
          <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png" alt="">
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

  // Add hover event listeners for each card
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.addEventListener("mousemove", handleHover);
    card.addEventListener("mouseleave", handleHoverOut);
  });
}

function handleHover(event) {
  const card = event.currentTarget;
  const cardRect = card.getBoundingClientRect();  //the size of an element and its position relative to the viewport

  console.log(cardRect)


  //Calculate the position of the mouse pointer relative to the top-left corner of the card

   //event.clientX and event.clientY : mouse positions
  // cardRect.left cardRect.top: the coordinates of the top-left corner of the card 

  const x = event.clientX - cardRect.left;  
  const y = event.clientY - cardRect.top; 

  card.classList.remove("top-left", "top-right", "bottom-left", "bottom-right");

  if (x < cardRect.width / 2 && y < cardRect.height / 2) {
    card.classList.add("top-left");
  } else if (x >= cardRect.width / 2 && y < cardRect.height / 2) {
    card.classList.add("top-right");
  } else if (x < cardRect.width / 2 && y >= cardRect.height / 2) {
    card.classList.add("bottom-left");
  } else {
    card.classList.add("bottom-right");
  }
}

function handleHoverOut(event) {
  const card = event.currentTarget;
  card.classList.remove("top-left", "top-right", "bottom-left", "bottom-right");
}




function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 20) + 80;
  const lightness = Math.floor(Math.random() * 20) + 80;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
