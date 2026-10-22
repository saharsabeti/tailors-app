import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const require = createRequire(import.meta.url);
// Compile the domain TypeScript modules and their local imports in the same
// CommonJS module system, rather than evaluating CommonJS without require.
require.extensions['.ts'] = (module, filename) => {
  const source = readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  module._compile(compiled, filename);
};

const { validateOrderDraft, canTransition } = require('./orders.ts');

test('order description must be descriptive', () => {
  assert.match(validateOrderDraft({ tailorId: '1', description: 'short' }), /۱۰/);
  assert.equal(validateOrderDraft({ tailorId: '1', description: 'دوخت مانتو مجلسی ساده' }), null);
});
test('cannot bypass order workflow states', () => {
  assert.equal(canTransition('requested', 'quoted'), true);
  assert.equal(canTransition('requested', 'delivered'), false);
  assert.equal(canTransition('delivered', 'cancelled'), false);
});
