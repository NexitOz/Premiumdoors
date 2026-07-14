"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DoorScene } from "@/components/three/DoorScene";
import { formatPrice } from "@/lib/utils";

const SHOWCASE_MODELS = [
  { name: "Minima Invisible", hex: "#f4f3ef", handle: "concealed" as const, glass: false, price: 68500 },
  { name: "Atelier Duo", hex: "#161616", handle: "brushed-bronze" as const, glass: false, price: 34900 },
  { name: "Vetro Satin", hex: "#2c2e32", handle: "brushed-steel" as const, glass: true, price: 58900 },
  { name: "Monolith Tsarga", hex: "#4a3a30", handle: "matte-black" as const, glass: false, price: 42600 },
];

const ANGLES = [0, 15, 30, 45, 60, 90];

export function Hero3D() {
  const [modelIdx, setModelIdx] = useState(0);
  const [angle, setAngle] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const model = SHOWCASE_MODELS[modelIdx];

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative aspect-[3/4] w-full max-w-[440px]">
        <div
          className="pointer-events-none absolute inset-[-18%] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(163,121,63,0.16), transparent 70%)",
          }}
        />
        <DoorScene
          className="relative h-full w-full cursor-pointer"
          finishHex={model.hex}
          handleMaterial={model.handle}
          glass={model.glass}
          targetOpenDeg={open ? (angle || 45) : 0}
          hovered={hovered}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={() => {
            setOpen((v) => {
              const next = !v;
              if (next && angle === 0) setAngle(45);
              return next;
            });
          }}
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {ANGLES.map((a) => (
          <button
            key={a}
            onClick={() => {
              setAngle(a);
              setOpen(a > 0);
            }}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-[12px] transition-all ${
              open && angle === a
                ? "border-graphite bg-graphite text-mist"
                : "border-line bg-white text-graphite-soft hover:border-graphite-mist"
            }`}
          >
            {a}°
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-2.5">
        {SHOWCASE_MODELS.map((m, i) => (
          <button
            key={m.name}
            onClick={() => setModelIdx(i)}
            aria-label={m.name}
            className={`h-9 w-9 rounded-full border-2 shadow-[var(--shadow-xs)] transition-transform hover:-translate-y-0.5 ${
              i === modelIdx ? "border-accent" : "border-white"
            }`}
            style={{ background: m.hex }}
          />
        ))}
      </div>

      <motion.div
        key={model.name}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center"
      >
        <div className="font-display text-[15px] text-graphite">{model.name}</div>
        <div className="mt-1 font-mono text-[13.5px] text-graphite-soft">от {formatPrice(model.price)}</div>
      </motion.div>
    </div>
  );
}
