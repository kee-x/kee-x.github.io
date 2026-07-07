import { createContext, useContext, useState, useEffect } from "react";
import { Outlet } from "react-router";

interface DarkModeCtx {
  isDark: boolean;
  toggle: () => void;
}

const DarkModeContext = createContext<DarkModeCtx>({ isDark: true, toggle: () => {} });

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export default function Root() {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem("theme") !== "light";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  // Ensure class is set on first render
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle: () => setIsDark((v) => !v) }}>
      <Outlet />
    </DarkModeContext.Provider>
  );
}
