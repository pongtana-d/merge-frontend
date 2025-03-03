import $ from 'jquery';

export default function addToCart() {
  const $cartModal = $('.c-modal-cart-added');
  const $btnAdd = $('.js-btn-add-cart');

  if (!$btnAdd.length || !$cartModal.length) return;

  let timeout: number;

  const closeModal = () => {
    $cartModal
      .removeClass('is-active')
      .delay(200)
      .queue(function (next) {
        $(this).stop().fadeOut(200);
        next();
      });
  };

  $btnAdd.on('click', function (e) {
    e.preventDefault();

    $cartModal.stop().fadeIn(200, function () {
      $(this).addClass('is-active');
      timeout = setTimeout(() => {
        closeModal();
      }, 2500);
    });
  });

  $cartModal.find('.js-modal-close').on('click', function (e) {
    e.preventDefault();
    clearTimeout(timeout);
    closeModal();
  });
}
