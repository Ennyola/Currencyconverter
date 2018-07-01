let urlsToCache = [
	'./html/index.html',
	'./imgs/icon.png',
	'./manifest.json',
	"https://free.currencyconverterapi.com/api/v5/currencies"
];
const cacheName = 'converterCache';


self.addEventListener('install',event =>{

event.waitUntil(
caches.open(cacheName).then(cache => {
cache.addAll(urlsToCache);
}).then(() => self.skipWaiting()).catch(err => console.log("Your files cant be cached due to some errors ==> ", err))
    );
}); 

self.addEventListener('fetch',(event => {

event.respondWith(
	caches.match(event.request).then(response => {
		if (response) return response;
		return fetch(event.request);
		})
	);
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            Promise.all(
                keyList.map(key => {
                    if (key !== cacheName) {
                        caches.delete(key);
                        console.log(`deleted ${key}`)
                    }
                })
            );
        })
    );
});