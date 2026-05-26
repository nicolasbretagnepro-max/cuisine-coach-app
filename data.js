window.CUISINE_DATA = {
  appVersion: "0.4.0",
  levels: [
    { minXp: 0, name: "Apprenti" },
    { minXp: 150, name: "Commis" },
    { minXp: 400, name: "Cuisinier" },
    { minXp: 800, name: "Chef de partie" },
    { minXp: 1400, name: "Sous-chef" },
    { minXp: 2200, name: "Top Chef en devenir" }
  ],
  skills: [
    { id: "organisation", name: "Organisation", category: "Bases", level: 1 },
    { id: "hygiene", name: "Hygiène", category: "Bases", level: 1 },
    { id: "couteau", name: "Découpe au couteau", category: "Découpe", level: 1 },
    { id: "assaisonnement", name: "Assaisonnement", category: "Saveurs", level: 1 },
    { id: "saisir", name: "Saisir", category: "Cuisson", level: 2 },
    { id: "deglacer", name: "Déglacer", category: "Sauces", level: 2 },
    { id: "reduire", name: "Réduire", category: "Sauces", level: 2 },
    { id: "emulsion", name: "Émulsionner", category: "Sauces", level: 3 },
    { id: "mijoter", name: "Mijoter", category: "Cuisson", level: 3 },
    { id: "patisserie", name: "Pâtisserie de base", category: "Dessert", level: 2 },
    { id: "dressage", name: "Dressage", category: "Finition", level: 4 },
    { id: "improvisation", name: "Improvisation", category: "Autonomie", level: 5 }
  ],
  lessons: [
    {
      id: "l-organisation-1",
      module: "Bases",
      title: "Mise en place : cuisiner sans subir",
      level: 1,
      xp: 30,
      skillIds: ["organisation", "hygiene"],
      summary: "Préparer, ranger et séquencer avant de chauffer la poêle.",
      content: [
        "La mise en place consiste à sortir le matériel, peser, couper et organiser avant de lancer la cuisson.",
        "Elle réduit les erreurs de timing : un ingrédient oublié ou mal coupé peut ruiner une cuisson rapide.",
        "Réflexe utile : lis toute la recette, prépare les ingrédients, puis seulement ensuite commence à cuire."
      ],
      quiz: [
        {
          question: "Pourquoi la mise en place est-elle importante ?",
          options: ["Pour faire joli", "Pour éviter les erreurs de timing", "Pour utiliser plus de vaisselle"],
          answer: 1,
          explanation: "Elle permet d'agir au bon moment, surtout quand la cuisson est rapide."
        },
        {
          question: "Quel est le bon premier réflexe avant une recette ?",
          options: ["Chauffer la poêle", "Lire toute la recette", "Saler tous les ingrédients"],
          answer: 1,
          explanation: "Lire toute la recette évite les surprises pendant la cuisson."
        }
      ]
    },
    {
      id: "l-couteau-1",
      module: "Découpe",
      title: "Tenir son couteau et couper régulièrement",
      level: 1,
      xp: 35,
      skillIds: ["couteau"],
      summary: "Comprendre la sécurité, la régularité et l'effet de la taille sur la cuisson.",
      content: [
        "Une découpe régulière donne une cuisson régulière. Les petits morceaux cuisent plus vite que les gros.",
        "La main qui tient l'aliment doit former une griffe : les doigts sont repliés, la lame glisse contre les phalanges.",
        "Ne cherche pas la vitesse. Cherche d'abord la stabilité, puis la précision."
      ],
      quiz: [
        {
          question: "Pourquoi couper les légumes à taille régulière ?",
          options: ["Pour la photo seulement", "Pour une cuisson homogène", "Pour réduire le goût"],
          answer: 1,
          explanation: "La taille influence directement la vitesse de cuisson."
        }
      ]
    },
    {
      id: "l-assaisonnement-1",
      module: "Saveurs",
      title: "Sel, gras, acide : le triangle de base",
      level: 1,
      xp: 40,
      skillIds: ["assaisonnement"],
      summary: "Apprendre à corriger un plat fade sans ajouter au hasard.",
      content: [
        "Un plat fade manque souvent de sel, mais pas toujours. Il peut aussi manquer d'acidité ou de matière grasse.",
        "Le sel intensifie les goûts. L'acide réveille. Le gras arrondit et porte les arômes.",
        "Réflexe : goûte, corrige peu à peu, puis goûte encore."
      ],
      quiz: [
        {
          question: "Un plat lourd et plat peut souvent être corrigé par...",
          options: ["Un peu d'acidité", "Beaucoup de farine", "Plus d'eau"],
          answer: 0,
          explanation: "L'acidité apporte de la tension et réveille les saveurs."
        },
        {
          question: "Le rôle principal du sel est de...",
          options: ["Cacher les goûts", "Intensifier les saveurs", "Créer du croustillant"],
          answer: 1,
          explanation: "Le sel renforce la perception des saveurs."
        }
      ]
    },
    {
      id: "l-saisir-1",
      module: "Cuisson",
      title: "Saisir : créer de la coloration",
      level: 2,
      xp: 45,
      skillIds: ["saisir"],
      summary: "Comprendre chaleur, humidité et coloration.",
      content: [
        "Saisir, ce n'est pas juste cuire vite. C'est créer une coloration en surface grâce à une chaleur forte.",
        "L'ennemi de la coloration est l'eau. Il faut sécher l'aliment, bien chauffer la poêle et éviter de surcharger.",
        "Quand l'aliment accroche trop, attends quelques secondes : il se détache souvent quand la croûte se forme."
      ],
      quiz: [
        {
          question: "Pourquoi sécher une viande avant de la saisir ?",
          options: ["Pour enlever le goût", "Pour éviter que l'eau empêche la coloration", "Pour réduire la taille"],
          answer: 1,
          explanation: "L'eau doit s'évaporer avant que la coloration démarre."
        }
      ]
    },
    {
      id: "l-deglacer-1",
      module: "Sauces",
      title: "Déglacer : récupérer les sucs",
      level: 2,
      xp: 45,
      skillIds: ["deglacer", "reduire"],
      summary: "Transformer une poêle marquée en base de sauce.",
      content: [
        "Après une cuisson, les sucs collés au fond concentrent beaucoup de goût.",
        "Déglacer consiste à verser un liquide et gratter le fond pour les dissoudre.",
        "Ensuite, on réduit pour concentrer, puis on peut arrondir avec beurre, crème ou huile."
      ],
      quiz: [
        {
          question: "Que récupère-t-on en déglaçant ?",
          options: ["Les sucs de cuisson", "L'eau des pâtes", "Le sel brûlé"],
          answer: 0,
          explanation: "Les sucs donnent une base aromatique puissante."
        }
      ]
    },
    {
      id: "l-emulsion-1",
      module: "Sauces",
      title: "Émulsion : lier gras et liquide",
      level: 3,
      xp: 50,
      skillIds: ["emulsion"],
      summary: "Comprendre vinaigrette, mayonnaise, beurre monté et sauces liées.",
      content: [
        "Une émulsion est une dispersion de gras dans un liquide, ou l'inverse.",
        "Pour la réussir, on ajoute progressivement le gras tout en fouettant, ou on utilise un élément liant.",
        "Une sauce qui tranche peut parfois être récupérée avec une petite quantité d'eau tiède et un fouet."
      ],
      quiz: [
        {
          question: "Dans une vinaigrette stable, que faut-il faire ?",
          options: ["Ajouter l'huile d'un coup", "Fouetter en ajoutant progressivement", "Faire bouillir longtemps"],
          answer: 1,
          explanation: "L'ajout progressif facilite la dispersion du gras."
        }
      ]
    }
  ],
  recipes: [
    {
      id: "r-omelette",
      title: "Omelette baveuse aux herbes",
      category: "classique",
      level: 1,
      duration: 12,
      cost: "low",
      season: ["toute saison"],
      cover: "alt3",
      skillIds: ["organisation", "assaisonnement"],
      description: "Une recette courte pour travailler chaleur douce, texture et assaisonnement.",
      ingredients: ["3 œufs", "10 g de beurre", "Sel", "Poivre", "Ciboulette ou persil"],
      tools: ["Bol", "Fourchette", "Poêle antiadhésive", "Spatule"],
      steps: [
        { title: "Préparer les œufs", instruction: "Casse les œufs dans un bol, sale légèrement, poivre, puis bats juste assez pour homogénéiser.", why: "Trop battre incorpore beaucoup d'air et change la texture. Ici on cherche une omelette souple.", mistake: "Ne sale pas excessivement : tu peux ajuster à la fin." },
        { title: "Chauffer doucement", instruction: "Fais fondre le beurre à feu moyen-doux sans le faire brunir.", why: "Une chaleur trop forte colore vite l'extérieur alors que l'intérieur reste irrégulier.", timer: 60 },
        { title: "Cuire en remuant", instruction: "Verse les œufs et remue doucement avec la spatule en ramenant les bords vers le centre.", why: "Ce mouvement crée une coagulation régulière et une texture baveuse.", timer: 120 },
        { title: "Plier et finir", instruction: "Quand l'omelette est encore brillante, plie-la, ajoute les herbes et sers immédiatement.", why: "La chaleur résiduelle termine la cuisson dans l'assiette." }
      ]
    },
    {
      id: "r-pates-tomate",
      title: "Pâtes tomate, ail et basilic",
      category: "quotidien",
      level: 1,
      duration: 25,
      cost: "low",
      season: ["été", "toute saison"],
      cover: "alt4",
      skillIds: ["organisation", "assaisonnement", "reduire"],
      description: "Un plat simple pour apprendre à réduire une sauce et utiliser l'eau de cuisson.",
      ingredients: ["180 g de pâtes", "250 g de tomates concassées", "1 gousse d'ail", "Huile d'olive", "Basilic", "Sel", "Parmesan optionnel"],
      tools: ["Casserole", "Poêle", "Louche", "Passoire"],
      steps: [
        { title: "Lancer les pâtes", instruction: "Porte une grande casserole d'eau salée à ébullition et cuis les pâtes 1 minute de moins que le temps indiqué.", why: "La fin de cuisson dans la sauce permet aux pâtes d'absorber du goût.", timer: 480 },
        { title: "Infuser l'ail", instruction: "Dans une poêle, chauffe l'huile puis fais revenir l'ail émincé sans coloration forte.", why: "L'ail brûlé devient amer. Une chaleur modérée suffit à parfumer l'huile.", mistake: "Si l'ail brunit trop vite, baisse immédiatement le feu." },
        { title: "Réduire la tomate", instruction: "Ajoute les tomates, sale légèrement et laisse réduire jusqu'à texture nappante.", why: "Réduire évapore l'eau et concentre les saveurs.", timer: 600 },
        { title: "Lier avec l'eau de cuisson", instruction: "Ajoute les pâtes dans la sauce avec une petite louche d'eau de cuisson et mélange vivement.", why: "L'amidon de l'eau aide à lier la sauce aux pâtes." }
      ]
    },
    {
      id: "r-poulet-deglace",
      title: "Poulet poêlé, sauce au citron",
      category: "technique",
      level: 2,
      duration: 30,
      cost: "medium",
      season: ["toute saison"],
      cover: "",
      skillIds: ["saisir", "deglacer", "reduire", "assaisonnement"],
      description: "La recette pratique pour apprendre saisie, sucs, déglaçage et réduction.",
      ingredients: ["2 filets de poulet", "1 échalote", "10 cl de bouillon", "1/2 citron", "20 g de beurre", "Sel", "Poivre", "Huile neutre"],
      tools: ["Poêle", "Pince", "Couteau", "Planche"],
      steps: [
        { title: "Sécher et assaisonner", instruction: "Sèche le poulet avec du papier, sale et poivre les deux faces.", why: "Une surface sèche colore mieux. Le sel en amont assaisonne plus régulièrement." },
        { title: "Saisir", instruction: "Chauffe la poêle, ajoute un filet d'huile, puis saisis le poulet sans le bouger au début.", why: "Le contact stable avec la poêle crée la coloration et les sucs.", timer: 240, mistake: "Ne surcharge pas la poêle, sinon la viande rend de l'eau et colore mal." },
        { title: "Retourner et terminer", instruction: "Retourne le poulet et poursuis la cuisson jusqu'à ce qu'il soit cuit à cœur. Réserve-le.", why: "Réserver évite de surcuire pendant la préparation de la sauce.", timer: 240 },
        { title: "Déglacer", instruction: "Ajoute l'échalote, puis verse le bouillon et gratte les sucs au fond de la poêle.", why: "Les sucs dissous deviennent la base aromatique de la sauce." },
        { title: "Réduire et monter", instruction: "Laisse réduire de moitié, ajoute le citron, coupe le feu et incorpore le beurre.", why: "La réduction concentre. Le beurre arrondit et donne de la brillance." }
      ]
    },
    {
      id: "r-ratatouille",
      title: "Ratatouille de saison",
      category: "classique",
      level: 2,
      duration: 55,
      cost: "low",
      season: ["été"],
      cover: "alt1",
      skillIds: ["couteau", "mijoter", "assaisonnement"],
      description: "Un classique pour travailler découpe, cuisson séparée et équilibre végétal.",
      ingredients: ["1 aubergine", "2 courgettes", "1 poivron", "1 oignon", "2 tomates", "Ail", "Thym", "Huile d'olive", "Sel"],
      tools: ["Couteau", "Planche", "Grande sauteuse"],
      steps: [
        { title: "Découper régulièrement", instruction: "Coupe tous les légumes en morceaux de taille proche.", why: "Une taille régulière permet une cuisson plus homogène." },
        { title: "Cuire les légumes séparément", instruction: "Fais revenir aubergine, courgette et poivron séparément avec un peu d'huile.", why: "Chaque légume garde mieux sa texture et son goût." },
        { title: "Construire la base", instruction: "Fais revenir oignon et ail, puis ajoute les tomates et le thym.", why: "Cette base apporte humidité, acidité et parfum." },
        { title: "Mijoter", instruction: "Réunis tous les légumes et laisse mijoter doucement.", why: "Le mijotage fusionne les goûts sans transformer tous les légumes en purée.", timer: 1500 }
      ]
    },
    {
      id: "r-curry-legumes",
      title: "Curry de légumes et pois chiches",
      category: "vege",
      level: 2,
      duration: 35,
      cost: "low",
      season: ["automne", "hiver", "toute saison"],
      cover: "alt3",
      skillIds: ["assaisonnement", "mijoter"],
      description: "Une recette moderne pour comprendre épices, gras et équilibre final.",
      ingredients: ["1 oignon", "2 carottes", "1 boîte de pois chiches", "20 cl lait de coco", "Curry", "Gingembre", "Citron vert", "Sel"],
      tools: ["Casserole", "Couteau", "Planche"],
      steps: [
        { title: "Faire suer l'oignon", instruction: "Fais revenir l'oignon dans un peu d'huile jusqu'à ce qu'il devienne translucide.", why: "Cette étape apporte une base douce et réduit l'agressivité de l'oignon." },
        { title: "Torréfier les épices", instruction: "Ajoute curry et gingembre pendant 30 secondes en remuant.", why: "Le gras chauffe les épices et libère mieux leurs arômes.", timer: 30, mistake: "Ne brûle pas les épices : elles deviennent amères." },
        { title: "Mijoter", instruction: "Ajoute légumes, pois chiches et lait de coco. Laisse mijoter jusqu'à tendreté.", why: "Le mijotage permet aux épices d'imprégner les ingrédients.", timer: 1200 },
        { title: "Équilibrer", instruction: "Corrige avec sel et citron vert avant de servir.", why: "L'acidité du citron réveille le gras du lait de coco." }
      ]
    },
    {
      id: "r-riz-saute",
      title: "Riz sauté aux légumes",
      category: "monde",
      level: 2,
      duration: 25,
      cost: "low",
      season: ["toute saison"],
      cover: "alt2",
      skillIds: ["saisir", "organisation", "assaisonnement"],
      description: "Une recette rapide pour travailler feu vif, préparation en amont et assaisonnement final.",
      ingredients: ["250 g riz cuit froid", "2 œufs", "Légumes en petits dés", "Sauce soja", "Huile", "Ciboule"],
      tools: ["Wok ou grande poêle", "Spatule", "Bol"],
      steps: [
        { title: "Tout préparer", instruction: "Coupe les légumes, bats les œufs et prépare la sauce avant d'allumer le feu.", why: "Au feu vif, les étapes s'enchaînent vite : la mise en place est indispensable." },
        { title: "Cuire les œufs", instruction: "Verse les œufs dans la poêle chaude, brouille rapidement puis réserve.", why: "Réserver évite de les dessécher pendant la cuisson du reste." },
        { title: "Saisir les légumes", instruction: "Fais sauter les légumes à feu vif en remuant.", why: "Le feu vif garde du croquant et développe une légère coloration.", timer: 180 },
        { title: "Ajouter le riz", instruction: "Ajoute le riz froid et mélange pour séparer les grains.", why: "Le riz froid est plus sec : il saute mieux et colle moins." },
        { title: "Assaisonner", instruction: "Remets les œufs, ajoute sauce soja et ciboule, puis goûte.", why: "La sauce soja apporte sel et umami. Il faut goûter avant d'en ajouter davantage." }
      ]
    },
    {
      id: "r-vinaigrette",
      title: "Vinaigrette émulsionnée",
      category: "technique",
      level: 2,
      duration: 8,
      cost: "low",
      season: ["toute saison"],
      cover: "alt1",
      skillIds: ["emulsion", "assaisonnement"],
      description: "La mini-recette parfaite pour comprendre acide, gras, sel et émulsion.",
      ingredients: ["1 c. à soupe vinaigre", "3 c. à soupe huile", "1 c. à café moutarde", "Sel", "Poivre"],
      tools: ["Bol", "Fouet"],
      steps: [
        { title: "Créer la base", instruction: "Mélange moutarde, vinaigre, sel et poivre.", why: "La moutarde aide à stabiliser l'émulsion et le sel se dissout mieux dans la phase aqueuse." },
        { title: "Ajouter l'huile progressivement", instruction: "Verse l'huile en filet tout en fouettant.", why: "L'ajout progressif disperse mieux le gras dans le liquide." },
        { title: "Goûter et corriger", instruction: "Ajoute huile si c'est trop acide, vinaigre si c'est trop lourd, sel si c'est plat.", why: "La correction se fait par équilibre, pas par automatisme." }
      ]
    },
    {
      id: "r-tarte-pommes",
      title: "Tarte fine aux pommes",
      category: "dessert",
      level: 2,
      duration: 40,
      cost: "low",
      season: ["automne", "hiver"],
      cover: "alt3",
      skillIds: ["couteau", "patisserie", "dressage"],
      description: "Un dessert simple pour travailler régularité, cuisson et finition.",
      ingredients: ["1 pâte feuilletée", "3 pommes", "20 g beurre", "Sucre", "Cannelle optionnelle"],
      tools: ["Couteau", "Plaque", "Papier cuisson", "Pinceau"],
      steps: [
        { title: "Émincer les pommes", instruction: "Coupe les pommes en tranches fines et régulières.", why: "La régularité garantit une cuisson uniforme et un beau dressage." },
        { title: "Disposer", instruction: "Dispose les pommes en rosace ou en lignes sur la pâte.", why: "Le dressage influence aussi la cuisson : les couches trop épaisses restent humides." },
        { title: "Sucrer et beurrer", instruction: "Saupoudre légèrement de sucre et ajoute quelques noisettes de beurre.", why: "Le beurre favorise la coloration et le sucre caramélise." },
        { title: "Cuire", instruction: "Enfourne jusqu'à pâte dorée et pommes fondantes.", why: "La pâte doit être bien cuite dessous, pas seulement colorée dessus.", timer: 1500 }
      ]
    }
  ],
  badges: [
    { id: "first-lesson", name: "Première leçon", description: "Tu as terminé ta première leçon." },
    { id: "first-recipe", name: "Premier service", description: "Tu as réalisé ta première recette guidée." },
    { id: "three-recipes", name: "Cuisine régulière", description: "Tu as réalisé trois recettes." },
    { id: "sauce-base", name: "Base de sauce", description: "Tu as pratiqué déglaçage ou réduction." },
    { id: "week-streak", name: "Rythme installé", description: "Tu as atteint une série de 7 jours." }
  ]
};

