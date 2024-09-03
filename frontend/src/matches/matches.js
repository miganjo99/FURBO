//import {IN_GetLastMatches} from '../../intermediate/intermediate.js';

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    // GetLastMatches();
    TableController();
    LoadFiltersCategory();
    LoadFiltersJornada();
    LoadFiltersTemporadas();
    FiltersMatches();

     // Obtener el botón de filtrar
     let filter_button = document.getElementById("applyFilters");

     // Añadir un listener para ejecutar ApplyFilters cuando se haga clic en el botón
     if (filter_button) {
         filter_button.addEventListener("click", FiltersMatches);
     } else {
         console.error("El botón de filtro no se encontró.");
     }


     LoadChatBot();

});

function LoadFiltersCategory(){

    let category_values = IN_GetFilterCategory();
  
    let category_element = document.getElementById("categoryFilter");
  
    category_element.innerHTML = "";
    let opt_all = document.createElement("option");
    opt_all.value = "Todas";
    opt_all.innerHTML = "Todas";
    category_element.appendChild(opt_all);
  
    category_values.map((value) => {  
      let opt = document.createElement("option");
      opt.value = value;
      opt.innerHTML = value;
      category_element.appendChild(opt);
    });
    

  }
function LoadFiltersTemporadas(){

    let season_values = IN_GetFilterTemporadas();
  
    let season_element = document.getElementById("seasonFilter");
  
    season_element.innerHTML = "";
    let opt_all = document.createElement("option");
    opt_all.value = "Todas";
    opt_all.innerHTML = "Todas";
    season_element.appendChild(opt_all);
  
    season_values.map((value) => {  
      let opt = document.createElement("option");
      opt.value = value;
      opt.innerHTML = value;
      season_element.appendChild(opt);
    });
    

  }
function LoadFiltersJornada(){

    let Jornada_values = IN_GetFilterJornada();
  
    let Jornada_element = document.getElementById("jornadaFilter");
  
    Jornada_element.innerHTML = "";
    let opt_all = document.createElement("option");
    opt_all.value = "Todas";
    opt_all.innerHTML = "Todas";
    Jornada_element.appendChild(opt_all);
  
    Jornada_values.map((value) => {  
      let opt = document.createElement("option");
      opt.value = value;
      opt.innerHTML = value;
      Jornada_element.appendChild(opt);
    });
    

  }


  function FiltersMatches(is_mobile = false) {
    let partidos = IN_GetAllOntinyentMatches();

    let resultFilter = document.getElementById("resultFilter").value;
    if (resultFilter !== "all") {  
        partidos = partidos.filter(partido => partido.dinamica === resultFilter);
    }

    // console.log("partidos");
    // console.log(partidos);
    // console.log("partidos");

    // Aplicar filtro de categoría
    let tipoFilter = document.getElementById("categoryFilter").value;
    if (tipoFilter !== "Todas") {  
        partidos = partidos.filter(partido => partido.categoria === tipoFilter);
    }


    let seasonFilter = document.getElementById("seasonFilter").value;
    console.log(seasonFilter);
    if (seasonFilter !== "Todas") {
        partidos = partidos.filter(partido => partido.temporada === seasonFilter);
        console.log("partidos season");
        console.log(partidos);
        console.log("partidos season");
    }

    let jornadaFilter = document.getElementById("jornadaFilter").value;
    if (jornadaFilter !== "Todas") {
        partidos = partidos.filter(partido => partido.jornada === jornadaFilter);
    }

    // // Si no se encontraron partidos, cargar los ultimos 50
    if (partidos.length === 0) {
        //partidos = IN_GetLastMatches(50);
        //toaster?????
        
        console.log("No se encontraron partidos para los filtros seleccionados.");
    } else {
        //console.log("Partidos filtrados: ", partidos);
    }




    PrintMatches(partidos);
}



// function GetLastMatches(){
//     let data = IN_GetLastMatches(50);
//     console.log(data);

//     const table = document.getElementById("match-table-body");
//     table.innerHTML = '';

//     // Si estamos en pc
//     data.forEach(match => {
//         const row = document.createElement('tr');
//         row.classList.add("match-table-body_element");

//         // Columna de Jornada con enlace
//         const jornadaCell = document.createElement('td');
//         const jornadaLink = document.createElement('a');
//         jornadaLink.href = ""; // Asigna la URL apropiada si es necesario
//         jornadaLink.textContent = `Jornada ${match.jornada}`;
//         jornadaCell.appendChild(jornadaLink);
//         row.appendChild(jornadaCell);

