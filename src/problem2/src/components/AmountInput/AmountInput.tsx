import React from 'react';
import { Text, Flex } from "@radix-ui/themes";
import { useFormContext, type UseFormRegister } from 'react-hook-form';
import type { FormData } from '@/types';
import { formatNumber } from '@/utils/format';
import { cn } from '@/utils/class';

interface AmountInputProps {
  name: keyof FormData;
  label: string;
  placeholder?: string;
  register: UseFormRegister<FormData>;
  error?: boolean;
}

const AmountInput: React.FC<AmountInputProps> = ({ name, label, placeholder, register, error }) => {
    const { watch } = useFormContext();
    if (name === 'toAmount') {
      const value = watch(name);
      return (
        <Flex direction="column" gap="2" className="w-full">
          <Text as="label" size="3" weight="medium" className='font-bold text-blue-700'>{label}</Text>
          <Text className="w-full h-12 rounded-lg px-2 py-2 font-bold flex items-center text-xl truncate">
            {formatNumber(value, { maximumFractionDigits: 6 })}
          </Text>
        </Flex>
      );
    }

    return (
      <Flex direction="column" gap="2" className="w-full">
        <Text as="label" size="3" weight="medium" className='font-bold text-blue-700' htmlFor={name}>
          {label}
        </Text>

        <input
          id={name}
          {...register(name)}
          placeholder={placeholder}
          type="number"
          autoFocus
          step="any"
          className={cn(
            "w-full h-12 rounded-lg px-4 py-2 font-medium outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            error && "border-2 border-red-500"
          )}
          style={{
            backgroundColor: 'var(--color-muted)',
            color: 'var(--color-muted-foreground)'
          }}
        />
      </Flex>
    );
  }
;

export default AmountInput;