export interface Token {
  currency: string;
  date: string;
  price: number;
}
export interface SwapState {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
}
export interface SwapActions {
  setTokens: (tokens: Token[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface SwapStore extends SwapState, SwapActions {}