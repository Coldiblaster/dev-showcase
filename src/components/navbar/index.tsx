import { getPopularSlugs } from "@/lib/get-popular-slugs";

import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const popularSlugs = await getPopularSlugs(10);
  return <NavbarClient popularSlugs={popularSlugs} />;
}
