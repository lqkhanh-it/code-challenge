export interface Token {
  currency: string;
  date: string;
  price: number;
}

export interface SwapState {
  tokens: Token[];
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  isLoading: boolean;
  error: string | null;
  setTokens: (tokens: Token[]) => void;
  setFromCurrency: (currency: string) => void;
  setToCurrency: (currency: string) => void;
  setFromAmount: (amount: string) => void;
  setToAmount: (amount: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  swapCurrencies: () => void;
} 