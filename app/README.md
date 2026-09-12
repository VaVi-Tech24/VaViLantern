# VaVi Lantern Android module

This folder contains the native Android host: MainActivity, the manifest, launcher resources and module build settings.

The game code is shared with the website in [`../web/public/`](../web/public/). Gradle bundles those files into the APK. MainActivity loads them locally in WebView, including on first launch; it does not download the game from the live website.

Clone the entire repository and open its **root** in Android Studio. This folder alone is not sufficient to build the game.

- [Android architecture, offline behavior and updates](../docs/ANDROID.md)
- [Build setup](../docs/DEVELOPMENT.md)
- [Latest Android release](../docs/RELEASES.md)
