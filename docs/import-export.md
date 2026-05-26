# Modèle export/import de progression

L'application utilise des exports pour restaurer la progression après :

- suppression du cache navigateur ;
- réinitialisation accidentelle ;
- changement de téléphone ;
- changement d'URL GitHub Pages ;
- perte du `localStorage` ou de l'IndexedDB.

## Stockage local V4

| Stockage | Contenu | Raison |
|---|---|---|
| `localStorage` | progression, XP, leçons, recettes, journal, préférences, références photo | simple, rapide, léger |
| IndexedDB | photos compressées du journal | évite de saturer `localStorage` |

Une entrée de journal contient surtout un `photoId`. La donnée image complète est stockée dans IndexedDB.

## Types d'export

### Export léger JSON

Contient toute la progression, mais retire les données photo.

Usage recommandé : sauvegarde fréquente.

Limite : si tu l'importes sur un autre appareil, les entrées de journal resteront présentes, mais les photos ne seront pas disponibles.

### Export complet JSON

Contient la progression et les photos compressées en base64, récupérées depuis IndexedDB au moment de l'export.

Usage recommandé : restauration directe dans l'app, transfert vers un autre appareil ou sauvegarde ponctuelle après des recettes importantes.

### Archive ZIP

Contient :

```txt
coach-cuisine-archive.zip
├── progress.json
├── README.txt
└── photos/
    ├── photo-log-....jpg
    └── photo-log-....jpg
```

Usage recommandé : conservation propre à long terme.

Limite actuelle : l'app ne sait pas encore réimporter directement le ZIP. Pour restaurer, utiliser l'export complet JSON.

## Format général V4

```json
{
  "appName": "coach-cuisine",
  "appVersion": "0.4.0",
  "schemaVersion": 4,
  "exportType": "light",
  "exportedAt": "2026-05-26T12:00:00.000Z",
  "summary": {
    "xp": 120,
    "lessons": 4,
    "recipes": 2,
    "logs": 2,
    "photos": 0,
    "badges": 2,
    "schemaVersion": 4
  },
  "progress": {
    "schemaVersion": 4,
    "createdAt": "2026-05-26T12:00:00.000Z",
    "updatedAt": "2026-05-26T12:00:00.000Z",
    "xp": 120,
    "xpHistory": [],
    "streak": {
      "current": 2,
      "best": 2,
      "lastActivityLocalDate": "2026-05-26"
    },
    "completedLessons": [],
    "lessonResults": {},
    "completedRecipes": [],
    "recipeStats": {},
    "masteredSkills": {},
    "badges": [],
    "recipeLogs": [],
    "activeSession": null,
    "preferences": {
      "onboardingDone": true,
      "firstName": "Nicolas",
      "goal": "devenir très bon en cuisine",
      "weeklyGoal": 3,
      "availableTime": "30-45 min",
      "currentLevel": "debutant",
      "preferredCategories": ["quotidien", "technique"],
      "equipment": ["poêle", "four", "balance"]
    }
  },
  "checksum": "xxxxxxxx"
}
```

## Entrée de journal V4

### Dans le stockage local

```json
{
  "id": "log-1779800000000-abcd",
  "recipeId": "r-poulet-deglace",
  "date": "2026-05-26T12:00:00.000Z",
  "rating": 4,
  "difficulty": 3,
  "errorType": "cuisson",
  "comment": "Sauce réussie, poulet un peu trop cuit.",
  "nextFocus": "Sortir le poulet plus tôt et laisser reposer.",
  "photoId": "photo-log-1779800000000-abcd",
  "photoDataUrl": null,
  "photoOmitted": false,
  "skillIds": ["saisir", "deglacer", "reduire"]
}
```

### Dans un export complet JSON

```json
{
  "id": "log-1779800000000-abcd",
  "recipeId": "r-poulet-deglace",
  "photoId": "photo-log-1779800000000-abcd",
  "photoDataUrl": "data:image/jpeg;base64,...",
  "photoOmitted": false
}
```

### Dans l'archive ZIP

```json
{
  "id": "log-1779800000000-abcd",
  "recipeId": "r-poulet-deglace",
  "photoId": "photo-log-1779800000000-abcd",
  "photoFile": "photos/photo-log-1779800000000-abcd.jpg",
  "photoDataUrl": null,
  "photoOmitted": false
}
```

## Règles d'import JSON V4

L'import :

- refuse les fichiers trop volumineux ;
- vérifie `appName === "coach-cuisine"` ;
- accepte les schémas `1`, `2`, `3` et `4` ;
- migre les anciennes sauvegardes vers le modèle V4 ;
- nettoie les textes et IDs ;
- ignore les leçons, recettes, badges ou compétences inconnus ;
- limite les photos aux formats `jpeg`, `png`, `webp` en `data:image/...;base64` ;
- transfère les photos importées vers IndexedDB ;
- retire les photos du `localStorage` après import ;
- crée une sauvegarde locale légère avant de remplacer l'état actuel ;
- affiche un résumé avant confirmation.

## Sauvegarde de secours

Avant import ou reset, l'app crée une sauvegarde locale légère de l'état actuel.

Cette sauvegarde est surtout utile pour revenir en arrière sur le même navigateur. Pour changer d'appareil, utiliser l'export complet JSON.
