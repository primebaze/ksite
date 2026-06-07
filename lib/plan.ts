// Plan-tier capabilities.
export type Plan = "basic" | "standard" | "premium";

export function canUploadImages(plan: string | null | undefined): boolean {
  return plan === "standard" || plan === "premium";
}
export function canUploadVideo(plan: string | null | undefined): boolean {
  return plan === "premium";
}