// V2 content layer: richer learning path, checkpoints and additional recipes.
(() => {
  const DATA = window.CUISINE_DATA;
  DATA.appVersion = "0.4.0";

  function pushUnique(collection, item) {
    if (!collection.some((existing) => existing.id === item.id)) collection.push(item);
  }

  [
    { id: "oeufs", name: "Cuisson des œufs", category: "Cuisson", level: 1 },
    { id: "legumes", name: "Cuisson des légumes", category: "Cuisson", level: 2 },
    { id: "epices", name: "Épices", category: "Saveurs", level: 2 },
    { id: "four", name: "Cuisson au four", category: "Cuisson", level: 2 },
    { id: "liaison", name: "Liaison", category: "Sauces", level: 3 },
    { id: "pate", name: "Pâtes et appareils", category: "Pâtisserie", level: 2 }
  ].forEach((skill) => pushUnique(DATA.skills, skill));

  [
    {
      id: "l-oeufs-1",
      module: "Bases",
      title: "Cuire les œufs : coagulation et douceur",
      level: 1,
      xp: 35,
      prerequisiteIds: ["l-assaisonnement-1"],
      skillIds: ["oeufs", "assaisonnement"],
      summary: "Comprendre pourquoi les œufs deviennent secs quand la chaleur est trop forte.",
      objective: "Obtenir une texture tendre en contrôlant la chaleur et le temps.",
      content: [
        "L'œuf coagule avec la chaleur : plus la chaleur est forte et longue, plus la texture devient ferme puis sèche.",
        "Pour une omelette ou des œufs brouillés, la priorité est de retirer la préparation avant qu'elle semble totalement cuite.",
        "La chaleur résiduelle continue la cuisson pendant quelques secondes. C'est souvent là que tout se joue."
      ],
      practice: "Application recommandée : omelette baveuse ou œufs brouillés doux.",
      quiz: [
        {
          question: "Pourquoi une omelette devient-elle sèche ?",
          options: ["Parce qu'il manque toujours du sel", "Parce que la chaleur a trop coagulé les protéines", "Parce qu'il faut ajouter de l'eau"],
          answer: 1,
          explanation: "La surcuisson resserre les protéines et chasse l'humidité."
        },
        {
          question: "Quel réflexe aide à garder des œufs tendres ?",
          options: ["Cuire plus fort", "Retirer légèrement avant cuisson complète", "Ne jamais remuer"],
          answer: 1,
          explanation: "La chaleur résiduelle termine la cuisson hors du feu."
        }
      ]
    },
    {
      id: "l-legumes-1",
      module: "Cuissons",
      title: "Légumes : croquant, fondant, couleur",
      level: 2,
      xp: 40,
      prerequisiteIds: ["l-saisir-1"],
      skillIds: ["legumes", "couteau", "assaisonnement"],
      summary: "Adapter découpe, feu et timing pour éviter les légumes mous et fades.",
      objective: "Savoir choisir entre saisir, rôtir, vapeur et mijoter selon le résultat voulu.",
      content: [
        "Un légume n'a pas une seule bonne cuisson. Il peut être croquant, fondant, rôti, confit ou juste blanchi.",
        "La taille de découpe détermine la vitesse de cuisson : plus c'est petit, plus ça cuit vite.",
        "L'assaisonnement final compte autant que la cuisson : sel, herbes, acide et gras réveillent le légume."
      ],
      practice: "Application recommandée : légumes rôtis ou ratatouille.",
      quiz: [
        {
          question: "Pourquoi des morceaux réguliers sont-ils importants ?",
          options: ["Pour cuire de façon homogène", "Pour réduire les saveurs", "Pour éviter d'utiliser du sel"],
          answer: 0,
          explanation: "Des tailles proches cuisent à vitesse proche."
        },
        {
          question: "Un légume rôti trop pâle indique souvent...",
          options: ["Un four trop doux ou trop de vapeur", "Trop d'acidité", "Trop de découpe régulière"],
          answer: 0,
          explanation: "La coloration demande chaleur, espace et surface relativement sèche."
        }
      ]
    },
    {
      id: "l-epices-1",
      module: "Saveurs",
      title: "Épices : torréfier sans brûler",
      level: 2,
      xp: 40,
      prerequisiteIds: ["l-assaisonnement-1"],
      skillIds: ["epices", "assaisonnement"],
      summary: "Libérer les arômes des épices dans le gras sans créer d'amertume.",
      objective: "Savoir quand ajouter les épices et comment corriger un plat trop agressif.",
      content: [
        "Beaucoup d'arômes d'épices se diffusent mieux dans le gras que dans l'eau.",
        "Une courte chauffe dans l'huile ou le beurre peut amplifier les arômes, mais les épices brûlées deviennent amères.",
        "Un plat trop épicé se corrige souvent avec gras, douceur, dilution ou acidité selon le problème."
      ],
      practice: "Application recommandée : curry de légumes et pois chiches.",
      quiz: [
        {
          question: "Pourquoi chauffer brièvement les épices dans un corps gras ?",
          options: ["Pour les rendre invisibles", "Pour mieux libérer certains arômes", "Pour supprimer le sel"],
          answer: 1,
          explanation: "Le gras transporte bien de nombreux composés aromatiques."
        },
        {
          question: "Quel est le risque d'une chauffe trop forte des épices ?",
          options: ["Amertume", "Plus de sucre", "Cuisson plus lente"],
          answer: 0,
          explanation: "Les épices brûlées donnent un goût âcre et amer."
        }
      ]
    },
    {
      id: "l-four-1",
      module: "Cuissons",
      title: "Four : chaleur sèche et coloration",
      level: 2,
      xp: 40,
      prerequisiteIds: ["l-legumes-1"],
      skillIds: ["four", "legumes"],
      summary: "Comprendre espace, chaleur et humidité pour mieux rôtir.",
      objective: "Obtenir une coloration sans dessécher ou détremper.",
      content: [
        "Rôtir, c'est exposer l'aliment à une chaleur sèche. Trop d'humidité ou trop d'aliments serrés empêchent la coloration.",
        "Une plaque trop remplie fait cuire à la vapeur au lieu de rôtir.",
        "La fin de cuisson sert souvent à ajuster : prolonger pour colorer, couvrir pour protéger, ou sortir avant dessèchement."
      ],
      practice: "Application recommandée : légumes rôtis ou tarte fine aux pommes.",
      quiz: [
        {
          question: "Pourquoi éviter de surcharger une plaque ?",
          options: ["Pour favoriser la coloration", "Pour réduire la température du sel", "Pour éviter de laver la plaque"],
          answer: 0,
          explanation: "L'espace aide l'eau à s'évaporer et la surface à colorer."
        }
      ]
    },
    {
      id: "l-liaison-1",
      module: "Sauces",
      title: "Lier une sauce : réduire, émulsionner, épaissir",
      level: 3,
      xp: 45,
      prerequisiteIds: ["l-deglacer-1", "l-emulsion-1"],
      skillIds: ["liaison", "reduire", "emulsion"],
      summary: "Comprendre les trois grandes logiques de liaison d'une sauce.",
      objective: "Choisir la bonne méthode pour passer d'un jus liquide à une sauce nappante.",
      content: [
        "Réduire concentre par évaporation. Émulsionner disperse un gras dans une phase aqueuse. Épaissir ajoute un liant comme farine, amidon ou œuf.",
        "Une sauce réussie doit napper sans devenir pâteuse. La texture doit servir le goût, pas le masquer.",
        "La correction dépend du défaut : trop liquide, on réduit ; trop grasse, on ajoute une phase aqueuse ; trop plate, on ajuste sel/acide."
      ],
      practice: "Application recommandée : béchamel ou poulet poêlé sauce citron.",
      quiz: [
        {
          question: "Que fait principalement une réduction ?",
          options: ["Elle évapore l'eau et concentre", "Elle ajoute du croustillant", "Elle refroidit la sauce"],
          answer: 0,
          explanation: "Réduire enlève de l'eau et concentre goût et texture."
        },
        {
          question: "Une sauce trop liquide peut souvent être corrigée en...",
          options: ["Réduisant davantage", "Ajoutant des glaçons", "Coupant tous les légumes"],
          answer: 0,
          explanation: "Réduire est la correction la plus directe quand la sauce manque de concentration."
        }
      ]
    },
    {
      id: "l-pate-1",
      module: "Pâtisserie",
      title: "Pâtisserie : précision et texture",
      level: 2,
      xp: 40,
      prerequisiteIds: ["l-couteau-1"],
      skillIds: ["patisserie", "pate"],
      summary: "Comprendre pourquoi la pâtisserie tolère moins l'approximation.",
      objective: "Travailler pesée, température et texture sans automatisme.",
      content: [
        "La pâtisserie dépend beaucoup des proportions : farine, sucre, gras, œufs et liquide structurent la texture.",
        "La température compte : beurre froid, beurre pommade ou beurre fondu ne donnent pas le même résultat.",
        "La précision ne rend pas la cuisine rigide ; elle rend le résultat reproductible."
      ],
      practice: "Application recommandée : tarte fine aux pommes ou cookies.",
      quiz: [
        {
          question: "Pourquoi peser plutôt qu'approximer en pâtisserie ?",
          options: ["Pour rendre le résultat reproductible", "Pour cuire plus vite", "Pour supprimer le sucre"],
          answer: 0,
          explanation: "Les proportions influencent directement texture et tenue."
        }
      ]
    }
  ].forEach((lesson) => pushUnique(DATA.lessons, lesson));

  [
    {
      id: "r-oeufs-brouilles",
      title: "Œufs brouillés doux",
      category: "quotidien",
      level: 1,
      duration: 12,
      cost: "low",
      season: ["toute saison"],
      cover: "alt3",
      skillIds: ["oeufs", "assaisonnement"],
      description: "Une recette courte pour apprendre la chaleur douce et la cuisson résiduelle.",
      objective: "Obtenir des œufs crémeux, non secs.",
      successSigns: ["Texture crémeuse", "Pas d'eau séparée", "Assaisonnement net mais pas agressif"],
      ingredients: ["3 œufs", "15 g beurre", "Sel", "Poivre", "Ciboulette optionnelle"],
      tools: ["Petite poêle", "Spatule souple", "Bol"],
      steps: [
        { title: "Battre et saler", instruction: "Bats les œufs avec une pincée de sel.", why: "Le mélange homogène évite les zones blanches et jaunes séparées.", checkpoint: "Le mélange doit être uniforme mais pas mousseux." },
        { title: "Cuire doucement", instruction: "Fais fondre le beurre à feu doux puis ajoute les œufs. Remue sans cesse avec la spatule.", why: "La chaleur douce donne une coagulation progressive et une texture plus fine.", timer: 240, checkpoint: "Les œufs épaississent lentement, sans colorer.", mistake: "Si des morceaux secs apparaissent vite, le feu est trop fort.", correction: "Retire la poêle du feu quelques secondes, puis reprends plus doucement." },
        { title: "Arrêter avant la fin", instruction: "Coupe le feu quand les œufs semblent encore légèrement trop crémeux.", why: "La chaleur résiduelle termine la cuisson.", checkpoint: "Ils doivent rester brillants." }
      ]
    },
    {
      id: "r-legumes-rotis",
      title: "Légumes rôtis bien colorés",
      category: "quotidien",
      level: 2,
      duration: 40,
      cost: "low",
      season: ["automne", "hiver", "toute saison"],
      cover: "alt1",
      skillIds: ["legumes", "four", "assaisonnement"],
      description: "Comprendre espace, humidité et chaleur pour éviter les légumes mous.",
      objective: "Obtenir des bords colorés et un intérieur fondant.",
      successSigns: ["Bords dorés", "Légumes fondants", "Assaisonnement équilibré"],
      ingredients: ["Carottes", "Patate douce", "Oignon rouge", "Huile d'olive", "Sel", "Poivre", "Citron ou vinaigre"],
      tools: ["Plaque", "Four", "Couteau", "Grand bol"],
      steps: [
        { title: "Découper régulier", instruction: "Coupe les légumes en morceaux proches en taille.", why: "La régularité donne une cuisson homogène.", checkpoint: "Les morceaux doivent avoir une épaisseur comparable." },
        { title: "Assaisonner et espacer", instruction: "Mélange avec huile, sel et poivre puis étale sans superposer.", why: "L'espace permet à l'eau de s'évaporer et favorise la coloration.", mistake: "Une plaque trop pleine donne une cuisson vapeur.", correction: "Utilise deux plaques si nécessaire." },
        { title: "Rôtir", instruction: "Enfourne à four chaud jusqu'à coloration, en retournant à mi-cuisson.", why: "La chaleur sèche concentre les goûts.", timer: 1800, checkpoint: "Les bords doivent être dorés, pas seulement mous." },
        { title: "Réveiller", instruction: "Ajoute quelques gouttes de citron ou vinaigre à la sortie.", why: "L'acidité équilibre le gras et le sucre naturel des légumes." }
      ]
    },
    {
      id: "r-bechamel",
      title: "Béchamel de base",
      category: "technique",
      level: 2,
      duration: 18,
      cost: "low",
      season: ["toute saison"],
      cover: "alt2",
      skillIds: ["liaison", "patisserie", "assaisonnement"],
      description: "Une sauce mère pour comprendre roux, liquide et épaississement.",
      objective: "Obtenir une sauce lisse, sans grumeaux, nappante.",
      successSigns: ["Texture lisse", "Goût non farineux", "Sauce nappante"],
      ingredients: ["25 g beurre", "25 g farine", "30 cl lait", "Sel", "Poivre", "Muscade optionnelle"],
      tools: ["Casserole", "Fouet"],
      steps: [
        { title: "Faire le roux", instruction: "Fais fondre le beurre, ajoute la farine et cuis 1 à 2 minutes en fouettant.", why: "Cuire la farine enlève le goût cru et prépare l'épaississement.", timer: 90, checkpoint: "Le roux doit rester blond, pas brun." },
        { title: "Ajouter le lait", instruction: "Verse le lait progressivement en fouettant constamment.", why: "L'ajout progressif limite les grumeaux.", mistake: "Tout verser d'un coup peut créer des paquets.", correction: "Si grumeaux, fouette vivement ou filtre." },
        { title: "Épaissir", instruction: "Poursuis à feu moyen jusqu'à texture nappante.", why: "L'amidon gonfle avec la chaleur et épaissit la sauce.", timer: 360, checkpoint: "La sauce nappe la cuillère." },
        { title: "Assaisonner", instruction: "Sale, poivre et ajoute muscade si souhaité.", why: "Une béchamel non assaisonnée paraît lourde et fade." }
      ]
    },
    {
      id: "r-shakshuka",
      title: "Shakshuka simple",
      category: "monde",
      level: 2,
      duration: 30,
      cost: "low",
      season: ["toute saison"],
      cover: "alt4",
      skillIds: ["epices", "oeufs", "reduire", "assaisonnement"],
      description: "Une recette moderne pour travailler épices, réduction tomate et cuisson des œufs.",
      objective: "Construire une base tomate parfumée puis cuire les œufs sans les durcir.",
      successSigns: ["Sauce tomate épaisse", "Œufs encore tendres", "Épices présentes sans amertume"],
      ingredients: ["1 oignon", "1 poivron", "1 boîte tomates", "2 à 4 œufs", "Cumin", "Paprika", "Huile", "Sel"],
      tools: ["Poêle large", "Couvercle", "Couteau"],
      steps: [
        { title: "Faire suer", instruction: "Fais revenir oignon et poivron dans l'huile jusqu'à tendreté.", why: "La base douce équilibre l'acidité de la tomate.", timer: 480 },
        { title: "Torréfier les épices", instruction: "Ajoute cumin et paprika 30 secondes.", why: "La chaleur dans le gras réveille les arômes.", timer: 30, mistake: "Si ça accroche et noircit, les épices brûlent.", correction: "Ajoute rapidement la tomate pour stopper la chauffe." },
        { title: "Réduire la sauce", instruction: "Ajoute les tomates et laisse épaissir.", why: "Une sauce trop liquide cuira mal les œufs.", timer: 720, checkpoint: "La spatule doit laisser une trace au fond de la poêle." },
        { title: "Cuire les œufs", instruction: "Creuse des nids, casse les œufs, couvre et cuis doucement.", why: "La vapeur douce cuit le blanc tout en gardant le jaune tendre.", timer: 360, checkpoint: "Blanc pris, jaune encore souple." }
      ]
    }
  ].forEach((recipe) => pushUnique(DATA.recipes, recipe));

  const recipeEnhancements = {
    "r-omelette": {
      objective: "Maîtriser la cuisson courte des œufs et l'arrêt avant surcuisson.",
      successSigns: ["Omelette souple", "Surface non sèche", "Assaisonnement discret"],
      checkpoints: ["Les œufs restent brillants.", "La poêle ne colore pas fortement.", "L'omelette se replie sans casser."]
    },
    "r-poulet-deglace": {
      objective: "Apprendre à créer des sucs, déglacer et réduire une sauce courte.",
      successSigns: ["Poulet doré", "Sauce nappante", "Acidité équilibrée"],
      checkpoints: ["Surface du poulet sèche avant cuisson.", "Coloration dorée avant retournement.", "Jus clair et viande ferme mais pas sèche.", "Les sucs se décollent dans le liquide.", "La sauce nappe légèrement la cuillère."]
    },
    "r-vinaigrette": {
      objective: "Comprendre l'équilibre gras/acide/sel et la logique d'émulsion.",
      successSigns: ["Sauce homogène", "Acidité nette mais pas agressive", "Sel perceptible sans excès"],
      checkpoints: ["Sel dissous dans le vinaigre.", "Huile intégrée progressivement.", "Goût corrigé après dégustation."]
    },
    "r-ratatouille": {
      objective: "Travailler découpe régulière, cuisson séparée et mijotage contrôlé.",
      successSigns: ["Légumes identifiables", "Texture fondante", "Goût concentré"],
      checkpoints: ["Morceaux réguliers.", "Légumes colorés séparément.", "Base tomate parfumée.", "Mijotage doux, pas bouillonnement violent."]
    },
    "r-curry-legumes": {
      objective: "Libérer les arômes des épices et équilibrer gras, sel et acidité.",
      successSigns: ["Épices aromatiques", "Sauce onctueuse", "Citron perceptible en finition"],
      checkpoints: ["Oignon translucide.", "Épices odorantes mais non brûlées.", "Légumes tendres.", "Goût réveillé par l'acide."]
    },
    "r-tarte-pommes": {
      objective: "Travailler découpe régulière, dressage et cuisson croustillante.",
      successSigns: ["Pâte bien cuite", "Pommes fondantes", "Disposition régulière"],
      checkpoints: ["Tranches fines.", "Pas de couches trop épaisses.", "Sucre léger.", "Dessous de pâte cuit."]
    }
  };

  Object.entries(recipeEnhancements).forEach(([id, enhancement]) => {
    const recipe = DATA.recipes.find((item) => item.id === id);
    if (!recipe) return;
    recipe.objective = recipe.objective || enhancement.objective;
    recipe.successSigns = recipe.successSigns || enhancement.successSigns;
    recipe.steps.forEach((step, index) => {
      if (!step.checkpoint && enhancement.checkpoints[index]) step.checkpoint = enhancement.checkpoints[index];
    });
  });

  [
    { id: "ten-lessons", name: "Carnet d'apprenti", description: "Tu as validé dix leçons." },
    { id: "ten-recipes", name: "Cuisine installée", description: "Tu as documenté dix recettes." },
    { id: "five-star", name: "Service réussi", description: "Tu as noté une recette 5/5." }
  ].forEach((badge) => pushUnique(DATA.badges, badge));
})();

