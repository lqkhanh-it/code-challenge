import CurrencySwapForm from "@/components/CurrencySwapForm";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const SwapTokenPage = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="currency-swap-theme">
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <div className="mt-10 w-full flex flex-col items-center">
          <Header />
        </div>

        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        {/* Swap Card */}
        <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <CurrencySwapForm />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SwapTokenPage