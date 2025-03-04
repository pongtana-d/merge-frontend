import Alpine from 'alpinejs';
import webFontLoader from './modules/web-font-loader';

import headerSmall from './modules/headerSmall';
import headerSearch from './modules/headerSearch';
import navGlobal from './modules/navGlobal';
import footer from './modules/footer';
import navFavoriteSlider from './modules/navFavoriteSlider';
import marqueeSlider from './modules/marqueeSlider';
import countDown from './modules/countdown';
import productSlider from './modules/productSlider';
import productDetail from './modules/productDetail';
import btnShare from './modules/btnShare';
import listAccordion from './modules/listAccordion';
import selectReviewStars from './modules/selectReviewStars';
import form from './modules/form';
import addToCart from './modules/addToCart';

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.Alpine = Alpine;
  Alpine.start();

  webFontLoader();
  headerSmall();
  headerSearch();
  navGlobal();
  footer();
  navFavoriteSlider();
  marqueeSlider();
  countDown();
  productSlider();
  productDetail();
  btnShare();
  listAccordion();
  selectReviewStars();
  form();
  addToCart();
});
