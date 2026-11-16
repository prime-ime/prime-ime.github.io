import { getCollection } from 'astro:content';
import { SITE, sections } from '../config';
import { href } from '../i18n/ui';
export async function GET() {
  const urls: string[] = [];
  for (const lang of ['zh'] as const) {
    urls.push(href(lang), ...sections.filter(s => s !== 'search').map(s => href(lang,s)));
    for (const c of ['research','team','projects','news'] as const) {
      const entries = await getCollection(c);
      urls.push(...entries.filter(e => e.data.lang === lang && !e.data.draft && (!('date' in e.data) || e.data.date <= new Date())).map(e => href(lang, `${c === 'team' ? 'people' : c}/${e.data.translationKey}`)));
    }
  }
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${SITE.website}${url}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
