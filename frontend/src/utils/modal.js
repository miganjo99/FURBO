export function initModal(modalId, updateContentCallback) {
    var modal = document.getElementById(modalId);
    var modalContent = modal.querySelector('.modal-content');

    console.log(modalContent);

    var cards = document.querySelectorAll('.card');
    console.log(cards);

    cards.forEach(function(card) {
        card.addEventListener('click', function(event) {
            event.preventDefault(); 
            event.stopPropagation(); 

            var data = this.data;
            console.log(data);

            updateContentCallback(data);

            modal.style.display = "flex";
        });
    });

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
