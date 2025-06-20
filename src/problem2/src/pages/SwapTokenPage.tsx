import { useState } from 'react';
import CurrencySwapForm from "@/components/CurrencySwapForm";
import Header from "@/components/Header/Header";
import Invoice from "@/components/Invoice/Invoice";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Flex, Box, Button, Text } from "@radix-ui/themes";
import { ArrowLeft } from 'lucide-react';
import type { SwapResponse } from '@/types';
import { useFetchPrices } from '@/hooks/useFetchPrices';

const SwapTokenPage = () => {
  const [swapResponse, setSwapResponse] = useState<SwapResponse | null>(null);
  useFetchPrices();

  const handleSwapSuccess = (response: SwapResponse) => {
    setSwapResponse(response);
  };

  const handleNewSwap = () => {
    setSwapResponse(null);
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <Flex 
        direction="column" 
        align="center" 
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, var(--color-background), var(--color-card))'
        }}
      >
        {/* Header */}
        <Flex direction="column" align="center" className="mt-10 w-full">
          <Header />
        </Flex>

        {/* Theme Toggle */}
        <Box className="absolute top-4 right-4">
          <ThemeToggle />
        </Box>

        {/* Swap Card */}
        <Box 
          className="w-full max-w-2xl p-8 rounded-2xl shadow-xl"
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)'
          }}
        >
          {swapResponse ? (
            <Flex direction="column" gap="4">
              <Invoice {...swapResponse} />
              <Button 
                onClick={handleNewSwap}
                size="4"
                className="w-full group !cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              >
                <Flex align="center" justify="center" gap="2">
                  <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  <Text>New Swap</Text>
                </Flex>
              </Button>
            </Flex>
          ) : (
            <CurrencySwapForm onSwapSuccess={handleSwapSuccess} />
          )}
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

export default SwapTokenPage