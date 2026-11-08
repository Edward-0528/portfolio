import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { CORE_PLUS, COSMIC, CROSS_MY_WORDS, PERSON, REVIEWS, STACK, TOTAL_TESTS } from '../site'

export function Home() {
  return (
    <>
      <Hero />
      <Shelf />
      <Marquee />
      <CorePlusCard />
      <CosmicCard />
      <CrossMyWordsCard />
      <Reviews />
      <StickerSheet />
      <HowIBuild />
      <SayHi />
    </>
  )
}

/* ---------- small pieces ---------- */

const FILLS = ['bg-mint', 'bg-lilac', 'bg-peach', 'bg-sun', 'bg-white', 'bg-pop']
const TILTS = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1']

function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`brut display absolute -top-5 rounded-xl bg-pop px-3.5 py-1.5 text-sm sm:text-base ${className}`}>
      {children}
    </span>
  )
}

function Feature({ what, tech, tone }: { what: string; tech: string; tone: string }) {
  return (
    <li className="brut flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl bg-white px-4 py-3">
      <span className="mr-auto text-[15px] font-bold">{what}</span>
      <span className={`rounded-full bg-ink px-2.5 py-1 text-xs font-bold ${tone}`}>{tech}</span>
    </li>
  )
}

function SectionTitle({ id, children, aside }: { id: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <h2 id={id} className="display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
      {children} {aside && <span className="font-hand inline-block -rotate-3 text-[0.6em] font-bold">{aside}</span>}
    </h2>
  )
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section className="wrap flex flex-wrap items-end gap-x-10 gap-y-8 pt-8 sm:pt-12">
      <h1 className="display min-w-0 flex-[2_1_560px] text-[clamp(3.5rem,8.6vw,7.75rem)] leading-[0.92] tracking-[-0.03em]">
        I make apps.
        <br />
        <span className="inline-block -rotate-[1.5deg] bg-ink px-3.5 text-sun">Go play with them.</span>
      </h1>
      <div className="flex flex-[1_1_260px] flex-wrap gap-3.5" aria-label="Highlights">
        <div className="brut shadow-hard wiggle rotate-3 rounded-2xl bg-white px-4 py-3">
          <p className="display text-4xl leading-none">{CORE_PLUS.rating}★</p>
          <p className="text-[13px] font-bold">on the App Store</p>
        </div>
        <div className="brut shadow-hard wiggle -rotate-[4deg] rounded-2xl bg-pop px-4 py-3">
          <p className="display text-4xl leading-none">{TOTAL_TESTS}</p>
          <p className="text-[13px] font-bold">automated tests</p>
        </div>
        <div className="brut shadow-hard wiggle -rotate-1 rounded-2xl bg-mint px-4 py-3">
          <p className="display text-4xl leading-none">{CORE_PLUS.releases}</p>
          <p className="text-[13px] font-bold">store releases</p>
        </div>
      </div>
    </section>
  )
}

const SHELF = [
  {
    href: '#coreplus',
    bg: 'bg-mint',
    tilt: '-rotate-2',
    icon: <img src="/img/cp-icon-2026.webp" alt="" className="brut size-14 rounded-2xl" />,
    name: 'Core+',
    kind: 'Fitness · iOS + Android',
    tags: ['React Native', 'Swift', 'Kotlin', 'Supabase'],
    shot: <img src="/img/cp-preview.webp" alt="" className="brut absolute -bottom-28 left-1/2 w-[190px] -translate-x-1/2 rounded-[1.6rem]" />,
  },
  {
    href: '#cosmic',
    bg: 'bg-lilac',
    tilt: 'rotate-[1.5deg] sm:mt-6',
    icon: <img src="/img/cc-icon-2026.webp" alt="" className="brut size-14 rounded-2xl" />,
    name: 'Cosmic Cuties',
    kind: COSMIC.appStore ? 'Puzzle game · iOS + Android' : 'Puzzle game · Android, iOS soon',
    tags: ['Flutter', 'Dart', '500 levels'],
    shot: <img src="/img/cc-store-match.webp" alt="" className="brut absolute -bottom-28 left-1/2 w-[190px] -translate-x-1/2 rounded-[1.6rem]" />,
  },
  {
    href: '#crossmywords',
    bg: 'bg-sky',
    tilt: '-rotate-1',
    icon: <img src="/img/cmw-icon.webp" alt="" className="brut size-14 rounded-2xl" />,
    name: 'Cross My Words',
    kind: 'Word game · iOS, Android soon',
    tags: ['Flutter', 'Flame', 'Firebase'],
    shot: <img src="/img/cmw-find.webp" alt="" className="brut absolute -bottom-28 left-1/2 w-[190px] -translate-x-1/2 rounded-[1.6rem]" />,
  },
]

