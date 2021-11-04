import { themeStyle, themeType } from './../utils/themeUtils';
import create from 'zustand';

let savedTheme: keyof typeof themeStyle | null;
if (typeof window !== 'undefined') {
  savedTheme = localStorage.getItem('theme') as keyof typeof themeStyle;
}

export type ResultLink = {
  originalLink: string,
  shortLink: string,
  fullShortLink: string,
}

export type Store = {
  theme: keyof typeof themeStyle
  result: ResultLink | null
  setTheme: Function
  setResult: Function
}

const useStore = create((set) : Store => ({
  theme: savedTheme || themeType.dark,
  result: null,
  setTheme: (newTheme: string) => {
    set({ theme: newTheme });
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  },
  setResult: (newResult: ResultLink) => set({ result: { ...newResult } }),
}));

export default useStore;
