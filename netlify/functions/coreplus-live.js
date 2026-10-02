/**
 * Live Core+ proof data for the portfolio.
 *
 * Two sources, both optional-safe — if either fails the response still returns
 * 200 with that key null, so the UI degrades to its static copy rather than
 * showing an error to a recruiter.
 *
 *   store         → Apple's public iTunes Lookup API (no auth)
 *   testimonials  → the Core+ Supabase `testimonials` table, only when
 *                   COREPLUS_SUPABASE_URL + COREPLUS_SUPABASE_ANON_KEY are set
 *                   in the Netlify environment. Unset = empty list, no error.
 */

const APP_ID = '6752533436';

const getJSON = (url, headers = {}) =>
  fetch(url, { headers: { 'User-Agent': 'edwardgranados.app', Accept: 'application/json', ...headers } })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${r.status} from ${new URL(url).host}`))));

async function fetchStore() {
  const data = await getJSON(`https://itunes.apple.com/lookup?id=${APP_ID}&country=us`);
  const app = data.results && data.results[0];
  if (!app) throw new Error('app not found in lookup');

  return {
    name: app.trackName,
    version: app.version,
    rating: app.averageUserRating ? Number(app.averageUserRating.toFixed(1)) : null,
    ratingCount: app.userRatingCount || 0,
    releasedAt: app.releaseDate,
    updatedAt: app.currentVersionReleaseDate,
    genre: app.primaryGenreName,
    minimumOs: app.minimumOsVersion,
    sizeMb: app.fileSizeBytes ? Math.round(app.fileSizeBytes / 1024 / 1024) : null,
    url: `https://apps.apple.com/us/app/id${APP_ID}`,
  };
}

async function fetchTestimonials() {
  const base = process.env.COREPLUS_SUPABASE_URL;
  const key = process.env.COREPLUS_SUPABASE_ANON_KEY;
  if (!base || !key) return [];

  // Newest first, only rows explicitly approved for public display.
  const url =
    `${base.replace(/\/$/, '')}/rest/v1/testimonials` +
    `?select=id,quote,display_name,rating,created_at` +
    `&approved=eq.true&order=created_at.desc&limit=12`;

  const rows = await getJSON(url, { apikey: key, Authorization: `Bearer ${key}` });

  return (Array.isArray(rows) ? rows : [])
    .filter((r) => r && typeof r.quote === 'string' && r.quote.trim().length > 0)
    .map((r) => ({
      id: r.id,
      quote: r.quote.trim().slice(0, 400),
      name: (r.display_name || '').trim() || 'Core+ member',
      rating: r.rating ?? null,
      date: r.created_at,
    }));
}

exports.handler = async () => {
  const [store, testimonials] = await Promise.allSettled([fetchStore(), fetchTestimonials()]);

  if (store.status === 'rejected') console.error('store lookup failed:', store.reason);
  if (testimonials.status === 'rejected') console.error('testimonials failed:', testimonials.reason);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      // Served from edge cache for an hour; stale copy is fine while revalidating.
      'Cache-Control': 'public, max-age=1800, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      store: store.status === 'fulfilled' ? store.value : null,
      testimonials: testimonials.status === 'fulfilled' ? testimonials.value : [],
      fetchedAt: new Date().toISOString(),
    }),
  };
};
