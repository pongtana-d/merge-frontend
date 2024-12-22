import $ from 'jquery';
import { screenLock, screenUnlock } from './screen';

const searchMenu = () => {
  const $headerSearch = $('#header-search');
  const $btnSearch = $('#bth-header-search');
  const $btnClose = $headerSearch.find('.js-search-close');

  $btnSearch.on('click', (e) => {
    e.preventDefault();

    screenLock();
    $('#main, #footer').attr('inert', '');
    $btnSearch.attr('aria-expanded', 'true');
    $headerSearch.stop().fadeIn(200, function () {
      $(this).attr('aria-hidden', 'false').removeAttr('inert');
    });
  });

  $btnClose.on('click', (e) => {
    e.preventDefault();

    screenUnlock();
    $('#main, #footer').removeAttr('inert');
    $btnSearch.attr('aria-expanded', 'false');
    $headerSearch.stop().fadeOut(200, function () {
      $(this).attr({
        'aria-hidden': 'true',
        inert: '',
      });
    });
  });
};

const searchForm = () => {
  const $form = $('#header-search-form');
  const $input = $form.find('.js-search-input');
  const $btnClear = $form.find('.js-search-reset');

  $input.on('keyup', function () {
    const value = $(this).val();

    if (typeof value === 'string' && value.length > 0) {
      $btnClear.show();
    } else {
      $btnClear.hide();
    }
  });

  $btnClear.on('click', function () {
    $(this).hide();
  });
};

export default function headerSearch() {
  searchMenu();
  searchForm();
}
