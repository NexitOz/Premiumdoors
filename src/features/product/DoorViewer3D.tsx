"use client";

import { useRef, useState } from "react";
import { RotateCw } from "lucide-react";
import { DoorScene } from "@/components/three/DoorScene";

interface DoorViewer3DProps {
  finishHex: string;
  handleMaterial: "matte-black" | "brushed-bronze" | "brushed-steel" | "chrome" | "concealed";
  glass: boolean;
  openAngle: number;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function DoorViewer3D({ finishHex, handleMaterial, glass, openAngle, isOpen, onToggleOpen }: DoorViewer3DProps) {
  const [rotation, setRotation] = useState(0);
  const dragState = useRef<{ startX: number; startRotation: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  function onPointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, startRotation: rotation };
    setDragging(true);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragState.current) return;
    const delta = e.clientX - dragState.current.startX;
    setRotation(dragState.current.startRotation + delta * 0.008);
  }
  function onPointerUp() {
    dragState.current = null;
    setDragging(false);
  }

  return (
    <div className="relative">
      <div
        className="relative aspect-[3/4] w-full max-w-[420px] touch-none select-none"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <DoorScene
          className="h-full w-full"
          finishHex={finishHex}
          handleMaterial={handleMaterial}
          glass={glass}
          targetOpenDeg={isOpen ? openAngle : 0}
          hovered={false}
          followCursor={false}
          manualRotationY={rotation}
          onClick={onToggleOpen}
        />
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-graphite-faint">
        <RotateCw size={13} /> Потяните, чтобы повернуть на 360°
      </div>
    </div>
  );
}
