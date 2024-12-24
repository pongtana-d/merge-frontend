import webFont from 'webfontloader';

export default function webFontLoader() {
  webFont.load({
    google: {
      families: ['Fanwood+Text:ital@0', 'Arvo:400'],
    },
    custom: {
      families: ['IvyStyle+Sans:400,600,700'],
      urls: ['/assets/fonts/fonts.css'],
    },
    timeout: 3000,
    events: false,
  });
}
