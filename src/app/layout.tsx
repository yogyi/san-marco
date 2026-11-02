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
  title: {
    default: "San Marco · Premium Bedding & Comforters",
    template: "%s · San Marco",
  },
  description:
    "San Marco Festive Comfort Collection — premium Made-in-India comforters and bedsheet sets. Soft, reversible, gift-ready.",
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
