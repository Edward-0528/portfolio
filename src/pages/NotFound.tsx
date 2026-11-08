import { Link } from 'react-router'

export function NotFound() {
  return (
    <section className="wrap py-32 text-center">
      <p className="font-hand text-3xl">404</p>
      <h1 className="display mt-3 text-5xl">That page isn't on the shelf</h1>
      <Link to="/" className="btn-primary mt-8">
        Back to the apps
      </Link>
    </section>
  )
}
