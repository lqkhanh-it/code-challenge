import { formatNumber } from '@/utils/format';

describe('formatNumber', () => {
  it('formats number with default options', () => {
    expect(formatNumber(1234.5678)).toBe('1,234.5678');
  });

  it('handles undefined input', () => {
    expect(formatNumber(undefined)).toBe('0');
  });

  it('handles null input', () => {
    expect(formatNumber(null)).toBe('0');
  });

  it('handles string input', () => {
    expect(formatNumber('1234.5678')).toBe('1,234.5678');
  });

  it('handles invalid string input', () => {
    expect(formatNumber('abc')).toBe('0');
  });

  it('respects maximumFractionDigits option', () => {
    expect(formatNumber(1234.5678, { maximumFractionDigits: 2 })).toBe('1,234.57');
  });

  it('respects minimumFractionDigits option', () => {
    expect(formatNumber(1234, { minimumFractionDigits: 2 })).toBe('1,234.00');
  });

  it('formats with compact notation', () => {
    expect(formatNumber(1234567, { compact: true })).toBe('1.2M');
  });

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('handles negative numbers', () => {
    expect(formatNumber(-1234.5678)).toBe('-1,234.5678');
  });

  it('handles very small numbers', () => {
    expect(formatNumber(0.000001)).toBe('0.000001');
  });

  it('handles very large numbers', () => {
    expect(formatNumber(1234567890)).toBe('1,234,567,890');
  });

  it('combines multiple options', () => {
    expect(formatNumber(1234.5678, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      compact: false
    })).toBe('1,234.57');
  });
}); 