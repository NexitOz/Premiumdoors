"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";

const STATS = [
  { value: 34, suffix: "", label: "контрольные точки на каждом полотне" },
  { value: 0.1, suffix: " мм", label: "точность раскроя на ЧПУ", decimals: 1 },
  { value: 100, suffix: "%", label: "полотен проходят выходной контроль" },
  { value: 15, suffix: " лет", label: "средний срок службы скрытых систем" },
];

export function QualityStats() {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
      {STATS.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </div>
  );
}

function Stat({ value, suffix, label, decimals = 0 }: { value: number; suffix: string; label: string; decimals?: number }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-xs)]"
    >
      <div className="font-mono text-[26px] font-medium text-graphite">
        {current.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-1.5 text-[12.5px] leading-snug text-graphite-soft">{label}</div>
    </motion.div>
  );
}
