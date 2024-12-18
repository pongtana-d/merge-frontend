import webFont from 'webfontloader';

export default function webFontLoader() {
  webFont.load({
    custom: {
      families: ['IvyStyle+Sans:400,600,700'],
      urls: ['/assets/fonts/fonts.css'],
    },
    timeout: 3000,
    events: false,
  });
}
