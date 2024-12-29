import $ from 'jquery';

export default function selectReviewStars() {
  const $select = $('.js-select-review-stars');

  $select.each(function () {
    const $text = $(this).find('[aria-expanded]');
    const $options = $(this).find('[aria-hidden]');
    const $input = $(this).find('input');

    const closeOptions = () => {
      $text.attr('aria-expanded', 'false');
      $options.hide().attr('aria-hidden', 'true');
    };

    $text.on('click', function (e) {
      e.preventDefault();
      const isOpen = $text.attr('aria-expanded');

      if (isOpen === 'false') {
        $(this).attr('aria-expanded', 'true');
        $options.show().attr('aria-hidden', 'false');
      } else {
        closeOptions();
      }
    });

    $options.find('[data-value]').on('click', function (e) {
      e.preventDefault();
      const value = $(this).data('value');
      const text = $(this).data('text');

      $text.text(text);
      $input.val(value);
      closeOptions();
    });
  });
}
