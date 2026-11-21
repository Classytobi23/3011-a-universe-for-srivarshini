# 3011 — A Universe for Srivarshini

A complete, premium, cinematic, private birthday website dedicated exclusively to Srivarshini.

Created as a standalone celestial sanctuary woven from starlight, cherished memories, and genuine friendship.

---

## 🌟 Features & Experiences

1. **Cinematic Cosmic Aesthetic**
   - Midnight black and deep navy backgrounds with purple, lavender, pink, and sky-blue ambient lighting.
   - High-performance HTML5 Canvas starfield with multi-depth stars, floating nebular dust, and glowing constellations.
   - Elegant typography combining **Cinzel**, **Cormorant Garamond** (serif), and **Plus Jakarta Sans**.
   - Refined glassmorphism styling with subtle glow borders and backdrop blur.

2. **Private Password Gate & Server-Side Security**
   - Protected by server-side verification against an environment secret (`BIRTHDAY_PASSWORD`).
   - Rate-limited to prevent brute-force attempts (5 tries per minute).
   - Session managed via an encrypted, signed HTTP-only cookie (`srivarshini_session`).
   - **Gated Media Delivery**: All 5 personal photographs and the background audio file are streamed via `/api/media/:filename`, which strictly verifies the session cookie before serving bytes. Unauthenticated requests are rejected with `401 Unauthorized`.
   - Strict `noindex, nofollow, noarchive` search-engine privacy directives.

3. **Asia/Kolkata (IST) Live Countdown & Automatic Birthday Mode**
   - Timezone locked to `Asia/Kolkata` (IST = UTC+5:30) regardless of the visitor's device clock.
   - Targets **November 30 at 00:00:00 IST**.
   - **Automatic Birthday Mode**:
     - Activates on **November 30 at 00:00:00 IST**.
     - Remains active for the entire 24 hours.
     - Automatically resets on **December 1 at 00:00:00 IST** to target next year's countdown.
     - Operates live without requiring a manual refresh.
   - Built-in **Time Warp Simulator** in development/preview to test transition moments (Nov 29 midnight transition, Nov 30 birthday, Dec 01 reset).

4. **Curated Memory Journey & Smart Aspect-Ratio Preservation**
   - All five supplied photographs are integrated in their exact order without distortion or face-cropping:
     - `image1.jpeg` (720x405, 16:9 Landscape) — *The Opening Spark*
     - `image2.jpeg` (720x1280, 9:16 Portrait) — *Memory Journey Photo 1*
     - `image3.jpeg` (540x960, 9:16 Portrait) — *Memory Journey Photo 2*
     - `image4.jpeg` (720x540, 4:3 Landscape) — *Memory Journey Photo 3*
     - `image5.jpeg` (720x1280, 9:16 Portrait) — *Final Emotional Reveal*
   - **Dual-Layer Framing**: If letterboxing occurs, the card displays a blurred, darkened ambient version of the exact same photograph in the background, with the sharp original image rendered in the foreground with full aspect-ratio fidelity.
   - **Fullscreen Lightbox**: Tap any photo to expand into a high-resolution lightbox with Prev/Next navigation and keyboard arrow/esc support.

5. **A Letter From Your Best Friend**
   - 3D interactive sealed envelope with an embossed wax seal monogram (**S**).
   - Clicking the seal smoothly opens the envelope and unfolds a parchment letter with progressive paragraph typing/reveal animation.
   - Includes a *Read Full Letter* skip button for immediate reading.

6. **Interactive Constellation of Wishes**
   - 8 interactive glowing stars connected by cosmic SVG constellation filaments.
   - Clicking any star illuminates a unique birthday wish and marks your progress.

7. **Final Photo Reveal (image5)**
   - Placed near the end in a dedicated celestial frame with a glowing halo, revealed only when the visitor reaches this quiet moment.

8. **Hidden Easter Egg**
   - A subtle pulsing cosmic heart hidden in the sky reveals a secret heartfelt message and stardust burst when found.

9. **Background Music Player**
   - Seamlessly streams `birthday/birthday.mpeg` with HTTP Range support for audio seeking.
   - Includes Play/Pause, Mute/Unmute, Volume slider, and an animated soundwave visualizer.
   - Respects browser autoplay policies and begins upon the visitor's first interaction.

---

## 🛠️ Central Configuration

All personal text, dates, greetings, letter content, photo titles, star wishes, and secret messages can be edited from one central file:

📂 [`src/config/birthday.config.js`](file:///d:/Tobi/Projects/3011-Srivarshini/src/config/birthday.config.js)

You do **not** need to touch React components or CSS to modify personal content.

---

## 🔐 Environment Variables & Security Configuration

Copy `.env.example` to `.env` (or configure in your deployment dashboard):

```bash
# Private password to enter the website (Change to any secret you like)
BIRTHDAY_PASSWORD=srivarshini3011

# Secret key used to sign session cookies
SESSION_SECRET=universe_srivarshini_3011_cosmic_jwt_secret_982347

# Server port
PORT=3000

# Environment mode
NODE_ENV=development
```

> [!IMPORTANT]
> Never commit `.env` or hardcode passwords in repository files. The `.gitignore` file is pre-configured to keep your secret safe.

---

## 🚀 Running the Project

### Development Mode (with Live Reload & HMR):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch:
```bash
npm run build
npm start
```

### Running Automated Test Suite:
```bash
node test-server.js
```

---

## 🌐 Hosting & Privacy Architecture Notes

- **Recommended Hosting**: Platforms supporting Node.js backends (e.g., Render, Railway, Fly.io, Heroku, or a VPS). This architecture ensures that:
  - Password authentication is verified strictly on the server.
  - Personal photos and audio are protected behind session checks (`/api/media/*`), preventing public direct-link access.
  - Rate limiting protects against password guessing.
- **Static Hosting (e.g. GitHub Pages)**: Pure static hosts do not support server-side execution; all uploaded files are world-readable if their URL is guessed. For complete privacy of personal photos, always host with the included Node.js server.
