import stylelint from 'stylelint';
import autoprefixer from 'autoprefixer';
import reporter from 'postcss-reporter';

export default {
  plugins: [
    stylelint(),
    autoprefixer(),
    reporter({
      clearReportedMessages: true,
    }),
  ],
};
