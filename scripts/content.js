// Header Text
document.getElementById("header-title").innerHTML = "Hangman Game";

// Icons
const pathToIcons = "icons/";
document.querySelector('.home-image').innerHTML = `<img src="${pathToIcons}home-18.png"> Home`;
document.querySelector('.contact-email-address').innerHTML = `<img src="${pathToIcons}email-18.png"> <a href="mailto:thomas@stnet.at"> thomas@stnet.at</a>`;
document.querySelector('.footer-top').innerHTML = `<img src="${pathToIcons}arrow-up-18.png">  [ Top ]`;


// Impressum Text
document.getElementById("impressum-date").innerHTML = "&copy April 2, 2024";
document.getElementById("impressum-name").innerHTML = "Thomas Salzgeber";