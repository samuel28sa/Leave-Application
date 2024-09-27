import { create } from "zustand";

export const useUserProfile = create((set) => ({
  profile: null,
  setProfile: (profile) => set((state) => ({ profile })),
}));
