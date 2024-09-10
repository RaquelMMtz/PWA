// Nombre del cache
const CACHE_NAME = 'alumnos-cache-v1';
// Archivos a cachear
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/sw.js'
];

// Instalación del Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Archivos cacheados correctamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Recuperar archivos del cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});

// Actualizar el Service Worker
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
