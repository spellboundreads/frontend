import type { Metadata } from "next";
import { beVietnamPro } from "@/fonts";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "spellbound",
  description: "A platform for discovering and sharing literary works.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${beVietnamPro.variable} antialiased`}>
        <div className=" overflow-x-hidden relative ">
          <div className="fixed top-0 left-0 w-full z-50">
            <Header />
          </div>
          <Toaster />

          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