//         // Columna de Equipos
//         const teamsCell = document.createElement('td');
//         const localTeam = match.local_visitante === 'Local' ? 'Ontinyent 1931' : match.rival;
//         const visitorTeam = match.local_visitante === 'Visitante' ? 'Ontinyent 1931' : match.rival;
//         teamsCell.textContent = `${localTeam} - ${visitorTeam}`;
//         row.appendChild(teamsCell);

//         // Columna de Dinámica con clase
//         const dynamicCell = document.createElement('td');
//         const dynamicSpan = document.createElement('span');
//         //dynamicSpan.classList.add('shipped-status'); // Cambiar la clase según la dinámica
//         if (match.dinamica === 'Ganado') {
//             dynamicSpan.classList.add('delivered-status');
//             dynamicSpan.textContent = 'Ganado';

//         } else if (match.dinamica === 'Perdido') {
//             dynamicSpan.classList.add('cancelled-status');
//             dynamicSpan.textContent = 'Perdido';

//         } else if (match.dinamica === 'Empatado') {
//             dynamicSpan.classList.add('shipped-status');
//             dynamicSpan.textContent = 'Empatado';
//         }
//         dynamicCell.appendChild(dynamicSpan);
//         row.appendChild(dynamicCell);

//         // Columna de Fecha
//         const dateCell = document.createElement('td');
//         dateCell.textContent = match.dia;
//         row.appendChild(dateCell);

//         // Columna de Resultado
//         const scoreCell = document.createElement('td');
//         scoreCell.textContent = match.resultado;
//         row.appendChild(scoreCell);

//         table.appendChild(row);
//     });

//     const table_mobile = document.getElementById("matches-tables-mobile");
//     table_mobile.innerHTML = '';

//     // Si estamos en movil
//     data.forEach(match => {
//         const item = document.createElement('div');
//         item.classList.add('grid-item');
//         item.addEventListener("click", function(){
//             window.location.href = "./match/match.html?id=" + match.partido;
//         });

//         // Parte superior de la grid-item
//         const topDiv = document.createElement('div');
//         topDiv.classList.add('grid-top');

//         // Enlace de Jornada
//         const jornadaDiv = document.createElement('div');
//         const jornadaLink = document.createElement('p');
//         jornadaLink.href = "#"; // Asigna la URL apropiada si es necesario
//         jornadaLink.classList.add('grid-a');
//         if(typeof(match.jornada) == 'number'){
//             jornadaLink.textContent = `Jornada ${match.jornada}`;
//         }else{
//             jornadaLink.textContent = `${match.jornada}`;
//         }
//         jornadaDiv.appendChild(jornadaLink);
//         topDiv.appendChild(jornadaDiv);

//         // Fecha
//         const dateDiv = document.createElement('div');
//         dateDiv.classList.add('grid-date');
//         dateDiv.textContent = match.dia;
//         topDiv.appendChild(dateDiv);

//         // Dinámica con clase
//         const dynamicDiv = document.createElement('div');
//         const dynamicSpan = document.createElement('span');
//         if (match.dinamica === 'Ganado') {
//             dynamicSpan.classList.add('delivered-status');
//             dynamicSpan.textContent = 'Ganado';
//         } else if (match.dinamica === 'Perdido') {
//             dynamicSpan.classList.add('cancelled-status');
//             dynamicSpan.textContent = 'Perdido';
//         } else if (match.dinamica === 'Empatado') {
//             dynamicSpan.classList.add('shipped-status');
//             dynamicSpan.textContent = 'Empatado';
//         }
//         dynamicDiv.appendChild(dynamicSpan);
//         topDiv.appendChild(dynamicDiv);

//         item.appendChild(topDiv);

//         // Descripción del partido (Equipos)
//         const descDiv = document.createElement('div');
//         descDiv.classList.add('grid-desc');
//         const localTeam = match.local_visitante === 'Local' ? 'Ontinyent 1931' : match.rival;
//         const visitorTeam = match.local_visitante === 'Visitante' ? 'Ontinyent 1931' : match.rival;
//         descDiv.textContent = `${localTeam} - ${visitorTeam}`;
//         item.appendChild(descDiv);

//         // Resultado del partido
//         const scoreDiv = document.createElement('div');
//         scoreDiv.classList.add('grid-price');
//         scoreDiv.textContent = match.resultado;
//         item.appendChild(scoreDiv);

//         table_mobile.appendChild(item);
//     });