// V3 content layer: more complete coach path and practical recipes.
(() => {
  const DATA = window.CUISINE_DATA;
  DATA.appVersion = "0.4.0";

  function pushUnique(collection, item) {
    if (!collection.some((existing) => existing.id === item.id)) collection.push(item);
  }

  [
    { id: "viande", name: "Cuisson des viandes", category: "Cuisson", level: 3 },
    { id: "poisson", name: "Cuisson du poisson", category: "Cuisson", level: 3 },
    { id: "riz", name: "Cuisson du riz", category: "Bases", level: 2 },
    { id: "bouillon", name: "Bouillons et fonds", category: "Sauces", level: 4 },
    { id: "caramel", name: "Caramel", category: "Dessert", level: 3 },
    { id: "menu", name: "Construction de menu", category: "Autonomie", level: 4 }
  ].forEach((skill) => pushUnique(DATA.skills, skill));

  [
    {
      id: "l-viande-1",
      module: "Cuissons",
      title: "Viande : coloration, appoint et repos",
      level: 3,
      xp: 50,
      prerequisiteIds: ["l-saisir-1"],
      skillIds: ["viande", "saisir", "assaisonnement"],
      summary: "Comprendre pourquoi une viande se sèche et comment le repos stabilise les jus.",
      objective: "Obtenir une viande colorée, cuite à cœur sans être desséchée.",
      content: [
        "La cuisson d'une viande se joue en trois temps : coloration, montée en température, repos.",
        "Le repos permet aux jus de se redistribuer. Couper trop vite augmente la perte de jus.",
        "Une belle coloration ne garantit pas une cuisson intérieure parfaite : il faut adapter l'épaisseur, le feu et le temps."
      ],
      practice: "Application recommandée : steak beurre maître d'hôtel ou poulet poêlé.",
      quiz: [
        {
          question: "Pourquoi laisser reposer une viande après cuisson ?",
          options: ["Pour la refroidir complètement", "Pour stabiliser les jus", "Pour supprimer le sel"],
          answer: 1,
          explanation: "Le repos réduit la perte de jus à la découpe."
        },
        {
          question: "Une viande grise en surface indique souvent...",
          options: ["Trop d'humidité ou une poêle trop froide", "Trop de repos", "Trop de citron"],
          answer: 0,
          explanation: "L'eau empêche la coloration tant qu'elle n'est pas évaporée."
        }
      ]
    },
    {
      id: "l-poisson-1",
      module: "Cuissons",
      title: "Poisson : cuisson courte et délicate",
      level: 3,
      xp: 50,
      prerequisiteIds: ["l-saisir-1"],
      skillIds: ["poisson", "saisir", "assaisonnement"],
      summary: "Cuire un poisson sans le dessécher ni le casser.",
      objective: "Savoir saisir côté peau ou poêler doucement selon le morceau.",
      content: [
        "Le poisson contient peu de tissu conjonctif : il cuit vite et devient sec rapidement.",
        "Pour un filet avec peau, la peau doit être bien sèche et rester longtemps au contact de la poêle.",
        "L'acidité se met souvent en finition, pas trop tôt, pour garder de la fraîcheur."
      ],
      practice: "Application recommandée : poisson poêlé citron-herbes.",
      quiz: [
        {
          question: "Pourquoi le poisson est-il facile à surcuire ?",
          options: ["Il cuit vite et se dessèche vite", "Il contient toujours trop de sucre", "Il ne conduit pas la chaleur"],
          answer: 0,
          explanation: "Sa chair fragile demande une cuisson courte et contrôlée."
        }
      ]
    },
    {
      id: "l-riz-1",
      module: "Bases",
      title: "Riz : absorption, vapeur et repos",
      level: 2,
      xp: 40,
      prerequisiteIds: ["l-organisation-1"],
      skillIds: ["riz", "organisation"],
      summary: "Sortir du riz trop humide ou collant en comprenant l'eau et le repos.",
      objective: "Obtenir un riz régulier, utilisable tel quel ou en riz sauté.",
      content: [
        "Le riz absorbe l'eau puis termine sa texture à la vapeur. Le repos couvercle fermé compte autant que l'ébullition.",
        "Rincer enlève une partie de l'amidon de surface, utile pour des grains plus séparés.",
        "Pour le riz sauté, un riz froid et sec fonctionne mieux qu'un riz fraîchement cuit."
      ],
      practice: "Application recommandée : riz pilaf ou riz sauté.",
      quiz: [
        {
          question: "Pourquoi laisser reposer le riz après cuisson ?",
          options: ["Pour terminer la texture à la vapeur", "Pour le rendre cru", "Pour enlever tous les arômes"],
          answer: 0,
          explanation: "La vapeur résiduelle homogénéise la cuisson."
        }
      ]
    },
    {
      id: "l-bouillon-1",
      module: "Sauces",
      title: "Bouillons et fonds : construire la profondeur",
      level: 4,
      xp: 60,
      prerequisiteIds: ["l-deglacer-1", "l-liaison-1"],
      skillIds: ["bouillon", "reduire", "mijoter"],
      summary: "Comprendre extraction, concentration et usage d'un bouillon.",
      objective: "Savoir utiliser un bouillon pour renforcer sauces, risottos et mijotés.",
      content: [
        "Un bouillon extrait des goûts dans l'eau par temps et chaleur douce. Un fond est souvent plus concentré et plus structuré.",
        "Réduire un bouillon augmente la concentration, mais augmente aussi le sel si le bouillon est déjà salé.",
        "Dans une sauce courte, un bon liquide de déglaçage fait souvent la différence entre jus plat et vraie sauce."
      ],
      practice: "Application recommandée : risotto ou poulet poêlé sauce courte.",
      quiz: [
        {
          question: "Que se passe-t-il quand on réduit un bouillon salé ?",
          options: ["Le sel se concentre", "Le sel disparaît", "Le bouillon devient froid"],
          answer: 0,
          explanation: "L'eau s'évapore, mais le sel reste."
        }
      ]
    },
    {
      id: "l-menu-1",
      module: "Autonomie",
      title: "Composer une assiette équilibrée",
      level: 4,
      xp: 55,
      prerequisiteIds: ["l-assaisonnement-1", "l-legumes-1"],
      skillIds: ["menu", "improvisation", "assaisonnement"],
      summary: "Penser protéines, légumes, féculent, sauce, texture et finition.",
      objective: "Construire un plat cohérent sans suivre une recette mot à mot.",
      content: [
        "Une assiette fonctionne mieux quand elle combine base nourrissante, élément principal, sauce ou liant, fraîcheur et texture.",
        "Le contraste rend le plat plus intéressant : chaud/froid, croustillant/fondant, gras/acide, doux/piquant.",
        "L'autonomie vient d'une méthode : identifier ce qui manque, pas ajouter au hasard."
      ],
      practice: "Application recommandée : bowl complet de saison.",
      quiz: [
        {
          question: "Un plat très riche et lourd peut souvent être amélioré avec...",
          options: ["Une finition acide ou fraîche", "Plus de farine", "Moins de cuisson systématiquement"],
          answer: 0,
          explanation: "L'acide et la fraîcheur équilibrent le gras et réveillent le plat."
        }
      ]
    }
  ].forEach((lesson) => pushUnique(DATA.lessons, lesson));

  [
    {
      id: "r-steak-beurre-herbes",
      title: "Steak, beurre maître d'hôtel simple",
      category: "classique",
      level: 3,
      duration: 25,
      cost: "medium",
      season: ["toute saison"],
      cover: "alt2",
      skillIds: ["viande", "saisir", "assaisonnement"],
      description: "Travailler saisie, repos et beurre aromatique.",
      objective: "Obtenir une belle croûte et une viande juteuse.",
      successSigns: ["Surface bien colorée", "Jus limité à la découpe", "Beurre aromatique équilibré"],
      ingredients: ["1 steak épais", "20 g beurre", "Persil", "Citron", "Sel", "Poivre", "Huile"],
      tools: ["Poêle", "Pince", "Bol", "Couteau"],
      steps: [
        { title: "Tempérer et sécher", instruction: "Sors la viande quelques minutes, sèche-la très bien puis sale.", why: "Une surface sèche colore mieux et limite la vapeur.", checkpoint: "La surface ne doit pas briller d'humidité." },
        { title: "Saisir", instruction: "Poêle très chaude, huile, puis cuisson sans déplacer au début.", why: "Le contact stable crée la croûte.", timer: 180, checkpoint: "La face doit être franchement dorée avant retournement." },
        { title: "Retourner et finir", instruction: "Retourne, baisse légèrement et termine selon l'épaisseur.", why: "Le feu trop violent jusqu'au bout brûle l'extérieur avant l'intérieur.", timer: 150 },
        { title: "Repos", instruction: "Pose la viande sur assiette 5 minutes.", why: "Le repos stabilise les jus.", timer: 300 },
        { title: "Beurre herbes", instruction: "Mélange beurre mou, persil, citron, sel et poivre. Dépose sur la viande chaude.", why: "Le beurre apporte gras et arômes, le citron évite la lourdeur." }
      ]
    },
    {
      id: "r-poisson-citron-herbes",
      title: "Poisson poêlé citron-herbes",
      category: "quotidien",
      level: 3,
      duration: 20,
      cost: "medium",
      season: ["toute saison"],
      cover: "alt1",
      skillIds: ["poisson", "saisir", "assaisonnement"],
      description: "Une cuisson courte pour garder une chair nacrée et tendre.",
      objective: "Cuire un filet sans le casser ni le dessécher.",
      successSigns: ["Chair juste opaque", "Pas de dessèchement", "Finition fraîche"],
      ingredients: ["2 filets de poisson", "Farine optionnelle", "Citron", "Herbes", "Huile", "Sel", "Poivre"],
      tools: ["Poêle antiadhésive", "Spatule", "Papier absorbant"],
      steps: [
        { title: "Sécher", instruction: "Sèche le poisson et sale légèrement.", why: "L'humidité gêne la coloration et fragilise la surface.", checkpoint: "La surface doit être mate." },
        { title: "Poêler", instruction: "Poêle chaude mais non fumante, huile, puis cuisson côté présentation.", why: "Une chaleur contrôlée colore sans agresser.", timer: 180, mistake: "Le retourner trop tôt peut le casser.", correction: "Attends que la surface se raffermisse." },
        { title: "Finir doucement", instruction: "Retourne et termine brièvement.", why: "La chaleur résiduelle suffit souvent à finir la cuisson.", timer: 90 },
        { title: "Assaisonner en finition", instruction: "Ajoute citron, herbes et un filet d'huile.", why: "L'acide final apporte fraîcheur sans cuire la chair à l'avance." }
      ]
    },
    {
      id: "r-riz-pilaf",
      title: "Riz pilaf simple",
      category: "quotidien",
      level: 2,
      duration: 25,
      cost: "low",
      season: ["toute saison"],
      cover: "alt4",
      skillIds: ["riz", "organisation", "assaisonnement"],
      description: "Une méthode stable pour obtenir un riz parfumé et régulier.",
      objective: "Comprendre absorption, couvercle et repos.",
      successSigns: ["Grains cuits", "Pas d'eau au fond", "Texture non pâteuse"],
      ingredients: ["1 volume riz", "1,5 volume eau ou bouillon", "Oignon optionnel", "Huile", "Sel"],
      tools: ["Casserole avec couvercle", "Verre doseur"],
      steps: [
        { title: "Rincer", instruction: "Rince le riz jusqu'à eau moins trouble.", why: "Cela retire une partie de l'amidon de surface.", checkpoint: "L'eau n'a pas besoin d'être parfaitement claire." },
        { title: "Nacrer", instruction: "Fais revenir le riz avec un peu d'huile 1 minute.", why: "Le gras enrobe légèrement les grains et apporte du goût.", timer: 60 },
        { title: "Absorber", instruction: "Ajoute l'eau salée, couvre et cuis doucement sans ouvrir.", why: "Ouvrir trop souvent perturbe vapeur et température.", timer: 720 },
        { title: "Reposer", instruction: "Coupe le feu et laisse couvert 8 minutes.", why: "Le repos termine la texture à la vapeur.", timer: 480 }
      ]
    },
    {
      id: "r-risotto-champignons",
      title: "Risotto aux champignons",
      category: "technique",
      level: 4,
      duration: 40,
      cost: "medium",
      season: ["automne", "hiver"],
      cover: "alt3",
      skillIds: ["riz", "bouillon", "liaison", "assaisonnement"],
      description: "Travailler bouillon, amidon, liaison et finition.",
      objective: "Obtenir un riz crémeux mais encore légèrement ferme.",
      successSigns: ["Texture crémeuse", "Riz non pâteux", "Champignons bien marqués"],
      ingredients: ["Riz arborio", "Champignons", "Bouillon chaud", "Oignon", "Vin blanc optionnel", "Parmesan", "Beurre"],
      tools: ["Sauteuse", "Louche", "Casserole"],
      steps: [
        { title: "Marquer les champignons", instruction: "Poêle chaude, champignons espacés, coloration avant sel.", why: "Le sel trop tôt fait sortir l'eau et limite la coloration.", checkpoint: "Les champignons doivent être dorés, pas bouillis." },
        { title: "Nacrer le riz", instruction: "Fais revenir oignon puis riz jusqu'à légère transparence.", why: "Le nacrage prépare une cuisson régulière et apporte du goût.", timer: 120 },
        { title: "Mouiller progressivement", instruction: "Ajoute le bouillon chaud louche par louche en remuant souvent.", why: "L'amidon se libère et crée la liaison.", timer: 1080, checkpoint: "Le riz doit rester fluide, jamais sec longtemps." },
        { title: "Mantecare", instruction: "Hors feu, ajoute beurre et parmesan puis mélange vivement.", why: "La finition donne brillance, crémeux et rondeur." }
      ]
    },
    {
      id: "r-creme-caramel",
      title: "Crème caramel",
      category: "dessert",
      level: 3,
      duration: 60,
      cost: "low",
      season: ["toute saison"],
      cover: "alt2",
      skillIds: ["patisserie", "caramel", "oeufs"],
      description: "Une base de pâtisserie pour travailler caramel, appareil aux œufs et cuisson douce.",
      objective: "Obtenir une crème prise, lisse, sans grains ni œufs brouillés.",
      successSigns: ["Caramel ambré non brûlé", "Crème lisse", "Tremblement léger au centre"],
      ingredients: ["80 g sucre pour caramel", "50 cl lait", "3 œufs", "60 g sucre", "Vanille"],
      tools: ["Casserole", "Fouet", "Ramequins", "Plat bain-marie"],
      steps: [
        { title: "Faire le caramel", instruction: "Chauffe le sucre à sec jusqu'à couleur ambrée puis verse dans les ramequins.", why: "Le caramel continue de foncer hors du feu : il faut arrêter avant amertume.", checkpoint: "Couleur ambre, pas brun noir.", mistake: "Remuer trop fort cristallise parfois le sucre.", correction: "Incline doucement la casserole plutôt que fouetter." },
        { title: "Préparer l'appareil", instruction: "Fouette œufs et sucre sans trop mousser, ajoute le lait chaud progressivement.", why: "Verser trop vite du lait chaud peut coaguler les œufs." },
        { title: "Cuire au bain-marie", instruction: "Verse dans les ramequins et cuis au four au bain-marie.", why: "La chaleur douce évite une texture granuleuse.", timer: 2100, checkpoint: "La crème tremble légèrement au centre." },
        { title: "Refroidir", instruction: "Laisse refroidir puis mets au frais avant démoulage.", why: "Le froid stabilise la texture." }
      ]
    }
  ].forEach((recipe) => pushUnique(DATA.recipes, recipe));

  [
    { id: "protein-master", name: "Cuissons protéines", description: "Tu as commencé à travailler viande ou poisson." },
    { id: "offline-ready", name: "Cuisine hors-ligne", description: "La V4 peut être installée et mise en cache par le navigateur." }
  ].forEach((badge) => pushUnique(DATA.badges, badge));
})();



