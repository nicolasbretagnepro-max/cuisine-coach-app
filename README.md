# Coach Cuisine

Web app personnelle mobile-first pour apprendre la cuisine avec une logique de progression : onboarding, programme hebdomadaire, micro-leçons, quiz validants, recettes guidées, XP, badges, journal photo/commentaires, export/import et fonctionnement hors-ligne partiel.

## Objectif

Passer progressivement d'un niveau amateur à un niveau avancé : techniques, saveurs, cuissons, sauces, organisation, recettes classiques, recettes modernes et premières bases de pâtisserie.

## Version actuelle

Version : `0.4.0`

Cette version transforme la V3 en coach plus personnel : préférences initiales, programme de la semaine, moteur de recherche recettes, archive ZIP et contenu enrichi sur les sauces, le végétal, le four, la pâtisserie et le dressage.

### Nouveautés 0.4.0

- onboarding initial : prénom, objectif, niveau, rythme, temps disponible, catégories préférées, matériel ;
- préférences modifiables depuis le profil ;
- programme hebdomadaire généré selon l'objectif, les révisions, les leçons débloquées, les compétences faibles et les catégories préférées ;
- recherche de recettes par nom, ingrédient, technique ou catégorie ;
- filtres par catégorie, niveau et durée ;
- export archive `.zip` avec `progress.json` et dossier `photos/` ;
- schéma de progression `4` ;
- contenu enrichi : vinaigrette, béchamel, épices, légumineuses, cuisson au four, pâte sablée, dressage ;
- nouvelles recettes : vinaigrette, béchamel, légumes rôtis, dhal, shakshuka, pâte sablée, tarte aux pommes, bowl de saison.

## Structure

```txt
.
├── index.html
├── styles.css
├── data.js
├── app.js
├── service-worker.js
├── manifest.webmanifest
├── assets/
│   └── icon.svg
├── docs/
│   └── import-export.md
└── .github/
    └── workflows/
        └── pages.yml
```

## Lancer en local

Tu peux ouvrir directement `index.html`, mais pour tester le service worker et le comportement proche GitHub Pages, utilise plutôt un petit serveur local :

```bash
python3 -m http.server 8080
```

Puis ouvrir :

```txt
http://localhost:8080
```

## Publier sur GitHub Pages

### Méthode simple

1. Créer un dépôt GitHub, par exemple `coach-cuisine`.
2. Envoyer tous les fichiers de ce dossier à la racine du dépôt.
3. Dans GitHub : `Settings` → `Pages`.
4. Source : `Deploy from a branch`.
5. Branch : `main`.
6. Folder : `/root`.
7. Enregistrer.

URL attendue :

```txt
https://<ton-compte>.github.io/coach-cuisine/
```

### Méthode GitHub Actions

Un workflow est présent dans `.github/workflows/pages.yml`. Il peut être utilisé si tu préfères déployer via GitHub Actions.

## Sauvegarde et restauration

L'app utilise deux stockages locaux :

- `localStorage` : progression, XP, leçons, recettes, journal sans données photo lourdes ;
- IndexedDB : photos compressées du journal.

Dans l'onglet `Profil`, tu peux :

- exporter une sauvegarde complète JSON avec photos ;
- exporter une sauvegarde légère JSON sans photos ;
- générer une archive ZIP avec `progress.json` + `photos/` ;
- importer une sauvegarde JSON ;
- restaurer la sauvegarde de secours créée avant le dernier import ou reset ;
- réinitialiser la progression locale.

Recommandation : faire un export léger régulièrement, un export complet JSON pour pouvoir restaurer facilement, et une archive ZIP de temps en temps pour conserver proprement les photos.

## Limites actuelles

- Pas de compte utilisateur.
- Pas de synchronisation entre appareils.
- Le service worker permet un usage hors-ligne partiel, mais il faut avoir chargé l'app au moins une fois.
- L'import direct d'archive ZIP n'est pas encore inclus ; l'import restaurable reste le JSON complet.
- Pas d'IA.
- Le programme hebdomadaire est heuristique, pas encore basé sur un vrai algorithme de mémorisation fine.

## Prochaines évolutions recommandées

1. Ajouter une page `Programme` dédiée avec calendrier, sessions passées et prochaines pratiques.
2. Ajouter un vrai système de révision espacée par compétence, pas seulement par leçon.
3. Ajouter un mode liste de courses et portions ajustables.
4. Ajouter des menus complets de niveau avancé.
5. Ajouter davantage de recettes CAP/pro : fonds, sauces mères, poissons, viandes, desserts classiques.
6. Ajouter l'import direct d'archive ZIP.
7. Migrer vers Supabase uniquement si la synchronisation multi-appareils devient nécessaire.


## V5 — catalogue de recettes étendu

La V5 passe le catalogue à 50 recettes. Les nouvelles recettes couvrent :
- classiques français : bœuf bourguignon, blanquette, quiche lorraine, soupe à l'oignon, gratin dauphinois, hachis parmentier, pot-au-feu ;
- recettes du quotidien : one-pot pasta, soupe de légumes, poulet miel-soja, lentilles saucisse, croque-monsieur ;
- recettes végétariennes et modernes : chili sin carne, tacos végétariens, falafels, houmous, couscous de légumes, lasagnes aux légumes ;
- recettes du monde : ramen miso express, pad thaï simplifié ;
- bases dessert : crêpes, mousse au chocolat, gâteau au yaourt.

Les recettes sont réécrites dans un format pédagogique original, avec objectifs, signes de réussite, étapes et explications techniques.
