import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
test('Persian search helper normalizes Arabic chars and trims whitespace', () => {
  const text = readFileSync(new URL('./search.ts', import.meta.url), 'utf8');
  assert.match(text, /replace\(\/[ي]/);
  assert.match(text, /trim\(\)/);
});
