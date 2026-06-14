# Mind Real Estate — Submission Guide

Complete walkthrough from "GitHub repo" to "live on the App Store and Play Store."

---

## Part 0: GitHub setup

### Push this repo to GitHub

```bash
cd mind-real-estate
git init
git add .
git commit -m "Initial commit"

# Create a new repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/mind-real-estate.git
git branch -M main
git push -u origin main
```

### Enable GitHub Pages (for free PWA hosting + privacy policy URL)

1. Go to your repo → **Settings** → **Pages**
2. Source: **GitHub Actions**
3. The `.github/workflows/deploy-pages.yml` workflow will auto-publish on every push
4. Your app will be live at: `https://YOUR_USERNAME.github.io/mind-real-estate/`
5. Your privacy policy will be at: `https://YOUR_USERNAME.github.io/mind-real-estate/docs/privacy.html`

---

## Part 1: What's already configured

### Inside `www/index.html`
- ✅ Full mobile meta tags (viewport, theme color, status bar)
- ✅ Apple PWA meta tags
- ✅ Android PWA meta tags
- ✅ Open Graph tags for social previews
- ✅ Manifest + icon + splash links
- ✅ Service worker registration (offline support)
- ✅ Pinch-zoom and double-tap-zoom prevention
- ✅ Long-press context menu disabled
- ✅ Portrait orientation lock
- ✅ Screen wake-lock (screen stays on)

### Supporting files
- ✅ `www/manifest.json` — PWA manifest
- ✅ `www/sw.js` — Service worker
- ✅ All app icons (32, 180, 192, 512, 1024 + maskable variants)
- ✅ iOS + Android splash screens
- ✅ Play Store feature graphic
- ✅ `capacitor.config.json` — Native wrapper config with all plugins
- ✅ `package.json` — Capacitor + 10 native plugins
- ✅ `docs/privacy.html` — Privacy policy
- ✅ `TERMS.md` — Terms of use
- ✅ `.github/workflows/` — CI + auto-deploy to GitHub Pages

---

## Part 2: What YOU need to do

### A. Required steps

#### 1. Create developer accounts
- **Apple Developer Program** — $99/year — https://developer.apple.com/programs/
  - You need a Mac for the final submission (or use MacInCloud for ~$30/month)
  - Requires a D-U-N-S number if signing up as a company (free, takes a few days)
- **Google Play Console** — $25 one-time — https://play.google.com/console/signup
  - Can submit from any OS

#### 2. Update placeholders
Open these files and replace placeholders:
- `docs/privacy.html` — replace `[YOUR_EMAIL_HERE]`
- `TERMS.md` — replace contact email
- `README.md` — replace `YOUR_USERNAME` and `[your-email@domain.com]`
- `package.json` — replace `YOUR_USERNAME` in the repository URL

#### 3. Verify your bundle ID
Currently `com.mindrealestate.app` in `capacitor.config.json`. Once you ship, you can never change it. Make sure:
- The domain part exists or you own it
- Use reverse-domain notation (e.g. `com.yourdomain.appname`)
- Update it in `capacitor.config.json` AND in Xcode/Android Studio later

#### 4. Install dependencies and add platforms

```bash
npm install
npx cap add ios       # Mac + Xcode required
npx cap add android   # Android Studio
npx cap sync
```

#### 5. Take real screenshots
On a real iPhone and Android phone (browser dev tools miss touch issues):
- **App Store:** 6.7" iPhone (1290×2796) and 6.5" iPhone (1284×2778). 3-10 screenshots each.
- **Play Store:** Phone screenshots (any size ≥1080px on one side). 2-8 screenshots.
- Show: category picker, falling words, brain filling, flow state, multiple categories
- Add captions in Figma (free tier) for marketing impact

### B. Recommended steps

#### 6. Test on real devices
- iPhone for iOS testing
- Android phone for Android testing
- Check: touch responsiveness, performance, text legibility, brain rendering

#### 7. Open in native IDEs and polish

```bash
npm run ios       # opens Xcode
npm run android   # opens Android Studio
```

In Xcode:
- Set your Apple team
- Drag `www/icon-1024.png` into Images.xcassets → AppIcon
- Set display name: "Mind Real Estate"
- Set version: 1.0.0, build: 1
- Deployment target: iOS 14+

