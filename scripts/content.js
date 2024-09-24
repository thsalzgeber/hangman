// Header Text
document.getElementById("header-title").innerHTML = "Hangman Game";

// Icons
const textTitle = document.querySelector('title').innerText.toLowerCase();
const title = textTitle.slice(textTitle.indexOf('-') + 2, textTitle.length);
const pathToIcons = title === "page not found" ? "/jsprojects/icons/" : "icons/";
document.querySelector('.home-image').innerHTML = `<img src="${pathToIcons}home-18.png"> Home`;
document.querySelector('.game-image').innerHTML = `<img src="${pathToIcons}game-18.png"> Games`;
document.querySelector('.quiz-image').innerHTML = `<img src="${pathToIcons}quiz-18.png"> Quizzes`;
document.querySelector('.other-image').innerHTML = `<img src="${pathToIcons}other-18.png"> Other`;
document.querySelector('.footer-top').innerHTML = `<img src="${pathToIcons}arrow-up-18.png">  [ Top ]`;
document.querySelector('.footer-sitemap').innerHTML = `<img src="${pathToIcons}sitemap-18.png">  Sitemap`;


// Impressum Text
document.getElementById("impressum-date").innerHTML = "&copy April 2024";
document.getElementById("impressum-name").innerHTML = "Thomas Salzgeber";

// Email address
const emailAddress = "\u0077\u0065\u0062\u0064\u0065\u0076\u0040\u0065\u0076\u006f\u006c\u0075\u0074\u0069\u006f\u006e\u0077\u0065\u0062\u002e\u0063\u0061";

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