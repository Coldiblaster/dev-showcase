import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          background: "hsl(166, 76%, 58%)",
        }}
      >
        <span
          style={{
            fontSize: 90,
            fontWeight: 800,
            letterSpacing: -3,
            color: "hsl(222, 47%, 6%)",
            fontFamily: "sans-serif",
          }}
        >
          VB
        </span>
      </div>
    ),
    { ...size },
  );
}
