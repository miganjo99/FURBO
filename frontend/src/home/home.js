





document.addEventListener('DOMContentLoaded', function () {

    /*document.getElementById('historia').addEventListener('click', function() {
        console.log("hola historia");
        window.location.href = '/FURBO/frontend/src/history/history.html';
    });

    document.getElementById('partidos').addEventListener('click', function() {
        console.log("hola partidos");
        window.location.href = '/FURBO/frontend/src/matches/matches.html';

    });
    
    document.getElementById('estadio').addEventListener('click', function() {
        console.log("hola estadio");
        window.location.href = '/FURBO/frontend/src/stadium/stadium.html';

    });*/


    let burger = document.getElementById('navTrigger');
    let nav  = document.getElementById('navMenu');
    
    console.log("Document load");

    console.log(burger);
    console.log(nav);
    
    burger.addEventListener('click', function(e){
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
});