document.addEventListener('DOMContentLoaded', function () {
  // Testimonials data array
  const testimonialsData = [
    {
      text: "SocialHub Pro helped us grow our local shop’s Instagram page with engaging reels and regular posts. Sales improved within a month!",
      author: "Priya Sharma, Boutique Owner"
    },
    {
      text: "The editing style and content planning were on point. They understand what audiences like and how to deliver it.",
      author: "Ravi Menon, Café Brand Manager"
    },
    {
      text: "I loved how quickly they responded and adapted the content to match our brand. Very professional and creative!",
      author: "Sneha Patil, Jewelry Business"
    }
  ];

  const testimonialSlidesContainer = document.getElementById('testimonialSlidesContainer');

  // Function to create a testimonial slide element
  function createTestimonialSlide(testimonial) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const card = document.createElement('div');
    card.className = 'bg-white p-6 rounded-xl shadow hover:shadow-lg transition';

    const textP = document.createElement('p');
    textP.className = 'text-gray-700 mb-4';
    textP.textContent = testimonial.text;

    const authorDiv = document.createElement('div');
    authorDiv.className = 'text-sm font-semibold text-[#a51a1a]';
    authorDiv.textContent = `— ${testimonial.author}`;

    card.appendChild(textP);
    card.appendChild(authorDiv);
    slide.appendChild(card);

    return slide;
  }

  // Render testimonial slides dynamically
  testimonialsData.forEach(testimonial => {
    const slide = createTestimonialSlide(testimonial);
    testimonialSlidesContainer.appendChild(slide);
  });

  // Initialize Swiper for Testimonials
  const testimonialsSwiper = new Swiper(".testimonialsSwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    loopedSlides: 3, // Added to fix loop warning by matching number of slides
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next-testimonials',
      prevEl: '.swiper-button-prev-testimonials',
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 5, spaceBetween: 25 },
    },
  });
});
