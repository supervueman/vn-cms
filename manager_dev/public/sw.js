self.addEventListener('install', (event) => {
  // Do install stuff
  console.log('ServiceWorcker is install');
});

self.addEventListener('activate', (event) => {
  // Do activate stuff: This will come later on.
  console.log('ServiceWorcker is activate');
});

self.addEventListener('push', (event) => {
  let data = { title: 'new', content: 'qwewd' };
  if (event.data) {
    data = JSON.parse(event.data.text());
  }

  const options = {
    ...data
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
