// Central de Controle · KC Cursos — service worker das notificações
const PAINEL = 'https://claude.ai/artifact/GL7N1igKBKVusHfB3z379M';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch { d = { body: event.data ? event.data.text() : '' }; }
  const title = d.title || 'Central de Controle';
  event.waitUntil(self.registration.showNotification(title, {
    body: d.body || '',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: d.tag || undefined,
    data: { url: d.url || PAINEL },
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || PAINEL;
  event.waitUntil(self.clients.openWindow(url));
});