// }
function PrintMatches(data) {
    console.log("data PrintMatches");
    //console.log(data);

    const table = document.getElementById("match-table-body");
    table.innerHTML = '';

    if (data.length === 0) {
        const noMatchesRow = document.createElement('tr');
        const noMatchesCell = document.createElement('td');
        noMatchesCell.colSpan = 5; // Asegura que el mensaje ocupe todas las columnas
        noMatchesCell.textContent = 'No se encontraron partidos para los filtros seleccionados.';
        noMatchesCell.classList.add('no-matches'); // Puedes añadir una clase para estilos personalizados
        noMatchesRow.appendChild(noMatchesCell);
        table.appendChild(noMatchesRow);
    } else {
        // Si estamos en PC
        data.forEach(match => {
            const row = document.createElement('tr');
            row.classList.add("match-table-body_element");
            row.addEventListener("click", function(){
                window.location.href = "./match/match.html?id=" + match.partido;
            });

            // Columna de Jornada con enlace
            const jornadaCell = document.createElement('td');
            const jornadaLink = document.createElement('p');
            //jornadaLink.href = "./match/match.html?id=" + match.partido;
            jornadaLink.textContent = `Jornada ${match.jornada}`;
            if(match.jornada == '0'){
                jornadaLink.textContent = 'Amistoso';
            }
            jornadaCell.appendChild(jornadaLink);
            row.appendChild(jornadaCell);

            // Columna de Equipos
            const teamsCell = document.createElement('td');
            const localTeam = match.local_visitante === 'Local' ? 'Ontinyent 1931' : match.rival;
            const visitorTeam = match.local_visitante === 'Visitante' ? 'Ontinyent 1931' : match.rival;
            teamsCell.textContent = `${localTeam} - ${visitorTeam}`;
            teamsCell.classList.add("match_title")
            row.appendChild(teamsCell);

            // Columna de Dinámica con clase
            const dynamicCell = document.createElement('td');
            const dynamicSpan = document.createElement('span');
            if (match.dinamica === 'Ganado') {
                dynamicSpan.classList.add('delivered-status');
                dynamicSpan.textContent = 'Ganado';

            } else if (match.dinamica === 'Perdido') {
                dynamicSpan.classList.add('cancelled-status');
                dynamicSpan.textContent = 'Perdido';

            } else if (match.dinamica === 'Empatado') {
                dynamicSpan.classList.add('shipped-status');
                dynamicSpan.textContent = 'Empatado';
            }
            dynamicCell.appendChild(dynamicSpan);
            row.appendChild(dynamicCell);

            // Columna de Fecha
            const dateCell = document.createElement('td');
            dateCell.textContent = match.dia;
            row.appendChild(dateCell);

            // Columna de Resultado
            const scoreCell = document.createElement('td');
            scoreCell.textContent = match.resultado;
            scoreCell.classList.add("match_title");
            row.appendChild(scoreCell);

            table.appendChild(row);
        });
    }

    const table_mobile = document.getElementById("matches-tables-mobile");
    table_mobile.innerHTML = '';

    if (data.length === 0) {
        const noMatchesDiv = document.createElement('div');
        noMatchesDiv.classList.add('no-matches'); // Clase para estilos personalizados
        noMatchesDiv.textContent = 'No se encontraron partidos para los filtros seleccionados.';
        table_mobile.appendChild(noMatchesDiv);
    } else {
        // Si estamos en móvil
        data.forEach(match => {
            const item = document.createElement('div');
            item.classList.add('grid-item');
            item.addEventListener("click", function(){
                window.location.href = "./match/match.html?id=" + match.partido;
            });

            // Parte superior de la grid-item
            const topDiv = document.createElement('div');
            topDiv.classList.add('grid-top');

            // Enlace de Jornada
            const jornadaDiv = document.createElement('div');
            const jornadaLink = document.createElement('p');
            jornadaLink.href = "#"; // Asigna la URL apropiada si es necesario
            jornadaLink.classList.add('grid-a');

            if(match.jornada == '0'){
                jornadaLink.textContent = 'Amistoso';
            }
            else if(typeof(match.jornada) == 'number'){
                jornadaLink.textContent = `Jornada ${match.jornada}`;
            }
            else{
                jornadaLink.textContent = `${match.jornada}`;
            }
            jornadaDiv.appendChild(jornadaLink);
            topDiv.appendChild(jornadaDiv);

            // Fecha
            const dateDiv = document.createElement('div');
            dateDiv.classList.add('grid-date');
            dateDiv.textContent = match.dia;
            topDiv.appendChild(dateDiv);

            // Dinámica con clase
            const dynamicDiv = document.createElement('div');
            const dynamicSpan = document.createElement('span');
            if (match.dinamica === 'Ganado') {
                dynamicSpan.classList.add('delivered-status');
                dynamicSpan.textContent = 'Ganado';
            } else if (match.dinamica === 'Perdido') {
                dynamicSpan.classList.add('cancelled-status');
                dynamicSpan.textContent = 'Perdido';
            } else if (match.dinamica === 'Empatado') {
                dynamicSpan.classList.add('shipped-status');
                dynamicSpan.textContent = 'Empatado';
            }
            dynamicDiv.appendChild(dynamicSpan);
            topDiv.appendChild(dynamicDiv);

            item.appendChild(topDiv);

            // Descripción del partido (Equipos)
            const descDiv = document.createElement('div');
            descDiv.classList.add('grid-desc');
            const localTeam = match.local_visitante === 'Local' ? 'Ontinyent 1931' : match.rival;
            const visitorTeam = match.local_visitante === 'Visitante' ? 'Ontinyent 1931' : match.rival;
            descDiv.textContent = `${localTeam} - ${visitorTeam}`;
            item.appendChild(descDiv);

            // Resultado del partido
            const scoreDiv = document.createElement('div');
            scoreDiv.classList.add('grid-price');
            scoreDiv.textContent = match.resultado;
            item.appendChild(scoreDiv);

            table_mobile.appendChild(item);
        });
    }
}



