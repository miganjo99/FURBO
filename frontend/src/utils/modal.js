export function initModal(data) {//objectModal


    console.log(data);

    var modal = document.getElementById("playerModal");

    // Actualizar el contenido del modal
    var modalTitle = document.getElementById('modalPlayerName');
    var modalDescription = document.getElementById('playerDetails');
    var modalFooter = document.getElementById('modalFooter');

    modalTitle.textContent = data.Titulo;

    modalDescription.innerHTML = '';
    data.Descripcion.forEach(desc => {
        var listItem = document.createElement('li');
        listItem.textContent = desc;
        modalDescription.appendChild(listItem);
    });

    modalFooter.textContent = data.Footer;

    modal.style.display = "flex";

    var closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    


    
}
