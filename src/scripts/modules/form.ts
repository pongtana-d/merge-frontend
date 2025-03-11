// @ts-nocheck
import $ from 'jquery';
import select2 from 'select2';

select2();
const Defaults = $.fn.select2.amd.require('select2/defaults');
$.extend(Defaults.defaults, {
  searchInputPlaceholder: '',
});

const SearchDropdown = $.fn.select2.amd.require('select2/dropdown/search');
const _renderSearchDropdown = SearchDropdown.prototype.render;
SearchDropdown.prototype.render = function () {
  // invoke parent method
  const $rendered = _renderSearchDropdown.apply(this, Array.prototype.slice.apply(arguments));
  this.$search.attr('placeholder', this.options.get('searchInputPlaceholder'));
  return $rendered;
};

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

const customSelect = () => {
  const formatState = (state) => {
    if (!state.id) {
      return state.text;
    }
    var baseUrl = '/assets/images/flag/';
    var $state = $(
      '<span class="select2-result-flex"><img src="' +
        baseUrl +
        state.element.value.toLowerCase() +
        '.svg" alt="" /> ' +
        state.text +
        '</span>',
    );
    return $state;
  };

  $('.js-custom-select').each(function () {
    $(this).select2({
      width: '100%',
      dropdownParent: $(this).parent(),
      searchInputPlaceholder: 'Search...',
      templateResult: formatState,
      templateSelection: formatState,
    });
  });
};

export default function form() {
  textareaCount();
  customSelect();
}
