import { useEffect, useState } from 'react';

/**
 * Pulls the live Core+ proof data from /api/coreplus-live.
 *
 * Everything this returns is real or absent — there is no invented fallback.
 * `store` is null until Apple answers, `testimonials` stays empty until the
 * Supabase table actually has approved rows. Components render their static
 * copy in the meantime, so a slow or failed fetch never shows a broken state.
 */
export default function useCorePlusLive() {
  const [data, setData] = useState({ store: null, testimonials: [] });
  const [state, setState] = useState('loading'); // loading | ready | error

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/coreplus-live', { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((json) => {
        setData({ store: json.store || null, testimonials: json.testimonials || [] });
        setState('ready');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setState('error');
      });

    return () => controller.abort();
  }, []);

  return { ...data, state };
}
