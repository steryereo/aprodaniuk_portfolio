'use strict';

var showJumbotron = true;
var latestKnownScrollY = 0;
var ticking = false;
var lgHeaderHeight = 345 - 68;
var headerStuck = false;

var colorIndex = 0;
var colors = ['#595959', '#3cd3c4', '#747b6a', '#b89c2f', '#321F39', '#ef6c48'];
var changeColor = function (color) {
  var colorchange = document.querySelectorAll('.color-change');
  var colorchangestroke = document.querySelectorAll('.color-change-stroke');
  [].forEach.call(colorchange, function(el) {
    el.setAttribute('fill', color);
  });
  [].forEach.call(colorchangestroke, function(el) {
    el.setAttribute('stroke', color);
  });
};


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

var stickHeader = function (header) {
  console.log('stick');
  addClass(header, 'fixed-header');
  header.setAttribute('style', 'opacity: 1;');
  headerStuck = true;
};
var unstickHeader = function (header) {
  removeClass(header, 'fixed-header');
  headerStuck = false;
  console.log('unstick');
};
var scrollUpdate = function() {
  ticking = false;
  var currentScrollY = latestKnownScrollY;
  var headerSm = document.querySelector('.header-sm');
  var headerLg = document.querySelector('.header-lg');
  if (headerLg && headerSm) {
    if (currentScrollY <= lgHeaderHeight) {
      if (headerStuck) {
        unstickHeader(headerSm);
      }
      var opacity = (currentScrollY / lgHeaderHeight);
      headerSm.setAttribute('style', 'opacity: ' + (opacity * opacity * opacity).toFixed(2) + ';');
      headerLg.setAttribute('style', 'transform: translateY(-' + (opacity * 68).toFixed(0) + 'px);');
      // headerLg.setAttribute('style', 'opacity: ' + (1 - opacity).toFixed(2) + ';');
    } else if (!headerStuck) {
      stickHeader(headerSm);
    }
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
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function() {
    return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();
}

window.onscroll = function(e) {
  latestKnownScrollY = window.scrollY;
  // console.log(latestKnownScrollY);
  if (showJumbotron) {
    requestTick();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  // document.querySelector('header .close-icon').addEventListener('click', toggleJumbo);
  var infoHide = document.querySelector('.main-image .close-icon');
  if (infoHide) { infoHide.addEventListener('click', hideDescription); }
  var infoShow = document.querySelector('.main-image .info-icon');
  if (infoShow) { infoShow.addEventListener('click', showDescription); }
  setInterval(function() {
    changeColor(colors[colorIndex]);
    colorIndex = (colorIndex + 1) % colors.length;
  }, 10000);
});
