import { ThemeProvider } from '@/components/theme/ThemeProvider';
import * as Toast from '@radix-ui/react-toast';
import SwapTokenPage from '@/pages/SwapTokenPage';
import './mocks/api'; // Import mock adapter

function App() {
  return (
    <ThemeProvider>
      <Toast.Provider>
        <Toast.Viewport 
          className="fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-96 max-w-[100vw] m-0 z-50 outline-none"
          data-radix-toast-viewport
        />
        <main className="min-h-screen">
          <SwapTokenPage />
        </main>
      </Toast.Provider>
    </ThemeProvider>
  );
}

export default App;
