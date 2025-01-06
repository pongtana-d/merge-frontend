import $ from 'jquery';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { isMdLte } from './screen';

export default function productSlider() {
  const $elements = $('.js-product-slider');

  if (!$elements.length) return;

  const checkOverflowItem = (swiper: Swiper): void => {
    if (isMdLte()) return;
    swiper.slides.forEach((el: HTMLElement) => {
      const react: DOMRect = el.getBoundingClientRect();
      const isOverflow: boolean = react.right > document.documentElement.clientWidth;
      $(el).toggleClass('is-overflow', isOverflow);
    });
  };

  $elements.each(function () {
    let timer: number;

    new Swiper($(this).get(0) as HTMLElement, {
      modules: [Navigation],
      spaceBetween: 2,
      slidesPerView: 2.262,
      navigation: {
        nextEl: $(this).find('.swiper-button-next').get(0),
        prevEl: $(this).find('.swiper-button-prev').get(0),
      },
      breakpoints: {
        768: {
          slidesPerView: 3.475,
        },
        992: {
          slidesPerView: 4.475,
        },
      },
      on: {
        afterInit: (swiper) => {
          checkOverflowItem(swiper);
        },
        slideChange: (swiper) => {
          requestAnimationFrame(() => checkOverflowItem(swiper));
        },
        slideChangeTransitionEnd: (swiper) => {
          requestAnimationFrame(() => checkOverflowItem(swiper));
        },
        sliderMove: (swiper) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            requestAnimationFrame(() => checkOverflowItem(swiper));
          }, 100);
        },
      },
    });
  });
}
