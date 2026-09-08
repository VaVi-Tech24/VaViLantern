# Development, skills and maintenance

## Prerequisites

- Node.js 22 LTS and npm for the shared JavaScript game, tests and website build.
- Git for source control; GitHub authentication with repository write access for publishing.
- Android Studio, JDK 17, Android SDK platform 36 and a working SDK path for Android builds.
- Gradle wrapper 8.13 and Android Gradle Plugin 8.13.2 are pinned in the repository. The app supports API 26+, targets API 36 and uses Java 17 compatibility.

```sh
git clone https://github.com/VaVi-Tech24/VaViLantern.git
cd VaviLantern
npm start
npm test
node tests/playability.cjs
npm run build
```

Open http://localhost:8787 while the server is running. No npm install is needed for game runtime dependencies. To use Android Studio, open the root folder, sync Gradle and set the SDK location. `local.properties` is machine-specific and must stay untracked. Use `gradlew.bat assembleDebug bundleRelease` on Windows or `./gradlew assembleDebug bundleRelease` elsewhere.

`build-local.ps1` is an optional Windows helper for the original local toolchain layout: `tools/jdk`, `tools/android-sdk`, `tools/gradle-8.13`. These downloads are deliberately excluded. Use Android Studio/the wrapper on other machines. Its Java socket temporary-directory option handles the original Windows environment and is not a required game setting.

## Engineering skills used

| Skill | Where applied | What a maintainer should understand |
|---|---|---|
| JavaScript simulation | engine.js | Fixed timesteps, velocity, collision windows, deterministic routes |
| Canvas graphics | game.js, characters.js | Coordinates, projection, clipping, layering, sprite atlases, DPR |
| Input and interaction | game.js | Pointer capture, hold/tap distinction, multitouch, keyboard release |
| Web Audio | sound.js | User gesture gating, envelopes, oscillator/noise nodes, lifecycle |
| Responsive HTML/CSS | index.html, styles | Portrait/landscape, safe areas, split-screen controls |
| Android Java | MainActivity.java | WebView settings, virtual asset requests, CSP, lifecycle |
| Node HTTP services | server/server.cjs | Request validation, room authorization, authoritative state |
| Persistence | localStorage and JSON | Origin scope, bounded records, atomic writes, single-writer limits |
| Verification | tests | Mechanics assertions, HTTP integration, DOM harness, simulated play |
| Release engineering | Gradle and GitHub | Version codes, upload signing, checksums, release attachments |

These are the project's technical skills and maintenance playbooks; no external agent plugin is required to run the game.

## Focused work recipes

### Tune a level

1. Edit only relevant level/rule values in `engine.js`.
2. Preserve room-server compatibility because both environments import the same engine.
3. Run `npm test`, then `node tests/playability.cjs` when physics, flame, spacing or route rules change.
4. Play representative Easy/Medium/Hard/Very hard levels manually. Simulated completion does not prove human-friendly difficulty.

### Adjust art or a character

1. Use the renderer or `characters.js`; do not change collision rules for a purely visual adjustment.
2. Keep Jonah's full eight-frame poses intact and align torch grips/boot rows with the selected frame.
3. Review ground contact, jump, slide and fall, in both orientations and both themes.
4. Add new public assets to the website build allowlist. Rebuild Android to ship asset changes to phones.

### Change online behavior

1. Update request/snapshot schema and both client/server together.
2. Preserve bearer authorization, sequence handling and bounded input actions.
3. Run HTTP tests and exercise disconnects, duplicate requests, expired rooms and two devices.
4. Restart the Node process after engine/server edits; its required modules are cached.

## Validation layers

| Command / activity | Coverage | Limit |
|---|---|---|
| `node tests/campaign.test.cjs` | Level boundaries, jumps, flame, collapse, refills, progression | Synthetic inputs |
| `node tests/ui-smoke.cjs` | Real scripts in fake DOM/Canvas, modes, resize, fall/splash lifecycle | Does not verify pixels or physical touch |
| `node tests/server.test.cjs` | Real local HTTP requests, rooms, auth, invalid origins/names, score forgery | Not an internet load test |
| `node tests/sound.test.cjs` | Audio resume, mute and stale playback | Fake AudioContext, not speaker quality |
| `node tests/playability.cjs` | All 25 levels × all 6 characters = 150 runs | Scripted player, not human balance |
| Browser/device review | Actual animation, visuals, sound, multitouch and lifecycle | Must be performed on target devices |

## Troubleshooting

- Silent audio: enable Sound, interact with the page, and check device/browser audio policy.
- Updated artwork missing: refresh the website; Android needs the newly built APK. Restart the server if shared engine rules changed.
- Progress differs on website and Android: storage is intentionally per origin/device.
- Room connection rejected: check HTTPS, exact `ALLOWED_ORIGINS`, endpoint URL and server availability.
- Gradle cannot find SDK/JDK: configure Android Studio/JDK 17 and the local SDK path; do not commit machine paths.
- APK will not install over an older build: compare package/signing certificate and versionCode. Do not uninstall without understanding that local progress will be removed.

## Contribution and release discipline

Keep mechanics in the shared engine, UI in the controller/renderer, and secrets outside source. Use focused commits. Do not publish personal test scores, temporary review pages, signing keys, tokens or downloaded SDKs. Keep versionName/package version aligned and increase Android versionCode. Attach builds and SHA-256 checksums to a versioned GitHub release; do not silently replace a previously published binary. See the code map and release guide.
