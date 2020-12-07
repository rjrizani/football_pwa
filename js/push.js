var webPush = require('web-push');
// webPush.on('web-push',()=>{console.log('modele');
// });


const vapidKeys = {
   "publicKey": "BPEFLV2GSElVx8ZfNwqDI8yYgHS2LRrBb90ZCw6TjAY3Byf1Xg0USqbjriVm0UsVMtw9W5gE9ItflZIYTOxgWuc",
   "privateKey": "Mw3aM-LLtPEKyzokiIQHSrQol0vsok5w2TOHs7er1FI"
};
 
 
webPush.setVapidDetails(
   'mailto:speaksma@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eO3zYJJuPPI:APA91bHjrKi3d45DPHb3BA2cX3h_Zon4qxSWCVJVEalcMClfh1DZqicGw0pH2AwA6dEVUaxw6BFBWaMQmZCra2kxGrnXgB-Bojq1NAdcEPPcjAD-477UdRuDquM0PqD4VQjBkQbaxoD4",
   "keys": {
       "p256dh": "BCUPggVt7wzzkGUmuV35wYAQdg5hxjcCTLgLld4RG+r57zmHniJ4xCnSHP9S8WEyiveCoGUbymZAkLFhuWsbQ84=",
       "auth": "tSCGDlcZCPRIENmV6NKcNg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '274120687358',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
).catch(function(err){
   console.log(err);
});