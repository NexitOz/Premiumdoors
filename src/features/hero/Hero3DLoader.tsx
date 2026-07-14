"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-[3/4] w-full max-w-[440px] animate-pulse items-center justify-center rounded-[32px] bg-gradient-to-b from-mist-2 to-mist-3">
      <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-graphite-faint">
        Загрузка 3D…
      </span>
    </div>
  ),
});

export function Hero3DLoader() {
  return <Hero3D />;
}
