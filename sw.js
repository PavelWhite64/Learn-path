// sw.js
const CACHE_NAME = 'bridgelearn-v0.0.2';
const urlsToCache = [
  '/',
  '/index.html'
  'java/java-roadmap.html'
  // Добавь сюда другие страницы по мере создания:
  // '/web/frontend-path.html',
  // '/java/install-jdk.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
