import { attachCartListeners, loadCartFromLocalStorage } from "../components/cart-panel.js";

export const products = [
    {
        id: "best001",
        src: "/Images/HydraSmart-lite.png",
        productName: "HydraSmart-Lite",
        rating: 4.6,
        reviewCount: 163,
        salePrice: 39.99,
        regularPrice: 89.99,
        description: `The HydraSmart-Lite is an entry-level hydration tracker designed for everyday use.<br><br>Users who want to maintain optimal hydration without breaking the bank.<br><br>Lightweight and compact, it seamlessly integrates with your daily routine, providing accurate water intake monitoring and timely reminders to keep you refreshed throughout the day.<br><br>Ideal for casual athletes, office workers, or anyone focused on staying healthy with minimal fuss.`,
        takeaways: {
            point1: 'Accurate daily water intake tracking',
            point2: 'Lightweight and portable design',
            point3: 'User-friendly interface with easy setup',
            point4: 'Affordable hydration solution',
            point5: 'Reminders to drink water at optimal intervals',
        }
    }, {
        id: "best002",
        src: "/Images/HydraSmart-proMaxx.png",
        productName: "HydraSmart-ProMaxx",
        rating: 4.6,
        reviewCount: 591,
        salePrice: 59.99,
        regularPrice: 109.99,
        description: 'The HydraSmart-ProMaxx steps up your hydration game with enhanced features for fitness enthusiasts and active lifestyles.<br><br>Featuring advanced sensors, it tracks not only your water consumption but also adjusts recommendations based on your activity level, ambient temperature, and personal hydration goals.<br><br>The ProMaxx pairs effortlessly with your smartphone, giving you detailed hydration analytics and motivational insights to optimize your performance.',
        takeaways: {
            point1: 'Adaptive hydration recommendations based on activity and environment',
            point2: 'Real-time hydration analytics via smartphone app',
            point3: 'Sleek and durable design for active use',
            point4: 'Syncs with popular fitness trackers and wearables',
            point5: 'Customizable hydration goals and alerts',
        }
    }, {
        id: "best003",
        src: "/Images/HydraSmart-proUltra.png",
        productName: "HydraSmart-ProUltra",
        rating: 4.6,
        reviewCount: 1173,
        salePrice: 99.99,
        regularPrice: 189.99,
        description: 'The HydraSmart-ProUltra is the ultimate hydration solution for professionals and athletes demanding precision and comprehensive health tracking.<br><br>It combines cutting-edge sensor technology with AI-powered hydration insights and integration with health platforms.<br><br>The ProUltra monitors hydration status, electrolyte balance, and even detects signs of dehydration early.<br><br>Its premium build and extended battery life make it the ideal companion for high-performance training and critical health monitoring.',
        takeaways: {
            point1: 'AI-powered hydration and electrolyte balance monitoring',
            point2: 'Early dehydration detection alerts',
            point3: 'Full integration with health and fitness platforms',
            point4: 'Premium materials and long-lasting battery life',
            point5: 'Designed for professional and high-performance users',
        }
    }
];

export function productsRender(products) {
    const container = document.getElementById('products-archive-product-container');
    
    if(!container) return;
    
    container.innerHTML = "";
    products.forEach(product => {
        const html = `
        <div class="product" id=${product.id}>
            <div class="product-image-container">
                <a href="/Html/product-page.html?id=${product.id}" class="product-link" aria-label="View details for ${product.productName}">  
                    <img src="${product.src}" alt="${product.productName}">
                </a>        
            </div>
            <div class="product-card card">
                <h3>${product.productName}</h3> 
                <div class="stars" data-rating="${product.rating}" aria-label="${product.rating} out of 5 stars"> 
                    <span class="review-count">(${product.reviewCount})</span>
                </div>
                <p class="price" aria-label="Price $${product.salePrice}">$${product.salePrice}
                <span class="high-price">$${product.regularPrice}</span>
                </p>
                <div class="centered-button-container">
                <a href="/Html/product-page.html?id=${product.id}" aria-label="Learn more about this product" class="learn-more-button">See Details</a>
                <button aria-label="Add this item to the cart for ${product.salePrice}" class="buy-button" data-id=${product.id}>Add To Cart</button>
                </div>
            </div>   
        </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
};

export function sortProducts(products) {
    const sorted = [...products];
    const select = document.getElementById('sort-select');

    if(!select) return sorted; 

    const criteria = select.value;
    switch (criteria) {
        case "price-asc":
            sorted.sort((a, b) => a.salePrice - b.salePrice);
            break;
        case "price-desc":
            sorted.sort((a, b) => b.salePrice - a.salePrice);
            break;
        case "name-asc":
            sorted.sort((a, b) => a.productName.localeCompare(b.productName));
            break;
        case "name-desc":
            sorted.sort((a, b) => b.productName.localeCompare(a.productName));
            break;
        case "popularity":
            sorted.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
    }
    return sorted;
}

export const sortedProducts = sortProducts(products);

export function sortedRender(){
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const cart = loadCartFromLocalStorage();
            const newlySortedProducts = sortProducts(products);
            productsRender(newlySortedProducts);
            const panelProductsContainer = document.getElementById('panel-products-container')        
            const cartAmount = document.getElementById('cart-amount-panel');
            attachCartListeners(cart, panelProductsContainer, cartAmount)
        });
    }
}


