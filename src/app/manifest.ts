import type { MetadataRoute } from "next";

import { PERSONAL } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PERSONAL.name} — Developer Portfolio`,
    short_name: "VB Portfolio",
    description: `${PERSONAL.name}'s developer portfolio. ${PERSONAL.role} specialized in React, Next.js & React Native.`,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1a",
    theme_color: "#0a0f1a",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
