import $ from 'jquery';

export function initDefaultModal() {
  $('[data-modal-open]').on('click', function () {
    const target = $(this).data('modal-open');

    if ($(target).length) {
      $(target).stop().fadeIn(200);
    }
  });

  $('.modal').each(function () {
    $(this)
      .find('.js-modal-close')
      .on('click', (e) => {
        e.preventDefault();
        $(this).stop().fadeOut(200);
      });
  });
}

export function addToCartModal() {
  const $modal = $('#modal-cart-added');
  const $btnAdd = $('.js-btn-cart-add');

  if (!$btnAdd.length || !$modal.length) return;

  let timeout: number;

  const closeModal = () => {
    $modal
      .removeClass('is-active')
      .delay(200)
      .queue(function (next) {
        $(this).stop().fadeOut(200);
        next();
      });
  };

  $btnAdd.on('click', function (e) {
    e.preventDefault();

    $modal.stop().fadeIn(200, function () {
      $(this).addClass('is-active');
      timeout = setTimeout(() => {
        closeModal();
      }, 2500);
    });
  });

  $modal.find('.js-modal-close').on('click', function (e) {
    e.preventDefault();
    clearTimeout(timeout);
    closeModal();
  });
}

// export function removeFromCart() {
//   const $modal = $('#modal-cart-remove');
//   const $btnRemove = $('.js-btn-cart-remove');

//   if (!$btnRemove.length || !$modal.length) return;

//   $btnRemove.on('click', function (e) {
//     e.preventDefault();
//     $modal.stop().fadeIn(200);
//   });
// }
