import { DOORS } from "@/data/doors";
import { isDarkColor } from "@/lib/color";
import type { DoorCollection, DoorModel } from "@/types/door";

export type InteriorStyle = "minimalism" | "classic" | "loft" | "modern-classic";
export type RoomType = "bedroom" | "living" | "kitchen-living" | "study" | "hallway";
export type LightLevel = "bright" | "dim";
export type ColorPreference = "light" | "dark" | "natural";

export interface QuizAnswers {
  style: InteriorStyle;
  room: RoomType;
  light: LightLevel;
  budget: [number, number];
  colorPref: ColorPreference;
}

export interface Recommendation {
  door: DoorModel;
  score: number;
  matchPercent: number;
  reasons: string[];
}

const STYLE_COLLECTIONS: Record<InteriorStyle, DoorCollection[]> = {
  minimalism: ["minima", "concrete"],
  classic: ["atelier"],
  loft: ["monolith", "concrete"],
  "modern-classic": ["atelier", "vetro"],
};

const STYLE_LABELS: Record<InteriorStyle, string> = {
  minimalism: "минимализм",
  classic: "классика",
  loft: "лофт",
  "modern-classic": "современная классика",
};

const ROOM_PREFERS_PRIVACY: RoomType[] = ["bedroom"];
const ROOM_LABELS: Record<RoomType, string> = {
  bedroom: "спальня",
  living: "гостиная",
  "kitchen-living": "кухня-гостиная",
  study: "кабинет",
  hallway: "прихожая",
};

function scoreDoor(door: DoorModel, answers: QuizAnswers): Recommendation {
  let score = 0;
  const reasons: string[] = [];

  const preferredCollections = STYLE_COLLECTIONS[answers.style];
  if (preferredCollections[0] === door.collection) {
    score += 40;
    reasons.push(`Коллекция ${door.collection} — прямое попадание в стиль «${STYLE_LABELS[answers.style]}»`);
  } else if (preferredCollections.includes(door.collection)) {
    score += 24;
    reasons.push(`Хорошо сочетается со стилем «${STYLE_LABELS[answers.style]}»`);
  }

  const privacyRoom = ROOM_PREFERS_PRIVACY.includes(answers.room);
  if (privacyRoom && !door.hasGlass) {
    score += 18;
    reasons.push(`Глухое полотно — подходит для приватного помещения (${ROOM_LABELS[answers.room]})`);
  }
  if (!privacyRoom && answers.room === "kitchen-living" && door.hasGlass) {
    score += 16;
    reasons.push("Остеклённая модель хорошо держит визуальную связь кухни и гостиной");
  }

  if (answers.light === "dim" && door.hasGlass) {
    score += 16;
    reasons.push("Стекло пропускает больше света — актуально при слабом естественном освещении");
  }
  if (answers.light === "bright" && !door.hasGlass && door.system === "flush") {
    score += 8;
    reasons.push("В светлом помещении скрытая система смотрится особенно чисто");
  }

  const [minB, maxB] = answers.budget;
  if (door.basePrice >= minB && door.basePrice <= maxB) {
    score += 26;
    reasons.push("Базовая цена укладывается в указанный бюджет");
  } else if (door.basePrice <= maxB * 1.15) {
    score += 10;
    reasons.push("Цена немного выше бюджета, но близко к границе");
  } else {
    score -= 18;
  }

  const colorMatch = door.finishes.some((f) => {
    if (answers.colorPref === "light") return !isDarkColor(f.hex) && f.family !== "veneer";
    if (answers.colorPref === "dark") return isDarkColor(f.hex);
    return f.family === "veneer" || f.family === "eco-veneer";
  });
  if (colorMatch) {
    score += 14;
    reasons.push(
      answers.colorPref === "light"
        ? "Есть светлые покрытия в палитре модели"
        : answers.colorPref === "dark"
          ? "Есть тёмные, глубокие оттенки в палитре модели"
          : "Доступны натуральные шпонированные покрытия"
    );
  }

  if (door.isBestseller) {
    score += 6;
    reasons.push("Часто выбирают для похожих задач");
  }

  return { door, score, matchPercent: 0, reasons: reasons.slice(0, 4) };
}

export function recommendDoors(answers: QuizAnswers, count = 5): Recommendation[] {
  const scored = DOORS.map((d) => scoreDoor(d, answers)).sort((a, b) => b.score - a.score);
  const top = scored.slice(0, count);
  const maxScore = Math.max(...top.map((r) => r.score), 1);
  return top.map((r) => ({
    ...r,
    matchPercent: Math.round(Math.max(55, Math.min(99, (r.score / maxScore) * 100))),
  }));
}
