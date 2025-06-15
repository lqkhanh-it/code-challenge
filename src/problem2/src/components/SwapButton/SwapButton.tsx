import React from 'react';
import { Button } from "@radix-ui/themes";
import { ArrowDownUp } from "lucide-react";
import { useAppToast } from '@/hooks/useAppToast';
import { useTheme } from '@/hooks/useTheme';

interface SwapButtonProps {
  onClick: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
  const toast = useAppToast();
  const { theme } = useTheme();

  const handleClick = () => {
    onClick();
    toast.info('Tokens swapped successfully!');
  };

  return (
    <Button
      variant="ghost"
      color="gray"
      size="3"
      type='button'
      onClick={handleClick}
      className={`
        mx-auto mt-[10px] 
        transition-all duration-200 ease-in-out
        hover:scale-110 hover:rotate-180
        group relative
      `}
      title="Swap tokens"
    >
      <ArrowDownUp 
        className={`
          h-4 w-4 
          transition-colors duration-200
          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          group-hover:text-blue-500
        `} 
      />
      <span className="sr-only">Swap tokens</span>
    </Button>
  );
};

export default SwapButton;