import type { Token } from '@types/token';
import React from 'react';
import { config } from '@config/env';
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenSelectProps {
  tokens: Token[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const TokenSelect: React.FC<TokenSelectProps> = ({ tokens, value, onChange, label }) => {
  const [open, setOpen] = React.useState(false);

  const getTokenIcon = (currency: string) => {
    return `${config.tokenIconsBaseUrl}/${currency}.svg`;
  };

  const selectedToken = tokens.find(token => token.currency === value);

  return (
    <div className="w-full sm:w-[240px]">
      <label className="block text-sm font-bold text-blue-700 mb-2">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full h-14 text-lg justify-between"
          >
            {selectedToken ? (
              <div className="flex items-center gap-3">
                <img
                  src={getTokenIcon(selectedToken.currency)}
                  alt={selectedToken.currency}
                  className="w-6 h-6 rounded-full"
                />
                <span>{selectedToken.currency}</span>
              </div>
            ) : (
              <span>Select currency</span>
            )}
            <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[320px] p-0">
          <Command>
            <CommandInput placeholder="Search currency..." className="h-12 text-lg" />
            <CommandList>
              <CommandEmpty>No currencies found.</CommandEmpty>
              <CommandGroup>
                {tokens.map((token) => (
                  <CommandItem
                    key={token.currency}
                    value={token.currency}
                    onSelect={() => {
                      onChange(token.currency);
                      setOpen(false);
                    }}
                    className="h-12 text-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={getTokenIcon(token.currency)}
                        alt={token.currency}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{token.currency}</span>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-5 w-5",
                        value === token.currency ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TokenSelect;