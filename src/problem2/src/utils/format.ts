/**
 * Formats a number for user-friendly display
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Formatted string
 */
export const formatNumber = (
  value: number | string | undefined | null,
  options: {
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    compact?: boolean;
  } = {}
): string => {
  if (value === undefined || value === null) return '0';
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '0';

  const {
    maximumFractionDigits = 6,
    minimumFractionDigits = 0,
    compact = false
  } = options;

  if (compact) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(num);
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping: true
  }).format(num);
}; 