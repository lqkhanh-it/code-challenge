import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import AmountInput from '@/components/AmountInput/AmountInput';
import type { FormData } from '@/types';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<FormData>({
    defaultValues: {
      fromAmount: '',
      toAmount: '',
      fromCurrency: '',
      toCurrency: '',
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

vi.mock('react-hook-form', () => ({
  useForm: vi.fn().mockReturnValue({
    register: vi.fn(),
    watch: vi.fn().mockReturnValue(''),
  }),
}));

describe('AmountInput', () => {

  it('renders input field for fromAmount', () => {
    const { register } = useForm<FormData>();
    render(
      <TestWrapper>
        <AmountInput
          name="fromAmount"
          label="Amount"
          placeholder="Enter amount"
          register={register}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument();
  });

  it('renders read-only text for toAmount', () => {
    const { watch, register } = useForm<FormData>();
    vi.mocked(watch);
    const mockWatch = watch("toAmount").mockReturnValue('100.50');
    
    render(
      <TestWrapper>
        <AmountInput
          name="toAmount"
          label="To Amount"
          register={register}
        />
      </TestWrapper>
    );

    expect(screen.getByText('To Amount')).toBeInTheDocument();
    expect(screen.getByText('100.5')).toBeInTheDocument();
  });

  it('applies error styling when error prop is true', () => {
    render(
      <TestWrapper>
        <AmountInput
          name="fromAmount"
          label="Amount"
          register={mockRegister}
          error={true}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Amount');
    expect(input).toHaveClass('border-2 border-red-500');
  });

  it('formats number with maximum 6 decimal places', () => {
    mockWatch.mockReturnValue('123.456789');
    
    render(
      <TestWrapper>
        <AmountInput
          name="toAmount"
          label="To Amount"
          register={mockRegister}
        />
      </TestWrapper>
    );

    expect(screen.getByText('123.456789')).toBeInTheDocument();
  });

  it('handles empty value for toAmount', () => {
    mockWatch.mockReturnValue('');
    
    render(
      <TestWrapper>
        <AmountInput
          name="toAmount"
          label="To Amount"
          register={mockRegister}
        />
      </TestWrapper>
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(
      <TestWrapper>
        <AmountInput
          name="fromAmount"
          label="Amount"
          register={mockRegister}
        />
      </TestWrapper>
    );

    const input = screen.getByLabelText('Amount');
    expect(input).toHaveClass('w-full', 'h-12', 'rounded-lg', 'px-4', 'py-2', 'font-medium');
  });
}); 