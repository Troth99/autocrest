"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = !mounted || resolvedTheme !== "light";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="cursor-pointer rounded-full text-muted hover:text-text-primary"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      disabled={!mounted}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {mounted ? (
        isDark ? <Sun /> : <Moon />
      ) : (
        <Sun className="opacity-0" />
      )}
    </Button>
  );
}
