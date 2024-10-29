


// Función para ejecutar después de que el widget se haya cargado
function onWidgetLoad() {
    console.log('El widget de Twitter ha sido cargado');
    // Aquí puedes realizar cualquier acción que desees
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Seteando callback");
    estadisticas();
    // Asegúrate de que el widget de Twitter esté cargado
    window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], 
        t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s); 
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
        
        js.onload = function() {
            t._e = [];
            t.ready = function(f) {
                t._e.push(f);
            };
            t.ready(onWidgetLoad);
        };
        
        return t;
    }(document, "script", "twitter-wjs"));
});



// let estadisticas = IN_GetAllOntinyentMatches();
function estadisticas() {
    let estadisticas = IN_GetAllOntinyentMatches();
    let players = IN_GetPlayers();

    console.log(estadisticas);
    // console.log(players);

    let total_victorias = 0;
    let total_derrotas = 0;
    let total_empates = 0;
    let total_partidos = 0;
    let total_goles_a_favor = 0;
    let total_goles_en_contra = 0;
    let total_jugadores = 0;


    let temporadasUnicas = new Set();
    let arbitrosUnicos = new Set();
    let rivalesUnicos = new Set();
    let camposUnicos = new Set();

    estadisticas.forEach(partido => {
        // Contar victorias, empates y derrotas
        if (partido.dinamica === "Ganado") {
            total_victorias++;
        } else if (partido.dinamica === "Perdido") {
            total_derrotas++;
        } else if (partido.dinamica === "Empatado") {
            total_empates++;
        }
        
        // Contar partidos totales
        if (partido.dinamica) {
            total_partidos++;
        }

        // Contar temporadas únicas
        if (partido.temporada) {
            temporadasUnicas.add(partido.temporada);
        }

        // Contar goles a favor y en contra
        total_goles_a_favor += partido.goles_a_favor_casa + partido.goles_a_favor_fuera;
        total_goles_en_contra += partido.goles_en_contra_casa + partido.goles_en_contra_fuera;

        // Contar árbitros, rivales y campos únicos
        if (partido.arbitro) {
            arbitrosUnicos.add(partido.arbitro);
        }
        if (partido.rival) {
            rivalesUnicos.add(partido.rival);
        }
        if (partido.campo) {
            camposUnicos.add(partido.campo);
        }
    });
    players.forEach(jugador => {
        if (jugador.jugador) {
            total_jugadores++;
        } 
    });

    // Totales para cada conjunto de valores únicos
    let total_temporadas = temporadasUnicas.size;
    let total_arbitros = arbitrosUnicos.size;
    let total_rivales = rivalesUnicos.size;
    let total_campos = camposUnicos.size;

    const infoContainer = document.querySelector(".info_contaienr");
    infoContainer.innerHTML = "";

    const tabla = document.createElement("table");

    // Fila para Total Temporadas
    const filaTemporadas = document.createElement("tr");
    const thTemporadas = document.createElement("th");
    thTemporadas.textContent = "Temporadas";
    const tdTemporadas = document.createElement("td");
    tdTemporadas.textContent = total_temporadas;
    filaTemporadas.appendChild(thTemporadas);
    filaTemporadas.appendChild(tdTemporadas);

    // Fila para Total jugadores
    const filaJugadores = document.createElement("tr");
    const thJugadores = document.createElement("th");
    thJugadores.textContent = "Jugadores";
    const tdJugadores = document.createElement("td");
    tdJugadores.textContent = total_jugadores;
    filaJugadores.appendChild(thJugadores);
    filaJugadores.appendChild(tdJugadores);

    // Fila para Total Partidos
    const filaPartidos = document.createElement("tr");
    const thPartidos = document.createElement("th");
    thPartidos.textContent = "Partidos";
    const tdPartidos = document.createElement("td");
    tdPartidos.textContent = total_partidos;
    filaPartidos.appendChild(thPartidos);
    filaPartidos.appendChild(tdPartidos);

    // Fila para Total Victorias
    const filaVictorias = document.createElement("tr");
    const thVictorias = document.createElement("th");
    thVictorias.textContent = "Victorias";
    const tdVictorias = document.createElement("td");
    tdVictorias.textContent = total_victorias;
    filaVictorias.appendChild(thVictorias);
    filaVictorias.appendChild(tdVictorias);

    // Fila para Total Empates
    const filaEmpates = document.createElement("tr");
    const thEmpates = document.createElement("th");
    thEmpates.textContent = "Empates";
    const tdEmpates = document.createElement("td");
    tdEmpates.textContent = total_empates;
    filaEmpates.appendChild(thEmpates);
    filaEmpates.appendChild(tdEmpates);

    // Fila para Total Derrotas
    const filaDerrotas = document.createElement("tr");
    const thDerrotas = document.createElement("th");
    thDerrotas.textContent = "Derrotas";
    const tdDerrotas = document.createElement("td");
    tdDerrotas.textContent = total_derrotas;
    filaDerrotas.appendChild(thDerrotas);
    filaDerrotas.appendChild(tdDerrotas);

    // Fila para Goles a Favor
    const filaGolesFavor = document.createElement("tr");
    const thGolesFavor = document.createElement("th");
    thGolesFavor.textContent = "Goles a Favor";
    const tdGolesFavor = document.createElement("td");
    tdGolesFavor.textContent = total_goles_a_favor;
    filaGolesFavor.appendChild(thGolesFavor);
    filaGolesFavor.appendChild(tdGolesFavor);

    // Fila para Goles en Contra
    const filaGolesContra = document.createElement("tr");
    const thGolesContra = document.createElement("th");
    thGolesContra.textContent = "Goles en Contra";
    const tdGolesContra = document.createElement("td");
    tdGolesContra.textContent = total_goles_en_contra;
    filaGolesContra.appendChild(thGolesContra);
    filaGolesContra.appendChild(tdGolesContra);

    // Fila para Total Árbitros
    const filaArbitros = document.createElement("tr");
    const thArbitros = document.createElement("th");
    thArbitros.textContent = "Árbitros";
    const tdArbitros = document.createElement("td");
    tdArbitros.textContent = total_arbitros;
    filaArbitros.appendChild(thArbitros);
    filaArbitros.appendChild(tdArbitros);

    // Fila para Total Rivales
    const filaRivales = document.createElement("tr");
    const thRivales = document.createElement("th");
    thRivales.textContent = "Rivales";
    const tdRivales = document.createElement("td");
    tdRivales.textContent = total_rivales;
    filaRivales.appendChild(thRivales);
    filaRivales.appendChild(tdRivales);

    // Fila para Total Campos
    const filaCampos = document.createElement("tr");
    const thCampos = document.createElement("th");
    thCampos.textContent = "Campos";
    const tdCampos = document.createElement("td");
    tdCampos.textContent = total_campos;
    filaCampos.appendChild(thCampos);
    filaCampos.appendChild(tdCampos);

    // Añadir todas las filas a la tabla
    tabla.appendChild(filaTemporadas);
    tabla.appendChild(filaJugadores);
    tabla.appendChild(filaPartidos);
    tabla.appendChild(filaVictorias);
    tabla.appendChild(filaEmpates);
    tabla.appendChild(filaDerrotas);
    tabla.appendChild(filaGolesFavor);
    tabla.appendChild(filaGolesContra);
    tabla.appendChild(filaArbitros);
    tabla.appendChild(filaRivales);
    tabla.appendChild(filaCampos);

    // Añadir la tabla al contenedor
    infoContainer.appendChild(tabla);
}

