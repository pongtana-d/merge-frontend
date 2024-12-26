import $ from 'jquery';
import countdown from 'countdown';

export default function countDown() {
  const $el = $('.js-countdown');

  if (!$el.length) return;

  const endTime = $el.attr('data-end-time') || '';
  let interval: countdown.Timespan | number;

  if (!endTime) return;

  const moveDigit = ($target: JQuery<HTMLElement>, units: number, digit: string) => {
    const current = $target.attr('data-current') || '';
    const y = (units - Number(digit)) * -24;

    if ((digit === '9' || digit === '5') && current === '0') {
      $target.removeAttr('style');
    }
    /** ensure that DOM updates are processed in the correct order */
    setTimeout(() => {
      $target.css({ transform: `translateY(${y}px)`, transition: 'transform 0.9s ease-out' });
    }, 0);

    $target.attr('data-current', digit);
  };

  interval = countdown(
    (ts) => {
      const hh = String(ts.hours).padStart(2, '0');
      const mm = String(ts.minutes).padStart(2, '0');
      const ss = String(ts.seconds).padStart(2, '0');

      if (ts.value === 0) clearInterval(interval as number);

      moveDigit($el.find('.js-h-tens'), 10, hh.charAt(0));
      moveDigit($el.find('.js-h-ones'), 10, hh.charAt(1));
      moveDigit($el.find('.js-m-tens'), 6, mm.charAt(0));
      moveDigit($el.find('.js-m-ones'), 10, mm.charAt(1));
      moveDigit($el.find('.js-s-tens'), 6, ss.charAt(0));
      moveDigit($el.find('.js-s-ones'), 10, ss.charAt(1));
    },
    new Date(endTime),

    countdown.HOURS | countdown.MINUTES | countdown.SECONDS,
  );
}
