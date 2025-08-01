'use strict'

export function loadPopUp(){
    fetch("./Partials/popup.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("pop-up-placeholder").innerHTML = data;
    });    
}

const icons = {
    success: '<i class="success fa-solid fa-circle-check">',
    error: '<i class="error fa-solid fa-circle-exclamation"></i>'
}


export function popUp(type, message){
    const popupText = document.getElementById('popup-text');
    const popupStatusImg = document.getElementById('popup-status-img');
    const popupContainer = document.getElementById('popup-container');
    
    popupText.textContent = message;
    popupStatusImg.innerHTML = icons[type];
    popupContainer.classList.add('popup-open');
    setTimeout(() => {
                popupContainer.classList.remove('popup-open')
            }, 1500);
}