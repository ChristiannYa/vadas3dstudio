import type { Metadata } from "next";
import { AuthProvider, StoreProvider } from "./providers";
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
/*
import {
  selectCartTabStatus,
  selectOrderStatus,
} from "@/lib/features/cart/cartSlice";
*/

export const metadata: Metadata = {
  title: "Vadas 3D Studio",
  description: "3D rendering studio based in Houston, TX",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180" },
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
        <AuthProvider>
          <StoreProvider>
            <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
              <Header />
              <main className="h-full">{children}</main>
              <Footer />
            </div>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
