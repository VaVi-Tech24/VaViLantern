# Artwork and branding

The header uses the user-supplied VaViTech24 PNG (`web/public/vavi-tech-logo.png`). It is preserved as supplied, with responsive layout sizing. The game title is VaVi Lantern; the footer reads copyright VaViTech24 2026.

Jonah is based on the supplied reference (`web/public/jonah-reference.jpg`) and a generated eight-frame atlas (`web/public/jonah-run.png`). The atlas is 1536 by 1024 with four columns and two rows. `characters.js` aligns each complete frame using known hand grips and boot-sole rows. Do not split the body into independently clipped parts without reworking the art.

`assets/` retains original/reference material, including the cosmic lantern image and Jonah concept. Android build 26 also uses the exact website logo in app/src/main/res/drawable-nodpi/vavi_tech24.png. Its adaptive launcher icon adds 18% inset padding over a dark green background so the logo stays within launcher masks. The manifest uses this icon for both standard and round launcher presentations.

Scenery, other travelers, flames, fireballs and bridges are drawn in Canvas. Audio is synthesized in `sound.js`; there is no external music file. The game is not claimed to use exclusively human-made art.

No standalone asset license or open-source software license has been selected. Verify ownership and permitted use of supplied/generated artwork before distributing it under a reuse license.
