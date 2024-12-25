import webFontLoader from './modules/web-font-loader';
import headerSmall from './modules/headerSmall';
import headerSearch from './modules/headerSearch';
import navGlobal from './modules/navGlobal';
import footer from './modules/footer';
import navFavoriteSlider from './modules/navFavoriteSlider';
import marqueeSlider from './modules/marqueeSlider';
import productSlider from './modules/productSlider';
import countdown from './modules/countdown';

document.addEventListener('DOMContentLoaded', () => {
  webFontLoader();
  headerSmall();
  headerSearch();
  navGlobal();
  footer();
  navFavoriteSlider();
  marqueeSlider();
  productSlider();
  countdown();
});
