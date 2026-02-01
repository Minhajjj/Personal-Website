import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";

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
        <Navbar />
        {children}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"
          integrity="sha512-NcZdtrT77bJr4STcmsGAESr06BYGE8woZdSdEgqnpyqac7sugNO+Tr4bGwGF3MsnEkGKhU2KL2xh6Ec+BqsaHA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"
          integrity="sha512-P2IDYZfqSwjcSjX0BKeNhwRUH8zRPGlgcWl5n6gBLzdi4Y5/0O4zaXrtO4K9TZK6Hn1BenYpKowuCavNandERg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
