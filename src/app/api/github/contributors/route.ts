import { NextRequest, NextResponse } from "next/server";

import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

const REPO_OWNER = "Coldiblaster";
const REPO_NAME = "dev-showcase";
const CACHE_TTL = 3600 * 1000;

/** Dados de um contribuidor do GitHub. */
export interface Contributor {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  contributions: number;
}

let cache: { data: Contributor[] | null; updatedAt: number } = {
  data: null,
  updatedAt: 0,
};

/** Retorna a lista de contribuidores do repositório. */
export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rl = rateLimit(ip, {
      prefix: "github-contributors",
      limit: 30,
      windowSeconds: 60,
    });
    if (!rl.success) return rateLimitResponse(rl);

    const now = Date.now();
    if (cache.data && now - cache.updatedAt < CACHE_TTL) {
      return NextResponse.json(cache.data, {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=50`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) throw new Error("GitHub API error");

    const raw = await res.json();
    const contributors: Contributor[] = Array.isArray(raw)
      ? raw
          .filter((c: { type?: string }) => c.type === "User")
          .map(
            (c: {
              login: string;
              avatar_url: string;
              html_url: string;
              contributions: number;
            }) => ({
              login: c.login,
              avatarUrl: c.avatar_url,
              profileUrl: c.html_url,
              contributions: c.contributions,
            }),
          )
      : [];

    cache = { data: contributors, updatedAt: now };
    return NextResponse.json(contributors, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub Contributors API error:", error);
    if (cache.data) return NextResponse.json(cache.data);
    return NextResponse.json([], { status: 500 });
  }
}
