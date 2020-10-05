const CACHE_NAME = "mangan-tes1";

const urlsToCache = [
  "/",
  "/index.html",
  "/nav.html",
  "/pages/home.html",
  "/pages/explore.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/js/script.js",
  "/css/style.css",
  "/assets/about.jpg",
  "/assets/header.jpg",
  "/assets/home.jpg",
  "/assets/logo-black.png",
  "/assets/logo.png",
  "/assets/personal.jpg",
  "/assets/icon192.png",
  "/assets/icon512.png",
  "/assets/explore/1.jpg",
  "/assets/explore/2.jpg",
  "/assets/explore/3.jpg",
  "/assets/explore/4.jpg",
  "/assets/explore/5.jpg",
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
  "https://use.fontawesome.com/releases/v5.8.1/css/all.css",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache
        .addAll(
          urlsToCache.map((url) => {
            return new Request(url, { mode: "no-cors" });
          })
        )
        .then(() => console.log("Service worker sudah terinstall"))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request, { cacheName: CACHE_NAME }).then((res) => {
      if (res) {
        return res;
      }

      return fetch(e.request);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
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
});
