var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    effect: "fade",
    mousewheel: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
  });

$('logo').addClass('zoom-in');

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

// Hide logo in main page
const checkLogo = (activeSlideIndex, logo) => {
  if( activeSlideIndex == 0 ){
    logo.classList.add('invisible');
    logo.classList.remove('show');
  }else{
    logo.classList.remove('invisible');

    logo.classList.add('show');
  }
}

const activeSlideIndex = swiper.realIndex;
const logo = document.getElementById('nav-logo');
const line = document.querySelector('.line');

checkLogo(activeSlideIndex, logo);

// Add active class to current slide's navigation link
swiper.on('slideChange', () => {
  const activeSlideIndex = swiper.realIndex;
  navLinks.forEach(link => {
    const slideId = link.getAttribute('href');
    const slideIndex = Array.from(link.parentNode.parentNode.children).indexOf(link.parentNode);
    link.classList.toggle('active', slideIndex === activeSlideIndex);
  });
  
  checkLogo(activeSlideIndex, logo);
  
  switch (activeSlideIndex) {
    case 0:
      $('logo').addClass('zoom-in');
      break;

    case 1:
      $('.about-point').addClass('fade-right');
      break;

    case 2:
      line.classList.add('animate');
      $('.service').addClass('fade-up');
      break;

    default:
      break;
  }
  if(activeSlideIndex == 2){
    $('.service-title').addClass('fade-left');
  }else{
    $('.service-title').removeClass('fade-left');
    $('.service-title').addClass('fade-right');
  }
  // if (activeSlideIndex === 2) {
  //   line.classList.add('animate');
  // }
});











