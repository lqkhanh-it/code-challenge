import CurrencySwapForm from "@/components/CurrencySwapForm";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Flex, Box } from "@radix-ui/themes";

const SwapTokenPage = () => {
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
          <CurrencySwapForm />
        </Box>
      </Flex>
    </ThemeProvider>
  );
};

export default SwapTokenPage