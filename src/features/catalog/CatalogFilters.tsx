"use client";

import { Search, X } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { COLLECTIONS } from "@/data/doors";
import { getPriceRange } from "@/services/products.service";
import type { CatalogFilters as Filters } from "@/services/products.service";
import type { DoorSystem } from "@/types/door";
import { cn } from "@/lib/utils";

const SYSTEMS: { id: DoorSystem; label: string }[] = [
  { id: "flush", label: "Скрытые" },
  { id: "classic", label: "Классика" },
  { id: "tsarga", label: "Царговые" },
  { id: "glass", label: "Остеклённые" },
  { id: "milled", label: "Фрезерованные" },
];

const SORTS: { id: NonNullable<Filters["sort"]>; label: string }[] = [
  { id: "popular", label: "Популярные" },
  { id: "new", label: "Новинки" },
  { id: "price-asc", label: "Сначала дешевле" },
  { id: "price-desc", label: "Сначала дороже" },
];

interface CatalogFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  resultsCount: number;
}

export function CatalogFilters({ filters, onChange, resultsCount }: CatalogFiltersProps) {
  const [priceMin, priceMax] = getPriceRange();

  function toggleCollection(id: (typeof COLLECTIONS)[number]["id"]) {
    const current = filters.collections ?? [];
    const next = current.includes(id) ? current.filter((c) => c !== id) : [...current, id];
    onChange({ ...filters, collections: next });
  }

  function toggleSystem(id: DoorSystem) {
    const current = filters.systems ?? [];
    const next = current.includes(id) ? current.filter((s) => s !== id) : [...current, id];
    onChange({ ...filters, systems: next });
  }

  const hasActiveFilters =
    (filters.collections?.length ?? 0) > 0 ||
    (filters.systems?.length ?? 0) > 0 ||
    filters.hasGlass !== undefined ||
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    !!filters.search;

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-sm)] md:p-7">
      <div className="relative mb-6">
        <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-graphite-faint" />
        <input
          value={filters.search ?? ""}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Поиск по названию, цвету, стилю…"
          className="w-full rounded-full border border-line bg-mist py-3 pl-11 pr-4 text-[14px] text-graphite placeholder:text-graphite-faint focus:border-graphite focus:outline-none"
        />
      </div>

      <FilterGroup label="Коллекция">
        <div className="flex flex-wrap gap-2">
          {COLLECTIONS.map((c) => (
            <Pill key={c.id} active={filters.collections?.includes(c.id)} onClick={() => toggleCollection(c.id)}>
              {c.name}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Система открывания / конструкции">
        <div className="flex flex-wrap gap-2">
          {SYSTEMS.map((s) => (
            <Pill key={s.id} active={filters.systems?.includes(s.id)} onClick={() => toggleSystem(s.id)}>
              {s.label}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Остекление">
        <div className="flex gap-2">
          <Pill active={filters.hasGlass === true} onClick={() => onChange({ ...filters, hasGlass: filters.hasGlass === true ? undefined : true })}>
            Со стеклом
          </Pill>
          <Pill active={filters.hasGlass === false} onClick={() => onChange({ ...filters, hasGlass: filters.hasGlass === false ? undefined : false })}>
            Глухое полотно
          </Pill>
        </div>
      </FilterGroup>

      <FilterGroup label="Цена, полотно">
        <RangeSlider
          min={priceMin}
          max={priceMax}
          step={1000}
          value={[filters.priceMin ?? priceMin, filters.priceMax ?? priceMax]}
          onChange={([lo, hi]) => onChange({ ...filters, priceMin: lo, priceMax: hi })}
        />
      </FilterGroup>

      <FilterGroup label="Сортировка" last>
        <div className="flex flex-wrap gap-2">
          {SORTS.map((s) => (
            <Pill key={s.id} active={(filters.sort ?? "popular") === s.id} onClick={() => onChange({ ...filters, sort: s.id })}>
              {s.label}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
        <span className="font-mono text-[13px] text-graphite-faint">{resultsCount} моделей</span>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ sort: filters.sort })}
            className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-graphite-soft hover:text-graphite"
          >
            <X size={14} /> Сбросить
          </button>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, children, last = false }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={cn("mb-6", last && "mb-0")}>
      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-graphite-faint">{label}</div>
      {children}
    </div>
  );
}