In Android Studio:
- Drag icons into `android/app/src/main/res/mipmap-*`
- Set `android:label="Mind Real Estate"` in `AndroidManifest.xml`
- Set version: 1.0.0 in `build.gradle`
- min SDK: 24, target SDK: 34

#### 8. Set up support contact
Even free apps need a way for users to reach you. Options:
- Dedicated email: `support@mindrealestate.app`
- Simple "Support" page on the same GitHub Pages site

#### 9. Plan monetization (free now → paid later)

Since you're starting free, your transition options:

**Option A: Paid features added via in-app purchase (most common)**
- Free version: all current features
- Future v1.2: Add IAP for new categories, themes, or guided sessions
- Use `@capacitor-community/in-app-purchases` plugin
- Apple requires you grandfather existing users — they keep what they had free

**Option B: Convert entire app to paid**
- More disruptive; not recommended
- Existing users still get free access (Apple/Google policy)

**Option C: Subscription**
- Highest revenue per user
- More user friction; needs strong content reason

Recommended starting prices for this niche:
- One-time unlock: $2.99–$4.99
- Monthly subscription: $0.99–$2.99
- Annual subscription: $9.99–$19.99

### C. Long-term improvements

#### 10. Set up privacy-respecting analytics (optional)
- **TelemetryDeck** — no personal data, no IPs
- **Plausible** or **Fathom** — for the web/PWA version
- If you add any analytics, update `docs/privacy.html`

#### 11. Crash reporting
- **Sentry** (free tier covers small apps)
- **Firebase Crashlytics** (review their data terms)

#### 12. Marketing copy templates

**App name** (30 char limit Apple, 50 char Android):
> Mind Real Estate

**Subtitle** (Apple, 30 chars):
> Train your mental habits

**Short description** (Google, 80 chars):
> A meditative habit visualizer — train your mind to choose better thoughts.

**Keywords** (Apple, 100 chars):
> mindfulness, habits, meditation, focus, flow, mental health, mindful, brain

**Category:**
- Apple: Primary "Health & Fitness", Secondary "Lifestyle"
- Google: "Health & Fitness"

---

## Part 3: Submission walkthrough

### iOS (Apple App Store)

1. In Xcode: Product → Archive
2. Click "Distribute App" → "App Store Connect" → "Upload"
3. Go to https://appstoreconnect.apple.com
4. Create new app entry
5. Fill in marketing copy, screenshots, pricing (Free)
6. Privacy: link to `https://YOUR_USERNAME.github.io/mind-real-estate/docs/privacy.html`
7. Select the build you uploaded
8. Submit for review
9. Wait 1–3 days

### Android (Google Play Store)

1. In Android Studio: Build → Generate Signed Bundle / APK → Android App Bundle
2. **Create a keystore — KEEP IT FOREVER. Losing it means you can never update the app.**
3. Save keystore password somewhere secure (NOT in the repo)
4. Go to https://play.google.com/console
5. Create new app
6. Upload the `.aab` file to Production track
7. Complete content rating, target audience, data safety forms
8. Submit for review
9. Wait hours to 2 days (first-time may take up to 7 days)

---

## Part 4: Common rejection reasons

### Apple
- ❌ "App is just a website" → Already handled: native features + offline support + wake-lock
- ❌ "Missing privacy policy URL" → Host `docs/privacy.html` publicly
- ❌ "Crashes on launch" → Test on real hardware
- ❌ "Not enough functionality" → 500 habits across 5 categories is plenty
- ❌ "Demo or placeholder content" → Make sure no `[YOUR_EMAIL_HERE]` left anywhere

### Google
- ❌ "Missing data safety form" → Fill it out (you collect nothing)
- ❌ "Target API too low" → Target SDK 34+
- ❌ "Misleading store listing" → Match screenshots to actual app

---

## Quick start summary

If you only do five things:

1. **Sign up** for Apple Developer ($99) and Google Play ($25)
2. **Push** this repo to GitHub and enable Pages
3. **Update** the `[YOUR_EMAIL_HERE]` and `YOUR_USERNAME` placeholders
4. **Run** `npm install && npx cap add ios && npx cap add android`
5. **Submit** through Xcode and Android Studio

Total cost: **$124** ($99 + $25)
Total time (first-time submitter): ~2 weekends.
