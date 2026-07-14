"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";
import { isDarkColor } from "@/lib/color";
import type { ConfiguratorSelection, DoorModel, OpeningSide } from "@/types/door";
import { calculatePrice } from "@/services/pricing.service";

const OPENING_LABELS: Record<OpeningSide, string> = {
  left: "Левое",
  right: "Правое",
  hidden: "Скрытое",
};

interface ConfiguratorPanelProps {
  door: DoorModel;
  selection: ConfiguratorSelection;
  onChange: (selection: ConfiguratorSelection) => void;
  onAddToQuote: () => void;
}

export function ConfiguratorPanel({ door, selection, onChange, onAddToQuote }: ConfiguratorPanelProps) {
  const price = calculatePrice(door, selection);

  return (
    <div className="rounded-3xl border border-line bg-white p-7 shadow-[var(--shadow-md)]">
      <div className="mb-1 font-mono text-[11.5px] uppercase tracking-[0.16em] text-graphite-faint">
        {door.collection} · {door.system}
      </div>
      <h1 className="font-display text-[28px] leading-tight text-graphite">{door.name}</h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-graphite-soft">{door.shortDescription}</p>

      <Section label="Покрытие и цвет">
        <div className="flex flex-wrap gap-2.5">
          {door.finishes.map((f) => {
            const active = selection.finishId === f.id;
            const dark = isDarkColor(f.hex);
            return (
              <button
                key={f.id}
                onClick={() => onChange({ ...selection, finishId: f.id })}
                title={f.name}
                className={cn(
                  "relative h-11 w-11 rounded-full border-2 shadow-[var(--shadow-xs)] transition-transform hover:-translate-y-0.5",
                  active ? "border-accent" : "border-white"
                )}
                style={{ background: f.hex }}
              >
                {active && <Check size={16} className={cn("absolute inset-0 m-auto", dark ? "text-white" : "text-graphite")} />}
              </button>
            );
          })}
        </div>
        <div className="mt-2 text-[13px] text-graphite-soft">
          {door.finishes.find((f) => f.id === selection.finishId)?.name}
        </div>
      </Section>

      {door.hasGlass && (
        <Section label="Остекление">
          <div className="flex flex-wrap gap-2">
            {door.glassOptions.map((g) => (
              <OptionPill
                key={g.id}
                active={selection.glassId === g.id}
                onClick={() => onChange({ ...selection, glassId: g.id })}
              >
                {g.name}
              </OptionPill>
            ))}
          </div>
        </Section>
      )}

      <Section label="Ручка">
        <div className="flex flex-wrap gap-2">
          {door.handleOptions.map((h) => (
            <OptionPill
              key={h.id}
              active={selection.handleId === h.id}
              onClick={() => onChange({ ...selection, handleId: h.id })}
            >
              {h.name}
            </OptionPill>
          ))}
        </div>
      </Section>

      <Section label="Размер полотна, мм">
        <div className="grid grid-cols-3 gap-2">
          {door.sizes.map((s) => {
            const active = selection.size.width === s.width && selection.size.height === s.height;
            return (
              <button
                key={`${s.width}x${s.height}`}
                onClick={() => onChange({ ...selection, size: s })}
                className={cn(
                  "rounded-xl border py-2.5 font-mono text-[12.5px] transition-colors",
                  active ? "border-graphite bg-graphite text-mist" : "border-line bg-mist text-graphite-soft hover:border-graphite-mist"
                )}
              >
                {s.width}×{s.height}
              </button>
            );
          })}
        </div>
      </Section>

      <Section label="Открывание" last>
        <div className="flex gap-2">
          {(["left", "right", "hidden"] as OpeningSide[]).map((side) => (
            <OptionPill key={side} active={selection.opening === side} onClick={() => onChange({ ...selection, opening: side })}>
              {OPENING_LABELS[side]}
            </OptionPill>
          ))}
        </div>
      </Section>

      <div className="mt-7 flex items-end justify-between border-t border-line pt-6">
        <div>
          <div className="font-mono text-[26px] font-medium text-graphite">{formatPrice(price)}</div>
          <div className="font-sans text-[12px] text-graphite-faint">с учётом короба и наличников</div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <Button onClick={onAddToQuote} size="lg" className="w-full">
          Добавить в заявку
        </Button>
        <Button href="/contacts" variant="light" size="lg" className="w-full">
          Заказать замер
        </Button>
      </div>
    </div>
  );
}

function Section({ label, children, last = false }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={cn("mt-6 border-t border-line pt-6", last && "")}>
      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-graphite-faint">{label}</div>
      {children}
    </div>
  );
}

function OptionPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-[13px] font-semibold transition-all",
        active ? "border-graphite bg-graphite text-mist" : "border-line bg-mist text-graphite-soft hover:border-graphite-mist"
      )}
    >
      {children}
    </button>
  );
}
