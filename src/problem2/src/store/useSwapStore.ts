import { create } from 'zustand';
import type { Token } from '@/types/token';

interface SwapState {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
  setTokens: (tokens: Token[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSwapStore = create<SwapState>((set) => ({
  tokens: [],
  isLoading: false,
  error: null,

  setTokens: (tokens: Token[]) => set({ tokens }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
})); 