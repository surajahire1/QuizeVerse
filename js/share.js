/**
 * QuizVerse - Social Sharing & Dynamic Canvas Result Card Generator
 * Powers viral social loops:
 * - Dynamic 1200x630 Canvas generator for custom viral scorecards
 * - WhatsApp (primary, high-converting India channel)
 * - X / Twitter, Telegram, Facebook, and Web Share API with clipboard fallback
 * - "Challenge a Friend" URL generator with challenger score preloaded
 */

const SHARE_ENGINE = {
  currentCardDataUrl: null,
  currentCardBlob: null,

  /**
   * Generates a viral score card on an HTML5 canvas and renders it into the DOM
   */
  async generateResultCard(score, total, points, categoryObj, userTitle, isDaily) {
    const canvas = document.getElementById("share-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    // Background gradient based on category or vibrant brand default
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    if (categoryObj && categoryObj.id === "cricket") {
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(0.5, "#1e3a8a");
      gradient.addColorStop(1, "#2563eb");
    } else if (categoryObj && categoryObj.id === "science") {
      gradient.addColorStop(0, "#022c22");
      gradient.addColorStop(0.5, "#065f46");
      gradient.addColorStop(1, "#059669");
    } else if (categoryObj && categoryObj.id === "india_gk") {
      gradient.addColorStop(0, "#431407");
      gradient.addColorStop(0.5, "#9a3412");
      gradient.addColorStop(1, "#ea580c");
    } else if (categoryObj && categoryObj.id === "bollywood") {
      gradient.addColorStop(0, "#500724");
      gradient.addColorStop(0.5, "#9d174d");
      gradient.addColorStop(1, "#db2777");
    } else {
      gradient.addColorStop(0, "#1e1b4b");
      gradient.addColorStop(0.5, "#4338ca");
      gradient.addColorStop(1, "#6366f1");
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative ambient circles
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.beginPath();
    ctx.arc(1100, 100, 260, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(100, 550, 200, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Card Glass Border
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 4;
    this.roundRect(ctx, 40, 40, width - 80, height - 80, 24);
    ctx.stroke();
    ctx.restore();

    // Header: Brand & Tagline
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 44px 'Poppins', sans-serif";
    ctx.fillText("⚡ QuizVerse", 80, 110);

    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.font = "500 22px 'Poppins', sans-serif";
    ctx.fillText("India's Favorite Trivia & Daily Brain Hub", 80, 145);
    ctx.restore();

    // Category Pill
    const categoryName = isDaily ? "🌟 Daily Challenge" : `${categoryObj ? categoryObj.icon : "🎯"} ${categoryObj ? categoryObj.name : "Trivia"}`;
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
    this.roundRect(ctx, 80, 185, 340, 52, 26);
    ctx.fill();
    ctx.fillStyle = "#fbbf24";
    ctx.font = "600 24px 'Poppins', sans-serif";
    ctx.fillText(categoryName, 105, 220);
    ctx.restore();

    // Big Score Display Box
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    this.roundRect(ctx, 80, 270, 480, 240, 20);
    ctx.fill();

    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 100px 'Poppins', sans-serif";
    ctx.fillText(`${score} / ${total}`, 120, 390);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "600 32px 'Poppins', sans-serif";
    ctx.fillText(`${points} Points Earned`, 120, 450);
    ctx.restore();

    // Right Column: Title, Challenge callout, and Badges
    ctx.save();
    ctx.fillStyle = "#fef08a";
    ctx.font = "600 24px 'Poppins', sans-serif";
    ctx.fillText("HONORARY TITLE", 620, 220);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 52px 'Poppins', sans-serif";
    ctx.fillText(userTitle || "Trivia Master", 620, 280);

    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "500 28px 'Poppins', sans-serif";
    ctx.fillText(`"I scored ${score}/${total} on QuizVerse!`, 620, 360);
    ctx.fillText("Think you can beat me? Take the quiz!\"", 620, 405);

    // Call To Action Ribbon
    ctx.fillStyle = "#f59e0b";
    this.roundRect(ctx, 620, 450, 490, 60, 30);
    ctx.fill();
    ctx.fillStyle = "#111827";
    ctx.font = "bold 24px 'Poppins', sans-serif";
    ctx.fillText("🔥 Play now at: quizverse.example.com", 650, 488);
    ctx.restore();

    // Footer Watermark
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "18px 'Poppins', sans-serif";
    const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    ctx.fillText(`Played on ${dateStr} • Free Trivia Daily`, 80, 560);
    ctx.restore();

    // Cache the image for Web Share and direct download
    this.currentCardDataUrl = canvas.toDataURL("image/png");
    canvas.toBlob((blob) => {
      this.currentCardBlob = blob;
    }, "image/png");

    // Also display the generated canvas image in the preview container
    const previewImg = document.getElementById("share-preview-img");
    if (previewImg) {
      previewImg.src = this.currentCardDataUrl;
      previewImg.classList.remove("hidden");
    }
  },

  /**
   * Helper to draw rounded rectangles on canvas
   */
  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  },

  /**
   * Retrieves the sender's personalized nickname from input or storage
   */
  getSenderName() {
    const input = document.getElementById("share-challenger-name");
    if (input && input.value.trim()) {
      const name = input.value.trim();
      localStorage.setItem("quizverse_nickname", name);
      return name;
    }
    return localStorage.getItem("quizverse_nickname") || "A Friend";
  },

  /**
   * Generates a custom challenge link with parameters (NO auto-start hash!)
   */
  getChallengeUrl(categoryId, score, points, questionIds) {
    const origin = window.location.origin + window.location.pathname;
    const catParam = categoryId || "cricket";
    const sender = this.getSenderName();
    
    // Pass question IDs so friend receives the EXACT SAME question pool
    let qParam = "";
    if (questionIds && questionIds.length) {
      qParam = `&q=${encodeURIComponent(questionIds.join(","))}`;
    }

    // Notice we use #challenge, NOT #quiz-catParam, preventing auto-timer start!
    return `${origin}?quiz=${encodeURIComponent(catParam)}&challenger=${encodeURIComponent(sender)}&score=${encodeURIComponent(points)}${qParam}#challenge`;
  },

  /**
   * Builds the prefilled message string
   */
  getShareMessage(score, total, points, categoryName, challengeUrl) {
    const sender = this.getSenderName();
    return `🔥 ${sender} just scored ${score}/${total} (${points} pts) on the ${categoryName} quiz on QuizVerse!\n\nThink you can beat me? Tap here to accept my challenge:\n👉 ${challengeUrl}`;
  },

  /**
   * Share via WhatsApp (largest converting channel in India)
   */
  shareWhatsApp(score, total, points, categoryName, categoryId, questionIds) {
    const url = this.getChallengeUrl(categoryId, score, points, questionIds);
    const text = this.getShareMessage(score, total, points, categoryName, url);
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    if (typeof trackEvent === "function") {
      trackEvent("share_clicked", { platform: "whatsapp", category: categoryId, score });
    }
  },

  /**
   * Share via X / Twitter
   */
  shareX(score, total, points, categoryName, categoryId, questionIds) {
    const url = this.getChallengeUrl(categoryId, score, points, questionIds);
    const text = `I just scored ${score}/${total} (${points} pts) in #${categoryName.replace(/\s+/g, '')} on @QuizVerse! Can you beat me? 🏆\n\nPlay here:`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=Trivia,QuizVerse,IndiaQuiz`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
    if (typeof trackEvent === "function") {
      trackEvent("share_clicked", { platform: "twitter", category: categoryId, score });
    }
  },

  /**
   * Share via Telegram
   */
  shareTelegram(score, total, points, categoryName, categoryId, questionIds) {
    const url = this.getChallengeUrl(categoryId, score, points, questionIds);
    const text = this.getShareMessage(score, total, points, categoryName, url);
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(tgUrl, "_blank", "noopener,noreferrer");
    if (typeof trackEvent === "function") {
      trackEvent("share_clicked", { platform: "telegram", category: categoryId, score });
    }
  },

  /**
   * Share via Facebook
   */
  shareFacebook(categoryId, score, questionIds) {
    const url = this.getChallengeUrl(categoryId, score, 0, questionIds);
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(fbUrl, "_blank", "noopener,noreferrer");
    if (typeof trackEvent === "function") {
      trackEvent("share_clicked", { platform: "facebook", category: categoryId, score });
    }
  },

  /**
   * Native Mobile Web Share API with image attachment fallback
   */
  async shareNative(score, total, points, categoryName, categoryId, questionIds) {
    const challengeUrl = this.getChallengeUrl(categoryId, score, points, questionIds);
    const sender = this.getSenderName();
    const shareText = `🔥 ${sender} scored ${score}/${total} (${points} pts) in ${categoryName} on QuizVerse! Can you beat me?`;

    if (navigator.share) {
      try {
        const shareData = {
          title: `QuizVerse Trivia: Can you beat ${sender}'s score?`,
          text: shareText,
          url: challengeUrl
        };

        // If Web Share API level 2 with file support is available
        if (this.currentCardBlob && navigator.canShare && navigator.canShare({ files: [new File([this.currentCardBlob], "quizverse-score.png", { type: "image/png" })] })) {
          shareData.files = [new File([this.currentCardBlob], "quizverse-score.png", { type: "image/png" })];
        }

        await navigator.share(shareData);
        if (typeof trackEvent === "function") {
          trackEvent("share_clicked", { platform: "native_share", category: categoryId, score });
        }
        return;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.warn("[ShareEngine] Native share failed, falling back to copy link:", err);
          this.copyChallengeLink(categoryId, score, points, questionIds);
        }
      }
    } else {
      this.copyChallengeLink(categoryId, score, points, questionIds);
    }
  },

  /**
   * Copies challenge link to clipboard and shows an animated toast
   */
  async copyChallengeLink(categoryId, score, points, questionIds) {
    const url = this.getChallengeUrl(categoryId, score, points, questionIds);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      this.showToast("Challenge link copied! Share it anywhere to challenge friends 🔥");
      if (typeof trackEvent === "function") {
        trackEvent("share_clicked", { platform: "copy_link", category: categoryId, score });
      }
    } catch (err) {
      console.error("[ShareEngine] Copy error:", err);
      this.showToast("Failed to copy link. Please copy directly from address bar.");
    }
  },

  /**
   * Directly downloads the generated scorecard PNG
   */
  downloadResultImage(categoryName) {
    if (!this.currentCardDataUrl) return;
    const a = document.createElement("a");
    a.href = this.currentCardDataUrl;
    a.download = `QuizVerse-${(categoryName || 'Trivia').replace(/\s+/g, '_')}-Score.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    this.showToast("Scorecard image downloaded!");
    if (typeof trackEvent === "function") {
      trackEvent("card_downloaded", { category: categoryName });
    }
  },

  /**
   * Helper to display temporary toast message
   */
  showToast(message) {
    let toast = document.getElementById("app-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "app-toast";
      toast.className = "app-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("visible");
    setTimeout(() => {
      toast.classList.remove("visible");
    }, 3200);
  }
};

// Export for Node testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SHARE_ENGINE };
}