(() => {
  const DATA = window.CUISINE_DATA;
  DATA.appVersion = "0.4.0";
  function pushUnique(collection, item) {
    if (!collection.some((existing) => existing.id === item.id)) collection.push(item);
  }

  [
    { id: "legumineuses", name: "Légumineuses", category: "Végétal", level: 2 },
    { id: "finition", name: "Finition et contraste", category: "Finition", level: 3 }
  ].forEach((skill) => pushUnique(DATA.skills, skill));

  [
    {
      id: "l-vinaigrette-1",
      module: "Sauces",
      title: "Vinaigrette : une émulsion simple mais précise",
      level: 2,
      xp: 40,
      prerequisiteIds: ["l-assaisonnement-1"],
      skillIds: ["emulsion", "assaisonnement"],
      summary: "Construire une sauce froide équilibrée avec sel, acide, gras et moutarde.",
      objective: "Savoir ajuster une sauce trop acide, trop grasse ou trop fade.",
      content: [
        "Une vinaigrette réussie n'est pas seulement un mélange huile-vinaigre. C'est un équilibre entre sel, acidité, gras et parfois légère douceur.",
        "La moutarde aide à stabiliser l'émulsion, mais l'ajout progressif de l'huile reste important.",
        "Réflexe : dissous d'abord le sel dans le vinaigre, puis ajoute l'huile progressivement. Goûte sur une feuille de salade, pas seulement à la cuillère."
      ],
      practice: "Application recommandée : salade vinaigrette émulsionnée.",
      quiz: [
        { question: "Pourquoi dissoudre le sel dans le vinaigre avant l'huile ?", options: ["Parce que le sel se dissout mieux dans l'eau que dans le gras", "Pour cuire le vinaigre", "Pour épaissir l'huile"], answer: 0, explanation: "Le sel se disperse mal dans l'huile pure." },
        { question: "Si une vinaigrette est trop acide, on peut corriger avec...", options: ["Un peu d'huile ou une pointe de douceur", "Plus de vinaigre", "De la farine crue"], answer: 0, explanation: "Le gras et une légère douceur arrondissent l'acidité." }
      ]
    },
    {
      id: "l-bechamel-1",
      module: "Sauces",
      title: "Béchamel : roux, lait et texture nappante",
      level: 2,
      xp: 45,
      prerequisiteIds: ["l-emulsion-1"],
      skillIds: ["liaison", "emulsion"],
      summary: "Comprendre comment farine, beurre et lait créent une sauce liée.",
      objective: "Obtenir une sauce lisse, sans grumeaux, avec une épaisseur contrôlée.",
      content: [
        "Le roux est un mélange beurre-farine qui sert à lier un liquide. Il doit cuire brièvement pour perdre le goût de farine crue.",
        "Le liquide doit être ajouté progressivement au départ, en fouettant, pour éviter les grumeaux.",
        "La texture finale dépend du ratio roux/liquide et de la réduction. Une sauce trop épaisse se détend avec un peu de lait."
      ],
      practice: "Application recommandée : béchamel puis gratin simple.",
      quiz: [
        { question: "Le roux sert principalement à...", options: ["Lier une sauce", "Refroidir le lait", "Créer du croustillant"], answer: 0, explanation: "La farine gélifie et épaissit le liquide." },
        { question: "Pour limiter les grumeaux, il faut...", options: ["Ajouter le lait progressivement au début", "Ne jamais fouetter", "Mettre toute la farine à la fin"], answer: 0, explanation: "L'ajout progressif permet une dispersion propre du roux." }
      ]
    },
    {
      id: "l-epices-1",
      module: "Saveurs",
      title: "Épices : torréfier, doser, équilibrer",
      level: 3,
      xp: 45,
      prerequisiteIds: ["l-assaisonnement-1"],
      skillIds: ["epices", "assaisonnement"],
      summary: "Utiliser les épices pour structurer un plat sans le rendre brouillon.",
      objective: "Comprendre quand chauffer les épices et comment éviter le goût poudreux.",
      content: [
        "Beaucoup d'épices gagnent en profondeur lorsqu'elles chauffent brièvement dans une matière grasse.",
        "Le danger est double : brûler les épices, ou en mettre trop sans équilibre acide, salé et gras.",
        "Ajoute progressivement. Une épice peut dominer un plat très vite, surtout cumin, girofle, cannelle ou piment."
      ],
      practice: "Application recommandée : dhal de lentilles corail.",
      quiz: [
        { question: "Pourquoi chauffer certaines épices dans l'huile ?", options: ["Pour diffuser leurs arômes", "Pour les rendre invisibles", "Pour supprimer le sel"], answer: 0, explanation: "De nombreux composés aromatiques se diffusent dans le gras." }
      ]
    },
    {
      id: "l-legumineuses-1",
      module: "Végétal",
      title: "Légumineuses : texture, sel et cuisson",
      level: 3,
      xp: 45,
      prerequisiteIds: ["l-assaisonnement-1"],
      skillIds: ["legumineuses", "mijoter"],
      summary: "Cuisiner lentilles, pois chiches et haricots sans texture farineuse ou plate.",
      objective: "Obtenir des légumineuses fondantes mais structurées.",
      content: [
        "Les légumineuses ont besoin d'une cuisson adaptée et d'un assaisonnement progressif.",
        "Les lentilles corail cuisent vite et se défont ; les pois chiches et haricots demandent plus de temps ou une cuisson préalable.",
        "L'acidité se met plutôt en fin de cuisson pour garder une texture agréable."
      ],
      practice: "Application recommandée : dhal de lentilles corail.",
      quiz: [
        { question: "Pourquoi ajouter souvent l'acidité en fin de cuisson ?", options: ["Pour préserver une bonne texture", "Pour empêcher toute cuisson", "Pour remplacer le sel"], answer: 0, explanation: "L'acidité peut ralentir l'attendrissement de certains végétaux." }
      ]
    },
    {
      id: "l-four-1",
      module: "Cuisson",
      title: "Four : chaleur sèche, coloration et inertie",
      level: 2,
      xp: 40,
      prerequisiteIds: ["l-saisir-1"],
      skillIds: ["four", "legumes"],
      summary: "Comprendre préchauffage, espacement et évaporation.",
      objective: "Rôtir des légumes sans les faire bouillir sur plaque.",
      content: [
        "Un four fonctionne par chaleur sèche. Pour colorer, il faut assez de chaleur, de l'espace et peu d'excès d'eau.",
        "Une plaque surchargée emprisonne la vapeur : les légumes ramollissent au lieu de rôtir.",
        "Le préchauffage et une plaque chaude peuvent améliorer la coloration."
      ],
      practice: "Application recommandée : légumes rôtis de saison.",
      quiz: [
        { question: "Pourquoi ne pas surcharger une plaque de légumes ?", options: ["Pour éviter la vapeur excessive", "Pour économiser du sel", "Pour empêcher la coloration"], answer: 0, explanation: "Trop d'eau évaporée crée une atmosphère humide et limite la coloration." }
      ]
    },
    {
      id: "l-pate-sablee-1",
      module: "Pâtisserie",
      title: "Pâte sablée : froid, beurre et friabilité",
      level: 3,
      xp: 50,
      prerequisiteIds: ["l-pate-1"],
      skillIds: ["pate", "patisserie"],
      summary: "Comprendre pourquoi une pâte se rétracte, colle ou devient dure.",
      objective: "Préparer une pâte friable sans trop développer le gluten.",
      content: [
        "Une pâte sablée se travaille peu. Trop pétrir développe le gluten et rend la pâte dure ou élastique.",
        "Le froid stabilise le beurre, facilite l'abaisse et limite la rétraction à la cuisson.",
        "Le repos n'est pas une option esthétique : c'est un outil de texture."
      ],
      practice: "Application recommandée : pâte sablée puis tarte aux pommes.",
      quiz: [
        { question: "Pourquoi éviter de trop pétrir une pâte sablée ?", options: ["Pour éviter une pâte dure", "Pour augmenter l'eau", "Pour la rendre liquide"], answer: 0, explanation: "Trop travailler développe le gluten." }
      ]
    },
    {
      id: "l-dressage-1",
      module: "Finition",
      title: "Dressage : lisibilité, volume, sauce et contraste",
      level: 4,
      xp: 50,
      prerequisiteIds: ["l-menu-1"],
      skillIds: ["dressage", "finition"],
      summary: "Rendre une assiette plus nette sans tomber dans le décor gratuit.",
      objective: "Apprendre à finaliser un plat avec intention.",
      content: [
        "Un bon dressage rend le plat lisible : élément principal, garniture, sauce, finition.",
        "La hauteur, les contrastes de couleur et une sauce propre suffisent souvent. Le décor ne doit pas gêner la dégustation.",
        "La finition peut être aromatique et texturale : herbes, zeste, huile, graines, croquant."
      ],
      practice: "Application recommandée : bowl de saison ou poisson citron-herbes.",
      quiz: [
        { question: "Une bonne finition doit surtout...", options: ["Servir le goût et la lisibilité", "Cacher les erreurs", "Ajouter le plus d'éléments possible"], answer: 0, explanation: "Le dressage reste au service de la dégustation." }
      ]
    }
  ].forEach((lesson) => pushUnique(DATA.lessons, lesson));

  [
    {
      id: "r-vinaigrette-emulsion",
      title: "Salade vinaigrette émulsionnée",
      category: "quotidien",
      level: 1,
      duration: 10,
      cost: "low",
      season: ["toute saison"],
      cover: "alt1",
      skillIds: ["emulsion", "assaisonnement"],
      description: "Une micro-recette pour apprendre l'équilibre sel, acide et gras.",
      objective: "Faire une vinaigrette stable, bien salée et non agressive.",
      successSigns: ["Sauce brillante", "Acidité agréable", "Salade assaisonnée sans excès"],
      ingredients: ["1 c. à s. vinaigre", "3 c. à s. huile", "1 c. à c. moutarde", "Sel", "Poivre", "Salade"],
      tools: ["Bol", "Fouet ou fourchette"],
      steps: [
        { title: "Dissoudre", instruction: "Mélange vinaigre, sel, poivre et moutarde.", why: "Le sel se dissout mieux dans la phase aqueuse que dans l'huile." },
        { title: "Émulsionner", instruction: "Verse l'huile progressivement en fouettant.", why: "L'ajout progressif disperse mieux le gras.", checkpoint: "La sauce doit devenir légèrement liée." },
        { title: "Goûter sur feuille", instruction: "Goûte avec une feuille de salade et ajuste.", why: "La sauce seule paraît souvent plus forte que dans le plat final." }
      ]
    },
    {
      id: "r-bechamel",
      title: "Béchamel de base",
      category: "technique",
      level: 2,
      duration: 18,
      cost: "low",
      season: ["toute saison"],
      cover: "alt2",
      skillIds: ["liaison", "emulsion"],
      description: "Base utile pour gratins, croque-monsieur et sauces blanches.",
      objective: "Obtenir une sauce lisse et nappante.",
      successSigns: ["Pas de grumeaux", "Texture nappante", "Goût de farine absent"],
      ingredients: ["25 g beurre", "25 g farine", "30 cl lait", "Sel", "Poivre", "Muscade optionnelle"],
      tools: ["Casserole", "Fouet"],
      steps: [
        { title: "Faire le roux", instruction: "Fais fondre le beurre, ajoute la farine et cuis 1 minute en mélangeant.", why: "Le roux cuit retire le goût de farine crue.", timer: 60 },
        { title: "Ajouter le lait", instruction: "Verse un peu de lait froid ou tiède en fouettant, puis ajoute le reste progressivement.", why: "Le départ progressif limite les grumeaux." },
        { title: "Épaissir", instruction: "Fais cuire à petit frémissement jusqu'à texture nappante.", why: "L'amidon de la farine épaissit avec la chaleur.", timer: 300, checkpoint: "La sauce doit napper la cuillère." },
        { title: "Assaisonner", instruction: "Sale, poivre, ajoute une pointe de muscade si souhaité.", why: "Une béchamel non assaisonnée paraît lourde et plate." }
      ]
    },
    {
      id: "r-legumes-rotis",
      title: "Légumes rôtis de saison",
      category: "vege",
      level: 2,
      duration: 35,
      cost: "low",
      season: ["automne", "hiver", "printemps"],
      cover: "alt3",
      skillIds: ["four", "legumes", "assaisonnement"],
      description: "Travailler découpe régulière, espacement et coloration au four.",
      objective: "Obtenir des légumes dorés, pas juste ramollis.",
      successSigns: ["Bords colorés", "Intérieur fondant", "Assaisonnement net"],
      ingredients: ["Légumes de saison", "Huile d'olive", "Sel", "Poivre", "Herbes ou épices"],
      tools: ["Plaque", "Four", "Couteau"],
      steps: [
        { title: "Couper régulier", instruction: "Coupe les légumes à taille proche.", why: "La régularité donne une cuisson homogène." },
        { title: "Assaisonner", instruction: "Mélange avec huile, sel, poivre et épices.", why: "Le gras aide la coloration et porte les arômes." },
        { title: "Espacer", instruction: "Étale sur plaque sans empiler.", why: "L'espace laisse s'échapper la vapeur.", checkpoint: "On doit voir la plaque entre plusieurs morceaux." },
        { title: "Rôtir", instruction: "Cuis à four chaud en retournant à mi-cuisson.", why: "La chaleur sèche concentre et colore.", timer: 1800 }
      ]
    },
    {
      id: "r-dhal-lentilles",
      title: "Dhal de lentilles corail",
      category: "vege",
      level: 3,
      duration: 30,
      cost: "low",
      season: ["toute saison"],
      cover: "alt4",
      skillIds: ["legumineuses", "epices", "mijoter"],
      description: "Un plat végétal pour travailler épices, mijotage et texture.",
      objective: "Obtenir une texture crémeuse avec des épices nettes.",
      successSigns: ["Lentilles fondantes", "Épices présentes mais non brûlées", "Acidité finale équilibrée"],
      ingredients: ["Lentilles corail", "Oignon", "Ail", "Gingembre", "Curry ou cumin", "Tomate", "Lait de coco optionnel", "Citron"],
      tools: ["Casserole", "Cuillère"],
      steps: [
        { title: "Base aromatique", instruction: "Fais revenir oignon, ail et gingembre doucement.", why: "La base crée la profondeur du plat." },
        { title: "Chauffer les épices", instruction: "Ajoute les épices 30 secondes dans le gras.", why: "La chaleur libère les arômes, mais elles brûlent vite.", timer: 30 },
        { title: "Mijoter", instruction: "Ajoute lentilles, tomate et liquide. Cuis doucement jusqu'à texture crémeuse.", why: "Les lentilles corail se défont vite et épaississent le plat.", timer: 1200 },
        { title: "Finition acide", instruction: "Ajoute citron et sel en fin de cuisson.", why: "L'acide réveille le plat et équilibre le gras." }
      ]
    },
    {
      id: "r-shakshuka",
      title: "Shakshuka tomate, poivron et œufs",
      category: "monde",
      level: 3,
      duration: 35,
      cost: "low",
      season: ["été", "toute saison"],
      cover: "alt1",
      skillIds: ["oeufs", "epices", "reduire"],
      description: "Réduire une sauce tomate épicée puis cuire les œufs dedans.",
      objective: "Garder les œufs coulants dans une sauce concentrée.",
      successSigns: ["Sauce épaisse", "Blanc pris", "Jaune encore souple"],
      ingredients: ["Œufs", "Tomates", "Poivron", "Oignon", "Ail", "Paprika/cumin", "Huile", "Herbes"],
      tools: ["Poêle", "Couvercle"],
      steps: [
        { title: "Fondre les légumes", instruction: "Fais revenir oignon et poivron jusqu'à tendreté.", why: "La douceur vient d'une cuisson suffisante." },
        { title: "Épicer", instruction: "Ajoute ail et épices brièvement.", why: "Les épices doivent parfumer sans brûler.", timer: 45 },
        { title: "Réduire tomate", instruction: "Ajoute tomate et cuis jusqu'à sauce épaisse.", why: "Une sauce trop liquide cuit mal les œufs.", timer: 900 },
        { title: "Cuire les œufs", instruction: "Creuse des nids, casse les œufs, couvre et cuis doucement.", why: "La vapeur prend le blanc sans durcir trop vite le jaune.", timer: 360 }
      ]
    },
    {
      id: "r-pate-sablee",
      title: "Pâte sablée simple",
      category: "dessert",
      level: 3,
      duration: 45,
      cost: "low",
      season: ["toute saison"],
      cover: "alt2",
      skillIds: ["pate", "patisserie"],
      description: "Base de pâtisserie pour comprendre sablage, repos et cuisson.",
      objective: "Faire une pâte friable, non élastique.",
      successSigns: ["Pâte non collante", "Bords réguliers", "Texture friable après cuisson"],
      ingredients: ["200 g farine", "100 g beurre froid", "70 g sucre", "1 œuf", "Sel"],
      tools: ["Bol", "Rouleau", "Film ou boîte", "Moule"],
      steps: [
        { title: "Sabler", instruction: "Mélange farine, sucre, sel et beurre froid en petits morceaux jusqu'à texture sableuse.", why: "Le beurre enrobe la farine et limite une texture dure." },
        { title: "Former", instruction: "Ajoute l'œuf et rassemble sans pétrir longtemps.", why: "Trop travailler développe le gluten." },
        { title: "Reposer", instruction: "Aplatis en disque et mets au frais.", why: "Le froid stabilise le beurre et détend la pâte.", timer: 1800 },
        { title: "Abaisser", instruction: "Étale régulièrement puis fonce le moule.", why: "Une épaisseur régulière cuit mieux." }
      ]
    },
    {
      id: "r-tarte-pommes",
      title: "Tarte aux pommes fine",
      category: "dessert",
      level: 3,
      duration: 55,
      cost: "low",
      season: ["automne", "hiver", "toute saison"],
      cover: "alt3",
      skillIds: ["pate", "four", "dressage"],
      description: "Travailler pâte, découpe régulière, cuisson et finition brillante.",
      objective: "Obtenir une tarte nette, dorée et lisible.",
      successSigns: ["Pâte cuite dessous", "Pommes tendres", "Bords dorés"],
      ingredients: ["Pâte sablée ou feuilletée", "Pommes", "Sucre", "Beurre", "Compote optionnelle"],
      tools: ["Four", "Couteau", "Plaque ou moule"],
      steps: [
        { title: "Préparer les pommes", instruction: "Coupe les pommes en lamelles régulières.", why: "La régularité améliore cuisson et dressage." },
        { title: "Monter", instruction: "Dispose les pommes en rosace ou lignes serrées.", why: "Un dressage régulier donne une cuisson régulière." },
        { title: "Sucrer et beurrer", instruction: "Ajoute sucre et petites noisettes de beurre.", why: "Le sucre colore, le beurre apporte gourmandise." },
        { title: "Cuire", instruction: "Cuis à four chaud jusqu'à pâte dorée.", why: "La pâte doit cuire autant que les pommes.", timer: 2100 }
      ]
    },
    {
      id: "r-bowl-saison",
      title: "Bowl complet de saison",
      category: "quotidien",
      level: 4,
      duration: 35,
      cost: "medium",
      season: ["toute saison"],
      cover: "alt4",
      skillIds: ["menu", "finition", "improvisation", "assaisonnement"],
      description: "Construire une assiette complète avec base, légumes, sauce et contraste.",
      objective: "Composer un plat autonome sans recette rigide.",
      successSigns: ["Base nourrissante", "Sauce présente", "Contraste croquant/fondant", "Acidité finale"],
      ingredients: ["Riz ou céréale", "Légumes cuits", "Légumes crus", "Protéine au choix", "Sauce", "Herbes/graines"],
      tools: ["Casserole", "Poêle", "Bol"],
      steps: [
        { title: "Choisir la base", instruction: "Prépare riz, semoule, pâtes ou légumineuse.", why: "La base donne structure et satiété." },
        { title: "Ajouter le chaud", instruction: "Prépare un légume rôti ou poêlé et une protéine.", why: "Le chaud apporte confort et volume." },
        { title: "Faire une sauce", instruction: "Mélange gras, acide, sel et aromates.", why: "La sauce relie les éléments." },
        { title: "Finir", instruction: "Ajoute cru, herbes, graines ou zeste.", why: "Le contraste rend le bol plus vivant." }
      ]
    }
  ].forEach((recipe) => pushUnique(DATA.recipes, recipe));

  [
    { id: "weekly-goal", name: "Rythme installé", description: "Tu as configuré un objectif hebdomadaire." },
    { id: "sauce-starter", name: "Bases des sauces", description: "Tu as commencé vinaigrette ou béchamel." },
    { id: "vegetal-cook", name: "Cuisine végétale", description: "Tu as pratiqué légumineuses ou légumes rôtis." },
    { id: "dessert-base", name: "Bases dessert", description: "Tu as travaillé une pâte ou une crème." }
  ].forEach((badge) => pushUnique(DATA.badges, badge));
})();


