/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Precaching
// eslint-disable-next-line no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST);

// Define routes and strategies
const restaurantApiRoute = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-api',
  }),
);

const restaurantImageApiRoute = new Route(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/medium/'),
  new StaleWhileRevalidate({
    cacheName: 'restaurant-image-api',
  }),
);

// Register routes
registerRoute(restaurantApiRoute);
registerRoute(restaurantImageApiRoute);

// Install event listener
self.addEventListener('install', () => {
  self.skipWaiting();
});

// Push event listener
self.addEventListener('push', (event) => {
  const notificationData = {
    title: 'Push Notification',
    options: {
      body: 'This is a push notification',
      icon: '/favicon.png',
      image: '/icon-512x512/icon-512x512.jpg',
    },
  };

  const showNotification = self.registration.showNotification(
    notificationData.title,
    notificationData.options,
  );

  event.waitUntil(showNotification);
});
