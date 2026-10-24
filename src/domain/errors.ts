export type AppErrorKind = 'network' | 'unauthorized' | 'forbidden' | 'not_found' | 'validation' | 'unknown';
export function classifyHttpStatus(status: number): AppErrorKind {
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status === 404) return 'not_found';
  if (status >= 400 && status < 500) return 'validation';
  return 'unknown';
}
