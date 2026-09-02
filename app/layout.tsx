import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Berkshires Political Compass", description: "A two-dimensional opinion quiz." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
