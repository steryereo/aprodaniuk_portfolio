'use strict';

var showJumbotron = true;
var latestKnownScrollY = 0;
var ticking = false;

var hideJumbo = function() {
  var header = document.querySelector('header');
  var spacer = document.querySelector('.spacer');
  spacer.style.display = 'block';
  if (header.classList) {
    header.classList.add('small-header');
  } else {
    header.className += ' ' + 'small-header';
  }
  showJumbotron = false;
  document.querySelector('.close-icon').textContent = '+';
};

var showJumbo = function() {
  var header = document.querySelector('header');
  var spacer = document.querySelector('.spacer');
  
  if (header.classList) {
    header.classList.remove('small-header');
  } else {
    header.className = header.className.replace(new RegExp('(^|\\b)' + 'small-header'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
  showJumbotron = true;
  document.querySelector('.close-icon').textContent = 'x';
  spacer.style.display = 'none';
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

window.onscroll = function() {
  latestKnownScrollY = window.scrollY;
  requestTick();
};

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.close-icon').addEventListener('click', toggleJumbo);
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
