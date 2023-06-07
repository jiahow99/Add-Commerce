var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
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


var slidesPerMouseWheel = 1; // Maximum number of slides per mousewheel event
var slideCount = 0; // Current slide count within the time frame
var slideTimeout = null; // Timeout variable to reset the slide count

// Add event listener for mousewheel
window.addEventListener('wheel', function(event) {
  if (slideCount >= slidesPerMouseWheel) {
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
  } else if (deltaY < 0) {
    // Scroll up
    if (swiper.isBeginning) {
      event.preventDefault();
      return;
    }

    swiper.slidePrev();
  }

  // Increment slide count
  slideCount++;

  // Clear previous timeout
  clearTimeout(slideTimeout);

  // Reset slide count after a certain time frame
  slideTimeout = setTimeout(function() {
    slideCount = 0;
  }, 1000); // Adjust the time frame (in milliseconds) as per your requirements

  // Prevent default scroll behavior
  event.preventDefault();
});









