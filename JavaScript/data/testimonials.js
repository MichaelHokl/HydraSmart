
const testimonials = [
    {
        id: "t1",
        personName: "Emily R.",
        personOccupation: "Fitness Coach",
        personImg: "/Images/Testimonial-1.png",
        reviewText: "I've been using the HydraSmart Pro for a month now and I'm obsessed. It reminds me to drink water, tracks everything through the app, and even glows when it's time to hydrate. Easily the best bottle I've ever owned."
    }, {
        id: "t2",
        personName: "Mike G.",
        personOccupation: "Fitness Influencer",
        personImg: "/Images/Testimonial-2.png",
        reviewText: "I didn't think I needed a smart water bottle until I got the HydraSmart Pro. It's sleek, the app is super easy to use, and the reminders actually help me stay consistent. Totally worth it."
    }, {
        id: "t3",
        personName: "Kunal K..",
        personOccupation: "Marketing Specialist",
        personImg: "/Images/Testimonial-3.png",
        reviewText: "The HydraSmart Pro changed the way I stay hydrated. The glow feature is subtle but effective, and the app syncs perfectly. I bring it everywhere now—it's that good."
    }, {
        id: "t4",
        personName: "Lisa Z.",
        personOccupation: "UX/UI Designer",
        personImg: "/Images/Testimonial-4.png",
        reviewText: "This bottle is a game changer. It tracks my intake accurately, reminds me to drink at just the right times, and looks amazing. I've never felt more on top of my hydration."
    },
];

export function testimonialRender(){
    testimonials.forEach(testimonial => {
    const swiperWrapper = document.querySelector(".testimonial-swiper-wrapper");

    const html = `
        <div class="swiper-slide testimonial-swiper-slide">
            <div class="testimonial-card card" id="${testimonial.id}">
                <blockquote class="testimonial">${testimonial.reviewText}</blockquote>
                <p class="name">-${testimonial.personName}, ${testimonial.personOccupation}</p>
                <img src="${testimonial.personImg}"  aria-hidden="true" alt="">
            </div>
        </div>
    `;
    swiperWrapper.insertAdjacentHTML('beforeend', html)
}) ;

const testimonialSwiper = new Swiper(".testimonial-swiper", {
  direction: "horizontal",
  loop: true,
  spaceBetween: 30,
  autoplay: {
  delay: 7500
  },
  speed: 1500,
  navigation: {
    nextEl: '.next-btn',
    prevEl: '.prev-btn',
  },
})
}

