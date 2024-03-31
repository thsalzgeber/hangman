const messageIncorrectGuess = 'Your initial attempt is a bit off the mark. Please take another stab at it!';
const nameInputError = 'Please enter alphabet characters only,<br>or leave the field empty.';

const gameText = "Play The Game!";

const pathGametImages = "images/game-images/";
const imgAltText = 'Hangman';
const alternativeInputName = 'Ghost';

const jsonFileLocation = "json/hangman-words.json";
const spinner = new Image();
const spinnerOutPut = document.getElementById('spinner');
const $gameImage = $('#game-image');
const $playAgainButton = $('#playagain-button');

const $hintSection = $('#hint-section');
const $incorrectGuess = $('#incorrect-guess');
const $incorrectGuessCount = $('#incorrect-guess-count');

const $statistic = $('#statistic-text');

const submit = document.getElementById('submit');
const keys = document.getElementById('keys');
const container = document.getElementById("container");
const backGroundBlocker = document.getElementById("backgroundblocker");
const inputValue = document.getElementById('input-name');
const $audio = $('input[name="audio"]');
const audioSound = new Audio('sounds/ping.mp3');
const audioWon = new Audio('sounds/violine-win.mp3');
const audioLost = new Audio('sounds/violine-lost.mp3');

const $backAudio = $('input[name="backaudio"]');
const audioBackSound = new Audio('sounds/country-rock.mp3');

let startSubmit = false;

let gameOver = false;
let guessedLetters = [];
let wordsAndHints = [];
let incorrectGuessCount = 0;
const maxIncorrectGuesses = 6;
let firstRound = true;
// capital letters for the virtual keyboard
const caseStart = 65;
const caseEnd = 90;


spinner.src = 'images/spinner-t.gif';
spinner.alt = 'Loading';

const $accordion = $("#accordion");
$accordion.accordion();
$accordion.accordion({ heightStyle: "content" });
$accordion.accordion({ collapsible: true });
$accordion.accordion("option", "active", false);

spinnerOutPut.appendChild(spinner);

let submitCallback;
const player = new Player();

window.onload = () => { inputValue.focus(); };

submit.addEventListener("click", () => { formSubmit(); })

inputValue.onkeydown = function (e) {
    if (e.keyCode == 13) {
        formSubmit();
    }
}

function formSubmit() {
    startSubmit = true;
    playBackgroundAudio();
    checkNameInput(inputValue.value.trim());
}

showStartPopup(function (inputName) {
    startInit(inputName);
});

function checkNameInput(nameInput) {
    const letters = /^[A-Z a-z]+$/;
    nameInput = nameInput === "" ? alternativeInputName : nameInput;

    if (nameInput.match(letters)) {
        if (submitCallback) {
            submitCallback(nameInput);
        }
        startPopup.style.display = 'none';
        backGroundBlocker.style.display = 'none'
    } else {
        startPopupHeader.innerHTML = nameInputError;
    }
}

$incorrectGuess.css('display', 'none');
$incorrectGuessCount.css('display', 'none');

function startInit(inputName) {
    player.firstName = inputName;
    $statistic.text(`Hello '${player.firstName}'!`);
    init();
}

popup.addEventListener("click", () => { closePopup(); })

$playAgainButton.click(function () {
    closePopup();
    $gameImage.attr({
        'src': `${pathGametImages}hang-1.png`,
        'alt': `${imgAltText} 1`
    });
    init();
})

function init() {
    spinnerOutPut.appendChild(spinner);

    createKeyBoard();
    enableAllKeys();

    guessedLetters = [];
    incorrectGuessCount = 0;
    setImage(1);
    audioSelection();

    $incorrectGuess.css('display', 'none');
    $incorrectGuessCount.css('display', 'none');
    popup.style.display = 'none';

    if (firstRound) {
        fetchWords();
        firstRound = false;
    } else {
        returnWord();
    }

    gameOver = false;
}

