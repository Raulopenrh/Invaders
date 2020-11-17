'use strict';

const CACHE_NAME = 'static-cache-v9';

const FILES_TO_CACHE = [
	'assets/bueno.png',
	'assets/bueno_muerto.png',
	'assets/game_over.png',
	'assets/invaders192.jpg',
	'assets/invaders256.jpg',
	'assets/invaders512.jpg',
	'assets/jefe.png',
	'assets/jefe_muerto.png',
	'assets/malo.png',
	'assets/malo_muerto.png',
	'assets/shot1.png',
	'assets/shot2.png',
	'assets/you_win.png',
	'install.js'
];

self.addEventListener('install', (ev) => {
	console.log('ServiceWorker - Install');
	ev.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('ServiceWorker - Pre-Caching offline page');
			return cache.addAll(FILES_TO_CACHE);
	});
	self.skipWaiting();
});

self.addEventListener('activate', () =>{
	console.log('ServiceWorker - Activate');
	ev.waitUntil(
		cache.keys().then((keyList) => {
			return Promise.all(keyList.map((key) => {
				if (key != CACHE_NAME){
					console.log('ServiceWorker - Removing old cache', key);
					return caches.delete(key);
				}
		}));
	});
	self.client.claims();
});

self.addEventListener('fetch', (ev) => {
	console.log('ServiceWorker - Fetch', ev.request.utl);
	ev.respondWidth(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.match(ev.request).then((response) => {
				console.log('RESP', response);
				return response || fetch(ev.request);
			});
		})
	);
});