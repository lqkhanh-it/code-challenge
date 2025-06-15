import { describe, it, expect } from 'vitest';
import { formatNumber } from '@/utils/format';

describe('format utils', () => {
  it('formats whole numbers', () => {
    expect(formatNumber('100')).toBe('100');
  });

  it('formats decimal numbers', () => {
    expect(formatNumber('100.50')).toBe('100.5');
  });

  it('formats numbers with trailing zeros', () => {
    expect(formatNumber('100.00')).toBe('100');
  });

  it('formats very small numbers', () => {
    expect(formatNumber('0.000001')).toBe('0.000001');
  });

  it('formats very large numbers', () => {
    expect(formatNumber('1000000')).toBe('1,000,000');
  });

  it('handles invalid input', () => {
    expect(formatNumber('abc')).toBe('0');
  });

  it('handles empty input', () => {
    expect(formatNumber('')).toBe('0');
  });

  it('handles negative numbers', () => {
    expect(formatNumber('-100.50')).toBe('-100.5');
  });

  it('handles undefined input', () => {
    expect(formatNumber(undefined)).toBe('0');
  });

  it('handles null input', () => {
    expect(formatNumber(null)).toBe('0');
  });

  it('respects maximumFractionDigits option', () => {
    expect(formatNumber('1234.5678', { maximumFractionDigits: 2 })).toBe('1,234.57');
  });

  it('respects minimumFractionDigits option', () => {
    expect(formatNumber('1234', { minimumFractionDigits: 2 })).toBe('1,234.00');
  });

  it('formats with compact notation', () => {
    expect(formatNumber('1234567', { compact: true })).toBe('1.23M');
  });
}); 