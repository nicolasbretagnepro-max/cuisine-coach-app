# V20

- Correction des parcours : IDs de leçons et recettes boss valides.
- Ajout de 3 leçons complètes : mijoter, pâtisserie, caramel.
- Ajout d’une fiche technique CAP/restaurant sur chaque recette.
- Ajout de `mainFamily`, `secondaryFamilies`, `primarySkill`, `secondarySkills`.
- Objectifs pédagogiques complétés.
- Erreurs/corrections ajoutées sur les étapes importantes.
- Programmes 30 jours / 90 jours / 6 mois enrichis avec calendriers.
- Mode cuisine rendu moins dense via sections repliables.


## V19

- Passage appVersion 1.9.0 et schemaVersion 19.
- Correction des quizIds nuls et des identifiants de questions.
- Suppression des familles héritées `v18Family`.
- Ajout de portes qualité, plans de secours, protocoles de dégustation, questions de chef et cibles photo par recette.
- Ajout d’un panneau de preuves par compétence.
- Ajout de 8 nouveaux repères visuels pédagogiques et précache PWA complet.

## V14 — Recettes de chef, quiz spécifiques et progression par familles

- Réécriture approfondie d’un deuxième lot de recettes : classiques français, sauces, pâtisserie, poisson, légumineuses et cuisine du monde.
- Ajout de précisions opérationnelles : tailles de coupe par ingrédient, ustensiles, feu, couvercle, signes de sortie, corrections.
- Quiz moins génériques : questions spécifiques par leçon et cas pratiques.
- Ateliers avancés ajoutés : cuisson humide/sèche, sauces, pâtes, pâtisserie, organisation.
- Nettoyage qualité : version V14, import/export V14, PWA V14.

# Changelog

## V13 — Audit qualité et correction pédagogique profonde

- Correction de la classification technique : le bœuf n’est plus détecté comme œuf.
- Suppression du fichier de patch temporaire livré par erreur.
- Mise à jour du schéma de sauvegarde en 13.
- Archive ZIP et documentation alignées V13.
- Précache PWA étendu aux visuels recettes.
- Réécriture approfondie de 20 recettes socles avec fiches techniques spécifiques : tailles de coupe, ustensiles, couvercle, feu, séquençage, points de décision, erreurs et critères de sortie.
- Ajout de profils culinaires robustes par famille pour les 80 recettes.
- Ajout d’ateliers de gestes et diagnostics plus concrets.
- Renforcement des quiz ciblés sur découpe, cuisson, sauces, goût, timing, fonds et pâtisserie.

# Changelog

## V8

- Ajout de l’onglet Ateliers.
- Ajout des drills diagnostic, goût et improvisation.
- Ajout des favoris et du plan de cuisine.
- Ajout des visuels de recettes dans `assets/recipes/`.
- Amélioration de l’écran recette avec plan d’exécution.
- Guidance adaptative dans le mode cuisine.
- Schéma de progression passé en version 8.

# Changelog

## 0.4.0

### Personnalisation

- Ajout d'un onboarding initial : prénom, objectif, niveau, rythme hebdomadaire, temps disponible, catégories préférées et matériel.
- Préférences modifiables depuis l'onglet Profil.
- Passage au schéma de progression `4`.

### Programme

- Ajout d'un programme hebdomadaire sur l'accueil.
- Calcul du programme à partir des révisions dues, leçons débloquées, compétences faibles, préférences et recettes recommandées.
- Suivi des jours actifs de la semaine à partir de l'historique XP.

### Recettes

- Ajout d'une recherche par titre, description, ingrédient, saison ou technique.
- Ajout de filtres par catégorie, niveau et durée.
- Recommandation de recettes mieux alignée avec les préférences et compétences faibles.

### Export

- Ajout d'un export archive ZIP avec `progress.json`, `README.txt` et dossier `photos/`.
- L'import JSON reste le format de restauration directe dans l'app.

### Contenu

- Ajout de compétences : légumineuses, finition et contraste.
- Ajout de leçons : vinaigrette, béchamel, légumineuses, pâte sablée, dressage.
- Ajout de recettes : vinaigrette émulsionnée, béchamel, légumes rôtis, dhal, shakshuka, pâte sablée, tarte aux pommes, bowl complet.
- Ajout de badges liés au rythme, aux sauces, au végétal et aux desserts.

## 0.3.0

### Fiabilité et stockage

