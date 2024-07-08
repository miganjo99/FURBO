window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  GetPlayers();
});

function GetPlayers() {


  let data = IN_GetPlayers(); 

  let cardGrid = document.querySelector('.card-grid-space'); 

  data.forEach((jugador, index) => {
      let card = document.createElement('a');
      card.setAttribute('class', 'card');
      card.setAttribute('href', ''); 

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

      card.playerData = jugador;
  });

  // setTimeout(() => {
    
  //   initModal();
  // }, 1000);
  
  initModal();
}

function initModal() {
  var modal = document.getElementById("playerModal");
  var modalContent = modal.querySelector('.modal-content');
  
  console.log(modalContent);
  var cards = document.querySelectorAll('.card');

  console.log(cards);  
  // Iterar sobre cada tarjeta para agregar el evento clic
  cards.forEach(function(card) {
      card.addEventListener('click', function(event) {
          event.preventDefault(); 
          event.stopPropagation(); 

          var player = this.playerData;

          console.log(player);
      
          updateModalContent(player);

          modal.style.display = "flex";
      });
  });

  var closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', function() {
      modal.style.display = "none";
  });

  window.addEventListener('click', function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  });
}

function updateModalContent(player) {
  console.log(player);

  var modalPlayerName = document.getElementById('modalPlayerName');
  var playerDetails = document.getElementById('playerDetails');

  console.log(modalPlayerName);
  console.log(playerDetails);

  modalPlayerName.textContent = player.JUGADOR;

  playerDetails.innerHTML = '';

  // Array de claves que deseas mostrar en el modal
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

