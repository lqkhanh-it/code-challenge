import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SubmitButton from '@/components/SubmitButton/SubmitButton';

describe('SubmitButton', () => {
  it('renders button with "Swap Tokens" text when not loading', () => {
    render(<SubmitButton disabled={false} isLoading={false} />);
    
    expect(screen.getByText('Swap Tokens')).toBeInTheDocument();
    expect(screen.queryByText('Swapping...')).not.toBeInTheDocument();
  });

  it('renders loading state with "Swapping..." text', () => {
    render(<SubmitButton disabled={false} isLoading={true} />);
    
    expect(screen.getByText('Swapping...')).toBeInTheDocument();
    expect(screen.queryByText('Swap Tokens')).not.toBeInTheDocument();
  });

  it('applies disabled styles when disabled', () => {
    render(<SubmitButton disabled={true} isLoading={false} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('transition-all', 'duration-200', 'group', 'hover:scale-[1.02]');
    expect(button).toHaveAttribute('disabled');
  });

  it('applies enabled styles when not disabled', () => {
    render(<SubmitButton disabled={false} isLoading={false} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('transition-all', 'duration-200', 'group', 'hover:scale-[1.02]', '!cursor-pointer');
    expect(button).not.toHaveAttribute('disabled');
  });

  it('renders loading spinner when loading', () => {
    render(<SubmitButton disabled={false} isLoading={true} />);
    
    const spinner = screen.getByRole('img', { name: /loader/i });
    expect(spinner).toHaveClass('animate-spin');
  });

  it('renders swap icon when not loading', () => {
    render(<SubmitButton disabled={false} isLoading={false} />);
    
    const swapIcon = screen.getByRole('img', { name: /arrow/i });
    expect(swapIcon).toHaveClass('h-5', 'w-5', 'transition-transform', 'duration-200', 'group-hover:translate-x-1');
  });

  it('applies correct button size and type', () => {
    render(<SubmitButton disabled={false} isLoading={false} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
}); 