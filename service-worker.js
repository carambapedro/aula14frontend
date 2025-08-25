if ('serviceWorker' in navigator) { 

    window.addEventListener('load', () => { 
  
      navigator.serviceWorker.register('/service-worker.js') 
  
        .then(registration => { 
  
          console.log('Service Worker registrado com sucesso:', registration); 
  
        }) 
  
        .catch(error => { 
  
          console.log('Falha no registro do Service Worker:', error); 
  
        }); 
  
    }); 
  
  } 

   

const CACHE_NAME = 'ecotech-cache-v1'; 

const urlsToCache = [ 

  '/', 

  '/index.html', 

  '/style.css', 

  '/app.js', 

  '/icons/icon-192x192.png', 

  '/icons/icon-512x512.png' 

]; 

// Instalando o Service Worker e cacheando os arquivos 

self.addEventListener('install', event => { 

    event.waitUntil( 
  
      caches.open(CACHE_NAME) 
  
        .then(cache => { 
  
          console.log('Arquivos em cache'); 
  
          return cache.addAll(urlsToCache); 
  
        }) 
  
    ); 
  
  }); 

  self.addEventListener('fetch', event => { 

    event.respondWith( 
  
      caches.match(event.request) 
  
        .then(response => { 
  
          if (response) { 
  
            return response; // Retorna o recurso do cache 
  
          } 
  
          return fetch(event.request); // Faz a requisição se não estiver no cache 
  
        }) 
  
    ); 
  
  });   

  self.addEventListener('activate', event => { 

    const cacheWhitelist = [CACHE_NAME]; 
  
    event.waitUntil( 
  
      caches.keys().then(cacheNames => { 
  
        return Promise.all( 
  
          cacheNames.map(cacheName => { 
  
            if (!cacheWhitelist.includes(cacheName)) { 
  
              return caches.delete(cacheName); 
  
            } 
  
          }) 
  
        ); 
  
      }) 
  
    ); 
  
  }); 