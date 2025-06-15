import React from "react";

const ThemeContext = React.createContext<{
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}>({
  theme: "dark",
  setTheme: () => {},
});


export default ThemeContext