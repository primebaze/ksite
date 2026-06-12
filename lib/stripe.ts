import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!client) {
    try {
      client = new Stripe(key);
    } catch {
      return null;
    }
  }
  return client;
}

export type Plan = "basic" | "standard" | "premium";

export const PLAN_LABELS: Record<Plan, { name: string; price: string; tagline: string }> = {
  basic: { name: "Basic", price: "£99", tagline: "Get online and take bookings." },
  standard: { name: "Standard", price: "£199", tagline: "Get found and grow." },
  premium: { name: "Premium", price: "£349", tagline: "Hands-off marketing for growth." },
};

export function priceForPlan(plan: Plan): string | undefined {
  const map: Record<Plan, string | undefined> = {
    basic: process.env.STRIPE_PRICE_BASIC,
    standard: process.env.STRIPE_PRICE_STANDARD,
    premium: process.env.STRIPE_PRICE_PREMIUM,
  };
  return map[plan];
}

export type BillingPeriod = "monthly" | "yearly";

// We now sell a single plan, billed monthly (£99) or yearly (2 months free).
// Monthly reuses the existing £99 price; yearly needs its own Stripe price set
// in STRIPE_PRICE_YEARLY (create a £990/yr recurring price for it).
export function priceForBilling(period: BillingPeriod): string | undefined {
  return period === "yearly"
    ? process.env.STRIPE_PRICE_YEARLY
    : process.env.STRIPE_PRICE_MONTHLY ?? process.env.STRIPE_PRICE_BASIC;
}
