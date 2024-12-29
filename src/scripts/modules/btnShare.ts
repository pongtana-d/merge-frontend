import $ from 'jquery';

export default function btnShare() {
  const $button = $('.js-btn-share');

  $button.on('click', async function (e) {
    e.preventDefault();
    const shareData = {
      title: document.title,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }
  });
}
