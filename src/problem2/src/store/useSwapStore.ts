import { create } from 'zustand';
import type { SwapState, Token } from '@/types/token';

export const useSwapStore = create<SwapState>((set) => ({
  tokens: [],
  fromCurrency: '',
  toCurrency: '',
  fromAmount: '',
  toAmount: '',
  isLoading: false,
  error: null,

  setTokens: (tokens: Token[]) => set({ tokens }),
  setFromCurrency: (fromCurrency: string) => set({ fromCurrency }),
  setToCurrency: (toCurrency: string) => set({ toCurrency }),
  setFromAmount: (fromAmount: string) => set({ fromAmount }),
  setToAmount: (toAmount: string) => set({ toAmount }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),

  swapCurrencies: () => set((state) => ({
    fromCurrency: state.toCurrency,
    toCurrency: state.fromCurrency,
    fromAmount: state.toAmount,
    toAmount: state.fromAmount,
  })),
})); 