- Passage au schéma de progression `3`.
- Ajout d'un stockage IndexedDB dédié aux photos du journal.
- Migration automatique des anciennes photos base64 vers IndexedDB.
- `localStorage` allégé : les photos ne sont plus conservées directement dans la progression.
- Export complet capable de récupérer les photos depuis IndexedDB.
- Import complet capable de restaurer les photos dans IndexedDB.
- Sauvegarde de secours locale allégée avant import ou réinitialisation.
- Suppression d'une entrée de journal = suppression de la photo IndexedDB associée.

### PWA / hors-ligne

- Ajout d'un `service-worker.js`.
- Mise en cache des fichiers principaux après première visite.
- Usage hors-ligne partiel possible une fois l'app chargée.

### Contenu

- Ajout de compétences : viande, poisson, riz, bouillons/fonds, caramel, construction de menu.
- Ajout de leçons : viande, poisson, riz, bouillons/fonds, composer une assiette équilibrée.
- Ajout de recettes : steak beurre herbes, poisson poêlé citron-herbes, riz pilaf, risotto champignons, crème caramel.
- Correction de petites incohérences de contenu.

## 0.2.0

### Fiabilité

- Migration automatique depuis les sauvegardes V1.
- Nouveau schéma de progression V2.
- Streak calculé sur la date locale.
- Sauvegarde locale protégée par `try/catch`.
- Sauvegarde de secours avant import ou réinitialisation.
- Import JSON plus strict : nettoyage des textes, IDs, photos et références inconnues.
- Export léger sans photos et export complet avec photos.

### Apprentissage

- Quiz obligatoires pour valider une leçon.
- Tentatives, meilleur score et prochaine date de révision par leçon.
- Progression de compétences plus nuancée selon réussite des recettes.
- Compétences faibles affichées sur l'accueil.
- Révisions dues affichées dans le parcours.

### Recettes

- Reprise d'une recette interrompue.
- Confirmation avant sortie du mode cuisine.
- Checklists de mise en place : ingrédients et matériel.
- Notes rapides par étape.
- Timers basés sur une heure de fin, plus robustes qu'un simple compteur.
- Objectifs techniques et signes de réussite sur les recettes enrichies.

### Journal

- Erreur principale par session.
- Axe de progrès pour la prochaine tentative.
- Détection simple du point faible récurrent.
- Bouton pour refaire une recette depuis le journal.

### Contenu

- Passage de 6 à 12 leçons.
- Passage de 8 à 12 recettes.
- Passage de 12 à 18 compétences.
- Passage de 5 à 8 badges.


## V5 — catalogue porté à 50 recettes

- Passage de 21 à 50 recettes.
- Ajout de 29 recettes originales inspirées de grands classiques, recettes du quotidien, cuisine végétarienne, cuisine du monde et bases dessert.
- Ajout d'objectifs pédagogiques et de signes de réussite sur toutes les nouvelles recettes.
- Ajout du document `docs/recipe-sources.md`.
- Mise à jour du cache PWA en version V5.


## V7

- Passage du catalogue à 80 recettes dans l'application.
- Ajout des parcours structurés `learningPaths`.
- Ajout des missions quotidiennes sur la home.
- Ajout d'une carte de progression visuelle.
- Ajout des boss culinaires.
- Ajout de repères sensoriels, erreurs fréquentes, corrections et variantes pour les recettes.
- Ajout de quiz diagnostics.
- Amélioration CSS mobile-first.
- Correction du bouton d'export ZIP dupliqué.


## V9 — apprentissages approfondis

- Transformation des leçons en modules pédagogiques complets.
- Ajout de principes culinaires, gestes pas à pas, repères sensoriels, erreurs fréquentes, corrections, exercices et critères de maîtrise.
- Ajout de questions de quiz orientées diagnostic et correction.
- Amélioration CSS des écrans de leçon longs.
- Passage du cache PWA et du schéma de progression en V9.


## V10 — Repasse qualité apprentissage

- Passage au schéma 10 et appVersion 1.0.0.
- Ajout de standards de maîtrise : comprendre, exécuter, corriger, répéter, adapter.
- Enrichissement systématique des leçons : lecture de chef, vocabulaire technique, ateliers pratiques notés, progression amateur → excellent, grille d’évaluation.
- Quiz renforcés : minimum de questions orientées diagnostic, maîtrise et correction.
- Recettes enrichies avec standards attendus, points de contrôle critiques et grilles d’auto-évaluation.
- Fin de recette améliorée avec auto-évaluation technique : organisation, cuisson, assaisonnement, texture, dressage.
- Journal enrichi avec résumé des évaluations.
- Ajout de nouveaux ateliers de diagnostic culinaire.
- Import compatible V9/V10.


