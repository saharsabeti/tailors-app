# TAILORS — نخ‌یار

Universal Persian marketplace starter for **Web + Android**, with one React Native component codebase and **no Expo**.

## Stack

- React Native Community CLI for Android native runtime
- React Native Web + Vite for browsers
- TypeScript and shared React Native components
- Existing backend stays separate in `tailors-backend`

## Web

```bash
npm install
npm run web
```

## Android

The Android native project must be generated once by the official **React Native Community CLI** on a machine with JDK 17 and the Android SDK.

```bash
npm install
npm run bootstrap:android
npm run android
```

The bootstrap script refuses to overwrite an existing `android/` folder. It generates native Android files locally; they are not checked into this starter branch. Commit generated `android/` to keep reproducible Android builds.

For Metro, use `npm start`. Web uses `npm run web`.

**Prototype only:** displayed tailors and ratings are sample content. No payment or escrow is implemented; production requires real authentication, moderation, backend integration, and a licensed payment processor.

## Cross-platform conventions

- Place shared UI and feature logic under `src/`.
- For unavoidable differences, use `*.web.tsx` and `*.native.tsx`.
- Prefer `View`, `Text`, `Image`, `Pressable` etc. over browser-only elements.
- Browser SEO for public tailor listing pages requires a future prerender/SSR plan; the Vite SPA starter does not provide it.

## Platform API configuration

Web: copy `.env.example` to `.env` and set `VITE_TAILORS_API_URL` to the public backend base URL. Restart Vite. This value is bundled into browser code, so never put credentials in it.

Android: configure `API_BASE_URL` in `src/config/api.ts` with a URL reachable by the device. Web resolves the `.web.ts` override, while native uses `.ts`. Both default to clearly labeled demo content until configured. API response fields are provisional and must be checked against the backend.

Automated checks: `.github/workflows/web-check.yml` runs TypeScript and web build in GitHub Actions. Android builds are not automated yet.
