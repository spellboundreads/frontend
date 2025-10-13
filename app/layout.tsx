import type { Metadata } from "next";
import { beVietnamPro } from "@/fonts";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
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
        <AuthProvider>
          <div className=" overflow-x-hidden relative ">
            <Header />
            <div>{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