## V11 - Recettes ultra-guidées

- Ajout d’une fiche technique complète sur chaque recette : découpes, ustensiles, feu, couvercle, séquençage, décisions et service.
- Ajout de précisions étape par étape dans le mode cuisine : outil, feu, couvrir ou non, taille, durée utile, pourquoi, signe de fin.
- Ajout de règles spécifiques pour légumes, sauces, viandes, poissons, riz, pâtes, pâtisserie et plats mijotés.
- Ajout d’ateliers pratiques sur les tailles de coupe, le couvercle et la surcharge de poêle.
- Passage du schéma de progression en version 11.

## V13 — Exigence pédagogique globale

- Ajout d’une couche d’apprentissage avancée sur les 80 recettes.
- Chaque recette dispose désormais d’un coach avancé : objectif réel, avant cuisson, pendant cuisson, après cuisson.
- Ajout systématique de précisions sur les découpes, ustensiles, feu, couvercle, ordre d’exécution, points de décision et service.
- Correction des classifications techniques pour éviter les indications génériques ou incohérentes.
- Enrichissement des étapes en mode cuisine : pourquoi profond, décision à prendre, erreur probable, contrôle chef.
- Ajout de standards de parcours : compétences visées, exercices à refaire, mauvaises habitudes à supprimer, critères de validation.
- Renforcement des leçons : fausses bonnes idées, transfert en vraie cuisine, exercice de transfert, quiz minimum renforcé.
- Ajout d’ateliers avancés : feu/humidité/surface, tailles de légumes, correction d’assaisonnement, timing de service.
- Passage au schéma de progression 12 et version app 1.2.0.


## V15 - approfondissement pédagogique lot 3

- Recettes desserts/pâtisserie enrichies avec températures, repos, textures et erreurs.
- Poisson et riz sauté réécrits avec repères sensoriels et décisions.
- Sauces émulsionnées renforcées : mayonnaise, hollandaise.
- Ajout d'un affichage mise en place détaillée et timing de cuisine.
- Nouveaux quiz diagnostics et ateliers.


## V16 - Programmes, gestes et décisions

- Ajout de 3 programmes longs : 30 jours, 90 jours, 6 mois.
- Ajout de 12 gestes techniques entraînables.
- Ajout de 5 épreuves pratiques de validation.
- Ajout de matrices de décision, fenêtres de service, conservation et choix produit dans les recettes.
- Enrichissement ciblé de recettes encore insuffisamment profondes.
- Quiz plus spécifiques sur découpe, saisie, assaisonnement, organisation et réduction.
- Passage appVersion 1.6.0 et schemaVersion 16.

## V17 - Nettoyage, consolidation et progression par preuves

- Consolidation complète de `data.js` : suppression des couches de patchs successifs et écriture d’un objet de données unique.
- Suppression des champs hérités incohérents, notamment `v12Family`.
- Correction définitive de la classification des recettes au bœuf.
- Réécriture ciblée des 30 recettes qui contenaient encore des blocs génériques : mise en place, tailles, timing, rôle des ingrédients et service.
- Suppression des questions de quiz répétitives et remplacement par 176 questions, avec 8 questions par leçon.
- Ajout d’un modèle de maîtrise par preuves : théorie, quiz, pratique, répétition, correction et épreuve.
- Mise à jour du suivi des compétences pour ne plus progresser uniquement par addition mécanique de points.
- Passage appVersion 1.7.0 et schemaVersion 17.
- Mise à jour du cache PWA en V17.


## V18

- Passage appVersion 1.8.0 et schemaVersion 18.
- Correction des familles restantes : quiche, falafels, pâte à choux, salades et desserts.
- Ajout de 8 repères visuels pédagogiques avec SVG dédiés.
- Ajout de 3 épreuves pratiques et 3 gestes techniques.
- Renforcement de la progression par preuves en tenant compte de l’auto-évaluation.
- Remplacement des derniers timelines génériques par des plans propres par famille culinaire.
- PWA mise à jour avec cache des nouveaux assets.
