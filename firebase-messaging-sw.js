// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.2.0/firebase-messaging.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
    apiKey: "AIzaSyAxgfboRUJva3ho34KI0lj0ZSudJv_mEHU",
    authDomain: "sample-ee177.firebaseapp.com",
    databaseURL: "https://sample-ee177-default-rtdb.firebaseio.com",
    projectId: "sample-ee177",
    storageBucket: "sample-ee177.appspot.com",
    messagingSenderId: "573525435729",
    appId: "1:573525435729:web:363fc88c2e6cce71259f70",
    measurementId: "G-R5MQ2PC4LL"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationBody = payload.notification.body;

    const notificationOptions = {
        body: notificationBody,
        icon: ''  // No icon (or remove this line entirely if you don't want it)
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
