import { create } from 'zustand';

type State = {
  rowStyles: string[][];
  setRowStyles: (rowIndex: number, styles: string[]) => void;
};

export const useRowStylesStore = create<State>()((set) => ({
  rowStyles: [],
  setRowStyles: (rowIndex, styles) => set((state) => {
    const newStyles = [...state.rowStyles];
    newStyles[rowIndex] = styles;
    return { rowStyles: newStyles };
  }),
}));