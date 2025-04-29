import type { Metadata } from "next";
import { raleway, poppins, dmSans } from "./fonts";
import "./globals.css";
import Header from "./components/layout/header/Header";

export const metadata: Metadata = {
  title: "Vadastudio",
  description: "3D renderig studio based in Houston, TX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${poppins.variable} ${dmSans.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
