import React from 'react';
import { Button } from "@radix-ui/themes";
import { Loader2 } from "lucide-react";

const SubmitButton: React.FC<{ disabled: boolean; isLoading: boolean }> = ({ disabled, isLoading }) => (
  <Button
    type="submit"
    disabled={disabled}
    variant={disabled ? "soft" : "solid"}
    color={disabled ? "gray" : "indigo"}
    className="w-full mt-4 h-14 text-lg"
  >
    {isLoading ? (
      <div className="flex items-center justify-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Swapping...</span>
      </div>
    ) : (
      'Swap Tokens'
    )}
  </Button>
);

export default SubmitButton;