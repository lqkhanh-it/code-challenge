import React from 'react';
import { Text, Flex } from "@radix-ui/themes";
import { type UseFormRegister } from 'react-hook-form';
import type { FormData } from '@/types';

interface AmountInputProps {
  name: keyof FormData;
  label: string;
  placeholder?: string;
  register: UseFormRegister<FormData>;
}

const AmountInput: React.FC<AmountInputProps> = ({ name, label, placeholder, register }) => (
  <Flex direction="column" gap="2" className="w-full">
    <Text as="label" size="3" weight="medium" className='font-bold text-blue-700'>
      {label}
    </Text>
    <input
      {...register(name)}
      placeholder={placeholder}
      type="number"
      step="any"
      className="w-full rounded-lg px-4 py-2 font-medium border border-border outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      style={{
        backgroundColor: 'var(--color-muted)',
        color: 'var(--color-muted-foreground)'
      }}
    />
  </Flex>
);

export default AmountInput;