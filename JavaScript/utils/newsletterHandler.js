'use strict'

import { addSignup } from "../data/userData.js";

export function setupNewsLetterForm(formId, InputId){
    const form = document.getElementById(formId);
    const emailInput = document.getElementById(InputId);

    if(form && emailInput){
        form.addEventListener('submit', e => {
            e.preventDefault();
            const emailValue = emailInput.value.trim();
            if(!isValidEmail(emailValue)){
                alert('Please Enter a Valid Email!')
                return;
            }

            const signup = {
                id: crypto.randomUUID(),
                email: emailValue
            };
            addSignup(signup);
            alert('Thank You for Subscribing!')
            form.reset()
        }); 
    };
};

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}