function Shelf() {
  return (
    <section id="shelf" aria-label="The apps" className="wrap flex flex-wrap items-start gap-7 pt-12">
      {SHELF.map((app) => (
        <a
          key={app.name}
          href={app.href}
          className={`brut shadow-hard-lg wiggle relative h-[440px] min-w-0 flex-[1_1_320px] overflow-hidden rounded-[1.6rem] p-5 ${app.bg} ${app.tilt}`}
        >
          <div className="flex items-center gap-3">
            {app.icon}
            <div>
              <p className="display text-3xl leading-none">{app.name}</p>
              <p className="text-[13px] font-semibold">{app.kind}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {app.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          {app.shot}
          <span className="absolute right-4 bottom-5 rotate-6 rounded-lg bg-ink px-3 py-2 text-[13px] font-bold text-white">
            See it ↓
          </span>
        </a>
      ))}
    </section>
  )
}

const MARQUEE = ['React Native', 'Flutter', 'Flame', 'Swift', 'Kotlin', 'TypeScript', 'Supabase', 'Firebase', 'Claude Code']

function Marquee() {
  const row = MARQUEE.map((t) => `${t.toUpperCase()} ✦ `).join('')
  return (
    <div aria-hidden="true" className="mt-20 -rotate-[1.5deg] overflow-hidden border-y-[3px] border-ink bg-ink py-4 text-sun">
      <div className="marquee display flex w-max text-2xl whitespace-nowrap sm:text-3xl">
        <span className="pr-2">{row}</span>
        <span className="pr-2">{row}</span>
      </div>
    </div>
  )
}

function CorePlusCard() {
  return (
    <section id="coreplus" aria-labelledby="coreplus-title" className="wrap pt-24">
      <div className="brut shadow-hard-lg relative flex flex-wrap gap-11 rounded-[2rem] bg-mint p-6 sm:p-11">
        <Badge className="left-8 -rotate-3">APP #1 · LIVE</Badge>
        <div className="min-w-0 flex-[1_1_380px]">
          <div className="flex items-center gap-4">
            <img src="/img/cp-icon-2026.webp" alt="" className="brut size-[76px] rounded-[1.25rem]" />
            <div>
              <h2 id="coreplus-title" className="display text-5xl leading-[0.95] sm:text-6xl">
                Core+
              </h2>
              <p className="mt-1 text-[15px] font-bold">Pilates &amp; home workouts</p>
            </div>
          </div>
          <p className="mt-5 text-lg leading-relaxed font-medium">
            Workout plans that adapt every week, real exercise demos, streaks, and meals logged from a photo. I'm the only
            engineer, so I own the design, code, data, releases and growth.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            <Feature what="Plans that adapt every week" tech="TypeScript engine" tone="text-mint" />
            <Feature what="Snap a photo, log a meal" tech="Gemini API + proxy" tone="text-mint" />
            <Feature what="Home-screen widget" tech="SwiftUI" tone="text-mint" />
            <Feature what="Syncs with Apple Health + Health Connect" tech="Swift + Kotlin" tone="text-mint" />
            <Feature what="Private by default" tech="Postgres RLS" tone="text-mint" />
          </ul>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <a href={CORE_PLUS.appStore} className="btn-primary">App Store ↗</a>
            <a href={CORE_PLUS.googlePlay} className="btn-ghost">Google Play ↗</a>
            <Link to="/work/core-plus" className="btn-ghost">How I built it →</Link>
          </div>
        </div>
        <div className="relative aspect-[1/1.02] min-w-0 flex-[1_1_440px] self-center" aria-hidden="true">
          <img src="/img/cp-listing-1.webp" alt="" className="brut shadow-hard absolute top-8 left-0 w-[39%] -rotate-[5deg] rounded-3xl" />
          <img src="/img/cp-listing-2.webp" alt="" className="brut shadow-hard absolute top-0 left-[31%] z-10 w-[39%] rotate-2 rounded-3xl" />
          <img src="/img/cp-listing-4.webp" alt="" className="brut shadow-hard absolute top-12 right-0 w-[39%] rotate-6 rounded-3xl" />
          <span className="brut shadow-hard absolute bottom-2 left-[4%] z-20 flex size-[120px] -rotate-[10deg] flex-col items-center justify-center rounded-full bg-white">
            <span className="display text-[34px] leading-none">{CORE_PLUS.rating}★</span>
            <span className="text-[11px] font-bold">{CORE_PLUS.ratings} ratings</span>
          </span>
          <span className="brut shadow-hard display absolute right-[6%] bottom-8 z-20 rotate-[7deg] rounded-2xl bg-sun px-3.5 py-2.5 text-xl">
            {CORE_PLUS.tests} tests
          </span>
        </div>
      </div>
    </section>
  )
}

function CosmicCard() {
  return (
    <section id="cosmic" aria-labelledby="cosmic-title" className="wrap pt-20">
      <div className="brut shadow-hard-lg relative flex flex-wrap-reverse gap-11 rounded-[2rem] bg-lilac p-6 sm:p-11">
        <Badge className="right-8 rotate-3">{COSMIC.appStore ? 'APP #2 · LIVE' : 'APP #2 · LIVE ON ANDROID'}</Badge>
        <div className="flex min-w-0 flex-[1_1_440px] items-start justify-center gap-4" aria-hidden="true">
          <img src="/img/cc-store-match.webp" alt="" className="brut shadow-hard mt-8 w-[31%] -rotate-[4deg] rounded-[1.4rem]" />
          <img src="/img/cc-store-explore.webp" alt="" className="brut shadow-hard w-[33%] rounded-[1.4rem]" />
          <img src="/img/cc-store-cuties.webp" alt="" className="brut shadow-hard mt-12 w-[31%] rotate-[4deg] rounded-[1.4rem]" />
        </div>
        <div className="min-w-0 flex-[1_1_380px]">
          <div className="flex items-center gap-4">
            <img src="/img/cc-icon-2026.webp" alt="" className="brut size-[76px] rounded-[1.25rem]" />
            <div>
              <h2 id="cosmic-title" className="display text-5xl leading-[0.95] sm:text-6xl">
                Cosmic Cuties
              </h2>
              <p className="mt-1 text-[15px] font-bold">Relaxing match-3 puzzles</p>
            </div>
          </div>
          <p className="mt-5 text-lg leading-relaxed font-medium">
            {COSMIC.levels} levels, live events and in-app purchases. From first commit to TestFlight in three weeks.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            <Feature what="A bot that plays like a person to tune levels" tech="Dart" tone="text-lilac" />
            <Feature what="Tests that fail if one tile teleports" tech={`${COSMIC.tests} tests`} tone="text-lilac" />
            <Feature what="Live events without an app update" tech="Server config" tone="text-lilac" />
            <Feature what="Built from 15 written specs" tech="Claude Code" tone="text-lilac" />
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <a href={COSMIC.googlePlay} className="btn-primary">Google Play ↗</a>
            {COSMIC.appStore ? (
              <a href={COSMIC.appStore} className="btn-ghost">App Store ↗</a>
            ) : (
              <span className="brut inline-flex rotate-2 items-center rounded-xl bg-white px-4 py-2.5 text-[15px] font-bold">
                iOS · in App Store review
              </span>
            )}
            <Link to="/work/cosmic-cuties" className="btn-ghost">How I built it →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function CrossMyWordsCard() {
  return (
    <section id="crossmywords" aria-labelledby="crossmywords-title" className="wrap pt-20">
      <div className="brut shadow-hard-lg relative flex flex-wrap gap-11 rounded-[2rem] bg-sky p-6 sm:p-11">
        <Badge className="left-8 -rotate-2">APP #3 · JUST LAUNCHED</Badge>
        <div className="min-w-0 flex-[1_1_380px]">
          <div className="flex items-center gap-4">
            <img src="/img/cmw-icon.webp" alt="" className="brut size-[76px] rounded-[1.25rem]" />
            <div>
              <h2 id="crossmywords-title" className="display text-5xl leading-[0.95] sm:text-6xl">
                Cross My Words
              </h2>
              <p className="mt-1 text-[15px] font-bold">Word search that teaches you words</p>
            </div>
          </div>
          <p className="mt-5 text-lg leading-relaxed font-medium">
            Swipe across the grid to trace hidden words, learn what each one means, and keep your daily streak alive. Live
            on the App Store now, with Android arriving in {CROSS_MY_WORDS.androidLaunch}.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            <Feature what="Trace hidden words in any direction" tech="Flame engine" tone="text-sky" />
            <Feature what="A definition for all 574 words in the game" tech="Flutter + Riverpod" tone="text-sky" />
            <Feature what="Daily challenge and streak reminders" tech="Local notifications" tone="text-sky" />
            <Feature what="Cloud save, Game Center, Sign in with Apple" tech="Firebase" tone="text-sky" />
            <Feature what="Rebuilt the lost source from the shipped app" tech="Decompiled Dart" tone="text-sky" />
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <a href={CROSS_MY_WORDS.appStore} className="btn-primary">App Store ↗</a>
            <span className="brut inline-flex -rotate-2 items-center rounded-xl bg-white px-4 py-2.5 text-[15px] font-bold">
              Android · {CROSS_MY_WORDS.androidLaunch}
            </span>
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_440px] items-start justify-center gap-4 self-center" aria-hidden="true">
          <img src="/img/cmw-find.webp" alt="" loading="lazy" className="brut shadow-hard mt-10 w-[31%] -rotate-[4deg] rounded-[1.4rem]" />
          <img src="/img/cmw-learn.webp" alt="" loading="lazy" className="brut shadow-hard w-[33%] rounded-[1.4rem]" />
          <img src="/img/cmw-streak.webp" alt="" loading="lazy" className="brut shadow-hard mt-14 w-[31%] rotate-[4deg] rounded-[1.4rem]" />
        </div>
      </div>
    </section>
  )
}

const NOTE_FILLS = ['bg-white', 'bg-mint', 'bg-lilac', 'bg-peach']
const NOTE_TILTS = ['rotate-2', '-rotate-2', 'rotate-[1.5deg]', '-rotate-1']

function Reviews() {
  return (
    <section aria-labelledby="reviews" className="wrap pt-28">
      <SectionTitle id="reviews" aside="(real App Store reviews)">
        Fan mail
      </SectionTitle>
      <div className="mt-11 flex flex-wrap items-start gap-6">
        <a
          href={CORE_PLUS.appStore}
          className="brut wiggle flex-[0_0_220px] -rotate-3 rounded-[1.4rem] bg-ink p-6 text-white shadow-[8px_8px_0_var(--color-pop)]"
        >
          <p className="display text-7xl leading-[0.9] text-sun">{CORE_PLUS.rating}</p>
          <p className="mt-1.5 text-xl tracking-[2px] text-sun" aria-label="five stars">★★★★★</p>
          <p className="mt-2 text-sm font-bold">{CORE_PLUS.ratings} ratings · App Store</p>
          <p className="mt-3 text-[13px] font-semibold underline">Read them all ↗</p>
        </a>
        {REVIEWS.map((r, i) => (
          <figure
            key={r.who}
            className={`brut shadow-hard wiggle min-h-[200px] min-w-0 flex-[1_1_220px] rounded-md p-5 ${NOTE_FILLS[i % 4]} ${NOTE_TILTS[i % 4]}`}
          >
            <blockquote className="font-hand text-[34px] leading-none font-bold">“{r.title}”</blockquote>
            <p className="mt-3 text-[15px] leading-normal font-medium">{r.gist}</p>
            <figcaption className="mt-3.5 text-[13px] font-bold">— {r.who}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function StickerSheet() {
  return (
    <section aria-labelledby="stack" className="wrap pt-28">
      <div className="brut shadow-hard-lg rounded-[2rem] bg-white p-6 sm:p-11">
        <h2 id="stack" className="display text-5xl leading-[0.95] sm:text-7xl">
          The sticker sheet
        </h2>
        <p className="mt-3 text-[17px] font-medium">Everything these apps are built with.</p>
        <div className="mt-8 flex flex-wrap gap-7">
          {STACK.map((g) => (
            <div key={g.title} className="min-w-0 flex-[1_1_240px]">
              <h3 className="display text-lg uppercase">{g.title}</h3>
              <ul className="mt-3.5 flex flex-wrap gap-2.5">
                {g.items.map((item, i) => (
                  <li
                    key={item}
                    className={`brut wiggle rounded-full px-3.5 py-2 text-[15px] font-bold shadow-[3px_3px_0_#111] ${FILLS[i % FILLS.length]} ${TILTS[i % TILTS.length]}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const STEPS = [
  { title: 'Look at the data', body: 'One SQL query across 83 accounts changed Core+ more than any hunch.', tilt: '-rotate-[1.5deg]' },
  { title: 'Write the spec', body: 'Goal, rules, tests and what we are not doing, before any code.', tilt: 'rotate-1' },
  { title: 'Pair with AI', body: 'Claude Code drafts, one task per git worktree, one change per commit.', tilt: '-rotate-1' },
  { title: 'Prove it works', body: 'Read every diff, run the full suite, test on a real device.', tilt: 'rotate-2' },
]

function HowIBuild() {
  return (
    <section aria-labelledby="process" className="wrap pt-28">
      <SectionTitle id="process">How the sausage gets made</SectionTitle>
      <ol className="mt-9 flex flex-wrap gap-5">
        {STEPS.map((s, i) => (
          <li key={s.title} className={`brut shadow-hard wiggle min-w-0 flex-[1_1_230px] rounded-[1.4rem] bg-white p-6 ${s.tilt}`}>
            <span className="brut display flex size-[52px] items-center justify-center rounded-full bg-pop text-xl">{i + 1}</span>
            <h3 className="display mt-4 text-[22px] leading-tight">{s.title}</h3>
            <p className="mt-2.5 text-[15px] leading-normal font-medium">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function SayHi() {
  return (
    <section id="hi" aria-labelledby="hi-title" className="wrap pt-28 pb-12">
      <div className="brut flex flex-wrap items-end gap-10 rounded-[2.25rem] bg-ink p-7 text-white shadow-[12px_12px_0_var(--color-pop)] sm:p-14">
        <div className="min-w-0 flex-[2_1_480px]">
          <p className="font-hand inline-block -rotate-2 text-3xl font-bold text-sun">psst, I'm open to work</p>
          <h2 id="hi-title" className="display mt-2.5 text-[clamp(3rem,6vw,5.5rem)] leading-[0.92]">
            Want app #4
            <br />
            to be yours?
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/90">
            Junior or associate engineering roles in React, React Native or full-stack. Orange County, or remote in the
            US. Before code, eight years leading a team of 15+ at T-Mobile.
          </p>
        </div>
        <div className="flex flex-[1_1_260px] flex-col gap-3">
          <a href={`mailto:${PERSON.email}`} className="btn !border-white bg-sun text-ink shadow-[5px_5px_0_#fff]">
            {PERSON.email}
          </a>
          <a href={PERSON.linkedin} className="btn !border-white">LinkedIn ↗</a>
          <a href={PERSON.github} className="btn !border-white">GitHub ↗</a>
          <a href={PERSON.resume} className="btn !border-white" download>Résumé (PDF) ↓</a>
        </div>
      </div>
    </section>
  )
}
