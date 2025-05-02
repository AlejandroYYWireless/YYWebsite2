import { create } from "zustand";

export type MobileNavState = {
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
};

export const useMobileNavStore = create<MobileNavState>((set) => ({
  navOpen: false,
  setNavOpen: (open) => set({ navOpen: open }),
}));
