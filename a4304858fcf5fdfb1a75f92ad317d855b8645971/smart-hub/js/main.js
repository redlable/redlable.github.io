"use strict";

var anchorHash = window.location.hash; // delete hash so the page won't scroll to it

if (window.location.hash.length) {
  window.location.hash = "";
}

(function ($) {
  'use strict'; // Detect IE browser.

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0) {
    $('body').addClass('ie ie' + parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
  } else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    $('body').addClass('ie ie11');
  } else if (/Edge\/\d./i.test(navigator.userAgent)) {
    $('body').addClass('ie edge');
  } // Detect Firefox.


  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    $('body').addClass('firefox');
  } // Detect Safari browser.!


  if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
    $('body').addClass('safari');
  } // Detect mobile device.


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

  isTouchDevice(); // Toggle mobile and desktop behavior

  var $body = $('body');
  window.innerWidth < 1024 ? $body.addClass('mobile-behavior') : $body.addClass('desktop-behavior');
  $.resizeAction(function () {
    return window.innerWidth < 1024;
  }, function (isTrue) {
    isTrue ? $body.removeClass('desktop-behavior').addClass('mobile-behavior') : $body.removeClass('mobile-behavior').addClass('desktop-behavior');
    !isTrue ? $body.removeClass('active-menu') : '';
  }); // Anchors

  (function anchors() {
    var $root = $('html, body'),
        $window = $(window),
        $document = $(document),
        $body = $('body'); // to top right away

    if (window.location.hash) scroll(0, 0); // void some browsers issue
    // setTimeout(function() { scroll(0,0); }, 1);

    $window.on('load', function () {
      var adminMenuHeight = parseInt($body.css('padding-top')) || 0; // headerHeight = $('#header').outerHeight(),
      // fixedHeaderHeight = $window.width() >= 1024 ? headerHeight : 0;
      // *only* if we have anchor on the url

      if (anchorHash) {
        // smooth scroll to the anchor id
        $root.animate({
          scrollTop: $('[data-anchor-id=' + anchorHash.substring(1) + ']').offset().top - adminMenuHeight
          /* - fixedHeaderHeight */

        }, 800, 'swing');
        window.location.hash = anchorHash;
      }
    });
    $('a[href*=\\#]').on('click', function (e) {
      var $scrollEl = $('[data-anchor-id=' + this.hash.substring(1) + ']');

      if ($scrollEl.length) {
        e.preventDefault();

        var _$scrollEl = $(this.hash),
            scrollElOffset = Math.round(_$scrollEl.offset().top),
            adminMenuHeight = parseInt($body.css('padding-top')),
            // headerHeight = $('#header').outerHeight(),
        // fixedHeaderHeight = $window.width() >= 1024 ? headerHeight : 0,
        speed = 400;

        if (scrollElOffset > $document.scrollTop() + $window.height()) {
          speed = 800;
        }

        $root.animate({
          scrollTop: scrollElOffset - adminMenuHeight
          /* - fixedHeaderHeight */

        }, speed);
      }
    }); // Stop scroll animation on user scroll

    $window.on('touchmove mousewheel', function () {
      $root.stop();
    });
  })(); // Sliders


  (function slider() {
    // Product slider
    var $prodSlider = $('.related-product-list'),
        prodSliderOpt = {
      arrows: false,
      centerMode: true,
      variableWidth: true
    };
    $prodSlider.on('init', function (event, slick, direction) {
      slick.$slides.removeClass('prev-slide prev-prev-slide').removeClass('next-slide next-next-slide'); // find current slide

      for (var i = 0; i < slick.$slides.length; i++) {
        var $slide = $(slick.$slides[i]);

        if ($slide.hasClass('slick-current')) {
          // update DOM siblings
          $slide.prev().addClass('prev-slide');
          $slide.prev().prev().addClass('prev-prev-slide');
          $slide.next().addClass('next-slide');
          $slide.next().next().addClass('next-next-slide');
          break;
        }
      }
    }).on('beforeChange', function (e, slick, currentSlide, nextSlide) {
      var slideCount = slick.$slides.length - 1,
          nextSlideIsFirst = currentSlide === slideCount && 0 === nextSlide,
          nextSlideIsLast = nextSlide === slideCount && 0 === currentSlide,
          $activeSlide = $('.slick-active');

      if (nextSlideIsFirst) {
        $activeSlide.next('.slick-slide').addClass('slick-clone-current');
        $activeSlide.next('.slick-slide').next('.slick-slide').addClass('slick-clone-next-current');
        $activeSlide.next('.slick-slide').next('.slick-slide').next('.slick-slide').addClass('slick-clone-next-next-current');
        $activeSlide.addClass('slick-clone-prev-current');
        $activeSlide.prev('.slick-slide').addClass('slick-clone-prev-prev-current');
      }

      if (nextSlideIsLast) {
        $activeSlide.prev('.slick-slide').addClass('slick-clone-current');
        $activeSlide.prev('.slick-slide').prev('.slick-slide').addClass('slick-clone-prev-current');
        $activeSlide.prev('.slick-slide').prev('.slick-slide').prev('.slick-slide').addClass('slick-clone-prev-prev-current');
        $activeSlide.addClass('slick-clone-next-current');
        $activeSlide.next('.slick-slide').addClass('slick-clone-next-next-current');
      }
    }).on('afterChange', function (e, slick, currentSlide, nextSlide) {
      $('.slick-slide').removeClass('slick-clone-current slick-clone-next-current slick-clone-next-next-current slick-clone-prev-current slick-clone-prev-prev-current');
    });
  })(); // Accordion


  (function accordion() {
    $('.faq-header').on('click', function () {
      var $this = $(this);
      $this.closest('.faq-item').siblings().removeClass('active').find('.faq-content').slideUp();
      $this.siblings('.faq-content').slideToggle(400, function () {
        var self = $(this);

        if (self.is(':visible') && self.find('iframe').length) {
          self.find('iframe').each(function (i, el) {
            var iframe = $(el);

            if (!iframe.is('.refreshed')) {
              iframe.attr('src', iframe.attr('src'));
              iframe.addClass('refreshed');
            }
          });
        }
      }).closest('.faq-item').toggleClass('active');
    });
    $('.faq-item').each(function (i, el) {
      $(el).css('transition-delay', i * .1 + 's');
    });
  })(); // Mobile menu


  (function mobileMenu() {
    $('.hamburger-btn').on('click', function () {
      var $header = $('#header'),
          targetElement = $('.main-menu-wrapper')[0];

      if (!$header.hasClass('expanded-menu')) {
        $header.addClass('expanded-menu');
        bodyScrollLock.disableBodyScroll(targetElement);
      } else {
        $header.removeClass('expanded-menu');
        bodyScrollLock.enableBodyScroll(targetElement);
      }
    });
  })(); // Toggle status messages


  (function toggleMessage() {
    $('.message').on('click', function (e) {
      if (!$(e.target).is('a')) {
        $(this).toggleClass('hidden-msg');
      }
    });
  })();
})(jQuery);
//# sourceMappingURL=main.js.map
