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
   
    return data_teams;
}


function DB_GetAllPlayersInfo(){
    return data_matches;
}

function DB_GetLastMatches(NumMatches){

    let matches_sorted = sortMatchesByDate(data_teams);
    //console.log(matches_sorted);

    let max_jornada = 0;

    console.log(matches_sorted[0]);

    
    /*matches_sorted.map((value) =>{
        console.log("Jornada: " + value.jornada);
        console.log("type " + typeof(value.jornada))
        if(typeof(value.jornada) == 'number'  && value.jornada > max_jornada) max_jornada = value.jornada;
    })
    
    console.log("Max jornada: " + max_jornada);
    

    let total_matches = [];

    for(let i = max_jornada; i > (max_jornada - NumMatches); i--){
 
        matches_sorted.map((value) =>{
            if(value.jornada == i){
                total_matches.push(value);
            }
        });
    }*/



        let total_matches = [];

        for(let i = 0; i < NumMatches; i++){
            total_matches.push(matches_sorted[i]);
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
