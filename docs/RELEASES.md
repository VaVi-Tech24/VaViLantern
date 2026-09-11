# Android releases

## Latest: 1.0.0 build 26

Publisher branding is **VaViTech24** throughout the game and documentation. This build packages the latest game, including the Dawn → Dusk → Night level cycle. The application ID remains `com.vavitech.lantern`, minimum SDK 26 and target SDK 36.

Download the APK from [build 26](https://github.com/VaVi-Tech24/VaViLantern/releases/tag/v1.0.0-build26). Build 26 uses the website VaViTech24 logo as its adaptive Android launcher icon. It is development-signed for device testing, not a production Play Store release. The release includes a SHA-256 checksum. Earlier release assets retain their original contents and provenance.

## Original version 1.0.0 release

VersionName/package version: **1.0.0**. Android versionCode: **23**. Application ID: **com.vavitech.lantern**. Minimum Android API: **26**.

The release keeps the tested gameplay and latest supplied logo, Pranay name and copyright footer. It adds an organized shared web source folder, complete Android project and current documentation. Only the latest requested version is intended for GitHub upload; older local APKs/AABs are not included.

## Attachments

| File | Use |
|---|---|
| `VaVi-Lantern-1.0.0-test.apk` | Installable development-signed Android test app |
| `VaVi-Lantern-1.0.0-unsigned.aab` | Release bundle requiring your own upload-key signature before Play |
| `VaVi-Lantern-1.0.0-website.zip` | Static website files with index.html at the root |
| `SHA256SUMS.txt` | SHA-256 hashes for the three downloadable artifacts |

[Organization releases](https://github.com/VaVi-Tech24/VaViLantern/releases). Downloads become available only after repository/release upload succeeds. See the final task status for confirmation.

## Provenance and verification

Tag `v1.0.0` must point to the source used to build these artifacts. Android directly packages `web/public`; the web archive comes from `npm run build`. The release should record verified version metadata, APK signature verification, checksums, test results and the exact source commit.

The development signing key is not uploaded or included in source. Debug signatures can differ on other developers' machines. A locally rebuilt debug APK may therefore be unable to update an existing installation without clearing it; preserve user data and use a controlled production signing process before distribution through Play.

## Next releases

Increment Android versionCode every time an Android update is distributed. Align versionName and package.json version, create a new tag, and attach new immutable assets. Avoid modifying a published version in place. No historical source provenance is implied for the earlier untagged local binaries; historical notes are in [history](history/).

## Verified artifacts

The version 1.0.0 APK reports versionCode 23, minimum SDK 26 and target SDK 36. Its development signature verifies, and all packaged game assets match the shared source. The AAB is deliberately unsigned. Campaign, UI, audio and HTTP tests passed, and the playability controller completed all 150 character/level combinations. Physical-device/store certification is not implied.

See [recorded SHA-256 hashes](SHA256SUMS-1.0.0.txt).
