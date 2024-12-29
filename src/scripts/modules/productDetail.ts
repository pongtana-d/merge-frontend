import $ from 'jquery';
import Splide from '@splidejs/splide';

const productGallery = () => {
  const $elements = $('.js-product-gallery');

  if (!$elements.length) return;

  $elements.each(function () {
    /** set slider to center if less than viewport */
    const totalSlide = $(this).find('.splide__slide').length;
    if (totalSlide < 3) {
      $(this).attr('data-center', 'true');
    }

    const slider = new Splide($(this).find('.splide').get(0) as HTMLElement, {
      type: 'slide',
      gap: 15,
      focus: 0,
      perPage: 3,
      perMove: 1,
      omitEnd: true,
      arrows: false,
      pagination: false,
      breakpoints: {
        767: {
          perPage: 1,
        },
      },
    });

    slider.on('overflow', function (isOverflow) {
      slider.go(0);
      slider.options = {
        drag: isOverflow,
      };
    });

    slider.mount();
  });
};

const productColor = () => {
  const $el = $('.js-product-color-slider');

  if (!$el.length) return;

  const totalSlide = $el.find('.splide__slide').length;

  if (totalSlide < 3) {
    $el.css({ '--padding-inline': '16px' });
  }

  const slider = new Splide($el.find('.splide').get(0) as HTMLElement, {
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
    slider.go(0);
    slider.options = {
      drag: isOverflow,
      arrows: isOverflow,
    };
  });

  slider.mount();
};

const productSize = () => {
  const $el = $('.js-product-size-slider');

  if (!$el.length) return;

  const slider = new Splide($el.find('.splide').get(0) as HTMLElement, {
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

export default function productDetail() {
  productGallery();
  productColor();
  productSize();
}
