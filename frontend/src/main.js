document.addEventListener('DOMContentLoaded', function () {


    let burger = document.getElementById('navTrigger');
    let nav  = document.getElementById('navMenu');

    console.log("Document load");

    burger.addEventListener('click', function(e){
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
});