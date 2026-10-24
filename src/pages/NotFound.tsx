import { Link } from 'react-router'

export function NotFound() {
  return (
    <section className="wrap py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-3 text-5xl">That page isn't here</h1>
      <Link to="/" className="btn-primary mt-8">
        Back to the home page
      </Link>
    </section>
  )
}
