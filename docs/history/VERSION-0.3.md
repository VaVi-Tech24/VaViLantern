# VaVi Lantern 0.3.0 — A longer crossing

Jonah uses his original complete eight-frame running artwork again. The torch follows the painted hand; the arm replacements and torso/leg slicing are removed. Diagonal planks are about 59% longer across the deck, and all travelers run in the middle of that surface.

Every one of the 25 levels now contains 10 small gaps, 6 double-jump gaps, 3 triple-jump gaps, at least 10 other obstacles, and 3 flame-refill posts. Routes extend from 6,500 to 10,100 metres. Later levels add other obstacles and retain increasing pace and collapse pressure. Posts sit in safe spaces between hazards, restore flame to 100%, and award 75 points once per run. They do not change the level-start retry point. Day/night alternation and existing unlocks remain.

Fatal falls, exhausted flames and fatal obstacle collisions now show the traveler tumbling into water. A soft filtered-noise splash with gentle tonal bubbles accompanies droplets and expanding ripples, followed by the retry screen. Sound respects the existing mute setting. Crow contact still drains flame rather than always causing death.

A large timber gateway with hanging lanterns, warm glow and floating sparks marks the finish. The VaVi Lantern wordmark uses serif lettering with an italic Lantern, and VaVi Tech uses small spaced capitals.

Validation: campaign, route-count, safe-post placement, refill-once, retry, fall/splash-once, UI lifecycle/orientation and multiplayer service checks passed. All six characters completed all 25 routes in deterministic controller tests (150 runs). Browser reviews covered the finish gateway, centered runner, falling pose, splash and refill post. Human difficulty and Android audio/animation should still be assessed on a physical phone.

Android output: debug-signed testing APK and unsigned release bundle. Play publishing and production signing have not been performed.
