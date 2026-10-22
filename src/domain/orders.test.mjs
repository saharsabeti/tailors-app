import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import ts from 'typescript';
import { readFileSync } from 'node:fs';

function loadTs(name) {
  const source = readFileSync(new URL(name, import.meta.url), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const mod = { exports: {} };
  new Function('module','exports',js)(mod,mod.exports);
  return mod.exports;
}
const { validateOrderDraft, canTransition } = loadTs('./orders.ts');
test('order description must be descriptive', () => {
  assert.match(validateOrderDraft({ tailorId:'1', description:'short' }), /۱۰/);
  assert.equal(validateOrderDraft({ tailorId:'1', description:'دوخت مانتو مجلسی ساده' }), null);
});
test('cannot bypass order workflow states', () => {
  assert.equal(canTransition('requested','quoted'), true);
  assert.equal(canTransition('requested','delivered'), false);
  assert.equal(canTransition('delivered','cancelled'), false);
});
