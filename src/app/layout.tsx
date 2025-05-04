import type { Metadata } from "next";
import {
  raleway,
  poppins,
  dmSans,
  montserratAlternates,
  dreamAvenue,
  kanit,
  firaCode,
} from "./fonts";
import "./globals.css";
import Header from "./components/layout/header/component";
import Footer from "./components/layout/footer/component";

export const metadata: Metadata = {
  title: "Vadas 3D Studio",
  description: "3D rendering studio based in Houston, TX",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "96x96", type: "image/png" },
    ],
    apple: {
      url: "/apple-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  openGraph: {
    type: "website",
    url: "https://vadas3dstudio.com/",
    title: "Vadas 3D Studio",
    description: "3D rendering studio based in Houston, TX",
    images: [
      {
        url: "https://vadas3dstudio.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadas 3D Studio",
    description: "3D rendering studio based in Houston, TX",
    images: ["https://vadas3dstudio.com/og-image.jpg"],
  },
  other: {
    "twitter:domain": "vadas3dstudio.com",
    "twitter:url": "https://vadas3dstudio.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${poppins.variable} ${dmSans.variable} ${montserratAlternates.variable} ${dreamAvenue.variable} ${kanit.variable} ${firaCode.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
