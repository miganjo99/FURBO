/**
 * This is the main backend service
 */


function sortMatchesByDate(matches, desc = true) {
    return matches.sort((a, b) => {
        // Convertir las fechas a objetos Date
        let dateA = new Date(a.dia.split('/').reverse().join('-'));
        let dateB = new Date(b.dia.split('/').reverse().join('-'));

        // Ordenar de forma descendente
        if(desc){
            return dateB - dateA;
        }else{
            return dateA - dateB;
        }
    });
}


function DB_GetAllOntinyentMatches(){
   
    return data_equipos;
}


function DB_GetAllPlayersInfo(){
    return data_jugadores;
}

function DB_GetLastMatches(NumMatches){
    console.log(data_equipos);
    let matches_sorted = sortMatchesByDate(data_equipos);

    let total_matches = [];

    for(let i = 0; i < NumMatches; i++){
        total_matches.push(matches_sorted[i]);
    }


    return total_matches;    
}

function DB_GetMatch(ID){


    let match = null;
    data_equipos.map((value) =>{
        if(value.partido == ID){
            match = value;
            return;
        }
    });

    return match;
}

// TODO
function GetMatchFromJornada(NumJornada){

}

// TODO
function GetMatchesBetweenJornadas(MinJornada, MaxJornada){

    if(MinJornada >= MaxJornada) return null;

    let total_matches = [];

    for(let i = MinJornada; i <= MaxJornada; i++){
 
        data_equipos.map((value) =>{
            if(value.jornada == i){
                total_matches.push(value);
            }
        });
    }


    return total_matches;    
}

// TODO
function DB_GetPlayersInfoFromMatch(JornadaNum){
    
    return null;
}

// TODO
function DB_GetInfoFromPlayer(PlayerName){
    return null;
}

// TODO
function DB_GetInfoMatch(JornadaNum){
    return null;
}
//export {GetAllOntinyentMatches};


//PLAYERS

function DB_GetPlayers(){
    return data_datos_jugadores;     
}