import React from 'react';
import { Box, Flex, IconButton, Text } from "@radix-ui/themes";
import { formatNumber } from '@/utils/format';
import { CheckCircle, Clock, Hash, Copy } from 'lucide-react';
import { getTokenIcon } from '@/utils/convert';
import { getRate } from '@/utils/rate';
import { useSwapStore } from '@/store/useSwapStore';
import type { SwapResponse } from '@/types';
import { toast } from 'sonner';

const TokenIcon = ({ currency }: { currency: string }) => (
  <div className="w-5 h-5 relative">
    <img
      src={getTokenIcon(currency)}
      alt={currency}
      width={20}
      height={20}
      className="rounded-full"
    />
  </div>
);

const Invoice: React.FC<SwapResponse> = ({
  fromAmount,
  toAmount,
  fromCurrency,
  toCurrency,
  transactionId,
  timestamp,
  fee,
}) => {
  const { tokens } = useSwapStore();

  const rate = getRate({
    fromCurrency,
    toCurrency,
    tokens
  });

  const formattedDate = new Date(timestamp).toLocaleString();

  return (
    <Box className="w-full rounded-lg border border-border p-4 my-4">
      {/* Transaction Status */}
      <Flex direction="column" gap="2" className="mb-6">
        <Flex direction="column" align="center" gap="2" className="mb-2">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <Text size="4" weight="medium" className="text-green-500">
            Transaction Successful
          </Text>
        </Flex>
        <Flex align="center" gap="2">
          <Hash className="w-4 h-4 text-muted-foreground" />
          <Text size="2" className="text-muted-foreground">
            {transactionId}
          </Text>
          <IconButton
            size="1"
            aria-label="Copy value"
            className="!w-4 !h-4 !text-muted-foreground"
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(transactionId);
              toast.success("Transaction ID copied to clipboard");
            }}
          >
            <Copy />
          </IconButton>
        </Flex>
        <Flex align="center" gap="2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <Text size="2" className="text-muted-foreground">
            {formattedDate}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap="2">
        <Flex justify="between" align="center">
          <Text size="2" className="text-muted-foreground">Exchange rate</Text>
          <Flex align="center" gap="1">
            <Text weight="medium">
              1 {fromCurrency} = {rate} {toCurrency}
            </Text>
          </Flex>
        </Flex>

        <Flex justify="between" align="center">
          <Text size="2" className="text-muted-foreground">Fee</Text>
          <Flex align="center" gap="1">
            <Text weight="medium">
              {formatNumber(fee)} {fromCurrency}
            </Text>
          </Flex>
        </Flex>

        <Flex justify="between" align="center">
          <Text size="2" className="text-muted-foreground">You pay</Text>
          <Flex align="center" gap="1">
            <Text weight="medium" className="text-red-500">
              {formatNumber(fromAmount)} {fromCurrency}
            </Text>
            <TokenIcon currency={fromCurrency} />
          </Flex>
        </Flex>

        <Flex justify="between" align="center">
          <Text size="2" className="text-muted-foreground">You receive</Text>
          <Flex align="center" gap="1">
            <Text weight="medium" className="text-green-500">
              {formatNumber(toAmount)} {toCurrency}
            </Text>
            <TokenIcon currency={toCurrency} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Invoice; 