// Service worker: guarda el juego en el celular para que se pueda instalar y jugar sin internet
const VERSION = 'mapa-v14';
const PHASER = 'https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'fonts/bagel-fat-one.woff2', 'fonts/gochi-hand.woff2', 'fonts/mali-400.woff2', 'fonts/mali-600.woff2', 'fonts/mali-700.woff2', 'icons/apple-touch-icon.png', 'icons/favicon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'img/agua.png', 'img/alambre.png', 'img/b_condor.png', 'img/b_volcan.png', 'img/b_zonda.png', 'img/barril.png', 'img/bernardo50.jpg', 'img/bernardo_obrero.jpg', 'img/bernardo_policia.jpg', 'img/bg_aconcagua.jpg', 'img/bg_atuel.jpg', 'img/bg_bodega.jpg', 'img/bg_cacheuta.jpg', 'img/bg_caverna.jpg', 'img/bg_cerro.jpg', 'img/bg_cristo.jpg', 'img/bg_diamante.jpg', 'img/bg_finca.jpg', 'img/bg_guanacache.jpg', 'img/bg_llancanelo.jpg', 'img/bg_manzano.jpg', 'img/bg_mapa.jpg', 'img/bg_parque.jpg', 'img/bg_payunia.jpg', 'img/bg_pincheira.jpg', 'img/bg_plaza.jpg', 'img/bg_portada.jpg', 'img/bg_potrerillos.jpg', 'img/bg_prologo.jpg', 'img/bg_puente.jpg', 'img/bg_reyunos.jpg', 'img/bg_ruinas.jpg', 'img/bg_uco.jpg', 'img/bg_uspallata.jpg', 'img/bg_villavicencio.jpg', 'img/esc_agua_olivo.jpg', 'img/esc_bodega.jpg', 'img/esc_bovedas.jpg', 'img/esc_brujula.jpg', 'img/esc_caja.jpg', 'img/esc_camion.jpg', 'img/esc_cerro.jpg', 'img/esc_chimenea.jpg', 'img/esc_coleccionista.jpg', 'img/esc_colectivo.jpg', 'img/esc_cosecha.jpg', 'img/esc_cristo.jpg', 'img/esc_estacion.jpg', 'img/esc_flamencos.jpg', 'img/esc_fogata.jpg', 'img/esc_fuente.jpg', 'img/esc_gomon.jpg', 'img/esc_lagunas.jpg', 'img/esc_llave.jpg', 'img/esc_mapa.jpg', 'img/esc_marca.jpg', 'img/esc_museo.jpg', 'img/esc_olivo.jpg', 'img/esc_pincheira.jpg', 'img/esc_prologo.jpg', 'img/esc_rosa.jpg', 'img/esc_servilleta.jpg', 'img/esc_sobre.jpg', 'img/esc_termas.jpg', 'img/esc_tres_uno.jpg', 'img/esc_vendimia.jpg', 'img/esc_vianda.jpg', 'img/esc_zorra.jpg', 'img/f_canasto.png', 'img/f_damasco.png', 'img/f_gota.png', 'img/f_hoja.png', 'img/f_sol.png', 'img/f_uva.png', 'img/frag1.png', 'img/frag2.png', 'img/frag3.png', 'img/frag4.png', 'img/frag5.png', 'img/frag6.png', 'img/h_guante.png', 'img/h_pala.png', 'img/h_tijera.png', 'img/llave.png', 'img/maleza.png', 'img/mapa_ciudad.jpg', 'img/mapa_ruta7.jpg', 'img/mapa_sur.jpg', 'img/mapa_valle.jpg', 'img/niebla.png', 'img/nieta.jpg', 'img/nieta_feliz.jpg', 'img/nieta_normal.jpg', 'img/nieta_serio.jpg', 'img/nieta_sorpresa.jpg', 'img/nieto.jpg', 'img/nieto_feliz.jpg', 'img/nieto_normal.jpg', 'img/nieto_serio.jpg', 'img/nieto_sorpresa.jpg', 'img/obj_balsa.png', 'img/obj_boleto.png', 'img/obj_brujula.png', 'img/obj_corcho.png', 'img/obj_cuaderno.png', 'img/obj_entrada.png', 'img/obj_farol.png', 'img/obj_foto_abuelos.png', 'img/obj_foto_hijos.png', 'img/obj_gorra.png', 'img/obj_herradura.png', 'img/obj_mapa.png', 'img/obj_moneda.png', 'img/obj_nota.png', 'img/obj_pluma.png', 'img/obj_pomez.png', 'img/obj_servilleta.png', 'img/obj_termo.png', 'img/octavio.jpg', 'img/octavio_feliz.jpg', 'img/octavio_normal.jpg', 'img/octavio_serio.jpg', 'img/octavio_sorpresa.jpg', 'img/p_llave.png', 'img/roberto_camionero.jpg', 'img/roberto_viajero.jpg', 'img/rock_hielo.png', 'img/rock_ladrillo.png', 'img/rock_lava.png', 'img/rock_piedra.png', 'img/rosa.jpg', 'img/rosa_feliz.jpg', 'img/rosa_normal.jpg', 'img/rosa_serio.jpg', 'img/rosa_sorpresa.jpg', 'img/s_cristal.png', 'img/s_flor.png', 'img/s_herradura.png', 'img/s_lava.png', 'img/s_pluma.png', 'img/s_totora.png', 'img/suelo_arena.png', 'img/suelo_ceniza.png', 'img/suelo_nieve.png', 'img/suelo_polvo.png', 'img/suelo_tierra.png', 'img/t_copo.png', 'img/t_farol.png', 'img/t_flor.png', 'img/t_reloj.png', 'img/t_rueda.png', 'img/t_valija.png', 'img/ui_bolsa.png', 'img/ui_cofre.png', 'img/ui_cofre_abierto.png', 'img/ui_corazon.png', 'img/ui_jugadas.png', 'img/ui_mercado.png', 'img/ui_mochila.png', 'img/ui_moneda.png'];

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
