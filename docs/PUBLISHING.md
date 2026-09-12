# Google Play preparation

GitHub distribution and Google Play publication are separate. Version 1.0.0 is currently packaged as a development-signed APK and unsigned AAB; neither is a finished Play submission as supplied.

## Build and sign

### September 2026 preparation

The latest Android source uses versionName **1.0.0**, versionCode **31**, and packages the current website assets, including the Dawn → Dusk → Night level cycle. The application ID is `com.vavitech24.lantern`. A locally built debug APK is for device testing; an unsigned release AAB must be upload-key signed before Play submission. Do not overwrite an older published binary or assume its signature is suitable for production.

The owner has not yet registered a Play Console account. The next steps are:

1. Register at [Play Console](https://play.google.com/console/signup). Google lists a US$25 one-time registration fee; complete the identity/contact and applicable Android-device verification steps. Choose Personal or Organization based on actual legal status.
2. Create the game listing as VaVi Lantern. Keep the package ID above, and prepare a public support email and final privacy-policy URL.
3. Create and securely back up an upload key through Android Studio's signed bundle wizard. Enroll in Play App Signing. Keep passwords out of chat and source control.
4. Upload the signed bundle to internal testing first. Install through Play and test touch controls, portrait/landscape rotation, background/resume, audio interruption, offline startup, saved progress and same-device multiplayer.
5. Complete the store listing, content rating, target audience, ads, app-access and Data safety declarations based on the final shipped behavior. The existing privacy document is still a draft and cannot be submitted unchanged. Do not advertise a working online race service or cash/gift rewards unless actually provided.
6. For a new personal account, run the required closed test with at least 12 testers opted in continuously for 14 days, then apply for production access. Meeting the testing duration is not automatic production approval.
7. Resolve pre-launch report issues and submit for review once production access and listing requirements are satisfied.

Current official references: [registration and fee](https://support.google.com/googleplay/android-developer/answer/6112435), [new personal-account testing](https://support.google.com/googleplay/android-developer/answer/14151465). As of August 31, 2026, new phone/tablet apps and updates must target API 36 or higher; this project already targets API 36. See [target API requirements](https://developer.android.com/google/play/requirements/target-sdk).

The app uses Java and bundled web assets without declared native libraries. Confirm the final artifact's contents and test on target devices; do not treat a successful build as device certification. See [16 KB page-size support](https://developer.android.com/guide/practices/page-sizes).

### Android Studio signing

1. Open the repository in Android Studio and configure JDK 17 and SDK 36.
2. Confirm `com.vavitech24.lantern` is the intended permanent application ID.
3. Use Build → Generate Signed App Bundle / APK → Android App Bundle.
4. Select or create your own upload key, keep secure backups, and never commit it or its passwords.
5. Configure Play App Signing and follow the current instructions in Console.

Official reference: [Android app signing](https://developer.android.com/studio/publish/app-signing).

## Account and listing

Create/verify the appropriate developer account and use VaViTech24 as the public developer name where permitted. Complete the identity and contact requirements shown in Console. A brand name does not itself establish a registered organization.

Suggested game title: **VaVi Lantern**.

Suggested short description: **Carry the last flame across falling bridges and quiet skies.**

Suggested listing copy:

> Walk to restore your torch, sprint to escape the collapsing bridge, and time your jumps toward the next gateway. Explore 25 levels with six travelers, changing day and night skies, and gentle sounds. Share one device with a friend on two bridges, or take the journey at your own pace.

Advertise online races only after the separate service is publicly deployed and tested. Do not mention ghost mode, cash rewards or features that are absent. Use actual gameplay screenshots and the correct store artwork exports.

## Required before submission

- A complete public privacy policy with real support contact, provider and retention information.
- Accurate Data safety answers for the shipped app and enabled online service.
- Content rating, target audience, app access and ads declarations.
- Physical-device testing: rotation, touch, lifecycle, sound, WebView versions, long sessions and offline relaunch.
- Internal/closed testing and production-access requirements applicable to your developer account.
- Current target-SDK and asset requirements verified in Play Console at submission time.

Official references: [Developer registration](https://support.google.com/googleplay/android-developer/answer/6112435), [testing requirements](https://support.google.com/googleplay/android-developer/answer/14151465), [target SDK](https://developer.android.com/google/play/requirements/target-sdk), [store assets](https://support.google.com/googleplay/android-developer/answer/9866151), [privacy requirements](https://support.google.com/googleplay/android-developer/answer/10144311).

The optional online prototype does not establish verified identities or prevent bots. No cash-reward promotion is implemented or approved. Recheck current platform policies when preparing the actual submission rather than relying on an old checklist.
