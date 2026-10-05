"use client";

import { useEffect } from "react";
import { ERROR_STATE, X_PROFILE } from "@/lib/data";
import Button from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="max-w-2xl font-display text-[clamp(2.2rem,5vw,4rem)]/[1] font-medium tracking-[-0.045em] text-balance">
        {ERROR_STATE.heading}
      </h1>
      <p className="max-w-md text-[1.05rem]/[1.6] text-ink-muted">
        {ERROR_STATE.body}{" "}
        <a href={X_PROFILE.href} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline">
          {X_PROFILE.label}
        </a>
      </p>
      <Button onClick={reset} size="lg">
        {ERROR_STATE.retry}
      </Button>
    </main>
  );
}
