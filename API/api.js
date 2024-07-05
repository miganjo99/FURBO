
//import {GetAllOntinyentMatches} from '../backend/src/data_base.js';

function API_GetLastMatches(NumberOfMatches){
    return DB_GetLastMatches(NumberOfMatches);
}


function API_GetMatch(ID){
    return DB_GetMatch(ID);
}

function API_GetPlayers(){
    return DB_GetPlayers();
}

//export {API_GetLastMatches};