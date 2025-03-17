import $ from 'jquery';

const textareaCount = () => {
  $('.js-textarea-count').each(function () {
    const $textarea = $(this).find('textarea');
    const $number = $(this).find('.js-number');

    $textarea
      .on('keyup', function () {
        const count = $(this).val()?.length || 0;
        $number?.text(count.toLocaleString());
      })
      .trigger('keyup');
  });
};

const formInputFilled = () => {
  $('.js-input-fill').each(function () {
    const $el = $(this);
    $(this)
      .find('input')
      .on('change', function () {
        $el.toggleClass('is-fill', $(this).val() !== '');
      });
  });
};

export default function form() {
  textareaCount();
  formInputFilled();
}
