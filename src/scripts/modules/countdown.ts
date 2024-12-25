import $ from 'jquery';
import countdown from 'countdown';

export default function countDown() {
  const $el = $('.js-countdown');

  if (!$el.length) return;

  const endTime = $el.data('end-time');
  let interval: countdown.Timespan | number;

  if (!endTime) return;

  const moveDigit = ($target: JQuery<HTMLElement>, units: number, digit: number) => {
    const y = (units - digit) * -24;

    if (digit === 0) {
      setTimeout(() => {
        $target.css({ transform: `translateY(0px)`, transition: '' });
      }, 900);
    }
    $target.css({ transform: `translateY(${y}px)`, transition: 'transform 0.9s ease-out' });
  };

  interval = countdown(
    (ts) => {
      const hh = String(ts.hours).padStart(2, '0');
      const mm = String(ts.minutes).padStart(2, '0');
      const ss = String(ts.seconds).padStart(2, '0');

      if (ts.value === 0) clearInterval(interval as number);

      moveDigit($el.find('.js-h-tens'), 10, Number(hh.charAt(0)));
      moveDigit($el.find('.js-h-ones'), 10, Number(hh.charAt(1)));
      moveDigit($el.find('.js-m-tens'), 6, Number(mm.charAt(0)));
      moveDigit($el.find('.js-m-ones'), 10, Number(mm.charAt(1)));
      moveDigit($el.find('.js-s-tens'), 6, Number(ss.charAt(0)));
      moveDigit($el.find('.js-s-ones'), 10, Number(ss.charAt(1)));
    },
    new Date(endTime),

    countdown.HOURS | countdown.MINUTES | countdown.SECONDS,
  );
}
