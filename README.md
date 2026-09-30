# Mission Submission — Sem 5 Academic Mission Control 🚀

A futuristic, high-performance academic submission tracker built with an **Advanced Glassmorphism** design system, interactive checkmark animations, multi-user isolated progress tracking, and official semester submission schedules.

---

## ✨ Key Features

- **Advanced Glassmorphism UI**: Multi-layer frosted glass cards with `backdrop-filter`, subtle glow borders, and floating animated ambient orbs.
- **Solar Light / Cosmic Dark Mode**: Seamless theme toggle with CSS variable design tokens and persistent state memory (`T` hotkey).
- **Multi-User Private Progress Isolation**:
  - Each student logs in with their own **Student ID & Security Key**.
  - Checkmarks, progress percentage, and subject milestones are saved strictly per Student ID in `localStorage`.
  - Student A cannot see Student B's progress.
- **Dynamic Submission Schedule**:
  - **AAD** (`BE05016011`): Submission Due 05/10/26
  - **DS** (`BE05016021`): Submission Due 06/10/26
  - **WAD** (`BE05000281`): Submission Due 07/10/26
  - **PM** (`BE05000461`): Submission Due 08/10/26
  - **ADBMS** (`BE05016031`): Submission Due 09/10/26
  - **CS** (`BE05016041`): Submission Due 12/10/26
- **Live Motivational Dispatch Radar**:
  - Situational punchlines adapting dynamically to deadline urgency and remaining milestones.
  - Automatically rotates every 1 minute with a manual "Next Kick" shuffle button.
- **Dual Visual Progress Meters**:
  - Horizontal shimmer gradient progress bar.
  - SVG radial percentage dial with real-time statistics counter.
  - Confetti celebration burst upon 100% mission clearance.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic document hierarchy and accessible UI controls.
- **Vanilla CSS3**: Advanced Glassmorphism, CSS Custom Properties, and fluid responsive grid.
- **Vanilla JavaScript (ES6+)**: Zero external dependencies, modular state engine, and multi-user profile persistence.

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser, or launch a local server:

```bash
# Python 3
python3 -m http.server 3000

# Or via Node
npx serve .
```

Navigate to `http://localhost:3000`.