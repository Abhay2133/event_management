import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Event Management App",
  description:
    "An event management platform for users, vendors, and admins to handle events, orders, and transactions seamlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
