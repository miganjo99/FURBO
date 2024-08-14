/**
 * This file is for frontend to backend calls intermediate
 */

//import {API_GetLastMatches} from '../../API/api.js'


// This function returns the last NumberOfMatches from Ontinyent
function IN_GetLastMatches(NumberOfMatches){

    return API_GetLastMatches(NumberOfMatches);
}
function IN_GetAllOntinyentMatches(){

    return API_GetAllOntinyentMatches();
}
function IN_GetFilterDinamica(resultFilter){

    return API_GetFilterDinamica(resultFilter);
}

function IN_GetMatch(ID){
    return API_GetMatch(ID);
}


function IN_GetPlayers(){
    return API_GetPlayers();
}

function IN_GetPlayer(id){
    return API_GetPlayer(id);
}

function IN_GetMaxAmarillasNo_Oficial(){
    return API_GetMaxAmarillasNo_Oficial();
}

function IN_GetMaxAmarillasOficial(){
    return API_GetMaxAmarillasOficial();
}

function IN_GetMaxRojasNo_Oficial(){
    return API_GetMaxRojasNo_Oficial();
}

function IN_GetMaxRojasOficial(){
    return API_GetMaxRojasOficial();
}

function IN_GetMaxGoles(){
    return API_GetMaxGoles();
}

function IN_GetMaxAsistencias(){
    return API_GetMaxAsistencias();
}

function IN_GetMaxConvocatorias(){
    return API_GetMaxConvocatorias();
}

function IN_GetMaxMinJugados(){
    return API_GetMaxMinJugados();
}

function IN_GetMaxTitular(){
    return API_GetMaxTitular();
}

function IN_GetMaxSuplente(){
    return API_GetMaxSuplente();
}

function IN_GetPlayerByName(name){
    return API_GetPlayerByName(name);
}

function IN_GetFilterValues(){
    return API_GetFilterValues();
}

function IN_GetFilterCategory(){
    return API_GetFilterCategory();
}
function IN_GetFilterJornada(){
    return API_GetFilterJornada();
}

function IN_GetPlayerByPosition(name){
    return API_GetPlayerByPosition(name);
}

//export {IN_GetLastMatches};

// Example functions:

// function get_raw_data() // returns all data (should not necessary)

// funciton get_match_vs_team(team_name) // al matches between other team
// function get_match_onti_vs_team(team_name)
// function get_match_team_vs_onti(team_name)

// function get_matches_from_player(name)
// function get_matches_from_year(year)