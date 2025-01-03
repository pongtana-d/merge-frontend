import $ from 'jquery';
import { screenLock, screenUnlock } from './screen';

const $nav = $('#nav-global');
const $navMain = $('#nav-global-container');
const $btnMenu = $('#btn-header-menu');
const $overlay = $('#header-overlay');
let menuLv = 0;

const closeNavGlobal = () => {
  $btnMenu.attr('aria-expanded', 'false');
  $nav.attr({ 'aria-hidden': 'true', inert: '' });
  $overlay.stop().fadeOut(300);
  screenUnlock();

  setTimeout(() => {
    $navMain.attr('aria-hidden', 'false');
    $nav
      .find('.nav-global-sub')
      .attr({ 'aria-hidden': 'true', inert: '' })
      .removeAttr('style')
      .removeAttr('data-level')
      .removeClass('is-hidden');
    menuLv = 0;
  }, 400);
};

const initNavGlobal = () => {
  const $btnClose = $nav.find('.nav-global__btn-close');
  const $btnCloseSub = $nav.find('.nav-global-sub__btn-close');

  $btnMenu.on('click', function (e) {
    e.preventDefault();

    $(this).attr('aria-expanded', 'true');
    $nav.attr('aria-hidden', 'false').removeAttr('inert');
    $overlay.stop().fadeIn(300);
    screenLock();
  });

  $btnClose
    .add($btnCloseSub)
    .add($overlay)
    .on('click', function (e) {
      e.preventDefault();
      closeNavGlobal();
    });
};

const initNavGlobalSub = () => {
  const $linkMain = $nav.find('.nav-global__link-main');
  const $linkSub = $nav.find('.nav-global-sub__link-main');
  const $btnBackMain = $nav.find('.nav-global-sub__back');

  $linkMain.add($linkSub).on('click', function (e) {
    e.preventDefault();
    const id = $(this).data('target');
    const $target = $(`[data-id="${id}"]`);
    menuLv++;

    if ($target.length) {
      if (menuLv === 1) {
        $navMain.attr('aria-hidden', 'true');
      } else {
        $(this).closest('.nav-global-sub').addClass('is-hidden');
      }

      $target.css('--z-index', menuLv).attr('data-level', menuLv).attr('aria-hidden', 'false').removeAttr('inert');
    }
  });

  $btnBackMain.on('click', function (e) {
    e.preventDefault();
    menuLv--;

    if (menuLv === 0) {
      $navMain.attr('aria-hidden', 'false');
    } else {
      $nav.find(`[data-level="${menuLv}"]`).removeClass('is-hidden');
    }

    $(this)
      .closest('[aria-hidden]')
      .attr({ 'aria-hidden': 'true', inert: '' })
      .removeAttr('style')
      .removeAttr('data-level');
  });
};

export default function navGlobal() {
  initNavGlobal();
  initNavGlobalSub();
}
