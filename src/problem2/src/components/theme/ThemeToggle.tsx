import { Moon, Sun } from "lucide-react";
import { Button } from "@radix-ui/themes";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 absolute top-2 right-2 hover:!bg-transparent"
    >
      {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 