import { Link } from 'react-router'
import { Phone } from '../components/Phone'
import { Stat } from '../components/Stat'
import { CAREBRIDGE, CORE_PLUS, COSMIC, PERSON } from '../site'

export function Home() {
  return (
    <>
      <Hero />
      <AtAGlance />
      <Work />
      <HowIWork />
      <About />
    </>
  )
}

function Hero() {
  return (
    <section className="wrap grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <p className="eyebrow">
          {PERSON.role} · {PERSON.location} · Open to remote
        </p>
        <h1 className="display mt-5 text-5xl leading-[1.02] sm:text-7xl">
          I build software people use, <em className="text-accent">and I ship it.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          I'm Edward. I designed, built and released <strong className="text-ink">Core+</strong>, a React Native health
          app on the App Store and Google Play, and took <strong className="text-ink">Cosmic Cuties</strong>, a Flutter
          game, from first commit to TestFlight in three weeks. I make decisions from data, write the tests, and use AI
          tools to ship faster without lowering the bar.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/work/core-plus" className="btn-primary">
            Read the Core+ story →
          </Link>
          <a href={PERSON.resume} className="btn-ghost" download>
            Download résumé
          </a>
        </div>
        <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a href={PERSON.github} className="underline decoration-line underline-offset-4 hover:decoration-ink">
            GitHub
          </a>
          <a href={PERSON.linkedin} className="underline decoration-line underline-offset-4 hover:decoration-ink">
            LinkedIn
          </a>
          <a href={`mailto:${PERSON.email}`} className="underline decoration-line underline-offset-4 hover:decoration-ink">
            {PERSON.email}
          </a>
        </p>
      </div>

      <div className="relative mx-auto flex w-full max-w-md items-end justify-center gap-4" aria-hidden="true">
        <Phone src="/img/cp-preview.webp" alt="" className="w-[46%] translate-y-6" />
        <Phone src="/img/cc-gameplay.webp" alt="" className="w-[46%] -translate-y-2" />
      </div>
    </section>
  )
}

function AtAGlance() {
  return (
    <section aria-labelledby="glance" className="border-y border-line bg-white/70">
      <div className="wrap grid gap-10 py-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 id="glance" className="eyebrow">
            For recruiters, at a glance
          </h2>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <span className="text-muted">Looking for:</span> Junior / Associate Software Engineer: React, React Native,
              full-stack
            </li>
            <li>
              <span className="text-muted">Where:</span> Orange County on-site or hybrid, or US remote
            </li>
            <li>
              <span className="text-muted">Ships with:</span> React, React Native, TypeScript, PostgreSQL, Node and
              serverless, Swift and Kotlin, C# / ASP.NET Core, Flutter
            </li>
            <li>
              <span className="text-muted">Before software:</span> 8 years leading teams at T-Mobile
            </li>
          </ul>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          <Stat value={CORE_PLUS.commits} label="commits on Core+" />
          <Stat value={CORE_PLUS.tests} label="automated tests on Core+" />
          <Stat value={CORE_PLUS.releases} label="App Store and Play releases" />
          <Stat value={COSMIC.tests} label="tests on Cosmic Cuties" />
        </dl>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="wrap py-20">
      <p className="eyebrow">Selected work</p>
      <h2 id="work-title" className="display mt-3 text-4xl sm:text-5xl">
        Two apps, built end to end
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        Each case study walks through how the project came together: the decisions, what broke, how I found out, and
        what I changed. Every number comes from the real repos.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <ProjectCard
          to="/work/core-plus"
          theme="bg-core-950 text-white"
          icon="/img/cp-icon-2026.webp"
          name="Core+"
          kicker="React Native · iOS and Android · Live on both stores"
          summary="Pilates and home workout plans that adapt every week, with real exercise demos, streaks and photo meal tracking. I'm the only engineer: design, code, data, releases and marketing."
          points={[
            'Found that a "churn" problem was really missing analytics, then fixed the tracking before touching the product',
            'Used real usage data (67% logged a meal, 7% started a workout) to change what new users see first',
            'Native Swift and Kotlin modules, HealthKit and Health Connect, 525 tests',
          ]}
          shots={['/img/cp-week4.webp', '/img/cp-streak.webp', '/img/cp-complete.webp']}
          accent="text-core-mint"
        />
        <ProjectCard
          to="/work/cosmic-cuties"
          theme="bg-cosmic-950 text-white"
          icon="/img/cc-icon.webp"
          name="Cosmic Cuties"
          kicker="Flutter · Match-3 game · Beta on TestFlight"
          summary="A relaxing match-3 puzzle game with 500 levels, live events and in-app purchases. First commit to TestFlight in three weeks."
          points={[
            'Wrote a bot that plays like a person to test board designs and tune 500 levels',
            'Regression tests that replay moves and fail if a single tile teleports',
            'Live events changed from a server config, no app update needed',
          ]}
          shots={['/img/cc-map.webp', '/img/cc-gameplay.webp', '/img/cc-level.webp']}
          accent="text-cosmic-gold"
        />
      </div>

      <a
        href={CAREBRIDGE.repo}
        className="group mt-8 grid items-center gap-6 rounded-3xl border border-line bg-white p-6 transition hover:border-ink/30 sm:grid-cols-[1fr_320px] sm:p-8"
      >
        <div>
          <p className="eyebrow">Also built · Open source</p>
          <h3 className="display mt-2 text-3xl">CareBridge</h3>
          <p className="mt-3 text-muted">
            A healthcare care-coordination app: React and TypeScript on an ASP.NET Core Web API in C#, with SQL Server.
            Designed around protected health information: masked IDs in lists, an audit entry on every record view,
            and IDs-only logging. 43 automated tests.
          </p>
          <p className="mt-4 text-sm font-semibold group-hover:underline">View the code on GitHub →</p>
        </div>
        <img
          src="/img/cb-record.webp"
          alt="CareBridge client record page with visit history and scheduling form"
          loading="lazy"
          className="rounded-xl border border-line"
        />
      </a>
    </section>
  )
}

