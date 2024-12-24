import $ from 'jquery';
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export default function marqueeSlider() {
  const $elements = $('.js-marquee-slider');

  if (!$elements.length) return;

  $elements.each(function () {
    const slider = new Splide($(this).get(0) as HTMLElement, {
      type: 'loop',
      drag: false,
      focus: 'center',
      autoWidth: true,
      arrows: false,
      pagination: false,
      autoScroll: {
        autoStart: true,
        speed: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
      },
    });

    slider.mount({ AutoScroll });
  });
}
