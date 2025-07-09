document.addEventListener('DOMContentLoaded', function () {
  // Initialize Swiper for Video Portfolio
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    loop: true,
    loopedSlides: 6, // Added to fix loop warning by matching number of slides
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      640: { slidesPerView: 3, spaceBetween: 15 },
      1024: { slidesPerView: 5, spaceBetween: 25 },
    },
  });

  // Dynamic Video Portfolio slides data
  const videoData = [
    { src: 'videos/video1.mp4', title: 'Reel 1' },
    { src: 'videos/video2.mp4', title: 'Reel 2' },
    { src: 'videos/video3.mp4', title: 'Reel 3' },
    { src: 'videos/video1.mp4', title: 'Reel 1' },
    { src: 'videos/video2.mp4', title: 'Reel 2' },
    { src: 'videos/video2.mp4', title: 'Reel 2' }
  ];

  const videoSlidesContainer = document.getElementById('videoSlidesContainer');

  // Function to create a video slide element
  function createVideoSlide(video) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const videoCard = document.createElement('div');
    videoCard.className = 'video-card hover:scale-105 transform transition duration-300 ease-in-out bg-white bg-opacity-80 rounded-3xl shadow-lg p-4';
    videoCard.setAttribute('data-video-src', video.src);
    videoCard.setAttribute('data-video-title', video.title);

    const relativeDiv = document.createElement('div');
    relativeDiv.className = 'relative rounded-xl overflow-hidden shadow-xl cursor-pointer group';

    const videoElement = document.createElement('video');
    videoElement.className = 'w-full h-64 object-cover rounded-xl';
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.playsInline = true;

    const source = document.createElement('source');
    source.src = video.src;
    source.type = 'video/mp4';
    videoElement.appendChild(source);

    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center';
    overlay.innerHTML = `
      <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-4.586-2.65A1 1 0 009 9.382v5.236a1 1 0 001.166.964l4.586-1.168A1 1 0 0015 13.618V12a1 1 0 00-.248-.832z" />
      </svg>
    `;

    const titleDiv = document.createElement('div');
    titleDiv.className = 'p-2 bg-white text-center text-sm font-semibold text-[#a51a1a]';
    titleDiv.textContent = video.title;

    relativeDiv.appendChild(videoElement);
    relativeDiv.appendChild(overlay);
    videoCard.appendChild(relativeDiv);
    videoCard.appendChild(titleDiv);
    slide.appendChild(videoCard);

    return slide;
  }

  // Render video slides dynamically
  videoData.forEach(video => {
    const slide = createVideoSlide(video);
    videoSlidesContainer.appendChild(slide);
  });

  // Modal functionality for dynamically created slides
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalTitle = document.getElementById('modalTitle');
  const closeModalBtn = document.getElementById('closeModal');

  videoSlidesContainer.addEventListener('click', (event) => {
    const videoCard = event.target.closest('.video-card');
    if (videoCard) {
      const src = videoCard.getAttribute('data-video-src');
      const title = videoCard.getAttribute('data-video-title');
      modalVideo.src = src;
      modalTitle.textContent = title;
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
      modalVideo.play();
      closeModalBtn.focus();
    }
  });

  function closeModal() {
    modalVideo.pause();
    modalVideo.src = '';
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
  }

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) closeModal();
  });

  // Testimonials Swiper
  const testimonialsSwiper = new Swiper(".testimonialsSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    loop: true,
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
      640: { slidesPerView: 1.5, spaceBetween: 15 },
      768: { slidesPerView: 2.5, spaceBetween: 20 },
      1024: { slidesPerView: 3.5, spaceBetween: 25 },
    },
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('change', function () {
      if (menuToggle.checked) {
        menu.style.display = 'block';
      } else {
        menu.style.display = 'none';
      }
    });
  }

  // Set current year in copyright
  const currentYearElem = document.getElementById('currentYear');
  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

  // Social icons toggle button
  const toggleBtn = document.getElementById('toggleIconsBtn');
  const socialIcons = document.getElementById('socialIcons');
  const toggleIcon = document.getElementById('toggleIcon');
  if (toggleBtn && socialIcons && toggleIcon) {
    toggleBtn.addEventListener('click', () => {
      if (socialIcons.style.display === 'none') {
        socialIcons.style.display = 'flex';
        toggleIcon.classList.remove('bi-chevron-double-up');
        toggleIcon.classList.add('bi-chevron-double-down');
      } else {
        socialIcons.style.display = 'none';
        toggleIcon.classList.remove('bi-chevron-double-down');
        toggleIcon.classList.add('bi-chevron-double-up');
      }
    });
  }
});
