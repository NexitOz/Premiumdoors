import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "#15171b",
          borderRadius: 7,
        }}
      >
        <svg width="16" height="18" viewBox="0 0 14 16" fill="none">
          <rect x="1" y="0.75" width="10" height="14.5" rx="1" stroke="#f4f5f7" strokeWidth="1.4" />
          <circle cx="8.4" cy="8" r="0.9" fill="#f4f5f7" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
