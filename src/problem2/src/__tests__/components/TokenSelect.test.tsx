import { render, screen, fireEvent } from '@testing-library/react';
import TokenSelect from '@/components/TokenSelect/TokenSelect';
import { useSwapStore } from '@/store/useSwapStore';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getTokenIcon } from '@/utils/convert';
import '../setup';

// Mock the store and getTokenIcon
vi.mock('@/store/useSwapStore');
vi.mock('@/utils/convert', () => ({
  getTokenIcon: vi.fn((currency) => `mocked-icon-${currency}.svg`)
}));

describe('TokenSelect', () => {
  const mockTokens = [
    { currency: 'USD', date: '2024-03-13', price: 1 },
    { currency: 'EUR', date: '2024-03-13', price: 0.85 },
    { currency: 'GBP', date: '2024-03-13', price: 0.75 },
  ];

  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useSwapStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      tokens: mockTokens,
    });
  });

  it('renders with label and placeholder', () => {
    render(<TokenSelect value="" onChange={mockOnChange} label="From" />);
    
    expect(screen.getByText('From')).toBeInTheDocument();
    expect(screen.getByText('Select currency')).toBeInTheDocument();
  });

  it('displays selected currency when value is provided', () => {
    render(<TokenSelect value="USD" onChange={mockOnChange} label="From" />);
    
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('opens popover on click and shows currency list', () => {
    render(<TokenSelect value="" onChange={mockOnChange} label="From" />);
    
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    expect(screen.getByPlaceholderText('Search currency...')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('GBP')).toBeInTheDocument();
  });

  it('filters currencies based on search input', () => {
    render(<TokenSelect value="" onChange={mockOnChange} label="From" />);
    
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    const searchInput = screen.getByPlaceholderText('Search currency...');
    fireEvent.change(searchInput, { target: { value: 'USD' } });

    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.queryByText('EUR')).not.toBeInTheDocument();
    expect(screen.queryByText('GBP')).not.toBeInTheDocument();
  });

  it('calls onChange when a currency is selected', () => {
    render(<TokenSelect value="" onChange={mockOnChange} label="From" />);
    
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    const usdOption = screen.getByText('USD');
    fireEvent.click(usdOption);

    expect(mockOnChange).toHaveBeenCalledWith('USD');
  });

  it('shows check mark next to selected currency', () => {
    render(<TokenSelect value="USD" onChange={mockOnChange} label="From" />);
    
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    const checkMarks = screen.getAllByTestId('check-mark');
    expect(checkMarks).toHaveLength(3);
  });

  it('displays currency icons', () => {
    render(<TokenSelect value="" onChange={mockOnChange} label="From" />);
    
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    // Verify that getTokenIcon was called for each currency
    expect(getTokenIcon).toHaveBeenCalledWith('USD');
    expect(getTokenIcon).toHaveBeenCalledWith('EUR');
    expect(getTokenIcon).toHaveBeenCalledWith('GBP');

    // Verify that img elements are present with correct alt text
    expect(screen.getByAltText('USD')).toBeInTheDocument();
    expect(screen.getByAltText('EUR')).toBeInTheDocument();
    expect(screen.getByAltText('GBP')).toBeInTheDocument();
  });
}); 