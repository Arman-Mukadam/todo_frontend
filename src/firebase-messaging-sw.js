importScripts('https://www.gstatic.com/firebase/7.6.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebase/7.6.0/firebase-messaging.js')

firebase.initializeApp({

    apiKey: "AIzaSyDZ2Hgu0sxvTw_kpb7E0InKxDqBL3AfiYE",
    authDomain: "auth-a4cf8.firebaseapp.com",
    projectId: "auth-a4cf8",
    storageBucket: "auth-a4cf8.appspot.com",
    messagingSenderId: "1087913894012",
    appId: "1:1087913894012:web:4d9cd8db398644bcdd29f9",
    measurementId: "G-XYD2KSLJ4G",
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(`[firebase-messaging-sw.js] Received background message`, payload);

    const notificationTitile = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'assets/icons/icon-72x72.png'
    };

    return self.registration.showNotification(
        notificationTitile,
        notificationOptions
    )
}); 