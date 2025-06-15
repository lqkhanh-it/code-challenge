import { describe, it, expect, vi } from 'vitest';
import { convertCurrency, getTokenIcon } from '@/utils/convert';
import type { Token } from '@/types/token';

// Mock the config
vi.mock('@/config/env', () => ({
  config: {
    tokenIconsBaseUrl: 'https://example.com/icons',
  },
}));

describe('convert utils', () => {
  const mockTokens: Token[] = [
    { currency: 'USD', date: '2024-03-13', price: 1 },
    { currency: 'EUR', date: '2024-03-13', price: 0.85 },
  ];

  it('converts amount using token prices', () => {
    expect(convertCurrency('100', 'USD', 'EUR', mockTokens)).toBe('117.647059');
  });

  it('handles decimal amounts', () => {
    expect(convertCurrency('100.50', 'USD', 'EUR', mockTokens)).toBe('118.235294');
  });

  it('handles zero amount', () => {
    expect(convertCurrency('0', 'USD', 'EUR', mockTokens)).toBe('0.000000');
  });

  it('handles invalid amount', () => {
    expect(convertCurrency('abc', 'USD', 'EUR', mockTokens)).toBe('');
  });

  it('handles empty amount', () => {
    expect(convertCurrency('', 'USD', 'EUR', mockTokens)).toBe('');
  });

  it('handles missing from currency', () => {
    expect(convertCurrency('100', '', 'EUR', mockTokens)).toBe('');
  });

  it('handles missing to currency', () => {
    expect(convertCurrency('100', 'USD', '', mockTokens)).toBe('');
  });

  it('handles non-existent from currency', () => {
    expect(convertCurrency('100', 'XYZ', 'EUR', mockTokens)).toBe('');
  });

  it('handles non-existent to currency', () => {
    expect(convertCurrency('100', 'USD', 'XYZ', mockTokens)).toBe('');
  });

  it('returns token icon URL', () => {
    const iconUrl = getTokenIcon('usd');
    expect(iconUrl).toBe('https://example.com/icons/usd.svg');
  });
}); 