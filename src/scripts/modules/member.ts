import $ from 'jquery';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

export function memberRankSlider() {
  const $el = $('.js-box-member-club');

  if (!$el.length) return;

  const $sliderEl = $el.find('.js-member-rank-slider');
  const $buttons = $el.find('.js-rank-button button');

  const slider = new Swiper($sliderEl.get(0) as HTMLElement, {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    on: {
      afterInit: (swiper) => {
        const lastActiveIndex = $buttons.filter('.is-active').last().index();
        const index = lastActiveIndex > 0 ? lastActiveIndex : 0;
        $buttons.eq(index).addClass('is-selected');
        swiper.slideTo(index);

        $buttons.on('click', function () {
          swiper.slideTo($(this).index());
        });
      },
      slideChange: (swiper) => {
        const { activeIndex } = swiper;
        $buttons.removeClass('is-selected').eq(activeIndex).addClass('is-selected');
      },
    },
  });

  slider;
}
