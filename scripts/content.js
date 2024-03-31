// Header Text
document.getElementById("header-title").innerHTML = "Hangman Game";

// Icons
const textTitle = document.querySelector('title').innerText.toLowerCase();
const title = textTitle.slice(textTitle.indexOf('-') + 2, textTitle.length);
const pathToIcons = title === "page not found" ? "/jsprojects/icons/" : "icons/";
document.querySelector('.home-image').innerHTML = `<img src="${pathToIcons}home-18.png"> Home`;
document.querySelector('.game-image').innerHTML = `<img src="${pathToIcons}game-18.png"> Games`;
document.querySelector('.quiz-image').innerHTML = `<img src="${pathToIcons}quiz-18.png"> Quizzes`;
document.querySelector('.footer-top').innerHTML = `<img src="${pathToIcons}arrow-up-18.png">  [ Top ]`;


// Impressum Text
document.getElementById("impressum-date").innerHTML = "&copy April 2024";
document.getElementById("impressum-name").innerHTML = "Thomas Salzgeber";

// Email address
const emailAddress = "\u0074\u0068\u006f\u006d\u0061\u0073\u0040\u0077\u0065\u0062\u0064\u0065\u0076\u002e\u0073\u0074\u006e\u0065\u0074\u002e\u0061\u0074";

function link(text, href) {
    let a = document.createElement("a");
    a.textContent = text;
    a.href = href;
    if (!text.includes("@")) {
        a.target = "_blank";
    }
    return a;
}

document.querySelector('.email-symbol').innerHTML = `<img src="${pathToIcons}email-18.png"> `;
document.querySelector(".contact-email-address").appendChild(link(emailAddress, `mailto:${emailAddress}`));