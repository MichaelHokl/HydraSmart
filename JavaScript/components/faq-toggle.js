'use strict';

export default function initFaqToggle(){

    const faqButtons = document.querySelectorAll('.button-faq');
    
    faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const controlledId = button.getAttribute('aria-controls');
        const answerElement = document.getElementById(controlledId);
        const ariaExpanded = button.getAttribute('aria-expanded');
        const favicon = button.querySelector('.fa-caret-down');

        if (ariaExpanded === "false") {
            answerElement.classList.remove('hidden');
            answerElement.classList.add('visible');
            button.classList.remove('closed');
            button.setAttribute('aria-expanded', 'true');
            answerElement.setAttribute('aria-hidden', 'false');
            favicon.classList.add('turned');
        } else {
            answerElement.classList.remove('visible');
            answerElement.classList.add('hidden');
            button.classList.add('closed');
            button.setAttribute('aria-expanded', 'false');
            answerElement.setAttribute('aria-hidden', 'true');
            favicon.classList.remove('turned');
        }
    });
});
}



