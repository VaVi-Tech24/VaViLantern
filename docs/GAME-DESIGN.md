# Game rules and presentation

## Campaign

There are 25 levels. Levels 1–5 are Easy, 6–15 Medium, 16–20 Hard and 21–25 Very hard. Odd levels start in dawn; even levels in night. The menu also has dusk previews. Death restarts at x=0 in the selected level. Completion unlocks the next level locally; online races do not unlock campaign progress.

| Levels | Length formula, with L as level number | Jump limit | Gap count per level |
|---|---|---|---|
| 1–5 | 2000 + (L-1) × 250 m | 3 | 5 |
| 6–9 | 2000 + (L-1) × 250 m | 4 | 7 |
| 10 | 4500 m | 4 | 7 |
| 11–15 | 4000 + (L-9) × 500 m | 5 | 7 |
| 16–19 | 4000 + (L-9) × 500 m | 5 | 9 |
| 20 | 19000 m | 6 | 9 |
| 21–25 | 9000 + (L-19) × 10000 m | 6 | 12 |

Level 25 is 69000 m. These long distances are intentional current settings. Route hazards are distributed across the full length with recovery space. Every difficulty band keeps single, double and triple jumps. Above level 5, one small gap is replaced with a long crossing requiring the new maximum jump count; total gap frequency does not increase for this replacement. Other obstacles count as `10 + tier*3 + floor((L-1)/3)`, where tier is 0–3.

## Characters

All six are selectable. Jonah is the default; Pranay is listed last. Values are base game units before level scaling.

| ID | Display name | Walk | Sprint | Flame burn/s | Recovery/s |
|---|---|---:|---:|---:|---:|
| jonah | Jonah | 56 | 112 | 15 | 11 |
| tortoise | Junnu | 47 | 95 | 11 | 12 |
| cheetah | Prem | 65 | 135 | 23 | 11 |
| elephant | Chinnu | 49 | 99 | 12 | 12 |
| ant | Joel | 52 | 99 | 11 | 12 |
| stickman | Pranay | 56 | 112 | 16 | 11 |

Online rooms currently create Jonah players on the server, regardless of local selection.

## Physics and resource loop

Ground speed is the character pace/sprint multiplied by `1 + (L-1)*0.008`. In-air horizontal speed is 64; a jump resets vertical speed to 100 and gravity is 280. Timed taps provide additional air boosts, up to the stage limit; landing resets jump count. Slide lasts 0.65 seconds and can start only on the ground.

Flame ranges from 0–100. Sprint burns flame; releasing sprint restores it even while airborne. Easy uses burn multiplier 0.8 and recovery 1.15; Medium 0.9/1.05; Hard 1/1; Very hard 1.02/1. The collapse moves faster than walking. Sprint creates a reserve of safe distance, bounded at 140 m plus 30 m per jump above three. Waiting or walking indefinitely loses to the bridge.

Ground animation phase advances at 8 units/s walking and 13 sprinting. Airborne phase advances at 2.4 for a slower pose change; flight physics are not slowed.

## Hazards and rewards

| Item | Behavior |
|---|---|
| Small gap | 20 m, one jump |
| Double gap | 62 m, two timed jumps |
| Triple gap | 100 m, three timed jumps |
| Higher-level gap | 138 / 176 / 214 m, 4 / 5 / 6 timed jumps |
| Beam | Slide while crossing |
| Rope | Hop high enough to clear |
| Crow | Removes 12 flame once if neither jumping high nor sliding |
| Lantern post | Three per route; restores flame to 100 and gives 75 points once |
| Cleared hazard | 20 points |
| Level finish | 200 points |

Displayed total is floor(distance + bonus score). A low landing beyond a gap can emit a near-miss sound/event; it is not a separate stored combo multiplier. Refill posts do not save an in-level restart point. Fog drawing remains in the renderer but the current route generator does not create fog hazards.

## Visual/audio direction

High diagonal wooden bridges, twin supports, moving water/fish, upper clouds, birds, layered mountains, opening and ending gateways. The sun/moon stay fixed at a viewport-relative location while scenery scrolls. Opening fireballs are cosmetic. Jonah uses complete atlas frames with hand anchors and boot offsets. Falling runners enter water before results; splash plays once. Synthesized bells, jumps, sprint, slide and soft opening tones require sound enabled and a user gesture.

## Storage and omissions

Progress is local to each browser origin or Android WebView. No account login, cloud save, ghost mode, paid skins, ads, purchases, cash payouts or verified unique-player ranking is implemented. Browser automation can complete the game; the online score computation does not imply anti-bot protection.
