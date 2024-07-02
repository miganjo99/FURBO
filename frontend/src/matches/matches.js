//import {IN_GetLastMatches} from '../../intermediate/intermediate.js';

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    GetLastMatches();
});



function GetLastMatches(){
    let data = IN_GetLastMatches(5);
    console.log(data);

    const table = document.getElementById("match-table-body");
    table.innerHTML = '';

    data.forEach(match => {
        const row = document.createElement('tr');

        // Columna de Fecha
        const dateCell = document.createElement('td');
        dateCell.textContent = match.dia;
        row.appendChild(dateCell);

        // Columna de Equipo Local
        const localTeamCell = document.createElement('td');
        localTeamCell.textContent = match.local_visitante === 'Local' ? 'Ontinyent 1931' : match.rival;
        row.appendChild(localTeamCell);

        // Columna de Resultado
        const scoreCell = document.createElement('td');
        scoreCell.textContent = match.resultado;
        row.appendChild(scoreCell);

        // Columna de Equipo Visitante
        const visitorTeamCell = document.createElement('td');
        visitorTeamCell.textContent = match.local_visitante === 'Visitante' ? 'Ontinyent 1931' : match.rival;
        row.appendChild(visitorTeamCell);

        table.appendChild(row);
    });
}


