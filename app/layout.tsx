import type { Metadata } from "next";
import { Bebas_Neue, Noto_Sans, Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import LoaderWrapper from "./LoaderWrapper";
import { cn } from "../lib/utils";

const playfairDisplayHeading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

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
    <html lang="en" className={cn("font-sans", notoSans.variable, playfairDisplayHeading.variable)}>
      <body
        className={`${bebas.variable} ${GeistSans.variable} ${GeistMono.variable} font-sans`}
      >
        <LoaderWrapper>{children}</LoaderWrapper>
      </body>
    </html>
  );
}
