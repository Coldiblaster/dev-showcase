import { Resend } from "resend";

import { CHANGELOG, type ChangelogVersion } from "@/data/changelog";
import { jsonError, secureJsonHeaders } from "@/lib/api-security";
import { PERSONAL } from "@/lib/constants";
import { NewsletterTemplate } from "@/lib/email/newsletter-template";
import { redis } from "@/lib/redis";

const NEWSLETTER_KEY = "newsletter:subscribers";

const META_KEYWORDS = [
  "newsletter",
  "redis",
  "broadcast",
  "curl",
  "refatoração",
  "lib/",
  "docs/",
  "documentação",
  "api route",
  "api/",
];

function isMetaEntry(entry: ChangelogVersion): boolean {
  const text = `${entry.title} ${entry.summary}`.toLowerCase();
  return META_KEYWORDS.some((kw) => text.includes(kw));
}

function getNewsletterEntry(): ChangelogVersion {
  const userFacing = CHANGELOG.find((e) => !isMetaEntry(e));
  return userFacing ?? CHANGELOG[0];
}

function getAuthToken(request: Request): string | null {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7).trim();
}

export async function POST(request: Request) {
  try {
    const token = getAuthToken(request);
    const expected = process.env.NEWSLETTER_BROADCAST_TOKEN;

    if (!expected || token !== expected) {
      return jsonError("Unauthorized", 401);
    }

    if (!redis) {
      return jsonError("Redis not configured", 503);
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return jsonError("Resend not configured", 503);
    }

    const subscribers = await redis.smembers(NEWSLETTER_KEY);

    if (subscribers.length === 0) {
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: "No subscribers" }),
        { status: 200, headers: secureJsonHeaders() },
      );
    }

    const entry = getNewsletterEntry();
    const resend = new Resend(apiKey);

    const fromAddress =
      process.env.RESEND_FROM_EMAIL ??
      `${PERSONAL.projectName} <onboarding@resend.dev>`;

    let sent = 0;
    const errors: string[] = [];

    for (const email of subscribers) {
      const { error } = await resend.emails.send({
        from: fromAddress,
        to: [email],
        subject: `[${PERSONAL.projectName}] Novidades: ${entry.title}`,
        react: NewsletterTemplate({ entry }),
      });

      if (error) {
        errors.push(`${email}: ${error.message}`);
      } else {
        sent++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        sent,
        total: subscribers.length,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { status: 200, headers: secureJsonHeaders() },
    );
  } catch (err) {
    console.error("[Newsletter Broadcast] Error:", err);
    return jsonError("Internal server error", 500);
  }
}
