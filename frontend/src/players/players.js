

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
  LoadFiltersCategory();



  // Check filter button
  document.getElementById("mobile_filter_btn").addEventListener("click", MenuToggle);

  // Check out of filters click
  document.getElementById("outer_filters_container").addEventListener("click", MenuToggle);



  //initModal("playerModal", updatePlayerModalContent);

});


function MenuToggle(){
  let filter = document.getElementById("mobile_filter_menu");
    filter.classList.toggle("filter_active");
    document.body.classList.toggle("filter_black");

    if(!filter.classList.contains("filter_active")){
      filter.classList.add("filter_deactive");
      document.getElementById("outer_filters_container").classList.remove("outer_filters_container_active");
    }else{
      filter.classList.remove("filter_deactive");
      document.getElementById("outer_filters_container").classList.add("outer_filters_container_active");
    }
}

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
function LoadFiltersCategory(){

  /*let category_values = IN_GetFilterCategory();

  let category_element = document.getElementById("categoryFilter");

  category_element.innerHTML = "";
  let opt_all = document.createElement("option");
  opt_all.value = "Todas";
  opt_all.innerHTML = "Todas";
  category_element.appendChild(opt_all);

  category_values.map((value) => {  
    let opt = document.createElement("option");
    opt.value = value;
    opt.innerHTML = value;
    category_element.appendChild(opt);
  });*/
  
}

function convertDateFormat(dateStr) {
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function bubbleSortByDateDesc(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
          let date1 = new Date(convertDateFormat(arr[j].fec_nac));
          let date2 = new Date(convertDateFormat(arr[j + 1].fec_nac));
          if (date1 > date2) {
              // Intercambiamos los elementos
              let temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
          }
      }
  }
  return arr;
}

function bubbleSortByDateAsc(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
          let date1 = new Date(convertDateFormat(arr[j].fec_nac));
          let date2 = new Date(convertDateFormat(arr[j + 1].fec_nac));
          if (date2 > date1) {
              // Intercambiamos los elementos
              let temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
          }
      }
  }
  return arr;
}

function ApplyFilters(){
  let print_all = true;
  let player_name = document.getElementById("player_name").value;

  let players_total = [];
  
  // Si hay nombre de jugador, pillo los jugadores que en su nombre aparezca la cadena introducida pasada a minusculas para evitar el case sensitive
  if(player_name){
    let players = IN_GetPlayerByName(player_name.toLowerCase());

    // Los que tenga los pillo y los meto en mi array global de todos (players_total)
    players_total = [...players];

    // Lo pongo a false porque si al final de todo esta en true, significa que no hay nigun filtro seleccionado y los pinto a todos
    print_all = false;
  }

  let player_position = document.getElementById("positionFilter").value;


  if(player_position != "Todos"){

    // Pillo los jugadores que jueguen en la posicion seleccionada (pasada a minusculas por el case sensitive)
    let players = IN_GetPlayerByPosition(player_position.toLowerCase());

    // Si ya tenia los jugadores que he pillado por el nombre, solamente guardo los que existan en ambos arrays, 
    // lo que signfica que me guardo los que coincidan en ambos filtros
    if(players_total.length > 0){

      // el metodo "includes" es como comprobar dos objet, es decir: if( object == object )
      const interseccion = players_total.filter(elemento => players.includes(elemento));

      // Machaco el array global y me guardo los que estaban en ambos
      players_total = interseccion;
    }else{ 

      // Como no habia nada antes, me guardo los que tengan esa posicion y au
      players_total = players_total.concat(players);
    }
    print_all = false;
  }


  let edad = document.getElementById("sortAge");
  if(edad.value == "asc"){

    // Si no habia ningun filtro antes, los pillo a todos y los guardo en el array global
    if(players_total.length == 0){
      players_total = IN_GetPlayers();
    }
    
    // Hay algunos que no tienen fecha de nacimiento, asi que los que no tienen me los cargo
    let tmp = players_total.filter((value) => {
      return value.fec_nac != null;
    });

    // Ordeno ascendentemente a los jugadores por el campo fecha de nacimiento y los guardo en mi array
    players_total = bubbleSortByDateAsc(tmp);

    print_all = false;

    // Esto es lo mismo pero de forma descendente
  }else if(edad.value == "desc"){

    if(players_total.length == 0){
      players_total = IN_GetPlayers();
    }

    let tmp = players_total.filter((value) => {
      return value.fec_nac != null;
    });

    players_total = bubbleSortByDateDesc(tmp);


    print_all = false;
  }


  // De nuevo, si no habia ningun filtro pinto todos los jugadores sin mas
  if(print_all){
    GetPlayers();
  }else{

    // Pinto los jugadores que coinciden con los filtros
    console.log("Players total: ");
    console.log(players_total);
    PrintPlayers(players_total);
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

  if(data.length > 0){

    
    data.forEach((jugador, index) => {
      let card = document.createElement('a');
      card.setAttribute('class', 'card');
      
      //console.log("--- JUGADOR ---");
      //console.log(jugador);

      // Add player id to the href
      card.setAttribute('href', './player/player.html?id='+jugador.id_jugador);
      
      let jugadorNombre = jugador.jugador.replace(/\s+/g, '_');
      
      
      let bgImage = `url('../../data/images/jugadores/${jugadorNombre}.png')`;
      
      //card.style.setProperty('--bg-img', bgImage);
      
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
  }else{

    let text = document.createElement('p');
    text.innerHTML = "Ningun jugador encontrado";
    text.classList.add("normal_text");
    cardGrid.appendChild(text);
  }
}

function GetPlayers() {
  let data = IN_GetPlayers();
  if(data){
    PrintPlayers(data);
  }
  
}

