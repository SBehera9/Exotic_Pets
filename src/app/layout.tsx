import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exotic Pets",
  description: "Discover and adopt exotic pets from around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <link rel="icon" href="/logo1.png" sizes="any"/>
        <link rel="icon" href="/logo1.png" type="image/svg+xml"/>
        <link rel="apple-touch-icon" href="/logo1.png"/>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
