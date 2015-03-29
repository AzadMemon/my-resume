(function () {
  'use strict';

  $('.thumbnail').on('click', onThumbnailClick);

  initLazyLoad();

  function initLazyLoad() {
    $('img.lazy').lazyload({effect: 'fadeIn'});
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
        mediumImage: {
          src: $(thumbnails[i]).attr('data-src-small'),
          w: $(thumbnails[i]).attr('data-width-small') || 700,
          h: $(thumbnails[i]).attr('data-height-small') || 500,
          title: $(thumbnails[i]).attr('data-title')
        },
        originalImage: {
          src: $(thumbnails[i]).attr('data-src-large'),
          w: $(thumbnails[i]).attr('data-width-large') || 1200,
          h: $(thumbnails[i]).attr('data-height-large') || 700,
          title: $(thumbnails[i]).attr('data-title')
        }
      });
    }

    var gallery = new PhotoSwipe(photoswipeElement, PhotoSwipeUI_Default, items, options);
    var useLargeImages = false;
    var firstResize = true;
    var imageSrcWillChange;
    var realViewportWidth;

    gallery.listen('beforeResize', function () {
      realViewportWidth = gallery.viewportSize.x * window.devicePixelRatio;

      if (useLargeImages && realViewportWidth < 1000) {
        useLargeImages = false;
        imageSrcWillChange = true;
      } else if (!useLargeImages && realViewportWidth >= 1000) {
        useLargeImages = true;
        imageSrcWillChange = true;
      }

      if (imageSrcWillChange && !firstResize) {
        gallery.invalidateCurrItems();
      }

      if (firstResize) {
        firstResize = false;
      }

      imageSrcWillChange = false;

    });

    gallery.listen('gettingData', function (index, item) {
      if (useLargeImages) {
        item.src = item.originalImage.src;
        item.w = item.originalImage.w;
        item.h = item.originalImage.h;
      } else {
        item.src = item.mediumImage.src;
        item.w = item.mediumImage.w;
        item.h = item.mediumImage.h;
      }
    });

    gallery.init();
  }
})();
