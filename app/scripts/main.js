(function() {
  'use strict';

  var initSvg = function(path) {
    var length = path.getTotalLength();
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
  };

  var svgAnimation = function(path, direction) {
    direction = direction || 'in';
    var length = path.getTotalLength();

    var startOffset = (direction === 'in') ? length : 0;
    var endOffset = (direction === 'in') ? 0 : length;

    var currentFrame = 0;
    var totalFrames = 60;
    var handle = 0;

    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = startOffset;

    var draw = function() {
      var progress = currentFrame / totalFrames;
      if (progress >= 1) {
        path.style.strokeDashoffset = endOffset;
        window.cancelAnimationFrame(handle);
      } else {
        currentFrame++;
        path.style.strokeDashoffset = Math.floor(startOffset + progress * (endOffset - startOffset));
        handle = window.requestAnimationFrame(draw);
      }
    };
    draw();
  };

  $(document).ready(function() {
    $('#fullpage').fullpage({
      // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE']
    });
  });

  $('.svg-draw path').each(function() {
    initSvg(this);
  });

  $('.svg-draw').on('mouseenter', function() {
    $(this).find('path').each(function() {
      svgAnimation(this, 'in');
    });
  });
  $('.svg-draw').on('mouseleave', function() {
    $(this).find('path').each(function() {
      svgAnimation(this, 'out');
    });
  });
  $('.scroll-down').click(function(e) {
    e.preventDefault();
    $.fn.fullpage.moveSectionDown();
  });
})();
