import { FOOTER } from '@/lib/data'
import { SITE } from '@/lib/site'

export default function FooterSection() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-text-muted text-sm">&copy; {new Date().getFullYear()} {SITE.name}</span>

        <a
          href={`mailto:${FOOTER.email}`}
          className="text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
        >
          {FOOTER.email}
        </a>

        <a
          href={FOOTER.x.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group text-text-secondary hover:text-accent transition-colors duration-200 text-sm"
        >
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="size-5 shrink-0 bg-text-secondary transition-colors duration-200 group-hover:bg-accent [mask-image:url('/x-logo.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/x-logo.svg')] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
            />
            <span className="leading-none -translate-y-px">{FOOTER.x.label}</span>
          </div>
        </a>
      </div>
    </footer>
  )
}
