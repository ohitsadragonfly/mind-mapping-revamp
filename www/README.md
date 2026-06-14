# Mind Real Estate

A meditative habit visualizer. Train your mental real estate by choosing positive thoughts to dissolve negative habits stacking inside your brain.

> The mind is finite real estate. What you let in takes up space.

---

## What it is

Mind Real Estate is a touch-first wellness game built as a single-page web app and packaged as native iOS and Android apps via Capacitor. Pick a life domain (Quantum Leap, Self-Employment, Parenting, Engineering, or Retirement), and watch habits drop into a physical brain. Choose positive thoughts as they fall to crack and dissolve the negatives — reach flow state before the brain overflows.

500 negative habits + 500 positive substitutes across 5 categories. Negatives outnumber positives 5:1 by design, mirroring how the mind actually works.

---

## Tech stack

- **Frontend:** Vanilla HTML + Canvas + JavaScript (single file: `www/index.html`)
- **Physics:** [Matter.js](https://brm.io/matter-js/) (loaded from CDN, cached offline by service worker)
- **Native wrapper:** [Capacitor 6](https://capacitorjs.com/) for iOS and Android
- **No build step.** The game works as a PWA out of the box.

---

## Quick start

### Run locally as a web app

```bash
git clone https://github.com/YOUR_USERNAME/mind-real-estate.git
cd mind-real-estate
npm install
npm run serve
# Open http://localhost:8000 on a phone (same wifi) or desktop
```

### Build the native iOS app

```bash
# Mac with Xcode required
npm install
npx cap add ios
npx cap sync ios
npm run ios   # opens Xcode
```

In Xcode: select your team, set bundle ID to your own, then Product → Archive → Distribute App.

### Build the native Android app

```bash
# Android Studio required
npm install
npx cap add android
npx cap sync android
npm run android   # opens Android Studio
```

In Android Studio: Build → Generate Signed Bundle / APK → Android App Bundle.

---

## Project structure

```
mind-real-estate/
├── www/                         # Web app (Capacitor's webDir)
│   ├── index.html               # The entire game
│   ├── manifest.json            # PWA manifest
│   ├── sw.js                    # Service worker (offline support)
│   ├── icon-*.png               # App icons (32, 180, 192, 512, 1024 + maskable)
│   ├── splash-*.png             # iOS + Android splash screens
│   └── feature-graphic-*.png    # Play Store feature graphic
├── docs/
│   └── privacy.html             # Privacy policy (host this publicly)
├── .github/
│   └── workflows/               # CI/CD pipelines
├── capacitor.config.json        # Native wrapper config
├── package.json                 # Dependencies + scripts
├── README.md                    # This file
├── SUBMISSION_GUIDE.md          # How to publish to App Store + Play Store
├── TERMS.md                     # Terms of use template
└── .gitignore
```

---

## Native plugins included

The app uses these Capacitor plugins for full native integration:

| Plugin | What it does |
|--------|--------------|
| `@capacitor/app` | App lifecycle events (background/foreground) |
| `@capacitor/device` | Device info (iOS/Android version, model) |
| `@capacitor/haptics` | Vibration feedback on important actions |
| `@capacitor/keyboard` | Manage on-screen keyboard (if added later) |
| `@capacitor/network` | Detect online/offline state |
| `@capacitor/preferences` | Persist user progress + settings |
| `@capacitor/screen-orientation` | Lock to portrait |
| `@capacitor/share` | Native share sheet (share progress, etc.) |
| `@capacitor/splash-screen` | Splash screen on launch |
| `@capacitor/status-bar` | Status bar theming |

---

## Publishing

See **[SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md)** for the full walkthrough.

Quick summary:
1. Apple Developer account ($99/year) + Google Play Console ($25 one-time)
2. Host `docs/privacy.html` at a public URL
3. Take real screenshots on real devices
4. Submit through Xcode (Apple) and Android Studio (Google)

---

## Roadmap

- [x] v1.0 — Free release, all 5 categories unlocked
- [ ] v1.1 — Daily streak tracking (local storage)
- [ ] v1.2 — In-app purchase for premium themes
- [ ] v1.3 — Subscription tier for guided sessions
- [ ] v2.0 — iCloud / Google Play sync of progress

---

## License

All rights reserved. This is proprietary software. The source is hosted here for portability across devices and collaborative development, not for redistribution.

---

## Contact

Privacy questions: see [docs/privacy.html](./docs/privacy.html)
Support: [your-email@domain.com]
