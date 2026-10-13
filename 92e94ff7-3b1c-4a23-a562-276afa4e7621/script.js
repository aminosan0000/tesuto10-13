const analyticsConfig = window.SITE_ANALYTICS || {};
const measurementId = analyticsConfig.googleAnalyticsId?.trim();

if (measurementId && !/^G-[A-Z0-9]+$/.test(measurementId)) {
  console.error('Invalid Google Analytics measurement ID. Expected a value like G-XXXXXXXXXX.');
} else if (measurementId) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  googleTag.onerror = () => {
    console.error('Google Analytics could not load the Google tag.');
  };
  document.head.appendChild(googleTag);
}

const galleryLightbox = document.getElementById('galleryLightbox');

if (galleryLightbox instanceof HTMLDialogElement) {
  const lightboxArt = document.getElementById('lightboxArt');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let lastFocusedButton = null;

  document.querySelectorAll('.gallery-image-button').forEach((button) => {
    button.addEventListener('click', () => {
      const illustration = button.querySelector('svg');
      const title = illustration?.querySelector('title')?.textContent?.trim();

      if (!illustration || !title) {
        return;
      }

      const enlargedIllustration = illustration.cloneNode(true);
      enlargedIllustration.removeAttribute('aria-labelledby');
      enlargedIllustration.setAttribute('aria-label', title);

      lightboxArt.replaceChildren(enlargedIllustration);
      lightboxCaption.textContent = button.closest('figure')?.querySelector('.gallery-caption')?.textContent ?? title;
      lastFocusedButton = button;
      galleryLightbox.showModal();
    });
  });

  galleryLightbox.addEventListener('click', (event) => {
    if (event.target === galleryLightbox) {
      galleryLightbox.close();
    }
  });

  galleryLightbox.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      galleryLightbox.close();
    }
  });

  galleryLightbox.addEventListener('close', () => {
    lastFocusedButton?.focus();
  });
}
