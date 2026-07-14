import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 font-display text-[17px] font-medium tracking-[0.01em]",
        dark ? "text-mist" : "text-graphite",
        className
      )}
    >
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-[10px] border",
          dark
            ? "border-white/15 bg-gradient-to-br from-white/10 to-white/[0.02]"
            : "border-line bg-gradient-to-br from-white to-mist-2 shadow-[var(--shadow-xs)]"
        )}
      >
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <rect x="1" y="0.75" width="10" height="14.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="8.4" cy="8" r="0.9" fill="currentColor" />
        </svg>
      </span>
      ATRIUM
    </Link>
  );
}
