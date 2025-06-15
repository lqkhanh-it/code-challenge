import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react/pure';
import { FormProvider, useForm } from 'react-hook-form';
import CurrencySwapForm from '@/components/CurrencySwapForm/CurrencySwapForm';
import type { FormData } from '@/types';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSwapStore } from '@/store/useSwapStore';

// Mock the store
vi.mock('@/store/useSwapStore');

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

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock the store implementation
    (useSwapStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
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
    });
  });

  it('renders the form with all required elements', () => {
    render(
      <TestWrapper>
        <CurrencySwapForm onSwapSuccess={mockOnSwapSuccess} />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /swap/i })).toBeInTheDocument();
  });

  it('disables the swap button when currencies are not selected', () => {
    render(
      <TestWrapper>
        <CurrencySwapForm onSwapSuccess={mockOnSwapSuccess} />
      </TestWrapper>
    );

    const swapButton = screen.getByRole('button', { name: /swap/i });
    expect(swapButton).toBeDisabled();
  });

  it('shows error when trying to swap the same currency', async () => {
    const mockSetError = vi.fn();
    const mockSetLoading = vi.fn();

    (useSwapStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      tokens: mockTokens,
      fromCurrency: 'USD',
      toCurrency: 'USD',
      fromAmount: '100',
      toAmount: '',
      isLoading: false,
      error: null,
      setFromCurrency: vi.fn(),
      setToCurrency: vi.fn(),
      setToAmount: vi.fn(),
      setLoading: mockSetLoading,
      setError: mockSetError,
      swapCurrencies: vi.fn(),
    });

    render(
      <TestWrapper>
        <CurrencySwapForm onSwapSuccess={mockOnSwapSuccess} />
      </TestWrapper>
    );

    const swapButton = screen.getByRole('button', { name: /swap/i });
    fireEvent.click(swapButton);

    await vi.waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith('Cannot swap the same currency');
    });
  });

  it('shows loading state during swap', async () => {
    const mockSetLoading = vi.fn();

    (useSwapStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      tokens: mockTokens,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      fromAmount: '100',
      toAmount: '',
      isLoading: false,
      error: null,
      setFromCurrency: vi.fn(),
      setToCurrency: vi.fn(),
      setToAmount: vi.fn(),
      setLoading: mockSetLoading,
      setError: vi.fn(),
      swapCurrencies: vi.fn(),
    });

    render(
      <TestWrapper>
        <CurrencySwapForm onSwapSuccess={mockOnSwapSuccess} />
      </TestWrapper>
    );

    const swapButton = screen.getByRole('button', { name: /swap/i });
    fireEvent.click(swapButton);

    await vi.waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
    });

    // Wait for the loading state to be cleared
    await vi.waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    }, { timeout: 2000 });
  });
}); 