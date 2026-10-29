# SPD Tutor

Free static sterile-processing study MVP. Open index.html for a quick preview;
use an HTTP(S) site for supported browser persistence. No build step or student
installation. Eight original questions in one live chapter; other chapters
are explicitly planned. Source-checked editorial explanations; independent
SPD educator review pending. Not an exam bank or clinical procedure guide.

## Files
- index.html / styles.css: accessible, responsive learning interface.
- questions.js: original content, explanations, source mapping, content version.
- app.js: quiz, scoring, navigation, validated local progress and reset.
- PLAN.md: full research/product/content/architecture/UX/privacy/testing plan.
- TEST-RESULTS.md: actual verification evidence and remaining launch checks.
- LICENSE: MIT for original project material.

## Publish on GitHub Pages
1. Put the project root files in a public GitHub repository. No keys or .env needed.
2. Settings → Pages → Deploy from a branch → main → / (root) → Save.
3. Visit the HTTPS URL GitHub provides after deployment; confirm the quiz and
   reload progress on your device. Paths are relative for repository subpaths.

Not yet published by this build. No repository or live URL has been created.
GitHub Pages terms and limits apply; see PLAN.md. Never add client-side API keys.

## Privacy and content maintenance
Answers stay in localStorage under spd-tutor:v1. No analytics, cloud sync,
leaderboard or application network requests. GitHub receives ordinary hosting
requests. External links have their own policies. Private mode/site-data deletion
may erase progress. One browser profile/device; one tab recommended.

To add content, follow the review gate and provenance requirements in PLAN.md.
Bump content version whenever answer meaning/order changes. Current review status:
builder editorial source comparison complete, independent clinical review pending.
Public promotion as validated instruction requires qualified educator signoff.

Optional ChatGPT opens only official links; the learner copies a generic prompt
manually. There is no embedded AI and no API bill from this application.
