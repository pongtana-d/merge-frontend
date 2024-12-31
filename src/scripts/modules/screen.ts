import $ from 'jquery';

export const isSmLte = () => window.matchMedia('(max-width: 767px)').matches;

export const isMdLte = () => window.matchMedia('(max-width: 991px)').matches;

const isIOS = (): boolean => {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
};

const isMacSafari = (): boolean => {
  return (
    navigator.userAgent.includes('Mac') &&
    navigator.userAgent.includes('Safari') &&
    !navigator.userAgent.includes('Chrome') &&
    !navigator.userAgent.includes('Firefox')
  );
};

export function screenLock(): void {
  if (isIOS() || isMacSafari()) {
    const top = $(window).scrollTop() || 0;

    $('html').attr('data-screen-locked', 'true').css({ top: -top }).data('top', top);
  } else {
    $('html').css({ overflowY: 'scroll' });
    $('body').css({ overflowY: 'hidden' });
  }
}

export function screenUnlock(): void {
  if (isIOS() || isMacSafari()) {
    const top = $('html').data('top') || 0;

    $('html').attr('data-screen-locked', 'false').css({ top: '' });
    $(window).scrollTop(top);
  } else {
    $('html').css({ overflowY: '' });
    $('body').css({ overflowY: '' });
  }
}
