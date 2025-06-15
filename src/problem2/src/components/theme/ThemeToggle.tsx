import { Moon, Sun } from "lucide-react";
import { Button } from "@radix-ui/themes";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { isDark, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(isDark() ? "light" : "dark")}
      className="p-2 absolute top-2 right-2 hover:!bg-transparent"
    >
      {isDark() ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 