import { tailors as demoTailors, type Tailor } from '../data/tailors';

export type DataSource = 'demo' | 'api';
export type TailorsResult = { items: Tailor[]; source: DataSource };
export type TailorsRepository = { list(signal?: AbortSignal): Promise<TailorsResult> };

const apiBaseUrl = (typeof process !== 'undefined' && process.env?.TAILORS_API_URL) || '';
// React Native on-device: configure this URL for a host reachable from the Android emulator/device.
// Never default to localhost: Android devices do not resolve localhost to the development PC.
function apiUrl(): string {
  return apiBaseUrl.replace(/\/$/, '');
}
const isTailor = (value: unknown): value is Tailor => {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return ['id', 'name', 'expertise', 'location', 'rating', 'initials'].every(key => typeof v[key] === 'string');
};
export class TailorsApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'TailorsApiError';
  }
}
export const tailorsRepository: TailorsRepository = {
  async list(signal) {
    if (!apiUrl()) return { items: demoTailors, source: 'demo' };
    let response: Response;
    try {
      response = await fetch(`${apiUrl()}/api/v1/tailors`, { method: 'GET', headers: { Accept: 'application/json' }, signal });
    } catch (error) {
      if (signal?.aborted) throw error;
      throw new TailorsApiError('اتصال به سرور برقرار نشد. دوباره تلاش کنید.');
    }
    if (!response.ok) throw new TailorsApiError('دریافت فهرست خیاط‌ها ناموفق بود.', response.status);
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new TailorsApiError('پاسخ سرور معتبر نیست.');
    }
    const items = Array.isArray(payload) ? payload : (payload && typeof payload === 'object' && 'items' in payload ? (payload as {items: unknown}).items : null);
    if (!Array.isArray(items) || !items.every(isTailor)) throw new TailorsApiError('ساختار اطلاعات دریافتی با قرارداد API سازگار نیست.');
    return { items, source: 'api' };
  },
};
