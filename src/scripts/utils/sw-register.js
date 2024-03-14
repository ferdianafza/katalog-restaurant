import * as WorkboxWindow from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker is not supported in the browser');
    return;
  }

  // Membuat instance Workbox dengan menggunakan path ke file service worker
  const workbox = new WorkboxWindow.Workbox('/sw.bundle.js');

  try {
    // Mendaftarkan service worker
    await workbox.register();
    console.log('Service worker registered successfully');
  } catch (error) {
    // Menangani error saat gagal mendaftarkan service worker
    console.error('Failed to register service worker:', error);
  }
};

export default swRegister;
