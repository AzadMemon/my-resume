(function () {
  'use strict';

  initLazyLoad();

  $('.thumbnail').on('click', onThumbnailClick);
  $('.learn-more').on('click', onLearnMoreClick);

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
        src: $(thumbnails[i]).attr('data-src'),
        w: $(thumbnails[i]).attr('data-width') || 2800,
        h: $(thumbnails[i]).attr('data-height') || 1400,
        title: $(thumbnails[i]).attr('data-tile')
      });
    }
    var gallery = new PhotoSwipe(photoswipeElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  }

  function onLearnMoreClick(event) {
    var button = $(event.currentTarget);
    var cardCollapsed = $(button.parents('.card-collapsed')[0]);
    var card = $(cardCollapsed.parents('.card'));
    var cardExpanded = $(cardCollapsed.prev('.card-expanded'));
    var newHeight = cardExpanded.height();

    TweenLite.to(card, 1, {height: newHeight}, 0);
    TweenLite.to(cardCollapsed, 1, {top: newHeight}, 0);
    TweenLite.to(cardExpanded, 1, {bottom: 0}, 0);
  }
})();
