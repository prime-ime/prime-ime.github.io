import { SITE } from '../config';
export function GET() { return new Response(`User-agent: *\nAllow: /\nSitemap: ${SITE.website}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } }); }
