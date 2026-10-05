import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ink" | "outline" | "snow";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type LinkProps = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;
type NativeButtonProps = BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  ink: "bg-ink text-snow hover:bg-accent",
  outline: "border border-line-strong text-ink hover:border-ink",
  snow: "bg-snow text-ink hover:bg-accent hover:text-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.9rem]",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

const base =
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium tracking-[-0.005em] whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent cursor-pointer";

/** Renders an <a> when given `href`, a <button> otherwise. */
export default function Button({ variant = "primary", size = "md", className, children, ...rest }: LinkProps | NativeButtonProps) {
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if (isLinkProps(rest)) {
    const isExternal = rest.href.startsWith("http");
    return (
      <a className={classes} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

type RestOf<T> = Omit<T, keyof BaseProps>;

function isLinkProps(rest: RestOf<LinkProps> | RestOf<NativeButtonProps>): rest is RestOf<LinkProps> {
  return typeof rest.href === "string";
}
