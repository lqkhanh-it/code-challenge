import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Invoice from '@/components/Invoice/Invoice';
import { useSwapStore } from '@/store/useSwapStore';
import { toast } from 'sonner';

// Mock the dependencies
vi.mock('@/store/useSwapStore');
vi.mock('sonner');
vi.mock('@/utils/format', () => ({
  formatNumber: (num: number) => num.toString(),
}));
vi.mock('@/utils/convert', () => ({
  getTokenIcon: (currency: string) => `mock-icon-${currency}`,
}));
vi.mock('@/utils/rate', () => ({
  getRate: () => '1.5',
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe('Invoice Component', () => {
  const mockProps = {
    fromAmount: 100,
    toAmount: 150,
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    transactionId: 'tx123',
    timestamp: '2024-03-20T10:00:00Z',
    fee: 1.5,
  };

  beforeEach(() => {
    // Mock useSwapStore
    (useSwapStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      tokens: [],
    });
    
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders all transaction details correctly', () => {
    render(<Invoice {...mockProps} />);

    // Check transaction status
    expect(screen.getByText('Transaction Successful')).toBeInTheDocument();
    
    // Check transaction ID
    expect(screen.getByText('tx123')).toBeInTheDocument();
    
    // Check exchange rate
    expect(screen.getByText('1 USD = 1.5 EUR')).toBeInTheDocument();
    
    // Check fee
    expect(screen.getByText('1.5 USD')).toBeInTheDocument();
    
    // Check amounts
    expect(screen.getByText('100 USD')).toBeInTheDocument();
    expect(screen.getByText('150 EUR')).toBeInTheDocument();
  });

  it('copies transaction ID to clipboard when copy button is clicked', () => {
    render(<Invoice {...mockProps} />);

    const copyButton = screen.getByRole('button', { name: /copy value/i });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('tx123');
    expect(toast.success).toHaveBeenCalledWith('Transaction ID copied to clipboard');
  });

  it('displays correct token icons', () => {
    render(<Invoice {...mockProps} />);

    const usdIcon = screen.getByAltText('USD');
    const eurIcon = screen.getByAltText('EUR');

    expect(usdIcon).toHaveAttribute('src', 'mock-icon-USD');
    expect(eurIcon).toHaveAttribute('src', 'mock-icon-EUR');
  });

  it('formats the date correctly', () => {
    render(<Invoice {...mockProps} />);

    // The date should be formatted according to the locale
    const dateElement = screen.getByText(new Date(mockProps.timestamp).toLocaleString());
    expect(dateElement).toBeInTheDocument();
  });
}); 