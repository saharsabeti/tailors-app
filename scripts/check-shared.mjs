import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = fileURLToPath(new URL('../src/', import.meta.url));
const rules = [
  [/from\s*['"](?:react-dom|react-dom\/client)['"]/, 'React DOM in shared source'],
  [/from\s*['"](?:expo|expo-[^'"]+)['"]/, 'Expo in shared source'],
  [/\b(?:window|document)\s*\./, 'browser-only API in shared source'],
];
let issues = 0;
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) { walk(path); continue; }
    if (!/\.[jt]sx?$/.test(entry.name) || /\.web\.[jt]sx?$/.test(entry.name)) continue;
    for (const [pattern, reason] of rules) {
      if (pattern.test(readFileSync(path, 'utf8'))) {
        console.error(`${path}: ${reason}`);
        issues++;
      }
    }
  }
}
walk(src);
if (issues) process.exit(1);
console.log('Shared-source guard passed.');
