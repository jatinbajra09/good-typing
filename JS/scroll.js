// js for scroll up button in footer

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;
  var scrollToTop = document.querySelector('.scroll-to-top');

  if (scrollPosition > 300) {
    scrollToTop.classList.add('show');
  } else {
    scrollToTop.classList.remove('show');
  }
});

var scrollToTopBtn = document.querySelector('.scroll-to-top');
scrollToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
