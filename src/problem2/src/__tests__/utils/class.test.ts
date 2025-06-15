import { cn } from '@/utils/class';

describe('cn', () => {
  it('merges multiple class names', () => {
    const result = cn('text-red-500', 'bg-blue-500', 'p-4');
    expect(result).toBe('text-red-500 bg-blue-500 p-4');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class', !isActive && 'inactive-class');
    expect(result).toBe('base-class active-class');
  });

  it('handles object syntax', () => {
    const result = cn({
      'base-class': true,
      'active-class': true,
      'inactive-class': false,
    });
    expect(result).toBe('base-class active-class');
  });

  it('handles array syntax', () => {
    const result = cn(['base-class', 'active-class'], ['p-4', 'm-2']);
    expect(result).toBe('base-class active-class p-4 m-2');
  });

  it('handles mixed syntax', () => {
    const isActive = true;
    const result = cn(
      'base-class',
      ['p-4', 'm-2'],
      {
        'active-class': isActive,
        'inactive-class': !isActive,
      }
    );
    expect(result).toBe('base-class p-4 m-2 active-class');
  });

  it('handles empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles null and undefined values', () => {
    const result = cn('base-class', null, undefined, 'active-class');
    expect(result).toBe('base-class active-class');
  });

  it('handles Tailwind class conflicts', () => {
    const result = cn('p-4', 'p-8');
    expect(result).toBe('p-8');
  });
}); 