estadisticas();








// document.addEventListener('DOMContentLoaded', function() {
//     const links = document.querySelectorAll("[data-page-link]");
//     const overlay = document.querySelector(".overlay__scene");
//     const label = document.querySelector(".overlay__label-content");

//     const ANIMATION_TIME = 400;
//     links.forEach((link) => {
//         const href = link.getAttribute("href");
//         const title = link.getAttribute("title");
//         const target = document.querySelector(href);

//         link.addEventListener("click", (e) => {
//             e.preventDefault();
//             if (!target) return;

//             const currentTarget = document.querySelector(".page__content--active");

//             overlay.classList.remove("overlay__scene--in");
//             overlay.classList.remove("overlay__scene--out");

//             overlay.classList.add("overlay__scene--in");

//             label.innerText = title;

//             setTimeout(() => {
//                 if (currentTarget)
//                     currentTarget.classList.remove("page__content--active");

//                 // Random loading time after the overlay rolls in
//                 setTimeout(() => {
//                     target.classList.add("page__content--active");
//                     overlay.classList.add("overlay__scene--out");
//                 }, Math.random() * 400 + 400);
//             }, ANIMATION_TIME);
//         });
//     });

//     // Optionally trigger the first link click
//     // links[0].click();
// });






// document.addEventListener('DOMContentLoaded', function() {
//     function createCarousel() {
//         const carouselHTML = `
//             <div class="glider-contain">
//                 <button class="glider-prev">«</button>
//                 <div class="glider">
//                     <div class="glider-slide" id="historia">
//                         <img src="/FURBO/frontend/data/images/trofeo.png" alt="History">
//                         <div class="glider-slide-title">HISTORIA</div>
//                     </div>
//                     <div class="glider-slide" id="partidos">
//                         <img src="/FURBO/frontend/data/images/bota-de-futbol.png" alt="Matches">
//                         <div class="glider-slide-title">PARTIDOS</div>
//                     </div>
//                     <div class="glider-slide" id="estadio">
//                         <img src="/FURBO/frontend/data/images/estadio.png" alt="Stadium">
//                         <div class="glider-slide-title">ESTADIO</div>
//                     </div>
//                 </div>
//                 <button class="glider-next">»</button>
//                 <div id="dots"></div>
//             </div>
//         `;

//         const carrouselMenu = document.querySelector('.carrousel_menu');
//         carrouselMenu.innerHTML = ''; // Clear any existing content
//         carrouselMenu.innerHTML = carouselHTML;

        
//         new Glider(document.querySelector('.glider'), {
//             slidesToShow: 5,
//             slidesToScroll: 1,
//             draggable: true,
//             dots: '.dots',
//             arrows: {
//             prev: '.glider-prev',
//             next: '.glider-next'
//             }
//         });


//         document.getElementById('historia').addEventListener('click', function() {
//             console.log("hola historia");
//             window.location.href = '/FURBO/frontend/src/history/history.html';
//         });

//         document.getElementById('partidos').addEventListener('click', function() {
//             console.log("hola partidos");
//             window.location.href = '/FURBO/frontend/src/matches/matches.html';
//         });

//         document.getElementById('estadio').addEventListener('click', function() {
//             console.log("hola estadio");
//             window.location.href = '/FURBO/frontend/src/stadium/stadium.html';
//         });

//     }

//     createCarousel();
// });


