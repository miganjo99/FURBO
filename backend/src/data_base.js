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

function DB_GetPlayer(id){

    // TODO: iterate over player id's and get the correct player
    
    return data_datos_jugadores[0];
}

function DB_GetMaxAmarillasNo_Oficial(){
    let max_amarillas = data_datos_jugadores[0].amarillas;
    data_datos_jugadores.map((value) =>{
        if(value.amarillas > max_amarillas){
            max_amarillas = value.amarillas;
        }
    });

    return max_amarillas;
}
function DB_GetMaxAmarillasOficial(){
    let max_amarillas = data_datos_jugadores[0].amarilla_of;

    data_datos_jugadores.map((value) =>{
        if(value.amarilla_of > max_amarillas){
            max_amarillas = value.amarilla_of;
        }
    });

    return max_amarillas;
}

function DB_GetMaxRojasNo_Oficial(){
    let max_rojas = data_datos_jugadores[0].rojas;
    data_datos_jugadores.map((value) =>{
        if(value.rojas > max_rojas){
            max_rojas = value.rojas;
        }
    });

    return max_rojas;
}
function DB_GetMaxRojasOficial(){
    let max_rojas = data_datos_jugadores[0].rojas_of;

    data_datos_jugadores.map((value) =>{
        if(value.rojas_of > max_rojas){
            max_rojas = value.rojas_of;
        }
    });

    return max_rojas;
}

function DB_GetMaxGoles(){

    let max_goles = data_datos_jugadores[0].gol;

    data_datos_jugadores.map((value) =>{
        if(value.gol > max_goles){
            max_goles = value.gol;
        }
    });

    return max_goles;
}

function DB_GetMaxAsistencias(){
    let max_value = data_datos_jugadores[0].asi;
    let max_value_of = data_datos_jugadores[0].asi_of;

    data_datos_jugadores.map((value) =>{
        if(value.asi > max_value){
            max_value = value.asi;
        }
        
        if(value.asi_of > max_value_of){
            max_value_of = value.asi_of;
        }
    });

    return max_value >= max_value_of ? max_value : max_value_of;
}

function DB_GetMaxConvocatorias(){
    let max_value = data_datos_jugadores[0].convo;
    let max_value_of = data_datos_jugadores[0].convo_of;

    data_datos_jugadores.map((value) =>{
        if(value.convo > max_value){
            max_value = value.convo;
        }
        
        if(value.convo_of > max_value_of){
            max_value_of = value.convo_of;
        }
    });

    return max_value >= max_value_of ? max_value : max_value_of;
}

function DB_GetMaxMinJugados(){
    let max_value = data_datos_jugadores[0].min;
    let max_value_of = data_datos_jugadores[0].min_of;

    data_datos_jugadores.map((value) =>{
        if(value.min > max_value){
            max_value = value.min;
        }
        
        if(value.min_of > max_value_of){
            max_value_of = value.min_of;
        }
    });

    return max_value >= max_value_of ? max_value : max_value_of;
}

function DB_GetMaxTitular(){
    let max_value = data_datos_jugadores[0].titu;
    let max_value_of = data_datos_jugadores[0].titu_of;

    data_datos_jugadores.map((value) =>{
        if(value.titu > max_value){
            max_value = value.titu;
        }
        
        if(value.titu_of > max_value_of){
            max_value_of = value.titu_of;
        }
    });

    return max_value >= max_value_of ? max_value : max_value_of;
}

function DB_GetMaxSuplente(){
    let max_value = data_datos_jugadores[0].sup;
    let max_value_of = data_datos_jugadores[0].sup_of;

    data_datos_jugadores.map((value) =>{
        if(value.sup > max_value){
            max_value = value.sup;
        }
        
        if(value.sup_of > max_value_of){
            max_value_of = value.sup_of;
        }
    });

    return max_value >= max_value_of ? max_value : max_value_of;
}