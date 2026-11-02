export const metadata = {
  title: "Shipping & Returns",
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-display text-5xl text-burgundy">Shipping & Returns</h1>
      <div className="mt-8 space-y-6 text-ink/70 leading-relaxed">
        <p>
          Complimentary shipping on orders above ₹1,999. Orders below that threshold include a
          nominal ₹99 dispatch fee.
        </p>
        <p>
          Dispatch typically within 2–4 business days from Panipat. You will receive tracking once
          your bag leaves the atelier.
        </p>
        <p>
          If your piece arrives damaged or incorrect, contact us within 48 hours with photos —
          we will arrange a replacement or return guidance through our concierge desk.
        </p>
        <p>
          Custom / bulk corporate orders may follow a separate timeline shared at quote stage.
        </p>
      </div>
    </div>
  );
}
