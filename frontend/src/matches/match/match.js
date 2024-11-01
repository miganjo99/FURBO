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


    // Mobile
    if(window.innerWidth < 1024){

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
        
    }else{
        // PC

        // Header
        document.getElementById("campo_nombre").innerHTML = match.campo;

        let rival_nombre = match.rival.replace(/\s+/g, '_');
        rival_nombre = rival_nombre.replace(/[\s']/g, '_');    
        let bgImage = `url('../../data/images/escudos/${rival_nombre}.png')`;

        document.getElementById("partido_numero").innerHTML = "Partido Nº: " + match.partido;


        document.getElementById("resultado_goles").innerHTML = match.resultado;

        if(match.local_visitante == "Visitante"){

            document.getElementById("local_nombre").innerHTML = match.rival + " - " + "Ontinyent 1931";
            document.getElementById("imagen_equipo_local").src = `../../../data/images/escudos/${rival_nombre}.png`;
            document.getElementById("imagen_equipo_visitante").src = '../../../data/images/escudo.png';
        }else{
            document.getElementById("local_nombre").innerHTML = "Ontinyent 1931" + " - " + match.rival;
            document.getElementById("imagen_equipo_visitante").src = `../../../data/images/escudos/${rival_nombre}.png`;
            document.getElementById("imagen_equipo_local").src = '../../../data/images/escudo.png';
        }

        let label_result = document.getElementById("partido_dinamica");
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

        // Info

        document.getElementById("partido_temporada").innerHTML = match.temporada;
        document.getElementById("partido_fecha").innerHTML = match.dia + " - " + match.hora;
        document.getElementById("partido_amistoso").innerHTML = match.tipo_partido;

        // Minutos

        document.getElementById("partido_primera").innerHTML = "1ª Parte: " + match.primera_parte;
        document.getElementById("partido_segunda").innerHTML = "2ª Parte: " + match.segunda_parte;

        let min_perdiendo = match.min_perdiendo;
        let min_ganando = match.min_ganando;
        let min_empatando = match.min_empatando;

        let min_totales = min_perdiendo + min_ganando + min_empatando;

        let perdiendo_percent = (min_perdiendo * 100.0) / min_totales;
        let ganando_percent = (min_ganando * 100.0) / min_totales;
        let empatando_percent = (min_empatando * 100.0) / min_totales;

        console.log("Perdiendo: " + perdiendo_percent)
        console.log("Ganando: " + ganando_percent)
        console.log("Empatando: " + empatando_percent)

        // Le sumo 2 porque si es muy bajo sin llegar a 0, ocupa tan poquito que el numero se sale fuera
        const tolerance = 2; // El limite para sumarle 2 y que se vea un poco

        let only_empatado = true;
        let remove_ganando = false;
        let remove_perdiendo = false;
        let remove_empatando = false;

        setTimeout(() =>{

            let formated = perdiendo_percent;
            if(formated < tolerance && formated > 0) formated += 2;
            document.getElementById("min_perdiendo").style.width = formated + "%";
            
            formated = ganando_percent;
            if(formated < tolerance && formated > 0) formated += 2;
            document.getElementById("min_ganando").style.width = formated + "%";
            
            formated = empatando_percent
            if(formated < tolerance && formated > 0) formated += 2;
            document.getElementById("min_empatando").style.width = formated + "%";
            
            if(perdiendo_percent > 0){
                document.getElementById("minutos_perdiendo_num").innerHTML = Math.floor(perdiendo_percent) + "%";
                only_empatado = false;
            }else{
                document.getElementById("minutos_perdiendo_num").innerHTML = "";
               
                
                // le ponemos border radius al verde porque no existe rojo
                let element = document.getElementById("min_ganando");
                element.style.borderTopLeftRadius = "5px";
                element.style.borderBottomLeftRadius = "5px";

                remove_perdiendo = true;
            }

            
            if(ganando_percent > 0){
                document.getElementById("minutos_ganando_num").innerHTML = Math.floor(ganando_percent) + "%";
                only_empatado = false;
            }else{
                document.getElementById("minutos_ganando_num").innerHTML = "";
                remove_ganando = true;
            }
            
            if(empatando_percent > 0){
                document.getElementById("minutos_empatando_num").innerHTML = Math.floor(empatando_percent) + "%";
                
                // Si han quedado 0-0 o han estado todo el santo partido empatados, solo existe el amarillo y le pongo el borde redondo en todos lados del amarillo
                if(only_empatado){
                    let element = document.getElementById("min_empatando");
                    element.style.borderTopLeftRadius = "5px";
                    element.style.borderBottomLeftRadius = "5px";
                }
            }else{
                document.getElementById("minutos_empatando_num").innerHTML = "";
                remove_empatando = true;
            }

        }, 1000);

        setTimeout(()=>{
            if(remove_ganando)document.getElementById("min_ganando").classList.remove("minutos_ganados_bar");
            if(remove_perdiendo)document.getElementById("min_perdiendo").classList.remove("minutos_perdidos_bar");   
            if(remove_empatando)document.getElementById("min_empatando").classList.remove("minutos_empatados_bar");;
        },2900);
            
        if(match.observaciones != null && match.observaciones != "null" && match.observaciones != 0){
            let videoUrl = match.observaciones;

            // Si es una URL de YouTube con 'watch?v=', convierte a formato embed
            if (videoUrl.includes("youtube.com/watch?v=")) {
                let videoId = videoUrl.split("v=")[1];  // Obtén el ID del video (después de 'v=')
                videoId = videoId.split("&")[0];        // Elimina posibles parámetros adicionales ('&')
                videoUrl = `https://www.youtube.com/embed/${videoId}`;
            }
        
            // Asigna el nuevo src al iframe
            document.getElementById("match_video").src = videoUrl;
        }else{
            document.getElementById("video_unavailable").innerHTML = "Video no disponible";
            document.getElementById("match_video").style.display = "none";
        }

        // Table

        let match_players = IN_GetPlayerFromMatch(ID);
        console.log(match_players);

        let table_body = document.getElementById("match-table-body");
        let table_body_suplente = document.getElementById("match-table-body_suplentes");

        match_players.map((value) => {
            let row = document.createElement("tr");
            row.classList.add("match-table-body_element");

            let row_value = document.createElement("td");
            row_value.classList.add("match_title");
            row_value.classList.add("resalted");
            //row_value.innerHTML = value.jugador;

            let player_link = document.createElement("a");
            let player_info = IN_GetPlayerByName(value.jugador);
            player_link.href = "../../players/player/player.html?id=" + player_info[0].id_jugador;
            player_link.innerHTML = value.jugador;
            row_value.appendChild(player_link);

            row.appendChild(row_value);
            
            row_value = document.createElement("td");
            row_value.classList.add("match_title");
            row_value.innerHTML = value.minutos_jugados;
            row.appendChild(row_value);
            
            row_value = document.createElement("td");
            row_value.classList.add("match_title");
            row_value.innerHTML = value.goles != 0? value.goles: "-";
            if(value.goles > 0)row_value.classList.add("color-green", "resalted");
            if(value.goles < 0)row_value.classList.add("color-red", "resalted");
            row.appendChild(row_value);
            
            row_value = document.createElement("td");
            row_value.classList.add("match_title");
            if(value.asistencias > 0)row_value.classList.add("color-green", "resalted");
            row_value.innerHTML = row_value.innerHTML = value.asistencias > 0? value.asistencias: "-";
            row.appendChild(row_value);
            
            row_value = document.createElement("td");
            row_value.classList.add("match_title");
            if(value.amarilla > 0)row_value.classList.add("color-red", "resalted");
            row_value.innerHTML = row_value.innerHTML = value.amarilla > 0? value.amarilla: "-";
            row.appendChild(row_value);
            
            row_value = document.createElement("td");
            row_value.classList.add("match_title");
            if(value.roja > 0)row_value.classList.add("color-red", "resalted");
            row_value.innerHTML = row_value.innerHTML = value.roja > 0? value.roja: "-";
            row.appendChild(row_value);
            
            row_value = document.createElement("td");
            row_value.classList.add("match_title");
            //row_value.innerHTML = Math.floor(value.edad);
            row_value.innerHTML = value.edad;
            row.appendChild(row_value);


            if(value.suplente == 0){
                table_body.appendChild(row);
            }else{
                table_body_suplente.appendChild(row);
            }

        })
    }
        
}
    
    