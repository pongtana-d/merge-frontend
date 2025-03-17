// @ts-nocheck
import $ from 'jquery';
// import select2 from 'select2';

// select2();
// const Defaults = $.fn.select2.amd.require('select2/defaults');
// $.extend(Defaults.defaults, {
//   searchInputPlaceholder: 'Search...',
// });

// const SearchDropdown = $.fn.select2.amd.require('select2/dropdown/search');
// const _renderSearchDropdown = SearchDropdown.prototype.render;
// SearchDropdown.prototype.render = function () {
//   const $rendered = _renderSearchDropdown.apply(this, Array.prototype.slice.apply(arguments));
//   this.$search.attr('placeholder', this.options.get('searchInputPlaceholder'));
//   return $rendered;
// };

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

// const customDropdown = () => {
//   $('.js-custom-dropdown').each(function () {
//     const isCountry = $(this).data('country');
//     const placeholder = $(this).data('placeholder') || null;

//     const options = {
//       width: '100%',
//       dropdownParent: $(this).parent(),
//       placeholder: placeholder,
//     };

//     const formatCountry = (state) => {
//       if (!state.id) {
//         return state.text;
//       }
//       const baseUrl = '/assets/images/flag/';
//       const $state = $(
//         '<span class="select2-result-flex"><img src="' +
//           baseUrl +
//           state.element.value.replaceAll(' ', '-').toLowerCase() +
//           '.svg" alt="" /> ' +
//           state.text +
//           '</span>',
//       );
//       return $state;
//     };

//     if (isCountry) {
//       options.templateResult = formatCountry;
//       options.templateSelection = formatCountry;
//     }

//     $(this).select2(options);
//   });
// };

export default function form() {
  textareaCount();
  formInputFilled();
  // customDropdown();
}
