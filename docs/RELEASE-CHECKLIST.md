# Release readiness

## Current implementation

- 25 levels, increasing lengths/difficulty and 3–6 jump limits.
- Six named travelers, Jonah default, centered runner and animated falling bridge.
- Three flame-refill posts per level; level-start retries and local unlocks.
- Same-device dual bridges; optional authoritative HTTP race prototype and weekly board.
- Responsive browser game and Android WebView wrapper; procedural audio and supplied/generated art.
- No ghost mode, ads, purchases, cash rewards or cross-device accounts.

## Required before production distribution

- Physical-device touch, rotation, lifecycle, WebView, sound and long-session tests.
- Human balance testing across all difficulty bands; automated completion is not enough.
- Owner upload-key signing and Google Play's current account/testing requirements.
- Completed privacy policy, support contact, audience/content rating and Data safety answers.
- Store screenshots, icon and feature graphic meeting current Console requirements.
- If online play is advertised: live HTTPS service, durable storage, retention policy, monitoring, real-network tests, moderation and abuse controls.

## GitHub release checks

- Commit the actual source and documentation; confirm no secrets or local score data are staged.
- Align package version, Android versionName and increased versionCode.
- Run appropriate tests and website/Android builds.
- Verify APK signature and version metadata; record SHA-256 hashes for both artifacts.
- Attach only the requested latest version and clearly label the AAB unsigned and APK debug-signed.
- Verify remote source and release attachment names/sizes after upload.
