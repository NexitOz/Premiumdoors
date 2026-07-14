"use client";

import { formatPrice } from "@/lib/utils";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function RangeSlider({ min, max, step = 1000, value, onChange }: RangeSliderProps) {
  const [low, high] = value;
  const pctLow = ((low - min) / (max - min)) * 100;
  const pctHigh = ((high - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between font-mono text-[13px] text-graphite">
        <span>{formatPrice(low)}</span>
        <span>{formatPrice(high)}</span>
      </div>
      <div className="relative h-5">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-mist-3" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-graphite"
          style={{ left: `${pctLow}%`, right: `${100 - pctHigh}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(e) => {
            const next = Math.min(Number(e.target.value), high - step);
            onChange([next, high]);
          }}
          className="pointer-events-none absolute inset-0 w-full bg-transparent"
          style={{ zIndex: low > max - step ? 5 : 3 }}
          aria-label="Минимальная цена"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(e) => {
            const next = Math.max(Number(e.target.value), low + step);
            onChange([low, next]);
          }}
          className="pointer-events-none absolute inset-0 w-full bg-transparent"
          style={{ zIndex: 4 }}
          aria-label="Максимальная цена"
        />
      </div>
    </div>
  );
}
