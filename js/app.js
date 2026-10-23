/**
 * QuizVerse - Main Application Orchestrator
 * Coordinates:
 * - Single-Page Architecture & URL Hash Routing (#home, #category-id, #quiz-id, #results, #legal)
 * - Challenge deep-link detection (?quiz=...&challenger=...&score=...)
 * - Multi-language translation engine (English, Hindi, Gujarati)
 * - Light / Dark Theme toggle with persistent storage
 * - Daily Streak Counter & Milestone Badges
 * - Push Notification & Daily Reminder Banner
 * - Local Leaderboard management
 * - Dynamic SEO meta tags & JSON-LD updates
 * - Analytics event tracking (GA4 compatible)
 */

// Current App State
const APP_STATE = {
  currentLang: "en",
  currentTheme: "dark",
  currentView: "home",
  activeCategory: null
};

/**
 * Global Event Tracker (Google Analytics 4 & Search Console ready)
 */
function trackEvent(eventName, params = {}) {
  console.log(`[Analytics] Track Event: ${eventName}`, params);
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/**
 * Initializes the entire QuizVerse application
 */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLanguage();
  initStreak();
  initDailyChallengeCard();
  initCategoriesGrid();
  initNotificationBanner();
  initRouting();
  checkChallengerParams();

  // Initialize Ad and Quiz Engines
  if (typeof ADS_ENGINE !== "undefined") {
    ADS_ENGINE.init();
  }
  if (typeof QUIZ_ENGINE !== "undefined") {
    QUIZ_ENGINE.init();
  }

  // Setup Global Listeners
  setupEventListeners();
  console.log("⚡ QuizVerse App successfully initialized!");
});

/**
 * Theme Manager: Dark & Light Mode
 */
function initTheme() {
  const savedTheme = localStorage.getItem("quizverse_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");

  setTheme(theme);
}

function setTheme(theme) {
  APP_STATE.currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("quizverse_theme", theme);

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    if (theme === "dark") {
      themeBtn.innerHTML = `<span class="icon">☀️</span><span class="label" data-i18n="lightMode">Light</span>`;
      themeBtn.setAttribute("aria-label", "Switch to Light Mode");
    } else {
      themeBtn.innerHTML = `<span class="icon">🌙</span><span class="label" data-i18n="darkMode">Dark</span>`;
      themeBtn.setAttribute("aria-label", "Switch to Dark Mode");
    }
  }
}

function toggleTheme() {
  const newTheme = APP_STATE.currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  trackEvent("theme_toggled", { theme: newTheme });
}

/**
 * Localization Manager: English, Hindi, Gujarati
 */
