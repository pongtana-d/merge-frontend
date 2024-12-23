import $ from 'jquery';
import Splide from '@splidejs/splide';
import { isSmLte } from './screen';

export default function navFavoriteSlider() {
  const $el = $('#nav-favorite-slider .splide');

  if (!$el.length) return;

  const slider = new Splide($el.get(0) as HTMLElement, {
    type: 'slide',
    fixedWidth: 130,
    gap: 2,
    focus: 0,
    omitEnd: true,
    padding: { left: 16, right: 16 },
    arrows: true,
    pagination: false,
    breakpoints: {
      767: {
        arrows: false,
      },
    },
  });

  slider.on('overflow', function (isOverflow) {
    slider.go(0);
    slider.options = {
      arrows: isOverflow && !isSmLte(),
      drag: isOverflow,
    };
  });

  slider.mount();
}
