import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import SwapTokenPage from '@pages/SwapTokenPage';

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
