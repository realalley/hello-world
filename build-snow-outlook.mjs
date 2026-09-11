import {copyFile,mkdir} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','style.css','app.js','forecast.js','evidence.js','whistler.js','resorts.json','wechat-qr.jpg']) await copyFile(file,`dist/${file}`);
console.log('221-destination snow outlook ready in dist');
