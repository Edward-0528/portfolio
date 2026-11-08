type Props = {
  src: string
  alt: string
  caption?: string
  className?: string
  /** Store marketing images already include their own device frame. */
  framed?: boolean
}

/** A phone screenshot with a thick sticker outline and hard shadow. */
export function Phone({ src, alt, caption, className = '', framed = true }: Props) {
  return (
    <figure className={`shrink-0 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`brut shadow-hard w-full bg-ink ${framed ? 'rounded-[1.75rem]' : 'rounded-2xl'}`}
      />
      {caption && <figcaption className="mt-3 text-center text-sm font-semibold">{caption}</figcaption>}
    </figure>
  )
}
