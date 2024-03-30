const messageWon = `Congratulations on your triumphant victory in the game! Exceptional job!`;
const messageWonHeader = 'You Guessed the Word';
const messageLost = `Sorry about the outcome of the game. Keep your spirits up, and here's to better luck in the next round!`;
const messageLostHeader = 'You Did Not Guess the Word';

const popupMessage = document.getElementById("popup-message");
const popupHeader = document.getElementById("popup-header");
const popup = document.getElementById('popupcontent');
const startPopup = document.getElementById('start-popup');
const startForm = document.getElementById('start-form');
const startPopupHeader = document.getElementById('start-popup-header');

function showPopUp(gameResult) {

    const header = gameResult ? messageWonHeader : messageLostHeader;
    const body = gameResult ? messageWon : `${messageLost} <br> The word was: <strong>${word}</strong>`;

    if (gameResult) {
        popup.classList.remove('lost-popup');
        popup.classList.add('won-popup');
    } else {
        popup.classList.remove('won-popup');
        popup.classList.add('lost-popup');
    }

    popup.style.display = 'block';
    popupHeader.innerHTML = header;
    popupMessage.innerHTML = body;
    popup.style.opacity = '1'
}

function closePopup() {
    popup.style.display = 'none';
}

function showStartPopup(callback) {
    submitCallback = callback;
    startPopup.style.display = 'block';
    backGroundBlocker.style.display = 'block'
}
