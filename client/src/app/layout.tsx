import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@app/process/providers";

type Props = {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Nexst JS Beta 1.1.6",
  description: "Next-NestJS Template",
};

export default async function RootLayout({children}: Readonly<Props>) {
  return (
    <html className="h-full">
      <body className={"bg-neutral-950 h-inherit text-white font-mono"}>
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}