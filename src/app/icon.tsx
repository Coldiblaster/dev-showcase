import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        background: "hsl(166, 76%, 58%)",
      }}
    >
      <span
        style={{
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: -0.5,
          color: "hsl(222, 47%, 6%)",
          fontFamily: "sans-serif",
        }}
      >
        VB
      </span>
    </div>,
    { ...size },
  );
}
