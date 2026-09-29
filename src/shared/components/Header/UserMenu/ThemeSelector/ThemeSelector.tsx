"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, ChevronRight, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/shared/components/ui/dropdown-menu";

const emptySubscribe = () => () => {};
type ThemeOption = "system" | "light" | "dark";

export default function ThemeSelector() {
  // Ensure the component is mounted before accessing the theme to avoid hydration mismatch issues
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  const [pendingTheme, setPendingTheme] = useState<ThemeOption | null>(null);
  const selectedTheme =
    pendingTheme ??
    (theme === "system" || theme === "light" || theme === "dark"
      ? theme
      : "system");

  function handleThemeChange(nextTheme: ThemeOption) {
    setPendingTheme(nextTheme);
    setTheme(nextTheme);
  }

  const themeLabel = mounted
    ? selectedTheme === "light"
      ? "Light"
      : selectedTheme === "dark"
        ? "Dark"
        : "System"
    : "System";

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="cursor-pointer" openOnHover={false}>
          <span>Theme</span>
          <span className="ml-auto text-xs text-muted">{themeLabel}</span>
          <ChevronRight className="size-4 text-muted" />
        </DropdownMenuSubTrigger>
        <DropdownMenuContent side="right" align="start" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={!mounted}
              onClick={() => handleThemeChange("system")}
            >
              <Laptop />
              System
              {mounted && selectedTheme === "system" && (
                <Check className="ml-auto size-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={!mounted}
              onClick={() => handleThemeChange("light")}
            >
              <Sun />
              Light
              {mounted && selectedTheme === "light" && (
                <Check className="ml-auto size-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={!mounted}
              onClick={() => handleThemeChange("dark")}
            >
              <Moon />
              Dark
              {mounted && selectedTheme === "dark" && (
                <Check className="ml-auto size-4" />
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuSub>
    </>
  );
}
