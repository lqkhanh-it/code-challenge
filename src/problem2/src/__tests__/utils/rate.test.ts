import { getRate } from '@/utils/rate';
import type { Token } from '@/types/token';

describe('getRate', () => {
  const mockTokens: Token[] = [
    { currency: 'USD', date: '2024-03-13', price: 1 },
    { currency: 'EUR', date: '2024-03-13', price: 0.85 },
    { currency: 'GBP', date: '2024-03-13', price: 0.75 },
  ];

  it('returns correct rate for USD to EUR', () => {
    const rate = getRate({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      tokens: mockTokens,
    });

    expect(rate).toBe('1.176471');
  });

  it('returns correct rate for EUR to GBP', () => {
    const rate = getRate({
      fromCurrency: 'EUR',
      toCurrency: 'GBP',
      tokens: mockTokens,
    });

    expect(rate).toBe('1.133333');
  });

  it('returns null when fromCurrency is not provided', () => {
    const rate = getRate({
      fromCurrency: '',
      toCurrency: 'EUR',
      tokens: mockTokens,
    });

    expect(rate).toBeNull();
  });

  it('returns null when toCurrency is not provided', () => {
    const rate = getRate({
      fromCurrency: 'USD',
      toCurrency: '',
      tokens: mockTokens,
    });

    expect(rate).toBeNull();
  });

  it('returns null when fromCurrency is not found in tokens', () => {
    const rate = getRate({
      fromCurrency: 'JPY',
      toCurrency: 'EUR',
      tokens: mockTokens,
    });

    expect(rate).toBeNull();
  });

  it('returns null when toCurrency is not found in tokens', () => {
    const rate = getRate({
      fromCurrency: 'USD',
      toCurrency: 'JPY',
      tokens: mockTokens,
    });

    expect(rate).toBeNull();
  });

  it('handles zero price values', () => {
    const tokensWithZero: Token[] = [
      { currency: 'USD', date: '2024-03-13', price: 0 },
      { currency: 'EUR', date: '2024-03-13', price: 0.85 },
    ];

    const rate = getRate({
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      tokens: tokensWithZero,
    });

    expect(rate).toBe('0.000000');
  });
}); 