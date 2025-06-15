import React from 'react';
import { Button, Text, Flex } from "@radix-ui/themes";
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
import { cn } from "@/utils/class";
import { getTokenIcon } from '@/utils/convert';
import { useSwapStore } from '@/store/useSwapStore';
interface TokenSelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const TokenSelect: React.FC<TokenSelectProps> = ({ value, onChange, label }) => {
  const { tokens } = useSwapStore();
  const [open, setOpen] = React.useState(false);

  const selectedToken = tokens.find(token => token.currency === value);

  return (
    <Flex direction="column" gap="2" className="w-full sm:w-[380px]">
      <Text as="label" size="3" weight="medium" className='font-bold text-blue-700'>
        {label}
      </Text>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="4"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full text-lg justify-between"
            autoFocus
          >
            {selectedToken ? (
              <Flex gap={"2"} className="items-center min-w-0">
                <img
                  src={getTokenIcon(selectedToken.currency)}
                  alt={selectedToken.currency}
                  className="w-6 h-6 rounded-full"
                />
                <Text className="truncate overflow-hidden text-ellipsis block">{selectedToken.currency}</Text>
              </Flex>
            ) : (
              <Text>Select currency</Text>
            )}
            <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="sm:w-[320px] p-0">
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
                    <Flex direction="row" className="items-center min-w-0 gap-3">
                      <img
                        src={getTokenIcon(token.currency)}
                        alt={token.currency}
                        className="w-6 h-6 rounded-full"
                      />
                      <Text>{token.currency}</Text>
                    </Flex>
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
    </Flex>
  );
};

export default TokenSelect;