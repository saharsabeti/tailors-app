import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import ts from 'typescript';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('./search.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source.replace("import type { Tailor } from '../data/tailors';", ''), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const module = { exports: {} };
new Function('module', 'exports', compiled)(module, module.exports);
const { filterTailors, normalizeQuery } = module.exports;
test('normalizes Persian/Arabic variants', () => assert.equal(normalizeQuery('  كيا  '), 'کیا'));
test('filters by city and name', () => {
  const entries = [{ name: 'كيانا', expertise: 'مانتو', location: 'تهران' }, { name: 'آوا', expertise: 'کت', location: 'اصفهان' }];
  assert.deepEqual(filterTailors(entries, 'کیانا'), [entries[0]]);
  assert.deepEqual(filterTailors(entries, 'اصفهان'), [entries[1]]);
  assert.equal(filterTailors(entries, 'ندارد').length, 0);
});
