import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kovasite — Websites for local businesses";

// Default social share image for the marketing site (per-tenant sites supply
// their own og_image_url).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 90,
          background: "#000",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 15,
              background: "#10b981",
              color: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 32, fontWeight: 600 }}>{SITE_NAME}</div>
        </div>
        <div style={{ marginTop: 48, fontSize: 76, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2 }}>
          Websites for local businesses
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.6)" }}>
          Live in under 5 minutes · booking · free domain · £99/mo
        </div>
      </div>
    ),
    size,
  );
}
