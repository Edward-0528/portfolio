import type { ReactNode } from 'react'

type Props = {
  index: number
  title: string
  problem: ReactNode
  approach: ReactNode
  result: ReactNode
  media?: ReactNode
  tags?: string[]
  /** Text color for the index and labels. */
  tone?: string
}

/**
 * One engineering story: what went wrong, what I did, what changed.
 * Problem → approach → result is the order an interviewer asks for it.
 */
export function Story({ index, title, problem, approach, result, media, tags = [], tone = 'text-accent' }: Props) {
  return (
    <article className={`grid gap-8 border-t border-line py-12 ${media ? 'md:grid-cols-[1fr_260px] md:gap-14' : ''}`}>
      <div>
        <p className={`font-mono text-sm ${tone}`}>{String(index).padStart(2, '0')}</p>
        <h3 className="display mt-2 text-3xl sm:text-4xl">{title}</h3>
        <dl className="mt-6 grid gap-5 text-[15px] leading-relaxed sm:grid-cols-[110px_1fr]">
          <dt className="eyebrow pt-1">The problem</dt>
          <dd>{problem}</dd>
          <dt className="eyebrow pt-1">What I did</dt>
          <dd>{approach}</dd>
          <dt className="eyebrow pt-1">Result</dt>
          <dd className="font-medium">{result}</dd>
        </dl>
        {tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills used">
            {tags.map((t) => (
              <li key={t} className="rounded-full border border-line bg-white px-3 py-1 text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
      {media && <div className="mx-auto w-full max-w-[260px]">{media}</div>}
    </article>
  )
}
