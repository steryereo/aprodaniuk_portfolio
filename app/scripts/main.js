'use strict';

var lgHeaderHeight = 345 - 68;
var headerStuck = false;

var colorIndex = 0;
var colors = ['#595959', '#3cd3c4', '#747b6a', '#b89c2f', '#321F39', '#ef6c48'];
var changeColor = function(color) {
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

var toggleClass = function(el, className) {
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push(className);
    }
    el.className = classes.join(' ');
  }
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

var stickHeader = function(header) {
  addClass(header, 'fixed-header');
  header.setAttribute('style', 'opacity: 1;');
  headerStuck = true;
};
var unstickHeader = function(header) {
  removeClass(header, 'fixed-header');
  headerStuck = false;
};

var addScrollListener = function(elem, scrollFunc) {
  var listener = {};
  listener.ticking = false;
  listener.scrollFunc = scrollFunc || function() {};
  listener.element = elem;

  elem.onscroll = function(e) {
    if (!listener.ticking) {
      var latestX = listener.element.scrollLeft || listener.element.scrollX;
      var latestY = listener.element.scrollTop || listener.element.scrollY;
      requestAnimationFrame(function() {
        this.ticking = false;
        this.scrollFunc.call(this, latestX, latestY);
      }.bind(listener));
    }
    listener.ticking = true;
  };
};

var animateScroll = function(element, target, duration, direction, callback) {
  var scrollDir = direction || 'scrollTop';

  if (duration <= 0) {
    element[scrollDir] = target;
    return;
  }

  target = Math.round(target);
  var totalFrames = Math.round(duration * 60);

  var start = element[scrollDir];
  var distance = target - start;

  var currentFrame = 0;
  var handle = 0;

  var draw = function() {
    var progress = currentFrame / totalFrames;
    if (progress >= 1) {
      element[scrollDir] = target;
      window.cancelAnimationFrame(handle);
      if (callback) { callback(); }
    } else {
      currentFrame++;
      element[scrollDir] = Math.floor(start + progress * (target - start));
      handle = window.requestAnimationFrame(draw);
    }
  };
  draw();

};

var headerInit = function() {
  addScrollListener(window, function(sX, sY) {
    var headerSm = document.querySelector('.header-sm');
    var headerLg = document.querySelector('.header-lg');
    if (headerLg && headerSm) {
      if (sY <= lgHeaderHeight) {
        if (headerStuck) {
          unstickHeader(headerSm);
        }
        var opacity = (sY / lgHeaderHeight);
        headerSm.setAttribute('style', 'opacity: ' + (opacity * opacity * opacity).toFixed(2) + ';');
        headerLg.setAttribute('style', 'transform: translateY(-' + (opacity * 68).toFixed(0) + 'px);');
      } else if (!headerStuck) {
        stickHeader(headerSm);
      }
    }
  });
  var scrollButton = document.querySelector('.header-icon');
  scrollButton.addEventListener('mousedown', function() {
    animateScroll(document.body, lgHeaderHeight, 0.25);
  });
};

var galleryInit = function() {
  var gallery = document.querySelector('.gallery');
  var totalWidth = gallery.scrollWidth;
  var rows = gallery.querySelectorAll('.row');
  [].forEach.call(rows, function(row) {
    row.innerHTML = row.innerHTML + row.innerHTML + row.innerHTML;
  });
  var loopGallery = function(sX, sY) {
    if (sX < 200) {
      this.element.scrollLeft = sX + totalWidth;
    } else if (sX > totalWidth + 200) {
      this.element.scrollLeft = sX - totalWidth;
    }
  };
  addScrollListener(gallery, loopGallery);
  gallery.scrollLeft = totalWidth;
  var scrolling = false;
  var doScroll = true;
  var scrollGallery = function(distance) {
    if (doScroll) {
      scrolling = true;
      animateScroll(gallery, gallery.scrollLeft + distance, 0.01, 'scrollLeft', function() {
        loopGallery.call({element: gallery}, gallery.scrollLeft, 0);
        scrollGallery(distance);
      });
    }
  };
  gallery.querySelector('.gallery-left').addEventListener('mouseenter', function () {
    doScroll = true;
    scrollGallery(-10);
  });
  gallery.querySelector('.gallery-left').addEventListener('mouseleave', function() {
    doScroll = false;
  });
  gallery.querySelector('.gallery-right').addEventListener('mouseenter', function() {
    doScroll = true;
    scrollGallery(10);
  });
  gallery.querySelector('.gallery-right').addEventListener('mouseleave', function() {
    doScroll = false;
  });
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


document.addEventListener('DOMContentLoaded', function() {
  var header = document.querySelector('.header-lg');
  if (header) { headerInit(); }
  var gallery = document.querySelector('.gallery');
  if (gallery) { galleryInit(); }
  var infoHide = document.querySelector('.main-image .close-icon');
  if (infoHide) { infoHide.addEventListener('click', hideDescription); }
  var infoShow = document.querySelector('.main-image .info-icon');
  if (infoShow) { infoShow.addEventListener('click', showDescription); }
  var navDisclose = document.querySelector('.nav-disclose');
  if (navDisclose) {
    navDisclose.addEventListener('click', function () {
      toggleClass(document.querySelector('.nav-list'), 'show');
    });
  }

  setInterval(function() {
    changeColor(colors[colorIndex]);
    colorIndex = (colorIndex + 1) % colors.length;
  }, 10000);
});
