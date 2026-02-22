import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import LoaderWrapper from "./LoaderWrapper";

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
        <LoaderWrapper>{children}</LoaderWrapper>
      </body>
    </html>
  );
}
