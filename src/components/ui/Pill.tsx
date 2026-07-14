"use client";

import { cn } from "@/lib/utils";

interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Pill({ className, active, children, ...props }: PillProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-[13.5px] font-semibold transition-all duration-300 ease-[cubic-bezier(.22,.9,.32,1)]",
        active
          ? "border-graphite bg-graphite text-mist shadow-[0_8px_20px_rgba(15,17,20,0.25)]"
          : "border-line bg-gradient-to-br from-white to-mist-2 text-graphite-soft shadow-[var(--shadow-xs)] hover:-translate-y-0.5 hover:text-graphite hover:shadow-[var(--shadow-sm)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
