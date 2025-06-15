export interface CurrencyPair {
  from: string;
  to: string;
}

export interface SwapQuote {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  fee: number;
  timestamp: string;
}

export interface FormData {
  fromAmount: string;
  fromCurrency: string;
  toCurrency: string;
  toAmount: string;
}