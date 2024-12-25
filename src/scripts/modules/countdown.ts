import $ from 'jquery';

export default function countDown() {
  const $el = $('.js-countdown');

  if (!$el.length) return;

  const $hourTens = $el.find('.sec-flash-sale__digit--hour-tens');
  const $hourOnes = $el.find('.sec-flash-sale__digit--hour-ones');
  const $minTens = $el.find('.sec-flash-sale__digit--min-tens');
  const $minOnes = $el.find('.sec-flash-sale__digit--min-ones');
  const $secTens = $el.find('.sec-flash-sale__digit--sec-tens');
  const $secOnes = $el.find('.sec-flash-sale__digit--sec-ones');
  let time = Number($el.data('countdown-time'));

  if (!time || isNaN(time)) return;

  if (time > 359999) {
    time = 359999;
  }

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const secs = time % 60;

  // Pad with leading zeros for single digits
  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');

  console.log(hh, mm, ss);

  const secOfSecOnes = Number(ss.charAt(1));
  const secOfSecTens = Number(ss.charAt(0)) * 10 + secOfSecOnes;
  const secOfMinOnes = Number(mm.charAt(1)) * 60 + secOfSecTens;
  const secOfMinTens = Number(mm.charAt(0)) * 600 + secOfMinOnes;
  const secOfHourOnes = Number(hh.charAt(1)) * 3600 + secOfMinTens;
  const secOfHourTens = Number(hh.charAt(0)) * 36000 + secOfHourOnes;

  $secOnes.attr('style', `--delay:${(10 - secOfSecOnes) * -1}s`);
  $secTens.attr('style', `--delay:${(70 - secOfSecTens) * -1}s`);
  $minOnes.attr('style', `--delay:${(660 - secOfMinOnes) * -1}s`);
  $minTens.attr('style', `--delay:${(4200 - secOfMinTens) * -1}s`);
  $hourOnes.attr('style', `--delay:${(39600 - secOfHourOnes) * -1}s`);
  $hourTens.attr('style', `--delay:${(396000 - secOfHourTens) * -1}s`);

  setTimeout(
    () => {
      // $el.attr('data-stop', 'true');
    },
    (secOfHourTens - 1.1) * 1000,
  );
}
