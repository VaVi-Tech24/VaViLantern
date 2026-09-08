# Technologies used

| Layer | Technology / version | Purpose |
|---|---|---|
| Interface | HTML5 and CSS3 | Menus, HUD, dialogs, responsive touch controls |
| Rendering | Canvas 2D | Bridge, parallax scenery, fireballs, water, flame and characters |
| Game logic | Plain JavaScript | Shared deterministic rules and fixed 60 Hz runtime simulation |
| Character art | PNG sprite atlas and Canvas geometry | Complete Jonah poses and procedural companions |
| Sound | Web Audio API | Oscillators, noise, envelopes and lifecycle-aware effects |
| Local persistence | Web Storage localStorage | Device/origin-specific settings, levels and records |
| Android shell | Java 17 and Android System WebView | Packaged web game, virtual HTTPS assets and lifecycle |
| Android package | com.vavitech.lantern | App identifier; API 26 minimum, SDK 36 target/compile |
| Android build | Gradle 8.13 and AGP 8.13.2 | Debug APK and unsigned release AAB |
| Server | Node.js 22 LTS, built-in HTTP/crypto/fs | Optional rooms, authoritative simulation and static files |
| Networking | JSON over HTTP(S), polling around 10 Hz | Input updates and server snapshots |
| Server storage | JSON file, temporary write plus rename | Single-process top-run persistence |
| Container | node:22-alpine, non-root user | Optional API deployment with mounted data directory |
| Testing | Node assert/vm and local HTTP | Mechanics, UI smoke, audio lifecycle and API checks |
| Website build | Node file-copy allowlist | Creates a portable static dist directory |
| Source/distribution | Git and GitHub Releases | Organization repository and versioned binaries |
| Architecture docs | Mermaid in Markdown and .mmd sources | GitHub-rendered context, sequence, state and delivery diagrams |

There is no React, Unity, Unreal, Firebase, SQL server, external game engine, analytics SDK or advertising SDK dependency. The application has no npm runtime dependencies. The optional local toolchain downloads are not part of the source repository.

## Why share the web source?

`web/public` is the single client source. The website build copies it, the Node service serves it, and Android declares it as its asset source directory. This avoids keeping separate browser and phone copies of the same engine, UI and art. The Android shell remains in the conventional `app/` module for Android Studio compatibility.
