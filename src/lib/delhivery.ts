import { randomUUID } from "crypto";

type TokenCache = { accessToken: string; expiresAt: number };

let tokenCache: TokenCache | null = null;

const ORIGIN_PIN = "122017";

export function delhiveryConfigured() {
  return Boolean(
    process.env.D1_CLIENT_ID?.trim() &&
      process.env.D1_CLIENT_SECRET?.trim() &&
      process.env.D1_AUTH_URL?.trim() &&
      process.env.D1_REALM?.trim() &&
      process.env.D1_CLIENT_CMS?.trim() &&
      process.env.D1_MCP_URL?.trim() &&
      process.env.D1_CHANNEL_ID?.trim() &&
      process.env.D1_FACILITY_ID?.trim() &&
      process.env.D1_WAREHOUSE_UUID?.trim()
  );
}

function tokenUrl() {
  const auth = process.env.D1_AUTH_URL!.replace(/\/$/, "");
  const realm = process.env.D1_REALM!;
  return `${auth}/realms/${realm}/protocol/openid-connect/token`;
}

async function getAccessToken() {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 30_000) {
    return tokenCache.accessToken;
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.D1_CLIENT_ID!,
    client_secret: process.env.D1_CLIENT_SECRET!,
  });

  const res = await fetch(tokenUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Delhivery auth failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("Delhivery auth missing access_token");

  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + (data.expires_in || 300) * 1000,
  };
  return data.access_token;
}

function parseSseOrJson(text: string) {
  for (const line of text.split("\n")) {
    if (line.startsWith("data: ")) {
      return JSON.parse(line.slice(6)) as Record<string, unknown>;
    }
  }
  return JSON.parse(text) as Record<string, unknown>;
}

export async function callDelhiveryTool<T = unknown>(
  name: string,
  arguments_: Record<string, unknown>
): Promise<T> {
  const token = await getAccessToken();
  const requestId = randomUUID();

  const res = await fetch(process.env.D1_MCP_URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-hq-client-id": process.env.D1_CLIENT_CMS!,
      "X-UCP-User-Email": process.env.D1_USER_EMAIL?.trim() || "--",
      "X-UCP-Realm": process.env.D1_REALM!,
      "X-Request-ID": requestId,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name, arguments: arguments_ },
    }),
    cache: "no-store",
  });

  const raw = await res.text();
  if (!res.ok) {
    throw new Error(`Delhivery tool ${name} failed (${res.status}): ${raw.slice(0, 240)}`);
  }

  const data = parseSseOrJson(raw);
  const result = (data.result || {}) as { content?: Array<{ text?: string }> };
  const text = result.content?.[0]?.text;
  if (!text) return data as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    return text as T;
  }
}

export type DelhiveryShipmentInput = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment: string;
  items: Array<{ name: string; variantLabel?: string; quantity: number; price: number }>;
  total: number;
};

function splitName(full: string) {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: "Customer", last: "NA" };
  if (parts.length === 1) return { first: parts[0], last: "NA" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return digits.slice(-10) || phone;
}

export async function createDelhiverySaleOrder(input: DelhiveryShipmentInput) {
  const { first, last } = splitName(input.customerName);
  const phone = normalizePhone(input.phone);
  const pin = input.pincode.trim();
  const paymentMode = input.payment === "cod" ? "COD" : "Prepaid";
  const qty = Math.max(
    1,
    input.items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
  );
  const weight = Math.max(0.8, Number((qty * 1.2).toFixed(2)));
  const skuName =
    input.items.length === 1
      ? `${input.items[0].name}${input.items[0].variantLabel ? ` ${input.items[0].variantLabel}` : ""}`
      : `San Marco order (${input.items.map((i) => i.name).join(", ")})`;

  const payload: Record<string, unknown> = {
    channel_id: process.env.D1_CHANNEL_ID,
    source_order_number: input.orderId,
    facility_id: process.env.D1_FACILITY_ID,
    client_warehouse_uuid: process.env.D1_WAREHOUSE_UUID,
    payment_mode: paymentMode,
    first_name: first,
    last_name: last,
    phone,
    email: input.customerEmail,
    address_line1: input.address.slice(0, 190),
    pin_code: pin,
    city: input.city || "NA",
    state: input.state || "NA",
    country: "IN",
    billing_same_as_shipping: true,
    billing_address_first_name: first,
    billing_address_last_name: last,
    billing_address_phone: phone,
    billing_address_email: input.customerEmail,
    billing_address_address_line1: input.address.slice(0, 190),
    billing_address_pin_code: pin,
    billing_address_city: input.city || "NA",
    billing_address_state: input.state || "NA",
    billing_address_country: "IN",
    sku_code: `SM-${input.orderId}`.slice(0, 40),
    sku_name: skuName.slice(0, 120),
    quantity: 1,
    unit_price: Number(input.total) || 0,
    weight,
    length: 40,
    breadth: 30,
    height: Math.min(40, 8 + qty * 4),
    packaging_type: "Flyer",
    shipping_mode: "SURFACE",
    order_source: "CUSTOM",
    seller_name: "KARM BABA VENTURES PRIVATE LIMITED",
  };

  if (paymentMode === "COD") {
    payload.cod_amount = Number(input.total) || 0;
  }

  const result = await callDelhiveryTool<{
    success?: boolean;
    message?: string;
    data?: {
      id?: string;
      order_number?: string;
      awb_number?: string;
      shipment_status?: string;
      shipping_address_validity?: string;
    };
    error_code?: string;
  }>("create-sale-order-b2c", payload);

  if (!result?.success && !result?.data?.id) {
    throw new Error(result?.message || result?.error_code || "Delhivery create order failed");
  }

  return {
    saleOrderId: String(result.data?.id || ""),
    orderNumber: String(result.data?.order_number || input.orderId),
    awbNumber: String(result.data?.awb_number || ""),
    shipmentStatus: String(result.data?.shipment_status || "AWAITING_LABEL"),
    addressValidity: String(result.data?.shipping_address_validity || ""),
    raw: result,
  };
}

