import React from 'react';
import { TextField, Text } from "@radix-ui/themes";
import { useFormContext } from 'react-hook-form';

interface AmountInputProps {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
}

const AmountInput: React.FC<AmountInputProps> = ({ name, label, placeholder, error }) => {
  const { register } = useFormContext();

  return (
    <div className="space-y-2">
      <Text as="label" size="2" weight="medium">
        {label}
      </Text>
      <TextField.Root>
        <TextField.Slot>
          <input
            {...register(name)}
            placeholder={placeholder}
            type="number"
            step="any"
            className="w-full"
          />
        </TextField.Slot>
      </TextField.Root>
      {error && (
        <Text color="red" size="1">
          {error}
        </Text>
      )}
    </div>
  );
};

export default AmountInput;