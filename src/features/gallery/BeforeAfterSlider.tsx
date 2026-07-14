"use client";

import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { RoomScene } from "@/components/ui/RoomScene";
import type { InteriorItem } from "@/data/interiors";

export function BeforeAfterSlider({ interior, className }: { interior: InteriorItem; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }

  return (
    <div
      ref={containerRef}
      className={`relative touch-none select-none overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-md)] ${className ?? ""}`}
      onPointerDown={(e) => {
        (e.target as Element).setPointerCapture(e.pointerId);
        setDragging(true);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging && updateFromClientX(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      <RoomScene interior={interior} showDoor className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-0 h-full w-full"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <RoomScene interior={interior} showDoor={false} className="h-full w-full" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${position}%` }}>
        <div className="h-full w-[2px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(15,17,20,0.15)]" />
        <div className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[var(--shadow-md)]">
          <MoveHorizontal size={18} className="text-graphite" />
        </div>
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-graphite/80 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
        До
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 font-mono text-[11px] text-graphite backdrop-blur">
        После
      </span>
    </div>
  );
}
