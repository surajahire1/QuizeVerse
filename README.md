# ⚡ QuizVerse - Production-Ready Trivia & Daily Brain Challenge Hub

**QuizVerse** is a high-performance, mobile-first trivia and quiz web platform engineered to earn revenue through Google AdSense display advertising and achieve organic growth through viral social sharing (specifically WhatsApp, X/Twitter, Telegram, and mobile Web Share).

---

## 📁 1. Project Directory Structure

```text
quizverse/
│
├── index.html              # Main Single-Page HTML5 application & layout
├── robots.txt              # Search engine crawler instructions
├── sitemap.xml             # Search engine XML sitemap
├── README.md               # Documentation & deployment guide
│
├── css/
│   └── style.css           # Mobile-first styles, themes, responsive ad slots
│
├── js/
│   ├── app.js              # Application router, state, theme, language & SEO
│   ├── quizEngine.js       # Core gameplay, 15s timer, procedural Web Audio, confetti
│   ├── ads.js              # Google AdSense engine, CLS prevention, consent manager
│   └── share.js            # Dynamic 1200x630 Canvas score card & social share hooks
│
└── data/
    └── questions.js        # Question banks, categories, translations & config
```

---

## 🚀 2. How to Run Locally

Because QuizVerse is built with zero dependencies and no build step, you can run it immediately using any of these methods:

### Method A: Direct File Open
Double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Safari, Firefox). All local storage, synthesized sound effects, and timers work out of the box.

### Method B: Lightweight Local Web Server (Recommended)
Running through an HTTP server ensures Canvas image exports and Web Share API perform identically to production.

Using **Node.js** (built-in `npx`):
```bash
npx serve .
# Or
npx http-server .
```

Using **Python 3**:
```bash
python -m http.server 8000
```

Using **VS Code Live Server**:
Right-click `index.html` and choose **"Open with Live Server"**.

Visit: `http://localhost:8000` (or `http://localhost:3000`).

---

## ✍️ 3. How to Add New Questions & Categories

All content lives in `data/questions.js`.

### Adding Questions to an Existing Category
Open `data/questions.js` and locate the `QUESTIONS_DATA` object. Add a question with this format:

```javascript
{
  id: "c31",
  question: "Which bowler has taken the most wickets in IPL history?",
  options: ["Dwayne Bravo", "Yuzvendra Chahal", "Piyush Chawla", "Bhuvneshwar Kumar"],
  answer: 1, // 0-based index: 0 = Option 1, 1 = Option 2, etc.
  fact: "Yuzvendra Chahal became the first bowler to breach the 200-wicket milestone in IPL cricket!"
}
```

### Adding a Brand New Category
1. Add an entry to the `CATEGORIES` array in `data/questions.js`:
```javascript
{
  id: "geography",
  name: "World Geography",
  nameHi: "विश्व भूगोल",
  nameGu: "વિશ્વ ભૂગોળ",
  icon: "🌍",
  color: "#0284c7",
  gradient: "linear-gradient(135deg, #0369a1 0%, #38bdf8 100%)",
  tagline: "Continents, oceans, capitals & wonders of the world",
  badgeName: "Globe Trotter",
  seoTitle: "World Geography Trivia Quiz - Countries, Capitals & Landscapes",
  seoDesc: "Test your global geography IQ with our world map quiz.",
  seoContent: "Explore the continents, highest peaks, deepest ocean trenches, and world capitals..."
}
```
2. Add the corresponding question array in `QUESTIONS_DATA`:
```javascript
QUESTIONS_DATA.geography = [
  // 10 to 30+ questions here...
];
```
The home view grid and router automatically detect and render the new category!

---

## 💰 4. How to Configure Google AdSense

QuizVerse is built to comply with Google AdSense Policies:
- Fixed CSS heights reserve space to prevent **Cumulative Layout Shift (CLS)**.
- Every ad has a distinct `ADVERTISEMENT` header badge.
- Zero accidental click placement: ads never overlap buttons or gameplay elements.
- An interstitial card pauses between questions 5 and 6 with a gentle countdown.
- An integrated GDPR/CCPA cookie consent banner handles ad personalization consent.

### Step 1: Insert Your AdSense Publisher ID
Open `data/questions.js` or `js/ads.js` and locate the `adSense` / `ADS_ENGINE.config` configuration:

```javascript
adSense: {
  publisherId: "ca-pub-1234567890123456", // Put your actual Publisher ID
  slots: {
    topBanner: "1000000001",
    sidebar: "1000000002",
    interstitial: "1000000003",
    resultCard: "1000000004",
    bottomBanner: "1000000005"
  },
  testMode: false // Switch to false to display live AdSense ads
}
```

### Step 2: Enable the AdSense Script Tag in `index.html`
In `index.html`, uncomment the script tag in the `<head>`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
     crossorigin="anonymous"></script>
```

---

## 🌐 5. Free Deployment Options

### Option 1: Vercel (Fastest & Zero Setup)
1. Install Vercel CLI: `npm i -g vercel` (or link your GitHub repository on [vercel.com](https://vercel.com)).
2. In the `quizverse` folder, run:
   ```bash
   vercel
   ```
3. Your site is instantly live with a free SSL certificate.

To support clean URLs like `/cricket-quiz`, create a `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/cricket-quiz", "destination": "/index.html" },
    { "source": "/india-gk-quiz", "destination": "/index.html" },
    { "source": "/science-quiz", "destination": "/index.html" }
  ]
}
```

### Option 2: Netlify
1. Go to [netlify.com](https://www.netlify.com).
2. Drag and drop the `quizverse` folder directly into the Netlify Drop dashboard.
3. For clean URL redirects, create a `_redirects` file in the root:
   ```text
   /cricket-quiz    /index.html   200
   /india-gk-quiz   /index.html   200
   /science-quiz    /index.html   200
   /*               /index.html   200
   ```

### Option 3: GitHub Pages
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial QuizVerse release"
   git branch -M main
   git remote add origin https://github.com/yourusername/quizverse.git
   git push -u origin main
   ```
2. In GitHub, go to **Settings > Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch** and choose `main` / `/ (root)`.
4. Click **Save**. Your site will be live at `https://yourusername.github.io/quizverse/`.

---

## 🔗 6. How to Connect a Custom Domain

1. Purchase a domain from Namecheap, Cloudflare, or GoDaddy (e.g. `quizverse.in` or `quizverse.com`).
2. Add your custom domain in your hosting platform dashboard (e.g. Vercel / Netlify / GitHub Pages).
3. In your Domain Registrar's DNS Management panel:
   - **For Apex Domain (`quizverse.com`):**
     - Type: `A` Record
     - Host: `@`
     - Value: `76.76.21.21` (if using Vercel) or `104.198.14.52` (if using Netlify)
   - **For Subdomain (`www.quizverse.com`):**
     - Type: `CNAME` Record
     - Host: `www`
     - Value: `cname.vercel-dns.com` (if using Vercel) or your Netlify site URL
4. SSL certificates auto-generate within 10 to 30 minutes.

---

## 🧪 7. Browser Compatibility & Accessibility
- **Browsers:** Chrome, Edge, Safari, Firefox, Opera, Samsung Internet.
- **Synthesized Audio:** Uses the native HTML5 Web Audio API to procedurally generate chimes, ticks, buzzers, and fanfares without requiring external `.mp3` or `.wav` network requests.
- **Zero Heavy Frameworks:** Pure semantic HTML5, modern CSS3 variables, and Vanilla JavaScript. Page weight is under 120KB uncompressed, ensuring sub-second load times on mobile 4G.
