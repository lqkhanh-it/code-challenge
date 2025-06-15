import * as React from "react"
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import ThemeContext from "./ThemeContext"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: "light" | "dark"
}

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