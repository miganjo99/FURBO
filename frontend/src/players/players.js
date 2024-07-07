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
          event.preventDefault(); // Evitar la acción predeterminada del enlace
          event.stopPropagation(); // Evitar que el clic se propague y cierre el modal

          // Obtener los datos del jugador desde la tarjeta
          var player = this.playerData;

          console.log(player);
      
          updateModalContent(player);

          // Mostrar el modal
          modal.style.display = "block";
      });
  });

  // Cerrar el modal al hacer clic en la X
  var closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', function() {
      modal.style.display = "none";
  });

  // Cerrar el modal si se hace clic fuera del contenido del modal
  window.addEventListener('click', function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  });
}

// Función para actualizar el contenido del modal con los detalles del jugador
function updateModalContent(player) {

  console.log(player);

  var modalPlayerName = document.getElementById('modalPlayerName');
  var playerDetails = document.getElementById('playerDetails');

  console.log(modalPlayerName);
  console.log(playerDetails);

  modalPlayerName.textContent = player.JUGADOR;

  playerDetails.innerHTML = '';

  for (var key in player) {//modificar el modal más bonito!!!!!!!!!!!!!!
      if (player.hasOwnProperty(key)) {
          var listItem = document.createElement('li');
          console.log("listItem");
          console.log(listItem);

          listItem.textContent = key + ': ' + player[key];
          playerDetails.appendChild(listItem);
      }
  }
}
