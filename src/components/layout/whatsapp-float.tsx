import { BRAND } from "@/data/products";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi San Marco, I'd like help choosing a comforter.")}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 2.9 17.7L2 22l4.4-.9A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.6.5.5-2.5-.2-.3a9 9 0 1 1 7.2 3.8zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3-.1-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3a2 2 0 0 0-.6 1.5 3.5 3.5 0 0 0 .7 1.9 8 8 0 0 0 3.1 3 10.6 10.6 0 0 0 2.2.9h.5c.4 0 .8-.1 1.1-.3a3 3 0 0 0 1-.7 2.4 2.4 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3z" />
      </svg>
    </a>
  );
}
