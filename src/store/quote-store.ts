"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ConfiguratorSelection } from "@/types/door";

export interface QuoteItem {
  id: string;
  doorSlug: string;
  doorName: string;
  selection: ConfiguratorSelection;
  totalPrice: number;
  thumbnailHex: string;
  addedAt: number;
}

interface QuoteState {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, "id" | "addedAt">) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            { ...item, id: `${item.doorSlug}-${Date.now()}`, addedAt: Date.now() },
          ],
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: "atrium-quote" }
  )
);
