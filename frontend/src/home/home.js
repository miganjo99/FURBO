





document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('historia').addEventListener('click', function() {
        console.log("hola historia");
        window.location.href = '/FURBO/frontend/src/history/history.html';
    });

    document.getElementById('partidos').addEventListener('click', function() {
        console.log("hola partidos");
        window.location.href = '/FURBO/frontend/src/matches/matches.html';

    });
    
    document.getElementById('estadio').addEventListener('click', function() {
        console.log("hola estadio");

    });
});