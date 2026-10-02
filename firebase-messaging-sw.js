importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB7e1itC17IxcSpNN1eBnLuTI43uHZ-fYQ",
  authDomain: "yuesheng-system.firebaseapp.com",
  databaseURL: "https://yuesheng-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yuesheng-system",
  storageBucket: "yuesheng-system.firebasestorage.app",
  messagingSenderId: "975395892406",
  appId: "1:975395892406:web:97dabd72e189c4e79aca17"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] 收到背景推播', payload);

  const notification = payload.notification || {};
  const title = notification.title || '金好家族';
  const options = {
    body: notification.body || '你有一則新的公告',
    icon: '/-/icon-192.png',
    badge: '/-/icon-192.png',
    data: payload.data || {}
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow('https://kaiy44619-prog.github.io/-/');
      }
    })
  );
});
