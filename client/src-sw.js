// This is a service worker script that uses Workbox; a set of libraries and tools for adding offline support to web applications.

//functions imported from the workbox-recipe module
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');

//caching strategies imported from the workbox-strategies module
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');

//imported from various other Workbox modules
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

//precaches the URLs specified in the _WB MANIFEST variable, a variable used by Workbox
precacheAndRoute(self.__WB_MANIFEST);

//pageCache is a cacheFirst strategy. It includes plugins for handling cacheable responses and expiration settings
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

//preloads specific URLs using the pageCache strategy
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

//registers a route for navigation reqs, uses pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  //this is saying that anything that is a style, script or service worker file will be PRECACHED when the page loads
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
