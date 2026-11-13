import { NextResponse } from "next/server";
import { delhiveryConfigured, getShipmentByAwb, getTransitHistory } from "@/lib/delhivery";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const awb = new URL(req.url).searchParams.get("awb")?.trim() || "";
  if (!awb) {
    return NextResponse.json({ error: "awb required" }, { status: 400 });
  }

  if (!delhiveryConfigured()) {
    return NextResponse.json(
      { ok: false, configured: false, error: "Delhivery not configured" },
      { status: 503 }
    );
  }

  try {
    const [shipment, transit] = await Promise.all([
      getShipmentByAwb(awb),
      getTransitHistory(awb),
    ]);
    return NextResponse.json({ ok: true, configured: true, awb, shipment, transit });
  } catch (error) {
    console.error("Delhivery track error", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Tracking lookup failed",
      },
      { status: 500 }
    );
  }
}
