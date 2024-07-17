window.addEventListener("scroll", function(){
    let nav = this.document.getElementById("navMenu");

    if(nav.classList.contains("active")){
        this.window.scrollTo(0,0);
    }
});