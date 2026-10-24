import { Link } from 'react-router'
import { Phone } from '../components/Phone'
import { Stat } from '../components/Stat'
import { Story } from '../components/Story'
import { CORE_PLUS } from '../site'

const TIMELINE = [
  { when: 'Jul 2025', what: 'First commit: sign-up, social login and a Supabase backend.' },
  { when: 'Aug 2025', what: 'AI meal scanning with Gemini, activity rings and workout tracking.' },
  { when: 'Sep 2025', what: 'First production builds shipped to the App Store and Google Play.' },
  { when: 'Late 2025 – early 2026', what: 'Dozens of releases: Apple Health and Health Connect sync, water tracking, polish.' },
  {
    when: 'Jul 2026',
    what: 'Fitness rebuild: a workout engine, plans that adapt every week, and weigh-ins. I moved my workflow to Claude Code.',
  },
  { when: 'Aug 2026', what: 'Found the analytics gap and instrumented the core loop. Cut bundled art from 41 MB to 7 MB.' },
  { when: 'Sep 2026', what: 'Data-driven first-run change. Test suite grows from zero. iOS home-screen widget.' },
  { when: 'Oct 2026', what: 'Still shipping: over 400 iOS and nearly 380 Android builds to date, with a fresh App Store listing.' },
]

const PRACTICES = [
  {
    title: 'Testing',
    body: '525 automated tests on the logic that matters: workout plans, load progression, streak rules, paywall rules and webhooks. Tests run on synthetic fixtures, never real user records.',
  },
  {
    title: 'Health data and privacy',
    body: 'PostgreSQL Row-Level Security, encrypted on-device storage, biometric lock, and full account deletion. AI keys stay on the server behind a proxy, never in the app.',
  },
  {
    title: 'Native when it matters',
    body: 'A SwiftUI home-screen widget, a Chromecast integration, and a TikTok Business SDK bridge written as Expo modules in Swift and Kotlin. Apple HealthKit and Android Health Connect behind one cross-platform service.',
  },
  {
    title: 'Growth engineering',
    body: 'A/B-tested paywall variants with an exit survey, ad attribution, SQL funnel and retention queries, and a web funnel at coreplusct.com that reuses the app\'s own plan generator.',
  },
]

