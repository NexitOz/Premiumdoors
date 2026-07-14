import type { FinishOption, GlassOption, HandleOption, SizeOption } from "@/types/door";

export const FINISHES: FinishOption[] = [
  { id: "paint-white", name: "Эмаль белая матовая", family: "paint", hex: "#f4f3ef", priceModifier: 0 },
  { id: "paint-graphite", name: "Эмаль графит матовая", family: "paint", hex: "#2c2e32", priceModifier: 0 },
  { id: "paint-concrete", name: "Эмаль тёплый бетон", family: "paint", hex: "#c9c2b6", priceModifier: 2400 },
  { id: "paint-black", name: "Эмаль чёрная бархат", family: "paint", hex: "#161616", priceModifier: 3200 },
  { id: "veneer-oak", name: "Шпон дуб натуральный", family: "veneer", hex: "#b89468", textureAngle: 8, priceModifier: 8600 },
  { id: "veneer-wenge", name: "Шпон венге", family: "veneer", hex: "#4a3a30", textureAngle: 8, priceModifier: 9400 },
  { id: "eco-ash-grey", name: "Экошпон ясень серый", family: "eco-veneer", hex: "#9a9690", textureAngle: 6, priceModifier: 4100 },
  { id: "eco-cognac", name: "Экошпон коньяк", family: "eco-veneer", hex: "#8a5a3c", textureAngle: 6, priceModifier: 4600 },
  { id: "laminate-pearl", name: "Ламинатин жемчужный", family: "laminate", hex: "#e7e5e1", priceModifier: -1800 },
];

export const GLASS_OPTIONS: GlassOption[] = [
  { id: "none", name: "Без стекла", description: "Глухое полотно", priceModifier: 0 },
  { id: "satin", name: "Сатинато", description: "Матовое пескоструйное стекло", priceModifier: 5200 },
  { id: "reeded", name: "Рифлёное «Fluted»", description: "Вертикальный рифлёный рельеф", priceModifier: 6800 },
  { id: "bronze-mirror", name: "Бронзовое зеркало", description: "Тонированное зеркальное стекло", priceModifier: 9600 },
  { id: "lacquered-black", name: "Лакобель чёрный", description: "Матовое лакированное стекло", priceModifier: 7400 },
];

export const HANDLE_OPTIONS: HandleOption[] = [
  { id: "matte-black", name: "Матовый чёрный", material: "matte-black", priceModifier: 0 },
  { id: "brushed-bronze", name: "Браш-бронза", material: "brushed-bronze", priceModifier: 3400 },
  { id: "brushed-steel", name: "Браш-сталь", material: "brushed-steel", priceModifier: 2100 },
  { id: "chrome", name: "Хром глянец", material: "chrome", priceModifier: 1600 },
  { id: "concealed", name: "Скрытая ручка-паз", material: "concealed", priceModifier: 5200 },
];

export const SIZE_OPTIONS: SizeOption[] = [
  { width: 700, height: 2000, isStandard: true, priceModifier: -2400 },
  { width: 800, height: 2000, isStandard: true, priceModifier: 0 },
  { width: 900, height: 2000, isStandard: true, priceModifier: 1800 },
  { width: 800, height: 2100, isStandard: false, priceModifier: 3200 },
  { width: 900, height: 2300, isStandard: false, priceModifier: 6800 },
];
