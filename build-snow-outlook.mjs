import {copyFile,mkdir,readFile,writeFile} from 'node:fs/promises';
const evidence=JSON.parse(await readFile('destination-evidence.json','utf8'));
await writeFile('destination-evidence.js','// Generated from destination-evidence.json by build-snow-outlook.mjs.\nexport default '+JSON.stringify(evidence,null,2)+';\n');
await mkdir('dist',{recursive:true});
for(const file of ['index.html','style.css','app.js','forecast.js','evidence.js','destination-evidence.js','destination-evidence.json','whistler.js','resorts.json','wechat-qr.jpg']) await copyFile(file,`dist/${file}`);
console.log('221-destination snow outlook ready in dist');
