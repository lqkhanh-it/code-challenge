import { validateForm } from '@/utils/validation';
import type { FormData } from '@/types';

describe('validateForm', () => {
  it('returns no errors for valid form data', () => {
    const validData: Omit<FormData, 'toAmount'> = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      fromAmount: '100',
    };

    const errors = validateForm(validData);
    expect(errors).toEqual({});
  });

  it('returns error when fromCurrency is not selected', () => {
    const data: Omit<FormData, 'toAmount'> = {
      fromCurrency: '',
      toCurrency: 'EUR',
      fromAmount: '100',
    };

    const errors = validateForm(data);
    expect(errors.fromCurrency).toBe('Please select a token to swap from');
  });

  it('returns error when toCurrency is not selected', () => {
    const data: Omit<FormData, 'toAmount'> = {
      fromCurrency: 'USD',
      toCurrency: '',
      fromAmount: '100',
    };

    const errors = validateForm(data);
    expect(errors.toCurrency).toBe('Please select a token to swap to');
  });

  it('returns error when swapping the same currency', () => {
    const data: Omit<FormData, 'toAmount'> = {
      fromCurrency: 'USD',
      toCurrency: 'USD',
      fromAmount: '100',
    };

    const errors = validateForm(data);
    expect(errors.toCurrency).toBe('Cannot swap USD to itself. Please select a different token.');
  });

  it('returns error when amount is not provided', () => {
    const data: Omit<FormData, 'toAmount'> = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      fromAmount: '',
    };

    const errors = validateForm(data);
    expect(errors.fromAmount).toBe('Please enter an amount to swap');
  });

  it('returns error when amount is not a valid number', () => {
    const data: Omit<FormData, 'toAmount'> = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      fromAmount: 'abc',
    };

    const errors = validateForm(data);
    expect(errors.fromAmount).toBe('Please enter a valid number');
  });

  it('returns error when amount is negative', () => {
    const data: Omit<FormData, 'toAmount'> = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      fromAmount: '-100',
    };

    const errors = validateForm(data);
    expect(errors.fromAmount).toBe('Amount cannot be negative');
  });

  it('returns error when amount is zero', () => {
    const data: Omit<FormData, 'toAmount'> = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      fromAmount: '0',
    };

    const errors = validateForm(data);
    expect(errors.fromAmount).toBe('Amount must be greater than 0');
  });

  it('returns error when amount is too small', () => {
    const data: Omit<FormData, 'toAmount'> = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      fromAmount: '0.0000001',
    };

    const errors = validateForm(data);
    expect(errors.fromAmount).toBe('Amount is too small. Minimum amount is 0.000001');
  });
}); 