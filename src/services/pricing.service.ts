import type { ConfiguratorSelection, DoorModel } from "@/types/door";

export function calculatePrice(door: DoorModel, selection: ConfiguratorSelection): number {
  const finish = door.finishes.find((f) => f.id === selection.finishId);
  const glass = door.glassOptions.find((g) => g.id === selection.glassId);
  const handle = door.handleOptions.find((h) => h.id === selection.handleId);

  let total = door.basePrice;
  total += finish?.priceModifier ?? 0;
  total += glass?.priceModifier ?? 0;
  total += handle?.priceModifier ?? 0;
  total += selection.size.priceModifier;
  if (selection.opening === "hidden") total += 4200;

  return Math.round(total);
}

export function defaultSelection(door: DoorModel): ConfiguratorSelection {
  return {
    slug: door.slug,
    finishId: door.finishes[0]?.id ?? "",
    glassId: door.hasGlass ? door.glassOptions.find((g) => g.id !== "none")?.id ?? null : null,
    handleId: door.handleOptions[0]?.id ?? "",
    size: door.sizes.find((s) => s.width === 800) ?? door.sizes[0],
    opening: "right",
  };
}
