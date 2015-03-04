(function () {
  'use strict';

  initLazyLoad();
  setCardOffsets();
  adjustCardHeight();

  window.onresize = adjustCardHeight;
  $('.thumbnail').on('click', onThumbnailClick);
  $('.learn-more').on('click', onLearnMoreClick);
  $('.learn-less').on('click', onLearnLessClick);

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

  function setCardOffsets() {
    var expandedCards = $('.card-expanded');

    for (var i = 0; i < expandedCards.length; i++) {
      var expandedCard = $(expandedCards[i]);
      var collapsedCard = $(expandedCard.next('.card-collapsed'));
      var collapsedCardHeight = collapsedCard.css('height');

      expandedCard.css('bottom', collapsedCardHeight);
    }
  }

  var ANIMATION_DELAY = 0.75;
  var TOGGLE_CLASS = 'open';

  function onLearnMoreClick(event) {
    var target = $(event.currentTarget);
    var card = getCard(target);
    var collapsedCard = getCollapsedCard(card);
    var expandedCard = getExpandedCard(card);
    var newHeight = expandedCard.outerHeight();
    var animation = {
      height: newHeight,
      top: newHeight,
      bottom: 0
    };

    animateCard(card, collapsedCard, expandedCard, animation);
    toggleCardClass(card);
  }

  function onLearnLessClick(event) {
    var target = $(event.currentTarget);
    var card = getCard(target);
    var collapsedCard = getCollapsedCard(card);
    var expandedCard = getExpandedCard(card);
    var newHeight = collapsedCard.outerHeight();
    var animation = {
      height: newHeight,
      top: 0,
      bottom: newHeight
    };

    loadImagesInExpandedCard(expandedCard);
    animateCard(card, collapsedCard, expandedCard, animation);
    toggleCardClass(card);
  }

  function loadImagesInExpandedCard(expandedCard) {
    var images = expandedCard.find('img.lazy');
    for (var i = 0; i < images.length; i++) {
      $(images[i]).trigger("scroll");
    }
  }

  function getCard(target) {
    return $(target.parents('.card'));
  }

  function getCollapsedCard(card) {
    return $(card.children('.card-collapsed'));
  }

  function getExpandedCard(card) {
    return $(card.children('.card-expanded'));
  }

  function toggleCardClass(card) {
    card.toggleClass(TOGGLE_CLASS);
  }

  function animateCard(card, collapsedCard, expandedCard, animation) {
    TweenLite.to(card, ANIMATION_DELAY, {height: animation.height}, 0);
    TweenLite.to(collapsedCard, ANIMATION_DELAY, {top: animation.top}, 0);
    TweenLite.to(expandedCard, ANIMATION_DELAY, {bottom: animation.bottom}, 0);
  }

  function adjustCardHeight() {
    var cards = $('.card');

    for (var i = 0; i < cards.length; i++) {
      var card = $(cards[i]);
      var expandedCard = $(card.children('.card-expanded'));
      var collapsedCard = $(card.children('.card-collapsed'));
      var newHeight;

      if (card.hasClass(TOGGLE_CLASS)) {
        newHeight = expandedCard.outerHeight();

        card.css('height', newHeight);
        collapsedCard.css('top', newHeight);
      } else {
        newHeight = collapsedCard.outerHeight();

        card.css('height', newHeight);
        expandedCard.css('bottom', newHeight);
      }
    }
  }
})();
