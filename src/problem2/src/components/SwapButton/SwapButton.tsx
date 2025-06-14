import React from 'react';
import { Button } from "@radix-ui/themes";
import { ArrowDownUp } from "lucide-react";
import { useAppToast } from '@/hooks/useAppToast';

interface SwapButtonProps {
  onClick: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
  const toast = useAppToast();

  const handleClick = () => {
    onClick();
    toast.info('Tokens swapped successfully!');
  };

  return (
    <Button
      variant="ghost"
      color="gray"
      onClick={handleClick}
      className="mx-auto my-2"
    >
      <ArrowDownUp className="h-4 w-4" />
    </Button>
  );
};

export default SwapButton;