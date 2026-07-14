import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span
        className={cn(
          "flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em]",
          dark ? "text-accent-soft" : "text-accent-dim"
        )}
      >
        <span className={cn("h-px w-6", dark ? "bg-accent-soft" : "bg-accent-dim")} />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "text-balance text-[clamp(28px,3.6vw,44px)] leading-[1.12]",
          dark ? "text-mist" : "text-graphite"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-[520px] text-[16px] leading-relaxed",
            dark ? "text-graphite-mist" : "text-graphite-soft"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
