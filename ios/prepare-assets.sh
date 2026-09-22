#!/bin/sh
# Xcode runs this before copying resources. No network or package manager needed.
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
mkdir -p "$ROOT/Game"
for file in style.css campaign.css engine.js sound.js characters.js game.js cosmic-lantern.png vavi-tech-logo.png jonah-run.png logo.svg; do
  cp "$ROOT/../web/public/$file" "$ROOT/Game/$file"
done
sed 's|<script src="online.js"></script>|<script src="offline.js"></script>|' "$ROOT/../web/public/index.html" > "$ROOT/Game/index.html"
cp "$ROOT/Offline/offline.js" "$ROOT/Game/offline.js"
echo 'Prepared bundled iOS game (solo and same-device two-player).'
