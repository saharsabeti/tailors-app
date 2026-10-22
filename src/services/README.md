# Tailors API contract

The front end expects `GET /api/v1/tailors` to return either an array or `{ "items": [...] }`.

Each item requires these string properties: `id`, `name`, `expertise`, `location`, `rating`, `initials`.

No API URL configured => clearly labeled demo data. Configured API failures => visible error and retry (never silently switch to fictional data).

Web builds can inject `TAILORS_API_URL` via Vite `define` from their environment, while Android requires configuring a reachable address via native build configuration. Backend contract needs synchronization before production.

## Platform configuration

Browser API URL is configured through public `VITE_TAILORS_API_URL` (see `.env.example`) and `src/config/api.web.ts`. Android uses `src/config/api.ts` with a device-reachable backend URL; it does not inherit Vite environment variables. The URL must not contain secrets. A blank URL runs clearly labeled demo mode. Real backend response compatibility has not been verified.
