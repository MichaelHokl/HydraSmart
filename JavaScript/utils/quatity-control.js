'use strict'

import { saveCartToLocalStorage, updateCartPanel } from "../components/cart-panel.js";

export function quantityControl(increase, decrease, input, item, cart, panelProductsContainer, cartAmount){
        cons
        decrease.addEventListener('click', () => {
            if(item.quantity > 1){
                item.quantity--;
                saveCartToLocalStorage(cart);
                updateCartPanel(cart, panelProductsContainer, cartAmount);
            } 
        });
        
        increase.addEventListener('click', () => {
            item.quantity++;
            saveCartToLocalStorage(cart);
            updateCartPanel(cart, panelProductsContainer, cartAmount);
        });
        
        input.addEventListener('change', () => {
            let newQty = parseInt(input.value);
            if (isNaN(newQty) || newQty < 1) newQty = 1;
            item.quantity = newQty;
            saveCartToLocalStorage(cart);
            updateCartPanel(cart, panelProductsContainer, cartAmount);
        });
    }