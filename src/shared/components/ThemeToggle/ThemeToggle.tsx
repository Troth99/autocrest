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
      className="cursor-pointer rounded-full text-muted transition-[transform,color,background-color] duration-200 hover:scale-105 hover:text-text-primary motion-reduce:transition-none motion-reduce:hover:scale-100 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:rotate-12 motion-reduce:[&_svg]:transition-none motion-reduce:hover:[&_svg]:rotate-0"
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
