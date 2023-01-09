import create from "zustand";

export const useQuery = create((set) => ({
  query: "",
  setQuery: (/** @type {string} */ query) => set({ query }),
}));
