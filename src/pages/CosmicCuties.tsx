import { Link } from 'react-router'
import { Phone } from '../components/Phone'
import { Stat } from '../components/Stat'
import { Story } from '../components/Story'
import { COSMIC } from '../site'

const SPECS = [
  'Animation feel',
  'UI polish',
  'Combos',
  'Goals and blockers',
  'Level flow',
  'Map progression',
  'Lives and daily rewards',
  'Ad placements',
  'In-app purchase offers',
  'Retention',
  'Blitz mode',
  'Release',
  'Flow and tuning',
  'Sound and haptics',
  'Accounts and cross-device',
]

const SPEC_SECTIONS = [
  ['Goal', 'One paragraph: what the player experiences that they did not before.'],
  ['Design', 'Rules, numbers, state machine. Anything tunable goes in a config, not inline.'],
  ['Tests', 'Unit, timing and screen tests, named before the code exists.'],
  ['Exit criteria', 'Analyzer clean, full suite green, reviewed on a device.'],
  ['Not doing', 'What is out of scope, so neither I nor the AI wanders.'],
]

export function CosmicCuties() {
  return (
    <>
      <header className="bg-cosmic-950 text-white">
        <div className="wrap pt-12 pb-16 sm:pt-16">
          <Link to="/#work" className="text-sm text-white/60 hover:text-white">
            ← All work
          </Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <img src="/img/cc-icon.webp" alt="" className="size-16 rounded-2xl" />
                <p className="eyebrow !text-cosmic-gold">Case study · Beta on TestFlight</p>
              </div>
              <h1 className="display mt-6 text-5xl leading-[1.05] sm:text-7xl">
                Cosmic Cuties: a full game in <em className="text-cosmic-gold">three weeks</em>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/75">
                A relaxing match-3 puzzle game with 500 levels, power-ups, live events and in-app purchases, built in
                Flutter. I built it to prove a process: write a spec, pair with AI, verify everything, and get
                every merged change into testers' hands automatically.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 self-end">
              <Stat dark value="3 weeks" label="first commit to TestFlight beta" />
              <Stat dark value={COSMIC.tests} label="automated tests" />
              <Stat dark value={COSMIC.levels} label="levels, tuned by a bot" />
              <Stat dark value="15" label="feature specs" />
            </dl>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <img
            src="/img/cc-banner.webp"
            alt="Cosmic Cuties banner: a smiling ringed planet and the words 'a very relaxing match-3'"
            className="w-full rounded-3xl"
          />
        </div>
        <div className="rail flex gap-5 overflow-x-auto px-5 py-14 sm:px-8 lg:justify-center" aria-label="Cosmic Cuties screenshots">
          <Phone src="/img/cc-title.webp" alt="Title screen with a Play button" className="w-[190px] sm:w-[210px]" />
          <Phone src="/img/cc-map.webp" alt="Level map winding through space" className="w-[190px] sm:w-[210px]" />
          <Phone src="/img/cc-level.webp" alt="Pre-level screen with goal, star targets and boosters" className="w-[190px] sm:w-[210px]" />
          <Phone src="/img/cc-gameplay.webp" alt="Match-3 board of planets, stars and rockets" className="w-[190px] sm:w-[210px]" />
          <Phone src="/img/cc-shop.webp" alt="Shop with coin packs and the Cosmic Pass" className="w-[190px] sm:w-[210px]" />
        </div>
      </header>

      <section className="wrap grid gap-12 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">My role</p>
          <p className="mt-3 text-lg">Everything: game design, engineering, art pipeline, monetization, release.</p>
          <p className="eyebrow mt-8">Stack</p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Flutter and Dart with the Flame renderer, Supabase (PostgreSQL, remote config, analytics), RevenueCat, AdMob,
            GitHub Actions, Codemagic, and Python tooling on the Gemini image API.
          </p>
        </div>
        <div>
          <p className="eyebrow">How it came to life</p>
          <p className="mt-4 text-[17px] leading-relaxed">
            On day one I had the board simulation, the renderer, the first screens, <strong>and a pipeline that put
            every push to main on TestFlight</strong>. From then on, every feature started as a spec with tests and exit
            criteria, and every merge went through static analysis and the full test suite in CI.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Feature specs">
            {SPECS.map((s, i) => (
              <li key={s} className="rounded-full border border-line bg-white px-3 py-1 text-xs">
                <span className="font-mono text-muted">S{i + 1}</span> {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="cc-stories" className="wrap pb-8">
        <p className="eyebrow">Challenges</p>
        <h2 id="cc-stories" className="display mt-3 text-4xl sm:text-5xl">
          Hard problems in a "simple" game
        </h2>

        <Story
          tone="text-cosmic-800"
          index={1}
          title="Is the board fun? Let a bot decide"
          problem="Match-3 games usually use a large square board. I needed to know whether my smaller board with diagonal matches felt as satisfying, without guessing."
          approach="I wrote a bot that plays like a person, not a perfect solver, and had it play both shapes many times, measuring how often cascades happened. I made board width, height and diagonals compile-time options so the experiment was one flag."
          result="The 6×9 board with diagonals produced more cascades than a 9×9 board, so it stayed. A design argument settled with data."
          media={<Phone src="/img/cc-gameplay.webp" alt="The 6 by 9 game board" caption="The 6×9 board that won" />}
          tags={['Simulation', 'Experiment design', 'Dart']}
        />

        <Story
          tone="text-cosmic-800"
          index={2}
          title="Tuning 500 levels without playing 500 levels"
          problem="Flat difficulty is boring, and a level that's accidentally impossible ends a player's session for good."
          approach={
            <>
              I defined a target win rate for every level: a steady ramp with a breather, a hard level and a super-hard
              level in every group of ten. A tuner adjusts each level's moves and score targets until the bot's win rate
              hits its target, easing the layout only as a last resort. Hard levels get a badge so players know.
            </>
          }
          result={
            <>
              493 of 500 levels land within 10 points of their target, and 78–98% of losses end "so close". Tests fail
              if a change makes any level unwinnable or a walkover.
            </>
          }
          media={<Phone src="/img/cc-map.webp" alt="Level map" caption="Every level on the map has a target win rate" />}
          tags={['Automated tuning', 'Testing', 'Game design']}
        />

        <Story
          tone="text-cosmic-800"
          index={3}
          title="Tiles that teleported"
          problem="After big blasts, tiles sometimes skipped their fall and showed the wrong icons. The game state was right, but the picture was wrong."
          approach={
            <>
              Two causes. The black-hole power-up swallowed every tile instead of only the ones its blast cleared. And a
              Finish button appearing mid-cascade resized the board, which snapped falling tiles to their final cells. I
              fixed both and kept the board a fixed size during play.
            </>
          }
          result="New playback regression tests replay many moves and every power-up across levels. No tile may teleport, and the picture must match the board state when idle."
          tags={['Debugging', 'Rendering', 'Regression tests']}
        />

        <Story
          tone="text-cosmic-800"
          index={4}
          title="Changing the game without an app update"
          problem="Events, daily missions and the weekly race need to change often, and app review takes days."
          approach="Live events run from one JSON config that Supabase serves; players pick up changes the next time they open the app. A publish script checks the config with the game's own parser, refuses anything the game would reject, and saves each published version as a migration so Git keeps the full history."
          result="Safe live operations: a broken config can't reach players, and every change is reviewable."
          tags={['Remote config', 'Validation', 'Supabase']}
        />

        <Story
          tone="text-cosmic-800"
          index={5}
          title="Knowing where players quit"
          problem="Without data, there is no way to tell whether level 37 is fun or the place people give up."
          approach="I built first-party analytics: a write-only events table, batched sends every 30 seconds or 25 events, retries for failed sends, and server-side validation that skips malformed events. Report views show each level's win rate, attempts to win, close losses and quits, plus D1, D3 and D7 retention."
          result="Every tuning decision after beta can be checked against real players, not just the bot."
          tags={['Analytics pipeline', 'SQL views', 'Privacy-minded design']}
        />
      </section>

      <section className="bg-cosmic-950 text-white">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow !text-cosmic-gold">The process</p>
            <h2 className="display mt-3 text-4xl">How a spec keeps AI on track</h2>
            <p className="mt-4 text-white/75">
              77 of the 79 commits were paired with Claude Code. Speed wasn't the hard part; scope was. Every feature
              began with the same short template, and a feature wasn't done until its exit criteria were checked.
            </p>
          </div>
          <dl className="grid gap-4">
            {SPEC_SECTIONS.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <dt className="font-semibold text-cosmic-gold">{k}</dt>
                <dd className="mt-1 text-[15px] text-white/75">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-semibold">Monetization</h3>
            <p className="mt-2 text-[15px] text-muted">
              Real store purchases through RevenueCat, a Cosmic Pass subscription, and rewarded ads that tell the player
              when a video isn't ready instead of failing silently.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-semibold">Art pipeline</h3>
            <p className="mt-2 text-[15px] text-muted">
              About 950 lines of Python that generate art, audio and icons with the Gemini image API, passing reference
              images so every new sheet matches the first one's style.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <h3 className="font-semibold">Delivery</h3>
            <p className="mt-2 text-[15px] text-muted">
              GitHub Actions runs analysis and 840+ tests on every push and pull request. Codemagic signs and ships main
              to TestFlight automatically.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <Link to="/work/core-plus" className="btn-ghost">
            ← Core+ case study
          </Link>
          <Link to="/#contact" className="btn-primary">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  )
}
