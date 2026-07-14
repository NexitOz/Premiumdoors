"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DoorViewer3D } from "./DoorViewer3D";
import { ConfiguratorPanel } from "./ConfiguratorPanel";
import { SpecsTable } from "./SpecsTable";
import { ReviewsList } from "./ReviewsList";
import { ProductCard } from "@/features/catalog/ProductCard";
import { RoomScene } from "@/components/ui/RoomScene";
import { defaultSelection } from "@/services/pricing.service";
import { useQuoteStore } from "@/store/quote-store";
import { calculatePrice } from "@/services/pricing.service";
import { getRelatedDoors } from "@/data/doors";
import { getInteriorsForDoor } from "@/data/interiors";
import type { DoorModel } from "@/types/door";

const ANGLES = [0, 15, 30, 45, 60, 90];

export function ProductView({ door }: { door: DoorModel }) {
  const [selection, setSelection] = useState(() => defaultSelection(door));
  const [openAngle, setOpenAngle] = useState(45);
  const [isOpen, setIsOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useQuoteStore((s) => s.addItem);

  const related = getRelatedDoors(door);
  const interiors = getInteriorsForDoor(door.slug);

  const finish = door.finishes.find((f) => f.id === selection.finishId) ?? door.finishes[0];
  const handle = door.handleOptions.find((h) => h.id === selection.handleId) ?? door.handleOptions[0];
  const hasGlassSelected = door.hasGlass && selection.glassId !== null && selection.glassId !== "none";

  function handleAddToQuote() {
    addItem({
      doorSlug: door.slug,
      doorName: door.name,
      selection,
      totalPrice: calculatePrice(door, selection),
      thumbnailHex: finish.hex,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  }

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="flex flex-col items-center lg:sticky lg:top-24">
          <DoorViewer3D
            finishHex={finish.hex}
            handleMaterial={handle.material}
            glass={hasGlassSelected}
            openAngle={openAngle}
            isOpen={isOpen}
            onToggleOpen={() => setIsOpen((v) => !v)}
          />
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {ANGLES.map((a) => (
              <button
                key={a}
                onClick={() => {
                  setOpenAngle(a);
                  setIsOpen(a > 0);
                }}
                className={`rounded-full border px-3.5 py-1.5 font-mono text-[12px] transition-all ${
                  isOpen && openAngle === a
                    ? "border-graphite bg-graphite text-mist"
                    : "border-line bg-white text-graphite-soft hover:border-graphite-mist"
                }`}
              >
                {a}°
              </button>
            ))}
          </div>
        </div>

        <ConfiguratorPanel door={door} selection={selection} onChange={setSelection} onAddToQuote={handleAddToQuote} />
      </div>

      {justAdded && (
        <div className="fixed bottom-8 left-1/2 z-[80] -translate-x-1/2 rounded-2xl bg-graphite px-6 py-3.5 font-sans text-[14px] font-semibold text-white shadow-[var(--shadow-xl)]">
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
            <Check size={13} />
          </span>
          «{door.name}» добавлена в заявку
        </div>
      )}

      <div className="mt-24 grid gap-16 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h2 className="font-display text-[24px] text-graphite">О модели</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-graphite-soft">{door.description}</p>
          <div className="mt-8">
            <SpecsTable door={door} />
          </div>
        </div>
        <div className="rounded-3xl border border-line bg-white p-7">
          <h3 className="font-display text-[17px] text-graphite">Что входит в комплект</h3>
          <ul className="mt-4 flex flex-col gap-3 text-[14px] text-graphite-soft">
            {["Полотно двери", "Дверная коробка (короб)", "Наличники с двух сторон", "Комплект петель", "Уплотнитель по периметру", "Ручка выбранного типа"].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check size={15} className="mt-0.5 shrink-0 text-accent" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="mb-6 font-display text-[24px] text-graphite">Отзывы</h2>
        <ReviewsList door={door} />
      </div>

      {interiors.length > 0 && (
        <div className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-[24px] text-graphite">Эта модель в реализованных проектах</h2>
            <Link href="/gallery" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-graphite hover:text-accent-dim">
              Вся галерея <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {interiors.map((item) => (
              <Link key={item.id} href={`/gallery#${item.id}`} className="group block overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-lg)]">
                <RoomScene interior={item} className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="bg-white p-4">
                  <div className="font-display text-[14px] text-graphite">{item.title}</div>
                  <div className="mt-0.5 text-[12px] text-graphite-faint">{item.roomType} · {item.city}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-6 font-display text-[24px] text-graphite">Похожие модели</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((d, i) => (
              <ProductCard key={d.slug} door={d} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
