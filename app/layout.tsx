import type { Metadata } from "next";
import { geistSans, geistMono, sourceSerif4, montserrat } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spellbound",
  description: "A platform for discovering and sharing literary works.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${geistMono.variable} ${sourceSerif4.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
