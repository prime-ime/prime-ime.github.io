import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';
export async function getContent(lang: Lang) {
  const [research, publications, team, projects, news] = await Promise.all([
    getCollection('research'), getCollection('publications'), getCollection('team'), getCollection('projects'), getCollection('news'),
  ]);
  const visible = <T extends { data: { lang: Lang; draft: boolean } }>(entries: T[]) => entries.filter(e => e.data.lang === lang && !e.data.draft);
  return {
    research: visible(research).sort((a,b) => a.data.order - b.data.order),
    publications: publications.sort((a,b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title)),
    team: visible(team).sort((a,b) => a.data.weight - b.data.weight),
    projects: visible(projects).sort((a,b) => a.data.order - b.data.order),
    news: visible(news).filter(e => e.data.date <= new Date()).sort((a,b) => b.data.date.getTime() - a.data.date.getTime()),
  };
}
