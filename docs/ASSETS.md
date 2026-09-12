# Artwork and branding

The header uses the user-supplied VaViTech24 PNG (`web/public/vavi-tech-logo.png`). It is preserved as supplied, with responsive layout sizing. The game title is VaVi Lantern; the footer reads copyright VaViTech24 2026.

Jonah is based on the supplied reference (`web/public/jonah-reference.jpg`) and a generated eight-frame atlas (`web/public/jonah-run.png`). The atlas is 1536 by 1024 with four columns and two rows. `characters.js` aligns each complete frame using known hand grips and boot-sole rows. Do not split the body into independently clipped parts without reworking the art.

`assets/` retains original/reference material, including the cosmic lantern image and Jonah concept. Android build 28 uses the selected Jonah-and-torch bridge artwork in app/src/main/res/drawable-nodpi/lantern_app_icon.png. It preserves the supplied image, including the VaViTech24 badge. The adaptive launcher fills its background with the artwork, removing the inset dark bars; launcher masks may crop outer edges. The in-app header retains the original VaViTech24 company logo.

Scenery, other travelers, flames, fireballs and bridges are drawn in Canvas. Audio is synthesized in `sound.js`; there is no external music file. The game is not claimed to use exclusively human-made art.

No standalone asset license or open-source software license has been selected. Verify ownership and permitted use of supplied/generated artwork before distributing it under a reuse license.

Build 29 recomposes the launcher artwork: Jonah, the torch and the company badge are centered for adaptive masks, with landscape extending to every edge. The in-game company logo is unchanged.
