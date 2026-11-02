// Офлайн для «Расходов»: при установке кладём все файлы приложения в кэш, дальше отдаём из кэша.
// После любой правки файлов - поднять номер версии C, тогда телефоны заберут новую версию.
const C = "rashody-v4";
const FILES = ["./", "./index.html", "./manifest.json", "./icon.svg", "./icon-180.png", "./icon-192.png", "./icon-512.png",
  "./icon-maskable-512.png", "./emoji.js", "./fonts/InterTight-900.woff2", "./fonts/Manrope.woff2", "./fonts/Unbounded-700.woff2"];
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
