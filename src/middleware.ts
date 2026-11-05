import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GEO_COOKIE, MARKET_COOKIE, marketFromCountry } from "@/data/markets";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const country =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    "";

  if (country) {
    res.cookies.set(GEO_COOKIE, country.toUpperCase(), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  if (!req.cookies.get(MARKET_COOKIE)?.value && country) {
    const market = marketFromCountry(country);
    res.cookies.set(MARKET_COOKIE, market.id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/|craft/|hero/|products/).*)"],
};
