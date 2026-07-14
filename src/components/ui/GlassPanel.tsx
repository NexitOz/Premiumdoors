import { cn } from "@/lib/utils";

export function GlassPanel({
  className,
  dark = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { dark?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-3xl",
        dark ? "glass-panel-dark" : "glass-panel",
        "shadow-[var(--shadow-md)]",
        className
      )}
      {...props}
    />
  );
}
