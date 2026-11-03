"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="autocrest-theme"
      disableTransitionOnChange
      // Only the server-rendered bootstrap needs to execute before hydration.
      scriptProps={{
        type: typeof window === "undefined" ? "text/javascript" : "text/plain",
      }}
    >
      {children}
    </NextThemesProvider>
  );
}
