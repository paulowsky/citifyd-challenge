import { Inter } from "next/font/google";
import type { Metadata } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Citifyd Frontend Challenge",
  description: "Maps API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "min-h-full bg-white dark:bg-slate-900"
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
