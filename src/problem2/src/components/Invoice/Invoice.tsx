import React from 'react';
import { Box, Flex, Text } from "@radix-ui/themes";
import { formatNumber } from '@/utils/format';
import { CheckCircle } from 'lucide-react';
import { getTokenIcon } from '@/utils/convert';

interface InvoiceProps {
  fromAmount: string;
  toAmount: string;
  fromCurrency: string;
  toCurrency: string;
  rate: string;
}

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

const Invoice: React.FC<InvoiceProps> = ({
  fromAmount,
  toAmount,
  fromCurrency,
  toCurrency,
  rate
}) => {
  return (
    <Box className="w-full rounded-lg border border-border p-4 my-4">
      <Flex align="center" gap="2" className="mb-4">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <Text size="2" weight="medium" className="text-green-500">
          Transaction Successful
        </Text>
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
              0 {fromCurrency}
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