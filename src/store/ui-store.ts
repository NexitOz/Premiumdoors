"use client";

import { create } from "zustand";

interface UIState {
  isMobileNavOpen: boolean;
  isSearchOpen: boolean;
  isQuoteOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setQuoteOpen: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileNavOpen: false,
  isSearchOpen: false,
  isQuoteOpen: false,
  setMobileNavOpen: (v) => set({ isMobileNavOpen: v }),
  setSearchOpen: (v) => set({ isSearchOpen: v }),
  setQuoteOpen: (v) => set({ isQuoteOpen: v }),
}));
