'use strict'

export function loadNav (){
    return fetch("./Partials/navigation.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navigation-placeholder").innerHTML = data;
        if (typeof initNav === 'function') initNav();
});

function initNav(){
    const openButton = document.getElementById('open-menu');
    const closeButton = document.getElementById('close-menu');
    const overlay = document.getElementById('overlay');
    const mainMenu = document.getElementById('main-menu');

    openButton.addEventListener('click', () => {
    mainMenu.classList.add('menu-open');
    openButton.setAttribute('aria-expanded', 'true');
    overlay.classList.add('on');
    });

    closeButton.addEventListener('click', () => {
    mainMenu.classList.remove('menu-open');
    openButton.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('on');
    });
 }
}
