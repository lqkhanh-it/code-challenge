import { describe, it, expect } from 'vitest';
import { cn } from '@/utils/class';

describe('class utils', () => {
  it('combines multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional class names', () => {
    expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
  });

  it('handles undefined and null values', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('handles empty strings', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar');
  });

  it('handles complex combinations', () => {
    expect(cn('foo', { bar: true, baz: false }, 'qux', { quux: true })).toBe('foo bar qux quux');
  });
}); 