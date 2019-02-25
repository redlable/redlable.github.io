(function($) {
  'use strict';

  // Detect IE browser.
  let ua = window.navigator.userAgent;
  let msie = ua.indexOf("MSIE ");

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

  // Detect Safari browser.!
  if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
    $('body').addClass('safari');
  }

  // Detect mobile device.
  function isTouchDevice() {
    let $body = $('body');

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
  let $body = $('body');

  window.innerWidth < 991 ? $body.addClass('mobile-behavior') : $body.addClass('desktop-behavior');

  $.resizeAction(function() {
    return window.innerWidth < 991;
  }, function(isTrue) {
    isTrue ? $body.removeClass('desktop-behavior').addClass('mobile-behavior') : $body.removeClass('mobile-behavior').addClass('desktop-behavior');
    !isTrue ? $body.removeClass('active-menu') : '';
  });

  // Hero slider
  let $slider = $('.slider');

  if ($slider.children().length > 1) {
    $slider.each(function() {
      let $slider = $(this),
          options = {
            autoplay: true,
            autoplaySpeed: 8000,
            arrows: false,
            dots: true,
            fade: true,
            speed: 1000
          };

      $slider.slick(options);
    });
  }

  // Accordion
  (function accordion() {
    $('.faq-header').on('click', function() {
      let $this = $(this);

      $this.closest('.faq-item').siblings().removeClass('active')
        .find('.faq-content').slideUp();

      $this
        .siblings('.faq-content').slideToggle()
        .closest('.faq-item').toggleClass('active');
    });

    $('.faq-item').each(function(i, el) {
      $(el).css('transition-delay', (i * .1) + 's');
    });
  })();

  // Scroll animations
  (function scrollAnimaiton() {
    let $sections = $('.content-container').children();
    let $rowTitle = $('.group-title');
    let $rowList = $('.step-row');

    $sections.add($rowList).add($rowTitle).each(function(i, el) {
      let $el = $(el);

      if ($el.isVisible(true)) {
        $el.addClass('in-view');
      }
    });

    $(window).on('scroll', function () {
      let $window = $(window);
      let thirdhWinHeight = $window.height() / 3;
      let viewTop = $window.scrollTop();
      let viewBottom = viewTop + $window.height();

      $sections.add($rowList).add($rowTitle).each(function (i, el) {
        let $el = $(el);
        let elemTopPos = $el.offset().top;

        if ($el.isVisible(true) && elemTopPos < (viewBottom - thirdhWinHeight)) {
          $el.addClass("in-view");
        }
      });
    });

    // Sticky header
    let $header = $('#header');

    if (window.scrollY > 0) {
      $header.addClass('sticky');
    }

    $.scrollAction(function() {
      return $(window).scrollTop() > 0;
    }, function(isTrue) {
      isTrue ? $header.addClass('sticky') : $header.removeClass('sticky');
    });
  })();

  // Toggle status messages
  (function toggleMessage() {
    $('.message').on('click', function(e) {
      if (!$(e.target).is('a')) {
        $(this).toggleClass('hidden-msg');
      }
    });
  })();

})(jQuery);
