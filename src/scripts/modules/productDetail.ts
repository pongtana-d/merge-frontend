import $ from 'jquery';
import Splide from '@splidejs/splide';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { isSmLte, isMdLte } from './screen';

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

  const totalItems = $el.find('.swiper-slide').length;

  new Swiper($el.get(0) as HTMLElement, {
    modules: [Navigation],
    slidesPerView: 3.181,
    spaceBetween: 2,
    slidesOffsetBefore: totalItems > 3 ? 0 : 16,
    slidesOffsetAfter: totalItems > 3 ? 0 : 16,
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
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

const productSize = () => {
  const $el = $('.js-product-size-slider');

  if (!$el.length) return;

  const slider = new Splide($el.get(0) as HTMLElement, {
    type: 'slide',
    gap: 12,
    drag: 'free',
    speed: 500,
    flickPower: 200,
    fixedWidth: 46,
    arrows: false,
    pagination: false,
    breakpoints: {
      767: {
        padding: { left: 16, right: 16 },
      },
    },
  });

  slider.on('overflow', function (isOverflow) {
    slider.go(0);
    slider.options = {
      drag: isOverflow ? 'free' : false,
    };
  });

  slider.mount();
};

const productMatch = () => {
  const $el = $('.js-product-match');

  if (!$el.length) return;

  const slider = new Splide($el.get(0) as HTMLElement, {
    type: 'slide',
    gap: 2,
    speed: 500,
    flickPower: 200,
    fixedWidth: '22.222vw',
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
    $el.attr('data-is-overflow', isOverflow.toString());
    $el.attr('data-justify-center', (!isOverflow).toString());

    slider.go(0);
    slider.options = {
      drag: isOverflow,
      arrows: isOverflow && !isSmLte(),
    };
  });

  slider.mount();
};

const productRelated = () => {
  const $el = $('.js-product-related');

  if (!$el.length) return;

  const slider = new Splide($el.get(0) as HTMLElement, {
    type: 'slide',
    gap: 2,
    speed: 500,
    flickPower: 200,
    fixedWidth: '22.222vw',
    arrows: true,
    pagination: false,
    breakpoints: {
      767: {
        destroy: true,
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
    $el.attr('data-is-overflow', isOverflow.toString());
    $el.attr('data-justify-center', (!isOverflow).toString());

    slider.go(0);
    slider.options = {
      drag: isOverflow,
      arrows: isOverflow,
    };
  });

  slider.mount();
};

export default function productDetail() {
  productGallery();
  productColor();
  productSize();
  productMatch();
  productRelated();
}
