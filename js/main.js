(function($) {
  'use strict';

  // Detect IE browser.
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  var moveSlide = false;

  if (msie > 0) {
    $('body').addClass('ie ie' + parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
  }
  else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    $('body').addClass('ie ie11');
  }

  // Detect Firefox.
  if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){
    $('body').addClass('firefox');
  }

  // Detect Safari browser.
  if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
    $('body').addClass('safari');
  }

  // Detect mobile device.
  function isTouchDevice() {
    var $body = $('body');

    if ('ontouchstart' in document) {
      $body.addClass('mobile');

      if (/iP(hone|od|ad)/i.test(navigator.userAgent)) {
        $body.addClass('ios');
      }

      return true;
    }
  }

  isTouchDevice();

  // Toggle mobile and desktop behavior
  var $body = $('body');

  window.innerWidth < 991 ? $body.addClass('mobile-behavior') : $body.addClass('desktop-behavior');

  $.resizeAction(function() {
    return window.innerWidth < 991;
  }, function(isTrue) {
    isTrue ? $body.removeClass('desktop-behavior').addClass('mobile-behavior') : $body.removeClass('mobile-behavior').addClass('desktop-behavior');
    !isTrue ? $body.removeClass('active-menu') : '';
  });

  $('.related-section').find('.box-list').each(function() {
    var $slider = $(this),
        options = {
          infinite: false,
          slidesToShow: 4
        };

    $slider.slick(options);
  });

  $('.hamburger-btn').on('click', function() {
    $body.toggleClass('active-menu');
  });

  // Layout switcher
  $('.layout-switcher').on('click', function(e) {
    var $target = $(e.target),
        $boxList = $('.box-list-wrapper');

    if (!$target.is('.active')) {
      $(this).children().removeClass('active');

      if ($target.is('.line')) {
        $target.addClass('active');
        $boxList.toggleClass('long small');
      }

      if ($target.is('.puzzles')) {
        $target.addClass('active');
        $boxList.toggleClass('small long');
      }
    }
  });

})(jQuery);
