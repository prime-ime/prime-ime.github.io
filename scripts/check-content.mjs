// Exercise future non-empty content in an isolated temporary build.
// No test records are ever written to the production content or dist directory.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
const temp = fs.mkdtempSync(path.join(os.tmpdir(),'prime-content-qa-'));
const root = process.cwd();
try {
 for(const name of ['src','public','scripts','astro.config.mjs','package.json','tsconfig.json','citations.bib']) fs.cpSync(path.join(root,name),path.join(temp,name),{recursive:true});
 fs.symlinkSync(path.join(root,'node_modules'),path.join(temp,'node_modules'),'dir');
 const put = (collection,lang,extra,body='QA fixture body. Not a real lab record.') => {
  const fm={lang,translationKey:'qa-fixture',draft:false,...extra};
  fs.writeFileSync(path.join(temp,`src/content/${collection}/${fm.translationKey}.${lang}.md`),'---\n'+Object.entries(fm).map(([k,v])=>`${k}: ${JSON.stringify(v)}`).join('\n')+'\n---\n\n'+body+'\n');
 };
 await sharp({create:{width:100,height:100,channels:3,background:'#285645'}}).png().toFile(path.join(temp,'src/assets/qa-avatar.png'));
 for(const lang of ['zh']) {
  put('team',lang,{name:'QA Fixture Person',role:'Master Student',avatar:'../../assets/qa-avatar.png',bio:'Test-only member',website:'https://example.org/person'});
  put('projects',lang,{title:'QA Fixture Project',description:'Test-only project',links:{Code:'https://example.org/code'}});
  put('news',lang,{title:'QA Fixture News',summary:'Test-only news',date:'2020-01-01'});
 }
 put('news','zh',{title:'QA Draft Hidden',summary:'Must not publish',date:'2020-01-01',draft:true,translationKey:'qa-draft'});
 fs.writeFileSync(path.join(temp,'citations.bib'),'@article{qa-fixture,title={QA Fixture Paper},author={Example, Author},year={2020},journal={QA Venue},pdf={https://example.org/paper},code={https://example.org/code},project={https://example.org/project},featured={true}}');
 const build=spawnSync('npm',['run','build'],{cwd:temp,encoding:'utf8'});
 if(build.status!==0) throw new Error(build.stdout+'\n'+build.stderr);
 for(const prefix of ['']) {
  for(const s of ['people','projects','news']) {
   const filename=path.join(temp,'dist',prefix,s,'qa-fixture/index.html');
   assert.ok(fs.existsSync(filename),`Missing detail ${filename}`);
   assert.match(fs.readFileSync(filename,'utf8'),/QA fixture body/);
  }
  const publications=fs.readFileSync(path.join(temp,'dist',prefix,'publications/index.html'),'utf8');
  for(const expected of ['QA Fixture Paper','year-2020','https://example.org/code','https://example.org/project','<details','@article']) assert.ok(publications.includes(expected),`Missing ${expected}`);
  assert.match(fs.readFileSync(path.join(temp,'dist',prefix,'index.html'),'utf8'),/QA Fixture Paper/);
 }
 const news=fs.readFileSync(path.join(temp,'dist/news/index.html'),'utf8');
 assert.doesNotMatch(news,/QA Draft Hidden/);
 const links=spawnSync(process.execPath,['scripts/check-site.mjs'],{cwd:temp,encoding:'utf8'});
 assert.equal(links.status,0,links.stdout+'\n'+links.stderr);
 console.log('Content QA passed: Chinese member photos/profiles, project/news details, publication links/citations, featured selection, draft exclusion.');
 console.log(links.stdout.trim());
} finally { fs.rmSync(temp,{recursive:true,force:true}); }
