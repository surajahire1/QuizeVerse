/**
 * QuizVerse - Core Quiz Gameplay Engine
 * Implements:
 * - 10-Question Random Round Picker & Seeded Daily Challenge
 * - 30-Second Progress Timer with auto-advance
 * - Instant feedback & Fun Fact reveal
 * - Score + Speed bonus calculator
 * - 50/50 Lifeline (once per quiz)
 * - Synthesized Audio Effects (Web Audio API - zero audio asset dependencies!)
 * - Canvas Confetti Particle System for High Scores
 * - Keyboard navigation (Keys 1 - 4)
 * - Badges & Local Leaderboard synchronization
 */

const QUIZ_ENGINE = {
  // Current Round State
  category: null,
  isDaily: false,
  challengeMode: null, // { active: bool, challenger: string, targetScore: number }
  questions: [],
  currentIndex: 0,
  score: 0,
  speedBonusTotal: 0,
  totalPoints: 0,
  lifeline5050Used: false,
  timerInterval: null,
  timeLeft: 30,
  isAnswered: false,
  soundEnabled: true,
  answersRecord: [], // History for review/analytics

  // Audio Context (Synthesized Web Audio)
  audioCtx: null,

  init() {
    this.soundEnabled = localStorage.getItem("quizverse_sound") !== "muted";
    this.updateSoundToggleUI();
    this.setupKeyboardListeners();
  },

  /**
   * Initializes Web Audio Context safely on first user gesture
   */
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  },

  /**
   * Plays synthesized procedural sound effects
   */
  playSound(type) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "correct") {
        // High ascending double chime
        const playTone = (freq, start, duration) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.2, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + duration);
        };
        playTone(587.33, now, 0.15); // D5
        playTone(880.00, now + 0.12, 0.28); // A5
      } else if (type === "wrong") {
        // Low buzzing descending tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "lifeline") {
        // Magic triple arpeggio
        [440, 554.37, 659.25, 880].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(0.18, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.15);
        });
      } else if (type === "tick") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(900, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === "fanfare") {
        // Celebration victory arpeggio
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.25, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.35);
        });
      }
    } catch (e) {
      console.warn("[QuizEngine] Audio play error:", e);
    }
  },

  /**
   * Toggles sound on/off
   */
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem("quizverse_sound", this.soundEnabled ? "enabled" : "muted");
    this.updateSoundToggleUI();
    if (this.soundEnabled) this.playSound("click");
  },

  updateSoundToggleUI() {
    const btn = document.getElementById("sound-toggle-btn");
    if (!btn) return;
    if (this.soundEnabled) {
      btn.innerHTML = `<span class="icon">🔊</span><span class="label" data-i18n="soundOn">Sound</span>`;
      btn.setAttribute("aria-label", "Mute Sound");
      btn.classList.remove("muted");
    } else {
      btn.innerHTML = `<span class="icon">🔇</span><span class="label" data-i18n="soundOff">Muted</span>`;
      btn.setAttribute("aria-label", "Enable Sound");
      btn.classList.add("muted");
    }
  },

  /**
   * Start a standard 10-question category quiz (or identical challenge pool)
   */
  startQuiz(categoryId, specificQuestionIds = null) {
    const cat = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
    this.category = cat;
    this.isDaily = false;
    this.currentIndex = 0;
    this.score = 0;
    this.speedBonusTotal = 0;
    this.totalPoints = 0;
    this.lifeline5050Used = false;
    this.answersRecord = [];

    const pool = QUESTIONS_DATA[cat.id] || [];
    
    // If friend received a challenge with exact question IDs, serve the EXACT SAME questions!
    if (specificQuestionIds && specificQuestionIds.length > 0) {
      const matched = [];
      specificQuestionIds.forEach(id => {
        const found = pool.find(q => q.id === id);
        if (found) matched.push(found);
      });
      this.questions = matched.length > 0 ? matched : this.shuffleArray([...pool]).slice(0, QUIZ_CONFIG.questionsPerQuiz || 10);
    } else {
      // Shuffle pool and select 10 questions
      this.questions = this.shuffleArray([...pool]).slice(0, QUIZ_CONFIG.questionsPerQuiz || 10);
    }

    if (this.questions.length === 0) {
      alert("No questions found for this category yet!");
      return;
    }

    if (typeof trackEvent === "function") {
      trackEvent("quiz_started", { category: cat.id, isDaily: false, isChallenge: !!(this.challengeMode && this.challengeMode.active) });
    }

    this.renderQuestion();
  },

  /**
   * Start the Seeded Daily Challenge (5 deterministic questions based on date)
   */
  startDailyChallenge() {
    this.category = {
      id: "daily",
      name: "Daily Challenge",
      icon: "🌟",
      color: "#f59e0b",
      badgeName: "Daily Champion"
    };
    this.isDaily = true;
    this.currentIndex = 0;
    this.score = 0;
    this.speedBonusTotal = 0;
    this.totalPoints = 0;
    this.lifeline5050Used = false;
    this.answersRecord = [];

    // Deterministic selection based on YYYY-MM-DD
    this.questions = this.getSeededDailyQuestions();

    if (typeof trackEvent === "function") {
      trackEvent("daily_challenge_started", { date: new Date().toISOString().slice(0, 10) });
    }

    this.renderQuestion();
  },

  /**
   * Deterministic Linear Congruential Generator for Daily Questions
   */
  getSeededDailyQuestions() {
    const today = new Date();
    // Seed number: e.g. 20261023
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Aggregate questions from main categories
    const allPool = [
      ...QUESTIONS_DATA.cricket,
      ...QUESTIONS_DATA.india_gk,
      ...QUESTIONS_DATA.science,
      ...QUESTIONS_DATA.bollywood,
      ...QUESTIONS_DATA.history
    ];

    let currentSeed = seed;
    const pseudoRandom = () => {
      // Standard LCG parameters (Numerical Recipes)
      currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
      return currentSeed / 4294967296;
    };

    const selected = [];
    const poolCopy = [...allPool];

    const count = QUIZ_CONFIG.dailyQuestionsCount || 5;
    for (let i = 0; i < count; i++) {
      if (poolCopy.length === 0) break;
      const index = Math.floor(pseudoRandom() * poolCopy.length);
      selected.push(poolCopy.splice(index, 1)[0]);
    }

    return selected;
  },

  /**
   * Render the current question to the Quiz View
   */
  renderQuestion() {
    const question = this.questions[this.currentIndex];
    if (!question) {
      this.finishQuiz();
      return;
    }

    this.isAnswered = false;
    this.timeLeft = QUIZ_CONFIG.timePerQuestion || 30;

    // Reset UI containers
    const categoryBadge = document.getElementById("quiz-category-badge");
    const progressText = document.getElementById("quiz-progress-text");
    const scoreLiveText = document.getElementById("quiz-live-score");
    const questionText = document.getElementById("quiz-question-text");
    const optionsGrid = document.getElementById("quiz-options-grid");
    const factCard = document.getElementById("quiz-fact-card");
    const nextBtn = document.getElementById("quiz-next-btn");
    const timerText = document.getElementById("quiz-timer-text");
    const timerProgress = document.getElementById("quiz-timer-progress");
    const lifelineBtn = document.getElementById("quiz-lifeline-5050");

    if (categoryBadge) {
      categoryBadge.innerHTML = `<span class="icon">${this.category.icon}</span> <span>${this.category.name}</span>`;
      categoryBadge.style.borderColor = this.category.color;
    }

    // Display Challenge HUD target if in head-to-head mode
    const hudPill = document.getElementById("quiz-challenge-hud-pill");
    const targetScoreEl = document.getElementById("hud-target-score");
    if (hudPill && targetScoreEl) {
      if (this.challengeMode && this.challengeMode.active) {
        hudPill.classList.remove("hidden");
        targetScoreEl.textContent = `${this.challengeMode.targetScore} PTS (${this.challengeMode.challenger})`;
      } else {
        hudPill.classList.add("hidden");
      }
    }

    if (progressText) {
      progressText.textContent = `${this.currentIndex + 1} / ${this.questions.length}`;
    }

    if (scoreLiveText) {
      scoreLiveText.textContent = `${this.totalPoints} PTS`;
    }

    if (questionText) {
      questionText.textContent = question.question;
    }

    if (factCard) {
      factCard.classList.add("hidden");
      factCard.innerHTML = "";
    }

    if (nextBtn) {
      nextBtn.classList.add("hidden");
      const isLast = (this.currentIndex === this.questions.length - 1);
      nextBtn.innerHTML = `<span>${isLast ? "Finish & View Results" : "Next Question"} &rarr;</span>`;
    }

    if (lifelineBtn) {
      lifelineBtn.disabled = this.lifeline5050Used;
      if (this.lifeline5050Used) {
        lifelineBtn.classList.add("used");
        lifelineBtn.title = "50/50 lifeline already used in this round";
      } else {
        lifelineBtn.classList.remove("used");
        lifelineBtn.title = "50/50: Remove 2 wrong options";
      }
    }

    // Render Options
    if (optionsGrid) {
      optionsGrid.innerHTML = "";
      const letters = ["A", "B", "C", "D"];
      question.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option-card";
        btn.dataset.index = idx;
        btn.setAttribute("aria-label", `Option ${letters[idx]}: ${opt}`);
        btn.innerHTML = `
          <div class="option-key-badge">${idx + 1}</div>
          <div class="option-letter">${letters[idx]}</div>
          <div class="option-text">${opt}</div>
        `;
        btn.onclick = () => this.handleAnswer(idx);
        optionsGrid.appendChild(btn);
      });
    }

    // Start Timer
    this.startTimer(timerText, timerProgress);
  },

  /**
   * Countdown Timer with smooth SVG / CSS circle progress bar
   */
  startTimer(timerText, timerProgress) {
    clearInterval(this.timerInterval);

    const totalTime = QUIZ_CONFIG.timePerQuestion || 30;
    const updateDisplay = () => {
      if (timerText) timerText.textContent = `${this.timeLeft}s`;
      if (timerProgress) {
        const percentage = (this.timeLeft / totalTime) * 100;
        timerProgress.style.width = `${percentage}%`;
        if (this.timeLeft <= 6) {
          timerProgress.classList.add("warning");
          this.playSound("tick");
        } else {
          timerProgress.classList.remove("warning");
        }
      }
    };

    updateDisplay();

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      updateDisplay();

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeout();
      }
    }, 1000);
  },

  /**
   * Called when timer runs down to 0 without user selection
   */
  handleTimeout() {
    if (this.isAnswered) return;
    this.isAnswered = true;
    this.playSound("wrong");

    const question = this.questions[this.currentIndex];
    this.answersRecord.push({
      question: question.question,
      selected: null,
      correct: question.answer,
      isCorrect: false,
      timeTaken: QUIZ_CONFIG.timePerQuestion
    });

    this.revealAnswers(-1, question.answer, question.fact, true);
  },

  /**
   * Handles user option selection
   */
  handleAnswer(selectedIndex) {
    if (this.isAnswered) return;
    this.isAnswered = true;
    clearInterval(this.timerInterval);

    const question = this.questions[this.currentIndex];
    const isCorrect = (selectedIndex === question.answer);
    const timeTaken = (QUIZ_CONFIG.timePerQuestion - this.timeLeft);

    let roundPoints = 0;
    if (isCorrect) {
      this.score++;
      const basePoints = QUIZ_CONFIG.basePointsPerCorrect || 100;
      const speedBonus = this.timeLeft * (QUIZ_CONFIG.speedBonusMultiplier || 10);
      roundPoints = basePoints + speedBonus;
      this.speedBonusTotal += speedBonus;
      this.totalPoints += roundPoints;
      this.playSound("correct");
    } else {
      this.playSound("wrong");
    }

    this.answersRecord.push({
      question: question.question,
      selected: selectedIndex,
      correct: question.answer,
      isCorrect,
      timeTaken
    });

    this.revealAnswers(selectedIndex, question.answer, question.fact, false, roundPoints);
  },

  /**
   * Visual feedback: highlights correct in green, wrong in red, shows fun fact
   */
  revealAnswers(selectedIndex, correctIndex, factText, isTimeout, roundPoints = 0) {
    const options = document.querySelectorAll(".quiz-option-card");
    options.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIndex) {
        btn.classList.add("correct");
      } else if (idx === selectedIndex && !btn.classList.contains("correct")) {
        btn.classList.add("wrong");
      } else {
        btn.classList.add("dimmed");
      }
    });

    // Reveal Fun Fact Card
    const factCard = document.getElementById("quiz-fact-card");
    if (factCard) {
      factCard.classList.remove("hidden");
      const icon = selectedIndex === correctIndex ? "✨" : isTimeout ? "⏰" : "💡";
      const statusTitle = selectedIndex === correctIndex 
        ? `Correct! (+${roundPoints} PTS)` 
        : isTimeout ? "Time's Up!" : "Not Quite!";
      
      factCard.innerHTML = `
        <div class="fact-header">
          <span class="fact-icon">${icon}</span>
          <span class="fact-title ${selectedIndex === correctIndex ? 'win' : 'lose'}">${statusTitle}</span>
        </div>
        <p class="fact-body"><strong>Did you know?</strong> ${factText}</p>
      `;
    }

    // Show Next Button
    const nextBtn = document.getElementById("quiz-next-btn");
    if (nextBtn) {
      nextBtn.classList.remove("hidden");
      nextBtn.focus();
    }
  },

  /**
   * 50/50 Lifeline Implementation (removes 2 incorrect answers)
   */
  use5050Lifeline() {
    if (this.lifeline5050Used || this.isAnswered) return;
    this.lifeline5050Used = true;
    this.playSound("lifeline");

    const question = this.questions[this.currentIndex];
    const correctIndex = question.answer;

    // Gather incorrect indices
    const incorrectIndices = [0, 1, 2, 3].filter(idx => idx !== correctIndex);
    // Shuffle and pick 2 to eliminate
    const toEliminate = this.shuffleArray(incorrectIndices).slice(0, 2);

    const options = document.querySelectorAll(".quiz-option-card");
    options.forEach((btn, idx) => {
      if (toEliminate.includes(idx)) {
        btn.classList.add("eliminated-5050");
        btn.disabled = true;
      }
    });

    const lifelineBtn = document.getElementById("quiz-lifeline-5050");
    if (lifelineBtn) {
      lifelineBtn.disabled = true;
      lifelineBtn.classList.add("used");
    }
  },

  /**
   * Advance to the next question or trigger mid-quiz interstitial ad
   */
  nextQuestion() {
    this.currentIndex++;

    // Check if we hit the mid-quiz ad checkpoint (after question 5 in a 10-question round)
    const midPoint = Math.floor(this.questions.length / 2);
    if (!this.isDaily && this.currentIndex === midPoint && typeof ADS_ENGINE !== "undefined") {
      ADS_ENGINE.showInterstitial(this.currentIndex, () => {
        this.renderQuestion();
      });
      return;
    }

    if (this.currentIndex < this.questions.length) {
      this.renderQuestion();
    } else {
      this.finishQuiz();
    }
  },

  /**
   * Concludes round, calculates rank, unlocks badges, saves local stats & streaks
   */
  finishQuiz() {
    clearInterval(this.timerInterval);

    const total = this.questions.length;
    const score = this.score;
    const points = this.totalPoints;
    const percentage = Math.round((score / total) * 100);

    // Compute Title & Rank
    const rankTitle = this.computeRankTitle(percentage, this.category ? this.category.id : "trivia");

    // Check High Score & trigger confetti
    if (percentage >= 70) {
      this.playSound("fanfare");
      this.triggerConfetti();
    }

    // Save Daily Challenge completion & Streak
    if (this.isDaily) {
      this.recordDailyCompletion();
    }

    // Record challenge completion signature to prevent cheating/replaying identical questions
    if (this.challengeMode && this.challengeMode.active && this.challengeMode.signature) {
      try {
        localStorage.setItem("quizverse_done_" + this.challengeMode.signature, JSON.stringify({
          attemptedAt: new Date().toISOString(),
          userScore: points,
          challenger: this.challengeMode.challenger,
          challengerScore: this.challengeMode.targetScore
        }));
      } catch (e) {
        console.warn("[QuizEngine] Could not save challenge completion:", e);
      }
    }

    // Save Local High Score
    this.saveCategoryHighScore(this.category.id, points, score, total);

    // Add entry to Local Leaderboard
    this.saveLeaderboardEntry(this.category.name, points, score, total);

    // Evaluate & Award Badges
    const newBadges = this.evaluateBadges(percentage, points);

    // Update Results View UI
    this.renderResultsView(score, total, points, percentage, rankTitle, newBadges);

    // Track Analytics
    if (typeof trackEvent === "function") {
      trackEvent("quiz_completed", {
        category: this.category.id,
        score,
        total,
        points,
        percentage,
        isDaily: this.isDaily
      });
    }

    // Switch view to results
    if (typeof navigateTo === "function") {
      navigateTo("results");
    }
  },

  /**
   * Generates honorary title based on score & category
   */
  computeRankTitle(percentage, catId) {
    if (percentage === 100) {
      if (catId === "cricket") return "Cricket Legend";
      if (catId === "science") return "Einstein Prodigy";
      if (catId === "india_gk") return "Rashtriya Scholar";
      return "Grandmaster Genius";
    } else if (percentage >= 80) {
      if (catId === "cricket") return "Master Blaster";
      if (catId === "science") return "Quantum Wizard";
      if (catId === "india_gk") return "Heritage Connoisseur";
      return "Trivia Maestro";
    } else if (percentage >= 60) {
      return "Sharp Thinker";
    } else if (percentage >= 40) {
      return "Trivia Explorer";
    } else {
      return "Aspiring Rookie";
    }
  },

  /**
   * Renders Result Page details and mounts canvas sharecard
   */
  renderResultsView(score, total, points, percentage, rankTitle, newBadges) {
    const scoreVal = document.getElementById("result-score-val");
    const pointsVal = document.getElementById("result-points-val");
    const accuracyVal = document.getElementById("result-accuracy-val");
    const speedBonusVal = document.getElementById("result-speedbonus-val");
    const titleVal = document.getElementById("result-rank-title");
    const feedbackMsg = document.getElementById("result-feedback-msg");
    const badgesContainer = document.getElementById("result-badges-list");

    if (scoreVal) scoreVal.textContent = `${score} / ${total}`;
    if (pointsVal) pointsVal.textContent = points.toLocaleString();
    if (accuracyVal) accuracyVal.textContent = `${percentage}%`;
    if (speedBonusVal) speedBonusVal.textContent = `+${this.speedBonusTotal}`;
    if (titleVal) titleVal.textContent = rankTitle;

    if (feedbackMsg) {
      if (percentage === 100) {
        feedbackMsg.textContent = "Flawless Victory! You achieved absolute perfection!";
      } else if (percentage >= 80) {
        feedbackMsg.textContent = "Sensational score! You're in the top tier of trivia minds!";
      } else if (percentage >= 60) {
        feedbackMsg.textContent = "Solid round! A few more practice sessions will make you unbeatable.";
      } else {
        feedbackMsg.textContent = "Good effort! Review the fun facts and try another round to boost your score.";
      }
    }

    // Render Head-to-Head Challenge Verdict
    const verdictBox = document.getElementById("result-challenge-verdict");
    if (verdictBox) {
      if (this.challengeMode && this.challengeMode.active) {
        const target = parseInt(this.challengeMode.targetScore, 10) || 0;
        const challenger = this.challengeMode.challenger || "Challenger";
        verdictBox.classList.remove("hidden");

        if (points > target) {
          const diff = points - target;
          verdictBox.className = "challenge-verdict-box verdict-win";
          verdictBox.innerHTML = `
            <div class="verdict-icon">🏆</div>
            <div class="verdict-content">
              <h3>VICTORY! You Beat ${escapeHtml(challenger)}!</h3>
              <p>You scored <strong>${points} PTS</strong> vs their <strong>${target} PTS</strong> (<strong>+${diff} PTS</strong> lead)! You rule the pitch!</p>
            </div>
          `;
          this.playSound("fanfare");
          this.triggerConfetti();
        } else if (points < target) {
          const diff = target - points;
          verdictBox.className = "challenge-verdict-box verdict-lose";
          verdictBox.innerHTML = `
            <div class="verdict-icon">💔</div>
            <div class="verdict-content">
              <h3>${escapeHtml(challenger)} Won This Round!</h3>
              <p>They scored <strong>${target} PTS</strong> vs your <strong>${points} PTS</strong>. Play again to claim your victory!</p>
            </div>
          `;
        } else {
          verdictBox.className = "challenge-verdict-box verdict-tie";
          verdictBox.innerHTML = `
            <div class="verdict-icon">🤝</div>
            <div class="verdict-content">
              <h3>It's an Exact Tie!</h3>
              <p>Both of you achieved identical brilliance at <strong>${points} PTS</strong>!</p>
            </div>
          `;
        }

        // Customize WhatsApp button text for direct response
        const waBtn = document.getElementById("share-btn-whatsapp");
        if (waBtn) {
          waBtn.innerHTML = `<span>💬</span> <span>Reply to ${escapeHtml(challenger)} on WhatsApp</span>`;
        }
      } else {
        verdictBox.classList.add("hidden");
      }
    }

    // Pre-populate nickname input
    const nameInput = document.getElementById("share-challenger-name");
    if (nameInput) {
      nameInput.value = localStorage.getItem("quizverse_nickname") || "";
      nameInput.oninput = (e) => {
        localStorage.setItem("quizverse_nickname", e.target.value.trim());
      };
    }

    if (badgesContainer) {
      if (newBadges && newBadges.length > 0) {
        badgesContainer.innerHTML = newBadges.map(b => `
          <div class="badge-item unlocked">
            <span class="badge-icon">${b.icon}</span>
            <span class="badge-name">${b.name}</span>
          </div>
        `).join("");
      } else {
        badgesContainer.innerHTML = `<p class="text-muted">Keep playing daily to unlock legendary badges!</p>`;
      }
    }

    // Refresh Result Ad Slot
    if (typeof ADS_ENGINE !== "undefined") {
      ADS_ENGINE.renderSlot("ad-slot-result", "resultCard", "300x250");
    }

    // Generate Canvas Result Card for Sharing
    if (typeof SHARE_ENGINE !== "undefined") {
      SHARE_ENGINE.generateResultCard(score, total, points, this.category, rankTitle, this.isDaily);
    }
  },

  /**
   * Saves high score per category in localStorage
   */
  saveCategoryHighScore(catId, points, score, total) {
    if (!catId) return;
    const key = `quizverse_best_${catId}`;
    const prev = parseInt(localStorage.getItem(key) || "0", 10);
    if (points > prev) {
      localStorage.setItem(key, points);
      localStorage.setItem(`${key}_score`, `${score}/${total}`);
    }
  },

  /**
   * Adds entry to Top 10 local leaderboard
   */
  saveLeaderboardEntry(categoryName, points, score, total) {
    const raw = localStorage.getItem("quizverse_leaderboard");
    let board = raw ? JSON.parse(raw) : [];

    const now = new Date();
    const dateStr = now.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    const nickname = localStorage.getItem("quizverse_nickname") || "Quiz Champ";

    board.push({
      player: nickname,
      category: categoryName,
      points,
      score: `${score}/${total}`,
      date: dateStr,
      timestamp: Date.now()
    });

    // Sort by points descending and keep top 10
    board.sort((a, b) => b.points - a.points);
    board = board.slice(0, 10);

    localStorage.setItem("quizverse_leaderboard", JSON.stringify(board));
  },

  /**
   * Records Daily Challenge completion & advances streak counter
   */
  recordDailyCompletion() {
    const todayStr = new Date().toISOString().slice(0, 10);
    localStorage.setItem("quizverse_daily_completed_date", todayStr);

    // Streak logic
    const lastPlayed = localStorage.getItem("quizverse_last_streak_date");
    let streak = parseInt(localStorage.getItem("quizverse_streak_count") || "0", 10);

    if (!lastPlayed) {
      streak = 1;
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      if (lastPlayed === yesterdayStr) {
        streak++;
      } else if (lastPlayed === todayStr) {
        // Already played today, maintain streak
      } else {
        // Missed a day
        streak = 1;
      }
    }

    localStorage.setItem("quizverse_last_streak_date", todayStr);
    localStorage.setItem("quizverse_streak_count", streak.toString());

    // Update global streak display UI
    if (typeof updateStreakDisplay === "function") {
      updateStreakDisplay();
    }
  },

  /**
   * Evaluates unlocked badges
   */
  evaluateBadges(percentage, points) {
    const unlocked = [];
    const savedBadges = JSON.parse(localStorage.getItem("quizverse_badges") || "[]");

    const grant = (id, name, icon) => {
      if (!savedBadges.includes(id)) {
        savedBadges.push(id);
        unlocked.push({ id, name, icon });
      }
    };

    if (percentage === 100) grant("quiz_master", "Quiz Master", "👑");
    if (this.speedBonusTotal >= 400) grant("speedster", "Speedster", "⚡");
    if (this.category && this.category.id === "cricket") grant("cricket_fan", "Cricket Fanatic", "🏏");
    if (this.category && this.category.id === "india_gk") grant("bharat_scholar", "Bharat Scholar", "🇮🇳");
    if (this.category && this.category.id === "science") grant("curious_scientist", "Curious Scientist", "🔬");
    if (this.isDaily) grant("daily_pioneer", "Daily Challenger", "🌟");

    const streak = parseInt(localStorage.getItem("quizverse_streak_count") || "0", 10);
    if (streak >= 3) grant("streak_3", "3-Day Flame", "🔥");
    if (streak >= 7) grant("streak_7", "Weekly Warrior", "🛡️");
    if (streak >= 30) grant("streak_30", "Monthly Legend", "🏆");

    localStorage.setItem("quizverse_badges", JSON.stringify(savedBadges));
    return unlocked;
  },

  /**
   * Confetti celebration particle generator using HTML5 Canvas
   */
  triggerConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.classList.remove("hidden");

    const colors = ["#2563eb", "#ea580c", "#10b981", "#db2777", "#fbbf24", "#8b5cf6", "#f43f5e"];
    const particles = [];
    const count = 120;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.4,
        w: Math.random() * 10 + 6,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18,
        gravity: 0.35,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1
      });
    }

    let animationId;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        if (elapsed > 2000) {
          p.opacity -= 0.02;
        }

        if (p.opacity > 0 && p.y < canvas.height + 50) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (alive && elapsed < 4000) {
        animationId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.classList.add("hidden");
      }
    };

    animate();
  },

  /**
   * Desktop Keyboard accessibility (Keys 1-4 for options, Space/Enter for Next)
   */
  setupKeyboardListeners() {
    window.addEventListener("keydown", (e) => {
      // Only listen on active quiz view
      const quizView = document.getElementById("view-quiz");
      if (!quizView || quizView.classList.contains("hidden")) return;

      if (!this.isAnswered) {
        if (e.key === "1") this.handleAnswer(0);
        else if (e.key === "2") this.handleAnswer(1);
        else if (e.key === "3") this.handleAnswer(2);
        else if (e.key === "4") this.handleAnswer(3);
      } else {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.nextQuestion();
        }
      }
    });
  },

  /**
   * Fisher-Yates array shuffle helper
   */
  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
};

// Export for Node testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUIZ_ENGINE };
}
