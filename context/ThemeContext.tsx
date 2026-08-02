"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  dark: boolean;
  toggleTheme: () => void;
};

const ThemeContext =
  createContext<ThemeContextType>({
    dark: false,
    toggleTheme: () => {},
  });

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [dark, setDark] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") === "dark";
  }
  return false;
});

  useEffect(() => {
  localStorage.setItem(
    "theme",
    dark ? "dark" : "light"
  );

  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [dark]);

  function toggleTheme() {
    setDark((prev) => !prev);
  }

  return (
    <ThemeContext.Provider
      value={{ dark, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  return useContext(ThemeContext);
}