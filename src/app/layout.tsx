import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/shared/components/Header/SiteHeader";
import SiteFooter from "@/shared/components/Footer/SiteFooter";
import ThemeProvider from "@/shared/components/ThemeProvider/ThemeProvider";
import { CurrentUserProvider } from "@/shared/context/CurrentUserContext";
import { toCurrentUser } from "@/lib/supabase/current-user";
import { createClient } from "@/lib/supabase/server";

// Google Fonts configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Google Fonts configuration for Geist Mono
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoCrest",
  description: "A connected view of your vehicle's lifecycle.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()
    : { data: null };

  const currentUser = toCurrentUser(user, profile);
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CurrentUserProvider initialUser={currentUser}>
            <SiteHeader user={currentUser} />
            {children}
            <SiteFooter />
          </CurrentUserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
