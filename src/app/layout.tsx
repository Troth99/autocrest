import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/shared/components/Header/SiteHeader";
import SiteFooter from "@/shared/components/Footer/SiteFooter";
import ThemeProvider from "@/shared/components/ThemeProvider/ThemeProvider";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
