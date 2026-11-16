import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
// Content keeps Scholar-Lite's Markdown collections and frontmatter conventions.
const link = z.string().refine(v => /^https?:\/\//.test(v) || /^\/(?!\/)/.test(v), 'Use an https URL or a root-relative local path');
const localized = { lang: z.enum(['zh', 'en']).default('zh'), translationKey: z.string().regex(/^[a-z0-9-]+$/), draft: z.boolean().default(false) };
const collection = (name: string) => glob({ pattern: '**/[^_]*.md', base: `./src/content/${name}` });
const research = defineCollection({ loader: collection('research'), schema: z.object({ ...localized, title: z.string(), description: z.string(), order: z.number().default(100), label: z.string(), tags: z.array(z.string()).default([]) }) });
const news = defineCollection({ loader: collection('news'), schema: z.object({ ...localized, title: z.string(), date: z.coerce.date(), summary: z.string(), category: z.string().optional() }) });
const projects = defineCollection({ loader: collection('projects'), schema: z.object({ ...localized, title: z.string(), description: z.string(), order: z.number().default(100), status: z.string().optional(), links: z.record(z.string(), link).default({}) }) });
const team = defineCollection({ loader: collection('team'), schema: ({ image }) => z.object({ ...localized, name: z.string(), role: z.enum(['Faculty', 'PhD Student', 'Master Student', 'Alumni']), avatar: image().optional(), bio: z.string().optional(), email: z.email().optional(), website: link.optional(), github: link.optional(), weight: z.number().default(100) }) });
const publications = defineCollection({ loader: collection('publications'), schema: z.object({ title: z.string(), authors: z.array(z.string()), year: z.number().int(), venue: z.string(), volume: z.string().optional(), pages: z.string().optional(), note: z.string().optional(), doi: z.string().optional(), links: z.object({ pdf: link.optional(), code: link.optional(), website: link.optional() }).default({}), featured: z.boolean().default(false), bibtex: z.string().optional() }) });
export const collections = { publications, team, news, research, projects };
