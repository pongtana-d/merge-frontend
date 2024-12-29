import $ from 'jquery';

export default function listAccordion() {
  const $list = $('.js-list-accordion');

  if (!$list.length) return;

  $list.each(function () {
    const $button = $(this).find('[aria-expanded]');

    $button.on('click', function (e) {
      e.preventDefault();
      const $content = $(this).next('[aria-hidden]');
      const isOpen = $(this).attr('aria-expanded');

      if (isOpen === 'false') {
        $(this).attr('aria-expanded', 'true');
        $content.stop().slideDown(200, function () {
          $(this).attr('aria-hidden', 'false');
        });
      } else {
        $(this).attr('aria-expanded', 'false');
        $content.stop().slideUp(200, function () {
          $(this).attr('aria-hidden', 'true');
        });
      }
    });
  });
}
