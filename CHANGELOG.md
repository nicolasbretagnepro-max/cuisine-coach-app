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
