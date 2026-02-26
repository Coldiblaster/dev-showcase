import { Resend } from "resend";
import { z } from "zod";

import {
  checkBodySize,
  jsonError,
  safeParseBody,
  sanitizeUserInput,
  secureJsonHeaders,
} from "@/lib/api-security";
import { PERSONAL } from "@/lib/constants";
import { getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { rateLimitAsync } from "@/lib/redis-rate-limit";

const newsletterSchema = z.object({
  email: z.string().email(),
  website: z.string().max(0, "Spam detected").optional(),
});

const MAX_BODY_SIZE = 500;

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = await rateLimitAsync(ip, {
      prefix: "newsletter",
      limit: 3,
      windowSeconds: 3600,
    });
    if (!rl.success) return rateLimitResponse(rl);

    const sizeError = checkBodySize(request, MAX_BODY_SIZE);
    if (sizeError) return sizeError;

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("[Newsletter API] RESEND_API_KEY not configured");
      return jsonError("Service not configured", 503);
    }

    const bodyResult = await safeParseBody(request);
    if ("error" in bodyResult) return bodyResult.error;

    const parsed = newsletterSchema.safeParse(bodyResult.data);

    if (!parsed.success) {
      return jsonError("Invalid email", 400);
    }

    const { email } = parsed.data;

    const resend = new Resend(apiKey);

    const fromAddress =
      process.env.RESEND_FROM_EMAIL ?? "Portfolio VB <onboarding@resend.dev>";
    const toAddress = process.env.RESEND_TO_EMAIL ?? PERSONAL.email;

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject: `[Newsletter] Novo inscrito: ${sanitizeUserInput(email)}`,
      text: `Novo inscrito no newsletter:\n\nEmail: ${email}\nData: ${new Date().toISOString()}`,
    });

    if (error) {
      console.error("[Newsletter API] Resend error:", error);
      return jsonError("Failed to subscribe", 500);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: secureJsonHeaders(),
    });
  } catch (err) {
    console.error("[Newsletter API] Unexpected error:", err);
    return jsonError("Internal server error", 500);
  }
}
