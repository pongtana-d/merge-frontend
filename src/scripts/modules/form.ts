// @ts-nocheck
import $ from 'jquery';
import select2 from 'select2';

select2();
const Defaults = $.fn.select2.amd.require('select2/defaults');
$.extend(Defaults.defaults, {
  searchInputPlaceholder: 'Search...',
  // dropdownPosition: 'below',
});

const SearchDropdown = $.fn.select2.amd.require('select2/dropdown/search');
const _renderSearchDropdown = SearchDropdown.prototype.render;
SearchDropdown.prototype.render = function () {
  const $rendered = _renderSearchDropdown.apply(this, Array.prototype.slice.apply(arguments));
  this.$search.attr('placeholder', this.options.get('searchInputPlaceholder'));
  return $rendered;
};

// const AttachBody = $.fn.select2.amd.require('select2/dropdown/attachBody');
// const _positionDropdown = AttachBody.prototype._positionDropdown;
// AttachBody.prototype._positionDropdown = function () {
//   const $window = $(window);
//   const isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
//   const isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');
//   const offset = this.$container.offset();
//   let newDirection = null;

//   offset.bottom = offset.top + this.$container.outerHeight(false);

//   const container = {
//     height: this.$container.outerHeight(false),
//   };

//   container.top = offset.top;
//   container.bottom = offset.top + container.height;

//   const dropdown = {
//     height: this.$dropdown.outerHeight(false),
//   };
//   const viewport = {
//     top: $window.scrollTop(),
//     bottom: $window.scrollTop() + $window.height(),
//   };
//   const enoughRoomAbove = viewport.top < offset.top - dropdown.height;
//   const enoughRoomBelow = viewport.bottom > offset.bottom + dropdown.height;
//   const css = {
//     left: offset.left,
//     top: container.bottom,
//   };
//   let $offsetParent = this.$dropdownParent;

//   if ($offsetParent.css('position') === 'static') {
//     $offsetParent = $offsetParent.offsetParent();
//   }

//   const parentOffset = $offsetParent.offset();

//   css.top -= parentOffset.top;
//   css.left -= parentOffset.left;

//   const dropdownPositionOption = this.options.get('dropdownPosition');

//   if (dropdownPositionOption === 'above' || dropdownPositionOption === 'below') {
//     newDirection = dropdownPositionOption;
//   } else {
//     if (!isCurrentlyAbove && !isCurrentlyBelow) {
//       newDirection = 'below';
//     }
//     if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
//       newDirection = 'above';
//     } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
//       newDirection = 'below';
//     }
//   }
//   if (newDirection == 'above' || (isCurrentlyAbove && newDirection !== 'below')) {
//     css.top = container.top - parentOffset.top - dropdown.height;
//   }
//   if (newDirection != null) {
//     this.$dropdown
//       .removeClass('select2-dropdown--below select2-dropdown--above')
//       .addClass('select2-dropdown--' + newDirection);
//     this.$container
//       .removeClass('select2-container--below select2-container--above')
//       .addClass('select2-container--' + newDirection);
//   }
//   this.$dropdownContainer.css(css);
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

const inputFocus = () => {
  const isFocus = 'is-focus';
  const isFill = 'is-fill';

  $('.js-input-focus').each(function () {
    const $el = $(this);
    $(this)
      .find('input')
      .on('focus', function () {
        $el.addClass(isFocus);
      })
      .on('blur', function () {
        $el.removeClass(isFocus);
      })
      .on('change', function () {
        $el.toggleClass(isFill, () => $(this).val() !== '');
      });
  });
};

const customDropdown = () => {
  $('.js-custom-dropdown').each(function () {
    const isCountry = $(this).data('country');
    const placeholder = $(this).data('placeholder') || null;

    const options = {
      width: '100%',
      dropdownParent: $(this).parent(),
      placeholder: placeholder,
    };

    const formatCountry = (state) => {
      if (!state.id) {
        return state.text;
      }
      const baseUrl = '/assets/images/flag/';
      const $state = $(
        '<span class="select2-result-flex"><img src="' +
          baseUrl +
          state.element.value.replaceAll(' ', '-').toLowerCase() +
          '.svg" alt="" /> ' +
          state.text +
          '</span>',
      );
      return $state;
    };

    if (isCountry) {
      options.templateResult = formatCountry;
      options.templateSelection = formatCountry;
    }

    $(this).select2(options);
  });
};

export default function form() {
  textareaCount();
  inputFocus();
  customDropdown();
}