export function CorePlus() {
  return (
    <>
      <header className="bg-core-950 text-white">
        <div className="wrap pt-12 pb-16 sm:pt-16">
          <Link to="/#work" className="text-sm text-white/60 hover:text-white">
            ← All work
          </Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <img src="/img/cp-icon-2026.webp" alt="" className="size-16 rounded-2xl" />
                <p className="eyebrow !text-core-mint">Case study · Live on iOS and Android</p>
              </div>
              <h1 className="display mt-6 text-5xl leading-[1.05] sm:text-7xl">
                Core+: a workout app I built, shipped, and <em className="text-core-mint">kept fixing</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/75">
                Weekly workout plans built around the days you can train, starting from a five-minute baseline and
                adapting every week, plus photo-based meal tracking. I'm the only engineer, so every decision on this page
                was mine, including the wrong ones I later corrected.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={CORE_PLUS.appStore} className="btn bg-core-mint text-core-950 hover:bg-white">
                  App Store
                </a>
                <a href={CORE_PLUS.googlePlay} className="btn border border-white/25 hover:bg-white/10">
                  Google Play
                </a>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 self-end">
              <Stat dark value={CORE_PLUS.commits} label="commits since July 2025" />
              <Stat dark value={CORE_PLUS.tests} label="automated tests" />
              <Stat dark value={CORE_PLUS.releases} label="store releases" />
              <Stat dark value="5" label="languages" />
            </dl>
          </div>
        </div>

        <div className="rail flex gap-5 overflow-x-auto px-5 pb-14 sm:px-8 lg:justify-center" aria-label="Core+ App Store screenshots">
          {[
            ['cp-listing-1', 'Workouts that fit your day: 15 to 45 minute plans for home or gym, no equipment needed'],
            ['cp-listing-2', 'Every move shown, with real video demos and hands-free cues'],
            ['cp-listing-3', 'Keep your streak alive: the flame turns blue at 30 days and gold at 100'],
            ['cp-listing-4', 'Level up every week, with harder moves unlocked as you progress'],
            ['cp-listing-5', 'A plan that adapts: rate a session too easy or too hard and the next one adjusts'],
          ].map(([file, alt]) => (
            <Phone key={file} src={`/img/${file}.webp`} alt={alt} framed={false} className="w-[200px] sm:w-[220px]" />
          ))}
        </div>
      </header>

      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">My role</p>
          <p className="mt-3 text-lg">Solo founder and engineer: product, design, code, data, releases, marketing.</p>
          <p className="eyebrow mt-8">Stack</p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            React Native (Expo), TypeScript and JavaScript, Supabase (PostgreSQL, Edge Functions), Gemini API, RevenueCat,
            Swift and Kotlin native modules, EAS Build and Submit, Node test runner.
          </p>
        </div>
        <div>
          <p className="eyebrow">How it came to life</p>
          <ol className="mt-5 border-l border-line">
            {TIMELINE.map((t) => (
              <li key={t.when} className="relative pb-6 pl-6 last:pb-0">
                <span className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-accent" aria-hidden="true" />
                <p className="text-sm font-semibold">{t.when}</p>
                <p className="text-[15px] text-muted">{t.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="stories" className="wrap pb-8">
        <p className="eyebrow">Challenges</p>
        <h2 id="stories" className="display mt-3 text-4xl sm:text-5xl">
          What went wrong, and what I did about it
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          These are the problems I'd want to talk through in an interview. Each one came from logs, data or a crash
          report, not a guess.
        </p>

        <Story
          index={1}
          title="The users who weren't actually gone"
          problem={
            <>
              Of my first 40 accounts, 30 showed <strong>zero activity</strong> after onboarding. It looked like
              massive churn.
            </>
          }
          approach={
            <>
              Before changing the product I checked the measurement. Scanning and meal logging emitted no events at
              all, and the scan log had no user ID, so a loyal user and a lost one looked identical. I added user-linked
              events at the telemetry layer, which covered all four scan entry points (and any added later) in one
              place. I also skipped iOS's brief "inactive" app state, which would have inflated iOS opens several times
              over compared with Android.
            </>
          }
          result="Retention became measurable for the first time. Every earlier retention number was a floor, not an estimate, and I wrote that down so nobody would trust it."
          tags={['Analytics design', 'SQL', 'iOS vs Android behavior']}
        />

        <Story
          index={2}
          title="Selling workouts, onboarding into a calorie tracker"
          problem={
            <>
              With real tracking in place, I queried 83 accounts: <strong>67% had logged a meal</strong>, but only{' '}
              <strong>7% had ever started a workout</strong>. We marketed Pilates and workouts, yet one second after
              sign-up the app jumped to the meal scanner.
            </>
          }
          approach={
            <>
              New users were judging Core+ as a calorie tracker, a comparison it loses against free apps, and never saw
              the part worth paying for. I changed first run to open the Train tab. The workout setup flow already knew
              how to start itself; it was simply never reached. I moved the scan tutorial instead of deleting it.
            </>
          }
          result="A one-screen change, decided by data, that puts the paid product in front of every new user."
          media={<Phone src="/img/cp-home.webp" alt="Core+ home screen on Android showing the Train tab" caption="New accounts now land on Train" />}
          tags={['Product thinking', 'Funnel analysis', 'React Native']}
        />

        <Story
          index={3}
          title="AI output you can't trust blindly"
          problem="Meal photos go to a language model, which sometimes returns malformed JSON, times out, or hits a quota."
          approach={
            <>
              All model calls go through a server-side TypeScript proxy, so the API key never ships in the app, with a
              fallback chain that moves to the next model on quota, outage or model-not-found errors. The app validates
              every response, recovers JSON from messy output, and, if the result still isn't trustworthy, shows
              nothing rather than inventing nutrition numbers.
            </>
          }
          result="A feature that fails safely. Wrong calorie numbers would cost more trust than a retry."
          tags={['LLM integration', 'Serverless TypeScript', 'Defensive parsing']}
        />

        <Story
          index={4}
          title="A crash on every Android launch"
          problem="An internal Android test build crashed instantly, every time, with a missing-class error deep inside the camera library."
          approach={
            <>
              Two libraries each brought their own version of Android's CameraX. Gradle picked the newer one, and that
              version had removed an internal class the other library still called. Instead of pinning versions and
              hoping, I checked what each library was actually used for: one was barely used, so I moved its two jobs to
              the other and removed it.
            </>
          }
          result="The crash was gone at the root, and as a bonus iOS lost an unused microphone permission prompt."
          tags={['Native debugging', 'Gradle', 'Dependency management']}
        />

        <Story
          index={5}
          title="An upgrade that quietly broke 23 screens"
          problem="After upgrading to React Native 0.86, the streak celebration lost its background and the workout player's rest overlay fell into the controls."
          approach={
            <>
              React Native 0.86 removed <code className="rounded bg-white px-1">StyleSheet.absoluteFillObject</code>.
              Spreading the missing value silently added nothing, so 23 full-screen layers across 16 files became
              ordinary blocks. I replaced every use and added a test that fails if the removed API ever comes back.
            </>
          }
          result="Fixed everywhere, not just where it was noticed, and guarded so it can't regress."
          media={<Phone src="/img/cp-streak.webp" alt="Core+ seven-day streak celebration screen" caption="The streak screen, restored" />}
          tags={['Framework upgrades', 'Regression tests']}
        />

        <Story
          index={6}
          title="A bug you can't patch from the server"
          problem="One iOS build shipped with the wrong App Store ID compiled into its Update button. The link opened a page that didn't exist."
          approach={
            <>
              I fixed it in the next build, but users still on the broken one couldn't be repaired remotely. The app has
              a server-controlled forced-update wall, and raising it would have trapped those users behind a button
              that goes nowhere. I wrote a release policy: don't raise the minimum build past the broken one until the
              App Store's own auto-update has moved people off it.
            </>
          }
          result="The update wall stays where it's safe for everyone, and the policy lives in the repo so the mistake can't be repeated by accident."
          tags={['Release engineering', 'Risk thinking']}
        />

        <Story
          index={7}
          title="41 MB of artwork"
          problem="The app bundle carried 41.2 MB of PNG art. A single 512×512 badge weighed 458 KB."
          approach={
            <>
              The image sizes were fine; the encoding was wasteful. I measured lossless against lossy WebP (about 35% vs
              84% smaller) and chose lossy because this art has gradients, not flat fills. App icons and splash screens
              stayed PNG, because the platform build tools require it.
            </>
          }
          result="41.2 MB down to 6.8 MB, with no visible change."
          tags={['Performance', 'Measured trade-offs']}
        />
      </section>

      <section className="border-y border-line bg-white/70">
        <div className="wrap py-16">
          <p className="eyebrow">Inside the product</p>
          <h2 className="display mt-3 text-4xl">Plans that respond to the user</h2>
          <p className="mt-4 max-w-2xl text-muted">
            After every workout, users rate it too easy, just right or too hard, and next week's plan changes. Harder
            moves unlock, weights go up, and streaks keep the habit going.
          </p>
          <div className="rail mt-10 flex gap-6 overflow-x-auto pb-4">
            <Phone src="/img/cp-preview.webp" alt="Workout preview with exercise list and warm-up toggle" caption="Workout preview" className="w-[220px]" />
            <Phone src="/img/cp-complete.webp" alt="Workout complete screen asking how the workout felt" caption="Rate it, plan adapts" className="w-[220px]" />
            <Phone src="/img/cp-week1.webp" alt="Week 1 complete summary with next week's sessions" caption="Week 1 complete" className="w-[220px]" />
            <Phone src="/img/cp-week4.webp" alt="Week 4 summary listing unlocked and heavier moves" caption="What got stronger" className="w-[220px]" />
          </div>
        </div>
      </section>

      <section className="wrap py-16">
        <p className="eyebrow">Engineering practices</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {PRACTICES.map((p) => (
            <div key={p.title} className="rounded-2xl border border-line bg-white p-6">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 rounded-3xl bg-core-950 p-8 text-white sm:p-10 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="display text-3xl sm:text-4xl">What I'd do differently</h2>
          <ul className="space-y-4 text-white/80">
            <li>
              <strong className="text-white">Instrument the core loop on day one.</strong> Every retention number
              before August 2026 was a floor I couldn't trust, because half the app emitted nothing.
            </li>
            <li>
              <strong className="text-white">Write tests from the first feature.</strong> The suite started in 2026; the
              bugs it now catches would have been cheaper to catch in 2025.
            </li>
            <li>
              <strong className="text-white">Put the paid value in front of users sooner.</strong> The first-run fix was
              one screen. Once the tracking existed, the answer took a single query.
            </li>
          </ul>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <Link to="/work/cosmic-cuties" className="btn-primary">
            Next: Cosmic Cuties →
          </Link>
          <Link to="/#ai" className="text-sm underline underline-offset-4">
            How I use AI to ship faster
          </Link>
        </div>
      </section>
    </>
  )
}
