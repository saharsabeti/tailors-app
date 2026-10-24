import { useCallback, useEffect, useState } from 'react';
import { tailorsRepository } from '../services/tailors';
import type { Tailor } from '../data/tailors';

type State = { items: Tailor[]; loading: boolean; error: string | null; demo: boolean };
export function useTailors() {
  const [state, setState] = useState<State>({ items: [], loading: true, error: null, demo: false });
  const [generation, reload] = useState(0);
  const refresh = useCallback(() => reload(value => value + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    setState(old => ({ ...old, loading: true, error: null }));
    tailorsRepository.list(controller.signal)
      .then(result => {
        if (!controller.signal.aborted) setState({ items: result.items, loading: false, error: null, demo: result.source === 'demo' });
      })
      .catch(error => {
        if (!controller.signal.aborted) setState({ items: [], loading: false, error: error instanceof Error ? error.message : 'خطا در بارگذاری', demo: false });
      });
    return () => controller.abort();
  }, [generation]);
  return { ...state, refresh };
}