function initLanguage() {
  const savedLang = localStorage.getItem("quizverse_lang") || "en";
  setLanguage(savedLang);

  const select = document.getElementById("lang-select");
  if (select) {
    select.value = savedLang;
    select.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = "en";
  APP_STATE.currentLang = lang;
  localStorage.setItem("quizverse_lang", lang);
  document.documentElement.setAttribute("lang", lang);

  // Apply translations to all data-i18n elements
  const dict = TRANSLATIONS[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Re-render categories grid to update localized category names
  initCategoriesGrid();

  trackEvent("language_changed", { language: lang });
}

/**
 * Streak & Retention Tracker
 */
function initStreak() {
  updateStreakDisplay();
}

function updateStreakDisplay() {
  const streakCount = parseInt(localStorage.getItem("quizverse_streak_count") || "0", 10);
  const streakEls = document.querySelectorAll(".streak-badge-count");
  streakEls.forEach(el => {
    el.textContent = `${streakCount} ${streakCount === 1 ? 'Day' : 'Days'}`;
  });

  const streakPill = document.getElementById("header-streak-pill");
  if (streakPill) {
    if (streakCount > 0) {
      streakPill.classList.remove("hidden");
      streakPill.title = `You are on a ${streakCount}-day streak! Keep it burning 🔥`;
    } else {
      streakPill.classList.remove("hidden");
    }
  }
}

/**
 * Daily Challenge Card on Home View
 */
function initDailyChallengeCard() {
  const completedDate = localStorage.getItem("quizverse_daily_completed_date");
  const todayStr = new Date().toISOString().slice(0, 10);
  const isCompleted = (completedDate === todayStr);

  const playBtn = document.getElementById("daily-challenge-btn");
  const statusBadge = document.getElementById("daily-status-badge");

  if (isCompleted) {
    if (playBtn) {
      playBtn.textContent = "Completed Today ✓";
      playBtn.classList.add("btn-completed");
    }
    if (statusBadge) {
      statusBadge.textContent = "Completed Today 🔥";
      statusBadge.classList.add("completed");
    }
  } else {
    if (playBtn) {
      playBtn.textContent = "Play Today's Challenge (5 Qs) →";
      playBtn.classList.remove("btn-completed");
    }
    if (statusBadge) {
      statusBadge.textContent = "New Today ⚡";
      statusBadge.classList.remove("completed");
    }
  }
}

/**
 * Dynamically builds the Categories Grid on Home View
 */
function initCategoriesGrid() {
  const grid = document.getElementById("categories-grid");
  if (!grid) return;

  grid.innerHTML = "";
  const lang = APP_STATE.currentLang;

  CATEGORIES.forEach((cat) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.style.setProperty("--cat-gradient", cat.gradient);

    // Pick localized name if available
    let name = cat.name;
    if (lang === "hi" && cat.nameHi) name = cat.nameHi;
    if (lang === "gu" && cat.nameGu) name = cat.nameGu;

    const bestScore = localStorage.getItem(`quizverse_best_${cat.id}`) || "0";

    card.innerHTML = `
      <div class="category-icon-wrapper">${cat.icon}</div>
      <div class="category-info">
        <h3 class="category-title">${name}</h3>
        <p class="category-tagline">${cat.tagline}</p>
        <div class="category-meta">
          <span class="meta-questions">10 Questions</span>
          ${bestScore !== "0" ? `<span class="meta-best">Best: ${bestScore} PTS</span>` : `<span class="meta-best new">Ready</span>`}
        </div>
      </div>
      <button class="btn btn-cat-play" onclick="navigateTo('category-${cat.id}')">
        Play &rarr;
      </button>
    `;
    grid.appendChild(card);
  });
}

/**
 * Challenger Deep Link Detector (?quiz=cricket&challenger=Rahul&score=850)
 */
function checkChallengerParams() {
  const params = new URLSearchParams(window.location.search);
  const challenger = params.get("challenger");
  const quizCat = params.get("quiz");
  const score = params.get("score");

  if (challenger && quizCat && score) {
    const banner = document.getElementById("challenge-alert-banner");
    const textEl = document.getElementById("challenge-alert-text");
    const acceptBtn = document.getElementById("challenge-accept-btn");

    if (banner && textEl && acceptBtn) {
      const catObj = CATEGORIES.find(c => c.id === quizCat) || { name: quizCat };
      textEl.innerHTML = `🔥 <strong>${escapeHtml(challenger)}</strong> challenged you to beat <strong>${escapeHtml(score)} PTS</strong> in <strong>${catObj.name}</strong>!`;
      banner.classList.remove("hidden");

      acceptBtn.onclick = () => {
        banner.classList.add("hidden");
        navigateTo(`quiz-${quizCat}`);
      };
    }
  }
}

/**
 * View Routing & Navigation System
 */
function initRouting() {
  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();
}

function handleHashChange() {
  const hash = window.location.hash.replace("#", "") || "home";
  navigateTo(hash, false);
}

function navigateTo(target, updateHash = true) {
  if (updateHash) {
    window.location.hash = target;
    return;
  }

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Hide all views
  document.querySelectorAll(".view-container").forEach(el => el.classList.add("hidden"));

  APP_STATE.currentView = target;

  if (target === "home") {
    showView("view-home");
    updateSEO("Home", "QuizVerse - Play daily trivia quizzes in Cricket, India GK, and Science. Challenge friends on WhatsApp and earn high scores!");
  } else if (target.startsWith("category-")) {
    const catId = target.replace("category-", "");
    renderCategoryDetailPage(catId);
    showView("view-category-detail");
  } else if (target.startsWith("quiz-")) {
    const catId = target.replace("quiz-", "");
    showView("view-quiz");
    if (catId === "daily") {
      QUIZ_ENGINE.startDailyChallenge();
      updateSEO("Daily Trivia Challenge", "Play today's 5 handpicked trivia questions on QuizVerse. Keep your daily streak alive!");
    } else {
      QUIZ_ENGINE.startQuiz(catId);
      const catObj = CATEGORIES.find(c => c.id === catId);
      updateSEO(`${catObj ? catObj.name : "Quiz"}`, `10-question rapid trivia challenge in ${catObj ? catObj.name : "trivia"}.`);
    }
  } else if (target === "results") {
    showView("view-results");
    updateSEO("Quiz Results", "Your QuizVerse performance scorecard, honorary rank, and badges.");
  } else if (target === "leaderboard") {
    renderLeaderboardView();
    showView("view-leaderboard");
    updateSEO("Leaderboard", "QuizVerse local hall of fame and top scorers.");
  } else if (target === "about") {
    showView("view-about");
    updateSEO("About QuizVerse", "Learn more about QuizVerse - India's premier trivia gaming and educational hub.");
  } else if (target === "contact") {
    showView("view-contact");
    updateSEO("Contact Us", "Get in touch with the QuizVerse editorial and support team.");
  } else if (target === "privacy") {
    showView("view-privacy");
    updateSEO("Privacy Policy", "QuizVerse Privacy Policy, Google AdSense cookies, and user data rights.");
  } else if (target === "terms") {
    showView("view-terms");
    updateSEO("Terms & Conditions", "QuizVerse terms of service and website usage rules.");
  } else {
    // Default fallback
    showView("view-home");
  }

  trackEvent("view_changed", { view: target });
}

function showView(viewId) {
  const el = document.getElementById(viewId);
  if (el) {
    el.classList.remove("hidden");
  }
}

/**
 * Category Page Detailed Content (150-200 Words SEO & AdSense Compliant)
 */
function renderCategoryDetailPage(catId) {
  const cat = CATEGORIES.find(c => c.id === catId) || CATEGORIES[0];
  APP_STATE.activeCategory = cat;

  const titleEl = document.getElementById("cat-detail-title");
  const iconEl = document.getElementById("cat-detail-icon");
  const descEl = document.getElementById("cat-detail-desc");
  const seoTextEl = document.getElementById("cat-detail-seo-text");
  const playBtn = document.getElementById("cat-detail-start-btn");
  const bestScoreEl = document.getElementById("cat-detail-best-score");

  if (titleEl) titleEl.textContent = cat.name;
  if (iconEl) iconEl.textContent = cat.icon;
  if (descEl) descEl.textContent = cat.tagline;
  if (seoTextEl) seoTextEl.textContent = cat.seoContent;
  
  const bestScore = localStorage.getItem(`quizverse_best_${cat.id}`) || "0";
  if (bestScoreEl) bestScoreEl.textContent = bestScore !== "0" ? `${bestScore} PTS` : "None yet";

  if (playBtn) {
    playBtn.onclick = () => navigateTo(`quiz-${cat.id}`);
  }

  updateSEO(cat.seoTitle, cat.seoDesc);
}

/**
 * Leaderboard View Renderer
 */
function renderLeaderboardView() {
  const listContainer = document.getElementById("leaderboard-list");
  if (!listContainer) return;

  const raw = localStorage.getItem("quizverse_leaderboard");
  const board = raw ? JSON.parse(raw) : [];

  if (board.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-state">
        <p>No champions recorded yet. Play a quiz to claim the #1 spot!</p>
        <button class="btn btn-primary" onclick="navigateTo('home')">Start Playing</button>
      </div>
    `;
    return;
  }

  const medals = ["🥇", "🥈", "🥉"];
  listContainer.innerHTML = `
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Category</th>
          <th>Score</th>
          <th>Points</th>
          <th class="date-col">Date</th>
        </tr>
      </thead>
      <tbody>
        ${board.map((item, idx) => `
          <tr class="${idx < 3 ? 'top-tier' : ''}">
            <td class="rank-cell"><strong>${medals[idx] || `#${idx + 1}`}</strong></td>
            <td><strong>${escapeHtml(item.player)}</strong></td>
            <td>${escapeHtml(item.category)}</td>
            <td><span class="score-pill">${escapeHtml(item.score)}</span></td>
            <td><strong class="points-val">${item.points.toLocaleString()} PTS</strong></td>
            <td class="date-cell">${escapeHtml(item.date)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

/**
 * Push Notification / Daily Reminder UI
 * Features mock/local prompt with clear instructions for Push API / OneSignal integration
 */
function initNotificationBanner() {
  const dismissed = localStorage.getItem("quizverse_reminder_dismissed");
  const banner = document.getElementById("daily-reminder-banner");
  if (!banner || dismissed) return;

  banner.classList.remove("hidden");

  const enableBtn = document.getElementById("reminder-enable-btn");
  const dismissBtn = document.getElementById("reminder-dismiss-btn");

  if (enableBtn) {
    enableBtn.onclick = () => {
      // Browser Notification Request
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("QuizVerse Daily Reminder", {
              body: "You're all set! We'll remind you every morning when the new Daily Challenge arrives.",
              icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>"
            });
          }
        });
      }

      /* 
       * PRODUCTION INTEGRATION GUIDE FOR PUSH NOTIFICATIONS:
       * 1. Register with Firebase Cloud Messaging (FCM) or OneSignal (free tier up to 10k users).
       * 2. Add service worker: navigator.serviceWorker.register('/sw.js')
       * 3. Send daily cron ping at 08:00 AM IST with today's challenge preview.
       */
      localStorage.setItem("quizverse_reminder_dismissed", "true");
      banner.classList.add("hidden");
      if (typeof SHARE_ENGINE !== "undefined") {
        SHARE_ENGINE.showToast("Daily reminders enabled! 🔥");
      }
      trackEvent("daily_reminder_enabled");
    };
  }

  if (dismissBtn) {
    dismissBtn.onclick = () => {
      localStorage.setItem("quizverse_reminder_dismissed", "true");
      banner.classList.add("hidden");
      trackEvent("daily_reminder_dismissed");
    };
  }
}

/**
 * Dynamic SEO Updater (Title, Description, and JSON-LD schema)
 */
function updateSEO(title, description) {
  document.title = `${title} | QuizVerse Trivia`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", `${title} | QuizVerse`);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", description);

  // Update JSON-LD structured data
  const jsonLd = document.getElementById("json-ld-schema");
  if (jsonLd) {
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Quiz",
      "name": title,
      "description": description,
      "educationalLevel": "Intermediate",
      "inLanguage": APP_STATE.currentLang,
      "isAccessibleForFree": true,
      "provider": {
        "@type": "Organization",
        "name": "QuizVerse",
        "url": QUIZ_CONFIG.siteUrl
      }
    });
  }
}

