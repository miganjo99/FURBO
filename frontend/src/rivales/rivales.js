

  window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    let data_rivales_ = IN_GetRivales();
    PrintRivales(data_rivales_);
  });
  
  
  
  function convertDateFormat(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  
  
  
  function PrintRivales(data){
    let cardGrid = document.getElementById("rivales_container");
    cardGrid.innerHTML = "";
  
    if(data.length > 0){
  
      
      data.forEach((value, index) => {
        let card = document.createElement('a');
        card.setAttribute('class', 'card');
        

  
        // Add player id to the href
        //card.setAttribute('href', './player/player.html?id='+value.id_jugador);
        
        let rival_nombre = value.rival.replace(/\s+/g, '_');
        rival_nombre = rival_nombre.replace(/[\s']/g, '_');
        
        //console.log(rival_nombre)
        
        let bgImage = `url('../../data/images/escudos/${rival_nombre}.png')`;

        
        card.style.setProperty('--bg-img', bgImage);
        
        let cardContent = document.createElement('div');
        
        let playerName = document.createElement('h1');
        playerName.textContent = value.rival.replace(/ny/g, 'ñ');;
        
        cardContent.appendChild(playerName);
        card.appendChild(cardContent);
        
        cardGrid.appendChild(card);
        
        card.data = value; // Asignar los datos del jugador a la tarjeta
        
      });

    }else{
  
      let text = document.createElement('p');
      text.innerHTML = "Ningun rival disponible";
      text.classList.add("normal_text");
      cardGrid.appendChild(text);
    }
  }
  
  