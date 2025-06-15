import type { Token } from '@/types/token';

interface RateCalculationParams {
  fromCurrency: string;
  toCurrency: string;
  tokens: Token[];
}

export const getRate = ({
  fromCurrency,
  toCurrency,
  tokens
}: RateCalculationParams): string | null => {
  if (!fromCurrency || !toCurrency) return null;
  
  const fromToken = tokens.find(token => token.currency === fromCurrency);
  const toToken = tokens.find(token => token.currency === toCurrency);

  if (!fromToken || !toToken) return null;

  if (fromToken.price === 0 || toToken.price === 0) return null;
  
  const rate = fromToken.price / toToken.price;
  return rate.toFixed(6);
}; 