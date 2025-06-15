import type { Token, SwapState } from '@/types/token';

interface RateCalculationParams {
  fromCurrency: SwapState['fromCurrency'];
  toCurrency: SwapState['toCurrency'];
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
  
  const rate = toToken.price / fromToken.price;
  return rate.toFixed(6);
}; 