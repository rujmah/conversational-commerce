import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conversational Commerce AI",
  description:
    "AI-powered order status assistant with real-time chat and SSE API endpoints. Built with OpenAI GPT-4, GraphQL integration, and modern streaming technologies.",
  keywords: [
    "AI",
    "chatbot",
    "order status",
    "SSE",
    "streaming",
    "OpenAI",
    "customer service",
  ],
  authors: [{ name: "Conversational Commerce AI" }],
  openGraph: {
    title: "Conversational Commerce AI",
    description:
      "AI-powered order status assistant with real-time capabilities",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
