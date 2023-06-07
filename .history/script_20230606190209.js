var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    effect: "fade",
    mousewheel: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

// Handle navigation link clicks
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const slideId = link.getAttribute('href');
    const slideIndex = Array.from(link.parentNode.parentNode.children).indexOf(link.parentNode);
    swiper.slideTo(slideIndex);
  });
});

// Add active class to current slide's navigation link
swiper.on('slideChange', () => {
  const activeSlideIndex = swiper.realIndex;
  navLinks.forEach(link => {
    const slideId = link.getAttribute('href');
    const slideIndex = Array.from(link.parentNode.parentNode.children).indexOf(link.parentNode);
    link.classList.toggle('active', slideIndex === activeSlideIndex);
  });
  console.log(activeSlideIndex);
});










