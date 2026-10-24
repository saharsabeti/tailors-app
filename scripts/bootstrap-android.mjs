import { existsSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
if (existsSync(resolve(root, 'android'))) {
  console.error('android/ already exists. Refusing to overwrite native code.');
  process.exit(1);
}
const temp = mkdtempSync(join(tmpdir(), 'tailors-rn-'));
try {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const command = spawnSync(npx, ['@react-native-community/cli@20.0.0', 'init', 'Tailors', '--version', '0.81.5', '--directory', join(temp, 'Tailors'), '--skip-install'], { stdio: 'inherit', shell: process.platform === 'win32' });
  if (command.status !== 0) throw new Error('React Native CLI initialization failed.');
  cpSync(join(temp, 'Tailors', 'android'), resolve(root, 'android'), { recursive: true });
  console.log('Native android/ generated. Review and commit it before publishing.');
} finally {
  rmSync(temp, { recursive: true, force: true });
}
