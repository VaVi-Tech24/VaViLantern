# VaVi Lantern

A serene Android and web bridge runner by VaVi Tech: carry the last flame across 25 cinematic levels.<br>
Shared game source, optional multiplayer service, detailed architecture, and versioned Android downloads.

**Carry the last flame.** A calm bridge runner by **VaVi Tech**, for Android and the web. Current game: **1.0.0**; Android version code **23**.

Walk to restore your torch, sprint to escape the collapsing bridge, and time your jumps across 25 progressively longer levels. Choose Jonah, Junnu, Prem, Chinnu, Joel or Pranay. Play solo or share one device on two bridges.

## Run and build

Use Node.js 22 LTS for development. The game and optional Node service have no npm runtime dependencies.

```sh
npm start
# Open http://localhost:8787
npm test
node tests/playability.cjs
npm run build
# dist/ contains the deployable static website
```

Android: open this repository in Android Studio, use JDK 17 and install Android SDK 36. Build with:

```sh
./gradlew assembleDebug bundleRelease
# Windows: gradlew.bat assembleDebug bundleRelease
```

Download the latest app from [GitHub Releases](https://github.com/VaVi-Tech24/VaViLantern/releases). The APK is development-signed; the AAB is unsigned and needs your upload-key signature before Play submission. GitHub publication does not publish the game to Google Play.

## Repository layout

```text
web/public/       Shared browser game, renderer, sound and artwork
app/              Android Java wrapper and resources; consumes web/public
server/           Optional Node race API and Dockerfile
tests/            Mechanics, UI, sound, HTTP and playability checks
scripts/          Website build and release tooling
docs/             Architecture, code map, technologies and user guides
docs/diagrams/    Standalone Mermaid diagram sources
docs/history/     Archived development notes
gradle/           Reproducible Android build wrapper
assets/           Original/reference artwork
```

## Controls

| Action | Touch | Keyboard P1 | Keyboard P2 |
|---|---|---|---|
| Sprint | Hold playfield or Sprint | Shift / Right | D |
| Jump / air boost | Tap playfield or Jump | Space / Up | W |
| Slide | Swipe down or Slide | Down | S |
| Pause | Pause | Escape | Shared pause |

Jump limits are 3 at levels 1–5, 4 at 6–10, 5 at 11–19, and 6 at 20–25. Three lantern posts refill the flame per level. Death restarts the current level from its beginning; completing it unlocks the next. There is no ghost mode or mid-level resume.

## Documentation

| Guide | Contents |
|---|---|
| [How to play](docs/HOW-TO-PLAY.md) | Player guide, controls and tips |
| [Features](docs/FEATURES.md) | Implemented features and current scope |
| [Technologies](docs/TECHNOLOGIES.md) | Stack, versions and design choices |
| [Architecture](docs/ARCHITECTURE.md) | End-to-end component, game loop, multiplayer and delivery diagrams |
| [Code map](docs/CODE-MAP.md) | File responsibilities, entry points and change recipes |
| [Game design](docs/GAME-DESIGN.md) | Campaign, physics, scoring and characters |
| [Development and skills](docs/DEVELOPMENT.md) | Setup, engineering skills, workflows and validation |
| [API](docs/API.md) | Online routes, sessions, data and limits |
| [Deployment](docs/DEPLOYMENT.md) | Website, optional server and Android distribution |
| [Releases](docs/RELEASES.md) | Latest binaries, checksums and version policy |
| [Play Store preparation](docs/PUBLISHING.md) | Signing, listing and submission guide |
| [Privacy draft](docs/PRIVACY.md) | Actual data behavior and remaining policy placeholders |
| [Release checklist](docs/RELEASE-CHECKLIST.md) | Validation and work before production |

## Current delivery status

- Solo and same-device multiplayer work in the browser and bundled Android app.
- Static website output is ready, but the attempted Sites deployment failed. No public gameplay URL or registered custom domain is confirmed.
- Optional Node invitation races and a seven-day board are implemented but not publicly hosted. Static hosting alone does not enable them.
- No ads, purchases, cash rewards, player accounts or cross-device synchronization are implemented.
- Art combines supplied references, generated bitmaps and Canvas drawing. This is a 2D game with shaded effects, not a native 3D engine.

No open-source license has been selected. Public repository visibility alone does not grant reuse rights to code or artwork. Historical VERSION files describe their individual revisions; the documentation above describes the current implementation. [Early notes](docs/history/EARLY-DEVELOPMENT-NOTES.md) are retained only as development history and contain superseded features.
