/*window.addEventListener("scroll", function(){
    let nav = this.document.getElementById("navMenu");

    if(nav.classList.contains("active")){
        this.window.scrollTo(0,0);
        document.body.style.overflow = 'hidden';
    }else{
        document.body.style.overflow = '';
    }
});*/

window.addEventListener("load", function(){

    document.getElementById("navTrigger").addEventListener("click", function(){

        let nav = document.getElementById("navMenu");

        if(nav.classList.contains("active")){
            window.scrollTo(0,0);
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = '';
        }
    });
});