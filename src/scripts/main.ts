import webFontLoader from './modules/web-font-loader';
import headerSmall from './modules/headerSmall';
import headerSearch from './modules/headerSearch';
import footer from './modules/footer';

document.addEventListener('DOMContentLoaded', () => {
  webFontLoader();
  headerSearch();
  headerSmall();
  footer();
});