function TableController(){
    document.addEventListener('DOMContentLoaded', () => {
        const tableRows = document.querySelectorAll('.table tbody tr');
        const gridItems = document.querySelectorAll('.grid-item');
    
        tableRows.forEach((row, index) => {
            row.addEventListener('click', () => {
                highlightItem(index);
            });
        });
    
        gridItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                highlightItem(index);
            });
        });
    
        function highlightItem(index) {
            tableRows.forEach(row => row.classList.remove('highlight'));
            gridItems.forEach(item => item.classList.remove('highlight'));
    
            tableRows[index].classList.add('highlight');
            gridItems[index].classList.add('highlight');
        }
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const tableRows = document.querySelectorAll('.table tbody tr');
        const gridItems = document.querySelectorAll('.grid-item');
    
        // Highlight rows and grid items on click
        tableRows.forEach((row, index) => {
            row.addEventListener('click', () => {
                highlightItem(index);
            });
        });
    
        gridItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                highlightItem(index);
            });
        });
    
        function highlightItem(index) {
            tableRows.forEach(row => row.classList.remove('highlight'));
            gridItems.forEach(item => item.classList.remove('highlight'));
    
            tableRows[index].classList.add('highlight');
            gridItems[index].classList.add('highlight');
        }
    
        // Filter orders by status
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const status = btn.getAttribute('data-status');
                filterByStatus(status);
            });
        });
    
        function filterByStatus(status) {
            tableRows.forEach((row, index) => {
                const rowStatus = row.querySelector('span').textContent.toLowerCase();
                if (status === 'all' || rowStatus === status) {
                    row.style.display = '';
                    gridItems[index].style.display = '';
                } else {
                    row.style.display = 'none';
                    gridItems[index].style.display = 'none';
                }
            });
        }
    
        /// Sort orders by date
        document.querySelector('.sort-btn').addEventListener('click', () => {
            sortByDate();
        });
    
        function sortByDate() {
            const rowsArray = Array.from(tableRows);
            const itemsArray = Array.from(gridItems);
    
            rowsArray.sort((a, b) => {
                const dateA = new Date(a.children[3].textContent);
                const dateB = new Date(b.children[3].textContent);
                return dateA - dateB;
            });
    
            itemsArray.sort((a, b) => {
                const dateA = new Date(a.querySelector('.grid-date').textContent);
                const dateB = new Date(b.querySelector('.grid-date').textContent);
                return dateA - dateB;
            });
    
            const tableBody = document.querySelector('.table tbody');
            tableBody.innerHTML = '';
            rowsArray.forEach(row => tableBody.appendChild(row));
    
            const gridContainer = document.querySelector('.grid-container');
            gridContainer.innerHTML = '';
            itemsArray.forEach(item => gridContainer.appendChild(item));
        }
    
            // Search orders by details
            document.querySelector('.search-input').addEventListener('input', (event) => {
                const query = event.target.value.toLowerCase();
                searchOrders(query);
            });
    
            function searchOrders(query) {
                tableRows.forEach((row, index) => {
            const details = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            if (details.includes(query)) {
                row.style.display = '';
                gridItems[index].style.display = '';
            } else {
                row.style.display = 'none';
                gridItems[index].style.display = 'none';
            }
        });
        }
    });
    
    
    
}

