import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CurrencySwapForm } from '@/components/CurrencySwapForm';
import { useSwapStore } from '@/store/useSwapStore';

// Mock the store
jest.mock('@/store/useSwapStore');

describe('CurrencySwapForm', () => {
  const mockTokens = [
    { currency: 'USD', date: '2024-03-13', price: 1 },
    { currency: 'EUR', date: '2024-03-13', price: 0.85 },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the store implementation
    (useSwapStore as jest.Mock).mockImplementation(() => ({
      tokens: mockTokens,
      fromCurrency: '',
      toCurrency: '',
      fromAmount: '',
      toAmount: '',
      isLoading: false,
      error: null,
      setFromCurrency: jest.fn(),
      setToCurrency: jest.fn(),
      setToAmount: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      swapCurrencies: jest.fn(),
    }));
  });

  it('renders the form with all required elements', () => {
    render(<CurrencySwapForm />);

    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /swap/i })).toBeInTheDocument();
  });

  it('disables the swap button when currencies are not selected', () => {
    render(<CurrencySwapForm />);

    const swapButton = screen.getByRole('button', { name: /swap/i });
    expect(swapButton).toBeDisabled();
  });

  it('shows error when trying to swap the same currency', async () => {
    const mockSetError = jest.fn();
    (useSwapStore as jest.Mock).mockImplementation(() => ({
      tokens: mockTokens,
      fromCurrency: 'USD',
      toCurrency: 'USD',
      fromAmount: '100',
      toAmount: '100',
      isLoading: false,
      error: null,
      setFromCurrency: jest.fn(),
      setToCurrency: jest.fn(),
      setToAmount: jest.fn(),
      setLoading: jest.fn(),
      setError: mockSetError,
      swapCurrencies: jest.fn(),
    }));

    render(<CurrencySwapForm />);

    const swapButton = screen.getByRole('button', { name: /swap/i });
    fireEvent.click(swapButton);

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith('Cannot swap the same currency');
    });
  });

  it('shows loading state during swap', async () => {
    const mockSetLoading = jest.fn();
    (useSwapStore as jest.Mock).mockImplementation(() => ({
      tokens: mockTokens,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      fromAmount: '100',
      toAmount: '85',
      isLoading: false,
      error: null,
      setFromCurrency: jest.fn(),
      setToCurrency: jest.fn(),
      setToAmount: jest.fn(),
      setLoading: mockSetLoading,
      setError: jest.fn(),
      swapCurrencies: jest.fn(),
    }));

    render(<CurrencySwapForm />);

    const swapButton = screen.getByRole('button', { name: /swap/i });
    fireEvent.click(swapButton);

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
    });

    // Wait for the loading state to be cleared
    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    }, { timeout: 2000 });
  });
}); 