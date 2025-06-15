import { useContext } from 'react';
import ThemeContext from '@/components/theme/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, setTheme } = context;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isDark = () => theme === 'dark';

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark,
  };
}; 