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
import { ContactEmailTemplate } from "@/lib/email/contact-template";
import { getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { rateLimitAsync } from "@/lib/redis-rate-limit";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  recaptchaToken: z.string().nullable().optional(),
  website: z.string().max(0, "Spam detected").optional(),
});

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_THRESHOLD = 0.5;
const MAX_BODY_SIZE = 8_000;

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET) return true;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET,
        response: token,
      }),
    });

    const data = await res.json();
    return data.success && (data.score ?? 0) >= RECAPTCHA_THRESHOLD;
  } catch (err) {
    console.error("[Contact API] reCAPTCHA verification failed:", err);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rl = await rateLimitAsync(ip, {
      prefix: "contact",
      limit: 5,
      windowSeconds: 300,
    });
    if (!rl.success) return rateLimitResponse(rl);

    const sizeError = checkBodySize(request, MAX_BODY_SIZE);
    if (sizeError) return sizeError;

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("[Contact API] RESEND_API_KEY not configured");
      return jsonError("Email service not configured", 503);
    }

    const bodyResult = await safeParseBody(request);
    if ("error" in bodyResult) return bodyResult.error;

    const parsed = contactSchema.safeParse(bodyResult.data);

    if (!parsed.success) {
      return jsonError("Invalid data", 400);
    }

    const { name, email, message, recaptchaToken } = parsed.data;

    if (RECAPTCHA_SECRET) {
      if (!recaptchaToken) {
        return jsonError("reCAPTCHA token required", 400);
      }
      const isHuman = await verifyRecaptcha(recaptchaToken);
      if (!isHuman) {
        return jsonError("reCAPTCHA verification failed", 403);
      }
    }

    const resend = new Resend(apiKey);

    const fromAddress =
      process.env.RESEND_FROM_EMAIL ??
      `${PERSONAL.projectName} <onboarding@resend.dev>`;
    const toAddress = process.env.RESEND_TO_EMAIL ?? PERSONAL.email;

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `Novo contato: ${sanitizeUserInput(name)}`,
      react: ContactEmailTemplate({
        name: sanitizeUserInput(name),
        email,
        message: sanitizeUserInput(message),
      }),
    });

    if (error) {
      console.error("[Contact API] Resend error:", error);
      return jsonError("Failed to send email", 500);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: secureJsonHeaders(),
    });
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return jsonError("Internal server error", 500);
  }
}
