import type { Token } from '../types/token';
import { axiosInstance } from './axios';

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
  }): Promise<{ success: boolean; transactionId: string }> => {

    await new Promise(resolve => setTimeout(resolve, 2000));
    return { success: true, transactionId: '123' };
    const { data } = await axiosInstance.post<{ success: boolean; transactionId: string }>(
      '/swap',
      params
    );
    return data;
  },
}; 