import { NOT_FOUND } from "@/lib/data";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-5 text-center">
      <Logo />
      <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.4rem,6vw,4.5rem)]/[1] font-medium tracking-[-0.045em] text-balance">
        {NOT_FOUND.heading}
      </h1>
      <p className="max-w-md text-[1.05rem]/[1.6] text-ink-muted">{NOT_FOUND.body}</p>
      <Button href="/" size="lg" className="mt-2">
        {NOT_FOUND.cta}
      </Button>
    </main>
  );
}
