import * as React from "react"
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: "light" | "dark"
}

const ThemeContext = React.createContext<{
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}>({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState(defaultTheme)

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Theme
        appearance={theme}
        accentColor="blue"
        grayColor="slate"
        scaling="100%"
        radius="large"
      >
        {children}
      </Theme>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 