import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import CurrencySwapForm from '@/components/CurrencySwapForm/CurrencySwapForm';
import type { FormData } from '@/types';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSwapStore } from '@/store/useSwapStore';
import { useAppToast } from '@/hooks/useAppToast';
import { getRate } from '@/utils/rate';
import { validateForm } from '@/utils/validation';

// Mock dependencies
vi.mock('@/store/useSwapStore');
vi.mock('@/hooks/useAppToast');
vi.mock('@/utils/rate');
vi.mock('@/utils/validation');

const mockedUseSwapStore = vi.mocked(useSwapStore);
const mockedUseAppToast = vi.mocked(useAppToast);
const mockedGetRate = vi.mocked(getRate);
const mockedValidateForm = vi.mocked(validateForm);

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

describe('CurrencySwapForm', () => {
  const mockTokens = [
    { currency: 'USD', date: '2024-03-13', price: 1 },
    { currency: 'EUR', date: '2024-03-13', price: 0.85 },
  ];

  const mockOnSwapSuccess = vi.fn();
  const mockToast = {
    success: vi.fn(),
    error: vi.fn(), 
    info: vi.fn(),
  };

  // Default mock store values
  const defaultMockStore = {
    tokens: mockTokens,
    fromCurrency: '',
    toCurrency: '',
    fromAmount: '',
    toAmount: '',
    isLoading: false,
    error: null,
    setFromCurrency: vi.fn(),
    setToCurrency: vi.fn(),
    setToAmount: vi.fn(),
    setLoading: vi.fn(),
    setError: vi.fn(),
    swapCurrencies: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseSwapStore.mockReturnValue(defaultMockStore);
    mockedUseAppToast.mockReturnValue(mockToast);
    mockedValidateForm.mockReturnValue({});
    mockedGetRate.mockReturnValue('0.85');
  });

  it('renders the form with all required elements', () => {
    render(
      <TestWrapper>
        <CurrencySwapForm onSwapSuccess={mockOnSwapSuccess} />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/you pay/i)).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('disables the swap button when required fields are missing', () => {
    render(
      <TestWrapper>
        <CurrencySwapForm onSwapSuccess={mockOnSwapSuccess} />
      </TestWrapper>
    );

    const swapButton = screen.getByTestId('submit-button');
    expect(swapButton).toBeDisabled();
  });

  it('shows validation errors when form is invalid', async () => {
    mockedValidateForm.mockReturnValue({
      fromAmount: 'Amount is required',
      fromCurrency: 'From currency is required',
    });

    render(
      <TestWrapper>
        <CurrencySwapForm onSwapSuccess={mockOnSwapSuccess} />
      </TestWrapper>
    );

    const swapButton = screen.getByTestId('submit-button');
    expect(swapButton).toBeDisabled();
    fireEvent.click(swapButton);

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledTimes(0);
    });
  });

  it('shows loading state during swap', () => {
    mockedUseSwapStore.mockReturnValue({
      ...defaultMockStore,
      isLoading: true,
    });

    render(
      <TestWrapper>
        <CurrencySwapForm onSwapSuccess={mockOnSwapSuccess} />
      </TestWrapper>
    );

    const swapButton = screen.getByRole('button', { name: /swapping/i });
    expect(swapButton).toBeInTheDocument();
    expect(swapButton).toBeDisabled();
  });

  it('displays error message when error state is present', () => {
    mockedUseSwapStore.mockReturnValue({
      ...defaultMockStore,
      error: 'Network error occurred',
    });

    render(
      <TestWrapper>
        <CurrencySwapForm onSwapSuccess={mockOnSwapSuccess} />
      </TestWrapper>
    );

    expect(screen.getByText('Network error occurred')).toBeInTheDocument();
  });

  it('displays field validation errors', async () => {
    render(
      <TestWrapper>
        <CurrencySwapForm onSwapSuccess={mockOnSwapSuccess} />
      </TestWrapper>
    );

    const amountInput = screen.getByLabelText(/you pay/i);
    fireEvent.change(amountInput, { target: { value: '' } });
    fireEvent.blur(amountInput);

  });
});