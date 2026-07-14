import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function MapPanel() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-mist to-mist-2 shadow-[var(--shadow-md)] md:aspect-auto md:h-full">
      <svg className="absolute inset-0 h-full w-full opacity-[0.35]" preserveAspectRatio="none">
        <defs>
          <pattern id="map-grid" width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#c7ccd1" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
      </svg>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full border border-accent/30"
          style={{
            width: `${i * 140}px`,
            height: `${i * 140}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-graphite text-white shadow-[var(--shadow-lg)]">
          <MapPin size={20} />
        </div>
        <div className="mt-2 rounded-full bg-white px-3.5 py-1.5 font-mono text-[12px] text-graphite shadow-[var(--shadow-sm)]">
          {siteConfig.address}
        </div>
      </div>
    </div>
  );
}
