"use client";

import { useEffect, useState } from "react";
import { RoomScene } from "@/components/ui/RoomScene";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox } from "./Lightbox";
import { INTERIORS, type InteriorItem } from "@/data/interiors";

export function GalleryGrid() {
  const [selected, setSelected] = useState<InteriorItem | null>(null);

  useEffect(() => {
    // Syncing from the URL (an external system) on mount — not derivable during render.
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const found = INTERIORS.find((i) => i.id === hash);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (found) setSelected(found);
    }
  }, []);

  function open(item: InteriorItem) {
    setSelected(item);
    window.history.replaceState(null, "", `#${item.id}`);
  }
  function close() {
    setSelected(null);
    window.history.replaceState(null, "", window.location.pathname);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {INTERIORS.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.06}>
            <button onClick={() => open(item)} className="group block w-full text-left">
              <div className="overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-sm)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-lg)]">
                <RoomScene interior={item} className="aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-display text-[15px] text-graphite">{item.title}</div>
                  <div className="mt-0.5 text-[12.5px] text-graphite-faint">
                    {item.roomType} · {item.style}
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox interior={selected} onClose={close} />
    </>
  );
}
