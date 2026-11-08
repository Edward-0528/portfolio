import type { ReactNode } from 'react'

type Props = {
  index: number
  title: string
  problem: ReactNode
  approach: ReactNode
  result: ReactNode
  media?: ReactNode
  tags?: string[]
  /** Kept for existing call sites; the sticker style uses one look for every page. */
  tone?: string
}

/**
 * One engineering story: what went wrong, what I did, what changed.
 * Problem → approach → result is the order an interviewer asks for it.
 */
export function Story({ index, title, problem, approach, result, media, tags = [] }: Props) {
  return (
    <article
      className={`brut shadow-hard mt-10 grid gap-8 rounded-3xl bg-white p-6 sm:p-9 ${media ? 'md:grid-cols-[1fr_240px] md:gap-12' : ''}`}
    >
      <div>
        <span className="brut inline-flex size-12 items-center justify-center rounded-full bg-pop display text-lg">
          {index}
        </span>
        <h3 className="display mt-4 text-3xl leading-tight sm:text-4xl">{title}</h3>
        <dl className="mt-6 grid gap-5 text-[15px] leading-relaxed sm:grid-cols-[120px_1fr]">
          <dt className="eyebrow pt-1 !text-ink">The problem</dt>
          <dd>{problem}</dd>
          <dt className="eyebrow pt-1 !text-ink">What I did</dt>
          <dd>{approach}</dd>
          <dt className="eyebrow pt-1 !text-ink">Result</dt>
          <dd className="brut rounded-xl bg-sun px-4 py-3 font-semibold">{result}</dd>
        </dl>
        {tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills used">
            {tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
      {media && <div className="mx-auto w-full max-w-[240px]">{media}</div>}
    </article>
  )
}
