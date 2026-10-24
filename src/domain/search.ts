import type { Tailor } from '../data/tailors';
export function normalizeQuery(input: string): string {
  return input.trim().toLocaleLowerCase().replace(/[ي]/g, 'ی').replace(/[ك]/g, 'ک').replace(/\s+/g, ' ');
}
export function filterTailors(items: Tailor[], query: string): Tailor[] {
  const q = normalizeQuery(query);
  if (!q) return items;
  return items.filter(t => [t.name, t.expertise, t.location].some(s => normalizeQuery(s).includes(q)));
}
