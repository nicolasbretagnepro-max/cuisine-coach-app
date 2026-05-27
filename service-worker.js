const CACHE_NAME = "coach-cuisine-v20-2026-05-27";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "assets/recipes/r-aubergine-parmigiana.svg",
  "assets/recipes/r-bao-porc-simplifie.svg",
  "assets/recipes/r-bechamel.svg",
  "assets/recipes/r-blanquette-veau.svg",
  "assets/recipes/r-boeuf-bourguignon.svg",
  "assets/recipes/r-bowl-saison.svg",
  "assets/recipes/r-canard-orange.svg",
  "assets/recipes/r-caponata.svg",
  "assets/recipes/r-carbonara-sans-creme.svg",
  "assets/recipes/r-chili-sin-carne.svg",
  "assets/recipes/r-couscous-legumes-express.svg",
  "assets/recipes/r-creme-caramel.svg",
  "assets/recipes/r-crepes.svg",
  "assets/recipes/r-croque-monsieur-bechamel.svg",
  "assets/recipes/r-curry-legumes.svg",
  "assets/recipes/r-curry-vert-legumes.svg",
  "assets/recipes/r-dhal-lentilles.svg",
  "assets/recipes/r-falafels-four.svg",
  "assets/recipes/r-financiers.svg",
  "assets/recipes/r-frittata-legumes.svg",
  "assets/recipes/r-gateau-yaourt.svg",
  "assets/recipes/r-gnocchis-poeles.svg",
  "assets/recipes/r-gratin-dauphinois.svg",
  "assets/recipes/r-hachis-parmentier.svg",
  "assets/recipes/r-houmous.svg",
  "assets/recipes/r-lasagnes-legumes.svg",
  "assets/recipes/r-legumes-rotis.svg",
  "assets/recipes/r-lentilles-saucisse.svg",
  "assets/recipes/r-mayonnaise-main.svg",
  "assets/recipes/r-menu-bistrot.svg",
  "assets/recipes/r-menu-vegetal.svg",
  "assets/recipes/r-moules-marinieres.svg",
  "assets/recipes/r-mousse-chocolat.svg",
  "assets/recipes/r-oeuf-parfait.svg",
  "assets/recipes/r-oeufs-brouilles.svg",
  "assets/recipes/r-omelette.svg",
  "assets/recipes/r-one-pot-pasta-epinards.svg",
  "assets/recipes/r-osso-buco.svg",
  "assets/recipes/r-pad-thai-simplifie.svg",
  "assets/recipes/r-pain-perdu.svg",
  "assets/recipes/r-panna-cotta.svg",
  "assets/recipes/r-pate-choux-gougeres.svg",
  "assets/recipes/r-pate-sablee.svg",
  "assets/recipes/r-pates-tomate.svg",
  "assets/recipes/r-poireaux-vinaigrette.svg",
  "assets/recipes/r-poisson-citron-herbes.svg",
  "assets/recipes/r-poke-bowl-saumon.svg",
  "assets/recipes/r-polenta-cremeuse.svg",
  "assets/recipes/r-pot-au-feu.svg",
  "assets/recipes/r-poulet-basquaise.svg",
  "assets/recipes/r-poulet-deglace.svg",
  "assets/recipes/r-poulet-katsu.svg",
  "assets/recipes/r-poulet-miel-soja.svg",
  "assets/recipes/r-poulet-yassa.svg",
  "assets/recipes/r-quiche-lorraine.svg",
  "assets/recipes/r-ramen-miso-express.svg",
  "assets/recipes/r-ramen-oeuf-marine.svg",
  "assets/recipes/r-ratatouille.svg",
  "assets/recipes/r-ravioles-bouillon.svg",
  "assets/recipes/r-risotto-champignons.svg",
  "assets/recipes/r-riz-pilaf.svg",
  "assets/recipes/r-riz-saute.svg",
  "assets/recipes/r-salade-cesar.svg",
  "assets/recipes/r-salade-nicoise.svg",
  "assets/recipes/r-sauce-hollandaise.svg",
  "assets/recipes/r-sauce-vierge.svg",
  "assets/recipes/r-shakshuka.svg",
  "assets/recipes/r-soupe-legumes.svg",
  "assets/recipes/r-soupe-miso-tofu.svg",
  "assets/recipes/r-soupe-oignon.svg",
  "assets/recipes/r-soupe-pho-rapide.svg",
  "assets/recipes/r-steak-beurre-herbes.svg",
  "assets/recipes/r-tacos-haricots-avocat.svg",
  "assets/recipes/r-tagine-poulet-citron.svg",
  "assets/recipes/r-tartare-boeuf.svg",
  "assets/recipes/r-tarte-pommes.svg",
  "assets/recipes/r-tiramisu-verrines.svg",
  "assets/recipes/r-veloute-potimarron.svg",
  "assets/recipes/r-vinaigrette-emulsion.svg",
  "assets/recipes/r-vinaigrette.svg",
  "assets/visual-guides/vg-assaisonnement.svg",
  "assets/visual-guides/vg-caramel.svg",
  "assets/visual-guides/vg-coloration-viande.svg",
  "assets/visual-guides/vg-decoupes.svg",
  "assets/visual-guides/vg-dressage.svg",
  "assets/visual-guides/vg-emulsion-tranchee.svg",
  "assets/visual-guides/vg-four-rotir.svg",
  "assets/visual-guides/vg-legumes-vapeur.svg",
  "assets/visual-guides/vg-oeufs-texture.svg",
  "assets/visual-guides/vg-oignon-suer-colorer.svg",
  "assets/visual-guides/vg-pate-al-dente.svg",
  "assets/visual-guides/vg-pate-sablee.svg",
  "assets/visual-guides/vg-poisson-nacre.svg",
  "assets/visual-guides/vg-riz-grain.svg",
  "assets/visual-guides/vg-roux-bechamel.svg",
  "assets/visual-guides/vg-sauce-nappante.svg"
];


self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
