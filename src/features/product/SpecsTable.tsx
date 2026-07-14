import type { DoorModel } from "@/types/door";

const LABELS: Record<keyof DoorModel["specs"], string> = {
  material: "Материал полотна",
  core: "Заполнение / каркас",
  weight: "Вес полотна",
  soundInsulation: "Шумоизоляция",
  warranty: "Гарантия",
  fireResistance: "Огнестойкость",
};

export function SpecsTable({ door }: { door: DoorModel }) {
  const entries = Object.entries(door.specs).filter(([, v]) => v) as [keyof DoorModel["specs"], string][];

  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      {entries.map(([key, value], i) => (
        <div
          key={key}
          className={`flex items-center justify-between gap-4 px-5 py-3.5 text-[14px] ${i % 2 === 0 ? "bg-white" : "bg-mist"}`}
        >
          <span className="text-graphite-soft">{LABELS[key]}</span>
          <span className="text-right font-medium text-graphite">{value}</span>
        </div>
      ))}
    </div>
  );
}
