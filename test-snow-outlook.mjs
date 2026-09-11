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
assert.equal(Object.keys(studies).length,221);
for(const [id,s] of Object.entries(studies)){assert.ok(r.some(x=>x.id===id));assert.equal(s.chain.length,4);if(!s.local)assert.equal(s.metrics.length,4);assert.equal(s.monthly.length,5);for(const f of s.facts)assert.ok(evidenceSources[f[2]]);for(const c of s.chain)if(c[2])assert.ok(evidenceSources[c[2]]);assert.ok(studyHTML(id).includes('未完成历史回测'));for(let i=0;i<5;i++){assert.ok(scenarioHTML(id,i).includes(s.monthly[i]));assert.ok(monthEvidence(id,i).trigger);}}
assert.equal(studyHTML('missing'),'');assert.equal(scenarioHTML('missing',0),'');
assert.deepEqual(studies.f99c5eb6b99fffd2.history.map(x=>x[1]),[1589,1450,1400]);
const data=JSON.parse(await readFile(new URL('./destination-evidence.json',import.meta.url)));
assert.equal(data.length,216);
for(const field of ['id','fact','implication','watch'])assert.equal(new Set(data.map(x=>x[field])).size,216,field+' must be destination-specific');
for(const d of data){const resort=r.find(x=>x.id===d.id);assert.ok(resort);assert.equal(d.name,resort.en);assert.equal(d.south,Boolean(forecastFor(resort).profile.south));assert.equal(new URL(d.url).protocol,'https:');for(const field of ['sourceTitle','fact','implication','watch','sourceBasis','reviewed'])assert.ok(d[field]);assert.equal(studies[d.id].local.fact,d.fact);assert.ok(studyHTML(d.id).includes(d.fact.replaceAll('&','&amp;')));for(let i=0;i<5;i++){const m=monthEvidence(d.id,i);assert.ok(m.base.includes(d.watch));if(d.south){assert.ok(/当地|南半球/.test(m.base));assert.ok(!/隆冬|初冬|冬春/.test(m.reason));assert.ok(!m.good.includes('上调'));}}}
for(const i of [-1,5,1.5,NaN])assert.equal(monthEvidence(r[0].id,i),null);
assert.ok(!studyHTML(r[0].id).includes('目的地资料 · 未完成历史回测'));
console.log('Passed: 221 destination studies, 1105 scenarios, 216 distinct fact/inference/watch records, source provenance, hemisphere isolation and original historical chart.');
