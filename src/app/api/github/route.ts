import { NextResponse } from "next/server";

import { PERSONAL } from "@/lib/constants";

const GITHUB_USERNAME = PERSONAL.githubUsername;
/** TTL do cache em ms (1 hora). */
const CACHE_TTL = 3600 * 1000; // 1 hour

let cache: { data: GitHubStats | null; updatedAt: number } = {
  data: null,
  updatedAt: 0,
};

/** Estrutura dos dados retornados pela API de estatísticas do GitHub. */
interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number }[];
  recentActivity: { repo: string; message: string; date: string }[];
  avatarUrl: string;
  bio: string;
}

/** Handler GET que retorna estatísticas agregadas do perfil GitHub. */
export async function GET() {
  try {
    const now = Date.now();
    if (cache.data && now - cache.updatedAt < CACHE_TTL) {
      return NextResponse.json(cache.data, {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    const userRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      },
    );

    if (!userRes.ok) throw new Error("GitHub API error");
    const user = await userRes.json();

    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      },
    );
    const repos = await reposRes.json();

    const totalStars = Array.isArray(repos)
      ? repos.reduce(
          (sum: number, r: { stargazers_count?: number }) =>
            sum + (r.stargazers_count || 0),
          0,
        )
      : 0;

    const langCount: Record<string, number> = {};
    if (Array.isArray(repos)) {
      for (const repo of repos) {
        if (repo.language) {
          langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
      }
    }
    const totalLangs = Object.values(langCount).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalLangs) * 100),
      }));

    const eventsRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=5`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      },
    );
    const events = await eventsRes.json();

    const recentActivity = Array.isArray(events)
      ? events
          .filter((e: { type: string }) => e.type === "PushEvent")
          .slice(0, 3)
          .map(
            (e: {
              repo?: { name?: string };
              payload?: { commits?: { message?: string }[] };
              created_at: string;
            }) => ({
              repo: e.repo?.name?.replace(`${GITHUB_USERNAME}/`, "") || "",
              message:
                e.payload?.commits?.[0]?.message?.slice(0, 60) || "Update",
              date: e.created_at,
            }),
          )
      : [];

    const stats: GitHubStats = {
      publicRepos: user.public_repos || 0,
      followers: user.followers || 0,
      totalStars,
      topLanguages,
      recentActivity,
      avatarUrl: user.avatar_url || "",
      bio: user.bio || "",
    };

    cache = { data: stats, updatedAt: now };
    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    if (cache.data) return NextResponse.json(cache.data);
    return NextResponse.json(
      {
        publicRepos: 0,
        followers: 0,
        totalStars: 0,
        topLanguages: [],
        recentActivity: [],
        avatarUrl: "",
        bio: "",
      },
      { status: 500 },
    );
  }
}
