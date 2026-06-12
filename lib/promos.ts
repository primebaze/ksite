import "server-only";
import type Stripe from "stripe";
import { getStripe } from "./stripe";

// Promo codes are managed straight in Stripe (the source of truth that applies
// them at checkout), driven from the admin console so staff never touch the
// Stripe dashboard. A "promo code" in Stripe = a Coupon (the discount) + a
// Promotion Code (the customer-facing string).

export interface PromoView {
  id: string;
  code: string;
  active: boolean;
  discount: string;
  redemptions: number;
  maxRedemptions: number | null;
  expiresAt: number | null;
}

function discountLabel(c: Stripe.Coupon): string {
  const amount = c.percent_off
    ? `${c.percent_off}% off`
    : c.amount_off
      ? `£${(c.amount_off / 100).toFixed(2)} off`
      : "—";
  const dur =
    c.duration === "repeating" ? ` · ${c.duration_in_months}mo` : c.duration === "forever" ? " · forever" : " · once";
  return amount + dur;
}

export async function listPromotions(): Promise<PromoView[]> {
  const stripe = getStripe();
  if (!stripe) return [];
  const res = await stripe.promotionCodes.list({ limit: 100, expand: ["data.coupon"] });
  return res.data.map((pc) => {
    const p = pc as unknown as {
      id: string; code: string; active: boolean; coupon: Stripe.Coupon;
      times_redeemed: number; max_redemptions: number | null; expires_at: number | null;
    };
    return {
      id: p.id,
      code: p.code,
      active: p.active,
      discount: discountLabel(p.coupon),
      redemptions: p.times_redeemed,
      maxRedemptions: p.max_redemptions ?? null,
      expiresAt: p.expires_at ?? null,
    };
  });
}

export async function createPromotion(input: {
  code: string;
  kind: "percent" | "amount";
  value: number; // percent (1–100) or £ amount
  duration: "once" | "forever" | "repeating";
  months?: number;
  maxRedemptions?: number;
}): Promise<void> {
  const stripe = getStripe();
  if (!stripe) throw new Error("Billing isn't configured.");
  const code = input.code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!code) throw new Error("Enter a code (letters/numbers).");
  if (!(input.value > 0)) throw new Error("Enter a discount greater than zero.");
  if (input.kind === "percent" && input.value > 100) throw new Error("Percentage can't exceed 100.");

  const couponParams: Stripe.CouponCreateParams = { duration: input.duration, name: code };
  if (input.kind === "percent") couponParams.percent_off = input.value;
  else {
    couponParams.amount_off = Math.round(input.value * 100);
    couponParams.currency = "gbp";
  }
  if (input.duration === "repeating") couponParams.duration_in_months = Math.max(1, input.months ?? 1);

  const coupon = await stripe.coupons.create(couponParams);
  // `coupon` is still accepted by the Promotion Codes REST endpoint even though
  // the pinned SDK types moved to `promotion`; cast through unknown to compile.
  const promoParams = {
    coupon: coupon.id,
    code,
    ...(input.maxRedemptions && input.maxRedemptions > 0 ? { max_redemptions: input.maxRedemptions } : {}),
  } as unknown as Stripe.PromotionCodeCreateParams;
  await stripe.promotionCodes.create(promoParams);
}

export async function setPromotionActive(id: string, active: boolean): Promise<void> {
  const stripe = getStripe();
  if (!stripe) return;
  await stripe.promotionCodes.update(id, { active });
}
