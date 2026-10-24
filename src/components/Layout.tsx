import { useEffect, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { PERSON } from '../site'

/** Scroll to the top on a new page, or to the #section in the URL. */
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
}

const YEAR = new Date().getFullYear()

const NAV = [
  { to: '/#work', label: 'Work' },
  { to: '/#ai', label: 'How I work' },
  { to: '/#about', label: 'About' },
]

export function Layout({ children }: { children: ReactNode }) {
  useScrollOnNavigate()

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 btn-primary">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
        <div className="wrap flex h-16 items-center gap-6">
          <Link to="/" className="mr-auto text-[15px] font-semibold tracking-tight">
            Edward Granados
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-6 text-sm text-muted sm:flex">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className="hover:text-ink">
                {n.label}
              </NavLink>
            ))}
          </nav>
          <a href={PERSON.resume} className="btn-primary !py-2" download>
            Résumé
          </a>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer id="contact" className="border-t border-line bg-white/60">
        <div className="wrap grid gap-10 py-16 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">Let's talk</p>
            <p className="display mt-3 text-4xl sm:text-5xl">Hiring for React, React Native or full-stack?</p>
            <p className="mt-4 max-w-xl text-muted">
              I'm looking for a junior or associate software engineering role, on-site or hybrid in Orange County, or
              remote in the US.
            </p>
          </div>
          <ul className="space-y-3 self-end text-[15px]">
            <li>
              <a className="font-semibold underline decoration-line underline-offset-4 hover:decoration-ink" href={`mailto:${PERSON.email}`}>
                {PERSON.email}
              </a>
            </li>
            <li>
              <a className="underline decoration-line underline-offset-4 hover:decoration-ink" href={PERSON.linkedin}>
                LinkedIn
              </a>
            </li>
            <li>
              <a className="underline decoration-line underline-offset-4 hover:decoration-ink" href={PERSON.github}>
                GitHub
              </a>
            </li>
            <li>
              <a className="underline decoration-line underline-offset-4 hover:decoration-ink" href={PERSON.resume} download>
                Download résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
        <div className="wrap flex flex-wrap gap-x-6 gap-y-2 border-t border-line py-6 text-xs text-muted">
          <span>© {YEAR} Edward Granados</span>
          <span>Built with React, TypeScript and Tailwind. Source on GitHub.</span>
          <span className="sm:ml-auto">
            App policies: <Link to="/coreplus" className="underline">Core+</Link> ·{' '}
            <Link to="/cmw/policy" className="underline">Cross My Words</Link> ·{' '}
            <Link to="/wordtrace/policy" className="underline">WordTrace</Link>
          </span>
        </div>
      </footer>
    </>
  )
}
