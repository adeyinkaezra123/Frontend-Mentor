const hamburger = document.querySelector('#hamburger');
const nav = document.querySelector('.nav-wrap');
const navLink = document.querySelectorAll('.nav-link-head')
const dropDown = document.querySelectorAll('.dropdown')


hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('mobile-nav');
})

var onresize = function () {
  width = document.body.clientWidth;
  height = document.body.clientHeight;

  if (width >= 960) {
    nav.classList.remove('mobile-nav');
    hamburger.classList.remove('active');
  }
}
window.addEventListener("resize", onresize);


navLink.forEach(
  x => {
    x.addEventListener('click',
      () => {
        navIndex = Array.from(navLink).indexOf(x);
        dropDown[navIndex].classList.toggle('show');
      }
    );
  }
)