(() => {
  const DATA = window.CUISINE_DATA;
  const STORAGE_KEY = "coach-cuisine-progress-v20";
  const LEGACY_STORAGE_KEYS = ["coach-cuisine-progress-v19", "coach-cuisine-progress-v18", "coach-cuisine-progress-v17", "coach-cuisine-progress-v16", "coach-cuisine-progress-v15", "coach-cuisine-progress-v14", "coach-cuisine-progress-v13", "coach-cuisine-progress-v12", "coach-cuisine-progress-v11", "coach-cuisine-progress-v10", "coach-cuisine-progress-v9", "coach-cuisine-progress-v8", "coach-cuisine-progress-v7", "coach-cuisine-progress-v4", "coach-cuisine-progress-v3", "coach-cuisine-progress-v2", "coach-cuisine-progress-v1"];
  const PRE_IMPORT_BACKUP_KEY = "coach-cuisine-pre-import-backup-v20";
  const PHOTO_DB_NAME = "coach-cuisine-photos-v1";
  const PHOTO_STORE_NAME = "photos";
  const ROUTES = ["home", "learn", "recipes", "training", "journal", "profile"];
  const MAX_IMPORT_BYTES = 8 * 1024 * 1024;
  const MAX_PHOTO_FILE_BYTES = 7 * 1024 * 1024;
  const MAX_PHOTO_DATA_URL_CHARS = 850000;

  const lessonIds = new Set(DATA.lessons.map((lesson) => lesson.id));
  const recipeIds = new Set(DATA.recipes.map((recipe) => recipe.id));
  const skillIds = new Set(DATA.skills.map((skill) => skill.id));
  const badgeIds = new Set(DATA.badges.map((badge) => badge.id));
  const drillIds = new Set([...(DATA.trainingDrills || []), ...(DATA.tasteDrills || []), ...(DATA.improvisationDrills || []), ...(DATA.techniqueLibrary || []), ...(DATA.practicalAssessments || []), ...(DATA.visualGuides || [])].map((drill) => drill.id));

  const initialProgress = loadProgress();

  let state = {
    route: getInitialRoute(),
    progress: initialProgress,
    activeFilter: "all",
    recipeSearch: "",
    recipeLevelFilter: "all",
    recipeDurationFilter: "all",
    trainingSearch: "",
    selectedLessonId: null,
    lessonMode: "lesson",
    selectedRecipeId: null,
    cooking: null,
    activeTimer: null,
    timerIntervalId: null,
    toast: null,
    pendingPhoto: null,
    quizAnswers: {},
    quizFeedback: {},
    importPreview: null
  };

  const app = document.getElementById("app");

  window.addEventListener("hashchange", () => {
    const prevRoute = state.route;
    state.route = getInitialRoute();
    if (prevRoute !== state.route) window.scrollTo({ top: 0, behavior: "instant" });
    render();
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && state.activeTimer) render();
  });

  render();
  migrateInlinePhotosFromProgress().catch((error) => console.warn("Migration photos IndexedDB impossible", error));
  registerServiceWorker();

  function defaultProgress() {
    return {
      schemaVersion: 20,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      xp: 0,
      xpHistory: [],
      streak: {
        current: 0,
        best: 0,
        lastActivityLocalDate: null
      },
      completedLessons: [],
      lessonResults: {},
      completedRecipes: [],
      favoriteRecipes: [],
      plannedRecipes: [],
      recipeCovers: {},
      completedDrills: [],
      recipeStats: {},
      masteredSkills: {},
      skillEvidence: {},
      badges: [],
      recipeLogs: [],
      activeSession: null,
      preferences: {
        onboardingDone: false,
        firstName: "Nicolas",
        goal: "devenir très bon en cuisine",
        weeklyGoal: 3,
        availableTime: "30-45 min",
        currentLevel: "debutant",
        preferredCategories: [],
        equipment: []
      }
    };
  }

  function getInitialRoute() {
    const hash = window.location.hash.replace("#", "");
    return ROUTES.includes(hash) ? hash : "home";
  }

  function loadProgress() {
    try {
      const rawCurrent = localStorage.getItem(STORAGE_KEY);
      if (rawCurrent) return normalizeProgress(JSON.parse(rawCurrent));

      for (const legacyKey of LEGACY_STORAGE_KEYS) {
        const rawLegacy = localStorage.getItem(legacyKey);
        if (!rawLegacy) continue;
        const migrated = normalizeProgress(JSON.parse(rawLegacy));
        migrated.schemaVersion = 20;
        return migrated;
      }

      return defaultProgress();
    } catch (error) {
      console.warn("Progression illisible, réinitialisation locale.", error);
      return defaultProgress();
    }
  }

  function normalizeProgress(input) {
    const base = defaultProgress();
    const source = input && typeof input === "object" ? input : {};
    const completedLessons = cleanIdArray(source.completedLessons, lessonIds, 500);
    const completedRecipes = cleanIdArray(source.completedRecipes, recipeIds, 500);
    const favoriteRecipes = cleanIdArray(source.favoriteRecipes, recipeIds, 500);
    const plannedRecipes = cleanIdArray(source.plannedRecipes, recipeIds, 500);
    const completedDrills = cleanIdArray(source.completedDrills, drillIds, 500);
    const badges = cleanIdArray(source.badges, badgeIds, 200);

    const progress = {
      ...base,
      schemaVersion: 20,
      createdAt: validIso(source.createdAt) || base.createdAt,
      updatedAt: validIso(source.updatedAt) || base.updatedAt,
      xp: clampNumber(source.xp, 0, 100000, 0),
      xpHistory: sanitizeXpHistory(source.xpHistory),
      streak: normalizeStreak(source.streak, source.lastActivityDate),
      completedLessons,
      lessonResults: sanitizeLessonResults(source.lessonResults),
      completedRecipes,
      favoriteRecipes,
      plannedRecipes,
      recipeCovers: sanitizeRecipeCovers(source.recipeCovers),
      completedDrills,
      recipeStats: sanitizeRecipeStats(source.recipeStats),
      masteredSkills: sanitizeSkillScores(source.masteredSkills),
      skillEvidence: sanitizeSkillEvidence(source.skillEvidence),
      badges,
      recipeLogs: sanitizeRecipeLogs(source.recipeLogs),
      activeSession: sanitizeActiveSession(source.activeSession || source.currentSession),
      preferences: {
        ...base.preferences,
        ...(source.preferences && typeof source.preferences === "object" ? source.preferences : {})
      }
    };

    progress.preferences.onboardingDone = Boolean(progress.preferences.onboardingDone);
    progress.preferences.firstName = sanitizeText(progress.preferences.firstName, 40) || "Nicolas";
    progress.preferences.goal = sanitizeText(progress.preferences.goal, 120) || "devenir très bon en cuisine";
    progress.preferences.weeklyGoal = clampNumber(progress.preferences.weeklyGoal, 1, 7, 3);
    progress.preferences.availableTime = sanitizeText(progress.preferences.availableTime, 40) || "30-45 min";
    progress.preferences.currentLevel = sanitizeText(progress.preferences.currentLevel, 40) || "debutant";
    progress.preferences.preferredCategories = Array.isArray(progress.preferences.preferredCategories)
      ? progress.preferences.preferredCategories.map((v) => sanitizeText(v, 40)).filter(Boolean).slice(0, 20)
      : [];
    progress.preferences.equipment = Array.isArray(progress.preferences.equipment)
      ? progress.preferences.equipment.map((v) => sanitizeText(v, 60)).filter(Boolean).slice(0, 40)
      : [];

    return progress;
  }

  function normalizeStreak(streak, legacyLastActivityDate) {
    if (typeof streak === "number") {
      return {
        current: clampNumber(streak, 0, 999, 0),
        best: clampNumber(streak, 0, 999, 0),
        lastActivityLocalDate: sanitizeLocalDate(legacyLastActivityDate)
      };
    }
    const input = streak && typeof streak === "object" ? streak : {};
    const current = clampNumber(input.current, 0, 999, 0);
    return {
      current,
      best: Math.max(current, clampNumber(input.best, 0, 999, current)),
      lastActivityLocalDate: sanitizeLocalDate(input.lastActivityLocalDate || legacyLastActivityDate)
    };
  }

  function sanitizeLessonResults(input) {
    const output = {};
    if (!input || typeof input !== "object") return output;
    Object.entries(input).forEach(([id, value]) => {
      if (!lessonIds.has(id) || !value || typeof value !== "object") return;
      output[id] = {
        status: value.status === "completed" ? "completed" : "started",
        bestScore: clampNumber(value.bestScore, 0, 100, 0),
        attempts: clampNumber(value.attempts, 0, 999, 0),
        lastCompletedAt: validIso(value.lastCompletedAt) || null,
        nextReviewLocalDate: sanitizeLocalDate(value.nextReviewLocalDate)
      };
    });
    return output;
  }

  function sanitizeRecipeStats(input) {
    const output = {};
    if (!input || typeof input !== "object") return output;
    Object.entries(input).forEach(([id, value]) => {
      if (!recipeIds.has(id) || !value || typeof value !== "object") return;
      output[id] = {
        attempts: clampNumber(value.attempts, 0, 999, 0),
        bestRating: clampNumber(value.bestRating, 0, 5, 0),
        lastCookedAt: validIso(value.lastCookedAt) || null,
        lastDifficulty: clampNumber(value.lastDifficulty, 0, 5, 0),
        lastErrorType: sanitizeText(value.lastErrorType, 60)
      };
    });
    return output;
  }

  function sanitizeSkillScores(input) {
    const output = {};
    if (!input || typeof input !== "object") return output;
    Object.entries(input).forEach(([id, score]) => {
      if (!skillIds.has(id)) return;
      output[id] = roundOne(clampNumber(score, 0, 5, 0));
    });
    return output;
  }


  function sanitizeSkillEvidence(input) {
    const output = {};
    if (!input || typeof input !== "object") return output;
    Object.entries(input).forEach(([id, value]) => {
      if (!skillIds.has(id) || !value || typeof value !== "object") return;
      output[id] = {
        theory: clampNumber(value.theory, 0, 20, 0),
        quiz: clampNumber(value.quiz, 0, 20, 0),
        practice: clampNumber(value.practice, 0, 50, 0),
        repeat: clampNumber(value.repeat, 0, 50, 0),
        correction: clampNumber(value.correction, 0, 30, 0),
        assessment: clampNumber(value.assessment, 0, 30, 0),
        lastEvidenceAt: validIso(value.lastEvidenceAt) || null
      };
    });
    return output;
  }

  function sanitizeRecipeLogs(input) {
    if (!Array.isArray(input)) return [];
    return input.slice(0, 300).map((log) => {
      if (!log || typeof log !== "object") return null;
      const recipeId = sanitizeId(log.recipeId);
      if (!recipeIds.has(recipeId)) return null;
      const safePhoto = sanitizePhotoDataUrl(log.photoDataUrl);
      const photoId = sanitizeId(log.photoId);
      return {
        id: sanitizeId(log.id) || `log-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        recipeId,
        date: validIso(log.date) || new Date().toISOString(),
        rating: clampNumber(log.rating, 1, 5, 3),
        difficulty: clampNumber(log.difficulty, 1, 5, 3),
        comment: sanitizeText(log.comment, 1200),
        nextFocus: sanitizeText(log.nextFocus, 500),
        errorType: sanitizeText(log.errorType, 60),
        evaluation: sanitizeEvaluation(log.evaluation),
        photoId,
        photoDataUrl: safePhoto,
        photoOmitted: Boolean(log.photoOmitted && !safePhoto && !photoId),
        skillIds: cleanIdArray(log.skillIds, skillIds, 20)
      };
    }).filter(Boolean);
  }

  function sanitizeActiveSession(input) {
    if (!input || typeof input !== "object") return null;
    const recipeId = sanitizeId(input.recipeId);
    const recipe = getRecipe(recipeId);
    if (!recipe) return null;
    return {
      recipeId,
      stepIndex: clampNumber(input.stepIndex, 0, recipe.steps.length, 0),
      startedAt: validIso(input.startedAt) || new Date().toISOString(),
      updatedAt: validIso(input.updatedAt) || new Date().toISOString(),
      checkedItems: input.checkedItems && typeof input.checkedItems === "object" ? sanitizeBooleanMap(input.checkedItems, 200) : {},
      stepNotes: input.stepNotes && typeof input.stepNotes === "object" ? sanitizeTextMap(input.stepNotes, 500, 50) : {}
    };
  }

  function sanitizeRecipeCovers(input) {
    const output = {};
    if (!input || typeof input !== "object") return output;
    Object.entries(input).forEach(([recipeId, photoId]) => {
      const safeRecipeId = sanitizeId(recipeId);
      const safePhotoId = sanitizeId(photoId);
      if (recipeIds.has(safeRecipeId) && safePhotoId) output[safeRecipeId] = safePhotoId;
    });
    return output;
  }

  function sanitizeXpHistory(input) {
    if (!Array.isArray(input)) return [];
    return input.slice(-500).map((item) => {
      if (!item || typeof item !== "object") return null;
      return {
        amount: clampNumber(item.amount, -500, 1000, 0),
        reason: sanitizeText(item.reason, 120),
        date: validIso(item.date) || new Date().toISOString(),
        localDate: sanitizeLocalDate(item.localDate) || localDateKey()
      };
    }).filter(Boolean);
  }

  function sanitizeBooleanMap(input, maxEntries) {
    const output = {};
    Object.entries(input).slice(0, maxEntries).forEach(([key, value]) => {
      const safeKey = sanitizeText(key, 80);
      if (safeKey) output[safeKey] = Boolean(value);
    });
    return output;
  }

  function sanitizeTextMap(input, maxLength, maxEntries) {
    const output = {};
    Object.entries(input).slice(0, maxEntries).forEach(([key, value]) => {
      const safeKey = sanitizeText(key, 80);
      const safeValue = sanitizeText(value, maxLength);
      if (safeKey && safeValue) output[safeKey] = safeValue;
    });
    return output;
  }

  function sanitizeEvaluation(input) {
    const keys = ["organisation", "cuisson", "assaisonnement", "texture", "dressage"];
    const output = {};
    if (!input || typeof input !== "object") return output;
    keys.forEach((key) => {
      const value = clampNumber(input[key], 0, 5, 0);
      if (value) output[key] = value;
    });
    return output;
  }

  function saveProgress() {
    state.progress.updatedAt = new Date().toISOString();
    const serialized = JSON.stringify(stripInlinePhotosForStorage(state.progress));
    const ok = safeSetLocalStorage(STORAGE_KEY, serialized);
    if (!ok) {
      setToast("Sauvegarde locale impossible : données trop volumineuses. Lance un export léger puis allège le journal.");
    }
    return ok;
  }

  function stripInlinePhotosForStorage(progress) {
    const safe = normalizeProgress(progress);
    safe.recipeLogs = safe.recipeLogs.map((log) => ({
      ...log,
      photoDataUrl: null,
      photoOmitted: Boolean(log.photoOmitted && !log.photoId)
    }));
    return safe;
  }

  function safeSetLocalStorage(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error("Échec localStorage", error);
      return false;
    }
  }

  function localDateKey(date = new Date()) {
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return localDateKey(new Date());
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function addDaysLocalDate(localDate, days) {
    const [year, month, day] = String(localDate || localDateKey()).split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + days);
    return localDateKey(date);
  }

  function yesterdayLocalKey() {
    return addDaysLocalDate(localDateKey(), -1);
  }

  function markActivity() {
    const today = localDateKey();
    const streak = state.progress.streak;
    if (streak.lastActivityLocalDate === today) return;
    if (streak.lastActivityLocalDate === yesterdayLocalKey()) {
      streak.current += 1;
    } else {
      streak.current = 1;
    }
    streak.best = Math.max(streak.best, streak.current);
    streak.lastActivityLocalDate = today;
    if (streak.current >= 7) awardBadge("week-streak");
  }

  function addXp(amount, reason = "progression") {
    const safeAmount = clampNumber(amount, -500, 1000, 0);
    if (!safeAmount) return;
    markActivity();
    state.progress.xp = clampNumber(state.progress.xp + safeAmount, 0, 100000, 0);
    state.progress.xpHistory.push({
      amount: safeAmount,
      reason: sanitizeText(reason, 120),
      date: new Date().toISOString(),
      localDate: localDateKey()
    });
    state.progress.xpHistory = state.progress.xpHistory.slice(-500);
    saveProgress();
  }

  function awardBadge(id) {
    if (!badgeIds.has(id)) return;
    if (!state.progress.badges.includes(id)) {
      state.progress.badges.push(id);
      setToast(`Badge débloqué : ${getBadge(id)?.name || id}`);
    }
  }


  function computeSkillScore(id) {
    const e = state.progress.skillEvidence[id] || {};
    const weights = DATA.masteryModel?.v19?.evidenceWeights || { theory: 0.8, quiz: 0.9, practice: 1.1, repeat: 1.2, correction: 1.3, assessment: 1.5 };
    let raw = 0;
    raw += Math.min(1, e.theory || 0) * weights.theory;
    raw += Math.min(1, e.quiz || 0) * weights.quiz;
    raw += Math.min(2, e.practice || 0) * weights.practice;
    raw += Math.min(2, e.repeat || 0) * weights.repeat;
    raw += Math.min(2, e.correction || 0) * weights.correction;
    raw += Math.min(2, e.assessment || 0) * weights.assessment;
    const hasBase = (e.theory || 0) > 0 && (e.quiz || 0) > 0;
    const hasPractice = (e.practice || 0) > 0;
    const hasRepeat = (e.repeat || 0) > 0;
    const hasCorrection = (e.correction || 0) > 0;
    const hasAssessment = (e.assessment || 0) > 0;
    let cap = 1;
    if (hasBase) cap = 2;
    if (hasBase && hasPractice) cap = 3;
    if (hasBase && hasPractice && hasRepeat && hasCorrection) cap = 4;
    if (hasBase && hasPractice && hasRepeat && hasCorrection && hasAssessment) cap = 5;
    return roundOne(Math.min(cap, raw / 1.55));
  }

  function recordSkillEvidence(skillIdList, type = "practice", amount = 1) {
    const allowed = new Set(["theory", "quiz", "practice", "repeat", "correction", "assessment"]);
    const evidenceType = allowed.has(type) ? type : "practice";
    state.progress.skillEvidence = state.progress.skillEvidence || {};
    skillIdList.forEach((id) => {
      if (!skillIds.has(id)) return;
      const current = state.progress.skillEvidence[id] || { theory: 0, quiz: 0, practice: 0, repeat: 0, correction: 0, assessment: 0, lastEvidenceAt: null };
      current[evidenceType] = roundOne(clampNumber(current[evidenceType], 0, 50, 0) + amount);
      current.lastEvidenceAt = new Date().toISOString();
      state.progress.skillEvidence[id] = current;
      state.progress.masteredSkills[id] = computeSkillScore(id);
    });
  }

  function practiceSkills(skillIdList, amount = 1, evidenceType = "practice") {
    recordSkillEvidence(skillIdList, evidenceType, amount);
  }

  function getLevelInfo() {
    const sorted = DATA.levels.slice().sort((a, b) => a.minXp - b.minXp);
    let current = sorted[0];
    let next = sorted[sorted.length - 1];
    for (let i = 0; i < sorted.length; i += 1) {
      if (state.progress.xp >= sorted[i].minXp) current = sorted[i];
      if (state.progress.xp < sorted[i].minXp) {
        next = sorted[i];
        break;
      }
    }
    const currentIndex = sorted.findIndex((level) => level.name === current.name);
    const maxed = currentIndex === sorted.length - 1;
    const span = maxed ? 1 : next.minXp - current.minXp;
    const currentXp = maxed ? span : state.progress.xp - current.minXp;
    const percent = maxed ? 100 : Math.round((currentXp / span) * 100);
    return { current, next, maxed, percent, currentXp, span, rank: currentIndex + 1 };
  }

  function completedLesson(id) {
    return state.progress.completedLessons.includes(id);
  }

  function completedRecipe(id) {
    return state.progress.completedRecipes.includes(id);
  }

  function getLesson(id) {
    return DATA.lessons.find((lesson) => lesson.id === id);
  }

  function getRecipe(id) {
    return DATA.recipes.find((recipe) => recipe.id === id);
  }

  function getSkill(id) {
    return DATA.skills.find((skill) => skill.id === id);
  }

  function getBadge(id) {
    return DATA.badges.find((badge) => badge.id === id);
  }

  function getNextLesson() {
    return DATA.lessons.find((lesson) => !completedLesson(lesson.id) && isLessonUnlocked(lesson)) || DATA.lessons.find((lesson) => !completedLesson(lesson.id)) || DATA.lessons[0];
  }

  function getDueLesson() {
    const today = localDateKey();
    return DATA.lessons.find((lesson) => {
      const result = state.progress.lessonResults[lesson.id];
      return result?.status === "completed" && result.nextReviewLocalDate && result.nextReviewLocalDate <= today;
    });
  }

  function getNextRecipe() {
    const weakSkill = getWeakSkills()[0];
    if (weakSkill) {
      const related = DATA.recipes.find((recipe) => !completedRecipe(recipe.id) && recipe.skillIds.includes(weakSkill.id));
      if (related) return related;
    }
    return DATA.recipes.find((recipe) => !completedRecipe(recipe.id)) || DATA.recipes[0];
  }

  function isLessonUnlocked(lesson) {
    if (!lesson) return false;
    if (Array.isArray(lesson.prerequisiteIds) && lesson.prerequisiteIds.length) {
      return lesson.prerequisiteIds.every((id) => completedLesson(id));
    }
    const index = DATA.lessons.findIndex((item) => item.id === lesson.id);
    if (index <= 0) return true;
    const previous = DATA.lessons[index - 1];
    if (previous.module !== lesson.module) return true;
    return completedLesson(previous.id);
  }

  function getWeakSkills() {
    return DATA.skills
      .map((skill) => ({ ...skill, score: state.progress.masteredSkills[skill.id] || 0 }))
      .filter((skill) => skill.score < Math.min(3, skill.level))
      .sort((a, b) => a.score - b.score || a.level - b.level);
  }

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderRichText(value = "") {
    return escapeHtml(value)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  function escapeAttr(value = "") {
    return escapeHtml(value).replaceAll("`", "&#096;");
  }

  function render() {
    const level = getLevelInfo();
    app.innerHTML = `
      <main class="app-shell">
        ${renderTopbar(level)}
        ${renderView()}
      </main>
      ${renderBottomNav()}
      ${state.toast ? `<div class="toast">${escapeHtml(state.toast)}</div>` : ""}
      ${renderModal()}
    `;
    bindCommonEvents();
    bindViewEvents();
    hydrateLogPhotos();
  }

  function renderPreserveModalScroll() {
    const modal = document.querySelector(".modal");
    const scrollTop = modal ? modal.scrollTop : null;
    render();
    if (scrollTop !== null) {
      const nextModal = document.querySelector(".modal");
      if (nextModal) nextModal.scrollTop = scrollTop;
    }
  }

  function renderTopbar(level) {
    const xpLabel = level.maxed
      ? `${state.progress.xp} XP · max`
      : `${state.progress.xp} XP · ${level.currentXp}/${level.span} → ${escapeHtml(level.next.name)}`;
    return `
      <header class="topbar">
        <div class="brand-row">
          <div class="brand">
            <div class="brand-mark">🍳</div>
            <div>
              <h1>Coach Cuisine</h1>
              <p>${escapeHtml(level.current.name)} · niveau ${level.rank} · série ${state.progress.streak.current}j</p>
            </div>
          </div>
          <div class="topbar-xp">
            <span class="topbar-xp-label">${xpLabel}</span>
            <div class="topbar-xp-track"><div class="topbar-xp-fill" style="width:${level.percent}%"></div></div>
          </div>
        </div>
      </header>
    `;
  }

  function renderBottomNav() {
    const items = [
      ["home", "🏠", "Accueil"],
      ["learn", "🎓", "Apprendre"],
      ["recipes", "🥘", "Recettes"],
      ["training", "🎯", "Ateliers"],
      ["journal", "📷", "Journal"],
      ["profile", "⚙️", "Profil"]
    ];
    return `
      <nav class="bottom-nav" aria-label="Navigation principale">
        ${items.map(([route, icon, label]) => `
          <a class="nav-item ${state.route === route ? "active" : ""}" href="#${route}">
            <span>${icon}</span><span>${label}</span>
          </a>
        `).join("")}
      </nav>
    `;
  }

  function renderView() {
    switch (state.route) {
      case "learn": return renderLearn();
      case "recipes": return renderRecipes();
      case "training": return renderTraining();
      case "journal": return renderJournal();
      case "profile": return renderProfile();
      case "home":
      default: return renderHome();
    }
  }


  function renderOnboardingCard() {
    const prefs = state.progress.preferences;
    const categories = [
      ["quotidien", "Quotidien"],
      ["classique", "Classiques"],
      ["technique", "Techniques"],
      ["monde", "Monde"],
      ["vege", "Végé"],
      ["dessert", "Desserts"],
      ["favorites", "Favoris"],
      ["planned", "À cuisiner"]
    ];
    const equipment = ["poêle", "casserole", "four", "mixeur", "balance", "thermomètre", "robot pâtissier"];
    return `
      <section class="card onboarding-card">
        <div class="section-head">
          <div>
            <h2>Configurer ton coach</h2>
            <p>Ces préférences servent à prioriser les missions, recettes et recommandations. Tout reste local.</p>
          </div>
        </div>
        <form class="form-grid" id="onboarding-form">
          <div class="field">
            <label for="firstName">Prénom affiché</label>
            <input id="firstName" name="firstName" value="${escapeAttr(prefs.firstName || "Nicolas")}" maxlength="40" />
          </div>
          <div class="field">
            <label for="goal">Objectif</label>
            <input id="goal" name="goal" value="${escapeAttr(prefs.goal || "Devenir très bon en cuisine")}" maxlength="120" />
          </div>
          <div class="grid-two">
            <div class="field">
              <label for="currentLevel">Niveau actuel</label>
              <select id="currentLevel" name="currentLevel">
                <option value="debutant" ${prefs.currentLevel === "debutant" ? "selected" : ""}>Débutant</option>
                <option value="intermediaire" ${prefs.currentLevel === "intermediaire" ? "selected" : ""}>Intermédiaire</option>
                <option value="avance" ${prefs.currentLevel === "avance" ? "selected" : ""}>Avancé</option>
              </select>
            </div>
            <div class="field">
              <label for="weeklyGoal">Sessions / semaine</label>
              <select id="weeklyGoal" name="weeklyGoal">
                ${[1,2,3,4,5,6,7].map((n) => `<option value="${n}" ${Number(prefs.weeklyGoal) === n ? "selected" : ""}>${n}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="field">
            <label for="availableTime">Temps moyen par session</label>
            <select id="availableTime" name="availableTime">
              ${["10-15 min", "20-30 min", "30-45 min", "45-60 min", "60+ min"].map((value) => `<option value="${escapeAttr(value)}" ${prefs.availableTime === value ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label>Types de recettes prioritaires</label>
            <div class="choice-grid">
              ${categories.map(([id, label]) => `
                <label class="check-item chip-check">
                  <input type="checkbox" name="preferredCategories" value="${escapeAttr(id)}" ${prefs.preferredCategories.includes(id) ? "checked" : ""} />
                  <span>${escapeHtml(label)}</span>
                </label>
              `).join("")}
            </div>
          </div>
          <div class="field">
            <label>Matériel disponible</label>
            <div class="choice-grid">
              ${equipment.map((item) => `
                <label class="check-item chip-check">
                  <input type="checkbox" name="equipment" value="${escapeAttr(item)}" ${prefs.equipment.includes(item) ? "checked" : ""} />
                  <span>${escapeHtml(item)}</span>
                </label>
              `).join("")}
            </div>
          </div>
          <button class="btn primary full" type="submit">Enregistrer et démarrer</button>
        </form>
      </section>
    `;
  }

  function renderWeeklyProgram() {
    const prefs = state.progress.preferences;
    const program = getWeeklyProgram();
    const activeDays = countActiveDaysThisWeek();
    const percent = Math.min(100, Math.round((activeDays / Math.max(1, prefs.weeklyGoal)) * 100));
    return `
      <section class="card program-card">
        <div class="section-head">
          <div>
            <h2>Programme de la semaine</h2>
            <p>${activeDays}/${prefs.weeklyGoal} session${prefs.weeklyGoal > 1 ? "s" : ""} réalisées · objectif : ${escapeHtml(prefs.goal)}</p>
          </div>
          <span class="pill blue">${percent}%</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
        <div class="program-list">
          ${program.map(renderProgramItem).join("")}
        </div>
      </section>
    `;
  }

  function renderProgramItem(item, index) {
    const date = addDaysLocalDate(localDateKey(), index);
    const label = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "2-digit", month: "short" }).format(localDateFromKey(date));
    const target = item.type === "recipe" ? getRecipe(item.id) : getLesson(item.id);
    if (!target) return "";
    const done = item.type === "recipe" ? completedRecipe(item.id) : completedLesson(item.id);
    return `
      <article class="program-item ${done ? "done" : ""}">
        <div class="program-date">${escapeHtml(label)}</div>
        <div>
          <strong>${item.type === "review" ? "↻ " : item.type === "recipe" ? "🥘 " : "🎓 "}${escapeHtml(target.title)}</strong>
          <p>${escapeHtml(item.reason)}</p>
        </div>
        <button class="btn" ${item.type === "recipe" ? `data-open-recipe="${escapeAttr(item.id)}"` : `data-open-lesson="${escapeAttr(item.id)}"`}>${done && item.type !== "review" ? "Refaire" : "Ouvrir"}</button>
      </article>
    `;
  }

  function getWeeklyProgram() {
    const goal = clampNumber(state.progress.preferences.weeklyGoal, 1, 7, 3);
    const items = [];
    const used = new Set();
    const today = localDateKey();

    DATA.lessons.forEach((lesson) => {
      const result = state.progress.lessonResults[lesson.id];
      if (result?.status === "completed" && result.nextReviewLocalDate && result.nextReviewLocalDate <= today && items.length < goal) {
        items.push({ type: "review", id: lesson.id, reason: "Révision espacée due aujourd'hui." });
        used.add(`lesson:${lesson.id}`);
      }
    });

    DATA.lessons.forEach((lesson) => {
      if (items.length >= goal) return;
      if (completedLesson(lesson.id) || !isLessonUnlocked(lesson) || used.has(`lesson:${lesson.id}`)) return;
      items.push({ type: "lesson", id: lesson.id, reason: "Prochaine notion structurante du parcours." });
      used.add(`lesson:${lesson.id}`);
    });

    getRecommendedRecipes().forEach((recipe) => {
      if (items.length >= goal) return;
      if (used.has(`recipe:${recipe.id}`)) return;
      items.push({ type: "recipe", id: recipe.id, reason: recipe.objective || "Mise en pratique guidée." });
      used.add(`recipe:${recipe.id}`);
    });

    while (items.length < goal && DATA.recipes[items.length]) {
      const recipe = DATA.recipes[items.length];
      if (!used.has(`recipe:${recipe.id}`)) items.push({ type: "recipe", id: recipe.id, reason: "Renforcement pratique." });
      else break;
    }
    return items.slice(0, goal);
  }


  function renderCoachHero() {
    const level = getLevelInfo();
    const prefs = state.progress.preferences;
    const weak = getWeakSkills()[0];
    const mission = getDailyMissions()[0];
    const recipe = mission?.recipeId ? getRecipe(mission.recipeId) : getNextRecipe();
    const progressLabel = level.maxed ? "niveau maximal atteint" : `${level.currentXp}/${level.span} XP vers ${level.next.name}`;
    return `
      <section class="coach-hero">
        <div class="coach-hero-copy">
          <span class="eyebrow">Coach du jour</span>
          <h2>Bonjour ${escapeHtml(prefs.firstName || "Nicolas")}, travaille une compétence précise aujourd'hui.</h2>
          <p>${escapeHtml(progressLabel)} · ${state.progress.streak.current} jour${state.progress.streak.current > 1 ? "s" : ""} de série.</p>
        </div>
        <div class="coach-focus-card">
          <span class="pill yellow">Priorité</span>
          <strong>${weak ? escapeHtml(weak.name) : "Consolider les bases"}</strong>
          <p>${mission ? escapeHtml(mission.title) : "Fais une leçon courte puis une recette guidée."}</p>
          ${recipe ? `<button class="btn primary" data-open-recipe="${escapeAttr(recipe.id)}">Cuisiner la recette conseillée</button>` : ""}
        </div>
      </section>
    `;
  }

  function getDailyMissions() {
    const weakSkills = getWeakSkills();
    const weakSkill = weakSkills[0];
    const recommended = getRecommendedRecipes();
    const nextRecipe = recommended.find((recipe) => !completedRecipe(recipe.id)) || recommended[0] || getNextRecipe();
    const dueLesson = getDueLesson();
    const nextLesson = dueLesson || getNextLesson();
    const missions = [];

    if (nextLesson) {
      missions.push({
        type: dueLesson ? "review" : "lesson",
        title: dueLesson ? "Réviser une notion due" : "Micro-leçon du jour",
        description: nextLesson.summary,
        xp: dueLesson ? 12 : nextLesson.xp,
        lessonId: nextLesson.id
      });
    }

    if (nextRecipe) {
      missions.push({
        type: "recipe",
        title: weakSkill ? `Pratiquer : ${weakSkill.name}` : "Recette d'application",
        description: nextRecipe.objective || nextRecipe.description,
        xp: 70,
        recipeId: nextRecipe.id
      });
    }

    const repeated = getRepeatRecipeCandidate();
    if (repeated) {
      missions.push({
        type: "repeat",
        title: "Refaire pour progresser",
        description: `Refais ${repeated.title} et compare avec ta dernière tentative.`,
        xp: 45,
        recipeId: repeated.id
      });
    }

    const diagnostic = getDiagnosticQuestion();
    if (diagnostic) {
      missions.push({
        type: "diagnostic",
        title: "Diagnostic express",
        description: diagnostic.question,
        xp: 10,
        lessonId: nextLesson?.id
      });
    }

    return missions.slice(0, 4);
  }

  function getRepeatRecipeCandidate() {
    const stats = Object.entries(state.progress.recipeStats || {})
      .map(([id, stat]) => ({ recipe: getRecipe(id), stat }))
      .filter((item) => item.recipe && item.stat?.attempts >= 1)
      .sort((a, b) => (a.stat.bestRating || 0) - (b.stat.bestRating || 0));
    return stats[0]?.recipe || null;
  }

  function getDiagnosticQuestion() {
    const pool = DATA.diagnosticQuizzes || [];
    if (!pool.length) return null;
    const index = Math.abs(simpleHash(localDateKey())) % pool.length;
    return pool[index];
  }

  function renderDailyMissions() {
    const missions = getDailyMissions();
    return `
      <section class="card mission-panel">
        <div class="section-head">
          <div>
            <h2>Missions du jour</h2>
            <p>Courtes, concrètes, orientées progression réelle.</p>
          </div>
          <span class="pill blue">${missions.length}</span>
        </div>
        <div class="mission-grid">
          ${missions.map(renderMissionCard).join("")}
        </div>
      </section>
    `;
  }

  function renderMissionCard(mission) {
    const icon = mission.type === "recipe" ? "🥘" : mission.type === "repeat" ? "🔁" : mission.type === "diagnostic" ? "🧠" : mission.type === "review" ? "↻" : "🎓";
    const action = mission.recipeId
      ? `<button class="btn primary" data-open-recipe="${escapeAttr(mission.recipeId)}">Ouvrir</button>`
      : mission.lessonId
        ? `<button class="btn primary" data-open-lesson="${escapeAttr(mission.lessonId)}">Ouvrir</button>`
        : "";
    return `
      <article class="mission-card ${escapeAttr(mission.type)}">
        <div class="mission-icon">${icon}</div>
        <div>
          <h3>${escapeHtml(mission.title)}</h3>
          <p>${escapeHtml(mission.description)}</p>
        </div>
        <div class="mission-footer">
          <span class="pill">+${mission.xp} XP</span>
          ${action}
        </div>
      </article>
    `;
  }

  function renderProgressMap() {
    const paths = DATA.learningPaths || buildFallbackPaths();
    return `
      <section class="card progress-map-card">
        <div class="section-head">
          <div>
            <h2>Carte de progression</h2>
            <p>Chaque monde combine leçons, recettes et boss culinaires.</p>
          </div>
        </div>
        <div class="progress-worlds">
          ${paths.map(renderProgressWorld).join("")}
        </div>
      </section>
    `;
  }

  function buildFallbackPaths() {
    const modules = [...new Set(DATA.lessons.map((lesson) => lesson.module))];
    return modules.map((moduleName, index) => ({
      id: `path-${index}`,
      title: moduleName,
      description: "Parcours généré depuis les leçons.",
      lessonIds: DATA.lessons.filter((lesson) => lesson.module === moduleName).map((lesson) => lesson.id),
      bossRecipeIds: []
    }));
  }

  function renderProgressWorld(path) {
    const lessons = (path.lessonIds || []).map(getLesson).filter(Boolean);
    const bosses = (path.bossRecipeIds || []).map(getRecipe).filter(Boolean);
    const total = lessons.length + bosses.length;
    const done = lessons.filter((lesson) => completedLesson(lesson.id)).length + bosses.filter((recipe) => completedRecipe(recipe.id)).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    return `
      <article class="world-card">
        <div class="world-head">
          <div>
            <span class="eyebrow">${escapeHtml(path.level || "parcours")}</span>
            <h3>${escapeHtml(path.title)}</h3>
            <p>${escapeHtml(path.description || "")}</p>
          </div>
          <span class="pill ${percent === 100 ? "green" : "blue"}">${percent}%</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
        ${renderPathDepth(path)}
        <div class="map-nodes">
          ${lessons.map((lesson, index) => renderMapNode({ type: "lesson", item: lesson, index })).join("")}
          ${bosses.map((recipe, index) => renderMapNode({ type: "boss", item: recipe, index })).join("")}
        </div>
      </article>
    `;
  }


  function renderPathDepth(path) {
    const standards = path.excellenceStandards || [];
    const drills = path.practiceDrills || [];
    const badHabits = path.badHabitsToKill || [];
    if (!standards.length && !drills.length && !badHabits.length) return "";
    return `
      <details class="path-depth">
        <summary>Ce parcours doit te faire maîtriser quoi ?</summary>
        <div class="path-depth-grid">
          ${standards.length ? `<article><strong>Standards</strong><ul>${standards.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>` : ""}
          ${drills.length ? `<article><strong>Exercices à refaire</strong><ul>${drills.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>` : ""}
          ${badHabits.length ? `<article><strong>Mauvaises habitudes à tuer</strong><ul>${badHabits.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>` : ""}
        </div>
        ${path.masteryValidation ? `<p class="micro ok"><b>Validation :</b> ${escapeHtml(path.masteryValidation)}</p>` : ""}
      </details>
    `;
  }

  function renderMapNode({ type, item, index }) {
    const done = type === "lesson" ? completedLesson(item.id) : completedRecipe(item.id);
    const unlocked = type === "boss" ? isBossUnlocked(item) : isLessonUnlocked(item);
    const label = type === "boss" ? "Boss" : `Étape ${index + 1}`;
    const data = type === "boss" ? `data-open-recipe="${escapeAttr(item.id)}"` : `data-open-lesson="${escapeAttr(item.id)}"`;
    return `
      <button class="map-node ${done ? "done" : ""} ${!unlocked ? "locked" : ""} ${type === "boss" ? "boss" : ""}" ${data} ${!unlocked ? "disabled" : ""}>
        <span>${done ? "✓" : type === "boss" ? "★" : index + 1}</span>
        <strong>${escapeHtml(label)}</strong>
        <small>${escapeHtml(item.title)}</small>
      </button>
    `;
  }

  function isBossUnlocked(recipe) {
    const path = (DATA.learningPaths || []).find((item) => (item.bossRecipeIds || []).includes(recipe.id));
    if (!path) return true;
    const lessons = (path.lessonIds || []).map(getLesson).filter(Boolean);
    return lessons.length ? lessons.every((lesson) => completedLesson(lesson.id)) : true;
  }

  function renderRecipeIntelligence(recipe) {
    const sensory = recipe.sensory || {};
    const variants = recipe.variants || [];
    const corrections = recipe.commonErrors || [];
    return `
      <section class="recipe-intel">
        ${recipe.chefNote ? `<div class="chef-note"><strong>Conseil chef</strong><p>${escapeHtml(recipe.chefNote)}</p></div>` : ""}
        ${renderSensoryBlock(sensory)}
        ${corrections.length ? `<div class="correction-grid">${corrections.slice(0, 4).map((item) => `
          <article class="correction-card">
            <strong>${escapeHtml(item.problem)}</strong>
            <p>${escapeHtml(item.fix)}</p>
          </article>`).join("")}</div>` : ""}
        ${variants.length ? `<section class="card flat"><h3>Variantes utiles</h3><div class="tags">${variants.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div></section>` : ""}
      </section>
    `;
  }

  function renderSensoryBlock(sensory) {
    const entries = [
      ["Voir", sensory.see],
      ["Entendre", sensory.hear],
      ["Sentir", sensory.smell],
      ["Toucher", sensory.touch]
    ].filter(([, value]) => value);
    if (!entries.length) return "";
    return `
      <section class="card flat sensory-block">
        <h3>Repères sensoriels</h3>
        <div class="sensory-grid">
          ${entries.map(([label, value]) => `<div><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></div>`).join("")}
        </div>
      </section>
    `;
  }


  function renderRecipeTechniqueSheet(recipe) {
    const guide = recipe.technicalGuide || {};
    const blocks = [
      ["Découpes : tailles et logique", guide.cuts],
      ["Ustensiles et pourquoi", guide.cookware],
      ["Feu, couvercle et humidité", guide.heatAndCover],
      ["Ordre d’exécution", guide.sequencing],
      ["Points de décision", guide.decisionPoints],
      ["Service et finition", guide.service]
    ].filter(([, values]) => Array.isArray(values) && values.length);
    if (!blocks.length) return "";
    return `
      <section class="card flat technique-sheet">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">fiche technique</span>
            <h3>Précisions de chef</h3>
            <p>Ce bloc répond aux questions pratiques : taille de coupe, poêle ou casserole, couvrir ou non, et pourquoi.</p>
          </div>
        </div>
        <div class="tech-grid">
          ${blocks.map(([title, values]) => `
            <article class="tech-block">
              <strong>${escapeHtml(title)}</strong>
              <ul>${values.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }


  function renderRecipePrepDetails(recipe) {
    const prep = recipe.ingredientPrep || [];
    if (!prep.length) return "";
    return `
      <section class="card flat prep-details">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">mise en place</span>
            <h3>Découpes, quantités et rôle des ingrédients</h3>
            <p>Ce bloc précise les tailles utiles et la raison culinaire. C’est souvent ici que se joue la régularité du résultat.</p>
          </div>
        </div>
        <div class="rubric-grid">
          ${prep.map((item) => `<article><strong>${escapeHtml(item.item)}</strong><p>${escapeHtml(item.prep)}</p><p class="micro"><b>Pourquoi :</b> ${escapeHtml(item.why)}</p></article>`).join("")}
        </div>
      </section>
    `;
  }

  function renderTimingPlan(recipe) {
    const plan = recipe.timingPlan || [];
    if (!plan.length) return "";
    return `
      <section class="card flat timing-plan">
        <h3>Timing de cuisine</h3>
        <div class="stage-list">
          ${plan.map((item) => `<article><strong>${escapeHtml(item.when)}</strong><p>${escapeHtml(item.action)}</p><p class="micro"><b>Point d’attention :</b> ${escapeHtml(item.watch)}</p></article>`).join("")}
        </div>
      </section>
    `;
  }

  function renderStepPrecision(step) {
    const p = step.precision || {};
    const rows = [
      ["Ustensile", p.tool],
      ["Feu", p.heat],
      ["Couvrir ?", p.cover],
      ["Taille / épaisseur", p.size],
      ["Durée utile", p.timing],
      ["Pourquoi", p.why],
      ["Signe de fin", p.done]
    ].filter(([, value]) => value);
    if (!rows.length) return "";
    return `
      <div class="step-precision">
        ${rows.map(([label, value]) => `<div><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></div>`).join("")}
      </div>
    `;
  }


  function renderMiseEnPlaceTimeline(recipe) {
    const timeline = recipe.miseEnPlaceTimeline || [];
    if (!timeline.length) return "";
    return `
      <section class="card flat mise-timeline">
        <h3>Mise en place minute par minute</h3>
        <div class="stage-list">
          ${timeline.map((item) => `<article><strong>${escapeHtml(item.time)}</strong><p>${escapeHtml(item.task)}</p><p class="micro"><b>Pourquoi :</b> ${escapeHtml(item.reason)}</p></article>`).join("")}
        </div>
      </section>`;
  }

  function renderDecisionMatrix(recipe) {
    const decisions = recipe.decisionMatrix || [];
    if (!decisions.length) return "";
    return `
      <section class="card flat decision-matrix">
        <h3>Décisions en cours de cuisson</h3>
        <div class="correction-grid">
          ${decisions.map((item) => `<article class="correction-card"><strong>${escapeHtml(item.if)}</strong><p><b>Alors :</b> ${escapeHtml(item.then)}</p><p class="micro"><b>Pourquoi :</b> ${escapeHtml(item.why)}</p></article>`).join("")}
        </div>
      </section>`;
  }

  function renderServiceAndStorage(recipe) {
    const service = recipe.serviceWindow || [];
    const storage = recipe.storageAndReheat || [];
    const shopping = recipe.shoppingQuality || [];
    if (!service.length && !storage.length && !shopping.length) return "";
    return `
      <section class="card flat service-storage">
        <h3>Service, achat et restes</h3>
        <div class="tech-grid">
          ${shopping.length ? `<article class="tech-block"><strong>Choix des produits</strong><ul>${shopping.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>` : ""}
          ${service.length ? `<article class="tech-block"><strong>Fenêtre de service</strong><ul>${service.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>` : ""}
          ${storage.length ? `<article class="tech-block"><strong>Conservation / réchauffage</strong><ul>${storage.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>` : ""}
        </div>
      </section>`;
  }


  function renderRecipeV19Deepening(recipe) {
    const gates = recipe.v19QualityGates || [];
    const rescue = recipe.v19RescueMoves || [];
    const photos = recipe.v19PhotoTargets || [];
    const tasting = recipe.v19TastingProtocol || [];
    const questions = recipe.v19ChefQuestions || [];
    const loop = recipe.v19PracticeLoop || [];
    if (!gates.length && !rescue.length && !photos.length && !tasting.length && !questions.length && !loop.length) return "";
    return `
      <section class="card flat v19-deepening">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">niveau V19</span>
            <h3>Contrôle expert de la recette</h3>
            <p>À utiliser pour passer du suivi de recette à la décision culinaire : vérifier, diagnostiquer, corriger, répéter.</p>
          </div>
        </div>
        ${gates.length ? `<h4>Portes qualité</h4><div class="gate-grid">${gates.map((gate) => `
          <article class="gate-card">
            <strong>${escapeHtml(gate.moment)}</strong>
            <p>${escapeHtml(gate.gate)}</p>
            <p class="micro warn"><b>Risque :</b> ${escapeHtml(gate.failure)}</p>
            <p class="micro ok"><b>Correction :</b> ${escapeHtml(gate.correction)}</p>
          </article>`).join("")}</div>` : ""}
        ${rescue.length ? `<h4>Plan de secours</h4><div class="correction-grid">${rescue.map((item) => `
          <article class="correction-card"><strong>${escapeHtml(item.problem)}</strong><p>${escapeHtml(item.diagnosis)}</p><p class="micro ok"><b>Action :</b> ${escapeHtml(item.action)}</p></article>`).join("")}</div>` : ""}
        ${questions.length ? `<h4>Questions de chef</h4><div class="stage-list">${questions.map((item) => `<article><strong>${escapeHtml(item.moment)}</strong><p>${escapeHtml(item.question)}</p><p class="micro"><b>Réponse attendue :</b> ${escapeHtml(item.expected)}</p></article>`).join("")}</div>` : ""}
        ${tasting.length ? `<h4>Protocole de dégustation</h4><ul class="ingredients">${tasting.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
        ${photos.length ? `<h4>Photos utiles à prendre</h4><div class="rubric-grid">${photos.map((item) => `<article><strong>${escapeHtml(item.target)}</strong><p>${escapeHtml(item.instruction)}</p><p class="micro"><b>Pourquoi :</b> ${escapeHtml(item.purpose)}</p></article>`).join("")}</div>` : ""}
        ${loop.length ? `<div class="why chef-tip"><strong>Boucle de progression :</strong><br>${loop.map(escapeHtml).join("<br>")}</div>` : ""}
      </section>`;
  }

  function renderSkillProofPanel() {
    const skills = DATA.skills || [];
    const weakest = getWeakSkills().slice(0, 6);
    const targets = weakest.length ? weakest : skills.slice(0, 6);
    const required = ["theory", "quiz", "practice", "repeat", "correction", "assessment"];
    const labels = { theory: "théorie", quiz: "quiz", practice: "pratique", repeat: "répétition", correction: "correction", assessment: "épreuve" };
    return `
      <section class="card skill-proof-panel">
        <div class="section-head"><div><h2>Plan de preuves</h2><p>Une compétence progresse seulement si elle accumule plusieurs preuves : comprendre, pratiquer, répéter, corriger et valider.</p></div></div>
        <div class="proof-grid">
          ${targets.map((skill) => {
            const ev = state.progress.skillEvidence?.[skill.id] || {};
            const missing = required.filter((key) => !(ev[key] > 0));
            const next = missing[0] || "repeat";
            const score = state.progress.masteredSkills[skill.id] || 0;
            return `<article class="proof-card">
              <div class="skill-head"><h3>${escapeHtml(skill.name)}</h3><span>${score}/5</span></div>
              <div class="progress-track"><div class="progress-fill" style="width:${Math.min(100, score * 20)}%"></div></div>
              <p class="micro"><b>Prochaine preuve :</b> ${escapeHtml(labels[next] || next)}</p>
              <div class="tags">${required.map((key) => `<span class="tag ${ev[key] > 0 ? "green-tag" : ""}">${escapeHtml(labels[key])}${ev[key] > 0 ? " ✓" : ""}</span>`).join("")}</div>
            </article>`;
          }).join("")}
        </div>
      </section>`;
  }

  function renderQualityRules() {
    const rules = DATA.qualityChecklist?.rules || [];
    if (!rules.length) return "";
    return `
      <section class="card quality-rules">
        <div class="section-head"><div><h2>Règles anti-bâclage</h2><p>Ces règles empêchent l’app de valider trop vite une compétence ou une recette.</p></div></div>
        <ul class="ingredients">${rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ul>
      </section>`;
  }

  function renderBossPanel() {
    const paths = DATA.learningPaths || [];
    const bosses = paths.flatMap((path) => (path.bossRecipeIds || []).map((id) => ({ path, recipe: getRecipe(id) }))).filter((item) => item.recipe).slice(0, 4);
    if (!bosses.length) return "";
    return `
      <section class="card boss-panel">
        <div class="section-head">
          <div>
            <h2>Boss culinaires</h2>
            <p>Défis de validation pour vérifier que la compétence tient en pratique.</p>
          </div>
        </div>
        <div class="boss-grid">
          ${bosses.map(({ path, recipe }) => `
            <article class="boss-card ${completedRecipe(recipe.id) ? "done" : ""}">
              <span class="eyebrow">${escapeHtml(path.title)}</span>
              <h3>${escapeHtml(recipe.title)}</h3>
              <p>${escapeHtml(recipe.objective || recipe.description)}</p>
              <button class="btn primary" data-open-recipe="${escapeAttr(recipe.id)}">${completedRecipe(recipe.id) ? "Refaire" : "Lancer le boss"}</button>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderHome() {
    const level = getLevelInfo();
    const dueLesson = getDueLesson();
    const nextLesson = dueLesson || getNextLesson();
    const nextRecipe = getNextRecipe();
    const lessonsDone = state.progress.completedLessons.length;
    const recipesDone = state.progress.completedRecipes.length;
    const mastered = Object.values(state.progress.masteredSkills).filter((value) => value >= 3).length;
    const activeSession = state.progress.activeSession;
    const weakSkills = getWeakSkills().slice(0, 3);

    return `
      <section class="view">
        ${!state.progress.preferences.onboardingDone ? renderOnboardingCard() : ""}
        ${renderCoachHero()}
        ${activeSession ? renderActiveSessionCard(activeSession) : ""}
        ${renderDailyMissions()}
        ${renderWeeklyProgram()}

        <section class="card">
          <div class="section-head">
            <div>
              <h2>Progression globale</h2>
              <p>${escapeHtml(level.current.name)} · ${level.maxed ? "niveau maximal atteint" : `${level.currentXp}/${level.span} XP vers ${escapeHtml(level.next.name)}`}</p>
            </div>
            <span class="pill blue">${mastered} compétences fortes</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:${level.percent}%"></div></div>
          <div class="hero-grid compact-stats">
            <div class="hero-stat"><strong>${state.progress.streak.current}j</strong><span>série active</span></div>
            <div class="hero-stat"><strong>${lessonsDone}/${DATA.lessons.length}</strong><span>leçons validées</span></div>
            <div class="hero-stat"><strong>${recipesDone}/${DATA.recipes.length}</strong><span>recettes terminées</span></div>
          </div>
        </section>

        ${renderKitchenPlan()}

        <section class="card flat">
          <div class="section-head">
            <div>
              <h2>Compétences faibles</h2>
              <p>L’app recommande les prochaines recettes à partir de ces écarts.</p>
            </div>
          </div>
          ${weakSkills.length ? `<div class="list">${weakSkills.map(renderSkillMiniCard).join("")}</div>` : `<p class="muted">Aucune compétence faible détectée pour le moment.</p>`}
        </section>

        ${renderBossPanel()}
      </section>
    `;
  }

  function renderActiveSessionCard(session) {
    const recipe = getRecipe(session.recipeId);
    if (!recipe) return "";
    const percent = Math.round((session.stepIndex / recipe.steps.length) * 100);
    return `
      <section class="card active-session">
        <div class="section-head">
          <div>
            <h2>Recette en cours</h2>
            <p>${escapeHtml(recipe.title)} · étape ${Math.min(session.stepIndex + 1, recipe.steps.length)}/${recipe.steps.length}</p>
          </div>
          <span class="pill yellow">${percent}%</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
        <div class="actions">
          <button class="btn primary" data-resume-session="1">Reprendre</button>
          <button class="btn danger" data-abandon-session="1">Abandonner</button>
        </div>
      </section>
    `;
  }

  function renderSkillMiniCard(skill) {
    const score = state.progress.masteredSkills[skill.id] || 0;
    const ev = state.progress.skillEvidence?.[skill.id] || {};
    const evidence = [ev.theory ? "théorie" : "", ev.practice ? "pratique" : "", ev.repeat ? "répétition" : "", ev.correction ? "correction" : "", ev.assessment ? "épreuve" : ""].filter(Boolean);
    return `
      <div class="skill-card compact">
        <div>
          <div class="skill-head">
            <h3>${escapeHtml(skill.name)}</h3>
            <span>${score}/5</span>
          </div>
          <p>${escapeHtml(skill.category)} · objectif ${skill.level}/5</p>
          <div class="progress-track"><div class="progress-fill" style="width:${Math.min(100, (score / 5) * 100)}%"></div></div>
          <p class="micro">Preuves : ${evidence.length ? evidence.map(escapeHtml).join(" · ") : "aucune preuve pratique enregistrée"}</p>
        </div>
      </div>
    `;
  }

  function renderLearn() {
    const modules = [...new Set(DATA.lessons.map((lesson) => lesson.module))];
    return `
      <section class="view">
        ${renderProgressMap()}
        <section class="card">
          <div class="section-head">
            <div>
              <h2>Parcours d'apprentissage</h2>
              <p>Les leçons se débloquent progressivement. Le quiz doit être réussi pour valider.</p>
            </div>
          </div>
          <div class="grid-two">
            <div class="metric"><strong>${state.progress.completedLessons.length}/${DATA.lessons.length}</strong><span>leçons terminées</span></div>
            <div class="metric"><strong>${countDueReviews()}</strong><span>révisions dues</span></div>
          </div>
        </section>

        ${modules.map((moduleName) => `
          <section class="card flat path-card">
            <div class="section-head"><h2>${escapeHtml(moduleName)}</h2></div>
            <div class="path-list">
              ${DATA.lessons.filter((lesson) => lesson.module === moduleName).map(renderLessonCard).join("")}
            </div>
          </section>
        `).join("")}
      </section>
    `;
  }

  function renderLessonCard(lesson) {
    const done = completedLesson(lesson.id);
    const unlocked = isLessonUnlocked(lesson);
    const result = state.progress.lessonResults[lesson.id];
    const due = result?.nextReviewLocalDate && result.nextReviewLocalDate <= localDateKey();
    const skillTags = lesson.skillIds.map((id) => getSkill(id)?.name).filter(Boolean);
    return `
      <article class="lesson-card path-node ${done ? "completed" : ""} ${!unlocked ? "locked" : ""} ${due ? "due" : ""}">
        <div class="lesson-top">
          <div>
            <h3 class="lesson-title">${done ? "✅ " : !unlocked ? "🔒 " : "● "}${escapeHtml(lesson.title)}</h3>
            <p class="lesson-desc">${escapeHtml(lesson.summary)}</p>
          </div>
          <span class="pill ${done ? "green" : due ? "yellow" : "primary"}">${done ? `${result?.bestScore || 100}%` : !unlocked ? "verrouillé" : `+${lesson.xp} XP`}</span>
        </div>
        <div class="tags">${skillTags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="actions">
          <button class="btn ${done || !unlocked ? "" : "primary"}" data-open-lesson="${escapeAttr(lesson.id)}" ${!unlocked ? "disabled" : ""}>${done ? "Réviser" : "Commencer"}</button>
        </div>
      </article>
    `;
  }

  function renderRecipes() {
    const filters = [
      ["all", "Toutes"],
      ["quotidien", "Quotidien"],
      ["classique", "Classiques"],
      ["technique", "Techniques"],
      ["monde", "Monde"],
      ["vege", "Végé"],
      ["dessert", "Desserts"],
      ["favorites", "Favoris"],
      ["planned", "À cuisiner"]
    ];
    const recipes = getFilteredRecipes();
    return `
      <section class="view">
        <section class="card">
          <div class="section-head">
            <div>
              <h2>Recettes guidées</h2>
              <p>Recherche par nom, ingrédient ou technique. Les filtres restent volontairement simples pour mobile.</p>
            </div>
            <span class="pill blue">${recipes.length}</span>
          </div>
          <div class="field search-field">
            <label for="recipe-search">Recherche</label>
            <input id="recipe-search" value="${escapeAttr(state.recipeSearch)}" placeholder="Ex : poulet, sauce, riz, saisir..." />
          </div>
          <div class="filters">
            ${filters.map(([id, label]) => `<button class="filter-chip ${state.activeFilter === id ? "active" : ""}" data-filter="${id}">${label}</button>`).join("")}
          </div>
          <div class="filter-row">
            <div class="field">
              <label for="recipe-level-filter">Niveau</label>
              <select id="recipe-level-filter">
                <option value="all" ${state.recipeLevelFilter === "all" ? "selected" : ""}>Tous</option>
                ${[1,2,3,4,5].map((n) => `<option value="${n}" ${String(state.recipeLevelFilter) === String(n) ? "selected" : ""}>Niveau ${n}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="recipe-duration-filter">Durée</label>
              <select id="recipe-duration-filter">
                <option value="all" ${state.recipeDurationFilter === "all" ? "selected" : ""}>Toutes</option>
                <option value="15" ${state.recipeDurationFilter === "15" ? "selected" : ""}>≤ 15 min</option>
                <option value="30" ${state.recipeDurationFilter === "30" ? "selected" : ""}>≤ 30 min</option>
                <option value="45" ${state.recipeDurationFilter === "45" ? "selected" : ""}>≤ 45 min</option>
                <option value="60" ${state.recipeDurationFilter === "60" ? "selected" : ""}>≤ 60 min</option>
              </select>
            </div>
          </div>
          <div class="actions">
            <button class="btn primary" id="apply-recipe-filters">Appliquer</button>
            <button class="btn" id="clear-recipe-filters">Réinitialiser</button>
          </div>
        </section>
        <div class="list">
          ${recipes.length ? recipes.map(renderRecipeCard).join("") : `<div class="empty-state"><h3>Aucune recette trouvée</h3><p>Élargis la recherche ou supprime un filtre.</p></div>`}
        </div>
      </section>
    `;
  }

  function getFilteredRecipes() {
    const query = normalizeSearchText(state.recipeSearch);
    return DATA.recipes.filter((recipe) => {
      if (state.activeFilter === "favorites" && !state.progress.favoriteRecipes.includes(recipe.id)) return false;
      if (state.activeFilter === "planned" && !state.progress.plannedRecipes.includes(recipe.id)) return false;
      if (!["all", "favorites", "planned"].includes(state.activeFilter) && recipe.category !== state.activeFilter) return false;
      if (state.recipeLevelFilter !== "all" && Number(recipe.level) !== Number(state.recipeLevelFilter)) return false;
      if (state.recipeDurationFilter !== "all" && Number(recipe.duration) > Number(state.recipeDurationFilter)) return false;
      if (!query) return true;
      const skillNames = recipe.skillIds.map((id) => getSkill(id)?.name || id).join(" ");
      const haystack = normalizeSearchText([
        recipe.title,
        recipe.description,
        recipe.category,
        recipe.cost,
        recipe.season?.join(" "),
        recipe.ingredients?.join(" "),
        recipe.objective,
        recipe.chefNote,
        recipe.successSigns?.join(" "),
        recipe.commonErrors?.map((item) => `${item.problem} ${item.fix}`).join(" "),
        recipe.sensory ? Object.values(recipe.sensory).join(" ") : "",
        skillNames
      ].join(" "));
      return haystack.includes(query);
    });
  }

  function getRecommendedRecipes() {
    const prefs = state.progress.preferences;
    const weakSkill = getWeakSkills()[0];
    return DATA.recipes.slice().sort((a, b) => {
      const aDone = completedRecipe(a.id) ? 20 : 0;
      const bDone = completedRecipe(b.id) ? 20 : 0;
      const aWeak = weakSkill && a.skillIds.includes(weakSkill.id) ? -10 : 0;
      const bWeak = weakSkill && b.skillIds.includes(weakSkill.id) ? -10 : 0;
      const aPref = prefs.preferredCategories.includes(a.category) ? -4 : 0;
      const bPref = prefs.preferredCategories.includes(b.category) ? -4 : 0;
      const aLevel = Math.abs(a.level - preferredLevelNumber());
      const bLevel = Math.abs(b.level - preferredLevelNumber());
      return (aDone + aWeak + aPref + aLevel) - (bDone + bWeak + bPref + bLevel) || a.duration - b.duration;
    });
  }

  function preferredLevelNumber() {
    const level = state.progress.preferences.currentLevel;
    if (level === "avance") return 4;
    if (level === "intermediaire") return 3;
    return 1;
  }

  function renderRecipeCard(recipe) {
    const done = completedRecipe(recipe.id);
    const stats = state.progress.recipeStats[recipe.id];
    const skills = recipe.skillIds.map((id) => getSkill(id)?.name).filter(Boolean);
    return `
      <article class="recipe-card">
        ${renderRecipeImage(recipe, "card")}
        <div class="recipe-top">
          <div>
            <h3 class="recipe-title">${done ? "✅ " : ""}${escapeHtml(recipe.title)}</h3>
            <p class="recipe-desc">${escapeHtml(recipe.description)}</p>
          </div>
          <span class="pill ${done ? "green" : "blue"}">Niv. ${recipe.level}</span>
        </div>
        <div class="tags">
          <span class="tag">${recipe.duration} min</span>
          <span class="tag">${escapeHtml(recipe.cost)}</span>
          <span class="tag">${escapeHtml(recipe.category)}</span>
          ${stats ? `<span class="tag">${stats.attempts} tentative${stats.attempts > 1 ? "s" : ""}</span>` : ""}
          ${skills.slice(0, 3).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="actions">
          <button class="btn primary" data-open-recipe="${escapeAttr(recipe.id)}">Voir / cuisiner</button>
          <button class="btn icon-btn" data-toggle-favorite="${escapeAttr(recipe.id)}" aria-label="Favori">${state.progress.favoriteRecipes.includes(recipe.id) ? "★" : "☆"}</button>
          <button class="btn" data-toggle-plan="${escapeAttr(recipe.id)}">${state.progress.plannedRecipes.includes(recipe.id) ? "Planifié" : "Planifier"}</button>
        </div>
      </article>
    `;
  }

  function relativeDate(iso) {
    try {
      const diffMs = Date.now() - new Date(iso).getTime();
      const diffDays = Math.floor(diffMs / 86400000);
      if (diffDays === 0) return "aujourd'hui";
      if (diffDays === 1) return "hier";
      if (diffDays < 7) return `il y a ${diffDays} jours`;
      if (diffDays < 30) return `il y a ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? "s" : ""}`;
      return formatDate(iso);
    } catch { return formatDate(iso); }
  }

  function renderJournal() {
    const logs = state.progress.recipeLogs.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    const weakness = mostCommon(logs.map((log) => log.errorType).filter(Boolean));
    const bestRating = logs.length ? Math.max(...logs.map((l) => l.rating || 0)) : 0;
    return `
      <section class="view">
        <section class="card">
          <div class="section-head">
            <div>
              <h2>Journal de cuisine</h2>
              <p>Photos, erreurs, axes de progrès et répétitions par recette.</p>
            </div>
          </div>
          <div class="grid-two">
            <div class="metric"><strong>${logs.length}</strong><span>sessions notées</span></div>
            <div class="metric"><strong>${averageRating(logs)}/5</strong><span>note moyenne</span></div>
            <div class="metric"><strong>${bestRating > 0 ? bestRating + "/5" : "—"}</strong><span>meilleur résultat</span></div>
            <div class="metric"><strong>${logs.filter((l) => l.rating >= 4).length}</strong><span>réussites (≥ 4/5)</span></div>
          </div>
          ${weakness ? `<div class="signal-card"><strong>Point faible récurrent</strong><span>${escapeHtml(labelErrorType(weakness))}</span></div>` : ""}
        </section>
        ${logs.length ? `
          <div class="list">
            ${logs.map(renderLogCard).join("")}
          </div>
        ` : `
          <div class="empty-state">
            <h3>Aucune recette documentée</h3>
            <p>Termine une recette, ajoute une photo et note ce que tu veux améliorer.</p>
          </div>
        `}
      </section>
    `;
  }

  function renderLogPhoto(log, recipe) {
    const alt = `Photo de ${recipe?.title || "recette"}`;
    if (log.photoId) {
      return `<img class="log-photo photo-loading" data-photo-id="${escapeAttr(log.photoId)}" alt="${escapeAttr(alt)}" />`;
    }
    if (log.photoDataUrl) {
      return `<img class="log-photo" src="${escapeAttr(log.photoDataUrl)}" alt="${escapeAttr(alt)}" />`;
    }
    if (log.photoOmitted) {
      return `<div class="photo-omitted">Photo omise dans cet export léger.</div>`;
    }
    return "";
  }

  function renderLogCard(log) {
    const recipe = getRecipe(log.recipeId);
    const skills = (log.skillIds || []).map((id) => getSkill(id)?.name).filter(Boolean);
    const stars = "★".repeat(log.rating || 0) + "☆".repeat(5 - (log.rating || 0));
    return `
      <article class="log-card">
        ${renderLogPhoto(log, recipe)}
        <div>
          <h3>${escapeHtml(recipe?.title || "Recette supprimée")}</h3>
          <p class="muted">${escapeHtml(relativeDate(log.date))} · <span title="${escapeAttr(formatDate(log.date))}">${escapeHtml(stars)}</span> · difficulté ${log.difficulty}/5</p>
        </div>
        ${log.errorType ? `<div class="tag red-tag">Erreur principale : ${escapeHtml(labelErrorType(log.errorType))}</div>` : ""}
        ${log.comment ? `<p>${escapeHtml(log.comment)}</p>` : ""}
        ${log.nextFocus ? `<div class="why"><strong>À travailler la prochaine fois :</strong> ${escapeHtml(log.nextFocus)}</div>` : ""}
        ${renderEvaluationSummary(log.evaluation)}
        ${skills.length ? `<div class="tags">${skills.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
        <div class="actions">
          ${recipe ? `<button class="btn primary" data-open-recipe="${escapeAttr(recipe.id)}">Refaire</button>` : ""}
          <button class="btn danger" data-delete-log="${escapeAttr(log.id)}">Supprimer</button>
        </div>
      </article>
    `;
  }


  function renderEvaluationSummary(evaluation) {
    if (!evaluation || typeof evaluation !== "object" || !Object.keys(evaluation).length) return "";
    const labels = { organisation: "Organisation", cuisson: "Cuisson", assaisonnement: "Assaisonnement", texture: "Texture", dressage: "Dressage" };
    return `<div class="evaluation-mini">${Object.entries(evaluation).map(([key, value]) => `<span>${escapeHtml(labels[key] || key)} <b>${escapeHtml(String(value))}/5</b></span>`).join("")}</div>`;
  }

  function renderKitchenPlan() {
    const planned = state.progress.plannedRecipes.map(getRecipe).filter(Boolean).slice(0, 6);
    const favoritesCount = state.progress.favoriteRecipes.length;
    if (!planned.length && !favoritesCount) return "";
    return `
      <section class="card kitchen-plan-card">
        <div class="section-head">
          <div>
            <h2>Plan de cuisine</h2>
            <p>${planned.length ? "Recettes que tu as mises de côté pour les prochaines sessions." : "Ajoute des recettes au plan depuis l’onglet Recettes."}</p>
          </div>
          <span class="pill yellow">${planned.length} planifiée${planned.length > 1 ? "s" : ""}</span>
        </div>
        ${planned.length ? `<div class="mini-recipe-row">${planned.map((recipe) => `
          <button class="mini-recipe" data-open-recipe="${escapeAttr(recipe.id)}">
            ${renderRecipeImage(recipe, "thumb")}
            <span>${escapeHtml(recipe.title)}</span>
          </button>
        `).join("")}</div>` : `<p class="muted">${favoritesCount} recette${favoritesCount > 1 ? "s" : ""} en favoris. Utilise “Planifier” pour construire ta semaine.</p>`}
      </section>
    `;
  }

  function filterTrainingDrills(items, fields) {
    const q = normalizeSearchText(state.trainingSearch);
    if (!q) return items;
    return items.filter((item) => {
      const haystack = normalizeSearchText(fields.map((f) => item[f] || "").join(" "));
      return haystack.includes(q);
    });
  }

  function renderTraining() {
    const drills = filterTrainingDrills(DATA.trainingDrills || [], ["title", "scenario", "cause", "fix"]);
    const tasteDrills = filterTrainingDrills(DATA.tasteDrills || [], ["title", "exercise", "observe"]);
    const improvisation = filterTrainingDrills(DATA.improvisationDrills || [], ["title", "constraint"]);
    const totalDrills = (DATA.trainingDrills || []).length + (DATA.tasteDrills || []).length + (DATA.improvisationDrills || []).length + (DATA.visualGuides || []).length;
    const completed = state.progress.completedDrills.length;
    const searching = Boolean(state.trainingSearch);
    return `
      <section class="view">
        <section class="training-hero card">
          <span class="eyebrow">Ateliers express</span>
          <h2>Entraîne le raisonnement culinaire, pas seulement l’exécution.</h2>
          <p>Diagnostics, goût, organisation et improvisation. Ces ateliers courts compensent la limite classique des apps de recettes : apprendre à corriger et décider.</p>
          <div class="hero-grid compact-stats">
            <div class="hero-stat"><strong>${completed}</strong><span>ateliers faits</span></div>
            <div class="hero-stat"><strong>${totalDrills}</strong><span>disponibles</span></div>
            <div class="hero-stat"><strong>${getWeakSkills()[0] ? escapeHtml(getWeakSkills()[0].name) : "Bases"}</strong><span>priorité</span></div>
          </div>
          <div class="field training-search-field" style="margin-top:14px;">
            <label for="training-search">Rechercher un atelier</label>
            <input id="training-search" value="${escapeAttr(state.trainingSearch)}" placeholder="Ex : sauce, cuisson, sel, timing..." />
          </div>
        </section>

        ${searching ? "" : renderMasteryProgram()}
        ${searching ? "" : renderSkillProofPanel()}
        ${searching ? "" : renderQualityRules()}
        ${searching ? "" : renderLongPrograms()}
        ${searching ? "" : renderTechniqueLibrary()}
        ${searching ? "" : renderPracticalAssessments()}
        ${searching ? "" : renderVisualGuides()}

        <section class="card">
          <div class="section-head"><div><h2>Diagnostics cuisine</h2><p>Comprendre une erreur et choisir la bonne correction.</p></div><span class="pill blue">${drills.length}</span></div>
          ${drills.length ? `<div class="list">${drills.map(renderDrillCard).join("")}</div>` : `<p class="muted">Aucun diagnostic correspond à la recherche.</p>`}
        </section>

        <section class="card">
          <div class="section-head"><div><h2>Travail du goût</h2><p>Petits exercices pour construire le palais : sel, acide, gras, fraîcheur, umami.</p></div><span class="pill blue">${tasteDrills.length}</span></div>
          ${tasteDrills.length ? `<div class="list">${tasteDrills.map(renderTasteDrillCard).join("")}</div>` : `<p class="muted">Aucun exercice correspond à la recherche.</p>`}
        </section>

        <section class="card">
          <div class="section-head"><div><h2>Improvisation guidée</h2><p>Apprendre à cuisiner avec contraintes et à sortir de la dépendance aux recettes.</p></div><span class="pill blue">${improvisation.length}</span></div>
          ${improvisation.length ? `<div class="list">${improvisation.map(renderImprovisationCard).join("")}</div>` : `<p class="muted">Aucun atelier correspond à la recherche.</p>`}
        </section>
      </section>
    `;
  }

  function renderMasteryProgram() {
    const stages = DATA.masteryProgram || [];
    if (!stages.length) return "";
    return `
      <section class="card mastery-program">
        <div class="section-head"><div><h2>Standards de maîtrise</h2><p>Ce que l’app considère comme une vraie montée en compétence, pas seulement une recette terminée.</p></div></div>
        <div class="mastery-stage-grid">
          ${stages.map((stage, index) => `
            <article class="mastery-stage">
              <span class="stage-index">${index + 1}</span>
              <h3>${escapeHtml(stage.title)}</h3>
              <p>${escapeHtml(stage.goal)}</p>
              <ul>${(stage.evidence || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }


  function renderLongPrograms() {
    const programs = DATA.longPrograms || [];
    if (!programs.length) return "";
    return `
      <section class="card long-programs">
        <div class="section-head"><div><h2>Programmes longs</h2><p>Des trajectoires réalistes pour passer de la répétition ponctuelle à une vraie montée en compétence.</p></div></div>
        <div class="program-grid">
          ${programs.map((program) => `
            <article class="program-card">
              <span class="eyebrow">${escapeHtml(program.duration)}</span>
              <h3>${escapeHtml(program.title)}</h3>
              <p>${escapeHtml(program.goal)}</p>
              <ul>${(program.weeklyStructure || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              <div class="why"><strong>Validation finale :</strong> ${escapeHtml(program.finalAssessment || "Réaliser un plat complet et l’analyser.")}</div>
            </article>`).join("")}
        </div>
      </section>`;
  }

  function renderTechniqueLibrary() {
    const techniques = DATA.techniqueLibrary || [];
    if (!techniques.length) return "";
    const done = new Set(state.progress.completedDrills || []);
    return `
      <section class="card technique-library">
        <div class="section-head"><div><h2>Bibliothèque de gestes</h2><p>Chaque geste est une compétence réutilisable dans plusieurs recettes. Travaille-les hors recette pour accélérer ta progression.</p></div></div>
        <div class="technique-grid">
          ${techniques.map((tech) => `
            <article class="technique-card ${done.has(tech.id) ? "done" : ""}">
              <div class="section-head compact"><div><h3>${done.has(tech.id) ? "✓ " : ""}${escapeHtml(tech.title)}</h3><p>${escapeHtml(tech.objective)}</p></div><span class="pill blue">${escapeHtml(tech.family)}</span></div>
              <div class="rubric-grid compact">
                <article><strong>Matériel</strong><p>${escapeHtml(tech.tools)}</p></article>
                <article><strong>Méthode</strong><p>${escapeHtml(tech.method)}</p></article>
                <article><strong>Erreur fréquente</strong><p>${escapeHtml(tech.commonError)}</p></article>
                <article><strong>Standard</strong><p>${escapeHtml(tech.masteryStandard)}</p></article>
              </div>
              <div class="actions"><button class="btn primary" data-complete-drill="${escapeAttr(tech.id)}">${done.has(tech.id) ? "Refaire +3 XP" : "Valider l’entraînement +12 XP"}</button></div>
            </article>`).join("")}
        </div>
      </section>`;
  }

  function renderPracticalAssessments() {
    const assessments = DATA.practicalAssessments || [];
    if (!assessments.length) return "";
    const done = new Set(state.progress.completedDrills || []);
    return `
      <section class="card practical-assessments">
        <div class="section-head"><div><h2>Épreuves pratiques</h2><p>Ces tests évitent de croire qu’une notion est acquise trop vite. Tu dois produire, observer, corriger et répéter.</p></div></div>
        <div class="assessment-grid">
          ${assessments.map((test) => `
            <article class="assessment-card ${done.has(test.id) ? "done" : ""}">
              <span class="eyebrow">${escapeHtml(test.level)}</span>
              <h3>${done.has(test.id) ? "✓ " : ""}${escapeHtml(test.title)}</h3>
              <p>${escapeHtml(test.brief)}</p>
              <ul>${(test.criteria || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
              <div class="why"><strong>À noter dans le journal :</strong> ${escapeHtml(test.journalPrompt)}</div>
              <div class="actions"><button class="btn primary" data-complete-drill="${escapeAttr(test.id)}">${done.has(test.id) ? "Refaire l’épreuve +3 XP" : "Valider l’épreuve +18 XP"}</button></div>
            </article>`).join("")}
        </div>
      </section>`;
  }


  function renderVisualGuides() {
    const guides = DATA.visualGuides || [];
    if (!guides.length) return "";
    const done = new Set(state.progress.completedDrills || []);
    return `
      <section class="card visual-guides">
        <div class="section-head"><div><h2>Repères visuels pédagogiques</h2><p>Des comparaisons concrètes pour apprendre à reconnaître le bon résultat, l’erreur et la correction.</p></div></div>
        <div class="visual-guide-grid">
          ${guides.map((guide) => `
            <article class="visual-guide-card ${done.has(guide.id) ? "done" : ""}">
              <img src="${escapeAttr(guide.image)}" alt="${escapeAttr(guide.title)}" loading="lazy" />
              <div>
                <h3>${done.has(guide.id) ? "✓ " : ""}${escapeHtml(guide.title)}</h3>
                <div class="mini-columns">
                  <article><strong>Observer</strong><ul>${(guide.observe || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
                  <article><strong>Éviter</strong><ul>${(guide.avoid || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
                </div>
                ${(guide.useIn || []).length ? `<p class="micro"><b>À utiliser dans :</b> ${guide.useIn.map(escapeHtml).join(", ")}</p>` : ""}
                <div class="actions"><button class="btn primary" data-complete-drill="${escapeAttr(guide.id)}">${done.has(guide.id) ? "Revoir +3 XP" : "Marquer comme compris +10 XP"}</button></div>
              </div>
            </article>`).join("")}
        </div>
      </section>`;
  }

  function renderDrillCard(drill) {
    const done = state.progress.completedDrills.includes(drill.id);
    const skill = getSkill(drill.skillId);
    return `
      <article class="drill-card ${done ? "done" : ""}">
        <div class="section-head">
          <div>
            <h3>${done ? "✓ " : ""}${escapeHtml(drill.title)}</h3>
            <p>${escapeHtml(drill.scenario)}</p>
          </div>
          <span class="pill ${done ? "green" : "blue"}">${skill ? escapeHtml(skill.name) : "diagnostic"}</span>
        </div>
        <div class="correction-grid">
          <article class="correction-card"><strong>Cause probable</strong><p>${escapeHtml(drill.cause)}</p></article>
          <article class="correction-card"><strong>Correction</strong><p>${escapeHtml(drill.fix)}</p></article>
        </div>
        <div class="actions"><button class="btn primary" data-complete-drill="${escapeAttr(drill.id)}">${done ? "Refaire +3 XP" : "Compris +12 XP"}</button></div>
      </article>
    `;
  }

  function renderTasteDrillCard(drill) {
    const done = state.progress.completedDrills.includes(drill.id);
    return `
      <article class="drill-card taste ${done ? "done" : ""}">
        <h3>${done ? "✓ " : ""}${escapeHtml(drill.title)}</h3>
        <p>${escapeHtml(drill.exercise)}</p>
        <div class="why"><strong>À observer :</strong> ${escapeHtml(drill.observe)}</div>
        <div class="actions"><button class="btn primary" data-complete-drill="${escapeAttr(drill.id)}">${done ? "Refaire +3 XP" : "Valider l’exercice +10 XP"}</button></div>
      </article>
    `;
  }

  function renderImprovisationCard(drill) {
    const done = state.progress.completedDrills.includes(drill.id);
    return `
      <article class="drill-card improv ${done ? "done" : ""}">
        <h3>${done ? "✓ " : ""}${escapeHtml(drill.title)}</h3>
        <p>${escapeHtml(drill.constraint)}</p>
        <ul class="ingredients">${drill.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ul>
        <div class="actions"><button class="btn primary" data-complete-drill="${escapeAttr(drill.id)}">${done ? "Refaire +3 XP" : "Faire l’atelier +15 XP"}</button></div>
      </article>
    `;
  }

  function renderRecipeImage(recipe, mode = "card") {
    const coverPhotoId = state.progress.recipeCovers?.[recipe.id];
    const url = getRecipeVisualUrl(recipe);
    const title = escapeAttr(recipe.title);
    return `
      <figure class="recipe-visual ${escapeAttr(mode)}">
        <img ${coverPhotoId ? `data-photo-id="${escapeAttr(coverPhotoId)}" data-fallback-src="${escapeAttr(url)}"` : `src="${escapeAttr(url)}"`} alt="Illustration de ${title}" loading="lazy" />
        <figcaption>${mode === "detail" ? escapeHtml(recipe.title) : ""}</figcaption>
      </figure>
    `;
  }

  function getRecipeVisualUrl(recipe) {
    return recipe.image || `assets/recipes/${sanitizeId(recipe.id)}.svg`;
  }


  function renderAdvancedRecipeCoach(recipe) {
    const brief = recipe.excellenceBrief || {};
    const specs = recipe.miseEnPlaceSpecs || [];
    const matrix = recipe.chefDecisionMatrix || [];
    const checklist = recipe.qualityChecklist || [];
    const ladder = recipe.progressionLadder || [];
    if (!brief.objective && !specs.length && !matrix.length && !checklist.length && !ladder.length) return "";
    return `
      <section class="card flat advanced-coach">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">coach avancé</span>
            <h3>Comprendre la recette comme un cuisinier</h3>
            <p>Ce bloc précise les décisions qui font progresser : taille, feu, couvercle, ordre, correction et répétabilité.</p>
          </div>
        </div>
        ${brief.objective ? `<div class="signal-card"><strong>Objectif réel</strong><span>${escapeHtml(brief.objective)}</span></div>` : ""}
        ${brief.whatYouLearn?.length ? `<div class="mini-columns"><article><strong>Ce que tu dois apprendre</strong><ul>${brief.whatYouLearn.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article></div>` : ""}
        <div class="coach-grid">
          ${brief.beforeYouStart?.length ? `<article><strong>Avant de commencer</strong><ul>${brief.beforeYouStart.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>` : ""}
          ${brief.duringCooking?.length ? `<article><strong>Pendant la cuisson</strong><ul>${brief.duringCooking.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>` : ""}
          ${brief.afterCooking?.length ? `<article><strong>Après cuisson</strong><ul>${brief.afterCooking.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>` : ""}
        </div>
        ${specs.length ? `<h4>Mise en place précise</h4><div class="rubric-grid">${specs.map((item) => `<article><strong>${escapeHtml(item.area)}</strong><p>${escapeHtml(item.standard)}</p></article>`).join("")}</div>` : ""}
        ${matrix.length ? `<h4>Points de décision</h4><div class="correction-grid">${matrix.map((item) => `<article class="correction-card"><strong>${escapeHtml(item.signal)}</strong><p>${escapeHtml(item.decision)}</p></article>`).join("")}</div>` : ""}
        ${checklist.length ? `<h4>Auto-contrôle final</h4><div class="rubric-grid">${checklist.map((item) => `<article><strong>${escapeHtml(item.criterion)}</strong><p>${escapeHtml(item.check)}</p></article>`).join("")}</div>` : ""}
        ${ladder.length ? `<h4>Progression attendue</h4><div class="stage-list">${ladder.map((item) => `<article><strong>${escapeHtml(item.level)}</strong><p>${escapeHtml(item.standard)}</p></article>`).join("")}</div>` : ""}
        ${recipe.practiceAssignment ? `<div class="why chef-tip"><strong>Exercice de répétition :</strong> ${escapeHtml(recipe.practiceAssignment)}</div>` : ""}
      </section>
    `;
  }

  function renderRecipeQuality(recipe) {
    const points = recipe.criticalControlPoints || [];
    const rubric = recipe.selfAssessment || [];
    const standard = recipe.professionalStandard || "Résultat net, assaisonnement contrôlé, cuisson lisible et dressage simple.";
    if (!points.length && !rubric.length && !standard) return "";
    return `
      <section class="card flat recipe-quality">
        <h3>Ce qui fera vraiment progresser</h3>
        <div class="signal-card"><strong>Standard attendu</strong><span>${escapeHtml(standard)}</span></div>
        ${points.length ? `<div class="correction-grid">${points.map((point) => `<article class="correction-card"><strong>${escapeHtml(point.title)}</strong><p>${escapeHtml(point.check)}</p><p><b>Risque :</b> ${escapeHtml(point.risk)}</p></article>`).join("")}</div>` : ""}
        ${rubric.length ? `<div class="rubric-grid">${rubric.map((item) => `<article><strong>${escapeHtml(item.criterion)}</strong><p>${escapeHtml(item.good)}</p></article>`).join("")}</div>` : ""}
      </section>
    `;
  }

  function renderExecutionPlan(recipe) {
    const total = recipe.steps.length;
    const groups = [];
    if (total >= 1) groups.push(["Préparer", recipe.steps.slice(0, 1)]);
    if (total >= 3) groups.push(["Cuire", recipe.steps.slice(1, total - 1)]);
    if (total >= 2) groups.push(["Finir", recipe.steps.slice(-1)]);
    if (!groups.length) return "";
    return `
      <section class="card flat execution-plan">
        <h3>Plan d’exécution</h3>
        <div class="execution-grid">
          ${groups.map(([label, steps]) => `<div><strong>${escapeHtml(label)}</strong><span>${steps.map((step) => escapeHtml(step.title)).join(" → ")}</span></div>`).join("")}
        </div>
      </section>
    `;
  }

  function renderAdaptiveGuidance(step, recipe) {
    const level = state.progress.preferences.currentLevel;
    if (level === "avance") {
      return `<div class="why compact-guidance"><strong>Objectif :</strong> ${escapeHtml(step.checkpoint || recipe.objective || step.why)}</div>`;
    }
    if (level === "intermediaire") {
      return `<div class="why"><strong>But technique :</strong> ${escapeHtml(step.why)}</div>`;
    }
    return `<div class="why"><strong>Pourquoi :</strong> ${escapeHtml(step.why)}</div>`;
  }

  function toggleRecipeList(listName, recipeId, label) {
    const id = sanitizeId(recipeId);
    if (!recipeIds.has(id)) return;
    const list = state.progress[listName] || [];
    if (list.includes(id)) {
      state.progress[listName] = list.filter((item) => item !== id);
      setToast(`Retiré du ${label}.`);
    } else {
      state.progress[listName] = [...list, id].slice(-500);
      setToast(`Ajouté au ${label}.`);
    }
    saveProgress();
    render();
  }

  function completeDrill(drillId) {
    const id = sanitizeId(drillId);
    const drill = (DATA.trainingDrills || []).find((item) => item.id === id) || (DATA.tasteDrills || []).find((item) => item.id === id) || (DATA.improvisationDrills || []).find((item) => item.id === id) || (DATA.techniqueLibrary || []).find((item) => item.id === id) || (DATA.practicalAssessments || []).find((item) => item.id === id) || (DATA.visualGuides || []).find((item) => item.id === id);
    if (!drill) return;
    const first = !state.progress.completedDrills.includes(id);
    if (first) state.progress.completedDrills.push(id);
    if (drill.skillId && skillIds.has(drill.skillId)) practiceSkills([drill.skillId], first ? 1 : 0.3, drill.id.startsWith("assessment-") ? "assessment" : (drill.id.startsWith("vg-") ? "theory" : "correction"));
    addXp(first ? clampNumber(drill.xp, 5, 25, 10) : 3, first ? `Atelier : ${drill.title}` : `Révision atelier : ${drill.title}`);
    awardBadge("diagnostic-starter");
    saveProgress();
    setToast(first ? "Atelier validé." : "Atelier révisé.");
    render();
  }

  function renderProfile() {
    const badges = state.progress.badges.map(getBadge).filter(Boolean);
    const backupExists = Boolean(localStorage.getItem(PRE_IMPORT_BACKUP_KEY));
    const lightPayload = buildExportPayload({ includePhotos: false });
    const prefs = state.progress.preferences;
    return `
      <section class="view">
        <section class="card">
          <div class="section-head">
            <div>
              <h2>Profil et sauvegarde</h2>
              <p>Ta progression reste locale. Les photos sont stockées séparément dans IndexedDB pour éviter de saturer la sauvegarde principale.</p>
            </div>
          </div>
          <div class="grid-two">
            <div class="metric"><strong>${state.progress.xp}</strong><span>XP total</span></div>
            <div class="metric"><strong>${state.progress.streak.best}</strong><span>meilleure série</span></div>
          </div>
        </section>

        <section class="card">
          <div class="section-head">
            <div>
              <h2>Préférences coach</h2>
              <p>${escapeHtml(prefs.firstName)} · ${escapeHtml(prefs.currentLevel)} · ${prefs.weeklyGoal} session${prefs.weeklyGoal > 1 ? "s" : ""}/semaine · ${escapeHtml(prefs.availableTime)}</p>
            </div>
          </div>
          <div class="tags">
            ${prefs.preferredCategories.length ? prefs.preferredCategories.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("") : `<span class="tag">aucune catégorie prioritaire</span>`}
            ${prefs.equipment.length ? prefs.equipment.slice(0, 6).map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("") : `<span class="tag">matériel non renseigné</span>`}
          </div>
          <div class="actions">
            <button class="btn" id="redo-onboarding">Modifier les préférences</button>
          </div>
        </section>

        <section class="card">
          <div class="section-head">
            <div>
              <h2>Exporter / importer</h2>
              <p>JSON pour restauration directe. ZIP pour archive longue durée avec un fichier progress.json et un dossier photos.</p>
            </div>
          </div>
          <div class="actions">
            <button class="btn primary" id="export-full-progress">Export complet JSON</button>
            <button class="btn" id="export-light-progress">Export léger JSON</button>
            <button class="btn" id="export-archive-progress">Archive ZIP</button>
            <label class="btn" for="import-progress">Importer JSON</label>
            <input class="hidden" id="import-progress" type="file" accept="application/json,.json" />
          </div>
          <p class="small-note">Avant chaque import, l'app crée une sauvegarde locale légère de secours. L'import ZIP n'est pas encore inclus : l'archive ZIP sert de format propre de conservation.</p>
          ${backupExists ? `<button class="btn full" id="restore-pre-import-backup">Restaurer la sauvegarde avant import</button>` : ""}
        </section>

        <section class="card">
          <div class="section-head">
            <div>
              <h2>Résumé de progression</h2>
              <p>Extrait sans photos — utilise "Export complet JSON" pour inclure les images.</p>
            </div>
          </div>
          <div class="grid-two">
            <div class="metric"><strong>${lightPayload.summary.xp}</strong><span>XP total</span></div>
            <div class="metric"><strong>${lightPayload.summary.lessons}</strong><span>leçons terminées</span></div>
            <div class="metric"><strong>${lightPayload.summary.recipes}</strong><span>recettes faites</span></div>
            <div class="metric"><strong>${lightPayload.summary.logs}</strong><span>entrées journal</span></div>
            <div class="metric"><strong>${lightPayload.summary.photos}</strong><span>photos</span></div>
            <div class="metric"><strong>${lightPayload.summary.badges}</strong><span>badges</span></div>
          </div>
          <p class="small-note">Dernière mise à jour : ${escapeHtml(lightPayload.exportedAt ? formatDate(lightPayload.exportedAt) : "—")}</p>
        </section>

        <section class="card">
          <div class="section-head">
            <div>
              <h2>Badges</h2>
              <p>${badges.length ? "Badges débloqués." : "Aucun badge débloqué pour l'instant."}</p>
            </div>
          </div>
          ${badges.length ? `<div class="list">${badges.map((badge) => `
            <div class="skill-card">
              <strong>${escapeHtml(badge.name)}</strong>
              <span class="muted">${escapeHtml(badge.description)}</span>
            </div>
          `).join("")}</div>` : ""}
        </section>

        <section class="card">
          <div class="section-head">
            <div>
              <h2>Zone dangereuse</h2>
              <p>Réinitialise uniquement après export.</p>
            </div>
          </div>
          <button class="btn danger full" id="reset-progress">Réinitialiser la progression locale</button>
        </section>
      </section>
    `;
  }

  function renderSkillGrid() {
    return `
      <div class="list">
        ${DATA.skills.map((skill) => renderSkillMiniCard(skill)).join("")}
      </div>
    `;
  }

  function renderModal() {
    if (state.selectedLessonId) return renderLessonModal(getLesson(state.selectedLessonId));
    if (state.selectedRecipeId) return renderRecipeModal(getRecipe(state.selectedRecipeId));
    if (state.cooking) return renderCookingModal(getRecipe(state.cooking.recipeId));
    return "";
  }

  function getLessonQuiz(lesson) {
    const seen = new Set();
    const genericFragments = [
      "observer le signe technique",
      "ajouter du sel au hasard",
      "changer tous les paramètres",
      "ignorer le résultat",
      "le hasard",
      "la taille de l’assiette",
      "volume sonore de la cuisine"
    ];
    const base = (lesson.quiz || []).filter((question) => {
      const text = `${question.question || ""} ${(question.options || []).join(" ")}`.toLowerCase();
      if (genericFragments.some((fragment) => text.includes(fragment))) return false;
      const key = sanitizeText(question.question, 180).toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return Array.isArray(question.options) && question.options.length >= 3 && Number.isInteger(question.answer);
    });
    const cleaned = [...base, ...buildLessonQuizFallback(lesson)].slice(0, 5);
    return cleaned.length ? cleaned : (lesson.quiz || []).slice(0, 3);
  }

  function buildLessonQuizFallback(lesson) {
    const items = [];
    const steps = Array.isArray(lesson.techniqueSteps) ? lesson.techniqueSteps : [];
    steps.slice(0, 4).forEach((step, index) => {
      const correct = sanitizeText(step.action || step.cue || step.title, 180);
      const trap = sanitizeText(step.commonMistake || step.failureMode || "Changer plusieurs paramètres sans observer", 180);
      if (!correct || correct === trap) return;
      items.push({
        question: `Dans « ${lesson.title} », quelle décision correspond le mieux à l'étape ${index + 1} ?`,
        options: [
          correct,
          trap,
          "Augmenter l'intensité sans vérifier le résultat",
          "Attendre la fin pour corriger toute la méthode"
        ],
        answer: 0
      });
    });
    (lesson.troubleshooting || []).slice(0, 2).forEach((item) => {
      const problem = sanitizeText(item.problem, 160);
      const fix = sanitizeText(item.fix, 180);
      if (!problem || !fix) return;
      items.push({
        question: `Si tu observes : « ${problem} », quelle correction est la plus professionnelle ?`,
        options: [
          fix,
          "Masquer le défaut avec une finition plus forte",
          "Accélérer la cuisson pour compenser le retard",
          "Continuer sans isoler la cause du problème"
        ],
        answer: 0
      });
    });
    return items;
  }

  function renderLessonModal(lesson) {
    if (!lesson) return "";
    const quiz = getLessonQuiz(lesson);
    const done = completedLesson(lesson.id);
    const answers = state.quizAnswers[lesson.id] || {};
    const score = calculateQuizScore(lesson, quiz);
    const allAnswered = quiz.every((_, index) => Number.isInteger(answers[index]));
    const allCorrect = score.total > 0 && score.correct === score.total && allAnswered;
    const mode = state.lessonMode === "quiz" ? "quiz" : "lesson";
    return `
      <div class="modal-backdrop" data-close-modal="1">
        <section class="modal" role="dialog" aria-modal="true" aria-label="Leçon">
          <div class="modal-head">
            <div>
              <h2>${escapeHtml(lesson.title)}</h2>
              <p class="muted">${escapeHtml(lesson.summary)}</p>
            </div>
            <button class="close-btn" data-close-modal="1">×</button>
          </div>
          <div class="list">
            ${mode === "lesson" ? `
              ${renderLessonCore(lesson)}
              <button class="btn primary full" data-start-quiz="${escapeAttr(lesson.id)}">${done ? "Revoir le quiz" : "Passer au quiz"}</button>
            ` : `
              <article class="card flat quiz-page" id="quiz-zone">
                <div class="section-head">
                  <div>
                    <h2>Quiz</h2>
                    <p>Score : ${score.correct}/${score.total}. Validation seulement si toutes les réponses sont correctes.</p>
                  </div>
                </div>
                ${quiz.map((q, qIndex) => renderQuizQuestion(lesson, q, qIndex, answers[qIndex])).join("")}
              </article>
              <div class="actions">
                <button class="btn" data-back-lesson="${escapeAttr(lesson.id)}">Relire la leçon</button>
                <button class="btn primary" data-complete-lesson="${escapeAttr(lesson.id)}" ${allCorrect ? "" : "disabled"}>${done ? "Révision réussie" : "Valider la leçon"}</button>
              </div>
              ${!allCorrect ? `<p class="small-note">Réponds correctement à toutes les questions pour débloquer la validation.</p>` : ""}
            `}
          </div>
        </section>
      </div>
    `;
  }

  function renderQuizQuestion(lesson, question, qIndex, selected) {
    return `
      <div class="step-card" data-quiz-question="${qIndex}">
        <div class="question-head"><h3>${escapeHtml(question.question)}</h3>${question.type ? `<span class="pill blue">${escapeHtml(question.type)}</span>` : ""}</div>
        <div class="list">
          ${question.options.map((option, oIndex) => {
            const chosen = selected === oIndex;
            const reveal = Number.isInteger(selected);
            const klass = reveal && oIndex === question.answer ? "correct" : reveal && chosen && selected !== question.answer ? "wrong" : "";
            return `<button class="quiz-option ${klass}" data-quiz-answer="${escapeAttr(lesson.id)}|${qIndex}|${oIndex}">${escapeHtml(option)}</button>`;
          }).join("")}
        </div>
        ${Number.isInteger(selected) ? `<p class="muted">${selected === question.answer ? "Correct." : "À revoir."} ${escapeHtml(question.explanation)}</p>` : ""}
      </div>
    `;
  }

  function renderLessonCore(lesson) {
    const methodSteps = Array.isArray(lesson.techniqueSteps) && lesson.techniqueSteps.length
      ? lesson.techniqueSteps.slice(0, 5).map((step) => ({ title: step.title || "Méthode", body: step.action || step.cue || "" }))
      : (lesson.content || []).slice(0, 5).map((body, index) => ({ title: `Point ${index + 1}`, body }));
    const errors = Array.isArray(lesson.troubleshooting) ? lesson.troubleshooting.slice(0, 3) : [];
    return `
      <article class="card flat lesson-core">
        ${lesson.objective ? `<div class="signal-card"><strong>Objectif</strong><span>${escapeHtml(lesson.objective)}</span></div>` : ""}
        <section class="deep-section compact-lesson">
          <h3>Méthode pro</h3>
          <div class="technique-list">
            ${methodSteps.map((step, index) => `
              <article class="technique-step">
                <span class="step-number">${index + 1}</span>
                <div><strong>${escapeHtml(step.title)}</strong><p>${renderRichText(step.body)}</p></div>
              </article>
            `).join("")}
          </div>
        </section>
        ${errors.length ? `<section class="deep-section compact-lesson"><h3>Erreurs à éviter</h3><div class="correction-grid">${errors.map((item) => `<article class="correction-card"><strong>${escapeHtml(item.problem)}</strong><p>${escapeHtml(item.fix)}</p></article>`).join("")}</div></section>` : ""}
        ${lesson.practice ? `<div class="why"><strong>Exercice :</strong> ${escapeHtml(lesson.practice)}</div>` : ""}
        <details class="deep-section advanced-lesson">
          <summary>Voir les détails avancés</summary>
          ${renderDeepLessonContent(lesson)}
        </details>
      </article>
    `;
  }


  function renderDeepLessonContent(lesson) {
    const parts = [];
    if (Array.isArray(lesson.principles) && lesson.principles.length) {
      parts.push(`<section class="deep-section"><h3>Principes à comprendre</h3><div class="principle-grid">${lesson.principles.map((item) => `<article><strong>${escapeHtml(item.title || "Principe")}</strong><p>${escapeHtml(item.body || item)}</p></article>`).join("")}</div></section>`);
    }
    if (Array.isArray(lesson.techniqueSteps) && lesson.techniqueSteps.length) {
      parts.push(`<section class="deep-section"><h3>Gestes et méthode</h3><div class="technique-list">${lesson.techniqueSteps.map((step, index) => `
        <article class="technique-step">
          <span class="step-number">${index + 1}</span>
          <div><strong>${escapeHtml(step.title || "Étape")}</strong><p>${escapeHtml(step.action || "")}</p>
          ${step.cue ? `<p class="micro"><b>Repère :</b> ${escapeHtml(step.cue)}</p>` : ""}
          ${step.mistake ? `<p class="micro warn"><b>Erreur :</b> ${escapeHtml(step.mistake)}</p>` : ""}
          ${step.correction ? `<p class="micro ok"><b>Correction :</b> ${escapeHtml(step.correction)}</p>` : ""}</div>
        </article>`).join("")}</div></section>`);
    }
    if (lesson.sensoryCues && typeof lesson.sensoryCues === "object") {
      const cues = [["Voir", lesson.sensoryCues.see], ["Entendre", lesson.sensoryCues.hear], ["Sentir", lesson.sensoryCues.smell], ["Toucher", lesson.sensoryCues.touch], ["Goûter", lesson.sensoryCues.taste]].filter(([, value]) => value);
      if (cues.length) parts.push(`<section class="deep-section"><h3>Repères sensoriels</h3><div class="sensory-grid">${cues.map(([label, value]) => `<article><strong>${escapeHtml(label)}</strong><p>${escapeHtml(value)}</p></article>`).join("")}</div></section>`);
    }
    if (Array.isArray(lesson.troubleshooting) && lesson.troubleshooting.length) {
      parts.push(`<section class="deep-section"><h3>Diagnostic d’erreurs</h3><div class="correction-grid">${lesson.troubleshooting.map((item) => `<article class="correction-card"><strong>${escapeHtml(item.problem)}</strong><p><b>Cause probable :</b> ${escapeHtml(item.cause)}</p><p><b>Correction :</b> ${escapeHtml(item.fix)}</p></article>`).join("")}</div></section>`);
    }
    if (Array.isArray(lesson.practiceDrills) && lesson.practiceDrills.length) {
      parts.push(`<section class="deep-section"><h3>Exercices pratiques</h3><div class="practice-grid">${lesson.practiceDrills.map((drill) => `<article><strong>${escapeHtml(drill.title)}</strong><span>${escapeHtml(drill.duration || "10 min")}</span><p>${escapeHtml(drill.instructions)}</p><p class="micro ok"><b>But :</b> ${escapeHtml(drill.goal || "Répéter jusqu’à régularité.")}</p></article>`).join("")}</div></section>`);
    }
    if (lesson.mentorBrief) parts.push(`<section class="deep-section mentor-brief"><h3>Lecture de chef</h3><p>${escapeHtml(lesson.mentorBrief)}</p></section>`);
    if (Array.isArray(lesson.technicalVocabulary) && lesson.technicalVocabulary.length) {
      parts.push(`<section class="deep-section"><h3>Vocabulaire technique</h3><div class="vocab-grid">${lesson.technicalVocabulary.map((item) => `<article><strong>${escapeHtml(item.term)}</strong><p>${escapeHtml(item.definition)}</p></article>`).join("")}</div></section>`);
    }
    if (Array.isArray(lesson.guidedLab) && lesson.guidedLab.length) {
      parts.push(`<section class="deep-section"><h3>Atelier pratique noté</h3><div class="practice-grid">${lesson.guidedLab.map((item) => `<article><strong>${escapeHtml(item.task)}</strong><span>${escapeHtml(item.duration || "10 min")}</span><p>${escapeHtml(item.instructions)}</p><p class="micro ok"><b>Résultat attendu :</b> ${escapeHtml(item.expected)}</p></article>`).join("")}</div></section>`);
    }
    if (Array.isArray(lesson.progressionStages) && lesson.progressionStages.length) {
      parts.push(`<section class="deep-section"><h3>Progression : amateur → excellent</h3><div class="stage-list">${lesson.progressionStages.map((item) => `<article><strong>${escapeHtml(item.level)}</strong><p>${escapeHtml(item.standard)}</p></article>`).join("")}</div></section>`);
    }
    if (Array.isArray(lesson.assessmentRubric) && lesson.assessmentRubric.length) {
      parts.push(`<section class="deep-section"><h3>Grille d’évaluation</h3><div class="rubric-grid">${lesson.assessmentRubric.map((item) => `<article><strong>${escapeHtml(item.criterion)}</strong><p>${escapeHtml(item.standard)}</p></article>`).join("")}</div></section>`);
    }
    if (Array.isArray(lesson.commonMisconceptions) && lesson.commonMisconceptions.length) {
      parts.push(`<section class="deep-section"><h3>Fausses bonnes idées à éviter</h3><ul class="mastery-list warn-list">${lesson.commonMisconceptions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`);
    }
    if (lesson.realKitchenTransfer) {
      parts.push(`<section class="deep-section mentor-brief"><h3>Transfert en vraie cuisine</h3><p>${escapeHtml(lesson.realKitchenTransfer)}</p></section>`);
    }
    if (lesson.capstonePractice) {
      parts.push(`<section class="deep-section"><h3>Exercice de transfert</h3><div class="practice-grid"><article><strong>${escapeHtml(lesson.capstonePractice.title || "Exercice")}</strong><p>${escapeHtml(lesson.capstonePractice.instructions || "")}</p><p class="micro ok"><b>Résultat attendu :</b> ${escapeHtml(lesson.capstonePractice.expected || "")}</p></article></div></section>`);
    }
    if (Array.isArray(lesson.masteryCriteria) && lesson.masteryCriteria.length) {
      parts.push(`<section class="deep-section"><h3>Critères de maîtrise</h3><ul class="mastery-list">${lesson.masteryCriteria.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`);
    }
    if (lesson.proTip) parts.push(`<div class="why chef-tip"><strong>Conseil de chef :</strong> ${escapeHtml(lesson.proTip)}</div>`);
    return parts.join("");
  }


  function renderRecipeCapSheet(recipe) {
    const card = recipe.technicalCard || {};
    const primary = getSkill(recipe.primarySkill)?.name || recipe.primarySkill || "Technique principale";
    const secondary = (recipe.secondarySkills || []).map((id) => getSkill(id)?.name || id).filter(Boolean);
    if (!card.mainTechnique && !recipe.mainFamily) return "";
    return `
      <section class="card flat cap-sheet">
        <div class="section-head compact">
          <div>
            <span class="eyebrow">fiche technique</span>
            <h3>Vue CAP / restaurant</h3>
            <p>Une synthèse courte pour comprendre l’objectif, les points critiques et le standard attendu.</p>
          </div>
        </div>
        <div class="tech-grid">
          <article class="tech-block"><strong>Portions et temps actif</strong><ul><li>${escapeHtml(card.portions || "2 portions")}</li><li>${escapeHtml(card.activeTime || `${recipe.duration} min environ`)}</li></ul></article>
          <article class="tech-block"><strong>Technique principale</strong><ul><li>${escapeHtml(primary)}</li>${secondary.map((item) => `<li>Secondaire : ${escapeHtml(item)}</li>`).join("")}</ul></article>
          <article class="tech-block"><strong>Famille pédagogique</strong><ul><li>${escapeHtml(recipe.mainFamily || recipe.family || "général")}</li>${(recipe.secondaryFamilies || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
          <article class="tech-block"><strong>Standard de service</strong><ul><li>${escapeHtml(card.serviceStandard || "Texture, chaleur et assaisonnement doivent être cohérents au même moment.")}</li></ul></article>
        </div>
        ${card.criticalControls?.length ? `<h4>Contrôles critiques</h4><ul class="ingredients">${card.criticalControls.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
      </section>`;
  }

  function renderRecipeModal(recipe) {
    if (!recipe) return "";
    const skills = recipe.skillIds.map((id) => getSkill(id)?.name).filter(Boolean);
    const activeSameRecipe = state.progress.activeSession?.recipeId === recipe.id;
    const advancedDetails = [
      renderRecipeCapSheet(recipe),
      renderRecipePrepDetails(recipe),
      renderRecipeTechniqueSheet(recipe),
      renderRecipeV19Deepening(recipe),
      renderAdvancedRecipeCoach(recipe),
      renderRecipeIntelligence(recipe),
      renderRecipeQuality(recipe),
      renderTimingPlan(recipe),
      renderMiseEnPlaceTimeline(recipe),
      renderDecisionMatrix(recipe),
      renderServiceAndStorage(recipe),
      renderExecutionPlan(recipe)
    ].filter(Boolean).join("");
    return `
      <div class="modal-backdrop" data-close-modal="1">
        <section class="modal" role="dialog" aria-modal="true" aria-label="Recette">
          <div class="modal-head">
            <div>
              <h2>${escapeHtml(recipe.title)}</h2>
              <p class="muted">${escapeHtml(recipe.description)}</p>
            </div>
            <button class="close-btn" data-close-modal="1">×</button>
          </div>
          <div class="detail-header">
            ${renderRecipeImage(recipe, "card")}
            <div class="tags">
              <span class="tag">${recipe.duration} min</span>
              <span class="tag">niveau ${recipe.level}</span>
              <span class="tag">${escapeHtml(recipe.category)}</span>
              ${skills.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
            ${recipe.objective ? `<section class="card flat"><h3>Objectif technique</h3><p>${escapeHtml(recipe.objective)}</p></section>` : ""}
            <section class="card flat">
              <h3>Ingrédients</h3>
              <ul class="ingredients">${recipe.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </section>
            <section class="card flat">
              <h3>Matériel</h3>
              <ul class="ingredients">${recipe.tools.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </section>
            ${recipe.successSigns?.length ? `<section class="card flat"><h3>Signes de réussite</h3><ul class="ingredients">${recipe.successSigns.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>` : ""}
            ${recipe.commonErrors?.length ? `<section class="card flat"><h3>Erreurs fréquentes</h3><div class="correction-grid">${recipe.commonErrors.slice(0, 4).map((item) => `<article class="correction-card"><strong>${escapeHtml(item.problem || item)}</strong>${item.fix ? `<p>${escapeHtml(item.fix)}</p>` : ""}</article>`).join("")}</div></section>` : ""}
            ${advancedDetails ? `
              <details class="card flat recipe-advanced-details">
                <summary>Détails avancés</summary>
                ${advancedDetails}
              </details>
            ` : ""}
            <div class="actions">
              <button class="btn" data-toggle-favorite="${escapeAttr(recipe.id)}">${state.progress.favoriteRecipes.includes(recipe.id) ? "Retirer des favoris" : "Ajouter aux favoris"}</button>
              <button class="btn" data-toggle-plan="${escapeAttr(recipe.id)}">${state.progress.plannedRecipes.includes(recipe.id) ? "Retirer du plan" : "Ajouter au plan"}</button>
            </div>
            <button class="btn primary full" data-start-cooking="${escapeAttr(recipe.id)}">${activeSameRecipe ? "Reprendre cette recette" : "Démarrer le mode cuisine"}</button>
          </div>
        </section>
      </div>
    `;
  }


  function renderStepDeepCoach(step) {
    const items = [
      ["Pourquoi c’est important", step.whyDeep],
      ["Décision à prendre", step.decisionCue],
      ["Erreur probable", step.failureMode],
      ["Contrôle chef", step.chefCheck]
    ].filter(([, value]) => value);
    if (!items.length) return "";
    return `
      <details class="step-deep-coach compact-coach">
        <summary>Pourquoi, décision et contrôle chef</summary>
        ${items.map(([label, value]) => `<div><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></div>`).join("")}
      </details>
    `;
  }

  function renderCookingModal(recipe) {
    if (!recipe) return "";
    const stepIndex = state.cooking.stepIndex;
    const total = recipe.steps.length;
    const step = recipe.steps[stepIndex];
    const atEnd = stepIndex >= total;

    if (atEnd) return renderFinishRecipeModal(recipe);

    const percent = Math.round(((stepIndex + 1) / total) * 100);
    const timerRemaining = getTimerRemaining(`${recipe.id}-${stepIndex}`, step.timer);
    return `
      <div class="modal-backdrop">
        <section class="modal cooking-modal" role="dialog" aria-modal="true" aria-label="Mode cuisine">
          <div class="modal-head">
            <div>
              <h2>${escapeHtml(recipe.title)}</h2>
              <p class="muted">Étape ${stepIndex + 1}/${total}</p>
            </div>
            <button class="close-btn" data-stop-cooking="1">×</button>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
          <div class="list" style="margin-top:14px;">
            ${renderPrepChecklist(recipe)}
            <article class="step-card">
              <h3>${escapeHtml(step.title)}</h3>
              <p>${renderRichText(step.instruction)}</p>
              ${step.chefFocus ? `<div class="signal-card"><strong>Focus chef</strong><span>${renderRichText(step.chefFocus)}</span></div>` : ""}
              ${renderStepPrecision(step)}
              ${renderStepDeepCoach(step)}
              ${renderAdaptiveGuidance(step, recipe)}
              ${step.sensory ? renderSensoryBlock(step.sensory) : ""}
              ${step.checkpoint ? `<div class="signal-card"><strong>Point de contrôle</strong><span>${renderRichText(step.checkpoint)}</span></div>` : ""}
              ${step.mistake ? `<div class="mistake"><strong>Erreur fréquente :</strong> ${renderRichText(step.mistake)}</div>` : ""}
              ${step.correction ? `<div class="why"><strong>Correction :</strong> ${renderRichText(step.correction)}</div>` : ""}
              ${step.timer ? `
                <div class="timer-box">
                  <div>
                    <strong>Minuteur</strong>
                    <div class="timer-value">${formatSeconds(timerRemaining)}</div>
                  </div>
                  <div class="actions" style="margin-top:0;">
                    <button class="btn" data-start-timer="${escapeAttr(recipe.id)}|${stepIndex}|${step.timer}">${state.activeTimer ? "Relancer" : "Lancer"}</button>
                    <button class="btn" data-stop-timer="1">Stop</button>
                  </div>
                </div>
              ` : ""}
              <div class="field step-note-field">
                <label for="step-note">Note rapide sur cette étape</label>
                <textarea id="step-note" data-step-note="${stepIndex}" placeholder="Ex : poêle trop froide, sauce trop acide, cuisson trop longue...">${escapeHtml(state.cooking.stepNotes?.[stepIndex] || "")}</textarea>
              </div>
            </article>
            <div class="actions sticky-actions">
              <button class="btn" data-prev-step="1" ${stepIndex === 0 ? "disabled" : ""}>Précédent</button>
              <button class="btn primary" data-next-step="1">${stepIndex === total - 1 ? "Terminer" : "Étape suivante"}</button>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  function renderPrepChecklist(recipe) {
    const checked = state.cooking.checkedItems || {};
    return `
      <details class="prep-checklist" ${Object.keys(checked).length ? "" : "open"}>
        <summary>Mise en place</summary>
        <div class="checklist-grid">
          <div>
            <h4>Ingrédients</h4>
            ${recipe.ingredients.map((item, index) => renderChecklistItem(`ingredient-${index}`, item, checked[`ingredient-${index}`])).join("")}
          </div>
          <div>
            <h4>Matériel</h4>
            ${recipe.tools.map((item, index) => renderChecklistItem(`tool-${index}`, item, checked[`tool-${index}`])).join("")}
          </div>
        </div>
      </details>
    `;
  }

  function renderChecklistItem(key, label, checked) {
    return `
      <label class="check-item">
        <input type="checkbox" data-check-item="${escapeAttr(key)}" ${checked ? "checked" : ""} />
        <span>${escapeHtml(label)}</span>
      </label>
    `;
  }

  function labelEvaluationKey(key) {
    const labels = { organisation: "Organisation", cuisson: "Cuisson", assaisonnement: "Assaisonnement", texture: "Texture", dressage: "Dressage" };
    return labels[key] || key;
  }

  function renderFinishRecipeModal(recipe) {
    const allNotes = Object.values(state.cooking.stepNotes || {}).filter(Boolean).join("\n");
    return `
      <div class="modal-backdrop">
        <section class="modal" role="dialog" aria-modal="true" aria-label="Fin de recette">
          <div class="modal-head">
            <div>
              <h2>Recette terminée</h2>
              <p class="muted">Documente le résultat pour progresser à la prochaine tentative.</p>
            </div>
            <button class="close-btn" data-stop-cooking="1">×</button>
          </div>
          <form class="form-grid" id="finish-recipe-form">
            <input type="hidden" name="recipeId" value="${escapeAttr(recipe.id)}" />
            <input type="hidden" name="rating" value="4" />
            <input type="hidden" name="difficulty" value="3" />
            <input type="hidden" name="errorType" value="" />
            <div class="field">
              <label for="comment">Commentaire facultatif</label>
              <textarea id="comment" name="comment" placeholder="Notes libres sur le résultat, le goût, la cuisson...">${escapeHtml(allNotes)}</textarea>
            </div>
            <input type="hidden" name="nextFocus" value="" />
            <div class="field">
              <label for="photo">Photo du plat</label>
              <input id="photo" type="file" accept="image/jpeg,image/png,image/webp,image/*" capture="environment" />
              <p class="small-note">Optionnel : cette photo deviendra la couverture de la recette.</p>
            </div>
            <div id="photo-preview"></div>
            <button class="btn primary full" type="submit">Enregistrer dans mon journal</button>
          </form>
        </section>
      </div>
    `;
  }

  function bindCommonEvents() {
    document.querySelectorAll("[data-open-lesson]").forEach((button) => {
      button.addEventListener("click", () => {
        const lesson = getLesson(button.dataset.openLesson);
        if (!lesson || !isLessonUnlocked(lesson)) return;
        state.selectedLessonId = lesson.id;
        state.lessonMode = "lesson";
        state.quizAnswers[lesson.id] = state.quizAnswers[lesson.id] || {};
        render();
      });
    });

    document.querySelectorAll("[data-open-recipe]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedRecipeId = button.dataset.openRecipe;
        render();
      });
    });

    document.querySelectorAll("[data-toggle-favorite]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleRecipeList("favoriteRecipes", button.dataset.toggleFavorite, "favori");
      });
    });

    document.querySelectorAll("[data-toggle-plan]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleRecipeList("plannedRecipes", button.dataset.togglePlan, "plan de cuisine");
      });
    });

    document.querySelectorAll("[data-complete-drill]").forEach((button) => {
      button.addEventListener("click", () => completeDrill(button.dataset.completeDrill));
    });

    document.querySelectorAll("[data-close-modal]").forEach((element) => {
      element.addEventListener("click", (event) => {
        if (event.target === element || event.target.dataset.closeModal) closeModal();
      });
    });
  }

  function bindViewEvents() {
    bindLessonEvents();
    bindRecipeEvents();
    bindCookingEvents();
    bindProfileEvents();
    bindJournalEvents();

    bindOnboardingEvents();

    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeFilter = button.dataset.filter;
        render();
      });
    });

    const recipeSearch = document.getElementById("recipe-search");
    if (recipeSearch) {
      let searchDebounce = null;
      recipeSearch.addEventListener("input", () => {
        state.recipeSearch = recipeSearch.value;
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => render(), 260);
      });
      recipeSearch.addEventListener("keydown", (event) => {
        if (event.key === "Enter") { clearTimeout(searchDebounce); render(); }
      });
    }

    const applyRecipeFilters = document.getElementById("apply-recipe-filters");
    if (applyRecipeFilters) applyRecipeFilters.addEventListener("click", render);

    const clearRecipeFilters = document.getElementById("clear-recipe-filters");
    if (clearRecipeFilters) {
      clearRecipeFilters.addEventListener("click", () => {
        state.recipeSearch = "";
        state.activeFilter = "all";
        state.recipeLevelFilter = "all";
        state.recipeDurationFilter = "all";
        render();
      });
    }

    const recipeLevelFilter = document.getElementById("recipe-level-filter");
    if (recipeLevelFilter) {
      recipeLevelFilter.addEventListener("change", () => {
        state.recipeLevelFilter = recipeLevelFilter.value;
        render();
      });
    }

    const recipeDurationFilter = document.getElementById("recipe-duration-filter");
    if (recipeDurationFilter) {
      recipeDurationFilter.addEventListener("change", () => {
        state.recipeDurationFilter = recipeDurationFilter.value;
        render();
      });
    }

    const trainingSearch = document.getElementById("training-search");
    if (trainingSearch) {
      let trainingDebounce = null;
      trainingSearch.addEventListener("input", () => {
        state.trainingSearch = trainingSearch.value;
        clearTimeout(trainingDebounce);
        trainingDebounce = setTimeout(() => render(), 260);
      });
    }

    const resume = document.querySelector("[data-resume-session]");
    if (resume) {
      resume.addEventListener("click", () => {
        state.cooking = sanitizeActiveSession(state.progress.activeSession);
        render();
      });
    }

    const abandon = document.querySelector("[data-abandon-session]");
    if (abandon) {
      abandon.addEventListener("click", () => {
        const ok = window.confirm("Abandonner définitivement la recette en cours ?");
        if (!ok) return;
        state.progress.activeSession = null;
        state.cooking = null;
        stopTimer(false);
        saveProgress();
        setToast("Session abandonnée.");
        render();
      });
    }
  }


  function bindOnboardingEvents() {
    const form = document.getElementById("onboarding-form");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      state.progress.preferences = {
        ...state.progress.preferences,
        onboardingDone: true,
        firstName: sanitizeText(data.get("firstName"), 40) || "Nicolas",
        goal: sanitizeText(data.get("goal"), 120) || "devenir très bon en cuisine",
        currentLevel: sanitizeText(data.get("currentLevel"), 40) || "debutant",
        weeklyGoal: clampNumber(data.get("weeklyGoal"), 1, 7, 3),
        availableTime: sanitizeText(data.get("availableTime"), 40) || "30-45 min",
        preferredCategories: data.getAll("preferredCategories").map((v) => sanitizeText(v, 40)).filter(Boolean).slice(0, 12),
        equipment: data.getAll("equipment").map((v) => sanitizeText(v, 60)).filter(Boolean).slice(0, 20)
      };
      awardBadge("weekly-goal");
      saveProgress();
      setToast("Préférences enregistrées.");
      render();
    });
  }

  function bindLessonEvents() {
    if (bindLessonEvents._quizKeyHandler) {
      document.removeEventListener("keydown", bindLessonEvents._quizKeyHandler);
      bindLessonEvents._quizKeyHandler = null;
    }
    document.querySelectorAll("[data-start-quiz]").forEach((button) => {
      button.addEventListener("click", () => {
        state.lessonMode = "quiz";
        renderPreserveModalScroll();
      });
    });

    document.querySelectorAll("[data-back-lesson]").forEach((button) => {
      button.addEventListener("click", () => {
        state.lessonMode = "lesson";
        renderPreserveModalScroll();
      });
    });

    document.querySelectorAll("[data-quiz-answer]").forEach((button) => {
      button.addEventListener("click", () => {
        const [lessonId, qIndexRaw, answerRaw] = button.dataset.quizAnswer.split("|");
        const lesson = getLesson(lessonId);
        const qIndex = Number(qIndexRaw);
        const selected = Number(answerRaw);
        const quiz = lesson ? getLessonQuiz(lesson) : [];
        if (!lesson || !quiz[qIndex]) return;
        state.quizAnswers[lessonId] = state.quizAnswers[lessonId] || {};
        state.quizAnswers[lessonId][qIndex] = selected;
        renderPreserveModalScroll();
      });
    });

    // Raccourcis clavier 1–4 pour répondre au quiz sans clic
    const quizZone = document.getElementById("quiz-zone");
    if (quizZone && state.selectedLessonId) {
      const lesson = getLesson(state.selectedLessonId);
      if (lesson) {
        const quiz = getLessonQuiz(lesson);
        const keyHandler = (event) => {
          const key = event.key;
          if (!["1", "2", "3", "4"].includes(key)) return;
          const answerIndex = Number(key) - 1;
          // Trouver la question active (première non répondue)
          const answers = state.quizAnswers[lesson.id] || {};
          const activeQIndex = quiz.findIndex((_, i) => !Number.isInteger(answers[i]));
          if (activeQIndex === -1) return;
          const question = quiz[activeQIndex];
          if (!question || answerIndex >= question.options.length) return;
          state.quizAnswers[lesson.id] = state.quizAnswers[lesson.id] || {};
          state.quizAnswers[lesson.id][activeQIndex] = answerIndex;
          renderPreserveModalScroll();
        };
        document.addEventListener("keydown", keyHandler, { once: false });
        // Nettoyer quand le modal se ferme (au prochain closeModal)
        bindLessonEvents._quizKeyHandler = keyHandler;
      }
    }

    document.querySelectorAll("[data-complete-lesson]").forEach((button) => {
      button.addEventListener("click", () => {
        const lesson = getLesson(button.dataset.completeLesson);
        if (!lesson) return;
        completeLessonIfValid(lesson);
      });
    });
  }

  function completeLessonIfValid(lesson) {
    const score = calculateQuizScore(lesson);
    if (score.correct !== score.total) {
      setToast("Validation bloquée : toutes les réponses doivent être correctes.");
      return;
    }

    const firstCompletion = !completedLesson(lesson.id);
    if (firstCompletion) state.progress.completedLessons.push(lesson.id);

    const previous = state.progress.lessonResults[lesson.id] || { attempts: 0, bestScore: 0 };
    const scorePercent = Math.round((score.correct / score.total) * 100);
    state.progress.lessonResults[lesson.id] = {
      status: "completed",
      bestScore: Math.max(previous.bestScore || 0, scorePercent),
      attempts: (previous.attempts || 0) + 1,
      lastCompletedAt: new Date().toISOString(),
      nextReviewLocalDate: addDaysLocalDate(localDateKey(), firstCompletion ? 2 : 5)
    };

    practiceSkills(lesson.skillIds, firstCompletion ? 1 : 0.3, "theory");
    practiceSkills(lesson.skillIds, firstCompletion ? 1 : 0.3, "quiz");
    addXp(firstCompletion ? lesson.xp : 8, firstCompletion ? `Leçon : ${lesson.title}` : `Révision : ${lesson.title}`);
    awardBadge("first-lesson");
    if (state.progress.completedLessons.length >= 10) awardBadge("ten-lessons");
    saveProgress();
    setToast(firstCompletion ? `Leçon validée : +${lesson.xp} XP` : "Révision validée : +8 XP");
    closeModal();
  }

  function calculateQuizScore(lesson, quiz = getLessonQuiz(lesson)) {
    const answers = state.quizAnswers[lesson.id] || {};
    const total = quiz.length;
    const correct = quiz.reduce((sum, question, index) => sum + (answers[index] === question.answer ? 1 : 0), 0);
    return { correct, total };
  }

  function bindRecipeEvents() {
    document.querySelectorAll("[data-start-cooking]").forEach((button) => {
      button.addEventListener("click", () => {
        const recipeId = button.dataset.startCooking;
        const existing = state.progress.activeSession?.recipeId === recipeId ? sanitizeActiveSession(state.progress.activeSession) : null;
        state.selectedRecipeId = null;
        state.cooking = existing || {
          recipeId,
          stepIndex: 0,
          startedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          checkedItems: {},
          stepNotes: {}
        };
        persistActiveSession();
        render();
      });
    });
  }

  function bindCookingEvents() {
    const stopCooking = document.querySelector("[data-stop-cooking]");
    if (stopCooking) {
      stopCooking.addEventListener("click", () => {
        if (!state.cooking) return;
        const ok = window.confirm("Quitter le mode cuisine ? La session sera conservée et pourra être reprise depuis l'accueil.");
        if (!ok) return;
        persistActiveSession();
        stopTimer(false);
        state.cooking = null;
        state.pendingPhoto = null;
        render();
      });
    }

    const next = document.querySelector("[data-next-step]");
    if (next) {
      next.addEventListener("click", () => {
        stopTimer(false);
        state.cooking.stepIndex += 1;
        persistActiveSession();
        render();
      });
    }

    const prev = document.querySelector("[data-prev-step]");
    if (prev) {
      prev.addEventListener("click", () => {
        stopTimer(false);
        state.cooking.stepIndex = Math.max(0, state.cooking.stepIndex - 1);
        persistActiveSession();
        render();
      });
    }

    document.querySelectorAll("[data-check-item]").forEach((input) => {
      input.addEventListener("change", () => {
        state.cooking.checkedItems = state.cooking.checkedItems || {};
        state.cooking.checkedItems[input.dataset.checkItem] = input.checked;
        persistActiveSession(false);
      });
    });

    const stepNote = document.querySelector("[data-step-note]");
    if (stepNote) {
      stepNote.addEventListener("input", () => {
        state.cooking.stepNotes = state.cooking.stepNotes || {};
        state.cooking.stepNotes[stepNote.dataset.stepNote] = sanitizeText(stepNote.value, 500);
        persistActiveSession(false);
      });
    }

    const startTimer = document.querySelector("[data-start-timer]");
    if (startTimer) {
      startTimer.addEventListener("click", () => {
        const [recipeId, stepIndex, seconds] = startTimer.dataset.startTimer.split("|");
        runTimer(`${recipeId}-${stepIndex}`, Number(seconds));
      });
    }

    const stopTimerButton = document.querySelector("[data-stop-timer]");
    if (stopTimerButton) stopTimerButton.addEventListener("click", () => stopTimer(true));

    const photoInput = document.getElementById("photo");
    if (photoInput) {
      photoInput.addEventListener("change", async (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        try {
          const dataUrl = await resizeImageToDataUrl(file, 900, 0.72);
          state.pendingPhoto = dataUrl;
          const preview = document.getElementById("photo-preview");
          if (preview) preview.innerHTML = `<img class="preview-photo" src="${escapeAttr(dataUrl)}" alt="Aperçu de la photo" />`;
        } catch (error) {
          console.error(error);
          setToast(error.message || "Impossible de lire cette image.");
        }
      });
    }

    const finishForm = document.getElementById("finish-recipe-form");
    if (finishForm) {
      finishForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const submitButton = finishForm.querySelector('button[type="submit"]');
        if (submitButton) submitButton.disabled = true;
        const data = new FormData(finishForm);
        await finishRecipe({
          recipeId: data.get("recipeId"),
          rating: Number(data.get("rating")),
          difficulty: Number(data.get("difficulty")),
          errorType: String(data.get("errorType") || ""),
          comment: String(data.get("comment") || "").trim(),
          nextFocus: String(data.get("nextFocus") || "").trim(),
          evaluation: {
            organisation: Number(data.get("eval_organisation")),
            cuisson: Number(data.get("eval_cuisson")),
            assaisonnement: Number(data.get("eval_assaisonnement")),
            texture: Number(data.get("eval_texture")),
            dressage: Number(data.get("eval_dressage"))
          },
          photoDataUrl: state.pendingPhoto
        });
        if (submitButton) submitButton.disabled = false;
      });
    }
  }

  function persistActiveSession(shouldSave = true) {
    if (!state.cooking) return;
    state.cooking.updatedAt = new Date().toISOString();
    state.progress.activeSession = sanitizeActiveSession(state.cooking);
    if (shouldSave) saveProgress();
  }

  function bindProfileEvents() {
    const exportFull = document.getElementById("export-full-progress");
    if (exportFull) exportFull.addEventListener("click", () => exportProgress({ includePhotos: true }));

    const exportLight = document.getElementById("export-light-progress");
    if (exportLight) exportLight.addEventListener("click", () => exportProgress({ includePhotos: false }));

    const exportArchive = document.getElementById("export-archive-progress");
    if (exportArchive) exportArchive.addEventListener("click", exportArchiveProgress);

    const redoOnboarding = document.getElementById("redo-onboarding");
    if (redoOnboarding) {
      redoOnboarding.addEventListener("click", () => {
        state.progress.preferences.onboardingDone = false;
        saveProgress();
        window.location.hash = "home";
        state.route = "home";
        render();
      });
    }

    const importInput = document.getElementById("import-progress");
    if (importInput) importInput.addEventListener("change", importProgress);

    const restoreBackup = document.getElementById("restore-pre-import-backup");
    if (restoreBackup) restoreBackup.addEventListener("click", restorePreImportBackup);

    const resetButton = document.getElementById("reset-progress");
    if (resetButton) {
      resetButton.addEventListener("click", async () => {
        const ok = window.confirm("Réinitialiser toute la progression locale ? Une sauvegarde de secours sera créée avant suppression.");
        if (!ok) return;
        await createPreImportBackup();
        state.progress = defaultProgress();
        state.cooking = null;
        state.pendingPhoto = null;
        stopTimer(false);
        saveProgress();
        setToast("Progression réinitialisée. Une sauvegarde de secours légère a été créée.");
        render();
      });
    }
  }

  function bindJournalEvents() {
    document.querySelectorAll("[data-delete-log]").forEach((button) => {
      button.addEventListener("click", async () => {
        const ok = window.confirm("Supprimer cette entrée du journal ? La progression XP ne sera pas recalculée.");
        if (!ok) return;
        const target = state.progress.recipeLogs.find((log) => log.id === button.dataset.deleteLog);
        if (target?.photoId) await deletePhotoDataUrl(target.photoId);
        state.progress.recipeLogs = state.progress.recipeLogs.filter((log) => log.id !== button.dataset.deleteLog);
        saveProgress();
        setToast("Entrée supprimée.");
        render();
      });
    });
  }

  async function finishRecipe({ recipeId, rating, difficulty, errorType, comment, nextFocus, evaluation, photoDataUrl }) {
    const recipe = getRecipe(recipeId);
    if (!recipe) return;

    const safeRating = clampNumber(rating, 1, 5, 3);
    const safeDifficulty = clampNumber(difficulty, 1, 5, 3);
    const firstCompletion = !completedRecipe(recipe.id);
    const xp = firstCompletion ? 55 + recipe.level * 15 + safeRating * 3 : 15 + safeRating * 2;

    if (firstCompletion) state.progress.completedRecipes.push(recipe.id);

    const safeEval = sanitizeEvaluation(evaluation);
    const evalValues = Object.values(safeEval).filter((value) => Number.isFinite(value));
    const evalAverage = evalValues.length ? evalValues.reduce((sum, value) => sum + value, 0) / evalValues.length : safeRating;
    practiceSkills(recipe.skillIds, firstCompletion ? 1 : 0.5, "practice");
    if (!firstCompletion) practiceSkills(recipe.skillIds, 1, "repeat");
    if (safeRating >= 4 && safeDifficulty <= 3 && evalAverage >= 3.8) practiceSkills(recipe.skillIds, 0.8, "assessment");
    if (errorType || evalAverage < 3.2) practiceSkills(recipe.skillIds, 0.7, "correction");
    addXp(xp, `Recette : ${recipe.title}`);

    const previousStats = state.progress.recipeStats[recipe.id] || { attempts: 0, bestRating: 0 };
    state.progress.recipeStats[recipe.id] = {
      attempts: previousStats.attempts + 1,
      bestRating: Math.max(previousStats.bestRating || 0, safeRating),
      lastCookedAt: new Date().toISOString(),
      lastDifficulty: safeDifficulty,
      lastErrorType: sanitizeText(errorType, 60)
    };

    const logId = `log-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let photoId = "";
    let photoOmitted = false;
    const safePhoto = sanitizePhotoDataUrl(photoDataUrl);
    if (safePhoto) {
      photoId = `photo-${logId}`;
      try {
        const saved = await savePhotoDataUrl(photoId, safePhoto);
        if (!saved) {
          photoId = "";
          photoOmitted = true;
        }
      } catch (error) {
        console.warn("Photo non enregistrée dans IndexedDB", error);
        photoId = "";
        photoOmitted = true;
      }
    }

    if (photoId) {
      state.progress.recipeCovers = state.progress.recipeCovers || {};
      state.progress.recipeCovers[recipe.id] = photoId;
    }

    state.progress.recipeLogs.push({
      id: logId,
      recipeId: recipe.id,
      date: new Date().toISOString(),
      rating: safeRating,
      difficulty: safeDifficulty,
      errorType: sanitizeText(errorType, 60),
      comment: sanitizeText(comment, 1200),
      nextFocus: sanitizeText(nextFocus, 500),
      evaluation: safeEval,
      photoId,
      photoDataUrl: null,
      photoOmitted,
      skillIds: recipe.skillIds
    });

    awardBadge("first-recipe");
    if (state.progress.completedRecipes.length >= 3) awardBadge("three-recipes");
    if (state.progress.completedRecipes.length >= 10) awardBadge("ten-recipes");
    if (recipe.skillIds.some((id) => ["deglacer", "reduire", "emulsion", "liaison"].includes(id))) {
      awardBadge("sauce-base");
      awardBadge("sauce-starter");
    }
    if (recipe.skillIds.some((id) => ["legumineuses", "legumes"].includes(id))) awardBadge("vegetal-cook");
    if (recipe.skillIds.some((id) => ["patisserie", "pate", "caramel"].includes(id))) awardBadge("dessert-base");
    if (recipe.skillIds.some((id) => ["viande", "poisson"].includes(id))) awardBadge("protein-master");
    if (safeRating >= 5) awardBadge("five-star");

    state.progress.activeSession = null;
    saveProgress();
    state.cooking = null;
    state.pendingPhoto = null;
    stopTimer(false);
    setToast(`Recette enregistrée : +${xp} XP`);
    window.location.hash = "journal";
    state.route = "journal";
    render();
  }

  function closeModal() {
    if (bindLessonEvents._quizKeyHandler) {
      document.removeEventListener("keydown", bindLessonEvents._quizKeyHandler);
      bindLessonEvents._quizKeyHandler = null;
    }
    state.selectedLessonId = null;
    state.lessonMode = "lesson";
    state.selectedRecipeId = null;
    render();
  }

  function runTimer(stepKey, seconds) {
    stopTimer(false);
    state.activeTimer = {
      stepKey,
      duration: seconds,
      endAt: Date.now() + seconds * 1000
    };
    state.timerIntervalId = window.setInterval(() => {
      if (!state.activeTimer) return;
      if (Date.now() >= state.activeTimer.endAt) {
        stopTimer(false);
        setToast("Minuteur terminé.");
        if (navigator.vibrate) navigator.vibrate([180, 100, 180]);
        renderPreserveModalScroll();
        return;
      }
      // Mise à jour ciblée : évite un full re-render toutes les secondes
      const timerEl = document.querySelector(".timer-value");
      if (timerEl && state.cooking) {
        const remaining = Math.max(0, Math.ceil((state.activeTimer.endAt - Date.now()) / 1000));
        timerEl.textContent = formatSeconds(remaining);
      } else {
        renderPreserveModalScroll();
      }
    }, 1000);
    renderPreserveModalScroll();
  }

  function stopTimer(refresh) {
    if (state.timerIntervalId) window.clearInterval(state.timerIntervalId);
    state.timerIntervalId = null;
    state.activeTimer = null;
    if (refresh) renderPreserveModalScroll();
  }

  function getTimerRemaining(stepKey, fallbackSeconds) {
    if (!state.activeTimer || state.activeTimer.stepKey !== stepKey) return fallbackSeconds;
    return Math.max(0, Math.ceil((state.activeTimer.endAt - Date.now()) / 1000));
  }

  function formatSeconds(seconds) {
    const total = Math.max(0, Number(seconds) || 0);
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }


  function localDateFromKey(key) {
    const [year, month, day] = String(key || localDateKey()).split("-").map(Number);
    return new Date(year || 2000, (month || 1) - 1, day || 1);
  }

  function startOfWeekLocalKey(date = new Date()) {
    const d = date instanceof Date ? new Date(date) : new Date(date);
    const day = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - day);
    return localDateKey(d);
  }

  function countActiveDaysThisWeek() {
    const start = startOfWeekLocalKey();
    const end = addDaysLocalDate(start, 7);
    const days = new Set((state.progress.xpHistory || []).filter((item) => item.localDate >= start && item.localDate < end).map((item) => item.localDate));
    return days.size;
  }

  function normalizeSearchText(value) {
    return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  function formatDate(iso) {
    try {
      return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  function averageRating(logs) {
    if (!logs.length) return "-";
    const total = logs.reduce((sum, log) => sum + Number(log.rating || 0), 0);
    return (total / logs.length).toFixed(1);
  }

  function countDueReviews() {
    const today = localDateKey();
    return Object.values(state.progress.lessonResults).filter((result) => result?.nextReviewLocalDate && result.nextReviewLocalDate <= today).length;
  }

  function setToast(message, duration) {
    state.toast = sanitizeText(message, 180);
    window.clearTimeout(setToast.timeoutId);
    // Durée plus longue pour les messages de badge ou d'XP important
    const isBadge = String(message).toLowerCase().includes("badge") || String(message).toLowerCase().includes("xp");
    const ms = duration || (isBadge ? 4000 : 2800);
    setToast.timeoutId = window.setTimeout(() => {
      state.toast = null;
      render();
    }, ms);
    render();
  }

  function buildExportPayload({ includePhotos }) {
    const progress = normalizeProgress(state.progress);
    progress.recipeLogs = progress.recipeLogs.map((log) => ({
      ...log,
      photoDataUrl: includePhotos ? log.photoDataUrl : null,
      photoOmitted: includePhotos ? Boolean(log.photoOmitted) : Boolean((log.photoId || log.photoDataUrl) && !log.photoId)
    }));
    const payload = {
      appName: "coach-cuisine",
      appVersion: DATA.appVersion,
      schemaVersion: 20,
      exportType: includePhotos ? "complete" : "light",
      exportedAt: new Date().toISOString(),
      summary: summarizeProgress(progress),
      progress
    };
    payload.checksum = simpleHash(JSON.stringify({ ...payload, checksum: undefined }));
    return payload;
  }

  async function buildExportPayloadAsync({ includePhotos }) {
    const payload = buildExportPayload({ includePhotos });
    payload.exportType = includePhotos ? "complete" : "light";
    if (includePhotos) {
      for (const log of payload.progress.recipeLogs) {
        let dataUrl = sanitizePhotoDataUrl(log.photoDataUrl);
        if (!dataUrl && log.photoId) dataUrl = await getPhotoDataUrl(log.photoId);
        log.photoDataUrl = includePhotos ? dataUrl : null;
        log.photoOmitted = Boolean((log.photoId || log.photoDataUrl) && !dataUrl);
      }
    }
    payload.summary = summarizeProgress(payload.progress);
    payload.checksum = simpleHash(JSON.stringify({ ...payload, checksum: undefined }));
    return payload;
  }

  async function exportProgress({ includePhotos }) {
    try {
      const payload = await buildExportPayloadAsync({ includePhotos });
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `coach-cuisine-${includePhotos ? "complet" : "leger"}-${localDateKey()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setToast(includePhotos ? "Export complet généré." : "Export léger généré.");
    } catch (error) {
      console.error(error);
      setToast("Export impossible. Essaie l'export léger.");
    }
  }


  async function exportArchiveProgress() {
    try {
      const progress = normalizeProgress(state.progress);
      const photoFiles = [];
      for (const log of progress.recipeLogs) {
        const photoId = sanitizeId(log.photoId);
        if (!photoId) continue;
        const dataUrl = await getPhotoDataUrl(photoId);
        if (!dataUrl) {
          log.photoOmitted = true;
          continue;
        }
        const ext = photoExtensionFromDataUrl(dataUrl);
        const filename = `photos/${photoId}.${ext}`;
        photoFiles.push({ name: filename, data: dataUrlToUint8Array(dataUrl) });
        log.photoFile = filename;
        log.photoDataUrl = null;
      }
      const manifest = {
        appName: "coach-cuisine",
        appVersion: DATA.appVersion,
        schemaVersion: 20,
        exportType: "archive-zip",
        exportedAt: new Date().toISOString(),
        summary: summarizeProgress(progress),
        notes: "Archive Coach Cuisine V20. Pour restaurer directement dans l'app, utilise l'export complet JSON.",
        progress
      };
      const files = [
        { name: "progress.json", data: textToUint8Array(JSON.stringify(manifest, null, 2)) },
        { name: "README.txt", data: textToUint8Array("Archive Coach Cuisine V20. progress.json contient la progression. Le dossier photos contient les images du journal. Pour une restauration directe dans l'app, utiliser l'export complet JSON.\n") },
        ...photoFiles
      ];
      const blob = makeZipBlob(files);
      downloadBlob(blob, `coach-cuisine-archive-${localDateKey()}.zip`);
      setToast("Archive ZIP générée.");
    } catch (error) {
      console.error(error);
      setToast("Archive ZIP impossible. Utilise l'export complet JSON.");
    }
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function makeZipBlob(files) {
    const localParts = [];
    const centralParts = [];
    let offset = 0;
    files.forEach((file) => {
      const nameBytes = textToUint8Array(file.name);
      const data = file.data instanceof Uint8Array ? file.data : textToUint8Array(String(file.data || ""));
      const crc = crc32(data);
      const { time, date } = dosDateTime(new Date());
      const localHeader = concatUint8Arrays([
        u32(0x04034b50), u16(20), u16(0), u16(0), u16(time), u16(date), u32(crc), u32(data.length), u32(data.length), u16(nameBytes.length), u16(0)
      ]);
      localParts.push(localHeader, nameBytes, data);
      const centralHeader = concatUint8Arrays([
        u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(time), u16(date), u32(crc), u32(data.length), u32(data.length), u16(nameBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset)
      ]);
      centralParts.push(centralHeader, nameBytes);
      offset += localHeader.length + nameBytes.length + data.length;
    });
    const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
    const end = concatUint8Arrays([
      u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length), u32(centralSize), u32(offset), u16(0)
    ]);
    return new Blob([...localParts, ...centralParts, end], { type: "application/zip" });
  }

  function u16(value) {
    const arr = new Uint8Array(2);
    new DataView(arr.buffer).setUint16(0, value, true);
    return arr;
  }

  function u32(value) {
    const arr = new Uint8Array(4);
    new DataView(arr.buffer).setUint32(0, value >>> 0, true);
    return arr;
  }

  function concatUint8Arrays(parts) {
    const size = parts.reduce((sum, part) => sum + part.length, 0);
    const output = new Uint8Array(size);
    let offset = 0;
    parts.forEach((part) => {
      output.set(part, offset);
      offset += part.length;
    });
    return output;
  }

  function textToUint8Array(text) {
    return new TextEncoder().encode(text);
  }

  function dataUrlToUint8Array(dataUrl) {
    const base64 = String(dataUrl).split(",")[1] || "";
    const binary = atob(base64);
    const output = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) output[i] = binary.charCodeAt(i);
    return output;
  }

  function photoExtensionFromDataUrl(dataUrl) {
    const match = String(dataUrl).match(/^data:image\/(jpeg|jpg|png|webp);/i);
    if (!match) return "jpg";
    return match[1].toLowerCase() === "jpeg" ? "jpg" : match[1].toLowerCase();
  }

  function dosDateTime(date) {
    const year = Math.max(1980, date.getFullYear());
    const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
    const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
    return { time, date: dosDate };
  }

  function crc32(data) {
    if (!crc32.table) {
      crc32.table = Array.from({ length: 256 }, (_, n) => {
        let c = n;
        for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        return c >>> 0;
      });
    }
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i += 1) crc = crc32.table[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }

  async function createPreImportBackup() {
    const payload = buildExportPayload({ includePhotos: false });
    safeSetLocalStorage(PRE_IMPORT_BACKUP_KEY, JSON.stringify(payload));
  }

  async function importProgress(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      if (file.size > MAX_IMPORT_BYTES) throw new Error("Fichier trop volumineux pour un import JSON sécurisé.");
      const text = await file.text();
      const payload = JSON.parse(text);
      const importedProgress = validateImportPayload(payload);
      const summary = summarizeProgress(importedProgress);
      const ok = window.confirm([
        "Sauvegarde détectée :",
        `- Export : ${payload.exportedAt ? formatDate(payload.exportedAt) : "date inconnue"}`,
        `- XP : ${summary.xp}`,
        `- Leçons : ${summary.lessons}`,
        `- Recettes : ${summary.recipes}`,
        `- Entrées journal : ${summary.logs}`,
        `- Photos incluses : ${summary.photos}`,
        "",
        "Importer cette sauvegarde et remplacer la progression actuelle ?"
      ].join("\n"));
      if (!ok) return;
      await createPreImportBackup();
      await materializeImportedPhotos(importedProgress);
      state.progress = importedProgress;
      state.pendingPhoto = null;
      state.cooking = null;
      state.quizAnswers = {};
      stopTimer(false);
      saveProgress();
      setToast("Sauvegarde importée. Une copie légère de l'ancien état a été conservée.");
      render();
    } catch (error) {
      console.error(error);
      setToast(error.message || "Import impossible.");
    } finally {
      event.target.value = "";
    }
  }

  function validateImportPayload(payload) {
    if (!payload || typeof payload !== "object") throw new Error("Fichier JSON invalide.");
    if (payload.appName !== "coach-cuisine") throw new Error("Ce fichier ne semble pas être une sauvegarde Coach Cuisine.");
    if (![1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].includes(payload.schemaVersion)) throw new Error("Version de sauvegarde non supportée.");
    if (!payload.progress || typeof payload.progress !== "object") throw new Error("La progression est absente du fichier.");
    return normalizeProgress(payload.progress);
  }

  async function materializeImportedPhotos(progress) {
    for (const log of progress.recipeLogs) {
      const dataUrl = sanitizePhotoDataUrl(log.photoDataUrl);
      if (!dataUrl) {
        log.photoDataUrl = null;
        continue;
      }
      const photoId = sanitizeId(log.photoId) || `photo-${log.id}`;
      try {
        const saved = await savePhotoDataUrl(photoId, dataUrl);
        if (saved) {
          log.photoId = photoId;
          log.photoDataUrl = null;
          log.photoOmitted = false;
        }
      } catch (error) {
        console.warn("Photo importée non stockée", error);
        log.photoDataUrl = null;
        log.photoOmitted = true;
      }
    }
  }

  async function restorePreImportBackup() {
    try {
      const raw = localStorage.getItem(PRE_IMPORT_BACKUP_KEY);
      if (!raw) return;
      const payload = JSON.parse(raw);
      const importedProgress = validateImportPayload(payload);
      const ok = window.confirm("Restaurer la sauvegarde créée avant le dernier import/réinitialisation ?");
      if (!ok) return;
      await materializeImportedPhotos(importedProgress);
      state.progress = importedProgress;
      state.cooking = null;
      state.pendingPhoto = null;
      stopTimer(false);
      saveProgress();
      setToast("Sauvegarde de secours restaurée.");
      render();
    } catch (error) {
      console.error(error);
      setToast("Sauvegarde de secours illisible.");
    }
  }

  function summarizeProgress(progress) {
    return {
      xp: progress.xp,
      lessons: progress.completedLessons.length,
      recipes: progress.completedRecipes.length,
      logs: progress.recipeLogs.length,
      photos: progress.recipeLogs.filter((log) => Boolean(log.photoId || log.photoDataUrl)).length,
      badges: progress.badges.length,
      schemaVersion: progress.schemaVersion
    };
  }

  function resizeImageToDataUrl(file, maxSize, quality) {
    return new Promise((resolve, reject) => {
      if (!file.type || !file.type.startsWith("image/")) {
        reject(new Error("Le fichier sélectionné n'est pas une image."));
        return;
      }
      if (file.size > MAX_PHOTO_FILE_BYTES) {
        reject(new Error("Image trop lourde. Choisis une photo plus légère."));
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Lecture du fichier impossible."));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("Image invalide."));
        img.onload = () => {
          const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
          const width = Math.max(1, Math.round(img.width * scale));
          const height = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          if (dataUrl.length > MAX_PHOTO_DATA_URL_CHARS) {
            reject(new Error("Photo compressée encore trop lourde. Essaie une image plus petite."));
            return;
          }
          resolve(dataUrl);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function sanitizePhotoDataUrl(value) {
    if (typeof value !== "string") return null;
    if (value.length > MAX_PHOTO_DATA_URL_CHARS) return null;
    if (!/^data:image\/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=\s]+$/i.test(value)) return null;
    return value.replace(/\s/g, "");
  }


  function openPhotoDb() {
    if (!window.indexedDB) return Promise.reject(new Error("IndexedDB indisponible sur ce navigateur."));
    if (openPhotoDb.promise) return openPhotoDb.promise;
    openPhotoDb.promise = new Promise((resolve, reject) => {
      const request = indexedDB.open(PHOTO_DB_NAME, 1);
      request.onerror = () => reject(new Error("Ouverture du stockage photo impossible."));
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(PHOTO_STORE_NAME)) {
          db.createObjectStore(PHOTO_STORE_NAME, { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
    });
    return openPhotoDb.promise;
  }

  async function savePhotoDataUrl(photoId, dataUrl) {
    const safeId = sanitizeId(photoId);
    const safeDataUrl = sanitizePhotoDataUrl(dataUrl);
    if (!safeId || !safeDataUrl) return false;
    const db = await openPhotoDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(PHOTO_STORE_NAME, "readwrite");
      tx.onerror = () => reject(new Error("Sauvegarde photo impossible."));
      tx.oncomplete = () => resolve(true);
      tx.objectStore(PHOTO_STORE_NAME).put({
        id: safeId,
        dataUrl: safeDataUrl,
        savedAt: new Date().toISOString()
      });
    });
  }

  async function getPhotoDataUrl(photoId) {
    const safeId = sanitizeId(photoId);
    if (!safeId) return null;
    try {
      const db = await openPhotoDb();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(PHOTO_STORE_NAME, "readonly");
        const request = tx.objectStore(PHOTO_STORE_NAME).get(safeId);
        request.onerror = () => reject(new Error("Lecture photo impossible."));
        request.onsuccess = () => resolve(sanitizePhotoDataUrl(request.result?.dataUrl));
      });
    } catch (error) {
      console.warn("Lecture IndexedDB photo impossible", error);
      return null;
    }
  }

  async function deletePhotoDataUrl(photoId) {
    const safeId = sanitizeId(photoId);
    if (!safeId) return;
    try {
      const db = await openPhotoDb();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(PHOTO_STORE_NAME, "readwrite");
        tx.onerror = () => reject(new Error("Suppression photo impossible."));
        tx.oncomplete = () => resolve();
        tx.objectStore(PHOTO_STORE_NAME).delete(safeId);
      });
    } catch (error) {
      console.warn("Suppression photo IndexedDB impossible", error);
    }
  }

  async function migrateInlinePhotosFromProgress() {
    let changed = false;
    for (const log of state.progress.recipeLogs) {
      if (!log.photoDataUrl || log.photoId) continue;
      const photoId = `photo-${log.id}`;
      try {
        const saved = await savePhotoDataUrl(photoId, log.photoDataUrl);
        if (saved) {
          log.photoId = photoId;
          log.photoDataUrl = null;
          log.photoOmitted = false;
          changed = true;
        }
      } catch (error) {
        console.warn("Migration d'une photo impossible", error);
      }
    }
    if (changed) {
      saveProgress();
      if (state.route === "journal" || state.route === "profile") render();
    }
  }

  async function hydrateLogPhotos() {
    const nodes = Array.from(document.querySelectorAll("img[data-photo-id]"));
    await Promise.all(nodes.map(async (img) => {
      const dataUrl = await getPhotoDataUrl(img.dataset.photoId);
      if (dataUrl && document.body.contains(img)) {
        img.src = dataUrl;
        img.classList.remove("photo-loading");
      } else if (document.body.contains(img)) {
        if (img.dataset.fallbackSrc) {
          img.src = img.dataset.fallbackSrc;
          img.removeAttribute("data-photo-id");
          return;
        }
        img.replaceWith(Object.assign(document.createElement("div"), {
          className: "photo-omitted",
          textContent: "Photo locale indisponible. Réimporte un export complet si besoin."
        }));
      }
    }));
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch((error) => {
        console.warn("Service worker non enregistré", error);
      });
    });
  }

  function cleanIdArray(input, allowedSet, maxLength) {
    if (!Array.isArray(input)) return [];
    const output = [];
    input.forEach((value) => {
      const id = sanitizeId(value);
      if (id && allowedSet.has(id) && !output.includes(id)) output.push(id);
    });
    return output.slice(0, maxLength);
  }

  function sanitizeId(value) {
    if (typeof value !== "string") return "";
    return value.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 90);
  }

  function sanitizeText(value, maxLength) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/[\u0000-\u001F\u007F]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, maxLength);
  }

  function sanitizeLocalDate(value) {
    if (typeof value !== "string") return null;
    return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
  }

  function validIso(value) {
    if (typeof value !== "string") return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  function clampNumber(value, min, max, fallback) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, number));
  }

  function roundOne(value) {
    return Math.round(Number(value) * 10) / 10;
  }

  function simpleHash(text) {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function mostCommon(values) {
    const counts = new Map();
    values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
    let best = null;
    let bestCount = 0;
    counts.forEach((count, value) => {
      if (count > bestCount) {
        best = value;
        bestCount = count;
      }
    });
    return best;
  }

  function labelErrorType(value) {
    const labels = {
      assaisonnement: "Assaisonnement",
      cuisson: "Cuisson",
      texture: "Texture",
      organisation: "Organisation / timing",
      decoupe: "Découpe",
      sauce: "Sauce / liaison",
      dressage: "Dressage"
    };
    return labels[value] || value;
  }
})();
