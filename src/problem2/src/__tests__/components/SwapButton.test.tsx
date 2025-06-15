import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SwapButton from '@/components/SwapButton/SwapButton';
import { useAppToast } from '@/hooks/useAppToast';
import { useTheme } from '@/hooks/useTheme';

// Mock the hooks
jest.mock('@/hooks/useAppToast');
jest.mock('@/hooks/useTheme');

describe('SwapButton', () => {
  const mockOnClick = jest.fn();
  const mockToast = {
    info: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppToast as jest.Mock).mockReturnValue(mockToast);
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
  });

  it('renders button with correct title', () => {
    render(<SwapButton onClick={mockOnClick} />);
    
    const button = screen.getByTitle('Swap tokens');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick and shows toast when clicked', () => {
    render(<SwapButton onClick={mockOnClick} />);
    
    const button = screen.getByTitle('Swap tokens');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockToast.info).toHaveBeenCalledWith('Tokens swapped successfully!');
  });

  it('applies correct styling classes', () => {
    render(<SwapButton onClick={mockOnClick} />);
    
    const button = screen.getByTitle('Swap tokens');
    expect(button).toHaveClass(
      'mx-auto',
      'mt-[10px]',
      'transition-all',
      'duration-200',
      'ease-in-out',
      'hover:scale-110',
      'hover:rotate-180',
      'group',
      'relative'
    );
  });

  it('renders swap icon with correct styling', () => {
    render(<SwapButton onClick={mockOnClick} />);
    
    const icon = screen.getByRole('img', { name: /arrow/i });
    expect(icon).toHaveClass(
      'h-4',
      'w-4',
      'transition-colors',
      'duration-200',
      'text-gray-600',
      'group-hover:text-blue-500'
    );
  });

  it('applies dark theme styles when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });
    
    render(<SwapButton onClick={mockOnClick} />);
    
    const icon = screen.getByRole('img', { name: /arrow/i });
    expect(icon).toHaveClass('text-gray-300');
  });

  it('includes screen reader text', () => {
    render(<SwapButton onClick={mockOnClick} />);
    
    expect(screen.getByText('Swap tokens', { selector: '.sr-only' })).toBeInTheDocument();
  });
}); 