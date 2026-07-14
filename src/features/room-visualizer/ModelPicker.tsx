"use client";

import { DoorGlyph } from "@/components/ui/DoorGlyph";
import { formatPrice, cn } from "@/lib/utils";
import { DOORS } from "@/data/doors";
import type { DoorModel } from "@/types/door";

interface ModelPickerProps {
  selected: DoorModel;
  onSelect: (door: DoorModel) => void;
  finishHex: string;
  onFinishChange: (hex: string) => void;
}

export function ModelPicker({ selected, onSelect, finishHex, onFinishChange }: ModelPickerProps) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-2.5">
        {DOORS.map((door) => (
          <button
            key={door.slug}
            onClick={() => {
              onSelect(door);
              onFinishChange(door.color.hex);
            }}
            title={door.name}
            className={cn(
              "flex aspect-[2/5] items-center justify-center rounded-xl border-2 bg-gradient-to-b from-mist to-mist-2 p-1.5 transition-all hover:-translate-y-0.5",
              selected.slug === door.slug ? "border-graphite shadow-[var(--shadow-sm)]" : "border-line"
            )}
          >
            <DoorGlyph hex={door.color.hex} system={door.system} glass={door.hasGlass} className="h-full w-auto" />
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="font-display text-[15px] text-graphite">{selected.name}</div>
          <div className="mt-0.5 font-mono text-[12.5px] text-graphite-soft">от {formatPrice(selected.basePrice)}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {selected.finishes.map((f) => (
          <button
            key={f.id}
            onClick={() => onFinishChange(f.hex)}
            title={f.name}
            className={cn(
              "h-8 w-8 rounded-full border-2 transition-transform hover:-translate-y-0.5",
              finishHex === f.hex ? "border-accent" : "border-white"
            )}
            style={{ background: f.hex, boxShadow: "var(--shadow-xs)" }}
          />
        ))}
      </div>
    </div>
  );
}
