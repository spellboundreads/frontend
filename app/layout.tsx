import type { Metadata } from "next";
import { beVietnamPro } from "@/fonts";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { getMe } from "@/lib/auth";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "spellbound",
  description: "A platform for discovering and sharing literary works.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();
  return (
    <html lang="en">
      <body className={`${beVietnamPro.variable} antialiased`}>
        <div className=" overflow-x-hidden relative ">
          <Header user={user || null} />
          <Toaster />
          <div>{children}</div>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
