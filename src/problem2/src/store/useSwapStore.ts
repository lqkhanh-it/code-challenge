import { create } from 'zustand';
import type { Token, SwapStore } from '@/types/token';

export const useSwapStore = create<SwapStore>((set) => ({
  tokens: [],
  isLoading: false,
  error: null,

  setTokens: (tokens: Token[]) => set({ tokens }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
})); 