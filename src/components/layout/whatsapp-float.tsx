import { BRAND } from "@/data/products";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi San Marco, I'd like help choosing a comforter.")}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 border border-gold/40 bg-ink px-4 py-3 text-[11px] uppercase tracking-[0.14em] text-ivory shadow-soft transition hover:bg-gold hover:text-ink"
      aria-label="Chat on WhatsApp"
    >
      <span className="h-2 w-2 rounded-full bg-gold" />
      Concierge
    </a>
  );
}
