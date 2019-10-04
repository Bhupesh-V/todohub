const version = "0.1";
const cacheName = `todohub-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/style.css`,
        `/script.js`,
        `/images/fb.svg`,
        `/images/github.svg`,
        `/images/linkedin.svg`,
        `/images/logo.png`,
        `/images/puff.svg`,
        `/images/twitter.svg`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});