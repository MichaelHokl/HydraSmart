'use strict'
import { products } from "../data/products.js"
import { popUp } from "./popup.js";
import { quantityControl } from "../utils/quatity-control.js";
import { loadCartFromLocalStorage, addToCart, updateCartPanel } from "./cart-panel.js";

function getId (){
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    return productId
}

const product = products.find(product => product.id === getId());
const productDiv = document.createElement('div');

function renderProduct(){
    const productPageContainer = document.getElementById('product-page-container');
    productDiv.classList.add('single-product');

    if (!product) {
        productPageContainer.innerHTML = `<p>Product not found.</p>`;
        return;
    }
    
    if(!product){
        popUp('error', 'Product was not found');
        return;
    } else{
        productDiv.innerHTML = `
    <article class="single-product" role="group" aria-labelledby="product-title-${product.id}">
    <img src="${product.src}" alt="${product.productName}" class="product-image" />
    <div class="product-card card">
    <h2 id="product-title-${product.id}">${product.productName}</h2>
        <p class="sku">SKU: ${product.id}</p>

        <p class="rating" aria-label="${product.rating} out of 5 stars">
            ⭐ ${product.rating} (${product.reviewCount} reviews)
        </p>

        <p class="price">
            <span class="sale-price">$${product.salePrice.toFixed(2)}</span>
            <del class="high-price">$${product.regularPrice.toFixed(2)}</del>
        </p>

        <div class="quantity-controls">
        <label for="quantity-${product.id}">Quantity:</label>
              <button class="qty-decrease" aria-label="Decrease quantity">-</button>
                  <input id="quantity-${product.id}" type="number" class="qty-input" min="1" value="1" aria-label="Quantity for ${product.productName}" />
              <button class="qty-increase" aria-label="Increase quantity">+</button>
          </div>

          <p class="badge">🚚 Free shipping on orders over $50</p>
        <div class="centered-button-container">
            <button class="buy-button" aria-label="Add ${product.productName} to cart" data-id=${product.id}>Add to Cart</button>
        </div>
        <div class="tab-container">
            <div class="tabs">
            <button 
                class="tab-button" 
                aria-label="View Description" 
                aria-expanded="true"
                aria-controls="product-details-${product.id}"
                id="open-product-details-${product.id}"
                >Description</button>
             <button 
                class="tab-button" 
                aria-label="View Shipping Details" 
                aria-expanded="false"
                aria-controls="shipping-${product.id}"
                id="open-shipping-details-${product.id}"
                >Shipping</button>
            </div>
            <div class="product-details" id="product-details-${product.id}">
                <h3> Product Description</h3>
                <p class="description">${product.description}</p>
                <ul class="takeaways-list">
                    ${Object.values(product.takeaways).map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
            <div class="shipping-details tab-closed" id="shipping-details-${product.id}">     
                <h3>Shipping Information</h3>
                <ul class="shipping-policies">
                    <li><strong>Processing Time:</strong> Orders are processed within 1–2 business days.</li>
                    <li><strong>Delivery Estimates:</strong>
                        <ul>
                            <li>Standard: 5-7 business days</li>
                            <li>Expedited: 2-3 business days</li>
                            <li>Overnight: 1 business day</li>
                        </ul>
                    </li>
                    <li><strong>Shipping Carriers:</strong> USPS, UPS, or FedEx (based on location).</li>
                    <li><strong>Tracking:</strong> Tracking details will be emailed once your order ships.</li>
                    <li><strong>International Shipping:</strong> Available to select countries. Delivery time varies by destination. Customs fees may apply.</li>
                    <li><strong>Shipping Fees:</strong> Free shipping on orders over $50. Flat rate of $4.99 on smaller orders.</li>
                    <li><strong>Lost or Delayed Packages:</strong> Contact our support team within 30 days for assistance.</li>
                </ul>
            </div>
        </div>
    </div>
    </article>
        `
        productPageContainer.appendChild(productDiv);

        const panelProductsContainer = document.getElementById('panel-products-container');
        const cartAmount = document.getElementById('cart-amount-panel');
        const button = productDiv.querySelector('.buy-button');
        const cart = loadCartFromLocalStorage();
        addingProductsToCart(button, cart, panelProductsContainer, cartAmount)
    }
    tabDisplay()
}

function tabDisplay(){
    const tabButtons = productDiv.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.id;
            const productDetails = productDiv.querySelector('.product-details')
            const shippingDetails = productDiv.querySelector('.shipping-details')
            if(id === `open-product-details-${product.id}`){
                shippingDetails.classList.add('tab-closed')
                productDetails.classList.remove('tab-closed');
            } else if(id === `open-shipping-details-${product.id}`){
                productDetails.classList.add('tab-closed')
                shippingDetails.classList.remove('tab-closed');
            }
        })
    })
}
    
function addingProductsToCart(button, cart, panelProductsContainer, cartAmount){
    button.addEventListener('click', () => {
        const added = addToCart(cart, product.id);
            if (added) {
            updateCartPanel(cart, panelProductsContainer, cartAmount);
            popUp('success', 'Item Added To Cart Successfully');
            } else {
                popUp('error', 'Failed to add item to cart');
            }
});
}
renderProduct()
