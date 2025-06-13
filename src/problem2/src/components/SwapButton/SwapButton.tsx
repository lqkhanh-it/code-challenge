import React from 'react';
import { Button } from "../ui/button";

const SwapButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="flex justify-center">
    <Button
      type="button"
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="w-12 h-12 rounded-full hover:bg-blue-100 hover:cursor-pointer"
    >
      <span className="text-2xl text-blue-500">⇄</span>
    </Button>
  </div>
);

export default SwapButton;