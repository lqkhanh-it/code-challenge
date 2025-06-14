import type { Token } from '../types/token';
import { axiosInstance } from './axios';

interface SwapResponse {
  success: boolean;
  transactionId: string;
  timestamp: string;
  fromAmount: number;
  toAmount: number;
}

export const currencyApi = {
  // Get token prices
  getPrices: async (): Promise<Token[]> => {
    const { data } = await axiosInstance.get<Token[]>('/prices.json');
    return data;
  },

  // Execute currency swap
  executeSwap: async (params: {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
  }): Promise<SwapResponse> => {
    const { data } = await axiosInstance.post<SwapResponse>('/swap', params);
    return data;
  },
}; 