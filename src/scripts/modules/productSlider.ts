import $ from 'jquery';
import Splide from '@splidejs/splide';
import { isMdLte } from './screen';

export default function productSlider() {
  const $elements = $('.js-product-slider');

  if (!$elements.length) return;

  $elements.each(function () {
    const slider = new Splide($(this).get(0) as HTMLElement, {
      type: 'slide',
      gap: 2,
      focus: 0,
      speed: 500,
      flickPower: 200,
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

    let intervalTime: number;

    const checkOverflowItem = () => {
      slider.Components.Elements.slides.forEach((el) => {
        const react = el.getBoundingClientRect();
        const isOverflow = react.right > document.documentElement.clientWidth;
        $(el).toggleClass('is-overflow', isOverflow);
      });
    };

    slider.on('ready resized', function () {
      checkOverflowItem();
    });

    slider.on('move drag', function () {
      if (isMdLte()) return;

      clearInterval(intervalTime);
      intervalTime = setInterval(() => {
        requestAnimationFrame(checkOverflowItem);
      }, 100);
    });

    slider.on('moved dragged active', function () {
      clearInterval(intervalTime);
      requestAnimationFrame(checkOverflowItem);
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
