"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { getDoorBySlug } from "@/data/doors";
import { formatPrice } from "@/lib/utils";
import type { InteriorItem } from "@/data/interiors";

export function Lightbox({ interior, onClose }: { interior: InteriorItem | null; onClose: () => void }) {
  const door = interior ? getDoorBySlug(interior.doorSlug) : undefined;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {interior && door && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-graphite/60 p-4 backdrop-blur-sm md:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 0.9, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="grid max-h-[90vh] w-full max-w-[1080px] grid-cols-1 overflow-y-auto rounded-3xl bg-white shadow-[var(--shadow-xl)] md:grid-cols-[1.3fr_0.7fr]"
          >
            <BeforeAfterSlider interior={interior} className="aspect-[4/3] rounded-none border-0 shadow-none md:aspect-auto md:h-full" />

            <div className="flex flex-col p-7">
              <button onClick={onClose} className="ml-auto text-graphite-faint hover:text-graphite">
                <X size={20} />
              </button>
              <div className="mt-1 font-mono text-[11.5px] uppercase tracking-[0.16em] text-graphite-faint">
                {interior.roomType} · {interior.city}
              </div>
              <h3 className="mt-2 font-display text-[22px] text-graphite">{interior.title}</h3>
              <p className="mt-2 text-[13.5px] text-graphite-soft">{interior.style}</p>

              <div className="mt-6 rounded-2xl border border-line bg-mist p-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite-faint">Установленная модель</div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="font-display text-[16px] text-graphite">{door.name}</div>
                    <div className="mt-0.5 font-mono text-[13px] text-graphite-soft">от {formatPrice(door.basePrice)}</div>
                  </div>
                  <Link
                    href={`/product/${door.slug}`}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-graphite text-white transition-transform hover:scale-105"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              <p className="mt-6 text-[12.5px] leading-relaxed text-graphite-faint">
                Потяните ползунок на фото, чтобы сравнить помещение до и после установки двери.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