type CardProps = {
  to: string
  theme: string
  icon: string
  name: string
  kicker: string
  summary: string
  points: string[]
  shots: string[]
  accent: string
}

function ProjectCard({ to, theme, icon, name, kicker, summary, points, shots, accent }: CardProps) {
  return (
    <Link to={to} className={`group flex flex-col overflow-hidden rounded-3xl ${theme} transition hover:-translate-y-1`}>
      <div className="p-7 sm:p-9">
        <div className="flex items-center gap-4">
          <img src={icon} alt="" className="size-14 rounded-2xl" />
          <div>
            <h3 className="display text-4xl">{name}</h3>
            <p className="text-sm text-white/70">{kicker}</p>
          </div>
        </div>
        <p className="mt-6 text-white/85">{summary}</p>
        <ul className="mt-5 space-y-2 text-[15px] text-white/85">
          {points.map((p) => (
            <li key={p} className="flex gap-3">
              <span className={accent} aria-hidden="true">
                ✦
              </span>
              {p}
            </li>
          ))}
        </ul>
        <p className={`mt-6 text-sm font-semibold ${accent} group-hover:underline`}>Read the case study →</p>
      </div>
      <div className="mt-auto flex justify-center gap-3 px-6" aria-hidden="true">
        {shots.map((s, i) => (
          <img
            key={s}
            src={s}
            alt=""
            loading="lazy"
            className={`w-[30%] rounded-t-2xl border-x-4 border-t-4 border-black/60 ${i === 1 ? '' : 'translate-y-6'}`}
          />
        ))}
      </div>
    </Link>
  )
}

const STEPS = [
  {
    title: 'Start from evidence',
    body: 'Before I change the product, I query what users actually do. The biggest change I made to Core+ came from one SQL query across 83 accounts, not from a hunch.',
  },
  {
    title: 'Write the spec first',
    body: 'Each feature starts as a short spec: the goal, the rules, the tests, the exit criteria, and what we are not doing. Cosmic Cuties was built from 15 of them.',
  },
  {
    title: 'Keep sessions small',
    body: 'One task per session, each in its own git worktree, so parallel work never collides. Every commit is one change with a message that says why.',
  },
  {
    title: 'Verify before it merges',
    body: 'Nothing ships on trust. I read every diff, run the full test suite, and check it on a real device. The tests grow with the speed: 525 on Core+, 840+ on Cosmic Cuties.',
  },
]

function HowIWork() {
  return (
    <section id="ai" aria-labelledby="ai-title" className="bg-ink text-paper">
      <div className="wrap py-20">
        <p className="eyebrow !text-white/60">How I work</p>
        <h2 id="ai-title" className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
          AI writes a lot of my first drafts. I decide what gets built, and what's good enough to ship.
        </h2>
        <p className="mt-5 max-w-2xl text-white/70">
          I use Claude Code as a pair programmer every day. The speed is real, but only because the process around it
          keeps quality from slipping:
        </p>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="bg-ink p-7">
              <p className="font-mono text-sm text-core-mint">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/70">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h3 className="text-xl font-semibold">What changed when I moved my workflow to Claude Code</h3>
            <p className="mt-3 text-white/70">
              Core+, the same app and the same developer, before and after July 2026, when I started pairing with AI for
              most changes. I shipped faster, and the codebase went from no automated tests to 525.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
            <Stat dark value="202" label="commits in the first 11 months" />
            <Stat dark value="529" label="commits in the 4 months after" />
            <Stat dark value="49 → 117" label="version releases, same periods" />
            <Stat dark value="77 / 79" label="Cosmic Cuties commits paired with AI" />
            <Stat dark value="0 → 525" label="automated tests on Core+, same periods" />
          </dl>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="wrap grid gap-12 py-20 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="eyebrow">About</p>
        <h2 id="about-title" className="display mt-3 text-4xl sm:text-5xl">
          Eight years running a business before I wrote my first app
        </h2>
      </div>
      <div className="space-y-4 text-[17px] leading-relaxed text-muted">
        <p>
          I've managed a T-Mobile store since 2018: leading a team of 15+, running to weekly targets, enforcing
          customer-privacy rules, and explaining technical problems to people who just want their phone to work. That's
          where I learned to own outcomes and communicate clearly.
        </p>
        <p>
          I taught myself to code through Meta's front-end, back-end and Android certificates, then did the part courses
          can't teach: I shipped. Core+ has real users, so bugs have real consequences. I've traced crashes in test
          builds, shipped fixes to both stores, and written release rules so a bad build can't strand anyone.
        </p>
        <p className="text-ink">
          I want to join a team where I can learn from senior engineers, take on real scope early, and bring the same
          ownership I've brought to my own apps.
        </p>
        <ul className="flex flex-wrap gap-2 pt-2" aria-label="Certifications">
          {[
            'Meta Front-End Developer',
            'Meta Back-End Developer',
            'Meta Android Developer',
            'Google AI Essentials',
            'Google Cloud Generative AI',
          ].map((c) => (
            <li key={c} className="rounded-full border border-line bg-white px-3 py-1 text-xs text-ink">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
