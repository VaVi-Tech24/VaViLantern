# Deployment and operations

## Static website

Run `npm run build`; publish the contents of `dist/` to a static HTTPS host. `index.html` must be at the hosting root. The build includes all scripts/styles, Jonah's atlas, the supplied VaVi Tech logo and existing brand assets. Only allowlisted public files are copied; no Android keys, server score data or development tools belong in this output.

Solo and same-device multiplayer need no API. Progress is stored under the website origin, so switching hostname creates a separate storage area. There is no service worker/installable-PWA cache in this version; Android is the packaged offline distribution.

Published September 8, 2026: https://vavilantern.com and https://www.vavilantern.com. Both domains have active HTTPS. Cloudflare manages registration and DNS; Sites serves the static game. Reuse the existing `.openai/hosting.json` binding for updates. GitHub commits do not automatically deploy.

After a domain is purchased, attach it to the selected host using that host's actual DNS verification/routing records. Configure both the root hostname and `www` as needed. Do not invent DNS targets; wait for the host's values and validate HTTPS after activation.

## Optional online server

Use one Node 22 process with a persistent score-file path, behind an HTTPS proxy. A static website and API may use the same origin or separate origins with an explicit allowlist.

```sh
docker build -f server/Dockerfile -t vavi-lantern .
docker volume create vavi-lantern-data
docker run --rm -p 8787:8787 \
  -e ALLOWED_ORIGINS=https://your-registered-domain.example \
  -v vavi-lantern-data:/data vavi-lantern
```

The example requires a real TLS terminator before public exposure. `/health` is the health endpoint. Configure `SCORE_FILE` when not using the container. The image runs as the `node` user; mounted storage must be writable by it. A restart loses rooms but should retain scores on the volume.

Before production: deploy TLS, confirm origins, back up scores, test file permissions, monitor memory/errors, validate two-device races and disconnects, choose real retention/contact policies, and address rate limits behind the proxy. A process count greater than one is not supported by the current memory/JSON architecture.

## Android

Application ID is `com.vavitech.lantern`; minimum API 26, target/compile API 36, Java 17, Gradle 8.13 and AGP 8.13.2. The manifest supports both orientations using `fullUser` and disables Android backup. The browser game is packaged in the APK and loaded through a virtual HTTPS origin.

Debug output: `app/build/outputs/apk/debug/app-debug.apk`.
Release bundle: `app/build/outputs/bundle/release/app-release.aab`.

The default release configuration has no upload key. Generate a signed bundle using your own securely stored key before submitting to Play. Do not commit keys or passwords. A debug APK cannot be used as a production Play release. Device/WebView testing and completed store/privacy materials are still required.

## GitHub distribution

Keep source in Git; attach the latest APK, unsigned AAB and checksum manifest to a prerelease tagged with its semantic version. Mark the release as a test build. Do not publish older builds unless requested. A release tag must point to the source used for the current app, and attachment metadata must match the app versionName/versionCode.

GitHub authentication and repository write permission are required for pushing source and creating releases. No GitHub token should appear in scripts, remote URLs, screenshots or documentation.
