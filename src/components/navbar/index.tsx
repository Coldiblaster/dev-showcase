import { getBadgePaths } from "@/lib/get-popular-slugs";

import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const badgeMap = await getBadgePaths(10);
  // Map não é serializável via RSC → converte para Record plain object
  const badgePaths = Object.fromEntries(badgeMap) as Record<
    string,
    "popular" | "trending"
  >;
  return <NavbarClient badgePaths={badgePaths} />;
}
