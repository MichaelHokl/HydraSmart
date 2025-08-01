'use strict'

import { loadNav } from "./components/load-nav.js";
import { loadCart } from "./components/cart-panel.js";
import { bestsellerRender } from "./data/best-sellers.js";
import { testimonialRender } from "./data/testimonials.js";
import initFaqToggle from "./components/faq.js";
import { setupNewsLetterForm } from "./utils/newsletterHandler.js";
import {loadFooter} from "./components/load-footer.js";
import { loadPopUp } from "./components/popup.js";

document.addEventListener('DOMContentLoaded', () => {
    loadNav().then(() => {
        loadCart()
    });
    bestsellerRender();
    testimonialRender()
    initFaqToggle();
    setupNewsLetterForm('signup-main', 'email-main');
    loadFooter();
    loadPopUp()
})