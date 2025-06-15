import { config } from '@/config/env';
import type { Token } from '@/types/token';

export const convertCurrency = (
  amount: string,
  fromCurrency: string,
  toCurrency: string,
  tokens: Token[]
): string => {
  if (!amount || !fromCurrency || !toCurrency) return '';

  const fromToken = tokens.find((t) => t.currency === fromCurrency);
  const toToken = tokens.find((t) => t.currency === toCurrency);

  if (!fromToken || !toToken) return '';

  const fromPrice = fromToken.price;
  const toPrice = toToken.price;

  if (fromPrice === 0) return '';

  const result = (parseFloat(amount) * fromPrice) / toPrice;
  return result.toFixed(6);
}; 

export const getTokenIcon = (currency: string) => {
  return `${config.tokenIconsBaseUrl}/${currency}.svg`;
};