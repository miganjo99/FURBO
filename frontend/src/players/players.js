

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  GetPlayers();


  //initModal("playerModal", updatePlayerModalContent);

});

function GetPlayers() {
  let data = IN_GetPlayers();

  let cardGrid = document.querySelector('.card-grid-space');

  // let objectModal{
  //   title : String,
  //   imgURL : String,
  //   description : String,
  //   footer : String
  // }


  data.forEach((jugador, index) => {
      let card = document.createElement('a');
      card.setAttribute('class', 'card');
      card.setAttribute('href', '#');

      console.log(jugador.jugador);


      let jugadorNombre = jugador.jugador.replace(/\s+/g, '_');


      let bgImage = `url('../../data/images/jugadores/${jugadorNombre}.jpg')`;

      console.log(bgImage);

      card.style.setProperty('--bg-img', bgImage);

      let cardContent = document.createElement('div');

      let playerName = document.createElement('h1');
      playerName.textContent = jugador.jugador;

      cardContent.appendChild(playerName);
      card.appendChild(cardContent);

      cardGrid.appendChild(card);

      card.data = jugador; // Asignar los datos del jugador a la tarjeta

      console.log(jugador["FEC._NAC."]);

      let modal_data = {
        Titulo: jugador.jugador,
        Descripcion:[jugador.LOCALIDAD, jugador.Nombre_Completo, jugador.Gol, jugador.Asi],
        Footer: jugador["FEC._NAC."] 


      }



     card.addEventListener("click",function(){
      
      
      initModal(modal_data);


     })


  });
}


// function updatePlayerModalContent(player) {
//   if (!player) {
//       console.error('No player data found');
//       return;
//   }

//   console.log(player);

//   var modalPlayerName = document.getElementById('modalPlayerName');
//   var playerDetails = document.getElementById('playerDetails');

//   console.log(modalPlayerName);
//   console.log(playerDetails);

//   modalPlayerName.textContent = player.jugador;

//   playerDetails.innerHTML = '';

//   var keysToShow = ['FEC. NAC.', 'LOCALIDAD', 'KMs', 'Posición', 'Min', 'Gol', 'Amarillas', 'Rojas'];

//   keysToShow.forEach(key => {
//       if (player.hasOwnProperty(key)) {
//           console.log(keysToShow);
//           console.log("keysToShow");

//           var listItem = document.createElement('li');

//           var keySpan = document.createElement('span');
//           keySpan.textContent = key + ': ';

//           var valueSpan = document.createElement('span');
//           valueSpan.textContent = player[key];

//           listItem.appendChild(keySpan);
//           listItem.appendChild(valueSpan);

//           playerDetails.appendChild(listItem);
//       }
//   });
// }

