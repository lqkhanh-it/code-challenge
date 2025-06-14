import React from 'react';
import { Select, Text } from "@radix-ui/themes";

interface TokenSelectProps {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TokenSelect: React.FC<TokenSelectProps> = ({ label, options, error, value, onChange }) => {
  return (
    <div className="space-y-2">
      <Text as="label" size="2" weight="medium">
        {label}
      </Text>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className="w-full" />
        <Select.Content>
          {options.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      {error && (
        <Text color="red" size="1">
          {error}
        </Text>
      )}
    </div>
  );
};

export default TokenSelect;