# Verification results

Date: October 28, 2026 (Pacific). Frozen denominator: **5 focused checks; 5 passed.**
Browser: installed Microsoft Edge, automated locally with bundled Playwright.
Local HTTP served at a repository-style `/SPD%20Tutor/` subpath. No live GitHub
Pages deployment was performed.

| Check | Observed result |
|---|---|
| 1. Complete quiz journey | PASS — skip/jump; eight submissions; answers lock after submission; feedback receives focus; one wrong and seven right produces 7/8 (88%) and completion. |
| 2. Progress/privacy failure paths | PASS — answers survive reload; cancel retains answers; confirmed reset removes only the app key; unrelated storage retained; malformed JSON and out-of-range state recover; denied storage still permits session scoring with a visible notice. |
| 3. Keyboard/mobile | PASS — native radio arrow-key selection; larger text survives reload; no horizontal page overflow at 390px or 320px with larger text. Desktop and 390px screenshots visually inspected for wrapping, hierarchy and controls. |
| 4. Content/static contracts | PASS — eight distinct ids; valid choices/correct indices; explanations/simple explanations/source mapping; expected files; script syntax; local links return 200. |
| 5. Network/subpath | PASS — page and assets load under project subpath; zero page JavaScript errors; zero external application requests during the test; no fetch/XHR/beacon/WebSocket/API-key code in app scripts. |

Initial environment attempts: bundled browser executable absent; restricted Edge
launch exited; an elevated browser could not reach the separately restricted
preview server. Resolved by running the preview server and installed Edge check
in the same authorized local process. No browser or dependency installation.
No application defects were found by the journey. After screenshot review, a
single whitespace fix was made at the mobile intro line break; no behavior changed
and no repeat broad test was needed.

Evidence: tests/desktop.png, tests/mobile.png, tests/check.cjs, tests/run.cjs.
The script uses this machine's bundled Playwright path and installed Edge; these
are developer verification tools only, not student/site dependencies. For another
machine, adjust the Playwright require path. Run from the project root with
`node tests/run.cjs`; port 8766 must be free. No installation is needed to use the site.

Limits: automated Chromium-family browser coverage only. No physical iOS/Android,
Safari/Firefox, screen-reader user evaluation, complete WCAG audit, simultaneous-tab
reconciliation, hosted load test, or clinical expert review. No exam-content
validation, certification equivalence or actual GitHub hosting success is implied.
Independent educator review and actual deployed HTTPS checks remain launch gates.
