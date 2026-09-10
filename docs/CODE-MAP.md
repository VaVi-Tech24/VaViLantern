# Code map

Paths are relative to the repository root. Search the function names below; many source functions are dense and line numbers change frequently.

| File / directory | Responsibility | Main symbols |
|---|---|---|
| `web/public/index.html` | Shared markup and ordered script loading | `world`, `menu`, `hud`, `controls` |
| `web/public/engine.js` | Campaign, routes, physics, collisions, score | `travelers`, `levels`, `route`, `player`, `jump`, `slide`, `step` |
| `web/public/game.js` | UI states, input, storage and Canvas world | `start`, `input`, `update`, `draw`, `finish`, `results`, `background`, `bridge`, `horizonLight`, `asteroid`, `drawFall` |
| `web/public/characters.js` | Atlas frames and procedural travelers | `drawAvatar`, `paintPortraits`, `jonahSheet` |
| `web/public/sound.js` | Synthesized effects and audio lifecycle | `LanternSound`, `play`, `reset`, `suspend`, `resume` |
| `web/public/online.js` | Service dialog, input queue and polling | `onlineNet`, `lobby`, `api`, `poll`, `stop` |
| `web/public/style.css` | Base layout and responsive controls | `.panel`, `.stat`, `#hud`, `#controls` |
| `web/public/campaign.css` | Campaign, portrait cards, split layout, type | `.levelGrid`, `.characterGrid`, `.travelerName` |
| `web/public/jonah-run.png` | Eight complete poses in a 4 by 2 atlas | Per-frame hand and sole offsets in `characters.js` |
| `web/public/vavi-tech-logo.png` | Supplied VaViTech24 logo | Header |
| `web/public/cosmic-lantern.png` | Earlier brand asset | Preserved artwork |
| `assets/` | Original/reference images | Some references are not deployed |
| `app/src/main/java/com/vavitech/lantern/MainActivity.java` | Android asset interception and lifecycle | `onCreate`, `shouldInterceptRequest`, `onPause`, `onResume`, `onBackPressed` |
| `app/src/main/AndroidManifest.xml` | Package settings and permissions | `INTERNET`, `fullUser`, backup disabled |
| `app/src/main/res/` | Android icon and theme | `drawable`, `values` |
| `app/build.gradle` | SDKs, version and shared web asset sourceSet | `versionCode`, `versionName` |
| `build.gradle`, `settings.gradle`, `gradle/wrapper/` | Build plugin, repositories and wrapper | AGP 8.13.2 / Gradle 8.13 |
| `build-local.ps1` | Optional local Windows toolchain helper | Expects excluded `tools/` directory |
| `scripts/build-web.cjs` | Copy and validate public website assets | `npm run build` |
| `server/server.cjs` | Static server and online API | `server`, `snapshot`, `end`, `saveScores`, simulation timer |
| `server/Dockerfile` | Node 22 container | `/data`, `PORT`, `SCORE_FILE` |
| `.openai/hosting.json` | Existing Sites project and static directory | No credentials; do not recreate project |
| `tests/` | Game, UI, audio and network validation | See development guide |

## Where to make a change

- Physics, gaps and flame: change `engine.js` and run campaign plus playability checks. Both browser and server depend on it.
- Background: change `background`, `cloud`, `asteroid` or `horizonLight` in `game.js`. Keep fixed celestial coordinates independent of scrolling.
- Bridge: edit `bridge`; obstacle projection, plank direction and centered runner baseline must agree.
- Jonah animation: preserve complete atlas frames, matching hand anchors and boot-sole offsets. Splitting limbs previously caused clipping.
- Character names: update `travelers`; menu and HUD read those names.
- New public asset: add the app asset and include it in `scripts/build-web.cjs` so the website also receives it.
- Online protocol: edit server, client and HTTP tests together; preserve renderer-required snapshot fields.
- Version: update `app/build.gradle` and `package.json`, then generate and verify release metadata.

## Excluded files

Do not commit signing keys, tokens, local SDK/JDK downloads, generated builds, local score data or private configuration. APK/AAB files are release attachments, not source-tree files. GitHub credentials must never be embedded in remote URLs or documentation.
