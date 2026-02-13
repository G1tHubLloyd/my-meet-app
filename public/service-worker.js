const CACHE_NAME = 'meet-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/src/main.jsx',
    '/src/App.jsx',
    '/src/App.css',
    '/src/index.css',
];

// Installation event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// Activation event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - Network first, then cache
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // For API calls, try network first
    if (event.request.url.includes('/api/') || event.request.url.includes('googleapis.com')) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Clone the response
                    const responseClone = response.clone();

                    // Cache the response if it's successful
                    if (response.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }

                    return response;
                })
                .catch(() => {
                    // Fall back to cache
                    return caches.match(event.request).then((response) => {
                        return response || new Response('No data available offline');
                    });
                })
        );
    } else {
        // For static assets, use cache first strategy
        event.respondWith(
            caches.match(event.request).then((response) => {
                if (response) {
                    return response;
                }

                return fetch(event.request).then((response) => {
                    if (!response || response.status !== 200 || response.type === 'error') {
                        return response;
                    }

                    const responseClone = response.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });

                    return response;
                });
            })
        );
    }
});
