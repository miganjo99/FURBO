
//import {GetAllOntinyentMatches} from '../backend/src/data_base.js';

function API_GetLastMatches(NumberOfMatches){
    return DB_GetLastMatches(NumberOfMatches);
}


function API_GetMatch(ID){
    return DB_GetMatch(ID);
}

//export {API_GetLastMatches};