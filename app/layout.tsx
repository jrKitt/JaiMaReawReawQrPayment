import type { Metadata } from "next";
import { K2D } from "next/font/google";
import "./globals.css";

const k2d = K2D({ subsets: ["latin"], weight: '300' });

export const metadata: Metadata = {
  title: "JaiMaReawReaw | จ่ายมาเร็วๆ",
  description: "JaiMaReawReaw",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={k2d.className}>{children}</body>
    </html>
  );
}
