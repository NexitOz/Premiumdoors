export interface InteriorItem {
  id: string;
  title: string;
  roomType: string;
  style: string;
  city: string;
  doorSlug: string;
  wallHex: string;
  floorHex: string;
  wallHexBefore: string;
  floorHexBefore: string;
  windowLight: "warm" | "cool" | "neutral";
}

export const INTERIORS: InteriorItem[] = [
  {
    id: "loft-01",
    title: "Лофт на Пресне",
    roomType: "Гостиная",
    style: "Индустриальный лофт",
    city: "Москва",
    doorSlug: "monolith-tsarga",
    wallHex: "#e7e2d6",
    floorHex: "#8a7256",
    wallHexBefore: "#efeee9",
    floorHexBefore: "#c9c2b3",
    windowLight: "warm",
  },
  {
    id: "studio-03",
    title: "Студия у парка",
    roomType: "Прихожая",
    style: "Минимализм",
    city: "Санкт-Петербург",
    doorSlug: "minima-invisible",
    wallHex: "#f2f1ee",
    floorHex: "#b7ac98",
    wallHexBefore: "#f6f5f2",
    floorHexBefore: "#d8d2c4",
    windowLight: "neutral",
  },
  {
    id: "penthouse-02",
    title: "Пентхаус на набережной",
    roomType: "Кабинет",
    style: "Современная классика",
    city: "Москва",
    doorSlug: "vetro-noir",
    wallHex: "#dcdfe3",
    floorHex: "#3c3f43",
    wallHexBefore: "#e9ebee",
    floorHexBefore: "#c7cbcf",
    windowLight: "cool",
  },
  {
    id: "classic-01",
    title: "Квартира в сталинке",
    roomType: "Спальня",
    style: "Тёплая классика",
    city: "Москва",
    doorSlug: "atelier-duo",
    wallHex: "#efe6d8",
    floorHex: "#a9865c",
    wallHexBefore: "#f4eee2",
    floorHexBefore: "#d3c3a4",
    windowLight: "warm",
  },
  {
    id: "classic-02",
    title: "Дом за городом",
    roomType: "Кабинет",
    style: "Неоклассика",
    city: "Московская область",
    doorSlug: "atelier-arc",
    wallHex: "#eceae4",
    floorHex: "#8f7a5f",
    wallHexBefore: "#f2f1ec",
    floorHexBefore: "#cdc2ab",
    windowLight: "warm",
  },
  {
    id: "loft-04",
    title: "Апартаменты на заводе",
    roomType: "Кухня-гостиная",
    style: "Лофт",
    city: "Москва",
    doorSlug: "concrete-loft",
    wallHex: "#d9d5cd",
    floorHex: "#5c5750",
    wallHexBefore: "#e6e3dc",
    floorHexBefore: "#a19c92",
    windowLight: "neutral",
  },
];

export function getInteriorsForDoor(slug: string): InteriorItem[] {
  return INTERIORS.filter((i) => i.doorSlug === slug);
}
