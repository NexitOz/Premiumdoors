import { DOORS } from "@/data/doors";
import type { DoorCollection, DoorModel, DoorSystem } from "@/types/door";

export interface CatalogFilters {
  collections?: DoorCollection[];
  systems?: DoorSystem[];
  hasGlass?: boolean;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  sort?: "popular" | "price-asc" | "price-desc" | "new";
}

export function filterDoors(filters: CatalogFilters): DoorModel[] {
  let result = [...DOORS];

  if (filters.collections?.length) {
    result = result.filter((d) => filters.collections!.includes(d.collection));
  }
  if (filters.systems?.length) {
    result = result.filter((d) => filters.systems!.includes(d.system));
  }
  if (filters.hasGlass !== undefined) {
    result = result.filter((d) => d.hasGlass === filters.hasGlass);
  }
  if (filters.priceMin !== undefined) {
    result = result.filter((d) => d.basePrice >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined) {
    result = result.filter((d) => d.basePrice <= filters.priceMax!);
  }
  if (filters.search?.trim()) {
    const q = filters.search.trim().toLowerCase();
    result = result.filter((d) =>
      [d.name, d.shortDescription, d.collection, d.system, ...d.tags]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case "price-desc":
      result.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case "new":
      result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
      break;
    default:
      result.sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller));
  }

  return result;
}

export function getPriceRange(): [number, number] {
  const prices = DOORS.map((d) => d.basePrice);
  return [Math.min(...prices), Math.max(...prices)];
}
