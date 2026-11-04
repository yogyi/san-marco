import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sanmarcofurnishings.com"),
  title: {
    default: "San Marco · Premium Bedding & Comforters",
    template: "%s · San Marco",
  },
  description:
    "San Marco Festive Comfort Collection — premium Made-in-India comforters and bedsheet sets. Soft, reversible, gift-ready.",
  applicationName: "San Marco",
  icons: {
    icon: [
      { url: "/brand/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.sanmarcofurnishings.com",
    siteName: "San Marco",
    title: "San Marco · Premium Bedding & Comforters",
    description:
      "San Marco Festive Comfort Collection — premium Made-in-India comforters and bedsheet sets. Soft, reversible, gift-ready.",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 1200,
        alt: "San Marco Premium Bedding & Comforters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "San Marco · Premium Bedding & Comforters",
    description:
      "San Marco Festive Comfort Collection — premium Made-in-India comforters and bedsheet sets. Soft, reversible, gift-ready.",
    images: ["/brand/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} font-sans font-medium`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CartDrawer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
