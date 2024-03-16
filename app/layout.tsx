import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const natoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard system",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={natoSansThai.className}>{children}</body>
    </html>
  );
}
