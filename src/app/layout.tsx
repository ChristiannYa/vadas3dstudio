import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/layout/header/Header";

export const metadata: Metadata = {
  title: "Vada 3D Studio",
  description: "3D renderig studio based in Houston, TX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
