# VaVi Lantern 0.2 — Carry the last flame

## New campaign

There are 25 named levels, from The Quiet Heights to The Last Flame. Finish a level to unlock the next. The selected level and unlocked levels are saved locally. Every death retries from that level's start with a full flame; there are no intermediate checkpoint resumes. Previously unlocked levels can be replayed. A local two-player finish unlocks the next level on that device. Online races do not grant local campaign unlocks.

The only lantern checkpoint is at the level finish, now 600–1200 m away. Speed, collapse pressure and obstacle frequency increase gradually through the campaign. A deterministic controller completed all 25 levels with all nine character profiles during testing; this establishes solvability, not a substitute for human balance testing.

## Sprint, recover, jump

The visible bridge collapse is the real pursuing edge. It moves faster than walking and slower than sprinting. Standing on the falling edge ends the run even during a jump. Sprinting spends flame and builds a lead; walking restores flame but lets the edge close. The HUD shows the bridge distance and warns when it is near. Stored lead is capped to keep the balance relevant.

Gaps are 26 m wide, twice their original width. Airborne movement is deliberately slower than running. Tap Jump again in the air to cross; a third air jump is not allowed. Slide under beams and jump over anchored ropes. The gap drawing is aligned with collision geometry.

## Characters and presentation

Stickman, Jonah, Night wanderer, 3D man, Rabbit, Tortoise, Cheetah, Elephant and Stick ant are selectable. Jonah uses the user's supplied image as his selection portrait and an eight-frame transparent sprite sheet generated from that reference for his running animation. A matching code-drawn figure is used while the sprite loads. The first sprite-sheet attempt had an opaque background and remains a concept asset only; the second export has verified transparent pixels. The 3D man is a shaded 2D figure, not a real-time 3D model. Night wanderer is an original silhouette, not a copied Limbo asset.

Continuous limb animation, solid stone bridge undersides, visible falling supports, backward-moving birds, trees and clouds, slightly cooler mist below the bridge, and warm air above it. Night mode includes a crescent moon and stars. Portrait and landscape are supported in both the browser renderer and Android activity.

## Audio

Soft synthesized sounds for first jump, double jump, sliding, sprinting, faster footsteps, near misses, game over and level completion. Audio starts after a user gesture, can be muted and pauses when the app loses visibility. No audio downloads or paid sound assets.

## Removed

Ghost mode and ghost recording. Old endless-mode saves remain under their original storage key but are not used as campaign checkpoints. Old ghost scores are not imported into campaign results. Sky, character preference and best-distance history may be carried over.

## Validation and release

Run `npm test` and `node tests/playability.cjs`. The UI smoke harness verifies level-start retries, unlocks, next-level navigation, local multiplayer, online scene setup and both viewport orientations. Real-device audio, touch, interruptions and network testing are still required before store release. This version is a development alpha.

Android versionCode: 2. Version name: 0.2.0. The APK is signed for development testing; the release AAB needs the publisher's upload-key signature. See PUBLISHING.md for the release process. Optional online hosting remains separately configured.
