document.addEventListener('DOMContentLoaded', function () {


    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    console.log("id del partido: " + id);

    if(id == null){
        window.location.href = "../matches.html"
    }

    LoadMatch(id);

    
});


function LoadMatch(ID){
    let match = IN_GetMatch(ID);

    console.log(match);

    
    
    
    let title = document.getElementById("match-title");
    if(match.local_visitante == "Visitante"){
        document.title = match.rival + " - " + "Ontinyent 1931";
        title.innerHTML = match.rival + " - " + "Ontinyent 1931";
    }else{
        document.title = "Ontinyent 1931" + " - " + match.rival;
        title.innerHTML = "Ontinyent 1931" + " - " + match.rival;
    }
    document.getElementById("match-campo").innerHTML = match.campo;
    
    let label_result = document.getElementById("match-label-resultado");
    label_result.innerHTML = match.dinamica;

    if (match.dinamica === 'Ganado') {
        console.log("Ganao");
        label_result.classList.add('delivered-status');
    } else if (match.dinamica === 'Perdido') {
        console.log("Perdio");
        label_result.classList.add('cancelled-status');
    } else if (match.dinamica === 'Empatado') {
        console.log("Empatao");
        label_result.classList.add('shipped-status');
    }
    

    document.getElementById("match-resultado").innerHTML = match.resultado;
    document.getElementById("match-oficial").innerHTML = match.oficial;
    document.getElementById("match-tipo").innerHTML = match.tipo_partido;
    document.getElementById("match-jornada").innerHTML = match.jornada;

    const video = document.getElementById("youtube-link");
    if(match.observaciones != "null" && match.observaciones != null){

        video.addEventListener("click", function(){
            window.open(match.observaciones,"_blank");
        });
        console.log("Add event listener");
    }else{
        video.remove();
        console.log("No hay video");
    }
    //video.innerHTML = (match.observaciones != "null" && match.observaciones != null) ? match.observaciones : ''; 

    console.log("Dia semana " + match.dia_sem);

    document.getElementById("match-dia").innerHTML = match.dia_sem + " " + match.dia;
    document.getElementById("match-hora").innerHTML = match.hora;
    
    // Especificaciones
    document.getElementById("match-arbitro").innerHTML = (match.arbitro != "null" && match.arbitro != null && match.arbitro) ? match.arbitro : 'Sin informacion'; 
    document.getElementById("match-asistente1").innerHTML = (match.asistente_1 != "null" && match.asistente_1 != null && match.asistente_1) ? match.asistente_1 : 'Sin informacion'; 
    document.getElementById("match-asistente2").innerHTML = (match.asistente_2 != "null" && match.asistente_2 != null && match.asistente_2) ? match.asistente_2 : 'Sin informacion'; 
    
    document.getElementById("match-min_ganando").innerHTML = match.min_ganando;
    document.getElementById("match-min_perdiendo").innerHTML = match.min_perdiendo;
    document.getElementById("match-min_empatando").innerHTML = match.min_empatando;


    document.getElementById("match-gol_fav_casa").innerHTML = match.goles_a_favor_casa;
    document.getElementById("match-gol_fav_fuera").innerHTML = match.goles_a_favor_fuera;
    document.getElementById("match-gol_contra_casa").innerHTML = match.goles_en_contra_casa;
    document.getElementById("match-gol_contra_fuera").innerHTML = match.goles_en_contra_fuera;


    document.getElementById("match-media_edad").innerHTML = match.med_edad_11_t;
    

}

