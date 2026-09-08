# Google Play preparation

GitHub distribution and Google Play publication are separate. Version 1.0.0 is currently packaged as a development-signed APK and unsigned AAB; neither is a finished Play submission as supplied.

## Build and sign

1. Open the repository in Android Studio and configure JDK 17 and SDK 36.
2. Confirm `com.vavitech.lantern` is the intended permanent application ID.
3. Use Build → Generate Signed App Bundle / APK → Android App Bundle.
4. Select or create your own upload key, keep secure backups, and never commit it or its passwords.
5. Configure Play App Signing and follow the current instructions in Console.

Official reference: [Android app signing](https://developer.android.com/studio/publish/app-signing).

## Account and listing

Create/verify the appropriate developer account and use VaVi Tech as the public developer name where permitted. Complete the identity and contact requirements shown in Console. A brand name does not itself establish a registered organization.

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
