import {readFile,writeFile} from 'node:fs/promises';
const [html,css,motionCss,learningCss,model,motion,data,state,workspace,metrics,app]=await Promise.all(['dist/index.html','dist/styles.css','dist/motion.css','dist/learning.css','dist/model.mjs','dist/motion.mjs','dist/learning-data.mjs','dist/learning-state.mjs','dist/learning-app.mjs','dist/metrics.mjs','dist/app.mjs'].map(p=>readFile(new URL(p,import.meta.url),'utf8')));
const script=[model,motion,data,state,workspace,metrics,app].map(source=>source.replaceAll('export ','').replace(/^import .*?;\r?\n/gm,'')).join('\n');
new Function(script); // Parse the complete bundle without executing browser code.
const standalone=html.replace('<link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="motion.css"><link rel="stylesheet" href="learning.css"><script type="module" src="app.mjs"></script>',`<style>${css}\n${motionCss}\n${learningCss}</style><script type="module">${script}</script>`);
if(standalone===html)throw new Error('Preview assets were not embedded. Check the HTML asset tags.');
await writeFile(new URL('StudyPass-Preview.html',import.meta.url),standalone);console.log('Created StudyPass-Preview.html — self-contained preview; no server required.');
await writeFile(new URL('index.html',import.meta.url),standalone);
