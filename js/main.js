"use strict";

var anchorHash = window.location.hash;

// delete hash so the page won't scroll to it
if (window.location.hash.length) {
  window.location.hash = "";
}

(function ($) {
  'use strict';

  // Detect IE browser.

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0) {
    $('body').addClass('ie ie' + parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
  } else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    $('body').addClass('ie ie11');
  }

  // Detect Firefox.
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    $('body').addClass('firefox');
  }

  // Detect Safari browser.!
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

  window.innerWidth < 1024 ? $body.addClass('mobile-behavior') : $body.addClass('desktop-behavior');

  $.resizeAction(function () {
    return window.innerWidth < 1024;
  }, function (isTrue) {
    isTrue ? $body.removeClass('desktop-behavior').addClass('mobile-behavior') : $body.removeClass('mobile-behavior').addClass('desktop-behavior');
    !isTrue ? $body.removeClass('active-menu') : '';
  });

  // Anchors
  (function () {
    var $root = $('html, body'),
        $window = $(window),
        $document = $(document),
        $body = $('body');

    // to top right away
    if (window.location.hash) scroll(0, 0);
    // void some browsers issue
    // setTimeout(function() { scroll(0,0); }, 1);

    $window.on('load', function () {
      var adminMenuHeight = parseInt($body.css('padding-top')) || 0,
          headerHeight = $('#header').outerHeight(),
          fixedHeaderHeight = $window.width() >= 1024 ? headerHeight - 20 : 0;

      // *only* if we have anchor on the url
      if (anchorHash) {

        // smooth scroll to the anchor id
        $root.animate({
          scrollTop: $(anchorHash).offset().top - adminMenuHeight - fixedHeaderHeight
        }, 800, 'swing');

        window.location.hash = anchorHash;
      }
    });

    $('a[href^=\\#]').on('click', function (e) {
      e.preventDefault();

      var $scrollEl = $(this.hash),
          scrollElOffset = Math.round($scrollEl.offset().top),
          adminMenuHeight = parseInt($body.css('padding-top')),
          headerHeight = $('#header').outerHeight(),
          fixedHeaderHeight = $window.width() >= 1024 ? headerHeight - 20 : 0,
          speed = 400;

      if (scrollElOffset > $document.scrollTop() + $window.height()) {
        speed = 800;
      }

      $root.animate({
        scrollTop: scrollElOffset - adminMenuHeight - fixedHeaderHeight
      }, speed);
    });

    // Stop scroll animation on user scroll
    $window.on('touchmove mousewheel', function () {
      $root.stop();
    });
  })();

  // Sliders
  (function slider() {
    var $slider = $('.slider');

    if ($slider.children().length > 1) {
      $slider.each(function () {
        var $slider = $(this),
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

    // Guide slider
    var $guideSlider = $('.guide-slider').find('.step-container'),
        guideSliderOpt = {
      arrows: false,
      infinite: false
    };

    if (window.innerWidth < 768) {
      $guideSlider.slick(guideSliderOpt);
    }

    $.resizeAction(function () {
      return window.innerWidth < 768;
    }, function (isTrue) {
      if (!isTrue) {

        $guideSlider.slick('unslick');
      } else {
        if (!$guideSlider.is('.slick-initialized')) {
          $guideSlider.slick(guideSliderOpt);
        }
      }
    });

    // Product slider
    var $prodSlider = $('.related-product-list'),
        prodSliderOpt = {
      // arrows: false,
      centerMode: true,
      variableWidth: true
    };

    $prodSlider.on('init', function (event, slick, direction) {
      slick.$slides.removeClass('prev-slide prev-prev-slide').removeClass('next-slide next-next-slide');

      // find current slide
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

    if (window.innerWidth < 768) {
      $prodSlider.each(function () {
        $(this).slick(prodSliderOpt);
      });
    }

    $.resizeAction(function () {
      return window.innerWidth < 768;
    }, function (isTrue) {
      if (!isTrue) {
        $prodSlider.slick('unslick');
      } else {
        if (!$prodSlider.is('.slick-initialized')) {
          $prodSlider.slick(prodSliderOpt);
        }
      }
    });

    $prodSlider.on('click', function (event) {
      var $target = $(event.target);

      if ($target.is('.slick-next') || $target.is('.slick-prev') || $target.is('.slick-dots button')) {
        var $activeSlide = $(this).find('.slick-current');

        $(this).find('.slick-slide').removeClass('prev-slide prev-prev-slide next-slide next-next-slide');

        $activeSlide.prev().addClass('prev-slide');
        $activeSlide.prev().prev().addClass('prev-prev-slide');
        $activeSlide.next().addClass('next-slide');
        $activeSlide.next().next().addClass('next-next-slide');
      }
    });

    $prodSlider.on('swipe', function (event, slick, direction) {
      event.preventDefault();
      var $activeSlide = $(this).find('.slick-current');
      console.log(direction);

      $(this).find('.slick-slide').removeClass('prev-slide prev-prev-slide next-slide next-next-slide');

      $activeSlide.prev().addClass('prev-slide');
      $activeSlide.prev().prev().addClass('prev-prev-slide');
      $activeSlide.next().addClass('next-slide');
      $activeSlide.next().next().addClass('next-next-slide');
    });
  })();

  // Accordion
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
  })();

  // Scroll animations
  (function scrollAnimaiton() {
    var $sections = $('.content-container').children();
    var $rowTitle = $('.group-title');
    var $rowList = $('.step-item');

    $sections.add($rowList).add($rowTitle).each(function (i, el) {
      var $el = $(el);

      if ($el.isVisible(true)) {
        $el.addClass('in-view');
      }
    });

    $(window).on('scroll', function () {
      var $window = $(window);
      var sixthWinHeight = $window.height() / 6;
      var viewTop = $window.scrollTop();
      var viewBottom = viewTop + $window.height();

      $sections.add($rowList).add($rowTitle).each(function (i, el) {
        var $el = $(el);
        var elemTopPos = $el.offset().top;

        if ($el.isVisible(true) && elemTopPos < viewBottom - sixthWinHeight) {
          $el.addClass("in-view");
        }
      });
    });

    // Sticky header
    var $header = $('#header');

    if (window.scrollY > 0) {
      $header.addClass('sticky');
    }

    $.scrollAction(function () {
      return $(window).scrollTop() > 0;
    }, function (isTrue) {
      isTrue ? $header.addClass('sticky') : $header.removeClass('sticky');
    });
  })();

  // Mobile menu
  (function mobileMenu() {
    var $header = $('#header');
    var $mobMenuBtn = $('.hamburger-btn');
    var $closeMenuBtn = $('.close-menu');

    $mobMenuBtn.on('click', function () {
      $header.addClass('active-menu');
    });

    $closeMenuBtn.on('click', function () {
      $header.removeClass('active-menu');
    });
  })();

  // Toggle status messages
  (function toggleMessage() {
    $('.message').on('click', function (e) {
      if (!$(e.target).is('a')) {
        $(this).toggleClass('hidden-msg');
      }
    });
  })();
})(jQuery);
//# sourceMappingURL=main.js.map
