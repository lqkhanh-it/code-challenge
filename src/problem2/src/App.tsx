import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from 'sonner';
import SwapTokenPage from '@/pages/SwapTokenPage';
import './mocks/api'; // Import mock adapter

function App() {
  return (
    <ThemeProvider>
      <Toaster richColors closeButton position="bottom-right" />
      <main className="min-h-screen">
        <SwapTokenPage />
      </main>
    </ThemeProvider>
  );
}

export default App;
