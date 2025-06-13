import React from 'react';
import { Button } from "@components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SubmitButton: React.FC<{ disabled: boolean; isLoading: boolean }> = ({ disabled, isLoading }) => (
  <Button
    type="submit"
    disabled={disabled}
    className={cn(
      "w-full mt-4 h-14 text-lg font-semibold transition-all duration-200 cursor-pointer",
      disabled
        ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white shadow-lg"
    )}
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