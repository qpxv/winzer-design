import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-bg">
      <p className="text-accent font-medium text-sm">404</p>
      <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-text-primary">
        This page wandered off
      </h1>
      <p className="text-text-secondary max-w-sm">
        The link is broken or the page has moved. Head back to the start.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
      >
        Back to home
      </Link>
    </main>
  )
}
