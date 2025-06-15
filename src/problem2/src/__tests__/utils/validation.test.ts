import { describe, it, expect } from 'vitest';
import { validateForm } from '@/utils/validation';
import type { FormData } from '@/types';

describe('validation utils', () => {
  describe('validateForm', () => {
    it('returns no errors for valid form data', () => {
      const formData: Omit<FormData, 'toAmount'> = {
        fromAmount: '100',
        fromCurrency: 'USD',
        toCurrency: 'EUR',
      };

      const errors = validateForm(formData);
      expect(errors).toEqual({});
    });

    it('returns error when fromCurrency is not selected', () => {
      const formData: Omit<FormData, 'toAmount'> = {
        fromAmount: '100',
        fromCurrency: '',
        toCurrency: 'EUR',
      };

      const errors = validateForm(formData);
      expect(errors.fromCurrency).toBe('Please select a token to swap from');
    });

    it('returns error when toCurrency is not selected', () => {
      const formData: Omit<FormData, 'toAmount'> = {
        fromAmount: '100',
        fromCurrency: 'USD',
        toCurrency: '',
      };

      const errors = validateForm(formData);
      expect(errors.toCurrency).toBe('Please select a token to swap to');
    });

    it('returns error when swapping the same currency', () => {
      const formData: Omit<FormData, 'toAmount'> = {
        fromAmount: '100',
        fromCurrency: 'USD',
        toCurrency: 'USD',
      };

      const errors = validateForm(formData);
      expect(errors.toCurrency).toBe('Cannot swap USD to itself. Please select a different token.');
    });

    it('returns error when amount is not provided', () => {
      const formData: Omit<FormData, 'toAmount'> = {
        fromAmount: '',
        fromCurrency: 'USD',
        toCurrency: 'EUR',
      };

      const errors = validateForm(formData);
      expect(errors.fromAmount).toBe('Please enter an amount to swap');
    });

    it('returns error when amount is not a valid number', () => {
      const formData: Omit<FormData, 'toAmount'> = {
        fromAmount: 'abc',
        fromCurrency: 'USD',
        toCurrency: 'EUR',
      };

      const errors = validateForm(formData);
      expect(errors.fromAmount).toBe('Please enter a valid number');
    });

    it('returns error when amount is negative', () => {
      const formData: Omit<FormData, 'toAmount'> = {
        fromAmount: '-100',
        fromCurrency: 'USD',
        toCurrency: 'EUR',
      };

      const errors = validateForm(formData);
      expect(errors.fromAmount).toBe('Amount cannot be negative');
    });

    it('returns error when amount is zero', () => {
      const formData: Omit<FormData, 'toAmount'> = {
        fromAmount: '0',
        fromCurrency: 'USD',
        toCurrency: 'EUR',
      };

      const errors = validateForm(formData);
      expect(errors.fromAmount).toBe('Amount must be greater than 0');
    });

    it('returns error when amount is too small', () => {
      const formData: Omit<FormData, 'toAmount'> = {
        fromAmount: '0.0000001',
        fromCurrency: 'USD',
        toCurrency: 'EUR',
      };

      const errors = validateForm(formData);
      expect(errors.fromAmount).toBe('Amount is too small. Minimum amount is 0.000001');
    });
  });
}); 