import $ from 'jquery';

const textareaCount = () => {
  $('.js-textarea-count').each(function () {
    const $textarea = $(this).find('textarea');
    const $number = $(this).find('.js-number');

    $textarea.on('keyup', function () {
      const count = $(this).val()?.length || 0;
      $number?.text(count.toLocaleString());
    });
  });
};

export default function form() {
  textareaCount();
}
