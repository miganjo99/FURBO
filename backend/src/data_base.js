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

function DB_GetPlayerFromMatch(ID){

    let players_tmp = [];

    data_jugadores.map( (value) =>{
        if(value.partido_n_ == ID){
            players_tmp.push(value);
        }
    })

    return players_tmp;

}

function DB_GetFilterDinamica(resultFilter){

    return data_equipos.filter(equipo => equipo.dinamica === resultFilter);

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

    let jugador = null; 

    data_datos_jugadores.map((value) => {
        if(value.id_jugador == id){
            jugador = value;
        }
    });
    
    return jugador;
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

function DB_GetPlayerByName(name){
    let players = [];


    data_datos_jugadores.map((value) =>{
        
        if(value.jugador){
            if(value.jugador.toLowerCase().includes(name)){
                players.push(value);
            }
        }else if(value.nombre_completo){
            if(value.nombre_completo.toLowerCase().includes(name)){
                players.push(value);
            }
        }
    })

    return players;
}

function DB_GetPlayerByPosition(name){
    let players = [];


    data_datos_jugadores.map((value) =>{
        
        if(value.posicion){
            if(value.posicion.toLowerCase().includes(name)){
                players.push(value);
            }
        }
    })

    return players;
}



function DB_GetFilterValues(){
    let posiciones = [];
    let posiciones_filtered = [];

    data_datos_jugadores.map((value) => {
        posiciones.push(value.posicion);
    });

    posiciones_filtered = posiciones.filter((value, i) => {
        return value != null && posiciones.indexOf(value) == i;
    });


    //let max_edad = data_datos_jugadores[0];

    return posiciones_filtered;

}


function DB_GetFilterCategory(){
    let categorias = [];
    let categorias_filtered = [];


    data_jugadores.map((value) => {
        if (value.categoria === 0) {
            // Si la categoría es 0, añadimos "Amistoso"
            categorias.push("Amistoso");
        } else if (value.categoria != null) {
            
            categorias.push(value.categoria);
        }
    });

    categorias_filtered = categorias.filter((value, i) => {
        return value != null && categorias.indexOf(value) == i;
    });

    return categorias_filtered;

}
function DB_GetFilterTemporadas(){
    let temporadas = [];
    let temporadas_filtered = [];

    data_jugadores.map((value) => {
        if (value.temporada === 0) {
            // Si la categoría es 0, añadimos "Amistoso"
            temporadas.push("Amistoso");
        } else if (value.categoria != null) {
            
            temporadas.push(value.temporada);
        }
    });

    temporadas_filtered = temporadas.filter((value, i) => {
        return value != null && temporadas.indexOf(value) == i;
    });

    return temporadas_filtered;

}



function DB_GetFilterJornada(){
    let jornadas = [];
    let jornadas_filtered = [];


    data_equipos.map((value) => {
        if (value.jornada === 0) {
            // Si la categoría es 0, añadimos "Amistoso"
            jornadas.push("Amistoso");
        } else if (value.jornada != null) {
            
            jornadas.push(value.jornada);
        }
    });

    jornadas_filtered = jornadas.filter((value, i) => {
        return value != null && jornadas.indexOf(value) == i;
    });

    

    


    return jornadas_filtered;

}

function DB_GetRivales(){
    return data_rivales;
}