import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import AmountInput from '@/components/AmountInput/AmountInput';
import type { FormData } from '@/types';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import type { ReactNode } from 'react';

// Mock the useForm hook with proper return values
const mockRegister = vi.fn();
const mockWatch = vi.fn();

vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form');
  return {
    ...actual,
    useForm: vi.fn(),
  };
});

const TestWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm<FormData>({
    defaultValues: {
      fromAmount: '',
      toAmount: '',
      fromCurrency: '',
      toCurrency: '',
    },
  });

  const mockedMethods = {
    ...methods,
    register: mockRegister,
    watch: mockWatch,
  };

  return <FormProvider {...mockedMethods}>{children}</FormProvider>;
};

describe('AmountInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWatch.mockReturnValue('');
    mockRegister.mockReturnValue({
      name: '',
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    });
  });

  it('renders input field for fromAmount', () => {
    render(
      <TestWrapper>
        <AmountInput
          name="fromAmount"
          label="Amount"
          placeholder="Enter amount"
          register={mockRegister}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument();
  });

  it('renders read-only text for toAmount', () => {
    mockWatch.mockReturnValue('100.50');
    
    render(
      <TestWrapper>
        <AmountInput
          name="toAmount"
          label="To Amount"
          register={mockRegister}
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
    expect(input).toHaveClass('border-2', 'border-red-500');
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

  it('passes register function correctly', () => {
    render(
      <TestWrapper>
        <AmountInput
          name="fromAmount"
          label="Amount"
          register={mockRegister}
        />
      </TestWrapper>
    );

    expect(mockRegister).toHaveBeenCalledWith('fromAmount');
  });

  it('calls watch function for toAmount field', () => {
    render(
      <TestWrapper>
        <AmountInput
          name="toAmount"
          label="To Amount"
          register={mockRegister}
        />
      </TestWrapper>
    );

    expect(mockWatch).toHaveBeenCalledWith('toAmount');
  });
});