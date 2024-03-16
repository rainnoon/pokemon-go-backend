import type { Metadata } from "next";

//Styles
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

// Fonts
import { Inter } from "next/font/google";

// Components
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZenMon",
  description: "Created by @PDiTO for ETHGlobal London 2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
