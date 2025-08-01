'use strict'

import { loadNav } from "./layout/load-nav.js";
import { loadCart } from "./layout/cart-panel.js";
import { bestsellerRender } from "./data/best-sellers.js";
import { testimonialRender } from "./data/testimonials.js";
import initFaqToggle from "./components/faq-toggle.js";
import { setupNewsLetterForm } from "./utils/newsletterHandler.js";
import {loadFooter} from "./layout/load-footer.js";

document.addEventListener('DOMContentLoaded', () => {
    loadNav();
    loadCart();
    bestsellerRender();
    testimonialRender()
    initFaqToggle();
    setupNewsLetterForm('signup-main', 'email-main');
    loadFooter();
})