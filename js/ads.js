/**
 * QuizVerse - Ad Monetization & Consent Management Engine
 * Fully Google AdSense Compliant:
 * - Fixed reserved spaces to prevent Cumulative Layout Shift (CLS)
 * - Clear "ADVERTISEMENT" labeling on every slot
 * - Zero accidental click placement (ample padding, no overlapping elements)
 * - Interstitial break card between question rounds (after Question 5)
 * - GDPR / CCPA cookie consent banner for ad personalization compliance
 */

const ADS_ENGINE = {
  // Global AdSense Configuration
  config: {
    enabled: true,
    publisherId: "ca-pub-XXXXXXXXXXXXXXXX", // REPLACE with your Google AdSense Publisher ID
    slots: {
      topBanner: "1000000001",
      sidebar: "1000000002",
      interstitial: "1000000003",
      resultCard: "1000000004",
      bottomBanner: "1000000005"
    },
    // Set testMode to false once your AdSense account is approved and live
    testMode: true
  },

  consentGiven: false,

  init() {
    this.checkCookieConsent();
    this.renderAllSlots();
    console.log("[AdEngine] Initialized with testMode:", this.config.testMode);
  },

  /**
   * Checks local storage for cookie / ad personalization consent
   */
  checkCookieConsent() {
    const consent = localStorage.getItem("quizverse_cookie_consent");
    const banner = document.getElementById("cookie-consent-banner");
    
    if (!consent) {
      if (banner) {
        banner.classList.remove("hidden");
      }
    } else {
      this.consentGiven = (consent === "accepted");
      this.applyAdPersonalizationConsent(this.consentGiven);
    }
  },

  /**
   * User accepts cookies & personalized advertising
   */
  acceptConsent() {
    localStorage.setItem("quizverse_cookie_consent", "accepted");
    this.consentGiven = true;
    this.applyAdPersonalizationConsent(true);
    const banner = document.getElementById("cookie-consent-banner");
    if (banner) banner.classList.add("hidden");
    if (typeof trackEvent === "function") {
      trackEvent("consent_accepted", { type: "all" });
    }
  },

  /**
   * User accepts essential cookies only (non-personalized ads)
   */
  declineConsent() {
    localStorage.setItem("quizverse_cookie_consent", "essential");
    this.consentGiven = false;
    this.applyAdPersonalizationConsent(false);
    const banner = document.getElementById("cookie-consent-banner");
    if (banner) banner.classList.add("hidden");
    if (typeof trackEvent === "function") {
      trackEvent("consent_declined", { type: "essential_only" });
    }
  },

  /**
   * Signals Google AdSense whether to serve personalized or non-personalized ads
   */
  applyAdPersonalizationConsent(isPersonalized) {
    if (!isPersonalized) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.requestNonPersonalizedAds = 1;
      console.log("[AdEngine] Google AdSense set to Non-Personalized Ads (NPA = 1)");
    } else {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.requestNonPersonalizedAds = 0;
      console.log("[AdEngine] Google AdSense set to Personalized Ads");
    }
  },

  /**
   * Populates all marked ad slots on the page with either live AdSense tags or test placeholders
   */
  renderAllSlots() {
    this.renderSlot("ad-slot-top", "topBanner", "728x90 (Desktop) / 320x50 (Mobile)");
    this.renderSlot("ad-slot-sidebar", "sidebar", "300x250 (Medium Rectangle)");
    this.renderSlot("ad-slot-result", "resultCard", "300x250 (Responsive Score Card Ad)");
    this.renderSlot("ad-slot-bottom", "bottomBanner", "728x90 (Desktop) / 320x50 (Mobile)");
  },

  /**
   * Renders a specific ad container
   */
  renderSlot(containerId, slotKey, dimensionLabel) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const slotId = this.config.slots[slotKey] || "0000000000";

    if (this.config.testMode) {
      // Clean, policy-safe test mode placeholder (fixed height prevents CLS)
      container.innerHTML = `
        <div class="ad-container-inner test-ad">
          <div class="ad-label" data-i18n="advertisement">ADVERTISEMENT</div>
          <div class="ad-placeholder-box">
            <div class="ad-test-badge">Google AdSense Test Placeholder</div>
            <div class="ad-spec">Slot: <strong>${slotKey}</strong> (${dimensionLabel})</div>
            <div class="ad-pub">Pub ID: <code>${this.config.publisherId}</code> &bull; Slot ID: <code>${slotId}</code></div>
          </div>
        </div>
      `;
    } else {
      // Live Google AdSense implementation
      container.innerHTML = `
        <div class="ad-container-inner live-ad">
          <div class="ad-label" data-i18n="advertisement">ADVERTISEMENT</div>
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="${this.config.publisherId}"
               data-ad-slot="${slotId}"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      `;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn("[AdEngine] AdSense push error:", e);
      }
    }
  },

  /**
   * Displays the mid-quiz interstitial card (triggered after Question 5)
   * Designed strictly per AdSense policies: never overlaps questions, clear continue button
   */
  showInterstitial(questionNum, onContinue) {
    const modal = document.getElementById("interstitial-modal");
    const modalContent = document.getElementById("interstitial-ad-box");
    const continueBtn = document.getElementById("interstitial-continue-btn");
    const subtitle = document.getElementById("interstitial-subtitle");

    if (!modal || !modalContent || !continueBtn) {
      if (typeof onContinue === "function") onContinue();
      return;
    }

    if (subtitle) {
      subtitle.textContent = `Great start! Halfway through (Question ${questionNum} of 10). Take a 5-second breath!`;
    }

    // Render ad inside modal
    if (this.config.testMode) {
      modalContent.innerHTML = `
        <div class="ad-label" data-i18n="advertisement">ADVERTISEMENT</div>
        <div class="ad-placeholder-box interstitial-test-box">
          <div class="ad-test-badge">Sponsored Interstitial Ad</div>
          <p class="ad-spec">Slot: <strong>interstitial</strong> (300x250 or 336x280)</p>
          <p class="ad-note">Supports video or high-engagement banner display between quiz halves.</p>
        </div>
      `;
    } else {
      modalContent.innerHTML = `
        <div class="ad-label" data-i18n="advertisement">ADVERTISEMENT</div>
        <ins class="adsbygoogle"
             style="display:inline-block;width:300px;height:250px"
             data-ad-client="${this.config.publisherId}"
             data-ad-slot="${this.config.slots.interstitial}"></ins>
      `;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn("[AdEngine] Interstitial AdSense push error:", e);
      }
    }

    modal.classList.remove("hidden");

    // Optional 3-second gentle countdown before unlocking the continue button
    let countdown = 3;
    continueBtn.disabled = true;
    continueBtn.innerHTML = `<span>Continue in ${countdown}s...</span>`;

    const timer = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        continueBtn.innerHTML = `<span>Continue in ${countdown}s...</span>`;
      } else {
        clearInterval(timer);
        continueBtn.disabled = false;
        continueBtn.innerHTML = `<span>Continue to Question ${questionNum + 1} &rarr;</span>`;
      }
    }, 1000);

    // Continue button click handler
    continueBtn.onclick = () => {
      clearInterval(timer);
      modal.classList.add("hidden");
      if (typeof onContinue === "function") {
        onContinue();
      }
    };
  }
};

// Export for Node testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ADS_ENGINE };
}
