'use strict'

import { setupNewsLetterForm } from "../utils/newsletterHandler.js";

export function loadFooter(){
    fetch("./Partials/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
        setupNewsLetterForm('signup-footer', 'email-footer')
    });
}
