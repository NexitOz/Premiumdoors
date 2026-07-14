"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useCountUp } from "@/hooks/use-count-up";

const STATS = [
  { value: 20, suffix: "+", label: "лет собственного производства" },
  { value: 20000, suffix: "", label: "полотен на складе в наличии", format: true },
  { value: 34, suffix: "", label: "этапа контроля качества" },
  { value: 7, suffix: " лет", label: "гарантии на скрытые системы" },
];

export function ProductionSection() {
  return (
    <section className="relative overflow-hidden bg-obsidian py-24 text-mist">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(circle, #a3793f, transparent 70%)" }}
      />
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] text-accent-soft">
              <span className="h-px w-6 bg-accent-soft" />
              Производство
            </span>
            <h2 className="mt-6 max-w-[440px] text-[clamp(28px,3.4vw,40px)] leading-[1.15] text-mist">
              Мы не перепродаём — мы производим
            </h2>
            <p className="mt-5 max-w-[440px] text-[15.5px] leading-relaxed text-graphite-mist/75">
              Собственные покрасочные цеха, автоматические прессы и контроль каждого полотна на выходе.
              От раскроя до упаковки — на одной площадке.
            </p>
            <Link
              href="/production"
              className="mt-8 inline-flex items-center gap-2 font-sans text-[14.5px] font-semibold text-mist hover:text-accent-soft"
            >
              Как мы производим двери <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {STATS.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatCounter({
  value,
  suffix,
  label,
  format,
}: {
  value: number;
  suffix: string;
  label: string;
  format?: boolean;
}) {
  const { ref, value: current } = useCountUp(value);
  const display = format
    ? Math.floor(current).toLocaleString("ru-RU")
    : Math.floor(current).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 0.9, 0.32, 1] }}
      className="glass-panel-dark rounded-2xl p-6"
    >
      <div className="font-mono text-[34px] font-medium text-mist">
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-[13px] leading-snug text-graphite-mist/70">{label}</div>
    </motion.div>
  );
}
