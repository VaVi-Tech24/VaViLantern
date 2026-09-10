# VaVi Lantern 0.3.3 — A gentle beginning

VaViTech24 is centered beneath the VaVi Lantern wordmark. Diagonal beam and rope obstacles extend between the front and back deck edges.

A distinct distant mountain appears at the start with amber meteor trails and glowing debris. The mountain layers and bridge gently tremble. The opening sound uses a warm chord and soft bells instead of the earlier rumble and rock impacts. The audio startup race is fixed: the opening sound waits for AudioContext resume, respects mute, and discards stale queued playback on restart. Reduced-motion preferences suppress shaking and reduce meteor movement. Meteors are background scenery, not additional hazards.

Non-overlapping difficulty bands:
- Levels 1–5: Easy — extra starting distance from the collapse, lower flame burn and faster recovery.
- Levels 6–15: Medium — moderate pressure and flame use.
- Levels 16–20: Hard — stronger collapse pressure and additional obstacles.
- Levels 21–25: Very hard — highest pressure and slightly higher flame use.

Running pace and collapse pressure rise within the bands. Prior distance increments and three refill posts remain. The level menu summary displays the difficulty name.

Gaps are spaced across the route with recovery stretches: 5 in Easy, 7 in Medium, 9 in Hard and 12 in Very hard. Every band retains single, double and triple crossings.

Jump limits are 3 for levels 1–5, 4 for levels 6–10, 5 for levels 11–19, and 6 for levels 20–25. Higher levels replace one small gap with a marked long crossing requiring the new jump limit, keeping the overall gap count unchanged. These crossings span 138, 176 or 214 metres. Players can bank more distance from the collapse before attempting them. Controls, help and gap labels show the appropriate jump count.

Validation: 150 deterministic completed runs across all six characters and 25 levels; difficulty-band, campaign, refill, UI/fall/splash and service checks; audio startup/mute/stale-playback tests; browser review of the mountain, meteors, centered lettering and edge-to-edge obstacle base. Physical-device sound preference and human difficulty still require playtesting.

Android output is a debug-signed test APK and unsigned release bundle; nothing has been published to Play.
