// Service worker: guarda el juego en el celular para que se pueda instalar y jugar sin internet
const VERSION = 'mapa-v3';
const PHASER = 'https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'icons/apple-touch-icon.png', 'icons/favicon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'img/b_condor.png', 'img/b_volcan.png', 'img/b_zonda.png', 'img/bernardo50.jpg', 'img/bernardo_obrero.jpg', 'img/bernardo_policia.jpg', 'img/bg_atuel.jpg', 'img/bg_cerro.jpg', 'img/bg_cristo.jpg', 'img/bg_finca.jpg', 'img/bg_mapa.jpg', 'img/bg_payunia.jpg', 'img/bg_portada.jpg', 'img/bg_potrerillos.jpg', 'img/bg_prologo.jpg', 'img/bg_puente.jpg', 'img/bg_ruinas.jpg', 'img/bg_uco.jpg', 'img/bg_villavicencio.jpg', 'img/f_canasto.png', 'img/f_damasco.png', 'img/f_gota.png', 'img/f_hoja.png', 'img/f_sol.png', 'img/f_uva.png', 'img/frag1.png', 'img/frag2.png', 'img/frag3.png', 'img/frag4.png', 'img/frag5.png', 'img/frag6.png', 'img/h_guante.png', 'img/h_pala.png', 'img/h_tijera.png', 'img/llave.png', 'img/nieta.jpg', 'img/nieto.jpg', 'img/p_llave.png', 'img/roberto_camionero.jpg', 'img/roberto_viajero.jpg', 'img/t_copo.png', 'img/t_farol.png', 'img/t_flor.png', 'img/t_reloj.png', 'img/t_rueda.png', 'img/t_valija.png', 'img/ui_bolsa.png', 'img/ui_cofre.png', 'img/ui_cofre_abierto.png', 'img/ui_corazon.png', 'img/ui_jugadas.png', 'img/ui_moneda.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS).then(() =>
    // Phaser viene de otro sitio: se guarda aparte para que el juego ande sin internet
    c.add(new Request(PHASER, { mode: 'no-cors' })).catch(() => {})
  )).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // archivos del juego: primero lo guardado, si no, internet
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => (req.mode === 'navigate' ? caches.match('index.html') : undefined)))
    );
  } else {
    // Phaser y las tipografías: usa lo guardado y lo actualiza en segundo plano
    e.respondWith(
      caches.open(VERSION).then((c) => c.match(req).then((hit) => {
        const net = fetch(req).then((res) => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      }))
    );
  }
});
