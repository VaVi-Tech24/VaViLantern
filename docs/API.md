# Optional online API

Implemented in `server/server.cjs`, consumed by `web/public/online.js`. No public endpoint is currently configured. Start locally with `npm start`; default port is 8787. The same process serves game files.

## Routes

| Method | Route | Request | Result |
|---|---|---|---|
| GET | `/health` | None | `{ "ok": true }` |
| GET | `/leaderboard` | None | `{ "scores": [...] }`, up to 100 recent runs |
| POST | `/rooms` | `{ "name": "Traveler", "level": 1 }` | New room code, bearer token, player index and snapshot |
| POST | `/join` | `{ "name": "Friend", "code": "ABC123" }` | Second membership token/index and snapshot |
| POST | `/state` | Bearer token; `{ "seq": 1, "sprint": false, "actions": ["jump"] }` | Both players, room state and server time |
| POST | `/leave` | Bearer token; `{}` | `{ "ok": true }`; marks member as having left |
| OPTIONS | Routes | Origin/preflight headers | Allowed methods/headers when origin is permitted |

Clients send `Content-Type: application/json`. Use `Authorization: Bearer <session token>` for state/leave. Tokens come only from successful room creation/join. Never post an arbitrary final score; the server computes results.

## Room snapshot

A snapshot contains `code`, `seed`, `level`, `startAt`, `now`, `ended`, and `players`. Each player exposes `name`, `character`, `level`, position `x/y`, `slide`, `flame`, `alive`, `completed`, bonus `score`, `checkpoint`, collapse `edge`, `jumps`, animation `motion`, `reason` and cleared-item map `passed`.

Creation/join additionally return `token` and `index`. The code is six hexadecimal characters; the token is a random 24-byte hex value. Both online players are initialized as Jonah. The second join sets a start time four seconds in the future. The shared random seed is used by both clients and the server; current route hazard selection is mostly level-template driven.

`seq` must be a safe integer greater than the previous accepted sequence. Valid actions are `jump` and `slide`, with at most two accepted from one request; sprint is a held boolean. The server tick consumes the queued actions. `/state` polling is approximately every 100 ms, so network latency is visible.

## Persistence and expiration

- Names are trimmed and limited to 16 characters: Unicode letters/numbers, space, underscore and hyphen.
- At most two members per room and at most 100 in-memory rooms.
- A member unseen for more than 15 seconds loses its run.
- Race duration is capped at 30 minutes. Rooms expire after 35 minutes, or about two minutes after completion.
- Score entries contain name, distance, total score and timestamp. Completion writes up to 100 entries from the last seven days using a temporary file plus rename.
- Old entries are filtered when read; disk cleanup is triggered by subsequent completed races. Strict time-based deletion needs an operator job.

## Configuration and errors

`PORT` defaults to 8787. `SCORE_FILE` defaults to `server/scores.json`. `ALLOWED_ORIGINS` is a comma-separated exact origin allowlist. Android's virtual origin and local preview origins are included by default. Requests with no Origin header are not rejected by the origin check; CORS is not authentication.

The server limits body size to about 2 KiB and roughly 1200 requests per remote socket address per rate window. Behind a proxy this address may be the proxy itself: plan edge rate limiting or trusted-proxy handling before production. A reconnect cannot recover a token lost from browser memory.

Typical failures: 400 invalid request/name; 401 expired or missing race token; 403 origin denied; 404 unknown/occupied room or missing resource; 429 rate limited; 503 room capacity reached. The client backs off after request errors and gives up after five consecutive failures.

This service does not implement accounts, WebSockets, prediction, distributed rooms, SQL storage, verified-human rankings or a public moderation interface. It is not suitable for cash-prize competition.
