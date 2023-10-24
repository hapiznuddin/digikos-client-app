import { create } from "zustand";

// eslint-disable-next-line no-unused-vars
export const useStore = create((set) => ({
  id: null,
  setId: (newId) => set({ id: newId }),
}))

export const useIdOccupantStore = create((set) => ({
  id: null,
  setId: (newId) => set({ id: newId }),
}))

export const useStatusStore = create((set) => ({
  status: null,
  setStatus: (newStatus) => set({ status: newStatus }),
}))