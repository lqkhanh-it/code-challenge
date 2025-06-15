import React from 'react';
import { Button, Flex, Text } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";

const SubmitButton: React.FC<{ disabled: boolean; isLoading: boolean }> = ({ disabled, isLoading }) => (
  <Button
    size="4"
    type="submit"
    disabled={disabled}
    variant={disabled ? "soft" : "solid"}
    color={disabled ? "gray" : "indigo"}
    className="mt-6"
  >
    {isLoading ? (
      <Flex align="center" justify="center" gap="2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <Text>Swapping...</Text>
      </Flex>
    ) : (
      'Swap Tokens'
    )}
  </Button>
);

export default SubmitButton;