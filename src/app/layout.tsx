// filepath: src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import NavigationLoader from "@/components/layout/NavigationLoader";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DakshDynamics | Engineering & Academy",
  description: "Deploy enterprise AI architectures, multi-agent RAGs, and custom IoT hardware.",
  verification: {
    google: "kRwiLCWFO7efOoqt0QZhZr3WlFVT1y7fnAK5tmc6t18",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-white font-sans antialiased selection:bg-accent selection:text-black">
        <NavigationLoader />
        {children}
      </body>
    </html>
  );
}
