import $ from 'jquery';
import Splide from '@splidejs/splide';
import { isMdLte } from './screen';

export default function productSlider() {
  const $elements = $('.js-product-slider');

  if (!$elements.length) return;

  $elements.each(function () {
    const slider = new Splide($(this).find('.splide').get(0) as HTMLElement, {
      type: 'slide',
      gap: 2,
      focus: 0,
      fixedWidth: '22.222vw',
      omitEnd: true,
      arrows: true,
      pagination: false,
      breakpoints: {
        767: {
          fixedWidth: '43.733vw',
          arrows: false,
        },
        991: {
          fixedWidth: '30.272vw',
          arrows: false,
        },
      },
    });

    slider.on('overflow', function (isOverflow) {
      slider.go(0);
      slider.options = {
        arrows: isOverflow && !isMdLte(),
        drag: isOverflow,
      };
    });

    slider.mount();
  });
}
