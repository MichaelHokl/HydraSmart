'use strict'

import { loadNav } from "./components/load-nav.js";
import { loadCart } from "./components/cart-panel.js";
import { setupNewsLetterForm } from "./utils/newsletterHandler.js";
import { loadFooter } from "./components/load-footer.js";
import { loadPopUp } from "./components/popup.js";
import { products, sortedRender, productsRender, sortProducts, sortedProducts } from "./data/products.js";

document.addEventListener('DOMContentLoaded', () => {
   
    productsRender(sortedProducts);
    sortedRender();
    loadNav().then(() => loadCart());
    setupNewsLetterForm('signup-main', 'email-main');
    loadFooter();
    loadPopUp();
});