function returnWord() {

    spinnerOutPut.innerHTML = gameText;

    const randomIndex = Math.floor(Math.random() * wordsAndHints.length);
    const randomHint = wordsAndHints[randomIndex].hint;
    const randomWord = wordsAndHints[randomIndex].word.toLowerCase();

    const hintText = `${randomHint} (${randomWord.length} characters)`
    $hintSection.text(hintText);
    container.innerHTML = '';

    let displayedWord = "_ ".repeat(randomWord.length);
    container.textContent = displayedWord.trim();
    wordsAndHints.splice(randomIndex, 1);
    word = randomWord;

    if (wordsAndHints.length === 0) {
        fetchWords();
    }
}

async function fetchWords() {
    try {
        const response = await fetch(jsonFileLocation);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        wordsAndHints = data;
        returnWord();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function enableAllKeys() {
    const allKeys = document.querySelectorAll('button');

    for (const key of allKeys) {
        key.disabled = key.disabled ? !key.disabled : key.disabled;
    }
}

function createKeyBoard() {

    keys.innerHTML = '';

    for (let i = caseStart; i <= caseEnd; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('keys');
        button.addEventListener('click', () => displayLetter(button, letter));
        keys.appendChild(button);
    }
}

function displayLetter(button, letter) {
    if (!gameOver) {
        checkWord(letter);
        button.disabled = true;
    }
}

function checkWord(letter) {

    $incorrectGuess.css('display', 'none');
    guessedLetters.push(letter.toLowerCase());

    if (word.includes(letter.toLowerCase())) {
        displayedWord = word
            .split("")
            .map(char => (guessedLetters.includes(char) ? char : "_"))
            .join(" ");
        container.textContent = displayedWord;
        if (audioSelection()) audioSound.play();

        if (!displayedWord.includes("_")) {
            showPopUp(true);
            if (audioSelection()) audioWon.play();
            player.playGame('won');
            player.displayStatistics();
            gameOver = true;
        }
    } else {
        incorrectGuessCount++;
        setImage(incorrectGuessCount + 1);
        $incorrectGuess.css('display', 'block');
        $incorrectGuessCount.css('display', 'block');
        $incorrectGuess.text(messageIncorrectGuess);
        $incorrectGuessCount.text(`You have made an incorrect guess in ${incorrectGuessCount} out of the 6 attempts`);

        if (incorrectGuessCount === maxIncorrectGuesses) {
            if (audioSelection()) audioLost.play();
            showPopUp(false);
            player.playGame('lost');
            player.displayStatistics();
            gameOver = true;
        }
    }
}

function setImage(imageNumber) {
    $gameImage.attr({
        'src': `${pathGametImages}hang-${imageNumber}.png`,
        'alt': `${imgAltText} #${imageNumber}`
    });
}

$audio.click(() => { audioSelection(); });

function audioSelection() {
    for (const radioButton of $audio) {
        if (radioButton.checked) if (radioButton.value === 'audio-on') return true;
    }
}

$backAudio.click(() => { audioBackground() ? playBackgroundAudio() : audioBackSound.pause() });

function playBackgroundAudio() {
    audioBackSound.play();
    audioBackSound.loop = true;
    audioBackSound.volume = 0.02;
}

function audioBackground() {
    for (const radioButton of $backAudio) {
        if (radioButton.checked) if (radioButton.value === 'backgroundaudio-on') return true;
    }
}

window.addEventListener('blur', function () {
    if (startSubmit) audioBackSound.pause();
});

window.addEventListener('focus', function () {
    if (audioBackground() && startSubmit) audioBackSound.play();
});

// Navigation Menu
const dropDowns = document.getElementsByClassName("sub-nav");
window.onclick = function (event) {
    if (!event.target.matches('.dropdown')) {
        for (var i = 0; i < dropDowns.length; i++) {
            var openDropdown = dropDowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
}
