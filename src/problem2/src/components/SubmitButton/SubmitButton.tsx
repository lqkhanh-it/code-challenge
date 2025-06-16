import React from 'react';
import { Button, Flex, Text } from "@radix-ui/themes";
import { Loader2, ArrowRightLeft } from "lucide-react";

const SubmitButton: React.FC<{ disabled: boolean; isLoading: boolean }> = ({ disabled, isLoading }) => (
  <Button
    data-testid="submit-button"
    size="4"
    type="submit"
    disabled={disabled}
    variant={disabled ? "soft" : "solid"}
    color={disabled ? "gray" : "indigo"}
    className={`
      mt-6 
      transition-all 
      duration-200 
      group 
      hover:scale-[1.02]
      ${!disabled && '!cursor-pointer'}
    `}
  >
    {isLoading ? (
      <Flex align="center" justify="center" gap="2">
        <Loader2 data-testid="loader" className="h-5 w-5 animate-spin" />
        <Text className="font-medium">Swapping...</Text>
      </Flex>
    ) : (
      <Flex align="center" justify="center" gap="2">
        <ArrowRightLeft data-testid="swap-icon" className={`h-5 w-5 transition-transform duration-200 ${!disabled && 'group-hover:translate-x-1'}`} />
        <Text className="font-medium">Swap Tokens</Text>
      </Flex>
    )}
  </Button>
);

export default SubmitButton;