// V5 content layer: 50 real-world, rewritten pedagogical recipes.
(() => {
  const DATA = window.CUISINE_DATA;
  DATA.appVersion = "0.5.0";

  function pushUnique(collection, item) {
    if (!collection.some((existing) => existing.id === item.id)) collection.push(item);
  }

  const recipes = [
  {
    "id": "r-boeuf-bourguignon",
    "title": "Bœuf bourguignon pédagogique",
    "category": "classique",
    "level": 4,
    "duration": 170,
    "cost": "medium",
    "season": [
      "automne",
      "hiver"
    ],
    "cover": "alt1",
    "skillIds": [
      "viande",
      "mijoter",
      "saisir",
      "deglacer",
      "reduire"
    ],
    "description": "Un grand classique pour travailler coloration, garniture aromatique, déglaçage et cuisson longue.",
    "objective": "Obtenir une viande fondante, une sauce nappante et des légumes encore lisibles.",
    "successSigns": [
      "Viande tendre",
      "Sauce brillante et réduite",
      "Goût profond sans amertume"
    ],
    "ingredients": [
      "700 g de bœuf à mijoter",
      "100 g de lardons",
      "2 carottes",
      "1 oignon",
      "250 g champignons",
      "50 cl vin rouge",
      "20 cl bouillon",
      "Farine",
      "Bouquet garni",
      "Sel",
      "Poivre"
    ],
    "tools": [
      "Cocotte",
      "Couteau",
      "Planche",
      "Pince"
    ],
    "steps": [
      {
        "title": "Sécher et colorer la viande",
        "instruction": "Éponge les morceaux, sale légèrement puis colore-les en plusieurs fois dans la cocotte chaude.",
        "why": "La coloration développe les sucs. Trop de viande d'un coup fait chuter la température et transforme la saisie en cuisson vapeur.",
        "timer": 420,
        "mistake": "Si du liquide apparaît, retire la viande, évapore l'eau puis reprends la coloration."
      },
      {
        "title": "Faire revenir la garniture",
        "instruction": "Ajoute lardons, oignon et carottes. Fais suer puis saupoudre légèrement de farine.",
        "why": "La farine aide à donner du corps à la sauce. Elle doit cuire un peu pour perdre son goût cru.",
        "timer": 300
      },
      {
        "title": "Déglacer au vin",
        "instruction": "Verse le vin rouge, gratte le fond, ajoute bouillon et bouquet garni.",
        "why": "Le déglaçage dissout les sucs et construit la base aromatique du plat."
      },
      {
        "title": "Mijoter doucement",
        "instruction": "Couvre presque complètement et laisse cuire à frémissement très doux.",
        "why": "Une ébullition forte durcit la viande et trouble la sauce. Le collagène a besoin de temps.",
        "timer": 7200
      },
      {
        "title": "Ajouter les champignons",
        "instruction": "Poêle les champignons à part puis ajoute-les en fin de cuisson.",
        "why": "Les cuire à part préserve leur goût et évite qu'ils rendent trop d'eau dans la sauce.",
        "timer": 600
      },
      {
        "title": "Ajuster la sauce",
        "instruction": "Retire le bouquet garni, goûte, corrige sel/poivre et réduis si la sauce est trop liquide.",
        "why": "La réduction finale concentre. L'assaisonnement se règle toujours à la fin d'un mijoté."
      }
    ]
  },
  {
    "id": "r-blanquette-veau",
    "title": "Blanquette de veau, sauce veloutée",
    "category": "classique",
    "level": 4,
    "duration": 115,
    "cost": "high",
    "season": [
      "automne",
      "hiver",
      "printemps"
    ],
    "cover": "alt2",
    "skillIds": [
      "viande",
      "mijoter",
      "liaison",
      "bouillon",
      "assaisonnement"
    ],
    "description": "Un classique blanc pour comprendre pochage, bouillon, roux et liaison finale.",
    "objective": "Garder une viande moelleuse et obtenir une sauce blanche, souple et nappante.",
    "successSigns": [
      "Viande tendre",
      "Sauce lisse",
      "Acidité discrète en finition"
    ],
    "ingredients": [
      "700 g veau à blanquette",
      "2 carottes",
      "1 poireau",
      "1 oignon",
      "Champignons",
      "40 g beurre",
      "40 g farine",
      "10 cl crème",
      "1 jaune d'œuf optionnel",
      "Citron",
      "Sel"
    ],
    "tools": [
      "Cocotte",
      "Casserole",
      "Fouet",
      "Écumoire"
    ],
    "steps": [
      {
        "title": "Démarrer à froid",
        "instruction": "Place la viande dans l'eau froide, porte à frémissement puis écume.",
        "why": "Le départ à froid extrait les impuretés et donne un bouillon plus propre.",
        "timer": 600
      },
      {
        "title": "Cuire avec les légumes",
        "instruction": "Ajoute carotte, poireau, oignon et une pincée de sel. Cuis doucement.",
        "why": "La cuisson douce attendrit sans agresser la viande.",
        "timer": 5400
      },
      {
        "title": "Préparer le roux",
        "instruction": "Fais fondre le beurre, ajoute la farine et cuis doucement sans colorer.",
        "why": "Le roux blanc épaissit la sauce sans la brunir.",
        "timer": 180
      },
      {
        "title": "Monter la sauce",
        "instruction": "Verse progressivement le bouillon filtré sur le roux en fouettant.",
        "why": "Ajouter le liquide petit à petit limite les grumeaux et crée une sauce lisse."
      },
      {
        "title": "Lier et finir",
        "instruction": "Ajoute crème, citron et éventuellement jaune d'œuf hors ébullition.",
        "why": "La liaison enrichit la sauce. Le citron apporte de la tension à un plat très doux."
      }
    ]
  },
  {
    "id": "r-quiche-lorraine",
    "title": "Quiche lorraine équilibrée",
    "category": "classique",
    "level": 2,
    "duration": 55,
    "cost": "medium",
    "season": [
      "toute saison"
    ],
    "cover": "alt3",
    "skillIds": [
      "pate",
      "oeufs",
      "four",
      "assaisonnement"
    ],
    "description": "Un classique utile pour travailler appareil œuf-crème, pâte croustillante et cuisson au four.",
    "objective": "Obtenir une garniture prise mais tremblotante, avec une pâte bien cuite.",
    "successSigns": [
      "Pâte sèche dessous",
      "Appareil juste pris",
      "Lardons dorés"
    ],
    "ingredients": [
      "1 pâte brisée",
      "150 g lardons",
      "3 œufs",
      "25 cl crème",
      "10 cl lait",
      "Muscade",
      "Poivre",
      "Peu de sel"
    ],
    "tools": [
      "Moule à tarte",
      "Poêle",
      "Bol",
      "Fouet",
      "Four"
    ],
    "steps": [
      {
        "title": "Précuire les lardons",
        "instruction": "Fais revenir les lardons pour retirer l'excès de gras puis égoutte-les.",
        "why": "Cela évite une quiche grasse et améliore le goût.",
        "timer": 360
      },
      {
        "title": "Préparer l'appareil",
        "instruction": "Fouette œufs, crème, lait, poivre et muscade. Sale très peu.",
        "why": "Les lardons apportent déjà du sel. L'appareil doit rester fluide."
      },
      {
        "title": "Garnir la pâte",
        "instruction": "Répartis les lardons sur la pâte puis verse l'appareil.",
        "why": "Répartir les solides avant le liquide donne une garniture homogène."
      },
      {
        "title": "Cuire",
        "instruction": "Enfourne jusqu'à coloration et prise de l'appareil.",
        "why": "Une quiche trop cuite devient sèche. Le centre peut rester légèrement tremblant.",
        "timer": 2100
      }
    ]
  },
  {
    "id": "r-croque-monsieur-bechamel",
    "title": "Croque-monsieur gratiné à la béchamel",
    "category": "quotidien",
    "level": 2,
    "duration": 25,
    "cost": "low",
    "season": [
      "toute saison"
    ],
    "cover": "alt4",
    "skillIds": [
      "liaison",
      "four",
      "assaisonnement"
    ],
    "description": "Un dîner rapide pour réutiliser la béchamel et apprendre le gratinage.",
    "objective": "Obtenir un croque croustillant dehors, fondant dedans, sans être détrempé.",
    "successSigns": [
      "Dessus gratiné",
      "Pain encore structuré",
      "Fromage fondu"
    ],
    "ingredients": [
      "4 tranches pain de mie",
      "2 tranches jambon",
      "Fromage râpé",
      "15 g beurre",
      "15 g farine",
      "20 cl lait",
      "Muscade",
      "Poivre"
    ],
    "tools": [
      "Casserole",
      "Fouet",
      "Plaque",
      "Four"
    ],
    "steps": [
      {
        "title": "Faire une petite béchamel",
        "instruction": "Prépare un roux beurre-farine puis ajoute le lait en fouettant jusqu'à épaississement.",
        "why": "La béchamel apporte du moelleux et sert de support au gratin.",
        "timer": 360
      },
      {
        "title": "Monter le croque",
        "instruction": "Tartine légèrement l'intérieur, ajoute jambon et fromage, puis referme.",
        "why": "Trop de sauce à l'intérieur détrempe le pain."
      },
      {
        "title": "Napper le dessus",
        "instruction": "Ajoute une fine couche de béchamel et du fromage râpé.",
        "why": "C'est cette couche qui gratine et donne le côté bistrot."
      },
      {
        "title": "Gratiner",
        "instruction": "Passe au four chaud jusqu'à coloration.",
        "why": "Le four sèche légèrement le pain tout en fondant le fromage.",
        "timer": 600
      }
    ]
  },
  {
    "id": "r-soupe-oignon",
    "title": "Soupe à l'oignon gratinée",
    "category": "classique",
    "level": 3,
    "duration": 55,
    "cost": "low",
    "season": [
      "automne",
      "hiver"
    ],
    "cover": "alt1",
    "skillIds": [
      "legumes",
      "reduire",
      "four",
      "assaisonnement"
    ],
    "description": "Un classique de bistrot pour comprendre la coloration lente des oignons.",
    "objective": "Obtenir une soupe brune, douce, profonde, sans goût brûlé.",
    "successSigns": [
      "Oignons confits",
      "Bouillon brun",
      "Gratin croustillant"
    ],
    "ingredients": [
      "600 g oignons",
      "30 g beurre",
      "1 c. à soupe farine",
      "1 l bouillon",
      "Pain",
      "Comté ou gruyère",
      "Sel",
      "Poivre"
    ],
    "tools": [
      "Cocotte",
      "Couteau",
      "Bols allant au four",
      "Four"
    ],
    "steps": [
      {
        "title": "Émincer régulièrement",
        "instruction": "Émince les oignons finement et régulièrement.",
        "why": "Des tailles proches colorent de manière homogène."
      },
      {
        "title": "Colorer lentement",
        "instruction": "Fais cuire au beurre à feu moyen-doux jusqu'à brunissement doux.",
        "why": "Le goût vient de la cuisson lente. Le feu trop fort donne de l'amertume.",
        "timer": 1800,
        "mistake": "Si le fond accroche trop, ajoute une cuillère d'eau et gratte."
      },
      {
        "title": "Singer et mouiller",
        "instruction": "Ajoute la farine, cuis une minute, puis verse le bouillon.",
        "why": "La farine donne un léger corps à la soupe.",
        "timer": 900
      },
      {
        "title": "Gratiner",
        "instruction": "Verse en bols, ajoute pain et fromage, puis gratine.",
        "why": "Le pain absorbe la soupe et le fromage apporte le contraste gratiné.",
        "timer": 480
      }
    ]
  },
  {
    "id": "r-gratin-dauphinois",
    "title": "Gratin dauphinois fondant",
    "category": "classique",
    "level": 2,
    "duration": 75,
    "cost": "low",
    "season": [
      "automne",
      "hiver",
      "toute saison"
    ],
    "cover": "alt2",
    "skillIds": [
      "legumes",
      "four",
      "assaisonnement"
    ],
    "description": "Un classique simple mais exigeant : taille régulière, cuisson lente et assaisonnement.",
    "objective": "Obtenir des pommes de terre fondantes dans une crème liée naturellement par l'amidon.",
    "successSigns": [
      "Tranches fondantes",
      "Crème réduite",
      "Dessus doré"
    ],
    "ingredients": [
      "800 g pommes de terre",
      "30 cl crème",
      "25 cl lait",
      "Ail",
      "Muscade",
      "Sel",
      "Poivre"
    ],
    "tools": [
      "Mandoline ou couteau",
      "Plat à gratin",
      "Four"
    ],
    "steps": [
      {
        "title": "Trancher finement",
        "instruction": "Coupe les pommes de terre en tranches fines et régulières sans les rincer.",
        "why": "L'amidon aide à lier le gratin. Rincer enlèverait une partie de cette liaison."
      },
      {
        "title": "Assaisonner le liquide",
        "instruction": "Mélange crème, lait, ail, muscade, sel et poivre.",
        "why": "Assaisonner le liquide répartit mieux le goût."
      },
      {
        "title": "Monter le plat",
        "instruction": "Range les pommes de terre, verse le mélange à hauteur presque complète.",
        "why": "Les tranches doivent cuire dans le liquide sans flotter."
      },
      {
        "title": "Cuire lentement",
        "instruction": "Enfourne jusqu'à pommes de terre fondantes et surface dorée.",
        "why": "La cuisson lente hydrate l'amidon et concentre la crème.",
        "timer": 3600
      }
    ]
  },
  {
    "id": "r-hachis-parmentier",
    "title": "Hachis parmentier maison",
    "category": "quotidien",
    "level": 2,
    "duration": 60,
    "cost": "low",
    "season": [
      "automne",
      "hiver",
      "toute saison"
    ],
    "cover": "alt3",
    "skillIds": [
      "mijoter",
      "legumes",
      "four",
      "assaisonnement"
    ],
    "description": "Une recette économique pour apprendre à transformer des restes ou une viande hachée en plat complet.",
    "objective": "Construire une base de viande goûteuse et une purée souple qui gratine bien.",
    "successSigns": [
      "Viande juteuse",
      "Purée légère",
      "Dessus doré"
    ],
    "ingredients": [
      "500 g pommes de terre",
      "300 g bœuf haché ou reste de pot-au-feu",
      "1 oignon",
      "1 carotte",
      "Bouillon",
      "Beurre",
      "Lait",
      "Fromage râpé",
      "Sel"
    ],
    "tools": [
      "Casserole",
      "Poêle",
      "Presse-purée",
      "Plat à gratin"
    ],
    "steps": [
      {
        "title": "Cuire les pommes de terre",
        "instruction": "Cuis les pommes de terre dans l'eau salée jusqu'à tendreté.",
        "why": "Une cuisson complète évite une purée grumeleuse.",
        "timer": 1500
      },
      {
        "title": "Préparer la base viande",
        "instruction": "Fais revenir oignon et carotte, ajoute la viande puis un peu de bouillon.",
        "why": "Le bouillon garde la viande moelleuse et apporte du goût.",
        "timer": 600
      },
      {
        "title": "Faire la purée",
        "instruction": "Écrase les pommes de terre avec beurre et lait chaud.",
        "why": "Le lait chaud s'incorpore mieux et évite de refroidir la purée."
      },
      {
        "title": "Monter et gratiner",
        "instruction": "Étale viande puis purée, ajoute fromage et enfourne.",
        "why": "Le gratinage ajoute texture et gourmandise.",
        "timer": 1500
      }
    ]
  },
  {
    "id": "r-pot-au-feu",
    "title": "Pot-au-feu clair et fondant",
    "category": "classique",
    "level": 4,
    "duration": 180,
    "cost": "medium",
    "season": [
      "automne",
      "hiver"
    ],
    "cover": "alt4",
    "skillIds": [
      "viande",
      "bouillon",
      "mijoter",
      "legumes"
    ],
    "description": "Un plat école pour comprendre bouillon, cuisson longue et ordre d'ajout des légumes.",
    "objective": "Obtenir un bouillon clair, une viande tendre et des légumes non défaits.",
    "successSigns": [
      "Bouillon parfumé",
      "Viande effilochable",
      "Légumes entiers"
    ],
    "ingredients": [
      "800 g bœuf à pot-au-feu",
      "Os à moelle optionnel",
      "Carottes",
      "Poireaux",
      "Navets",
      "Oignon",
      "Clous de girofle",
      "Bouquet garni",
      "Gros sel"
    ],
    "tools": [
      "Grande marmite",
      "Écumoire",
      "Couteau"
    ],
    "steps": [
      {
        "title": "Démarrer la viande",
        "instruction": "Couvre la viande d'eau froide, porte doucement à frémissement et écume.",
        "why": "Écumer donne un bouillon plus net.",
        "timer": 900
      },
      {
        "title": "Parfumer",
        "instruction": "Ajoute oignon, bouquet garni et sel. Maintiens un frémissement doux.",
        "why": "Une ébullition forte trouble le bouillon et agresse la viande.",
        "timer": 5400
      },
      {
        "title": "Ajouter les légumes",
        "instruction": "Ajoute les légumes selon leur taille et leur fermeté.",
        "why": "Les légumes cuisent moins longtemps que la viande et doivent garder une tenue.",
        "timer": 2400
      },
      {
        "title": "Servir en deux temps",
        "instruction": "Sers le bouillon puis la viande avec légumes, moutarde ou gros sel.",
        "why": "Cela met en valeur à la fois le bouillon et les morceaux."
      }
    ]
  },
  {
    "id": "r-poulet-basquaise",
    "title": "Poulet basquaise accessible",
    "category": "classique",
    "level": 3,
    "duration": 65,
    "cost": "medium",
    "season": [
      "été",
      "automne"
    ],
    "cover": "alt1",
    "skillIds": [
      "viande",
      "saisir",
      "legumes",
      "mijoter",
      "assaisonnement"
    ],
    "description": "Un plat familial pour travailler saisie du poulet, compotée de poivrons et sauce tomate.",
    "objective": "Garder le poulet moelleux dans une sauce parfumée et réduite.",
    "successSigns": [
      "Peau colorée",
      "Poivrons fondants",
      "Sauce courte"
    ],
    "ingredients": [
      "4 morceaux de poulet",
      "2 poivrons",
      "1 oignon",
      "2 tomates ou concassé",
      "Ail",
      "Piment d'Espelette",
      "Thym",
      "Sel"
    ],
    "tools": [
      "Sauteuse",
      "Couteau",
      "Planche"
    ],
    "steps": [
      {
        "title": "Colorer le poulet",
        "instruction": "Sale puis colore les morceaux côté peau dans une sauteuse chaude.",
        "why": "La coloration apporte des sucs qui parfumeront la sauce.",
        "timer": 600
      },
      {
        "title": "Faire tomber les légumes",
        "instruction": "Retire le poulet, ajoute oignon, poivrons et ail.",
        "why": "Les légumes doivent commencer à fondre avant de recevoir la tomate.",
        "timer": 600
      },
      {
        "title": "Construire la sauce",
        "instruction": "Ajoute tomate, thym et piment, puis remets le poulet.",
        "why": "La sauce doit cuire autour du poulet pour le parfumer."
      },
      {
        "title": "Mijoter",
        "instruction": "Cuis à couvert puis découvre pour réduire si nécessaire.",
        "why": "Couvert pour cuire, découvert pour concentrer.",
        "timer": 2100
      }
    ]
  },
  {
    "id": "r-moules-marinieres",
    "title": "Moules marinières rapides",
    "category": "quotidien",
    "level": 2,
    "duration": 20,
    "cost": "medium",
    "season": [
      "été",
      "automne",
      "hiver"
    ],
    "cover": "alt2",
    "skillIds": [
      "poisson",
      "deglacer",
      "assaisonnement"
    ],
    "description": "Une recette courte pour apprendre cuisson vapeur, jus naturel et aromates.",
    "objective": "Obtenir des moules juste ouvertes, juteuses et non surcuites.",
    "successSigns": [
      "Moules ouvertes",
      "Chair souple",
      "Jus parfumé"
    ],
    "ingredients": [
      "1 kg moules nettoyées",
      "1 échalote",
      "Persil",
      "10 cl vin blanc",
      "20 g beurre",
      "Poivre"
    ],
    "tools": [
      "Grande casserole avec couvercle",
      "Couteau",
      "Passoire"
    ],
    "steps": [
      {
        "title": "Contrôler les moules",
        "instruction": "Jette les moules cassées ou celles qui restent ouvertes après un tapotement.",
        "why": "La sécurité alimentaire passe avant la cuisson."
      },
      {
        "title": "Faire suer l'échalote",
        "instruction": "Fais fondre le beurre et fais revenir l'échalote sans coloration forte.",
        "why": "La douceur de l'échalote parfume le jus.",
        "timer": 120
      },
      {
        "title": "Cuire à couvert",
        "instruction": "Ajoute moules et vin blanc, couvre et secoue la casserole.",
        "why": "La vapeur ouvre les moules rapidement.",
        "timer": 360
      },
      {
        "title": "Finir",
        "instruction": "Ajoute persil et poivre, mélange puis sers avec le jus.",
        "why": "Les moules apportent déjà beaucoup de sel. Goûte avant d'en ajouter."
      }
    ]
  },
  {
    "id": "r-poireaux-vinaigrette",
    "title": "Poireaux vinaigrette",
    "category": "classique",
    "level": 2,
    "duration": 35,
    "cost": "low",
    "season": [
      "automne",
      "hiver",
      "printemps"
    ],
    "cover": "alt3",
    "skillIds": [
      "legumes",
      "emulsion",
      "assaisonnement"
    ],
    "description": "Un classique de bistrot pour travailler cuisson tendre et vinaigrette nette.",
    "objective": "Obtenir des poireaux fondants mais non gorgés d'eau, avec une sauce vive.",
    "successSigns": [
      "Poireaux tendres",
      "Vinaigrette brillante",
      "Acidité équilibrée"
    ],
    "ingredients": [
      "4 poireaux",
      "1 c. à soupe moutarde",
      "2 c. à soupe vinaigre",
      "5 c. à soupe huile",
      "Échalote",
      "Persil",
      "Sel"
    ],
    "tools": [
      "Casserole vapeur ou eau",
      "Bol",
      "Fouet"
    ],
    "steps": [
      {
        "title": "Nettoyer soigneusement",
        "instruction": "Fends les poireaux et rince entre les feuilles.",
        "why": "Le sable se cache souvent dans les couches."
      },
      {
        "title": "Cuire doucement",
        "instruction": "Cuis les poireaux à la vapeur ou dans l'eau frémissante jusqu'à tendreté.",
        "why": "Une cuisson douce garde leur forme.",
        "timer": 1200
      },
      {
        "title": "Égoutter longtemps",
        "instruction": "Laisse égoutter puis presse très légèrement.",
        "why": "Moins d'eau signifie une vinaigrette qui accroche mieux."
      },
      {
        "title": "Émulsionner",
        "instruction": "Fouette moutarde, vinaigre, sel, puis ajoute l'huile progressivement.",
        "why": "La moutarde aide la sauce à rester liée."
      }
    ]
  },
  {
    "id": "r-salade-nicoise",
    "title": "Salade niçoise structurée",
    "category": "quotidien",
    "level": 2,
    "duration": 30,
    "cost": "medium",
    "season": [
      "printemps",
      "été"
    ],
    "cover": "alt4",
    "skillIds": [
      "oeufs",
      "legumes",
      "assaisonnement",
      "dressage"
    ],
    "description": "Une salade complète pour apprendre cuisson courte, assaisonnement séparé et dressage.",
    "objective": "Composer une assiette fraîche, lisible et bien assaisonnée.",
    "successSigns": [
      "Œufs bien cuits",
      "Légumes croquants",
      "Assaisonnement homogène"
    ],
    "ingredients": [
      "Tomates",
      "Œufs",
      "Haricots verts",
      "Thon",
      "Olives",
      "Anchois optionnels",
      "Huile d'olive",
      "Vinaigre",
      "Sel"
    ],
    "tools": [
      "Casserole",
      "Saladier",
      "Couteau"
    ],
    "steps": [
      {
        "title": "Cuire les œufs",
        "instruction": "Cuis les œufs 9 à 10 minutes puis refroidis-les.",
        "why": "Le refroidissement stoppe la cuisson et facilite l'écalage.",
        "timer": 600
      },
      {
        "title": "Cuire les haricots",
        "instruction": "Cuis les haricots verts dans l'eau salée puis refroidis-les.",
        "why": "Le froid garde la couleur et la texture.",
        "timer": 480
      },
      {
        "title": "Assaisonner par éléments",
        "instruction": "Sale les tomates, assaisonne les haricots et égoutte le thon.",
        "why": "Une grande salade est meilleure quand chaque élément a du goût."
      },
      {
        "title": "Dresser",
        "instruction": "Dispose les éléments lisiblement puis ajoute huile, vinaigre et herbes.",
        "why": "Un bon dressage rend la salade plus appétissante et plus facile à goûter."
      }
    ]
  },
  {
    "id": "r-lentilles-saucisse",
    "title": "Lentilles saucisse version quotidienne",
    "category": "quotidien",
    "level": 2,
    "duration": 45,
    "cost": "low",
    "season": [
      "automne",
      "hiver",
      "toute saison"
    ],
    "cover": "alt1",
    "skillIds": [
      "legumineuses",
      "mijoter",
      "assaisonnement"
    ],
    "description": "Un plat complet, économique et utile pour comprendre cuisson des légumineuses.",
    "objective": "Cuire les lentilles sans les éclater et construire un bouillon aromatique simple.",
    "successSigns": [
      "Lentilles tendres",
      "Jus savoureux",
      "Saucisse chaude sans dessécher"
    ],
    "ingredients": [
      "250 g lentilles vertes",
      "2 saucisses",
      "1 carotte",
      "1 oignon",
      "Bouquet garni",
      "Moutarde",
      "Sel"
    ],
    "tools": [
      "Casserole",
      "Couteau"
    ],
    "steps": [
      {
        "title": "Démarrer sans sel fort",
        "instruction": "Mets lentilles, carotte, oignon et bouquet garni dans l'eau froide.",
        "why": "Un départ à froid assure une cuisson régulière."
      },
      {
        "title": "Mijoter",
        "instruction": "Cuis à frémissement jusqu'à tendreté.",
        "why": "Un bouillonnement fort abîme les lentilles.",
        "timer": 1800
      },
      {
        "title": "Ajouter la saucisse",
        "instruction": "Ajoute la saucisse en fin de cuisson pour la réchauffer.",
        "why": "Une cuisson trop longue la rend sèche ou trop salée.",
        "timer": 600
      },
      {
        "title": "Assaisonner",
        "instruction": "Sale à la fin et sers avec une pointe de moutarde.",
        "why": "La moutarde apporte acidité et relief à un plat rond."
      }
    ]
  },
  {
    "id": "r-one-pot-pasta-epinards",
    "title": "One-pot pasta tomates et épinards",
    "category": "quotidien",
    "level": 1,
    "duration": 25,
    "cost": "low",
    "season": [
      "toute saison"
    ],
    "cover": "alt2",
    "skillIds": [
      "organisation",
      "assaisonnement",
      "reduire"
    ],
    "description": "Une recette express pour les soirs de semaine, avec peu de vaisselle.",
    "objective": "Cuire les pâtes dans juste assez de liquide pour créer une sauce liée.",
    "successSigns": [
      "Pâtes al dente",
      "Sauce nappante",
      "Épinards juste tombés"
    ],
    "ingredients": [
      "180 g pâtes courtes",
      "250 g tomates concassées",
      "1 poignée épinards",
      "Ail",
      "Huile d'olive",
      "Eau ou bouillon",
      "Parmesan optionnel"
    ],
    "tools": [
      "Grande sauteuse",
      "Spatule"
    ],
    "steps": [
      {
        "title": "Tout mettre sauf les épinards",
        "instruction": "Place pâtes, tomate, ail, huile, sel et eau à hauteur dans la sauteuse.",
        "why": "Le principe du one-pot est d'utiliser l'amidon des pâtes pour lier la sauce."
      },
      {
        "title": "Cuire en remuant",
        "instruction": "Cuis à frémissement en remuant souvent.",
        "why": "Remuer évite que les pâtes accrochent et répartit l'amidon.",
        "timer": 720
      },
      {
        "title": "Ajuster le liquide",
        "instruction": "Ajoute un peu d'eau si les pâtes ne sont pas cuites mais que la sauce épaissit trop.",
        "why": "La quantité exacte dépend de la forme des pâtes."
      },
      {
        "title": "Finir aux épinards",
        "instruction": "Ajoute les épinards à la fin et mélange jusqu'à ce qu'ils tombent.",
        "why": "Les épinards cuisent très vite et gardent mieux leur couleur."
      }
    ]
  },
  {
    "id": "r-soupe-legumes",
    "title": "Soupe de légumes mixée",
    "category": "quotidien",
    "level": 1,
    "duration": 40,
    "cost": "low",
    "season": [
      "automne",
      "hiver",
      "toute saison"
    ],
    "cover": "alt3",
    "skillIds": [
      "legumes",
      "bouillon",
      "assaisonnement"
    ],
    "description": "La base utile pour cuisiner les légumes disponibles et apprendre à équilibrer une soupe.",
    "objective": "Faire une soupe douce mais pas plate, avec une bonne texture.",
    "successSigns": [
      "Texture lisse",
      "Goût net",
      "Assaisonnement suffisant"
    ],
    "ingredients": [
      "Légumes de saison",
      "1 oignon",
      "1 pomme de terre optionnelle",
      "Bouillon ou eau",
      "Huile d'olive",
      "Sel",
      "Poivre"
    ],
    "tools": [
      "Casserole",
      "Mixeur",
      "Couteau"
    ],
    "steps": [
      {
        "title": "Faire suer l'oignon",
        "instruction": "Fais revenir l'oignon dans un peu d'huile sans forte coloration.",
        "why": "Cette base donne de la douceur.",
        "timer": 300
      },
      {
        "title": "Ajouter les légumes",
        "instruction": "Ajoute les légumes coupés régulièrement puis couvre à peine de liquide.",
        "why": "Trop d'eau donne une soupe fade."
      },
      {
        "title": "Cuire",
        "instruction": "Mijote jusqu'à ce que les légumes soient tendres.",
        "why": "Mixer des légumes insuffisamment cuits donne une texture granuleuse.",
        "timer": 1500
      },
      {
        "title": "Mixer et corriger",
        "instruction": "Mixe, ajuste sel, poivre, gras et éventuellement un trait de citron.",
        "why": "Le gras arrondit, l'acide réveille, le sel intensifie."
      }
    ]
  },
  {
    "id": "r-poulet-miel-soja",
    "title": "Poulet miel-soja gingembre",
    "category": "quotidien",
    "level": 2,
    "duration": 30,
    "cost": "medium",
    "season": [
      "toute saison"
    ],
    "cover": "alt4",
    "skillIds": [
      "viande",
      "saisir",
      "reduire",
      "assaisonnement"
    ],
    "description": "Un plat rapide pour travailler équilibre salé-sucré-acide et réduction courte.",
    "objective": "Glacer le poulet sans brûler le miel.",
    "successSigns": [
      "Poulet coloré",
      "Sauce brillante",
      "Équilibre salé/sucré"
    ],
    "ingredients": [
      "2 filets de poulet",
      "2 c. à soupe sauce soja",
      "1 c. à soupe miel",
      "Gingembre",
      "Ail",
      "Citron ou vinaigre de riz",
      "Huile"
    ],
    "tools": [
      "Poêle",
      "Bol",
      "Pince"
    ],
    "steps": [
      {
        "title": "Couper régulièrement",
        "instruction": "Coupe le poulet en morceaux de taille proche.",
        "why": "Ils cuiront au même rythme."
      },
      {
        "title": "Saisir",
        "instruction": "Saisis le poulet à feu moyen-vif jusqu'à coloration.",
        "why": "La coloration donne du goût avant l'ajout de sucre.",
        "timer": 420
      },
      {
        "title": "Ajouter la sauce",
        "instruction": "Verse soja, miel, ail et gingembre. Baisse légèrement le feu.",
        "why": "Le miel brûle vite. Il faut le réduire sans le carboniser.",
        "timer": 180
      },
      {
        "title": "Équilibrer",
        "instruction": "Ajoute une pointe de citron ou vinaigre hors du feu.",
        "why": "L'acidité équilibre le miel et la sauce soja."
      }
    ]
  },
  {
    "id": "r-chili-sin-carne",
    "title": "Chili sin carne",
    "category": "vege",
    "level": 2,
    "duration": 40,
    "cost": "low",
    "season": [
      "toute saison"
    ],
    "cover": "alt1",
    "skillIds": [
      "legumineuses",
      "epices",
      "mijoter",
      "assaisonnement"
    ],
    "description": "Un plat végétarien complet pour travailler épices, haricots et mijotage.",
    "objective": "Créer un plat riche sans viande grâce aux épices, haricots et tomate réduite.",
    "successSigns": [
      "Sauce épaisse",
      "Haricots entiers",
      "Épices présentes mais pas agressives"
    ],
    "ingredients": [
      "1 boîte haricots rouges",
      "1 boîte tomates",
      "1 oignon",
      "Maïs optionnel",
      "Cumin",
      "Paprika",
      "Piment",
      "Coriandre",
      "Citron vert"
    ],
    "tools": [
      "Casserole",
      "Couteau"
    ],
    "steps": [
      {
        "title": "Construire la base",
        "instruction": "Fais revenir oignon et ail dans un peu d'huile.",
        "why": "La base aromatique évite une sauce plate.",
        "timer": 300
      },
      {
        "title": "Réveiller les épices",
        "instruction": "Ajoute cumin, paprika et piment pendant 30 secondes.",
        "why": "Les épices libèrent mieux leurs arômes dans le gras.",
        "timer": 30
      },
      {
        "title": "Mijoter",
        "instruction": "Ajoute tomate et haricots, puis cuis jusqu'à épaississement.",
        "why": "La réduction concentre et lie les ingrédients.",
        "timer": 1500
      },
      {
        "title": "Finir frais",
        "instruction": "Ajoute citron vert et coriandre au service.",
        "why": "La fraîcheur équilibre le côté mijoté."
      }
    ]
  },
  {
    "id": "r-tacos-haricots-avocat",
    "title": "Tacos végétariens haricots-avocat",
    "category": "monde",
    "level": 2,
    "duration": 25,
    "cost": "low",
    "season": [
      "toute saison"
    ],
    "cover": "alt2",
    "skillIds": [
      "legumineuses",
      "assaisonnement",
      "dressage"
    ],
    "description": "Une recette moderne pour composer contraste, crémeux, croquant et acidité.",
    "objective": "Construire une garniture équilibrée avec peu de cuisson.",
    "successSigns": [
      "Garniture juteuse",
      "Acidité nette",
      "Texture contrastée"
    ],
    "ingredients": [
      "Tortillas",
      "Haricots rouges ou noirs",
      "Avocat",
      "Chou ou salade",
      "Oignon rouge",
      "Citron vert",
      "Épices",
      "Yaourt ou sauce optionnelle"
    ],
    "tools": [
      "Poêle",
      "Bol",
      "Couteau"
    ],
    "steps": [
      {
        "title": "Réchauffer les haricots",
        "instruction": "Fais revenir les haricots avec épices et un peu d'eau.",
        "why": "L'eau aide à créer une texture légèrement crémeuse.",
        "timer": 300
      },
      {
        "title": "Préparer le frais",
        "instruction": "Coupe avocat, chou et oignon, puis citronne légèrement.",
        "why": "L'acidité évite la lourdeur et protège l'avocat."
      },
      {
        "title": "Chauffer les tortillas",
        "instruction": "Passe les tortillas à la poêle quelques secondes.",
        "why": "Une tortilla chaude se plie mieux et a plus de goût."
      },
      {
        "title": "Assembler",
        "instruction": "Ajoute haricots, avocat, croquant, sauce et herbes.",
        "why": "Un bon taco contient une base, du gras, de l'acide et du croquant."
      }
    ]
  },
  {
    "id": "r-falafels-four",
    "title": "Falafels au four, sauce yaourt-herbes",
    "category": "vege",
    "level": 3,
    "duration": 45,
    "cost": "low",
    "season": [
      "toute saison"
    ],
    "cover": "alt3",
    "skillIds": [
      "legumineuses",
      "epices",
      "four",
      "assaisonnement"
    ],
    "description": "Une version plus légère pour apprendre texture, épices et cuisson au four.",
    "objective": "Obtenir des falafels qui se tiennent, avec extérieur coloré et intérieur moelleux.",
    "successSigns": [
      "Boules qui tiennent",
      "Surface dorée",
      "Sauce acidulée"
    ],
    "ingredients": [
      "Pois chiches cuits bien égouttés",
      "Persil",
      "Coriandre",
      "Ail",
      "Cumin",
      "Farine ou chapelure",
      "Yaourt",
      "Citron"
    ],
    "tools": [
      "Mixeur",
      "Plaque",
      "Four",
      "Bol"
    ],
    "steps": [
      {
        "title": "Égoutter fortement",
        "instruction": "Sèche bien les pois chiches avant de mixer.",
        "why": "Trop d'eau rend la pâte molle.",
        "mistake": "Si la pâte ne tient pas, ajoute un peu de farine ou chapelure."
      },
      {
        "title": "Mixer grossièrement",
        "instruction": "Mixe pois chiches, herbes, ail et épices sans obtenir une purée lisse.",
        "why": "Une texture légèrement granuleuse donne une meilleure mâche."
      },
      {
        "title": "Former et huiler",
        "instruction": "Forme des boulettes aplaties et badigeonne d'huile.",
        "why": "L'huile aide à colorer au four."
      },
      {
        "title": "Cuire",
        "instruction": "Enfourne et retourne à mi-cuisson.",
        "why": "Retourner assure une coloration plus régulière.",
        "timer": 1500
      },
      {
        "title": "Faire la sauce",
        "instruction": "Mélange yaourt, citron, sel et herbes.",
        "why": "La sauce apporte humidité et fraîcheur."
      }
    ]
  },
  {
    "id": "r-houmous",
    "title": "Houmous crémeux",
    "category": "vege",
    "level": 1,
    "duration": 12,
    "cost": "low",
    "season": [
      "toute saison"
    ],
    "cover": "alt4",
    "skillIds": [
      "legumineuses",
      "assaisonnement",
      "emulsion"
    ],
    "description": "Une base rapide pour comprendre texture, gras, acide et sel.",
    "objective": "Obtenir une purée lisse et équilibrée, pas pâteuse.",
    "successSigns": [
      "Texture crémeuse",
      "Citron perceptible",
      "Sel suffisant"
    ],
    "ingredients": [
      "Pois chiches cuits",
      "Tahini",
      "Citron",
      "Ail",
      "Huile d'olive",
      "Eau froide",
      "Sel",
      "Cumin optionnel"
    ],
    "tools": [
      "Mixeur",
      "Spatule"
    ],
    "steps": [
      {
        "title": "Mixer la base",
        "instruction": "Mixe tahini, citron, ail et sel avant les pois chiches.",
        "why": "Cela répartit mieux les assaisonnements."
      },
      {
        "title": "Ajouter les pois chiches",
        "instruction": "Mixe longuement avec un filet d'eau froide.",
        "why": "L'eau détend la texture sans alourdir."
      },
      {
        "title": "Corriger",
        "instruction": "Goûte et ajuste sel, citron ou tahini.",
        "why": "Le houmous a besoin d'un équilibre net entre gras, acide et sel."
      },
      {
        "title": "Servir",
        "instruction": "Creuse un sillon, ajoute huile d'olive et épices.",
        "why": "La finition améliore le goût et l'aspect."
      }
    ]
  },
  {
    "id": "r-ramen-miso-express",
    "title": "Ramen miso express",
    "category": "monde",
    "level": 2,
    "duration": 25,
    "cost": "medium",
    "season": [
      "automne",
      "hiver",
      "toute saison"
    ],
    "cover": "alt1",
    "skillIds": [
      "bouillon",
      "oeufs",
      "assaisonnement",
      "menu"
    ],
    "description": "Un bol rapide pour travailler bouillon, umami, garnitures et timing.",
    "objective": "Construire un bol complet avec un bouillon goûteux et des garnitures bien préparées.",
    "successSigns": [
      "Bouillon équilibré",
      "Nouilles non molles",
      "Garnitures contrastées"
    ],
    "ingredients": [
      "Nouilles ramen",
      "Bouillon",
      "Miso",
      "Sauce soja",
      "Œuf",
      "Champignons",
      "Épinards ou pak choï",
      "Ciboule"
    ],
    "tools": [
      "Casserole",
      "Bol",
      "Écumoire"
    ],
    "steps": [
      {
        "title": "Cuire l'œuf",
        "instruction": "Cuis un œuf mollet puis refroidis-le.",
        "why": "Un œuf mollet apporte richesse et texture.",
        "timer": 390
      },
      {
        "title": "Préparer le bouillon",
        "instruction": "Chauffe le bouillon, ajoute soja puis dissous le miso hors forte ébullition.",
        "why": "Le miso garde mieux son parfum quand il ne bout pas fortement."
      },
      {
        "title": "Cuire les garnitures",
        "instruction": "Ajoute champignons et légumes quelques minutes.",
        "why": "Les légumes doivent rester distincts et non surcuits.",
        "timer": 240
      },
      {
        "title": "Cuire les nouilles",
        "instruction": "Cuis les nouilles séparément ou dans le bouillon selon le type.",
        "why": "Les nouilles trop cuites rendent le bol lourd.",
        "timer": 180
      },
      {
        "title": "Assembler",
        "instruction": "Verse bouillon, nouilles, garnitures, œuf et ciboule.",
        "why": "L'assemblage final doit préserver les textures."
      }
    ]
  },
  {
    "id": "r-pad-thai-simplifie",
    "title": "Pad thaï simplifié",
    "category": "monde",
    "level": 3,
    "duration": 35,
    "cost": "medium",
    "season": [
      "toute saison"
    ],
    "cover": "alt2",
    "skillIds": [
      "organisation",
      "saisir",
      "assaisonnement",
      "epices"
    ],
    "description": "Une version accessible pour travailler mise en place, feu vif et équilibre sucré-salé-acide.",
    "objective": "Obtenir des nouilles souples, non collantes, avec une sauce équilibrée.",
    "successSigns": [
      "Nouilles séparées",
      "Sauce absorbée",
      "Citron vert perceptible"
    ],
    "ingredients": [
      "Nouilles de riz",
      "Œufs",
      "Tofu ou crevettes",
      "Pousses de soja",
      "Cacahuètes",
      "Sauce soja",
      "Tamarin ou citron vert",
      "Sucre",
      "Ail"
    ],
    "tools": [
      "Wok ou grande poêle",
      "Bol",
      "Spatule"
    ],
    "steps": [
      {
        "title": "Préparer la sauce",
        "instruction": "Mélange soja, acidité et sucre avant cuisson.",
        "why": "Au wok, tout va vite. La sauce doit être prête."
      },
      {
        "title": "Assouplir les nouilles",
        "instruction": "Réhydrate les nouilles selon le paquet en les gardant un peu fermes.",
        "why": "Elles finiront de cuire dans la poêle."
      },
      {
        "title": "Saisir la protéine",
        "instruction": "Fais sauter tofu ou crevettes avec ail, puis réserve.",
        "why": "Réserver évite de surcuire pendant la suite.",
        "timer": 240
      },
      {
        "title": "Cuire œufs et nouilles",
        "instruction": "Brouille les œufs, ajoute les nouilles et la sauce, puis mélange vivement.",
        "why": "La sauce doit enrober et être absorbée.",
        "timer": 240
      },
      {
        "title": "Finir croquant",
        "instruction": "Ajoute pousses, cacahuètes et citron vert.",
        "why": "Le croquant et l'acidité équilibrent le plat."
      }
    ]
  },
  {
    "id": "r-couscous-legumes-express",
    "title": "Couscous de légumes express",
    "category": "vege",
    "level": 2,
    "duration": 40,
    "cost": "low",
    "season": [
      "automne",
      "hiver",
      "printemps"
    ],
    "cover": "alt3",
    "skillIds": [
      "legumes",
      "epices",
      "mijoter",
      "assaisonnement"
    ],
    "description": "Un plat généreux pour travailler bouillon épicé, légumes et semoule.",
    "objective": "Obtenir des légumes cuits mais entiers et une semoule légère.",
    "successSigns": [
      "Bouillon parfumé",
      "Légumes non écrasés",
      "Semoule égrainée"
    ],
    "ingredients": [
      "Carottes",
      "Courgettes ou navets",
      "Pois chiches",
      "Tomate",
      "Ras el-hanout",
      "Semoule",
      "Huile d'olive",
      "Sel"
    ],
    "tools": [
      "Casserole",
      "Bol",
      "Fourchette"
    ],
    "steps": [
      {
        "title": "Torréfier les épices",
        "instruction": "Fais revenir l'oignon et les épices dans l'huile.",
        "why": "Le gras extrait les arômes.",
        "timer": 120
      },
      {
        "title": "Mijoter les légumes",
        "instruction": "Ajoute tomate, légumes fermes, pois chiches et eau.",
        "why": "Les légumes fermes ont besoin de plus de temps.",
        "timer": 1500
      },
      {
        "title": "Préparer la semoule",
        "instruction": "Verse de l'eau bouillante salée sur la semoule, couvre puis égraine.",
        "why": "Égrainer sépare les grains.",
        "timer": 300
      },
      {
        "title": "Ajuster",
        "instruction": "Goûte le bouillon et corrige sel, épices ou citron.",
        "why": "Un bon couscous dépend surtout de la qualité du bouillon."
      }
    ]
  },
  {
    "id": "r-lasagnes-legumes",
    "title": "Lasagnes aux légumes",
    "category": "vege",
    "level": 3,
    "duration": 75,
    "cost": "medium",
    "season": [
      "toute saison"
    ],
    "cover": "alt4",
    "skillIds": [
      "legumes",
      "liaison",
      "four",
      "reduire"
    ],
    "description": "Une recette complète pour travailler sauce tomate réduite, béchamel et montage.",
    "objective": "Créer des couches nettes, une sauce pas trop liquide et un gratin doré.",
    "successSigns": [
      "Tenue à la découpe",
      "Légumes fondants",
      "Dessus gratiné"
    ],
    "ingredients": [
      "Feuilles de lasagne",
      "Courgette",
      "Aubergine ou champignons",
      "Tomate concassée",
      "Oignon",
      "Béchamel",
      "Fromage",
      "Herbes"
    ],
    "tools": [
      "Poêle",
      "Casserole",
      "Plat à gratin",
      "Four"
    ],
    "steps": [
      {
        "title": "Réduire la tomate",
        "instruction": "Fais revenir oignon puis tomate jusqu'à sauce épaisse.",
        "why": "Une sauce trop liquide détrempe les lasagnes.",
        "timer": 900
      },
      {
        "title": "Cuire les légumes",
        "instruction": "Poêle les légumes pour évaporer leur eau.",
        "why": "Les légumes crus rendent beaucoup d'eau au four.",
        "timer": 600
      },
      {
        "title": "Monter les couches",
        "instruction": "Alterner tomate, pâte, légumes, béchamel et fromage.",
        "why": "Des couches fines cuisent mieux qu'un gros bloc."
      },
      {
        "title": "Cuire et reposer",
        "instruction": "Enfourne puis laisse reposer 10 minutes avant de couper.",
        "why": "Le repos stabilise les couches.",
        "timer": 2700
      }
    ]
  },
  {
    "id": "r-carbonara-sans-creme",
    "title": "Pâtes carbonara sans crème",
    "category": "classique",
    "level": 3,
    "duration": 25,
    "cost": "medium",
    "season": [
      "toute saison"
    ],
    "cover": "alt1",
    "skillIds": [
      "emulsion",
      "oeufs",
      "assaisonnement"
    ],
    "description": "Un classique italien pour comprendre chaleur résiduelle, émulsion et liaison œuf-fromage.",
    "objective": "Obtenir une sauce crémeuse sans brouiller les œufs.",
    "successSigns": [
      "Sauce nappante",
      "Œufs non coagulés",
      "Poivre présent"
    ],
    "ingredients": [
      "180 g spaghetti",
      "2 jaunes + 1 œuf",
      "Pecorino ou parmesan",
      "Guanciale ou lardons",
      "Poivre",
      "Sel"
    ],
    "tools": [
      "Casserole",
      "Poêle",
      "Bol",
      "Pince"
    ],
    "steps": [
      {
        "title": "Préparer la liaison",
        "instruction": "Mélange œufs, fromage râpé et poivre dans un bol.",
        "why": "La sauce doit être prête avant les pâtes."
      },
      {
        "title": "Rendre le gras",
        "instruction": "Fais dorer guanciale ou lardons doucement.",
        "why": "Le gras servira à parfumer et lier la sauce.",
        "timer": 480
      },
      {
        "title": "Cuire les pâtes",
        "instruction": "Cuis les pâtes al dente et garde de l'eau de cuisson.",
        "why": "L'amidon aide l'émulsion.",
        "timer": 600
      },
      {
        "title": "Lier hors du feu",
        "instruction": "Mélange pâtes, gras, un peu d'eau puis œufs-fromage hors du feu.",
        "why": "Trop chaud, les œufs brouillent. Tiède et humide, ils nappent."
      }
    ]
  },
  {
    "id": "r-mayonnaise-main",
    "title": "Mayonnaise montée à la main",
    "category": "technique",
    "level": 3,
    "duration": 12,
    "cost": "low",
    "season": [
      "toute saison"
    ],
    "cover": "alt2",
    "skillIds": [
      "emulsion",
      "assaisonnement"
    ],
    "description": "Une sauce froide fondamentale pour comprendre émulsion stable et rattrapage.",
    "objective": "Monter une émulsion ferme sans robot.",
    "successSigns": [
      "Texture ferme",
      "Brillance",
      "Goût équilibré"
    ],
    "ingredients": [
      "1 jaune d'œuf",
      "1 c. à café moutarde",
      "Huile neutre",
      "Vinaigre ou citron",
      "Sel",
      "Poivre"
    ],
    "tools": [
      "Bol",
      "Fouet"
    ],
    "steps": [
      {
        "title": "Stabiliser la base",
        "instruction": "Mélange jaune, moutarde, sel et quelques gouttes d'acide.",
        "why": "La moutarde et le jaune aident à stabiliser l'émulsion."
      },
      {
        "title": "Ajouter l'huile goutte à goutte",
        "instruction": "Verse l'huile très lentement au début en fouettant sans arrêt.",
        "why": "Le départ est la phase la plus fragile.",
        "timer": 180
      },
      {
        "title": "Augmenter le débit",
        "instruction": "Quand la sauce épaissit, ajoute l'huile en filet plus régulier.",
        "why": "Une émulsion déjà formée accepte mieux l'huile."
      },
      {
        "title": "Corriger",
        "instruction": "Ajoute citron, sel ou un peu d'eau si la mayonnaise est trop ferme.",
        "why": "L'eau détend, l'acide réveille."
      }
    ]
  },
  {
    "id": "r-crepes",
    "title": "Crêpes fines",
    "category": "dessert",
    "level": 1,
    "duration": 35,
    "cost": "low",
    "season": [
      "toute saison"
    ],
    "cover": "alt3",
    "skillIds": [
      "pate",
      "patisserie",
      "oeufs"
    ],
    "description": "Une base simple pour travailler pâte fluide, repos et cuisson régulière.",
    "objective": "Obtenir des crêpes fines, souples et peu grumeleuses.",
    "successSigns": [
      "Pâte lisse",
      "Bords dorés",
      "Crêpes souples"
    ],
    "ingredients": [
      "250 g farine",
      "3 œufs",
      "50 cl lait",
      "1 pincée sel",
      "Beurre fondu optionnel",
      "Sucre optionnel"
    ],
    "tools": [
      "Saladier",
      "Fouet",
      "Poêle ou crêpière",
      "Louche"
    ],
    "steps": [
      {
        "title": "Faire un puits",
        "instruction": "Mets la farine et le sel dans un bol, ajoute les œufs au centre.",
        "why": "Incorporer progressivement limite les grumeaux."
      },
      {
        "title": "Détendre au lait",
        "instruction": "Verse le lait petit à petit en fouettant.",
        "why": "Le liquide progressif donne une pâte plus lisse."
      },
      {
        "title": "Reposer",
        "instruction": "Laisse reposer la pâte si possible.",
        "why": "Le repos hydrate la farine et donne des crêpes plus souples.",
        "timer": 1800
      },
      {
        "title": "Cuire finement",
        "instruction": "Verse une petite louche dans la poêle chaude et étale vite.",
        "why": "La finesse dépend de la quantité et de la rotation de la poêle.",
        "timer": 90
      }
    ]
  },
  {
    "id": "r-mousse-chocolat",
    "title": "Mousse au chocolat classique",
    "category": "dessert",
    "level": 2,
    "duration": 25,
    "cost": "low",
    "season": [
      "toute saison"
    ],
    "cover": "alt4",
    "skillIds": [
      "patisserie",
      "oeufs",
      "assaisonnement"
    ],
    "description": "Un dessert école pour comprendre fonte du chocolat, blancs montés et incorporation.",
    "objective": "Obtenir une mousse aérienne sans casser les blancs.",
    "successSigns": [
      "Texture mousseuse",
      "Chocolat non granuleux",
      "Goût intense"
    ],
    "ingredients": [
      "150 g chocolat noir",
      "4 œufs",
      "1 pincée sel",
      "Sucre optionnel"
    ],
    "tools": [
      "Bain-marie ou micro-ondes doux",
      "Bols",
      "Fouet ou batteur",
      "Spatule"
    ],
    "steps": [
      {
        "title": "Fondre doucement",
        "instruction": "Fais fondre le chocolat sans le surchauffer.",
        "why": "Un chocolat trop chaud peut figer au contact des œufs.",
        "timer": 180
      },
      {
        "title": "Séparer les œufs",
        "instruction": "Ajoute les jaunes au chocolat tiédi.",
        "why": "Le chocolat doit être tiède, pas brûlant."
      },
      {
        "title": "Monter les blancs",
        "instruction": "Monte les blancs avec une pincée de sel jusqu'à texture ferme mais souple.",
        "why": "Des blancs trop cassants s'incorporent moins bien."
      },
      {
        "title": "Incorporer",
        "instruction": "Ajoute d'abord un tiers des blancs, puis le reste délicatement.",
        "why": "Le premier tiers détend la masse, le reste apporte l'air."
      },
      {
        "title": "Reposer au froid",
        "instruction": "Réfrigère avant dégustation.",
        "why": "Le froid stabilise la mousse.",
        "timer": 7200
      }
    ]
  },
  {
    "id": "r-gateau-yaourt",
    "title": "Gâteau au yaourt amélioré",
    "category": "dessert",
    "level": 1,
    "duration": 45,
    "cost": "low",
    "season": [
      "toute saison"
    ],
    "cover": "alt1",
    "skillIds": [
      "patisserie",
      "four",
      "pate"
    ],
    "description": "Un dessert simple pour apprendre les ratios, la texture de pâte et la cuisson au four.",
    "objective": "Obtenir un gâteau moelleux, régulier et bien cuit au centre.",
    "successSigns": [
      "Mie souple",
      "Centre cuit",
      "Surface dorée"
    ],
    "ingredients": [
      "1 yaourt",
      "2 pots sucre",
      "3 pots farine",
      "1/2 pot huile",
      "3 œufs",
      "Levure",
      "Vanille ou zeste",
      "Sel"
    ],
    "tools": [
      "Saladier",
      "Fouet",
      "Moule",
      "Four"
    ],
    "steps": [
      {
        "title": "Mélanger les liquides",
        "instruction": "Mélange yaourt, œufs, sucre, huile et parfum.",
        "why": "Une base homogène donne une pâte régulière."
      },
      {
        "title": "Ajouter les secs",
        "instruction": "Incorpore farine, levure et sel sans trop travailler.",
        "why": "Trop mélanger peut rendre le gâteau plus dense."
      },
      {
        "title": "Cuire",
        "instruction": "Verse dans un moule graissé et cuis à four moyen.",
        "why": "Une chaleur modérée cuit le centre sans brûler les bords.",
        "timer": 2100
      },
      {
        "title": "Vérifier",
        "instruction": "Plante la lame d'un couteau : elle doit ressortir sèche ou avec quelques miettes.",
        "why": "C'est un contrôle simple de cuisson à cœur."
      }
    ]
  }
];

  recipes.forEach((recipe) => pushUnique(DATA.recipes, recipe));
})();