/**
 * Global Event Listeners (Lifeline, Buttons, Modal close)
 */
function setupEventListeners() {
  // Theme Toggle Button
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) themeBtn.onclick = toggleTheme;

  // Sound Toggle Button
  const soundBtn = document.getElementById("sound-toggle-btn");
  if (soundBtn) {
    soundBtn.onclick = () => {
      if (typeof QUIZ_ENGINE !== "undefined") QUIZ_ENGINE.toggleSound();
    };
  }

  // 50/50 Lifeline Button
  const lifelineBtn = document.getElementById("quiz-lifeline-5050");
  if (lifelineBtn) {
    lifelineBtn.onclick = () => {
      if (typeof QUIZ_ENGINE !== "undefined") QUIZ_ENGINE.use5050Lifeline();
    };
  }

  // Quiz Next Button
  const nextBtn = document.getElementById("quiz-next-btn");
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (typeof QUIZ_ENGINE !== "undefined") QUIZ_ENGINE.nextQuestion();
    };
  }

  // Daily Challenge Action Button on Home
  const dailyBtn = document.getElementById("daily-challenge-btn");
  if (dailyBtn) {
    dailyBtn.onclick = () => navigateTo("quiz-daily");
  }

  // Result Page Buttons
  const playAgainBtn = document.getElementById("result-play-again-btn");
  if (playAgainBtn) {
    playAgainBtn.onclick = () => {
      if (QUIZ_ENGINE.isDaily) {
        navigateTo("quiz-daily");
      } else if (QUIZ_ENGINE.category) {
        navigateTo(`quiz-${QUIZ_ENGINE.category.id}`);
      } else {
        navigateTo("home");
      }
    };
  }

  const exploreBtn = document.getElementById("result-explore-btn");
  if (exploreBtn) {
    exploreBtn.onclick = () => navigateTo("home");
  }

  // Share Actions
  const nativeBtn = document.getElementById("share-btn-native");
  if (nativeBtn) {
    if (typeof navigator !== "undefined" && navigator.share) {
      nativeBtn.classList.remove("hidden");
      nativeBtn.onclick = () => {
        SHARE_ENGINE.shareNative(
          QUIZ_ENGINE.score,
          QUIZ_ENGINE.questions.length,
          QUIZ_ENGINE.totalPoints,
          QUIZ_ENGINE.category ? QUIZ_ENGINE.category.name : "Trivia",
          QUIZ_ENGINE.category ? QUIZ_ENGINE.category.id : "cricket"
        );
      };
    } else {
      nativeBtn.classList.add("hidden");
    }
  }

  const waBtn = document.getElementById("share-btn-whatsapp");
  if (waBtn) {
    waBtn.onclick = () => {
      SHARE_ENGINE.shareWhatsApp(
        QUIZ_ENGINE.score,
        QUIZ_ENGINE.questions.length,
        QUIZ_ENGINE.totalPoints,
        QUIZ_ENGINE.category ? QUIZ_ENGINE.category.name : "Trivia",
        QUIZ_ENGINE.category ? QUIZ_ENGINE.category.id : "cricket"
      );
    };
  }

  const xBtn = document.getElementById("share-btn-x");
  if (xBtn) {
    xBtn.onclick = () => {
      SHARE_ENGINE.shareX(
        QUIZ_ENGINE.score,
        QUIZ_ENGINE.questions.length,
        QUIZ_ENGINE.totalPoints,
        QUIZ_ENGINE.category ? QUIZ_ENGINE.category.name : "Trivia",
        QUIZ_ENGINE.category ? QUIZ_ENGINE.category.id : "cricket"
      );
    };
  }

  const tgBtn = document.getElementById("share-btn-telegram");
  if (tgBtn) {
    tgBtn.onclick = () => {
      SHARE_ENGINE.shareTelegram(
        QUIZ_ENGINE.score,
        QUIZ_ENGINE.questions.length,
        QUIZ_ENGINE.totalPoints,
        QUIZ_ENGINE.category ? QUIZ_ENGINE.category.name : "Trivia",
        QUIZ_ENGINE.category ? QUIZ_ENGINE.category.id : "cricket"
      );
    };
  }

  const copyBtn = document.getElementById("share-btn-copy");
  if (copyBtn) {
    copyBtn.onclick = () => {
      SHARE_ENGINE.copyChallengeLink(
        QUIZ_ENGINE.category ? QUIZ_ENGINE.category.id : "cricket",
        QUIZ_ENGINE.score,
        QUIZ_ENGINE.totalPoints
      );
    };
  }

  const downloadBtn = document.getElementById("share-btn-download");
  if (downloadBtn) {
    downloadBtn.onclick = () => {
      SHARE_ENGINE.downloadResultImage(QUIZ_ENGINE.category ? QUIZ_ENGINE.category.name : "Trivia");
    };
  }

  // Cookie Consent Buttons
  const acceptCookieBtn = document.getElementById("cookie-accept-btn");
  if (acceptCookieBtn) {
    acceptCookieBtn.onclick = () => ADS_ENGINE.acceptConsent();
  }

  const declineCookieBtn = document.getElementById("cookie-decline-btn");
  if (declineCookieBtn) {
    declineCookieBtn.onclick = () => ADS_ENGINE.declineConsent();
  }
}

/**
 * XSS-Safe HTML Escaping utility
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
