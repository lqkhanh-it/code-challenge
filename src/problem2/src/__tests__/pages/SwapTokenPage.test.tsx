import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SwapTokenPage from '@/pages/SwapTokenPage';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import type { SwapResponse } from '@/types';

// Mock the components and hooks
vi.mock('@/components/CurrencySwapForm', () => ({
  default: ({ onSwapSuccess }: { onSwapSuccess: (response: SwapResponse) => void }) => (
    <button onClick={() => onSwapSuccess({
      success: true,
      transactionId: 'test-tx-123',
      fromCurrency: 'ETH',
      toCurrency: 'USDT',
      fromAmount: 100,
      toAmount: 200000,
      rate: 2000,
      fee: 0,
      timestamp: new Date().toISOString()
    })}>
      Mock Swap Form
    </button>
  ),
}));

vi.mock('@/components/Invoice/Invoice', () => ({
  default: (props: SwapResponse) => (
    <div data-testid="invoice">
      Invoice: {props.fromAmount} {props.fromCurrency} to {props.toAmount} {props.toCurrency}
    </div>
  ),
}));

vi.mock('@/hooks/useFetchPrices', () => ({
  useFetchPrices: vi.fn(),
}));

describe('SwapTokenPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the swap form initially', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <SwapTokenPage />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Mock Swap Form')).toBeInTheDocument();
  });

  it('shows invoice and new swap button after successful swap', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <SwapTokenPage />
      </ThemeProvider>
    );

    // Trigger swap
    fireEvent.click(screen.getByText('Mock Swap Form'));

    // Check if invoice is displayed
    expect(screen.getByTestId('invoice')).toBeInTheDocument();
    expect(screen.getByText('Invoice: 100 ETH to 200000 USDT')).toBeInTheDocument();

    // Check if new swap button is present
    expect(screen.getByText('New Swap')).toBeInTheDocument();
  });

  it('returns to swap form when clicking new swap button', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <SwapTokenPage />
      </ThemeProvider>
    );

    // Trigger swap
    fireEvent.click(screen.getByText('Mock Swap Form'));

    // Click new swap button
    fireEvent.click(screen.getByText('New Swap'));

    // Check if we're back to the swap form
    expect(screen.getByText('Mock Swap Form')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <SwapTokenPage />
      </ThemeProvider>
    );

    // Theme toggle should be present
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });
}); 