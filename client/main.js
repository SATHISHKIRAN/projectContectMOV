document.addEventListener('DOMContentLoaded', function () {
  const words = ['Social Presence', 'Video Editing', 'Content Creation', 'Branding', 'Marketing', 'Digital Growth'];
  let index = 0;
  const rotatingWord = document.getElementById('rotating-word');

  function rotateWord() {
    index = (index + 1) % words.length;
    rotatingWord.textContent = words[index];
  }

  setInterval(rotateWord, 3000); // Change word every 3 seconds

  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
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
