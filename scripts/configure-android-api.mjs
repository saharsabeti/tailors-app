import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const raw = (process.env.TAILORS_API_URL || '').trim().replace(/\/+$/, '');
if (raw && !/^https:\/\/[a-z0-9.-]+(?::\d+)?(?:\/[^\s]*)?$/i.test(raw)) {
  throw new Error('TAILORS_API_URL must be an HTTPS URL without credentials or whitespace.');
}
const output = `// Public Android API endpoint. Generated at build time; do not put secrets here.\nexport const API_BASE_URL = ${JSON.stringify(raw)};\n`;
writeFileSync(resolve('src/config/api.ts'),output,'utf8');
console.log(raw ? 'Configured public Android backend endpoint.' : 'No endpoint provided; Android uses demo mode.');
