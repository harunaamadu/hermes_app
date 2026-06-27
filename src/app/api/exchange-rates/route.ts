import { NextResponse } from "next/server";
import { ExchangeRates } from "@/types/currency";

export const revalidate = 3600;

const BASE_CURRENCY = "USD";

export async function GET() {
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${BASE_CURRENCY}`, {
      next: { revalidate },
    });

    if (!res.ok) throw new Error(`Provider responded with ${res.status}`);

    const data = await res.json();

    if (data.result !== "success" || !data.rates) {
      throw new Error(`Provider returned an unexpected payload: ${JSON.stringify(data).slice(0, 200)}`);
    }

    const payload: ExchangeRates = {
      base: BASE_CURRENCY,
      rates: { [BASE_CURRENCY]: 1, ...data.rates },
      fetchedAt: Date.now(),
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error("[api/exchange-rates] failed to fetch live rates", error);
    return NextResponse.json({ error: "Unable to fetch exchange rates" }, { status: 502 });
  }
}