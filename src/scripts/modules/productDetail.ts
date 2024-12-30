import $ from 'jquery';
import Splide from '@splidejs/splide';
import { isSmLte } from './screen';

const productGallery = () => {
  const $elements = $('.js-product-gallery');

  if (!$elements.length) return;

  $elements.each(function () {
    const $el = $(this);
    const slider = new Splide($el.get(0) as HTMLElement, {
      type: 'slide',
      gap: 15,
      focus: 0,
      perPage: 3,
      perMove: 1,
      omitEnd: true,
      arrows: false,
      pagination: true,
      breakpoints: {
        767: {
          perPage: 1,
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

export default function productDetail() {
  productGallery();
  productColor();
  productSize();
  productMatch();
}
