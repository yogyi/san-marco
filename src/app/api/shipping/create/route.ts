import { NextResponse } from "next/server";
import { createDelhiverySaleOrder, delhiveryConfigured } from "@/lib/delhivery";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    if (!delhiveryConfigured()) {
      return NextResponse.json(
        {
          ok: false,
          configured: false,
          error: "Delhivery not configured. Add D1_* env vars.",
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const orderId = String(body?.orderId || "").trim();
    const customerName = String(body?.customerName || body?.name || "").trim();
    const phone = String(body?.phone || "").trim();
    const pincode = String(body?.pincode || "").trim();
    const address = String(body?.address || "").trim();

    if (!orderId || !customerName || !phone || !pincode || !address) {
      return NextResponse.json(
        { error: "orderId, customerName, phone, address, and pincode are required" },
        { status: 400 }
      );
    }

    const shipment = await createDelhiverySaleOrder({
      orderId,
      customerName,
      customerEmail: String(body?.customerEmail || body?.email || "").trim(),
      phone,
      address,
      city: String(body?.city || "").trim(),
      state: String(body?.state || "").trim(),
      pincode,
      payment: String(body?.payment || "prepaid"),
      items: Array.isArray(body?.items) ? body.items : [],
      total: Number(body?.totals?.total ?? body?.total) || 0,
    });

    return NextResponse.json({
      ok: true,
      configured: true,
      ...shipment,
    });
  } catch (error) {
    console.error("Delhivery create error", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to create Delhivery order",
      },
      { status: 500 }
    );
  }
}
