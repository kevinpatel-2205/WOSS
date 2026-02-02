const CACHE_NAME = "v1";

const FILES_TO_CACHE = ["./index.html", "./main.js", "./style.css"];
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "Hello from Service Worker";

  const options = {
    body: data,
    icon: "https://via.placeholder.com/96",
    badge: "https://via.placeholder.com/96",
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow("./index.html"));
});

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-example") {
    event.waitUntil(console.log("Background sync triggered"));
  }
});
