// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function() {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      // .then(function(){
      //   //getArticles();
      //   requestPermission();
      // })
      .catch(function() {
        console.log("Pendaftaran ServiceWorker gagal");
      });

  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

//menjalankan servis worker dulu baru pushManager
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready
  .then(function(registration) {
    console.log('A service worker is active:', registration.active);

    // At this point, you can call methods that require an active
    // service worker, like registration.pushManager.subscribe()
    return requestPermission();
    //registration.pushManager.subscribe({userVisibleOnly: true});
  });
} else {
  console.log('Service workers are not supported.');
}

//REQUEST API UNTUK PERTAMA KALI
// document.addEventListener("DOMContentLoaded", function() {
// getArticles();
// });



//periksa Notification
function requestPermission() {
    if ('Notification' in window) {
    Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }

  if (('PushManager' in window)) {
      navigator.serviceWorker.getRegistration().then(function(registration) {
          registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array("BPEFLV2GSElVx8ZfNwqDI8yYgHS2LRrBb90ZCw6TjAY3Byf1Xg0USqbjriVm0UsVMtw9W5gE9ItflZIYTOxgWuc")
          }).then(function(subscribe) {
              console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
              console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('p256dh')))));
              console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('auth')))));
          }).catch(function(e) {
              console.error('Tidak dapat melakukan subscribe ', e.message);
          });
      });
      };
    });
}}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

 