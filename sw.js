// =============================================================================
// Service Worker для BridgeLearn
// =============================================================================
// 
// 🔧 РЕЖИМ РАЗРАБОТКИ (по умолчанию):
//    → Все запросы идут напрямую в сеть.
//    → Никакого кэширования.
//    → Изменения видны сразу.
//
// 🚀 КАК ВКЛЮЧИТЬ ПРОДАКШЕН-РЕЖИМ (офлайн-кэш):
//    1. Раскомментируй блок "PRODUCTION MODE" ниже.
//    2. Закомментируй или удали блок "DEVELOPMENT MODE".
//    3. Обнови CACHE_NAME при каждом крупном обновлении (например, v2 → v3).
// =============================================================================

// =============================================================================
// DEVELOPMENT MODE (активен сейчас)
// =============================================================================
self.addEventListener('fetch', (event) => {
  // Просто пропускаем все запросы — без кэширования
  event.respondWith(fetch(event.request));
});

// Не кэшируем при установке — чтобы не мешать разработке
self.addEventListener('install', (event) => {
  // Пропускаем активацию — не сохраняем ничего
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Очищаем старые кэши (на случай, если ранее был включён продакшен)
  const cacheWhitelist = [];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// =============================================================================
// PRODUCTION MODE (раскомментируй для релиза)
// =============================================================================
/*
const CACHE_NAME = 'bridgelearn-v1'; // ← увеличивай версию при обновлении контента
const urlsToCache = [
  '/',
  '/index.html',
  '/java/java-roadmap.html',
  '/java/what-is-jdk.html',
  '/java/install-jdk.html',
  '/web/frontend-path.html',
  '/digital-literacy/tor-basics.html',
  '/office/excel-pivot.html'
  // Добавляй сюда новые страницы по мере создания
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
      .then((response) => {
        // Кэш есть → отдаём его
        if (response) {
          return response;
        }
        // Кэша нет → идём в сеть
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
*/