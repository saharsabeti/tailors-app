# Building the first Android APK (React Native CLI only)

## Option 1: GitHub Actions

Open **Actions → Android debug APK → Run workflow** on `feat/universal-react-native-web`.
The workflow installs dependencies, generates `android/` via React Native Community CLI, runs Gradle `assembleDebug` and uploads artifact `tailors-android-debug` if successful.

The APK is a **debug build**, intended for development and device testing, not Play Store/Cafe Bazaar production release. Download it from the completed workflow run; a successful artifact requires a green workflow run. As of this documentation, success has **not been verified**.

## Option 2: Local Windows

Prerequisites: Node 20.19+ or compatible RN 0.81 runtime, JDK 17, Android Studio/SDK, ANDROID_HOME. Run:
```powershell
npm install
npm run bootstrap:android
npm run check:android
cd android
.\gradlew.bat assembleDebug
```

The local APK should appear at `android/app/build/outputs/apk/debug/app-debug.apk` if Gradle succeeds.

For running in a connected emulator or USB Android device, `npm start` and `npm run android` may be used. Do not run the bootstrap again if `android/` exists.

### Connect to backend
- Browser: `VITE_TAILORS_API_URL` in .env.
- Android: edit `src/config/api.ts` before building. Use **HTTPS** reachable from your device.
- Both use the same `GET /api/v1/tailors` service. The contract remains **provisional** until verified against the backend.
- No URL means demo content. This makes the debug APK useful for UI tests even without a running backend.
