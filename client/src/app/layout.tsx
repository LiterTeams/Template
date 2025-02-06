import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

type Props = {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Nexst JS Beta 1.1.4",
  description: "Next-NestJS Template",
};

export default async function RootLayout({children}: Readonly<Props>) {
  return (
    <html className="h-full">
      <body className={"bg-neutral-950 h-inherit text-white font-mono"}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}