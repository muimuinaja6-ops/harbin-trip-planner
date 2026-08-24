const CACHE_NAME = 'harbin-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/trip-poster.jpg',
  '/trip-song.mp3',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Skip Firebase/API calls (always network)
  if (url.hostname.includes('firebase') || url.hostname.includes('open-meteo') || url.hostname.includes('mymemory') || url.hostname.includes('googleapis')) {
    return;
  }

  // For navigation and static assets: network first, cache fallback
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
