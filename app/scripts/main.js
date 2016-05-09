
  'use strict';

  var showJumbotron = true;
  var latestKnownScrollY = 0;
  var ticking = false;

  window.onscroll = function() {
    latestKnownScrollY = window.scrollY;
    requestTick();
  }

  function requestTick() {
    if(!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  }
  function update() {
    ticking = false;
    var currentScrollY = latestKnownScrollY;
    if (currentScrollY > 30 && showJumbotron) {
    
    }
  }

  function hideJumbo() {
     var jt = document.querySelector('.jumbotron')
      if (jt.classList)
        jt.classList.add('slideup');
      else {
        jt.className += ' ' + 'slideup';
      }
      showJumbotron = false;
      document.querySelector('.close-icon').textContent = '+';
  }
  function showJumbo() {
    var jt = document.querySelector('.jumbotron')
    if (jt.classList)
      jt.classList.remove('slideup');
    else
      jt.className = jt.className.replace(new RegExp('(^|\\b)' + 'slideup'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    showJumbotron = true;
    document.querySelector('.close-icon').textContent = 'x';
  }

  function toggleJumbo() {
    if (showJumbotron) {
      hideJumbo();
    } else {
      showJumbo();
    }
  }

document.addEventListener("DOMContentLoaded", function() {
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
