# Optional online service

The service is runnable source, not a deployed worldwide service. No hosting account, domain or payment was created.

## Local test

Run `node server/server.cjs`. In two separate browser windows open `http://localhost:8787`, use that same URL in Friends & world board, create a room in one window and join in the other. A foreground browser may throttle the other window; use two computers for realistic testing.

## Deployment

Use a single Node 18+ process behind an HTTPS reverse proxy. Expose the service and bundled assets on one origin. Set `PORT` (default 8787), `SCORE_FILE` to a writable persistent-volume path and `ALLOWED_ORIGINS` to comma-separated exact browser origins, such as `https://play.your-owned-domain.example`. The Android app origin `https://appassets.androidplatform.net` is already allowed.

Alternatively, from the project root: `docker build -f server/Dockerfile -t vavi-lantern .`. Mount a persistent volume at `/data`. Terminate TLS at your hosting platform/proxy and forward to port 8787. Do not expose cleartext service traffic over the public internet. `/health` returns service health.

The Android app only permits HTTPS service traffic. Its local game remains bundled. To let other people play the browser version, deploy the service/assets under your own HTTPS origin and include that origin in `ALLOWED_ORIGINS`.

## Data and operational limits

- Room membership is authorized with a random session token. The token is kept in memory by the client. There is no durable identity or account recovery.
- Rooms hold at most two players and expire. Disconnected runners time out after 15 seconds. Live races cannot pause.
- Scores are computed on the server. The top 100 entries from completed races in the past seven days are kept in a JSON file. This is a board of runs, not unique verified people.
- The file requires persistent storage and a single server process. Restarting loses live rooms, but saved scores survive with the volume.
- Inputs are polled at roughly 10 Hz; server physics run at 60 Hz. Expect input latency. Add prediction/interpolation and WebSocket transport before marketing fast competitive online play.
- Request size, room count, origin and basic per-address request limits are implemented. Before a broad public launch, add authenticated identities, edge rate limiting, abuse monitoring, report/moderation handling, backups, load testing and removal requests.
- This protocol makes arbitrary posted scores ineffective but does not prevent bots or scripted perfect play. It is **not suitable for a cash-prize competition** as supplied.

Update the privacy policy with your hosting provider, contact address, retention and deletion practices before opening a public service. A service URL is saved only on the player's device; the app does not automatically connect until the player asks.
