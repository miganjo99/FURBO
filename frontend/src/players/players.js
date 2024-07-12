
import { initModal } from '../utils/modal.js';

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  GetPlayers();


  initModal("playerModal", updatePlayerModalContent);

});

function GetPlayers() {
  let data = IN_GetPlayers();

  let cardGrid = document.querySelector('.card-grid-space');

  data.forEach((jugador, index) => {
      let card = document.createElement('a');
      card.setAttribute('class', 'card');
      card.setAttribute('href', '#');

      console.log(jugador.JUGADOR);

      let bgImage = `url('../../data/images/jugadores/${jugador.JUGADOR}.jpg')`;

      console.log(bgImage);

      card.style.setProperty('--bg-img', bgImage);

      let cardContent = document.createElement('div');

      let playerName = document.createElement('h1');
      playerName.textContent = jugador.JUGADOR;

      cardContent.appendChild(playerName);
      card.appendChild(cardContent);

      cardGrid.appendChild(card);

      card.data = jugador; // Asignar los datos del jugador a la tarjeta
  });
}


function updatePlayerModalContent(player) {
  if (!player) {
      console.error('No player data found');
      return;
  }

  console.log(player);

  var modalPlayerName = document.getElementById('modalPlayerName');
  var playerDetails = document.getElementById('playerDetails');

  console.log(modalPlayerName);
  console.log(playerDetails);

  modalPlayerName.textContent = player.JUGADOR;

  playerDetails.innerHTML = '';

  var keysToShow = ['FEC. NAC.', 'LOCALIDAD', 'KMs', 'Posición', 'Min', 'Gol', 'Amarillas', 'Rojas'];

  keysToShow.forEach(key => {
      if (player.hasOwnProperty(key)) {
          console.log(keysToShow);
          console.log("keysToShow");

          var listItem = document.createElement('li');

          var keySpan = document.createElement('span');
          keySpan.textContent = key + ': ';

          var valueSpan = document.createElement('span');
          valueSpan.textContent = player[key];

          listItem.appendChild(keySpan);
          listItem.appendChild(valueSpan);

          playerDetails.appendChild(listItem);
      }
  });
}

