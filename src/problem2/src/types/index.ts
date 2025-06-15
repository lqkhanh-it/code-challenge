export interface SwapResponse {
  success: boolean;
  transactionId: string;
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