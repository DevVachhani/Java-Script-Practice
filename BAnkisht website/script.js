'use strict';

const btnscrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///button scrolling
btnscrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll(X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'hight/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  section1.scrollIntoView({ behavior: 'smooth' });
});
////page navigator
/*

    const id = this.getAttribute('href');
    console.log('id');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });

*/

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //matching startergy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//menu fade animation
const handelHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el != link) el.style.opacity = opacity;
    });
    logo.style.opacity = 0.5;
  }
};
nav.addEventListener('mouseover', handelHover.bind(0.5));

nav.addEventListener('mouseout', handelHover.bind(1));

//sticky navigation
const initialCoords = section1.getBoundingClientRect();
//console.log(initialCoords);
window.addEventListener('scroll', function (e) {
  //   console.log(window.scrollY);
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

//stcick navigation using insertaion api
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');
//console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};
const imaObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imaObserver.observe(img));

//slider
//const slider = function () {
const slides = document.querySelectorAll("[class*='slide-']");
//console.log(slides);
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
// = document.querySelector('.slider');
const dotCointainer = document.querySelector('.dots');

let curslide = 0;
const maxSlide = slides.length;
//slider.style.transform = 'scale(0.4)';
//slider.style.overflow = 'visible';

const createDots = function () {
  slides.forEach(function (d, i) {
    dotCointainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  // console.log(document.querySelectorAll('.dots__dot'));
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}" ]`)
    .classList.add('dots__dot--active');
};

const gotoSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

//move to next slide

const nextSlide = function () {
  if (curslide === maxSlide - 1) {
    curslide = 0;
  } else {
    curslide++;
  }
  gotoSlide(curslide);
  activateDot(curslide);
};

const prevSlide = function () {
  if (curslide === 0) {
    curslide = maxSlide - 1;
  } else {
    curslide--;
  }
  gotoSlide(curslide);
  activateDot(curslide);
};

const init = function () {
  gotoSlide(0);
  createDots();
  activateDot(0);
};
init();

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  // console.log(e);
  // if (e.key === 'ArrowLeft') {
  //   prevSlide();
  // }
  if (e.key === 'ArrowRight') {
    nextSlide();
  }

  e.key === 'ArrowLeft' && prevSlide();
});

dotCointainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);

    activateDot(slide);
  }
});
//};
/*
const header = document.querySelector('.header'); 
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'we used cookie for function improvment.<button class ="btn btn--close--cookie"> got it</button>';
header.append(message);

// delete element

document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.parentElement.removeChild(message);
  });

//style
message.style.backgroundColor = '#37383d';
message.style.width = '120%';



const btnscrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnscrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll(X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'hight/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(
  // s1coords.left + window.pageXOffset,
  // s1coords.top + window.pageYOffset

  //  window.scrollTo({
  //    left: s1coords.left + window.pageXOffset,
  //    top: s1coords.top + window.pageYOffset,
  //    behavior: 'smooth',
  //  });

  section1.scrollIntoView({ behavior: 'smooth' });
});


/*
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener : you are reading  heading');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
/  rgb(234, 235, 235);
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb (${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor;
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor;
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor;
});

});
*/

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
