const CACHE = 'hero-system-v3';
const ASSETS = [
  'https://mouli-is-me.github.io/hero-system/index.html',
  'https://mouli-is-me.github.io/hero-system/manifest.json',
  'https://mouli-is-me.github.io/hero-system/icon-192.png',
  'https://mouli-is-me.github.io/hero-system/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
