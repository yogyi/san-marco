import type { Metadata } from "next";
import { CraftPage } from "@/components/craft/craft-page";

export const metadata: Metadata = {
  title: "Our Craft",
  description:
    "See how San Marco bedding is precision-quilted and gift-packed in India — from industrial quilting floors to Made-in-India cartons ready for your home.",
  openGraph: {
    title: "Our Craft · San Marco",
    description:
      "Precision quilting, soft loft, and gift-ready finish — Made in India for San Marco Premium Bedding & Comforters.",
    images: [{ url: "/craft/quilting-cream.jpg", width: 1200, height: 1600, alt: "San Marco quilting" }],
  },
};

export default function CraftRoute() {
  return <CraftPage />;
}
