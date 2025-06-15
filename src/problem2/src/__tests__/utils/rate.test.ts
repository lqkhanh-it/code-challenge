import { describe, it, expect } from 'vitest';
import { getRate } from '@/utils/rate';
import type { Token } from '@/types/token';

describe('rate utils', () => {
  const mockTokens: Token[] = [
    { currency: 'USD', date: '2024-03-13', price: 1 },
    { currency: 'EUR', date: '2024-03-13', price: 0.85 },
    { currency: 'GBP', date: '2024-03-13', price: 0.75 },
  ];

  it('calculates rate between USD and EUR', () => {
    expect(getRate({ fromCurrency: 'USD', toCurrency: 'EUR', tokens: mockTokens })).toBe('1.176471');
  });

  it('calculates rate between EUR and GBP', () => {
    expect(getRate({ fromCurrency: 'EUR', toCurrency: 'GBP', tokens: mockTokens })).toBe('1.133333');
  });

  it('returns 1 for same currency', () => {
    expect(getRate({ fromCurrency: 'USD', toCurrency: 'USD', tokens: mockTokens })).toBe('1.000000');
  });

  it('returns 0 for non-existent from currency', () => {
    expect(getRate({ fromCurrency: 'XYZ', toCurrency: 'EUR', tokens: mockTokens })).toBe(null);
  });

  it('returns null for non-existent to currency', () => {
    expect(getRate({ fromCurrency: 'USD', toCurrency: 'XYZ', tokens: mockTokens })).toBe(null);
  });

  it('returns null for empty from currency', () => {
    expect(getRate({ fromCurrency: '', toCurrency: 'EUR', tokens: mockTokens })).toBe(null);
  });

  it('returns null for empty to currency', () => {
    expect(getRate({ fromCurrency: 'USD', toCurrency: '', tokens: mockTokens })).toBe(null);
  });

  it('handles zero price in from currency', () => {
    const tokensWithZero: Token[] = [
      { currency: 'USD', date: '2024-03-13', price: 0 },
      { currency: 'EUR', date: '2024-03-13', price: 0.85 },
    ];
    expect(getRate({ fromCurrency: 'USD', toCurrency: 'EUR', tokens: tokensWithZero })).toBe(null);
  });

  it('handles zero price in to currency', () => {
    const tokensWithZero: Token[] = [
      { currency: 'USD', date: '2024-03-13', price: 1 },
      { currency: 'EUR', date: '2024-03-13', price: 0 },
    ];
    expect(getRate({ fromCurrency: 'USD', toCurrency: 'EUR', tokens: tokensWithZero })).toBe(null);
  });
}); 