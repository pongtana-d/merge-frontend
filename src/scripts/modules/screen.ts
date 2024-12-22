import $ from 'jquery';

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
    if (!$('html').hasClass('is-locked')) {
      $('html').addClass('is-locked').css({ top: -top }).data('top', top);
    }
  } else {
    $('body').css({ overflowY: 'hidden' });
  }
}

export function screenUnlock(): void {
  if (isIOS()) {
    const top = $('html').data('top') || 0;
    if ($('html').hasClass('is-locked')) {
      $('html').removeClass('is-locked').css({ top: '' });
      $(window).scrollTop(top);
    }
  } else {
    $('body').css({ overflowY: '' });
  }
}
