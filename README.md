# Coach Cuisine — V20

Web app mobile-first pour apprendre la cuisine par parcours, recettes guidées, gestes techniques, épreuves pratiques, journal et progression par preuves.

## Nouveautés V20

- Correction des références cassées dans les parcours.
- Ajout des leçons manquantes : mijoter, pâtisserie structurée, caramel.
- Familles pédagogiques plus propres : `mainFamily` et `secondaryFamilies`.
- Objectifs manquants ajoutés aux recettes.
- Fiche technique CAP / restaurant dans les recettes.
- Erreurs et corrections spécifiques ajoutées aux étapes clés.
- Programmes longs transformés en calendriers d’action.
- Mode cuisine allégé avec détails avancés repliables.

# Cuisine Coach — V20

## Nouveautés V20

- Nettoyage des champs de famille hérités `v18Family` et stabilisation du champ `family`.
- Correction des `quizIds` invalides/null et consolidation des identifiants de questions.
- Ajout de portes qualité par recette : avant cuisson, cuisson, finition.
- Ajout de plans de secours par famille culinaire : viande, poisson, légumes, sauces, pâtisserie, œufs, riz, pâtes, soupes, salades.
- Ajout de protocoles de dégustation et de questions de chef pour apprendre à diagnostiquer.
- Ajout de cibles photo pédagogiques pour documenter découpe, cuisson, texture et dressage.
- Ajout d’un panneau “Plan de preuves” pour visualiser théorie, quiz, pratique, répétition, correction et épreuve par compétence.
- Ajout de 8 repères visuels pédagogiques supplémentaires.
- PWA mise à jour avec précache de tous les visuels V20.


Web app mobile-first pour apprendre la cuisine avec parcours, recettes guidées, quiz, journal, ateliers, programmes longs et progression par compétences.

## Publication GitHub Pages

1. Dézipper l’archive.
2. Copier tous les fichiers à la racine du dépôt GitHub.
3. Activer GitHub Pages sur la branche `main`, dossier `/root`.
4. Ouvrir l’URL GitHub Pages sur iPhone.

## Nouveautés V18

### Données consolidées

`data.js` a été nettoyé : les couches de patchs successifs ont été consolidées en un seul objet de données. Les champs hérités incohérents comme `V18Family` ont été supprimés.

### Recettes moins génériques

La V18 corrige les recettes qui contenaient encore des blocs trop automatiques. Les 30 recettes identifiées comme trop génériques ont reçu des précisions plus concrètes sur :

- mise en place ;
- taille de coupe ;
- rôle des ingrédients ;
- timing ;
- service ;
- décisions de cuisson.

### Quiz renforcés

Les questions trop répétitives ont été supprimées. Chaque leçon contient maintenant au moins 8 questions, davantage orientées diagnostic, méthode et correction.

### Progression par preuves

Les compétences ne progressent plus seulement par addition mécanique. La V18 enregistre des preuves :

- théorie ;
- quiz ;
- pratique ;
- répétition ;
- correction ;
- épreuve.

Le score de compétence dépend désormais de ces preuves.

## Contenu actuel

- 80 recettes ;
- 22 leçons ;
- 176 questions ;
- 30 compétences ;
- 5 parcours ;
- 44 ateliers/drills ;
- 12 gestes techniques ;
- 5 épreuves pratiques ;
- 80 visuels recettes SVG ;
- export/import JSON ;
- export archive ZIP ;
- PWA partielle.

## Limites restantes

- les visuels recettes sont encore des SVG illustratifs, pas de vraies photos pédagogiques ;
- la modularisation technique peut encore être améliorée ;
- les recettes sont beaucoup plus propres, mais un futur lot peut continuer la réécriture recette par recette sur les standards CAP/restaurant.


## V18

- Nettoyage des familles de recettes et suppression des champs hérités.
- Ajout de repères visuels pédagogiques : coloration, sauce, émulsion, poisson, pâte, caramel, découpes.
- Progression par preuves renforcée avec auto-évaluation de fin de recette.
- Ajout d’épreuves pratiques et de gestes techniques supplémentaires.
- Service worker mis à jour avec précache des repères visuels.