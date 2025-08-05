'use strict'

import { loadNav } from "./components/load-nav.js";
import { loadCart } from "./components/cart-panel.js";
import { setupNewsLetterForm } from "./utils/newsletterHandler.js";
import { loadFooter } from "./components/load-footer.js";
import { loadPopUp } from "./components/popup.js";
import { products, productsRender, sortProducts } from "./data/products.js";

document.addEventListener('DOMContentLoaded', () => {
    loadNav().then(() => {
        loadCart().then(({ cart, panelProductsContainer, cartAmount }) => {
            productsRender(products, cart, panelProductsContainer, cartAmount);

            document.getElementById('sort-select').addEventListener('change', (e) => {
                const sorted = sortProducts(products, e.target.value);
                productsRender(sorted, cart, panelProductsContainer, cartAmount);
            });
        });
    });

    setupNewsLetterForm('signup-main', 'email-main');
    loadFooter();
    loadPopUp();
});
