window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    GetPlayers();

      // Llamar a initModal() para inicializar el modal y manejar los clics en las tarjetas
  


});

function GetPlayers() {
    let data = IN_GetPlayers(); // Suponiendo que IN_GetPlayers() devuelve el array de jugadores correctamente

    let cardGrid = document.querySelector('.card-grid-space'); // Selector del contenedor donde se agregarán las tarjetas

    data.forEach((jugador, index) => {
        let card = document.createElement('a');
        card.setAttribute('class', 'card');
        card.setAttribute('href', ''); // Agrega aquí el enlace correspondiente si lo tienes

        console.log(jugador.JUGADOR);

        let bgImage = `url('../../data/images/jugadores/${(jugador.JUGADOR)}.jpg')`;

        console.log(bgImage);


        card.style.setProperty('--bg-img', bgImage);

        let cardContent = document.createElement('div');

        let playerName = document.createElement('h1');
        playerName.textContent = jugador.JUGADOR;

        cardContent.appendChild(playerName);
        card.appendChild(cardContent);

        cardGrid.appendChild(card);
    });


    initModal();
}





// function getImageFileName(jugador) {
//     // Aquí puedes definir la lógica para obtener el nombre de la imagen según el jugador
//     // Por ejemplo, jugador.JUGADOR.replace(/\s+/g, '').toLowerCase() + '.jpg'
//     return jugador.JUGADOR.replace(/\s+/g, '').toLowerCase() + '.jpg';
// }





// Función para inicializar el modal y manejar los clics en las tarjetas
function initModal() {
    // Obtener referencia al modal y el contenido del modal
    var modal = document.getElementById("playerModal");
    var modalContent = modal.querySelector('.modal-content');
    
    console.log(modalContent);
    // Obtener todos los elementos con la clase 'card'
    var cards = document.querySelectorAll('.card');

    console.log(cards);  
    // Iterar sobre cada tarjeta para agregar el evento clic
    cards.forEach(function(card) {
      card.addEventListener('click', function() {
        // Obtener el nombre del jugador desde el elemento h1 dentro de la tarjeta
        var playerName = this.querySelector('h1').textContent;
        

        console.log(playerName);
        
  
        // Actualizar el contenido del modal con los detalles del jugador
        updateModalContent(playerName);
  
        // Mostrar el modal
        modal.style.display = "block";
      });
    });
  
    // Cerrar el modal al hacer clic en la X
    var closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
      modal.style.display = "none";
    });
  
    //Cerrar el modal si se hace clic fuera del contenido del modal
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }
  
  
  
  // Función para actualizar el contenido del modal con los detalles del jugador
  function updateModalContent(player) {
    // Obtener referencias a los elementos del modal

    console.log(player);

    var modalPlayerName = document.getElementById('modalPlayerName');
    var playerDetails = document.getElementById('playerDetails');
  
    // Actualizar el nombre del jugador en el modal

    console.log(modalPlayerName);
    console.log(playerDetails);


    modalPlayerName.textContent = player.JUGADOR;
  
    // Limpiar cualquier contenido anterior en los detalles del jugador
    playerDetails.innerHTML = '';
  
    // Crear elementos <li> para cada detalle del jugador y agregarlos a la lista
    for (var key in player) {
      if (player.hasOwnProperty(key)) {
        var listItem = document.createElement('li');
        listItem.textContent = key + ': ' + player[key];
        playerDetails.appendChild(listItem);
      }
    }
  }
  

  