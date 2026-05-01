/**
 * Optional analytics loader.
 *
 * To enable Umami:
 * 1) Set umamiHost and websiteId below.
 * 2) Deploy.
 *
 * Example:
 *   umamiHost: 'https://umami.yourdomain.com'
 *   websiteId: '00000000-0000-0000-0000-000000000000'
 */
(function initAnalyticsLoader() {
  const config = {
    umamiHost: '',
    websiteId: '',
  };

  if (!config.umamiHost || !config.websiteId) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = `${config.umamiHost.replace(/\/+$/, '')}/script.js`;
  script.setAttribute('data-website-id', config.websiteId);
  document.head.appendChild(script);
})();
