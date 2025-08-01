'use strict'

import { popUp } from "../components/popup.js";

export function setupNewsLetterForm(formId, InputId){
    const form = document.getElementById(formId);
    const emailInput = document.getElementById(InputId);

    if(form && emailInput){
        form.addEventListener('submit', e => {
            e.preventDefault();
            const emailValue = emailInput.value.trim();
            isValidEmail(emailValue);
            const isValid = isValidEmail(emailValue);
            addSignup(isValid, emailValue, form);
        }); 
    };
};

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let validEmail = re.test(email);
    return validEmail;
}

function addSignup (validEmail, emailValue, form){
    let signups = [];
     if(!validEmail){
            popUp('error', 'Please Submit A Valid Email Address.')
            return false;
        } else{
            const signup = {id: crypto.randomUUID(), email: emailValue};
            signups.push(signup);
            popUp('success', 'Email Submitted Successfully.');
    }
    form.reset();
}
