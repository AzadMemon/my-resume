(function () {
  'use strict';

  onWindowResize();
  initHeadroom();

  $(window).resize(onWindowResize);
  $('.thumbnail').on('click', onThumbnailClick);

  function onWindowResize() {
    if ($(window).width() >= 768) {
      initStickySidebar();
      removeHeadroomCss();
    }

    if ($(window).width() < 768) {
      addHeadroomCss();
    }
  }

  function initStickySidebar() {
    $('.contact').stick_in_parent();
  }

  function initHeadroom() {
    $('.headroom').headroom({offset: 45});
  }

  function removeHeadroomCss() {
    $('body').css('padding-top', 0);
    $('.headroom').removeClass('navbar-fixed-top');
  }

  function addHeadroomCss() {
    $('body').css('padding-top', 90);
    $('.headroom').addClass('navbar-fixed-top');
  }

  function onThumbnailClick(event) {
    var photoswipeElement = document.querySelectorAll('.pswp')[0];
    var target = $(event.currentTarget);
    var parent = target.parents('.screenshots');
    var thumbnails = parent.find('.thumbnail');
    var items = [];
    var options = {
      index: parseInt(target.attr('data-index'))
    };

    event.preventDefault();
    event.stopPropagation();

    for (var i = 0; i < thumbnails.length; i++) {
      items.push({
        src: $(thumbnails[i]).attr('data-src'),
        w: $(thumbnails[i]).attr('data-width') || 2800,
        h: $(thumbnails[i]).attr('data-height') || 1400,
        title: $(thumbnails[i]).attr('data-tile')
      });
    }
    var gallery = new PhotoSwipe(photoswipeElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  }
})();
