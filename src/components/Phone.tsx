type Props = {
  src: string
  alt: string
  caption?: string
  className?: string
  /** Store marketing images already include their own device frame. */
  framed?: boolean
}

/** A phone screenshot, framed so raw captures read as a device. */
export function Phone({ src, alt, caption, className = '', framed = true }: Props) {
  return (
    <figure className={`shrink-0 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={
          framed
            ? 'w-full rounded-[2rem] border-[6px] border-ink bg-ink shadow-[0_24px_60px_-24px_rgb(0_0_0/0.45)]'
            : 'w-full rounded-2xl shadow-[0_24px_60px_-24px_rgb(0_0_0/0.45)]'
        }
      />
      {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  )
}
