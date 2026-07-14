import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(155deg, #15171b 0%, #0e1013 100%)",
          color: "#f4f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              border: "1.5px solid rgba(244,245,247,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            ▢
          </div>
          <div style={{ fontSize: 26, letterSpacing: 4, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 600, marginTop: 48, maxWidth: 900, lineHeight: 1.15 }}>
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 28, color: "#9aa1a9", maxWidth: 780 }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
