

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  GetPlayers();

  let filter_button = document.getElementById("applyFilters");
  filter_button.addEventListener("click",ApplyFilters);

  document.getElementById("player_name").addEventListener("keypress",function(event){
    if(event.key == 'Enter'){
      event.preventDefault();
      ApplyFilters();
    }
  });

  LoadFiltersValues();


  //initModal("playerModal", updatePlayerModalContent);

});

function LoadFiltersValues(){
  console.log("Loading filter values...");
  let position_values = IN_GetFilterValues();

  let posiciones_element = document.getElementById("positionFilter");

  posiciones_element.innerHTML = "";
  let opt_all = document.createElement("option");
  opt_all.value = "Todos";
  opt_all.innerHTML = "Todos";
  posiciones_element.appendChild(opt_all);

  position_values.map((value) => {  
    let opt = document.createElement("option");
    opt.value = value;
    opt.innerHTML = value;
    posiciones_element.appendChild(opt);
  });
  
}

function ApplyFilters(){
  let player_name = document.getElementById("player_name").value;
  
  // Funciona bien
  if(player_name){
    console.log(player_name);
    let players = IN_GetPlayerByName(player_name.toLowerCase());
    console.log(players);
    PrintPlayers(players);
  }else{
    GetPlayers();
  }



}

function PrintPlayers(data){
  let cardGrid = document.querySelector('.card-grid-space');
  cardGrid.innerHTML = "";

  // let objectModal{
  //   title : String,
  //   imgURL : String,
  //   description : String,
  //   footer : String
  // }


  data.forEach((jugador, index) => {
      let card = document.createElement('a');
      card.setAttribute('class', 'card');

      // Add player id to the href
      card.setAttribute('href', './player/player.html?id=0');

      let jugadorNombre = jugador.jugador.replace(/\s+/g, '_');


      let bgImage = `url('../../data/images/jugadores/${jugadorNombre}.jpg')`;

      card.style.setProperty('--bg-img', bgImage);

      let cardContent = document.createElement('div');

      let playerName = document.createElement('h1');
      playerName.textContent = jugador.jugador;

      cardContent.appendChild(playerName);
      card.appendChild(cardContent);

      cardGrid.appendChild(card);

      card.data = jugador; // Asignar los datos del jugador a la tarjeta

    

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

function GetPlayers() {
  let data = IN_GetPlayers();
  if(data){
    PrintPlayers(data);
  }
  
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

