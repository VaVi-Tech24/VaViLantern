# Current version: 0.3.9

Read [VERSION-0.3.4.md](VERSION-0.3.4.md) for restored mountains, larger asteroids, slower airborne animation and grounded Jonah boots.

Read [VERSION-0.3.3.md](VERSION-0.3.3.md) for full-width obstacles, the gentle meteor opening, centered publisher name and four difficulty bands.

Read [VERSION-0.3.1.md](VERSION-0.3.1.md) for centered diagonal obstacles, the opening gateway and tremor, and matching brand lettering.

Read [VERSION-0.3.md](VERSION-0.3.md) for the restored full-body animation, longer routes, three refill posts, water-fall effects and finish gateway. Earlier notes below describe previous iterations.

Read [VERSION-0.2.6.md](VERSION-0.2.6.md) for complete visible arms, upper-only clouds and diagonal deck planks.

Read [VERSION-0.2.5.md](VERSION-0.2.5.md) for the latest arm proportions and crosswise deck boards.

Read [VERSION-0.2.4.md](VERSION-0.2.4.md) for smooth arm joints, face clearance and long horizontal deck boards.

Read [VERSION-0.2.3.md](VERSION-0.2.3.md) for the corrected torch hand, swinging free arm, horizontal boards and menu refinements.

Read [VERSION-0.2.2.md](VERSION-0.2.2.md) for the steady torch pose, shaded clouds, longer jumps, triple crossings and wider planks. The longer campaign, renamed companions and alternating day/night levels from 0.2.1 remain. Ghost mode and mid-level checkpoint resumes described in the original development notes below have been removed.

# VaVi Lantern: Eternal Flame

A small flame above an endless sky. Published under **VaVi Tech**.

This is a playable **0.1.0 alpha**, with an Android application project, original generated cosmic lantern artwork, an offline game, and an optional multiplayer service. It is not a finished, certified Play Store release. The art is AI-assisted and procedurally drawn, not claimed to be human-made.

## Play

Run `node server/server.cjs`, then open <http://localhost:8787>. No npm packages are needed. Node 18+ is recommended. The Android app bundles the same game locally and does not need a server for solo or same-phone play.

- Walk automatically to restore flame. Hold the screen or the Sprint button to run faster, spending flame.
- Tap the playfield or Jump to jump. Swipe down or use Slide for low beams.
- Keyboard: Space/Up jump, Shift/Right sprint, Down slide. Second player: W jump, D sprint, S slide.
- Planks peel, tilt and fall after passage; an advancing collapse front prevents walking forever. Checkpoints every 250 m restore flame, save solo progress and award points.
- Obstacles: missing planks, low beams, ropes, crows and short fog patches.
- Stickman is balanced. Ant unlocks at 250 m and uses less flame. Cheetah unlocks at 750 m and trades flame for speed.
- Solo, local two-player stacked bridges, and replay of your best uninterrupted solo run. Ghost recordings are capped at 30 minutes to bound storage.
- Dawn, dusk and night palettes; procedural mountains, mist, birds, flame glow and optional synthesized checkpoint bells.
- Best distance, local scores, character unlocks and solo checkpoints persist on this device. Uninstalling or clearing app storage removes them. Continued runs are marked.

Android uses a Java Activity and a bundled HTML Canvas game inside Android System WebView. It targets API 36, supports API 26+, prefers landscape, and remains responsive on tablets and portrait windows. There is no game-engine runtime, advertising SDK or native shared library. Use an up-to-date Android System WebView.

## Android build

Open this folder in Android Studio. Use Java 17, Gradle 8.13, Android SDK platform 36 and Build Tools 35.0.0. The Android Gradle plugin is pinned to 8.13.2.

After SDK setup, run `./gradlew assembleDebug` or `gradlew.bat assembleDebug`. Generate a release bundle with `gradlew.bat bundleRelease`. The release bundle needs your upload-key signature before Play submission; never publish a debug-key build or commit a private keystore.

If the wrapper is missing, run `gradle wrapper --gradle-version 8.13` using Gradle 8.13 first. The `tools` directory may contain the project-local toolchain prepared during development; it is intentionally excluded from source control. `build-local.ps1` uses that toolchain when available.

## Friends and world board

The included Node service is authoritative: clients send jump/slide/sprint inputs, while the server simulates distance, flame, collisions and score. It supplies invitation codes, a shared seed, a four-second start countdown, two-player rooms, disconnect expiry and a rolling seven-day leaderboard. All online players use the baseline stickman for fair comparison in this version.

1. Run the service on an HTTPS host you control. See [ONLINE.md](ONLINE.md).
2. Open **Friends & world board** in the game, enter the service URL and a display name.
3. Create a room and share its six-character code and service URL with your friend.
4. Your friend joins. Both bridges appear together. Only your own runner responds to your controls.

No public service has been deployed or configured automatically. Online play is a functional development implementation, not a proven low-latency competitive service. It uses HTTP polling without prediction, so responsiveness depends on network delay. There are no accounts, cross-device unlock sync, paid cosmetics, daily friend challenges, cash payouts or production anti-bot protection yet.

## Validate

`npm test` runs deterministic mechanics tests, a DOM/canvas smoke harness, and real HTTP multiplayer API tests. The smoke harness is not a browser screenshot test. Before release, test on physical low/mid/high-end Android phones, different WebView versions, small screens, multitouch, interruptions, offline relaunch, long sessions, network loss and real internet races.

## Design recommendation

Keep **VaVi Lantern** as the memorable store name and **Eternal Flame** as the subtitle. Flame versus speed is the distinctive mechanic; the two bridges make it social. Focus on satisfying, fair play and optional short sessions instead of promises about dopamine or serotonin. There is no scientific claim that this game changes either.

Read [PUBLISHING.md](../PUBLISHING.md) for Play Store steps, [PRIVACY.md](../PRIVACY.md) for a draft policy and [RELEASE-CHECKLIST.md](../RELEASE-CHECKLIST.md) for remaining work.
