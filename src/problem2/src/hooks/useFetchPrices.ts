import { useEffect } from 'react';
import type { Token } from '../types/token';
import { useSwapStore } from '../store/useSwapStore';
import { axiosInstance } from '../services/axios';

export const useFetchPrices = () => {
  const { setTokens, setError } = useSwapStore();

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await axiosInstance.get<Token[]>('/prices.json');
        
        // Filter out tokens without prices and remove duplicates keeping latest by date
        const validTokens = data
          .filter((token) => token.price > 0)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .reduce((acc, token) => {
            // If currency doesn't exist in accumulator or current token is newer, add/update it
            const existingToken = acc.find(t => t.currency === token.currency);
            if (!existingToken) {
              acc.push(token);
            }
            return acc;
          }, [] as Token[]);

        setTokens(validTokens);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch token prices';
        setError(errorMessage);
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
  }, [setTokens, setError]);
}; 