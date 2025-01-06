import $ from 'jquery';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export default function navFavoriteSlider() {
  const $el = $('#nav-favorite-slider .swiper');

  if (!$el.length) return;

  new Swiper($el.get(0) as HTMLElement, {
    modules: [Navigation],
    slidesPerView: 2.73,
    spaceBetween: 2,
    slidesOffsetBefore: 16,
    slidesOffsetAfter: 16,
    navigation: {
      nextEl: $el.find('.swiper-button-next').get(0),
      prevEl: $el.find('.swiper-button-prev').get(0),
    },
  });
}
