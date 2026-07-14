"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowUpRight } from "lucide-react";
import { DOORS } from "@/data/doors";
import { formatPrice } from "@/lib/utils";

const SUGGESTIONS = [
  "скрытая дверь",
  "царговая дверь",
  "дверь со стеклом",
  "под покраску",
  "чёрная дверь",
  "дверь в стиле лофт",
];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return DOORS.filter((d) => {
      const haystack = [d.name, d.shortDescription, d.collection, d.system, ...d.tags]
        .join(" ")
        .toLowerCase();
      return q.split(" ").every((token) => haystack.includes(token));
    }).slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence onExitComplete={() => setQuery("")}>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-graphite/40 backdrop-blur-sm px-4 pt-[12vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 0.9, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[640px] overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-xl)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-6 py-5">
              <Search size={19} className="text-graphite-faint" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Модель, цвет, стиль, коллекция…"
                className="w-full bg-transparent font-sans text-[16px] text-graphite placeholder:text-graphite-faint focus:outline-none"
              />
              <button onClick={onClose} className="text-graphite-faint hover:text-graphite">
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-3">
              {query.trim() === "" && (
                <div className="px-3 py-2">
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-graphite-faint">
                    Популярные запросы
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="rounded-full border border-line bg-mist px-3.5 py-1.5 text-[13px] text-graphite-soft hover:border-graphite hover:text-graphite"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() !== "" && results.length === 0 && (
                <div className="px-3 py-8 text-center text-[14px] text-graphite-faint">
                  Ничего не нашлось. Попробуйте «скрытая», «стекло» или «лофт».
                </div>
              )}

              {results.map((door) => (
                <Link
                  key={door.slug}
                  href={`/product/${door.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-mist"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-10 w-10 shrink-0 rounded-lg border border-line"
                      style={{ background: door.color.hex }}
                    />
                    <div>
                      <div className="font-display text-[14.5px] text-graphite">{door.name}</div>
                      <div className="text-[12.5px] text-graphite-faint">{door.shortDescription}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[13px] text-graphite-soft">
                    {formatPrice(door.basePrice)}
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
