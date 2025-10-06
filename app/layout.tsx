import type { Metadata } from "next";
import { geistSans, geistMono, sourceSerif4, montserrat } from "@/fonts";
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
      <body
        className={`${montserrat.variable} ${geistMono.variable} ${sourceSerif4.variable} ${montserrat.variable} antialiased`}
      >
        <AuthProvider>
          <div className="min-h-screen bg-[#f5f3ee] relative ">
            <Header />
            <div>{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
