import type { Metadata } from "next";
import { Capriola, Geist, Geist_Mono, VT323 } from "next/font/google";
import "./globals.css";
import { connectMongo } from "@/utils/mongodb";

const vt = VT323({
  weight: '400',
  variable: '--font-vt',
  subsets: ['vietnamese']
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeyNeighbor",
  description: "Our friendly batering system!",
};

const capriola = Capriola({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-capriola",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectMongo(); // initialize db <--- 
  return (
    <html lang="en">
      <body
        className={`${capriola.variable} ${vt.variable}  ${geistSans.variable}  ${geistMono.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
