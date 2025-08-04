export const bestsellers = [
    {
        id: "best001",
        src: "/Images/HydraSmart-lite.png",
        bestsellerName: "HydraSmart-Lite",
        rating: 4.6,
        reviewCount: 163,
        salePrice: 39.99,
        regularPrice: 89.99
    }, {
        id: "best002",
        src: "/Images/HydraSmart-proMaxx.png",
        bestsellerName: "HydraSmart-ProMaxx",
        rating: 4.6,
        reviewCount: 591,
        salePrice: 59.99,
        regularPrice: 109.99
    }, {
        id: "best003",
        src: "/Images/HydraSmart-proUltra.png",
        bestsellerName: "HydraSmart-ProUltra",
        rating: 4.6,
        reviewCount: 1173,
        salePrice: 99.99,
        regularPrice: 189.99
    }
];

export function bestsellerRender(){
    bestsellers.forEach(bestseller => {
    const swiperWrapper = document.querySelector('.bestseller-swiper-wrapper');

    const html = `
    <div class="swiper-slide bestseller-swiper-slide" id=${bestseller.id}>
    <div class="product-image-container">
        <a href="/Html/index.html" class="product-link"> 
            <img src="${bestseller.src}" alt="${bestseller.bestsellerName}">
            </a>      
        </div>
        <div class="product-card card">
            <h3>${bestseller.bestsellerName}</h3> 
            <div class="stars" data-rating="${bestseller.rating}" aria-label="${bestseller.rating} out of 5 stars"> 
                <span class="review-count">(${bestseller.reviewCount})</span>
            </div>
            <p class="price" aria-label="Price $${bestseller.salePrice}">${bestseller.salePrice}
                <span class="high-price">${bestseller.regularPrice}</span>
            </p>
            <div class="centered-button-container">
            <button aria-label="Add this item to the cart for ${bestseller.salePrice}" class="buy-button" data-id=${bestseller.id}>Add To Cart</button>
            </div>
            </div> 
    </div>
    `;
    swiperWrapper.insertAdjacentHTML('beforeend', html)
});

const bestSellerSwiper = new Swiper('.bestseller-swiper', {
  direction: 'horizontal',
  loop: true,
  spaceBetween: 30,
  autoplay:{
    delay: 2500
  },
  speed: 1500,
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 10,
    slideShadows: false,
  }
});
}
