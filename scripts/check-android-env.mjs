import { existsSync } from 'node:fs';
import { join } from 'node:path';
const isWindows = process.platform === 'win32';
const javaHome = process.env.JAVA_HOME;
const androidSdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
const requirements = [
  ['Java home (JDK 17 recommended)', Boolean(javaHome && existsSync(javaHome))],
  ['Android SDK', Boolean(androidSdk && existsSync(androidSdk))],
  ['Android native directory', existsSync(join(process.cwd(),'android'))],
];
for (const [name, ok] of requirements) console.log(`${ok ? 'OK' : 'MISSING'}: ${name}`);
if (requirements.some(([,ok])=>!ok)) {
  console.error('Generate android/ with npm run bootstrap:android, and configure JDK 17 / Android SDK.');
  process.exitCode = 1;
}
console.log(`Platform: ${isWindows ? 'Windows' : process.platform}`);
