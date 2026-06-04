// Mind Real Estate - Service Worker
// Enables offline play and faster reloads. Update CACHE_VERSION when shipping new builds.

const CACHE_VERSION = 'mind-real-estate-v1.0.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-32.png',
  './icon-180.png',
  './icon-192.png',
  './icon-192-maskable.png',
  './icon-512.png',
  './icon-512-maskable.png',
  'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js'
];

// Install - precache the shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      // Cache assets individually so one failure doesn't kill the whole install
      return Promise.all(
        ASSETS.map((url) =>
          cache.add(url).catch((err) => console.log('SW: skip cache', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch - cache-first for assets, network-first for HTML
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Skip non-GET
  if (req.method !== 'GET') return;
  // Skip chrome-extension and other unsupported schemes
  if (!req.url.startsWith('http')) return;

  // For HTML navigation, try network first (so updates are picked up), fall back to cache
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {});
          return resp;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // For assets, cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        // Only cache successful, basic/cors responses
        if (resp && resp.status === 200 && (resp.type === 'basic' || resp.type === 'cors')) {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {});
        }
        return resp;
      }).catch(() => cached);
    })
  );
});

// Allow page to trigger immediate SW update
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
