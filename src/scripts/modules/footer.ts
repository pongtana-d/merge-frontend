import $ from 'jquery';

export default function footer() {
  $('#footer')
    .find('button[aria-expanded]')
    .on('click', function (e) {
      e.preventDefault();

      if ($(this).attr('aria-expanded') === 'false') {
        $(this).attr('aria-expanded', 'true');
        $(this)
          .next()
          .stop()
          .slideDown(200, function () {
            $(this).attr('aria-hidden', 'false');
          });
      } else {
        $(this).attr('aria-expanded', 'false');
        $(this)
          .next()
          .stop()
          .slideUp(200, function () {
            $(this).attr('aria-hidden', 'true');
          });
      }
    });
}
