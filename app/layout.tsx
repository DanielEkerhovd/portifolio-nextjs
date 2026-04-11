import type { Metadata } from "next";
import { Geist_Mono, Sora } from "next/font/google";
import MeshBackground from "@/components/MeshBackground";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel Ekerhovd - Portfolio",
  description: "Personal portfolio of Daniel Ekerhovd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col items-center p-5 lg:p-10">
        <MeshBackground />
        {children}
      </body>
    </html>
  );
}
