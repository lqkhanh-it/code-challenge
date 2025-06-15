import { convertCurrency, getTokenIcon } from '@/utils/convert';
import type { Token } from '@/types/token';

// Mock the config
jest.mock('../config/env', () => ({
  config: {
    tokenIconsBaseUrl: 'https://example.com/icons',
  },
}));

describe('convertCurrency', () => {
  const mockTokens: Token[] = [
    { currency: 'USD', date: '2024-03-13', price: 1 },
    { currency: 'EUR', date: '2024-03-13', price: 0.85 },
    { currency: 'GBP', date: '2024-03-13', price: 0.75 },
  ];

  it('converts USD to EUR correctly', () => {
    const result = convertCurrency('100', 'USD', 'EUR', mockTokens);
    expect(result).toBe('117.647059');
  });

  it('converts EUR to GBP correctly', () => {
    const result = convertCurrency('100', 'EUR', 'GBP', mockTokens);
    expect(result).toBe('113.333333');
  });

  it('returns empty string when amount is not provided', () => {
    const result = convertCurrency('', 'USD', 'EUR', mockTokens);
    expect(result).toBe('');
  });

  it('returns empty string when fromCurrency is not provided', () => {
    const result = convertCurrency('100', '', 'EUR', mockTokens);
    expect(result).toBe('');
  });

  it('returns empty string when toCurrency is not provided', () => {
    const result = convertCurrency('100', 'USD', '', mockTokens);
    expect(result).toBe('');
  });

  it('returns empty string when fromCurrency is not found', () => {
    const result = convertCurrency('100', 'JPY', 'EUR', mockTokens);
    expect(result).toBe('');
  });

  it('returns empty string when toCurrency is not found', () => {
    const result = convertCurrency('100', 'USD', 'JPY', mockTokens);
    expect(result).toBe('');
  });

  it('returns empty string when fromPrice is zero', () => {
    const tokensWithZero: Token[] = [
      { currency: 'USD', date: '2024-03-13', price: 0 },
      { currency: 'EUR', date: '2024-03-13', price: 0.85 },
    ];

    const result = convertCurrency('100', 'USD', 'EUR', tokensWithZero);
    expect(result).toBe('');
  });

  it('handles decimal amounts', () => {
    const result = convertCurrency('100.50', 'USD', 'EUR', mockTokens);
    expect(result).toBe('118.235294');
  });
});

describe('getTokenIcon', () => {
  it('returns correct icon URL for USD', () => {
    const iconUrl = getTokenIcon('USD');
    expect(iconUrl).toBe('https://example.com/icons/USD.svg');
  });

  it('returns correct icon URL for EUR', () => {
    const iconUrl = getTokenIcon('EUR');
    expect(iconUrl).toBe('https://example.com/icons/EUR.svg');
  });

  it('handles lowercase currency codes', () => {
    const iconUrl = getTokenIcon('usd');
    expect(iconUrl).toBe('https://example.com/icons/usd.svg');
  });
}); 