'use strict'

const CACHE_NAME = 'peacefulsearch';
// The files we want to cache
const resourceList = [
  '/',
  'https://thedoggybrad.github.io/peacefulsearch/index.html',
  'https://cdn.jsdelivr.net/gh/thedoggybrad/peacefulsearch@main/favicon.png',
  'https://cdn.jsdelivr.net/gh/thedoggybrad/peacefulsearch@main/style.css',
  'https://fonts.googleapis.com/css?family=Open+Sans:400,700',
  'https://cdn.jsdelivr.net/gh/thedoggybrad/peacefulsearch@main/search.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(resourceList);
  }));
});

function addToCache(cacheName, resourceList) {
  caches.open(cacheName).then(cache => {
    return cache.addAll(resourceList);
  });
}

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request);
  }));
});
