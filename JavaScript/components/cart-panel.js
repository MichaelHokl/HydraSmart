'use strict' 

import { bestsellers } from "/JavaScript/data/best-sellers.js";
import { popUp } from "./popup.js";

export function loadCart() {
  fetch("./Partials/cart-side-panel.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById('cart-side-panel-placeholder').innerHTML = data;

      const cart = [];
      const buyButtons = document.querySelectorAll('.buy-button');
      const panelProductsContainer = document.getElementById('panel-products-container');
      const cartAmount = document.getElementById('cart-amount-panel');

      const openPanel = document.getElementById('open-cart-panel');
      const closePanel = document.getElementById('close-cart-panel');
      const overlay = document.getElementById('overlay');
      const sidePanel = document.getElementById('cart-side-panel');

      initCartPanel(openPanel, closePanel, overlay, sidePanel);
      updateCartPanel(cart, panelProductsContainer, cartAmount);
      buyButtons.forEach(button => {
        button.addEventListener('click', () => {
          const productId = button.dataset.id;
          const result = addToCart(cart, productId);

          if(result) {
            updateCartPanel(cart, panelProductsContainer, cartAmount);
            popUp('success', 'Item Added To Cart Succesfully')
          }else{
            popUp('error', 'Something Went Wrong. Please Try Again.')
          }
        });
      });
    });
}

function updateCartPanel(cart, panelProductsContainer, cartAmount) {
  panelProductsContainer.innerHTML = '';

  if (cart.length === 0) {
    panelProductsContainer.innerHTML = `
      <h2>Your Cart Is Empty<br><br>Go Fill It Up</h2>
      <a href="products.html" class="link-button" aria-label="Shop Now for eco-friendly smart water bottles">Shop Now</a>
    `;
    cartAmount.textContent = '0';
    return;
  }

  let totalItems = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    itemDiv.innerHTML = `
      <div class="cart-item-container">
        <button
          aria-label="Delete Item"
          aria-controls="cart-item"
          class="delete-cart-item-btn">
          <i class="fa-solid fa-xmark cart-item-delete"></i>
        </button>
        <img src="${item.src}" class="cart-image" aria-hidden="true" alt=""/>
        <div class="cart-name-quantity">
          <p>${item.bestsellerName}</p>
          <p>$${item.salePrice}</p>
          <div class="quantity-controls">
              <button class="qty-decrease" aria-label="Decrease quantity">-</button>
                  <input id="qty-input" type="number" class="qty-input" min="1" value="${item.quantity}" aria-label="Quantity for ${item.bestsellerName}" />
              <button class="qty-increase" aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>`;

    const deleteButton = itemDiv.querySelector('.delete-cart-item-btn');
    deleteButton.addEventListener('click', () => {
      const index = cart.findIndex(cartItem => cartItem.id === item.id);
      if (index > -1) {
        cart.splice(index, 1);
      }
      updateCartPanel(cart, panelProductsContainer, cartAmount);
    });

    panelProductsContainer.appendChild(itemDiv);

    const decreaseBtn = itemDiv.querySelector('.qty-decrease');
    const increaseBtn = itemDiv.querySelector('.qty-increase');
    const qtyInput = itemDiv.querySelector('.qty-input');

    decreaseBtn.addEventListener('click', () => {
      if(item.quantity > 1){
        item.quantity--;
        updateCartPanel(cart, panelProductsContainer, cartAmount);
      } 
    });

    increaseBtn.addEventListener('click', () => {
      item.quantity++;
      updateCartPanel(cart, panelProductsContainer, cartAmount);
    });

    qtyInput.addEventListener('change', () => {
      let newQty = parseInt(qtyInput.value);
      if (isNaN(newQty) || newQty < 1) newQty = 1;
      item.quantity = newQty;
      updateCartPanel(cart, panelProductsContainer, cartAmount);
    });
  });

  const checkoutBtn = document.createElement('a');
  checkoutBtn.href = 'checkout.html';
  checkoutBtn.className = 'link-button';
  checkoutBtn.setAttribute('aria-label', 'Go to checkout page');
  checkoutBtn.textContent = 'Checkout';

  cartAmount.textContent = totalItems.toString();

  const cartAmountNav = document.getElementById('cart-amount-nav');
  cartAmountNav.textContent = totalItems;
  cartAmount.setAttribute('aria-label', `There ${totalItems === 1 ? 'is only' : 'are'} ${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your cart.`)
  cartAmountNav.setAttribute('aria-label', `There ${totalItems === 1 ? 'is only' : 'are'} ${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your cart.`)

  
  const subtotalContainer = document.createElement('div');
  const subtotal = document.createElement('p');
  const subtotalSpan = document.createElement('span')
  const tax = document.createElement('p');
  const taxSpan = document.createElement('span')
  const taxPercentage = 0.19;
  const total = document.createElement('p');
  const totalSpan = document.createElement('span')
  
  subtotalContainer.className = 'subtotal-container card';
  
  const cartP = [subtotal, tax, total];
  const cartSpan = [subtotalSpan, taxSpan, totalSpan];
  cartP.forEach(item => {
    item.className = 'cart-price-p'
  })
  cartSpan.forEach(item => {
    item.className = 'cart-price-span'
  })
  

  subtotal.textContent = 'Subtotal: ';
  tax.textContent = 'Taxes: ';
  total.textContent = 'Total: '
  
  let subtotalValue = 0;
  let taxAmount = 0;
  let totalValue = 0;
  cart.forEach(item => {
      subtotalValue += item.salePrice * item.quantity;
    }); 
    taxAmount = subtotalValue * taxPercentage;
    totalValue = subtotalValue + taxAmount;
    
    subtotalSpan.textContent = `$${subtotalValue.toFixed(2)}`;
    taxSpan.textContent = `$${taxAmount.toFixed(2)}`;
    totalSpan.textContent = `$${totalValue.toFixed(2)}`

    subtotalContainer.append(subtotal, tax, total);
    subtotal.appendChild(subtotalSpan);
    tax.appendChild(taxSpan);
    total.appendChild(totalSpan);
    
    panelProductsContainer.appendChild(subtotalContainer)
    panelProductsContainer.appendChild(checkoutBtn); 
}

function initCartPanel(openPanel, closePanel, overlay, sidePanel) {
  openPanel.addEventListener('click', () => {
    sidePanel.classList.add('menu-open');
    openPanel.setAttribute('aria-expanded', 'true');
    overlay.classList.add('on');
  });

  closePanel.addEventListener('click', () => {
    sidePanel.classList.remove('menu-open');
    openPanel.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('on');
  });
}

function addToCart(cart, productId) {
  const product = bestsellers.find(p => p.id === productId);
  if (!product) return false;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  return true;
}



