"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { CatalogFilters } from "./CatalogFilters";
import { ProductCard } from "./ProductCard";
import { filterDoors, type CatalogFilters as Filters } from "@/services/products.service";
import type { DoorCollection, DoorSystem } from "@/types/door";

export function CatalogView() {
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>(() => {
    const collection = searchParams.get("collection") as DoorCollection | null;
    const glass = searchParams.get("glass");
    return {
      collections: collection ? [collection] : undefined,
      hasGlass: glass === "true" ? true : undefined,
      systems: searchParams.get("system") ? [searchParams.get("system") as DoorSystem] : undefined,
      sort: "popular",
    };
  });

  const results = useMemo(() => filterDoors(filters), [filters]);

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <button
        onClick={() => setMobileFiltersOpen(true)}
        className="flex items-center justify-center gap-2 rounded-full border border-line bg-white py-3 font-sans text-[14px] font-semibold text-graphite shadow-[var(--shadow-xs)] lg:hidden"
      >
        <SlidersHorizontal size={16} /> Фильтры и сортировка
      </button>

      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <CatalogFilters filters={filters} onChange={setFilters} resultsCount={results.length} />
        </div>
      </aside>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-graphite/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 0.9, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-y-0 right-0 w-full max-w-[360px] overflow-y-auto bg-mist p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-[16px] text-graphite">Фильтры</span>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-graphite-faint">
                  <X size={20} />
                </button>
              </div>
              <CatalogFilters filters={filters} onChange={setFilters} resultsCount={results.length} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line py-24 text-center">
            <p className="font-display text-[19px] text-graphite">Ничего не найдено</p>
            <p className="mt-2 max-w-[320px] text-[14px] text-graphite-soft">
              Попробуйте изменить фильтры или сбросить цену и коллекцию.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((door, i) => (
              <ProductCard key={door.slug} door={door} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
