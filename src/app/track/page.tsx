"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TrackResponse = {
  ok?: boolean;
  error?: string;
  awb?: string;
  shipment?: Record<string, unknown>;
  transit?: Record<string, unknown>;
};

export default function TrackPage() {
  const [awb, setAwb] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<TrackResponse | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch(`/api/shipping/track?awb=${encodeURIComponent(awb.trim())}`);
      const json = (await res.json()) as TrackResponse;
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Could not find this AWB");
      }
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tracking failed");
    } finally {
      setLoading(false);
    }
  }

  const shipment = data?.shipment as Record<string, unknown> | undefined;
  const transit = data?.transit as Record<string, unknown> | undefined;
  const history = Array.isArray(transit?.scans)
    ? (transit?.scans as Array<Record<string, unknown>>)
    : Array.isArray(transit?.history)
      ? (transit?.history as Array<Record<string, unknown>>)
      : Array.isArray((transit as { data?: unknown })?.data)
        ? (((transit as { data: Array<Record<string, unknown>> }).data) as Array<
            Record<string, unknown>
          >)
        : [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <p className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">Delhivery</p>
      <h1 className="mt-2 font-display text-5xl text-burgundy">Track your order</h1>
      <p className="mt-3 text-ink/65">
        Enter the AWB / waybill number from your dispatch message to see live transit updates.
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-4 border border-gold/25 bg-ivory/40 p-6">
        <div className="space-y-2">
          <Label htmlFor="awb">AWB number</Label>
          <Input
            id="awb"
            value={awb}
            onChange={(e) => setAwb(e.target.value)}
            placeholder="e.g. 1234567890123"
            required
          />
        </div>
        {error ? <p className="text-sm text-burgundy">{error}</p> : null}
        <Button type="submit" disabled={loading || !awb.trim()}>
          {loading ? "Looking up…" : "Track shipment"}
        </Button>
      </form>

      {data?.ok ? (
        <div className="mt-10 space-y-6 border border-gold/25 bg-cream/70 p-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-burgundy/55">AWB</p>
            <p className="font-display text-3xl text-burgundy">{data.awb}</p>
          </div>
          {shipment ? (
            <div className="space-y-1 text-sm text-ink/70">
              <p>
                Status:{" "}
                <span className="font-semibold text-burgundy">
                  {String(
                    shipment.shipment_status ||
                      shipment.status ||
                      shipment.hq_shipment_status ||
                      "In network"
                  )}
                </span>
              </p>
              {shipment.order_number ? <p>Order: {String(shipment.order_number)}</p> : null}
              {shipment.tracking_url ? (
                <p>
                  <a
                    className="underline decoration-gold/50 underline-offset-4"
                    href={String(shipment.tracking_url)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Delhivery tracking page
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}

          {history.length > 0 ? (
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-burgundy/55">Transit</p>
              <ul className="mt-3 space-y-3">
                {history.map((scan, idx) => (
                  <li key={idx} className="border-l border-gold/40 pl-4 text-sm text-ink/70">
                    <p className="font-semibold text-burgundy">
                      {String(scan.status || scan.ScanType || scan.scan_type || "Update")}
                    </p>
                    <p>
                      {String(
                        scan.location ||
                          scan.ScannedLocation ||
                          scan.city ||
                          scan.remark ||
                          scan.Instructions ||
                          ""
                      )}
                    </p>
                    <p className="text-xs text-ink/45">
                      {String(
                        scan.timestamp ||
                          scan.StatusDateTime ||
                          scan.scan_datetime ||
                          scan.time ||
                          ""
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-ink/60">
              Tracking details will appear here once the shipment is manifested and picked up.
            </p>
          )}
        </div>
      ) : null}

      <p className="mt-10 text-sm text-ink/55">
        Need help?{" "}
        <Link href="/contact" className="underline decoration-gold/50 underline-offset-4">
          Contact San Marco
        </Link>
      </p>
    </div>
  );
}
