import React from 'react';
import type { ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const AmountInput: React.FC<AmountInputProps> = ({ value, onChange, placeholder, readOnly }) => (
  <div className="w-full">
    <label className="block text-sm font-bold text-blue-700 mb-2">AMOUNT</label>
    <Input
      type="number"
      step="any"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className={cn(
        "w-full h-14 text-lg [&::-webkit-inner-spin-button]:appearance-none",
        readOnly && "bg-muted cursor-not-allowed dark:bg-gray-700"
      )}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </div>
);

export default AmountInput;