// Read the reproducible committed runtime artifact; Python tests validate its modular sources.
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../downloads/language-learning-test.html'),'utf8');
function data(id){const match=html.match(new RegExp(`id="${id}">([\\s\\S]*?)<\\/script>`));if(!match)throw new Error(`Missing runtime data: ${id}`);return JSON.parse(match[1]);}
module.exports={html,course:data('course-data'),locales:data('ui-data')};
