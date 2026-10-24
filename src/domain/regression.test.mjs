import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const require = createRequire(import.meta.url);
require.extensions['.ts'] = (module, filename) => {
  const source = readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    fileName: filename, compilerOptions: {module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}
  }).outputText;
  module._compile(compiled,filename);
};
const dates=require('./order-dates.ts'), phone=require('./phone.ts');
const notes=require('./order-notes.ts'), money=require('./money.ts');
const orders=require('./orders.ts'), pagination=require('./pagination.ts');
const ratings=require('./ratings.ts'), quote=require('./quotes.ts');
const upload=require('./upload-policy.ts'), measurements=require('./measurements.ts');
const feedback=require('./feedback.ts'), states=require('./errors.ts');
const currency=require('./currency.ts'), params=require('./query-params.ts');
const validators=require('./validators.ts'), sort=require('./sort.ts');
const access=require('./order-access.ts');

test('01 date format rejects ambiguous date',()=>assert.equal(dates.isIsoDate('10/22/2026'),false));
test('02 invalid calendar date rejected',()=>assert.equal(dates.isIsoDate('2026-02-30'),false));
test('03 valid leap day accepted',()=>assert.equal(dates.isIsoDate('2028-02-29'),true));
test('04 order description normalized',()=>assert.equal(notes.normalizeOrderDescription('  دوخت   مانتو  '),'دوخت مانتو'));
test('05 short order rejected',()=>assert.notEqual(orders.validateOrderDraft({tailorId:'1',description:'short'}),null));
test('06 valid order accepted',()=>assert.equal(orders.validateOrderDraft({tailorId:'1',description:'دوخت لباس مجلسی زنانه'}),null));
test('07 delivered cannot be cancelled',()=>assert.equal(orders.canTransition('delivered','cancelled'),false));
test('08 requested can be quoted',()=>assert.equal(orders.canTransition('requested','quoted'),true));
test('09 Persian digits phone normalized',()=>assert.equal(phone.normalizeIranianPhone('۰۹۱۲۳۴۵۶۷۸۹'),'09123456789'));
test('10 invalid phone rejected',()=>assert.equal(phone.normalizeIranianPhone('123'),null));
test('11 money formatted with unit',()=>assert.match(money.formatToman(1200),/تومان/));
test('12 invalid amount handled',()=>assert.equal(money.formatToman(-1),'مبلغ نامعتبر'));
test('13 pagination uses one-based pages',()=>assert.deepEqual(pagination.paginate([1,2,3,4],{page:2,pageSize:2}),[3,4]));
test('14 rating of 5 parsed',()=>assert.equal(ratings.parseRating('۵'),5));
test('15 invalid rating rejected',()=>assert.equal(ratings.parseRating('6'),null));
test('16 invalid quote rejected',()=>assert.notEqual(quote.validateQuote({id:'1',orderId:'1',amountToman:0,deliveryDays:1,status:'pending'}),null));
test('17 dangerous file mime blocked',()=>assert.equal(upload.canUploadImage('image/svg+xml',100),false));
test('18 measurement range validated',()=>assert.equal(measurements.validateMeasurement({label:'دور کمر',centimeters:80}),true));
test('19 rating must be 1 to 5',()=>assert.notEqual(feedback.validateFeedback({tailorId:'1',rating:7,comment:''}),null));
test('20 401 classified unauthorized',()=>assert.equal(states.classifyHttpStatus(401),'unauthorized'));
test('21 toman converts to rial',()=>assert.equal(currency.tomanToRial(200),2000));
test('22 query params encode safely',()=>assert.equal(params.encodeQueryParams({search:'دوخت لباس'}),'search='+encodeURIComponent('دوخت لباس')));
test('23 only HTTPS passes URL validator',()=>assert.equal(validators.isValidHttpsUrl('http://example.com'),false));
test('24 sort does not mutate input',()=>{const input=[{name:'ب'},{name:'آ'}];sort.sortTailorsByName(input);assert.equal(input[0].name,'ب');});
test('25 cross-user order access denied',()=>assert.equal(access.canViewOrder({id:'a',role:'customer'},'b','c'),false));
