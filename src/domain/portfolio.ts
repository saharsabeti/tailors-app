export type PortfolioItem = { id: string; tailorId: string; title: string; imageUrl: string; category: string; description?: string };
export function isPortfolioItem(value: unknown): value is PortfolioItem {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return ['id','tailorId','title','imageUrl','category'].every(k => typeof v[k] === 'string');
}
