import { create } from "zustand";

type DataState = {
  sharedData: any;
  setSharedData: (data: any) => void;
  clearSharedData: () => void;
};

export const useDataStore = create<DataState>((set) => ({
  sharedData: null,
  setSharedData: (data) => set({ sharedData: data }),
  clearSharedData: () => set({ sharedData: null }),
}));
