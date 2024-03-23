import type { Metadata } from "next";
// import { Kanit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const noto_sans_thai = localFont({
  src: [
    {
      path: "./../fonts/NotoSansThai-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "./../fonts/NotoSansThai-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../fonts/NotoSansThai-Medium.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "./../fonts//NotoSansThai-SemiBold.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./../fonts/NotoSansThai-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
});

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
      <body className={noto_sans_thai.className}>{children}</body>
    </html>
  );
}
