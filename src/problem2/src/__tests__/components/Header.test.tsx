import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header/Header';

describe('Header', () => {
  it('renders the main title', () => {
    render(<Header />);
    
    expect(screen.getByText('Token Swap')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Header />);
    
    expect(screen.getByText('Fast and secure token swap')).toBeInTheDocument();
  });

  it('applies correct styling classes to the container', () => {
    render(<Header />);
    
    const container = screen.getByText('Token Swap').parentElement?.parentElement;
    expect(container).toHaveClass('mb-2', 'py-4', 'px-4', 'rounded-xl');
  });

  it('applies gradient text styling to the title', () => {
    render(<Header />);
    
    const title = screen.getByText('Token Swap');
    expect(title).toHaveClass(
      'bg-gradient-to-r',
      'from-blue-600',
      'to-indigo-600',
      'bg-clip-text',
      'text-transparent',
      'mb-2'
    );
  });

  it('applies correct text size and color to the subtitle', () => {
    render(<Header />);
    
    const subtitle = screen.getByText('Fast and secure token swap');
    expect(subtitle).toHaveClass('mb-2');
    expect(subtitle).toHaveAttribute('color', 'gray');
  });
}); 