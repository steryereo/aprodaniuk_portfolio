'use strict';

var showJumbotron = true;
var latestKnownScrollY = 0;
var ticking = false;

var addClass = function(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
};

var removeClass = function(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

var hideJumbo = function() {
  var header = document.querySelector('header');
  var spacer = document.querySelector('.spacer');
  if (spacer) { addClass(spacer, 'small'); }

  addClass(header, 'small-header');
  showJumbotron = false;
  document.querySelector('header .close-icon').textContent = '+';
};

var showJumbo = function() {
  var header = document.querySelector('header');
  var spacer = document.querySelector('.spacer');
  if (spacer) { removeClass(spacer, 'small'); }
  removeClass(header, 'small-header');
  showJumbotron = true;
  document.querySelector('header .close-icon').textContent = 'x';
};

var hideDescription = function(e) {
  var descriptionElem = e.currentTarget.parentElement;
  addClass(descriptionElem, 'fade-out');
  var infoIcon = document.querySelector('.info-icon');
  removeClass(infoIcon, 'fade-out');
};
var showDescription = function(e) {
  var descriptionElem = document.querySelector('.description');
  removeClass(descriptionElem, 'fade-out');
  var infoIcon = document.querySelector('.info-icon');
  addClass(infoIcon, 'fade-out');
};
var toggleJumbo = function() {
  if (showJumbotron) {
    hideJumbo();
  } else {
    showJumbo();
  }
};

var scrollUpdate = function() {
  ticking = false;
  var currentScrollY = latestKnownScrollY;
  if (currentScrollY > 30 && showJumbotron) {
    hideJumbo();
  }
};

var requestTick = function() {
  if (!ticking) {
    requestAnimationFrame(scrollUpdate);
  }
  ticking = true;
};


/**
 * Provides requestAnimationFrame in a cross browser way.
 * @author paulirish / http://paulirish.com/
 */
if ( !window.requestAnimationFrame ) {
  window.requestAnimationFrame = ( function() {
    return window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
      window.setTimeout( callback, 1000 / 60 );
    };
  } )();
}

window.onscroll = function() {
  latestKnownScrollY = window.scrollY;
  if (showJumbotron) {
    requestTick();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('header .close-icon').addEventListener('click', toggleJumbo);
  document.querySelector('.main-image .close-icon').addEventListener('click', hideDescription);
  document.querySelector('.main-image .info-icon').addEventListener('click', showDescription);
});

// $(document).ready(function() {
//   $('#fullpage').fullpage({
//     // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE']
//   });
// });

// $('.svg-draw path').each(function() {
//   initSvg(this);
// });

// $('.svg-draw').on('mouseenter', function() {
//   $(this).find('path').each(function() {
//     svgAnimation(this, 'in');
//   });
// });
// $('.svg-draw').on('mouseleave', function() {
//   $(this).find('path').each(function() {
//     svgAnimation(this, 'out');
//   });
// });
// $('.scroll-down').click(function(e) {
//   e.preventDefault();
//   $.fn.fullpage.moveSectionDown();
// });
// })();
