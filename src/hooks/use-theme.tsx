import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";
const STORAGE_KEY = "mce-theme";

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  window.setTimeout(() => root.classList.remove("theme-transition"), 400);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial: Theme =
      stored ??
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "light");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      apply(next);
      return next;
    });
  }, []);

  return { theme, toggle };
}
