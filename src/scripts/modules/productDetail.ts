import $ from 'jquery';
import Splide from '@splidejs/splide';
import { isSmLte, isMdLte } from './screen';

const productGallery = () => {
  const $elements = $('.js-product-gallery');

  if (!$elements.length) return;

  $elements.each(function () {
    const $el = $(this);
    const slider = new Splide($el.get(0) as HTMLElement, {
      type: 'slide',
      gap: 5,
      focus: 0,
      perPage: 3,
      perMove: 1,
      speed: 500,
      flickPower: 200,
      omitEnd: true,
      arrows: false,
      pagination: true,
      breakpoints: {
        767: {
          perPage: 1,
          gap: 1,
        },
      },
    });

    slider.on('overflow', function (isOverflow) {
      $el.attr('data-justify-center', (!isOverflow).toString());

      slider.go(0);
      slider.options = {
        drag: isOverflow,
        pagination: isOverflow,
      };
    });

    slider.mount();
  });
};

const productColor = () => {
  const $el = $('.js-product-color-slider');

  if (!$el.length) return;

  const slider = new Splide($el.get(0) as HTMLElement, {
    type: 'slide',
    gap: 2,
    perPage: 4,
    perMove: 1,
    speed: 500,
    flickPower: 200,
    arrows: true,
    pagination: false,
    breakpoints: {
      767: {
        fixedWidth: '31.4667vw',
        perPage: 0,
        arrows: false,
      },
    },
  });

  slider.on('ready', function () {
    const activeIndex = $(slider.Components.Elements.list).find('[aria-current="true"]').parent().index();
    if (activeIndex >= 0) slider.go(activeIndex);
  });

  slider.on('overflow', function (isOverflow) {
    $el.attr('data-is-overflow', isOverflow.toString());

    slider.go(0);
    slider.options = {
      drag: isOverflow,
      arrows: isOverflow && !isSmLte(),
    };
  });

  slider.mount();
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
