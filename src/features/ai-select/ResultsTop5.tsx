"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import { DoorGlyph } from "@/components/ui/DoorGlyph";
import { formatPrice } from "@/lib/utils";
import type { Recommendation } from "@/services/ai-recommend.service";

export function ResultsTop5({ results, onRestart }: { results: Recommendation[]; onRestart: () => void }) {
  return (
    <div>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-accent-dim">Результат подбора</span>
          <h2 className="mt-2 font-display text-[28px] text-graphite">ТОП-5 моделей для вашего интерьера</h2>
        </div>
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 font-sans text-[13.5px] font-semibold text-graphite-soft shadow-[var(--shadow-xs)] hover:text-graphite"
        >
          <RotateCcw size={14} /> Пройти заново
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {results.map((r, i) => (
          <motion.div
            key={r.door.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 0.9, 0.32, 1] }}
            className="flex flex-col gap-6 rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-sm)] sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4 sm:w-[280px] sm:shrink-0">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mist font-mono text-[13px] font-semibold text-graphite-soft">
                {i + 1}
              </span>
              <div className="flex h-[140px] w-[80px] items-center justify-center rounded-xl bg-gradient-to-b from-mist to-mist-2">
                <DoorGlyph hex={r.door.color.hex} system={r.door.system} glass={r.door.hasGlass} className="h-full w-auto" />
              </div>
              <div>
                <div className="font-display text-[16.5px] text-graphite">{r.door.name}</div>
                <div className="mt-1 font-mono text-[13px] text-graphite-soft">от {formatPrice(r.door.basePrice)}</div>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.matchPercent}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.08, ease: [0.22, 0.9, 0.32, 1] }}
                    className="h-full rounded-full bg-accent"
                  />
                </div>
                <span className="font-mono text-[13px] font-semibold text-accent-dim">{r.matchPercent}%</span>
              </div>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {r.reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-1.5 text-[13px] leading-snug text-graphite-soft">
                    <Check size={13} className="mt-0.5 shrink-0 text-accent" /> {reason}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={`/product/${r.door.slug}`}
              className="shrink-0 self-start rounded-full bg-graphite px-5 py-2.5 font-sans text-[13.5px] font-semibold text-white transition-transform hover:-translate-y-0.5 sm:self-center"
            >
              Смотреть модель
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
