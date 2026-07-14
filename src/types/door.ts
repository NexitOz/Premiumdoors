export type DoorSystem = "classic" | "tsarga" | "flush" | "glass" | "milled";

export type DoorCollection =
  | "minima"
  | "atelier"
  | "monolith"
  | "vetro"
  | "concrete";

export type FinishFamily = "paint" | "veneer" | "eco-veneer" | "laminate";

export interface FinishOption {
  id: string;
  name: string;
  family: FinishFamily;
  hex: string;
  /** subtle texture gradient used on cards/3D material */
  textureAngle?: number;
  priceModifier: number;
}

export interface GlassOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
}

export interface HandleOption {
  id: string;
  name: string;
  material: "matte-black" | "brushed-bronze" | "brushed-steel" | "chrome" | "concealed";
  priceModifier: number;
}

export type OpeningSide = "left" | "right" | "hidden";

export interface SizeOption {
  width: number;
  height: number;
  isStandard: boolean;
  priceModifier: number;
}

export interface DoorReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

export interface DoorModel {
  slug: string;
  name: string;
  collection: DoorCollection;
  system: DoorSystem;
  basePrice: number;
  shortDescription: string;
  description: string;
  tags: string[];
  hasGlass: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  color: {
    hex: string;
    name: string;
  };
  finishes: FinishOption[];
  glassOptions: GlassOption[];
  handleOptions: HandleOption[];
  sizes: SizeOption[];
  specs: {
    material: string;
    core: string;
    weight: string;
    soundInsulation: string;
    warranty: string;
    fireResistance?: string;
  };
  reviews: DoorReview[];
  rating: number;
  reviewsCount: number;
  interiorGalleryIds: string[];
}

export interface ConfiguratorSelection {
  slug: string;
  finishId: string;
  glassId: string | null;
  handleId: string;
  size: SizeOption;
  opening: OpeningSide;
}
