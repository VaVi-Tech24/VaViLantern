# Apple App Store preparation

Status on September 22, 2026: the iOS project builds with Xcode 27.0 on the owner's Mac and launches in the iOS 27.0 iPhone simulator. The owner has tested it in Device Hub's simulator. Physical-device testing, distribution signing, TestFlight upload and App Store submission remain pending; Apple Developer Program enrollment is still required. Android is in Google Play closed testing and remains a separate release from iOS and the website.

## Required next steps

1. Mac and Xcode setup is complete. Open `ios/VaViLantern.xcodeproj` in Xcode to continue development.
2. [Enroll in the Apple Developer Program](https://developer.apple.com/programs/enroll/). The fee is US$99 per membership year, with regional pricing. Individual enrollment shows your legal name as seller. To show a company as seller, Apple requires an eligible legal organization and verification, including a D-U-N-S number for most organizations. A brand name alone is insufficient.
3. Build and test the [iOS project](../ios/README.md). Since April 28, 2026, uploads require the [iOS/iPadOS 26 SDK or later](https://developer.apple.com/news/?id=ueeok6yw); this is separate from the project's minimum iOS 16.4 deployment target.
4. Register `com.vavitech24.lantern` in your Apple developer account if available. Create VaVi Lantern in App Store Connect using that bundle ID. Signing uses Apple certificates/provisioning, never the Android keystore.
5. Select your team in Xcode, choose a generic iOS device, Product → Archive, Validate App, then Distribute App → App Store Connect. Increment iOS build number for subsequent uploads.
6. Test through TestFlight and fix device-specific problems. Do not assume Google Play's 12-testers/14-days rule applies to Apple.
7. Publish an iOS-specific privacy policy and support page at public URLs before submitting. The in-app privacy text is in `ios/Offline/offline.js`. The existing Android privacy URL describes Android and should not be submitted unchanged for iOS. Public iOS pages are **not deployed yet**.
8. Fill out App Store listing, privacy, age rating, review contact and availability. Upload screenshots from the actual iOS build, including iPad if requested for this universal target. Do not use Android screenshots as iOS screenshots.
9. Submit for review only after archive validation and device tests pass. Apple decides approval; a packaged web game is not automatically accepted or automatically prohibited. See [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/), including 4.2.

## Listing draft

- Name: **VaVi Lantern**
- Subtitle: **Carry the last flame**
- Suggested game category: **Casual** (confirm available categories in App Store Connect).
- Contact: **vavitech24@gmail.com**
- Intended audience: **13+**; answer Apple's content questionnaire truthfully. Apple assigns the displayed rating; the intended audience alone does not set it.
- Version: **1.0.0**; first iOS build **1**.
- Copyright: **2026 VaViTech24**.

Description:

> A serene game by VaViTech24. Carry the last flame as the world falls away behind you. Find your pace, keep the flame alive, and finish the journey across 25 levels.
>
> Choose from six travelers. Jump over gaps, slide beneath barriers, and sprint across falling bridges through dawn, dusk and night scenery.
>
> Play solo or share one device with a friend in two-player mode. Enjoy offline play in portrait or landscape, with gesture guidance and progress saved on your device.
>
> No accounts, ads or in-app purchases. Your next crossing awaits.

Review notes draft (verify against the tested archive):

> The game works entirely offline. No sign-in is needed. From the home screen select Solo journey and Begin level 1. How to play explains tap/swipe-up to jump, swipe-down to slide and touch-and-hold to sprint. Two together starts a same-device two-player game; it does not require a server or another device. Landscape switches orientation. Privacy policy is available on the home screen. All 25 levels unlock through gameplay. Contact vavitech24@gmail.com for support.

## Privacy preparation

For the current source, the proposed App Privacy answer is **Data Not Collected**: progress and preferences are processed locally, and no analytics, ads, online accounts or servers are included. Recheck the final archive and any future SDK additions before making the declaration. Apple says data processed only on-device is not collected for these disclosures: [App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/).

The privacy manifest contains empty accessed-API/collected-data arrays and tracking=false because the native source does not call required-reason APIs directly or include third-party SDKs. Xcode privacy report/archive validation is still required. The manifest is not a substitute for the public privacy policy or App Store Connect answers.

Public iOS policy draft: VaViTech24 does not collect or share personal data through this offline app. Levels, scores and settings remain in local WebKit storage; device backups may include them according to Apple/device settings. Deleting the app removes local records; backup restoration may restore them. Separate support emails are used to respond to requests. No accounts, advertising, analytics, tracking, online leaderboards or purchases are included. Intended for ages 13 and older. Contact vavitech24@gmail.com. Apple services and the separate website have their own practices.

Do not put Apple account passwords, API private keys, certificates or provisioning profiles in GitHub.