export async function checkPincodeServiceable(destinationPin: string) {
  const pin = destinationPin.trim();
  if (!/^\d{6}$/.test(pin)) {
    return { ok: false as const, serviceable: false, message: "Enter a valid 6-digit PIN code." };
  }

  // Lightweight probe: create is validated later; use wallet rate endpoint when available.
  // Fallback heuristic: Indian 6-digit PIN is accepted; Delhivery returns address validity on create.
  try {
    const result = await callDelhiveryTool<Record<string, unknown>>("bulk-rate-calculator", {
      id: "svc-1",
      origin_pin: process.env.D1_ORIGIN_PIN?.trim() || ORIGIN_PIN,
      destination_pin: pin,
      shipping_mode: "SURFACE",
      weight: 1.2,
      weight_unit: "kg",
      payment_mode: "Prepaid",
      length: 40,
      breadth: 30,
      height: 12,
    });

    if (result?.error_code) {
      // Rate API may be gated; still allow checkout and validate on create.
      return {
        ok: true as const,
        serviceable: true,
        message: "PIN accepted. Final serviceability is confirmed at dispatch.",
        quote: null,
      };
    }

    return {
      ok: true as const,
      serviceable: true,
      message: "Delhivery delivers to this PIN.",
      quote: result,
    };
  } catch {
    return {
      ok: true as const,
      serviceable: true,
      message: "PIN accepted. Final serviceability is confirmed at dispatch.",
      quote: null,
    };
  }
}

export async function getTransitHistory(awbNumber: string) {
  return callDelhiveryTool("get-awb-transit-history", { awb_number: awbNumber.trim() });
}

export async function getShipmentByAwb(awbNumber: string) {
  return callDelhiveryTool("get-shipment-details-by-awb", { awb_number: awbNumber.trim() });
}

const DEFAULT_SHIPPING_RELAY =
  "https://san-marco-beta.vercel.app/api/shipping/create";

export function shippingRelayUrl() {
  return (
    process.env.D1_SHIPPING_RELAY_URL?.trim() ||
    process.env.EMAIL_RELAY_URL?.trim()?.replace(/\/api\/orders\/confirm$/, "/api/shipping/create") ||
    DEFAULT_SHIPPING_RELAY
  );
}

export async function createDelhiverySaleOrderViaRelay(input: DelhiveryShipmentInput) {
  const res = await fetch(shippingRelayUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: input.orderId,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      phone: input.phone,
      address: input.address,
      city: input.city,
      state: input.state,
      pincode: input.pincode,
      payment: input.payment,
      items: input.items,
      totals: { total: input.total },
      total: input.total,
    }),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    saleOrderId?: string;
    awbNumber?: string;
    shipmentStatus?: string;
    addressValidity?: string;
    error?: string;
  };
  if (!res.ok || !data.ok) {
    throw new Error(data.error || `Shipping relay HTTP ${res.status}`);
  }
  return {
    saleOrderId: String(data.saleOrderId || ""),
    orderNumber: input.orderId,
    awbNumber: String(data.awbNumber || ""),
    shipmentStatus: String(data.shipmentStatus || ""),
    addressValidity: String(data.addressValidity || ""),
    raw: data,
  };
}
