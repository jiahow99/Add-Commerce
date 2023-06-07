var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    effect: "fade",
    // mousewheel: true,
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

// Hide logo in main page
const checkLogo = (activeSlideIndex, logo) => {
  if( activeSlideIndex == 0 ){
    logo.classList.add('invisible');
  }else{
    logo.classList.remove('invisible');
  }
}

const activeSlideIndex = swiper.realIndex;
const logo = document.getElementById('nav-logo');

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
});


// Flag to track whether slide animation is in progress
var isSliding = false;

// Add event listener for mousewheel
window.addEventListener('wheel', function(event) {
  if (isSliding) {
    event.preventDefault();
    return;
  }

  var deltaY = event.deltaY;

  if (deltaY > 0) {
    // Scroll down
    if (swiper.isEnd) {
      event.preventDefault();
      return;
    }

    swiper.slideNext();
    isSliding = true;
  } else if (deltaY < 0) {
    // Scroll up
    if (swiper.isBeginning) {
      event.preventDefault();
      return;
    }

    swiper.slidePrev();
    isSliding = true;
  }

  // Prevent default scroll behavior
  event.preventDefault();
});

// Add event listener for touchmove
var container = document.querySelector('.swiper-container');
var startX, startY;

container.addEventListener('touchstart', function(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

container.addEventListener('touchmove', function(event) {
  if (isSliding) {
    event.preventDefault();
    return;
  }

  var currentX = event.touches[0].clientX;
  var currentY = event.touches[0].clientY;
  var deltaX = startX - currentX;
  var deltaY = startY - currentY;

  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    // Vertical scrolling
    if (deltaY > 0) {
      // Scroll down
      if (swiper.isEnd) {
        event.preventDefault();
        return;
      }

      swiper.slideNext();
      isSliding = true;
    } else if (deltaY < 0) {
      // Scroll up
      if (swiper.isBeginning) {
        event.preventDefault();
        return;
      }

      swiper.slidePrev();
      isSliding = true;
    }
  }

  // Prevent default scroll behavior
  event.preventDefault();
});

// Add event listener for slideChange event to reset the isSliding flag
swiper.on('slideChange', function() {
  isSliding = false;
});









