import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TokenSelect from '@/components/TokenSelect/TokenSelect';
import { useSwapStore } from '@/store/useSwapStore';

// Mock the store
jest.mock('@/store/useSwapStore');

describe('TokenSelect', () => {
  const mockTokens = [
    { currency: 'USD', date: '2024-03-13', price: 1 },
    { currency: 'EUR', date: '2024-03-13', price: 0.85 },
    { currency: 'GBP', date: '2024-03-13', price: 0.75 },
  ];

  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSwapStore as unknown as jest.Mock).mockImplementation(() => ({
      tokens: mockTokens,
    }));
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

    const checkMarks = screen.getAllByRole('img', { name: /check/i });
    expect(checkMarks).toHaveLength(1);
  });

  it('displays currency icons', () => {
    render(<TokenSelect value="" onChange={mockOnChange} label="From" />);
    
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    const currencyIcons = screen.getAllByRole('img', { name: /USD|EUR|GBP/i });
    expect(currencyIcons).toHaveLength(3);
  });
}); 