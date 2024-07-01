
//import {GetAllOntinyentMatches} from '../backend/src/data_base.js';

function API_GetLastMatches(NumberOfMatches){

    let data = GetAllOntinyentMatches();
    console.log(data);

    let tmp = [];

    let max_jornada = data[0].JORNADA;

    data.map((value) =>{
        if(value.JORNADA > max_jornada) max_jornada = value.JORNADA;
    })

    console.log("Ultima jornada: " + max_jornada)
    // proceso de normalizacion (opcional, igual no hay que hacer nada)

    return data;
}

//export {API_GetLastMatches};