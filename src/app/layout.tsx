import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Sahil Chopra's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased bg-black text-green-400`}>{children}</body>
    </html>
  );
}
