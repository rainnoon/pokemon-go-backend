import type { Metadata } from "next";

//Styles
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

// Fonts
import { Unkempt } from "next/font/google";

// Components
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

const unkempt = Unkempt({ subsets: ["latin"], weight: ["400", "700"] });

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
      <body className={unkempt.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
