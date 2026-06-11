import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

// Brand favicon — emerald "K" mark.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#10b981",
          color: "#000",
          fontSize: 34,
          fontWeight: 800,
          borderRadius: 11,
        }}
      >
        K
      </div>
    ),
    size,
  );
}
