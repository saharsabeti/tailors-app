# Android release checklist (without Expo)

1. Install compatible Node, JDK 17, Android SDK and platform tools.
2. Run `npm install`, then `npm run bootstrap:android` to create the native project.
3. Review generated Android package ID, name, RTL behavior, permission declarations and icons.
4. Commit the generated `android/` directory.
5. Run `npm start` in one terminal, then `npm run android` in another.
6. Verify a physical Android device and emulator (API 35+ as supported by RN 0.81).
7. Configure HTTPS API endpoint; do not ship demo mode or local IP addresses.
8. Generate a unique upload keystore and store credentials outside GitHub.
9. Build a signed release artifact through Gradle after native Android scaffolding exists.
10. Test RTL, networking, accessibility, login, orders, background/resume, and crash-free startup before distribution.

The current repository does **not** contain a verified Android APK or native Android directory. Do not assume release readiness.
