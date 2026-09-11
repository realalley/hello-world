import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {forecastFor,searchResorts,dates} from './forecast.js';
const r=JSON.parse(await readFile(new URL('./resorts.json',import.meta.url)));
assert.equal(r.length,221);assert.equal(new Set(r.map(x=>x.id)).size,221);
for(const x of r){const f=forecastFor(x);assert.deepEqual(f.months.map(m=>m.date),dates);for(const m of f.months)for(const key of ['title','copy','alpine','lower','travel'])assert.ok(m[key]);assert.ok(f.report.join('').length>=280);assert.ok(searchResorts(r,x.en).some(z=>z.id===x.id));assert.ok(searchResorts(r,x.zh).some(z=>z.id===x.id));}
for(const q of ['惠斯勒','Whistler','whisler','WHISTLER','whistlr'])assert.equal(searchResorts(r,q)[0]?.id,'601da07eb6ed67d4');
assert.ok(searchResorts(r,'松').some(x=>x.zh.includes('松花湖')));assert.equal(searchResorts(r,'zzzzzzzzzz').length,0);assert.equal(searchResorts(r,'惠斯勒','日本').length,0);
for(const x of r.filter(x=>['新西兰','智利','阿根廷','澳大利亚'].includes(x.country)))assert.ok(forecastFor(x).profile.south);
console.log('Passed: 221 detail records, 1105 months, exact Chinese/English names, typo search, country filter, southern hemisphere.');
const {studies,evidenceSources,studyHTML,scenarioHTML,monthEvidence}=await import('./evidence.js');
assert.equal(Object.keys(studies).length,5);
for(const [id,s] of Object.entries(studies)){assert.ok(r.some(x=>x.id===id));assert.equal(s.chain.length,4);assert.equal(s.metrics.length,4);assert.equal(s.monthly.length,5);for(const f of s.facts)assert.ok(evidenceSources[f[2]]);for(const c of s.chain)if(c[2])assert.ok(evidenceSources[c[2]]);assert.ok(studyHTML(id).includes('未完成历史回测'));for(let i=0;i<5;i++){assert.ok(scenarioHTML(id,i).includes(s.monthly[i]));assert.ok(monthEvidence(id,i).trigger);}}
assert.equal(studyHTML('missing'),'');assert.equal(scenarioHTML('missing',0),'');
assert.deepEqual(studies.f99c5eb6b99fffd2.history.map(x=>x[1]),[1589,1450,1400]);
console.log('Passed: 5 evidence studies, 25 scenarios, cited fact references, historical chart values and regional fallback.');
