/**
 * Exemplos de código do showcase Formulário de Contato.
 * Código fora dos JSONs para evitar problemas com next-intl.
 */

export const ZOD_SCHEMA_CODE = `import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  recaptchaToken: z.string().nullable().optional(),
});

type ContactPayload = z.infer<typeof contactSchema>;`;

export const API_ROUTE_SKELETON_CODE = `// app/api/contact/route.ts
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Invalid data" },
      { status: 400 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "you@yourdomain.com",
    to: "dest@example.com",
    subject: \`Contact: \${parsed.data.name}\`,
    text: parsed.data.message,
  });

  if (error) {
    return Response.json({ error: "Send failed" }, { status: 503 });
  }
  return Response.json({ ok: true });
}`;

/** Exemplo direto na API com Resend (lib usada neste projeto). Doc: https://resend.com/docs */
export const RESEND_API_CODE = `// app/api/contact/route.ts
import { Resend } from "resend";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  // In production: validate body with Zod (see API section above)
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "you@example.com",
    subject: \`Contato: \${name}\`,
    replyTo: email,
    text: message,
  });

  if (error) return Response.json({ error: error.message }, { status: 503 });
  return Response.json({ ok: true });
}`;

/** Exemplo direto na API com Nodemailer (SMTP). Doc: https://nodemailer.com/ */
export const NODEMAILER_API_CODE = `// app/api/contact/route.ts
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  // In production: validate body with Zod first

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM,
      to: "you@example.com",
      replyTo: email,
      subject: \`Contato: \${name}\`,
      text: message,
    });
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: "Send failed" }, { status: 503 });
  }
}`;

export const CLIENT_FETCH_CODE = `// In the form component
const res = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    message: formData.message,
  }),
});

if (!res.ok) {
  const data = await res.json();
  setError(data.error ?? "Send failed");
  return;
}
// Success: show message and clear form`;
