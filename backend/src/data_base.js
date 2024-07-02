/**
 * This is the main backend service
 */



function DB_GetAllOntinyentMatches(){
   
    return data_teams;
}


function DB_GetAllPlayersInfo(){
    return data_matches;
}

function DB_GetLastMatches(NumMatches){


    let max_jornada = data_teams[0].jornada;

    console.log(data_teams[0]);

    data_teams.map((value) =>{
        if(value.jornada > max_jornada) max_jornada = value.jornada;
    })

    // proceso de normalizacion (opcional, igual no hay que hacer nada)

    let total_matches = [];

    for(let i = max_jornada; i > (max_jornada - NumMatches); i--){
 
        data_teams.map((value) =>{
            if(value.jornada == i){
                total_matches.push(value);
            }
        });
    }


    return total_matches;    
}

// TODO
function GetMatchFromJornada(NumJornada){

}

// TODO
function GetMatchesBetweenJornadas(MinJornada, MaxJornada){

    if(MinJornada >= MaxJornada) return null;

    let total_matches = [];

    for(let i = MinJornada; i <= MaxJornada; i++){
 
        data_teams.map((value) =>{
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
