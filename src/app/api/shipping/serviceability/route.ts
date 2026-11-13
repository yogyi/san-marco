import { NextResponse } from "next/server";
import { checkPincodeServiceable, delhiveryConfigured } from "@/lib/delhivery";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const pin = new URL(req.url).searchParams.get("pin")?.trim() || "";
  if (!pin) {
    return NextResponse.json({ error: "pin required" }, { status: 400 });
  }

  if (!delhiveryConfigured()) {
    const ok = /^\d{6}$/.test(pin);
    return NextResponse.json({
      ok,
      serviceable: ok,
      configured: false,
      message: ok
        ? "PIN looks valid. Delhivery credentials not configured on this server."
        : "Enter a valid 6-digit PIN code.",
    });
  }

  const result = await checkPincodeServiceable(pin);
  return NextResponse.json({ ...result, configured: true });
}
