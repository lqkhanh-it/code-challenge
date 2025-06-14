import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import SwapTokenPage from '@/pages/SwapTokenPage';
import './mocks/api'; // Import mock adapter

function App() {
  return (
    <ThemeProvider>
      <Toaster richColors position="top-right" />
      <main className="min-h-screen bg-background">
        <SwapTokenPage />
      </main>
    </ThemeProvider>
  );
}

export default App;
