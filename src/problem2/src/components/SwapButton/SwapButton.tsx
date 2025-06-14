import React from 'react';
import { Button } from "@/components/ui/button";
import { Repeat2 } from "lucide-react";

const SwapButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="flex justify-center">
    <Button
      type="button"
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="w-12 h-12 rounded-full hover:bg-blue-100 hover:cursor-pointer"
    >
      <Repeat2 className="text-2xl text-blue-500 rotate-90" />
    </Button>
  </div>
);

export default SwapButton;