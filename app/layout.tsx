import type { Metadata } from "next";
import { Special_Gothic_Expanded_One, Noto_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import BrowserAlert from "./components/BrowserAlert";

export const metadata: Metadata = {
  title: "Clément Poudrée (best developer ever)",
  description: "Clément Poudrée, full stack developer based in Rennes.",
};

const specialGothicExpandedOne = Special_Gothic_Expanded_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-special-gothic-expanded-one",
});

const notoSans = Noto_Sans({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} ${specialGothicExpandedOne.variable} antialiased`}
      >
        <CustomCursor />
        <BrowserAlert />
        {children}
      </body>
    </html>
  );
}
