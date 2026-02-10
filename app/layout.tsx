import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LenisProvider from "@/components/LenisProvider";
import ScrollTriggerProvider from "@/components/ScrollTriggerProvider";

export const metadata: Metadata = {
  title: "Minhaj",
  description: "Personal Portfolio Website",
};

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} ${GeistSans.variable} ${GeistMono.variable} font-sans`}
      >
        <LenisProvider>
          <ScrollTriggerProvider>
            <Navbar />
            {children}
          </ScrollTriggerProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
