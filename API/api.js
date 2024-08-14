
//import {GetAllOntinyentMatches} from '../backend/src/data_base.js';

function API_GetLastMatches(NumberOfMatches){
    return DB_GetLastMatches(NumberOfMatches);
}

function API_GetAllOntinyentMatches(){
    return DB_GetAllOntinyentMatches();
}
function API_GetFilterDinamica(resultFilter){
    return DB_GetFilterDinamica(resultFilter);
}


function API_GetMatch(ID){
    return DB_GetMatch(ID);
}

function API_GetPlayers(){
    return DB_GetPlayers();
}


function API_GetPlayer(id){
    return DB_GetPlayer(id);
}

function API_GetMaxAmarillasNo_Oficial(){
    return DB_GetMaxAmarillasNo_Oficial();
}

function API_GetMaxAmarillasOficial(){
    return DB_GetMaxAmarillasOficial();
}

function API_GetMaxRojasNo_Oficial(){
    return DB_GetMaxRojasNo_Oficial();
}

function API_GetMaxRojasOficial(){
    return DB_GetMaxRojasOficial();
}

function API_GetMaxGoles() {
    return DB_GetMaxGoles();
}

function API_GetMaxAsistencias(){
    return DB_GetMaxAsistencias();
}

function API_GetMaxConvocatorias(){
    return DB_GetMaxConvocatorias();
}

function API_GetMaxMinJugados(){
    return DB_GetMaxMinJugados();
}

function API_GetMaxTitular(){
    return DB_GetMaxTitular();
}

function API_GetMaxSuplente(){
    return DB_GetMaxSuplente();
}

function API_GetPlayerByName(name){
   return DB_GetPlayerByName(name);
}

function API_GetFilterValues(){
    return DB_GetFilterValues();
}

function API_GetFilterCategory(){
    return DB_GetFilterCategory();
}
function API_GetFilterJornada(){
    return DB_GetFilterJornada();
}

function API_GetPlayerByPosition(name){
    return DB_GetPlayerByPosition(name);
}