import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react/pure';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { describe, it, expect } from 'vitest';

describe('ErrorMessage', () => {
  it('renders error message', () => {
    const errorMessage = 'This is an error message';
    render(<ErrorMessage message={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<ErrorMessage message="Error" />);
    
    const errorElement = screen.getByText('Error');
    expect(errorElement).toHaveClass('mt-1');
  });

  it('renders empty message', () => {
    render(<ErrorMessage message="" />);
    
    const errorElement = screen.queryByRole('span');
    expect(errorElement).not.toBeInTheDocument();
  });

  it('renders with special characters', () => {
    const specialMessage = 'Error: Invalid input! @#$%^&*()';
    render(<ErrorMessage message={specialMessage} />);
    
    expect(screen.getByText(specialMessage)).toBeInTheDocument();
  });
}); 