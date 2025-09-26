import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/globals.css";
import { cn } from "../lib/utils";

export const metadata: Metadata = {
  title: "Paylexa Admin",
  description: "Administrative console for Paylexa platform",
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn("min-h-screen bg-background font-sans antialiased")}>{children}</body>
  </html>
);

export default RootLayout;
