import webFontLoader from './modules/web-font-loader';
import headerSearch from './modules/headerSearch';
import footer from './modules/footer';

document.addEventListener('DOMContentLoaded', () => {
  webFontLoader();
  headerSearch();
  footer();
});
