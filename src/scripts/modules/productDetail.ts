import $ from 'jquery';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { isSmLte, isMdLte, isSmGt, isMdGt } from './screen';

interface SwiperInstance {
  initialized: boolean;
}

const productGallery = () => {
  const $el = $('.js-product-gallery');

  if (!$el.length) return;

  if ($el.find('.swiper-slide').length < 3) {
    $el.attr('data-justify-center', 'true');
  }

  new Swiper($el.get(0) as HTMLElement, {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
    },
  });
};

const productColor = () => {
  const $el = $('.js-product-color-slider');

  if (!$el.length) return;

  const totalSlides = $el.find('.swiper-slide').length;

  if (totalSlides < 4) {
    $el.attr('data-is-overflow', 'false');
  }

  new Swiper($el.get(0) as HTMLElement, {
    modules: [Navigation],
    slidesPerView: totalSlides > 3 ? 3.181 : 3,
    spaceBetween: 2,
    navigation: {
      nextEl: $el.find('.swiper-button-next').get(0),
      prevEl: $el.find('.swiper-button-prev').get(0),
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
    },
    on: {
      afterInit: (swiper) => {
        const activeIndex = $(swiper.slides).find('[aria-current="true"]').parent().index();
        if (activeIndex >= 0) swiper.slideTo(activeIndex);
      },
    },
  });
};

const productMatch = () => {
  const $el = $('.js-product-match');

  if (!$el.length) return;

  const totalSlides = $el.find('.swiper-slide').length;

  if (totalSlides < 3) {
    $el.attr('data-is-overflow', 'false');
  }

  new Swiper($el.get(0) as HTMLElement, {
    modules: [Navigation],
    spaceBetween: 2,
    slidesPerView: totalSlides > 2 ? 2.262 : 2,
    navigation: {
      nextEl: $el.find('.swiper-button-next').get(0),
      prevEl: $el.find('.swiper-button-prev').get(0),
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
      resize: () => {
        if ((isMdGt() && totalSlides < 5) || (isSmGt() && totalSlides < 4)) {
          $el.attr('data-justify-center', 'true');
        } else {
          $el.attr('data-justify-center', 'false');
        }
      },
    },
  });
};

const productRelated = () => {
  const $el = $('.js-product-related');

  if (!$el.length) return;

  const checkOverflowItem = (swiper: Swiper): void => {
    if (isMdLte()) return;
    swiper.slides.forEach((el: HTMLElement) => {
      const react: DOMRect = el.getBoundingClientRect();
      const isOverflow: boolean = react.right > document.documentElement.clientWidth;
      $(el).toggleClass('is-overflow', isOverflow);
    });
  };

  let timer: number;
  let slider: Swiper & SwiperInstance;

  const initSlider = () => {
    slider = new Swiper($el.get(0) as HTMLElement, {
      modules: [Navigation],
      spaceBetween: 2,
      slidesPerView: 3.475,
      navigation: {
        nextEl: $el.find('.swiper-button-next').get(0),
        prevEl: $el.find('.swiper-button-prev').get(0),
      },
      breakpoints: {
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
    }) as Swiper & SwiperInstance;
  };

  const checkScreenSize = () => {
    if (isSmLte() && slider?.initialized) {
      slider.destroy();
    } else if (!isSmLte() && !slider?.initialized) {
      initSlider();
    }
  };

  $(window.matchMedia('(max-width: 767px)')).on('change', () => {
    checkScreenSize();
  });

  checkScreenSize();
};

export default function productDetail() {
  productGallery();
  productColor();
  productMatch();
  productRelated();
}
