import stylelint from 'stylelint';
import autoprefixer from 'autoprefixer';
import calc from 'postcss-calc';
import customMedia from 'postcss-custom-media';
import colorModFunction from 'postcss-color-mod-function';
import mixins from 'postcss-mixins';
import nested from 'postcss-nested';
import postcssImport from 'postcss-import';
import reporter from 'postcss-reporter';

export default {
  plugins: [
    stylelint(),
    autoprefixer(),
    calc(),
    customMedia(),
    colorModFunction(),
    mixins(),
    nested(),
    postcssImport(),
    reporter({
      clearReportedMessages: true,
    }),
  ],
};
