import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SkipToContent } from "@/components/accessibility/skip-to-content";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Pajis Kitchen - Home Cooked Meals Delivered",
    template: "%s | Pajis Kitchen",
  },
  description: "Delicious homemade Indian meals delivered fresh to your door. Choose from weekly or monthly subscription plans.",
  keywords: ["tiffin service", "meal delivery", "Indian food", "home cooked meals", "subscription", "Toronto"],
  authors: [{ name: "Pajis Kitchen" }],
  creator: "Pajis Kitchen",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pajis Kitchen",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://pajiskitchen.com",
    title: "Pajis Kitchen - Home Cooked Meals Delivered",
    description: "Delicious homemade Indian meals delivered fresh to your door",
    siteName: "Pajis Kitchen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pajis Kitchen - Home Cooked Meals Delivered",
    description: "Delicious homemade Indian meals delivered fresh to your door",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SkipToContent />
        <Providers>
          <div id="main-content">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
