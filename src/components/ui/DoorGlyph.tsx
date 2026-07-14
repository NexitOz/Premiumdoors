import { shade, isDarkColor } from "@/lib/color";
import type { DoorSystem } from "@/types/door";

interface DoorGlyphProps {
  hex: string;
  system: DoorSystem;
  glass?: boolean;
  className?: string;
}

export function DoorGlyph({ hex, system, glass = false, className }: DoorGlyphProps) {
  const dark = isDarkColor(hex);
  const edgeLight = shade(hex, 0.32);
  const edgeShadow = shade(hex, -0.22);
  const bevelOut = shade(hex, dark ? 0.14 : -0.12);
  const bevelIn = shade(hex, dark ? 0.22 : 0.18);
  const panel = shade(hex, dark ? 0.04 : -0.035);
  const gid = `dg-${hex.replace("#", "")}-${system}-${glass ? "g" : "s"}`;

  return (
    <svg viewBox="0 0 320 800" className={className} role="img" aria-hidden>
      <defs>
        <linearGradient id={`${gid}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={edgeLight} stopOpacity="0.9" />
          <stop offset="1" stopColor={edgeLight} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${gid}-edgeR`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor={edgeShadow} stopOpacity="0.55" />
          <stop offset="1" stopColor={edgeShadow} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${gid}-bevOut`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bevelOut} />
          <stop offset="1" stopColor={bevelIn} />
        </linearGradient>
        <linearGradient id={`${gid}-glass`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#eef3f5" />
          <stop offset="1" stopColor="#d7dfe4" />
        </linearGradient>
        <radialGradient id={`${gid}-floor`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#0e1013" stopOpacity=".2" />
          <stop offset="1" stopColor="#0e1013" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="800" fill={hex} />
      <rect width="16" height="800" fill={`url(#${gid}-edge)`} />
      <rect x="304" width="16" height="800" fill={`url(#${gid}-edgeR)`} />
      <rect x="1.25" y="1.25" width="317.5" height="797.5" fill="none" stroke={shade(hex, -0.16)} strokeOpacity="0.35" strokeWidth="2.5" />

      {system === "classic" && (
        <g>
          <Panel gid={gid} x={52} y={62} w={216} h={300} bevOut={`url(#${gid}-bevOut)`} inner={panel} />
          <Panel gid={gid} x={52} y={438} w={216} h={300} bevOut={`url(#${gid}-bevOut)`} inner={panel} />
        </g>
      )}

      {system === "tsarga" && (
        <g>
          <line x1="36" y1="0" x2="36" y2="800" stroke={shade(hex, -0.14)} strokeOpacity="0.4" strokeWidth="1.4" />
          <line x1="284" y1="0" x2="284" y2="800" stroke={shade(hex, -0.14)} strokeOpacity="0.4" strokeWidth="1.4" />
          {[192, 396, 592].map((y) => (
            <g key={y}>
              <rect x="36" y={y} width="248" height="10" fill={shade(hex, dark ? 0.2 : -0.18)} opacity="0.55" />
              <rect x="36" y={y} width="248" height="2.6" fill={shade(hex, 0.4)} opacity="0.5" />
            </g>
          ))}
        </g>
      )}

      {system === "milled" && (
        <g>
          {[92, 150, 208].map((x) => (
            <rect key={x} x={x} y="54" width="6" height="692" rx="3" fill={shade(hex, dark ? 0.18 : -0.16)} opacity="0.5" />
          ))}
        </g>
      )}

      {(system === "glass" || glass) && (
        <g>
          <rect x="56" y="56" width="208" height="652" fill={`url(#${gid}-bevOut)`} />
          <rect x="66" y="66" width="188" height="632" fill={`url(#${gid}-glass)`} />
          <polygon points="66,300 254,120 254,205 66,385" fill="#ffffff" opacity="0.28" />
          <polygon points="66,455 254,275 254,310 66,490" fill="#ffffff" opacity="0.18" />
        </g>
      )}

      {system === "flush" && (
        <rect x="286" y="368" width="9" height="132" rx="4.5" fill={shade(hex, dark ? 0.24 : -0.2)} opacity="0.6" />
      )}

      {system !== "flush" && (
        <g>
          <rect x="281" y="392" width="10" height="20" rx="4" fill={dark ? "#e7e9ea" : "#3a3f45"} opacity="0.85" />
          <circle cx="286" cy="404" r="10" fill={dark ? "#e7e9ea" : "#3a3f45"} opacity="0.85" />
        </g>
      )}

      <ellipse cx="160" cy="792" rx="150" ry="14" fill={`url(#${gid}-floor)`} />
    </svg>
  );
}

function Panel({
  gid,
  x,
  y,
  w,
  h,
  bevOut,
  inner,
}: {
  gid: string;
  x: number;
  y: number;
  w: number;
  h: number;
  bevOut: string;
  inner: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={bevOut} />
      <rect x={x + 16} y={y + 16} width={w - 32} height={h - 32} fill={inner} opacity="0.5" />
      <rect x={x + 16} y={y + 16} width={w - 32} height={h - 32} fill="none" stroke="#000" strokeOpacity="0.06" strokeWidth="1.2" />
    </g>
  );
}
