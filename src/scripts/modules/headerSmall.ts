import $ from 'jquery';

export default function headerSmall() {
  const $header = $('#header');

  const detectScroll = () => {
    if ($('html').attr('data-screen-locked') === 'true') return;

    const top = $(window).scrollTop() || 0;

    if (top > 0) {
      $header.attr('data-small', 'true');
    } else {
      $header.attr('data-small', 'false');
    }
  };

  $(window).on('scroll', function () {
    requestAnimationFrame(detectScroll);
  });
}
