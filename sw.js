importScripts('./node_modules/workbox-sw/build/workbox-sw.js')

const staticAssets = [
	'./',
	'./styles.css',
	'./app.js',
	'./fallback.json',
	'./images/dog.jpg'
];

// const wb = new WorkboxSW();
workbox.precache(staticAssets);
workbox.router.registerRoute('https://newsapi.org/(.*)', workbox.strategies.networkFirst());
workbox.router.registerRoute(/.*\.(png|jpg|jpeg|gif)/, workbox.strategies.cacheFirst({
	cacheName: 'news-images',
	cacheExpiration: {maxentries: 20, maxAgeSeconds: 12*60*60},
	cachableResponse: {statuses: [0,200]}
}));
// stopped project - some part does work



// self.addEventListener('install', async event => {
// 	const cache = await caches.open('news-static');
// 	cache.addAll(staticAssets);
// });

// self.addEventListener('fetch', event => {
// 	const req = event.request;
// 	const url = new URL(req.url);

// 	if(url.origin === location.origin) {
// 		event.respondWith(cacheFirst(req));
// 	} else {
// 		event.respondWith(networkFirst(req));
// 	}
// });

// async function cacheFirst(req) {
// 	const cacheResponse = await caches.match(req);
// 	return cacheResponse || fetch(req);
// }

// async function networkFirst(req) {
// 	const cache = await caches.open('news-dynamic');

// 	try {
// 		const res = await fetch(req);
// 		cache.put(req, res.clone());
// 		return res;
// 	} catch (error) {
// 		const cachedResponse = await cache.match(req);
// 		return cachedResponse || await caches.match('./fallback.json');
// 	}
// }