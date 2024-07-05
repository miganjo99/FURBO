/**
 * This file is for frontend to backend calls intermediate
 */

//import {API_GetLastMatches} from '../../API/api.js'


// This function returns the last NumberOfMatches from Ontinyent
function IN_GetLastMatches(NumberOfMatches){

    return API_GetLastMatches(NumberOfMatches);
}

function IN_GetMatch(ID){
    return API_GetMatch(ID);
}


function IN_GetPlayers(){
    return API_GetPlayers();
}
//export {IN_GetLastMatches};

// Example functions:

// function get_raw_data() // returns all data (should not necessary)

// funciton get_match_vs_team(team_name) // al matches between other team
// function get_match_onti_vs_team(team_name)
// function get_match_team_vs_onti(team_name)

// function get_matches_from_player(name)
// function get_matches_from_year(year)