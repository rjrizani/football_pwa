importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/nav.html', revision: '1' },
        { url: '/js/register.js', revision: '1' },
        { url: '/pages/home.html', revision: '1' },
        { url: '/pages/note.html', revision: '1' },
        { url: '/pages/biodata.html', revision: '1' },
        { url: '/pages/table.html', revision: '1' },
        { url: '/otherById.html', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/js/script.js', revision: '1' },
        { url: '/js/api.js', revision: '1' },
        { url: '/js/db.js', revision: '1' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/js/table.js', revision: '1' },
        { url: '/js/otherById.js', revision: '1' },
        { url: '/js/saveButton.js', revision: '1' },
        { url: '/assets/image/profil_.png', revision: '1' },
        { url: '/assets/apple-touch-icon.png', revision: '1' },
        { url: '/assets/favicon.ico', revision: '1' },
        { url: '/assets/android-chrome-512x512.png', revision: '1' },
        { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
        { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' }
        ],
        {
        ignoreURLParametersMatching: [/.*/]
        });

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
        );


    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate()
        )

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
    );

workbox.routing.registerRoute(
  /\.(?:js|css|html)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  new RegExp('/otherById.html'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'id',
        plugins: [
          new workbox.cacheableResponse.Plugin({
              statuses: [0, 200]
          }),
          new workbox.expiration.Plugin({
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
          ]
    })
);

}else{
  console.log(`Workbox gagal dimuat`);
}


//Response Push Notification
  self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });