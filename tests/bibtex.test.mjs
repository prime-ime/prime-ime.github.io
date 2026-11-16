import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseBibliography, importBibliography } from '../scripts/import-bibtex.js';
const fixture = '@article{fixture2026, title={A {Test} "Title"}, author={Smith, Alice and {Research and Energy Group}}, year={2026}, journal={Test Venue}, doi={https://doi.org/10.0000/test}, code={https://example.org/code}, project={https://example.org/project}, featured={true}}';
test('imports names, protected text, links, DOI and explicit featured flag', () => {
 const [r] = parseBibliography(fixture);
 assert.deepEqual(r.data.authors,['Alice Smith','Research and Energy Group']);
 assert.equal(r.data.title,'A Test "Title"'); assert.equal(r.data.featured,true);
 assert.equal(r.data.doi,'10.0000/test'); assert.equal(r.data.links.website,'https://example.org/project');
 assert.match(r.data.bibtex, /@article\{fixture2026/);
});
test('empty bibliography is valid; malformed and duplicate entries fail', () => {
 assert.deepEqual(parseBibliography('% no records yet'),[]);
 assert.throws(() => parseBibliography('@article{x,title={Missing fields}}'));
 assert.throws(() => parseBibliography(fixture+'\n'+fixture),/duplicate/);
 assert.throws(() => parseBibliography(fixture.replace('https://example.org/code','javascript:alert(1)')),/Invalid resource/);
});
test('updates and deletions synchronize generated files; manual content is preserved', () => {
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'prime-bib-test-'));
 try {
  fs.writeFileSync(path.join(root,'citations.bib'),fixture); assert.equal(importBibliography(root),1);
  const dir=path.join(root,'src/content/publications'); fs.writeFileSync(path.join(dir,'manual.md'),'manual');
  fs.writeFileSync(path.join(root,'citations.bib'),fixture.replace('A {Test}', 'An {Updated}'));
  importBibliography(root); assert.match(fs.readFileSync(path.join(dir,'bib-fixture2026.md'),'utf8'),/Updated/);
  fs.writeFileSync(path.join(root,'citations.bib'),'@article{broken,title={Invalid}}'); assert.throws(() => importBibliography(root));
  assert.ok(fs.existsSync(path.join(dir,'bib-fixture2026.md')));
  fs.writeFileSync(path.join(root,'citations.bib'),'% empty'); assert.equal(importBibliography(root),0);
  assert.deepEqual(fs.readdirSync(dir),['manual.md']);
 } finally {fs.rmSync(root,{recursive:true,force:true});}
});
