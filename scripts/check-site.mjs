import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('dist');
const files = fs.readdirSync(root,{recursive:true}).filter(p => p.endsWith('.html'));
assert.ok(!fs.existsSync(path.join(root,'en')),'English output must be removed');
assert.doesNotMatch(fs.readFileSync(path.join(root,'sitemap.xml'),'utf8'),/https:\/\/prime-ime.github.io\/en(?:\/|<)/);
let links=0;
for(const file of files) {
 const html=fs.readFileSync(path.join(root,file),'utf8');
 assert.doesNotMatch(html, /hreflang=|class="lang-switch"|(?:href|src)="\/en(?:\/|")/,`${file}: English navigation must be removed`);
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: expected one h1`);
 assert.match(html,/<html lang="zh-CN"/,`${file}: language`);
 assert.match(html,/<link rel="canonical" href="https:\/\/prime-ime.github.io\//,`${file}: canonical`);
 assert.doesNotMatch(html,/scholar-lite-demo|contact@lab\.edu|Sarah Johnson|GPT-4 Technical Report|University Name/,`${file}: demo content`);
 for(const [,raw] of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
  if(!raw.startsWith('/') && !raw.startsWith('#')) continue;
  const base='https://prime-ime.github.io/'+file.replace(/index\.html$/,'');
  const url = new URL(raw.replace(/&amp;/g,'&'),base);
  const local = decodeURIComponent(url.pathname).replace(/^\//,'');
  let dest=path.join(root,local);
  if (url.pathname.endsWith('/')) dest=path.join(dest,'index.html');
  assert.ok(fs.existsSync(dest),`${file}: missing ${raw}`);
  if(url.hash && dest.endsWith('.html')) {
   const target=fs.readFileSync(dest,'utf8');
   assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`${file}: broken anchor ${raw}`);
  }
  links++;
 }
}
for(const lang of ['']) for(const route of ['', 'research/', 'publications/', 'people/', 'projects/', 'news/', 'join/', 'search/']) assert.ok(fs.existsSync(path.join(root,lang,route,'index.html')),`Missing ${lang}${route}`);
for(const required of ['og.png','sitemap.xml','robots.txt','pagefind/pagefind.js','publications.bib']) assert.ok(fs.existsSync(path.join(root,required)),`Missing ${required}`);
console.log(`Static QA: ${files.length} pages, ${links} internal links/assets validated; all Chinese routes present; English routes removed.`);
