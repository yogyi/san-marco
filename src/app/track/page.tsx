import { Suspense } from "react";
import { TrackClient } from "./track-client";

export const metadata = {
  title: "Track Order",
  description: "Track your San Marco parcel with Delhivery AWB live updates.",
};

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-16 text-ink/60 md:px-8">Loading tracker…</div>
      }
    >
      <TrackClient />
    </Suspense>
  );
}
