import { FOOTER } from '@/lib/data'

export default function FooterSection() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-text-primary">{FOOTER.logo}</span>
          <span className="text-text-muted text-sm">&copy; {new Date().getFullYear()} Winzer Design</span>
        </div>

        <a
          href={`mailto:${FOOTER.email}`}
          className="text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
        >
          {FOOTER.email}
        </a>

        <p className="text-text-muted text-sm">{FOOTER.note}</p>
      </div>
    </footer>
  )
}
