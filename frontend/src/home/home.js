

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






document.addEventListener('DOMContentLoaded', function() {
    function createCarousel() {
        const carouselHTML = `
            <div class="glider-contain">
                <button class="glider-prev">«</button>
                <div class="glider">
                    <div class="glider-slide" id="historia">
                        <img src="/FURBO/frontend/data/images/trofeo.png" alt="History">
                        <div class="glider-slide-title">HISTORIA</div>
                    </div>
                    <div class="glider-slide" id="partidos">
                        <img src="/FURBO/frontend/data/images/bota-de-futbol.png" alt="Matches">
                        <div class="glider-slide-title">PARTIDOS</div>
                    </div>
                    <div class="glider-slide" id="estadio">
                        <img src="/FURBO/frontend/data/images/estadio.png" alt="Stadium">
                        <div class="glider-slide-title">ESTADIO</div>
                    </div>
                </div>
                <button class="glider-next">»</button>
                <div id="dots"></div>
            </div>
        `;

        const carrouselMenu = document.querySelector('.carrousel_menu');
        carrouselMenu.innerHTML = ''; // Clear any existing content
        carrouselMenu.innerHTML = carouselHTML;

        
        new Glider(document.querySelector('.glider'), {
            slidesToShow: 5,
            slidesToScroll: 1,
            draggable: true,
            dots: '.dots',
            arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
            }
        });


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
            window.location.href = '/FURBO/frontend/src/stadium/stadium.html';
        });

    }

    createCarousel();
});


