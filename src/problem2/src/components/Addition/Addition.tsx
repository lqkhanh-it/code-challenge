import React, { useMemo, useCallback } from 'react';
import { useFormContext } from "react-hook-form";
import { getRate } from '@/utils/rate';
import { useSwapStore } from "@/store/useSwapStore";
import { Box, Flex, Text } from "@radix-ui/themes";
import SwapButton from "@/components/SwapButton/SwapButton";

const Addition = React.memo(() => {
  const { setValue, watch } = useFormContext();
  const { tokens } = useSwapStore();

  const watchedFromCurrency = watch('fromCurrency');
  const watchedToCurrency = watch('toCurrency');

  const handleSwapCurrencies = useCallback(() => {
    setValue('fromCurrency', watchedToCurrency);
    setValue('toCurrency', watchedFromCurrency);
  }, [setValue, watchedToCurrency, watchedFromCurrency]);

  const rate = useMemo(() => getRate({
    fromCurrency: watchedFromCurrency,
    toCurrency: watchedToCurrency,
    tokens
  }), [watchedFromCurrency, watchedToCurrency, tokens]);

  return (
    <Flex direction={{ initial: "column", sm: "row" }} align="center" justify="between" gap="4" py="4">
      <Box
        className="flex-1 rounded-lg px-4 py-2 text-sm font-medium shadow-sm"
        style={{ backgroundColor: 'var(--color-muted)', color: 'var(--color-muted-foreground)' }}
      >
        <Flex align="center" gap="2">
          <Text color="gray" className="mr-2">Exchange Rate:</Text>
          {rate ? (
            <Text weight="medium" style={{ color: 'var(--color-foreground)' }}>1 {watchedFromCurrency} = {rate} {watchedToCurrency}</Text>
          ) : null}
        </Flex>
      </Box>
      <Box>
        <SwapButton onClick={handleSwapCurrencies} />
      </Box>
    </Flex>
  );
});

Addition.displayName = 'Addition';

export default Addition;

