/** One figure in a <dl>. The label comes first in the markup (dt before dd) but the number shows on top. */
export function Stat({ value, label, dark = false }: { value: string; label: string; dark?: boolean }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className={`mt-1 text-sm ${dark ? 'text-white/70' : 'text-muted'}`}>{label}</dt>
      <dd className="display text-4xl sm:text-5xl">{value}</dd>
    </div>
  )
}
