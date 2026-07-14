"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { DoorGlyph } from "@/components/ui/DoorGlyph";
import { formatPrice } from "@/lib/utils";
import type { DoorModel } from "@/types/door";

const SYSTEM_LABELS: Record<DoorModel["system"], string> = {
  classic: "Классика",
  tsarga: "Царговая",
  flush: "Скрытая",
  glass: "Остеклённая",
  milled: "Фрезеровка",
};

export function ProductCard({ door, index = 0 }: { door: DoorModel; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(useTransform(ry, [-0.5, 0.5], [6, -6]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(rx, [-0.5, 0.5], [-6, 6]), { stiffness: 220, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rx.set((e.clientX - rect.left) / rect.width - 0.5);
    ry.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 0.9, 0.32, 1] }}
      style={{ perspective: 1200 }}
    >
      <Link href={`/product/${door.slug}`} className="group block">
        <motion.div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-[var(--shadow-sm)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-lg)]"
        >
          <div className="relative mb-5 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-mist to-mist-2 py-7 shadow-[var(--shadow-inset)]">
            {(door.isNew || door.isBestseller) && (
              <span className="absolute left-3 top-3 z-10 rounded-full bg-graphite px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                {door.isNew ? "новинка" : "хит"}
              </span>
            )}
            <DoorGlyph
              hex={door.color.hex}
              system={door.system}
              glass={door.hasGlass}
              className="h-[220px] w-auto drop-shadow-[0_18px_20px_rgba(15,17,20,0.16)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
            />
          </div>

          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-graphite-faint">
            {SYSTEM_LABELS[door.system]} · {door.hasGlass ? "со стеклом" : "глухое полотно"}
          </span>
          <h3 className="mt-1.5 font-display text-[17px] text-graphite">{door.name}</h3>
          <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-graphite-soft">
            {door.shortDescription}
          </p>

          <div className="mt-2 flex items-center gap-1 text-[12.5px] text-graphite-faint">
            <Star size={12} className="fill-accent text-accent" />
            {door.rating} · {door.reviewsCount} отзывов
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-line pt-4 mt-4">
            <div>
              <div className="font-mono text-[16.5px] font-medium text-graphite">
                {formatPrice(door.basePrice)}
              </div>
              <div className="font-sans text-[11px] font-medium text-graphite-faint">полотно, от</div>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-graphite text-white shadow-[0_6px_14px_rgba(15,17,20,0.24)] transition-transform group-hover:scale-105">
              <ArrowUpRight size={17} />
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
