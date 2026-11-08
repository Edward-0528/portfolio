import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { PERSON } from '../site'

/** Scroll to the top on a new page, or to the #section in the URL. */
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
}

const PALETTES = {
  yellow: { label: 'Yellow', sun: '#ffe14d', pop: '#ff7ac6' },
  pink: { label: 'Pink', sun: '#ff9ccf', pop: '#ffe14d' },
  sky: { label: 'Sky', sun: '#8fd8ff', pop: '#ffe14d' },
} as const
type PaletteKey = keyof typeof PALETTES
const STORAGE_KEY = 'palette'

/** The visitor's palette choice, remembered in this browser when storage is available. */
function usePalette() {
  const [palette, setPalette] = useState<PaletteKey>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved && saved in PALETTES ? (saved as PaletteKey) : 'yellow'
    } catch {
      return 'yellow'
    }
  })
  const choose = (p: PaletteKey) => {
    setPalette(p)
    try {
      localStorage.setItem(STORAGE_KEY, p)
    } catch {
      // Storage blocked: the choice just won't persist.
    }
  }
  return [palette, choose] as const
}

const YEAR = new Date().getFullYear()

const NAV = [
  { to: '/#shelf', label: 'Apps' },
  { to: '/#reviews', label: 'Reviews' },
  { to: '/#stack', label: 'Stack' },
]

export function Layout({ children }: { children: ReactNode }) {
  useScrollOnNavigate()
  const [palette, choose] = usePalette()
  const theme = { '--color-sun': PALETTES[palette].sun, '--color-pop': PALETTES[palette].pop } as CSSProperties

  return (
    <div style={theme} className="min-h-screen overflow-x-clip bg-sun font-grotesk text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 btn-primary">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 bg-sun/90 backdrop-blur">
        <div className="wrap flex flex-wrap items-center gap-3 py-4">
          <Link to="/" className="display mr-auto text-xl sm:text-2xl">
            EDWARD.APPS
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-3 sm:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="btn-ghost !px-4 !py-2 !text-sm">
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/#hi" className="btn-primary !px-4 !py-2 !text-sm">
            Say hi
          </Link>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="wrap flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 pb-10 text-[13px] font-semibold">
        <span>© {YEAR} {PERSON.name}</span>
        <span>
          App policies: <Link to="/coreplus" className="underline">Core+</Link> ·{' '}
          <Link to="/cmw/policy" className="underline">Cross My Words</Link> ·{' '}
          <Link to="/wordtrace/policy" className="underline">WordTrace</Link>
        </span>
        <fieldset className="flex items-center gap-2 sm:ml-auto">
          <legend className="sr-only">Color theme</legend>
          <span aria-hidden="true">Theme</span>
          {(Object.keys(PALETTES) as PaletteKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => choose(key)}
              aria-label={`${PALETTES[key].label} theme`}
              aria-pressed={palette === key}
              style={{ background: PALETTES[key].sun }}
              className={`size-7 rounded-full border-[3px] border-ink transition ${palette === key ? 'shadow-[3px_3px_0_#111]' : 'opacity-70 hover:opacity-100'}`}
            />
          ))}
        </fieldset>
      </footer>
    </div>
  )
}
