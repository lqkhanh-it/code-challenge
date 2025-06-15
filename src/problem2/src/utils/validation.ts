import type { FormData } from '@/types';

export const validateForm = (data: Omit<FormData, 'toAmount'>) => {
  const errors: Record<string, string> = {};

  // Token selection validation
  if (!data.fromCurrency) {
    errors.fromCurrency = 'Please select a token to swap from';
  }

  if (!data.toCurrency) {
    errors.toCurrency = 'Please select a token to swap to';
  }

  // Same token validation
  if (data.fromCurrency && data.toCurrency && data.fromCurrency === data.toCurrency) {
    errors.toCurrency = `Cannot swap ${data.fromCurrency} to itself. Please select a different token.`;
  }

  // Amount validation
  if (!data.fromAmount) {
    errors.fromAmount = 'Please enter an amount to swap';
  } else {
    const amount = parseFloat(data.fromAmount);
    if (isNaN(amount)) {
      errors.fromAmount = 'Please enter a valid number';
    } else if (amount <= 0) {
      errors.fromAmount = 'Amount must be greater than 0';
    }
  }

  return errors;
};