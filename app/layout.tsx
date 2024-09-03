import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iShuffle",
  description: "Shuffle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-background">{children}</body>
    </html>
  );
}
