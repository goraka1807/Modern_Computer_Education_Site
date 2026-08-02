import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      onClick={toggle}
      className={`glass edge-glow relative inline-flex h-10 w-[68px] shrink-0 items-center rounded-full px-1 ${className}`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
        className="grid h-8 w-8 place-items-center rounded-full brand-gradient shadow-[var(--shadow-float)]"
        style={{ marginLeft: isLight ? 0 : 28 }}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center text-primary-foreground"
        >
          {isLight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </motion.span>
    </button>
  );
}
