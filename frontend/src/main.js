document.addEventListener('DOMContentLoaded', function () {


    let burger = document.getElementById('navTrigger');
    let nav  = document.getElementById('navMenu');
    let img_escudo = document.getElementById("header-logo");

    console.log("Document load");

    burger.addEventListener('click', function(e){
        this.classList.toggle('active');
        nav.classList.toggle('active');
        img_escudo.ATTRIBUTE_NODE.classList.toggle('active');
    });
});