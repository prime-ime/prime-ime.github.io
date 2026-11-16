// Adapted from Scholar-Lite's BibTeX-to-Markdown importer (MIT).
// citations.bib is authoritative. Only bib-* generated files are replaced.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import bibtexParse from './vendor/bibtexParse.cjs';
const clean = value => (value || '').replace(/[{}]/g, '').trim();
const safeLink = value => {
  const url = clean(value);
  if (!url) return undefined;
  if (!/^https?:\/\//.test(url) && !/^\/(?!\/)/.test(url)) throw new Error(`Invalid resource URL: ${url}. Use https:// or a root-relative path.`);
  return url;
};
export function parseBibliography(source) {
  const entries = bibtexParse.toJSON(source).filter(e => !['comment','preamble','string'].includes(e.entryType.toLowerCase()));
  const keys = new Set();
  return entries.map(entry => {
    const tags = Object.fromEntries(Object.entries(entry.entryTags || {}).map(([k,v]) => [k.toLowerCase(),v]));
    const key = entry.citationKey;
    if (!/^[a-zA-Z0-9_.:-]+$/.test(key || '') || keys.has(key)) throw new Error(`Invalid or duplicate BibTeX key: ${key}`);
    keys.add(key);
    if (!tags.title || !tags.author || !/^\d{4}$/.test(tags.year || '')) throw new Error(`Entry ${key} requires title, author, and a four-digit year.`);
    const venue = clean(tags.journal || tags.booktitle || tags.publisher || tags.howpublished || tags.institution);
    if (!venue) throw new Error(`Entry ${key} requires journal, booktitle, publisher, howpublished, or institution.`);
    const authors = tags.author.split(/\s+and\s+(?=(?:[^{}]*\{[^{}]*\})*[^{}]*$)/i).map(author => {
      if (author.trim().startsWith('{')) return clean(author);
      const parts = clean(author).split(',').map(s => s.trim());
      return parts.length === 2 ? `${parts[1]} ${parts[0]}` : parts.length === 3 ? `${parts[2]} ${parts[0]}, ${parts[1]}` : parts[0];
    });
    const links = Object.fromEntries(Object.entries({pdf:safeLink(tags.pdf || tags.url),code:safeLink(tags.code || tags.github),website:safeLink(tags.website || tags.project)}).filter(([,v]) => v));
    const doi = clean(tags.doi).replace(/^https?:\/\/(?:dx\.)?doi\.org\//i,'');
    const bibtex = `@${entry.entryType}{${key},\n${Object.entries(tags).map(([k,v]) => `  ${k} = {${v}}`).join(',\n')}\n}`;
    return {key, data:{title:clean(tags.title), authors, year:Number(tags.year), venue, ...Object.fromEntries(['volume','pages','note'].filter(k => clean(tags[k])).map(k => [k,clean(tags[k])])), ...(doi ? {doi} : {}), links, featured:clean(tags.featured).toLowerCase() === 'true', bibtex}};
  });
}
export function importBibliography(root = process.cwd()) {
  const source = fs.readFileSync(path.join(root,'citations.bib'),'utf8');
  // Validate the entire input before changing any generated content.
  const records = parseBibliography(source);
  const dir = path.join(root,'src/content/publications');
  fs.mkdirSync(dir,{recursive:true});
  const output = new Map(records.map(({key,data}) => [`bib-${key.replace(/:/g,'_')}.md`, `---\n${Object.entries(data).map(([k,v]) => `${k}: ${JSON.stringify(v)}`).join('\n')}\n---\n`]));
  if(output.size !== records.length) throw new Error('BibTeX keys produce colliding file names. Rename the keys.');
  for (const [name,content] of output) fs.writeFileSync(path.join(dir,name),content);
  for (const name of fs.readdirSync(dir)) if (name.startsWith('bib-') && name.endsWith('.md') && !output.has(name)) fs.unlinkSync(path.join(dir,name));
  fs.mkdirSync(path.join(root,'public'),{recursive:true});
  fs.writeFileSync(path.join(root,'public/publications.bib'),source);
  return records.length;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { console.log(`BibTeX: ${importBibliography()} verified-format entries imported.`); }
  catch(error) { console.error(error.message); process.exitCode = 1; }
}
