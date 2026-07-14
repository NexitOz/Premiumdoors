import type { ColorPreference, InteriorStyle, LightLevel, RoomType } from "@/services/ai-recommend.service";

export const STYLE_OPTIONS: { id: InteriorStyle; label: string; hint: string }[] = [
  { id: "minimalism", label: "Минимализм", hint: "чистые плоскости, минимум декора" },
  { id: "classic", label: "Классика", hint: "филёнки, спокойная симметрия" },
  { id: "loft", label: "Лофт", hint: "бетон, металл, индустриальный характер" },
  { id: "modern-classic", label: "Современная классика", hint: "классика без вычурности" },
];

export const ROOM_OPTIONS: { id: RoomType; label: string }[] = [
  { id: "living", label: "Гостиная" },
  { id: "bedroom", label: "Спальня" },
  { id: "kitchen-living", label: "Кухня-гостиная" },
  { id: "study", label: "Кабинет" },
  { id: "hallway", label: "Прихожая" },
];

export const LIGHT_OPTIONS: { id: LightLevel; label: string; hint: string }[] = [
  { id: "bright", label: "Много естественного света", hint: "окна большие, южная/западная сторона" },
  { id: "dim", label: "Света немного", hint: "северная сторона, узкие окна" },
];

export const COLOR_OPTIONS: { id: ColorPreference; label: string }[] = [
  { id: "light", label: "Светлые тона" },
  { id: "dark", label: "Тёмные, глубокие" },
  { id: "natural", label: "Натуральное дерево" },
];

export const BUDGET_OPTIONS: { id: string; label: string; range: [number, number] }[] = [
  { id: "budget", label: "До 40 000 ₽", range: [0, 40000] },
  { id: "mid", label: "40 000 – 60 000 ₽", range: [40000, 60000] },
  { id: "high", label: "60 000 – 90 000 ₽", range: [60000, 90000] },
  { id: "unlimited", label: "Бюджет не ограничен", range: [0, 200000] },
];
