import { DoorGlyph } from "@/components/ui/DoorGlyph";
import { getDoorBySlug } from "@/data/doors";
import { shade } from "@/lib/color";
import type { InteriorItem } from "@/data/interiors";
import { cn } from "@/lib/utils";

const LIGHT_TINTS: Record<InteriorItem["windowLight"], string> = {
  warm: "rgba(255,214,158,0.35)",
  cool: "rgba(178,205,255,0.28)",
  neutral: "rgba(255,255,255,0.3)",
};

export function RoomScene({
  interior,
  showDoor = true,
  className,
}: {
  interior: InteriorItem;
  showDoor?: boolean;
  className?: string;
}) {
  const door = getDoorBySlug(interior.doorSlug);
  const wall = showDoor ? interior.wallHex : interior.wallHexBefore;
  const floor = showDoor ? interior.floorHex : interior.floorHexBefore;

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: wall }}>
      {/* wall gradient + light */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${shade(wall, 0.06)} 0%, ${wall} 58%, ${wall} 58.4%, ${shade(floor, 0.12)} 58.6%, ${floor} 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 55% at 28% 18%, ${LIGHT_TINTS[interior.windowLight]}, transparent 60%)`,
        }}
      />
      {/* baseboard line */}
      <div className="absolute inset-x-0 top-[58%] h-[0.6%]" style={{ background: shade(floor, 0.3) }} />

      {/* window */}
      <div
        className="absolute left-[7%] top-[10%] h-[30%] w-[22%] rounded-[3px] shadow-[0_10px_24px_rgba(15,17,20,0.14)]"
        style={{ background: "linear-gradient(155deg,#fdfdfe,#dfe6ea)", boxShadow: "inset 0 0 0 6px #fff, inset 0 0 0 7px #d9dce0" }}
      />

      {/* door */}
      {showDoor && door && (
        <div className="absolute bottom-[0.5%] left-1/2 h-[74%] w-[30%] -translate-x-1/2">
          <div
            className="absolute -bottom-[2%] left-1/2 h-[6%] w-[120%] -translate-x-1/2 rounded-full blur-md"
            style={{ background: "radial-gradient(ellipse, rgba(15,17,20,0.28), transparent 70%)" }}
          />
          <DoorGlyph
            hex={door.color.hex}
            system={door.system}
            glass={door.hasGlass}
            className="h-full w-full drop-shadow-[0_14px_18px_rgba(15,17,20,0.22)]"
          />
        </div>
      )}
    </div>
  );
}
