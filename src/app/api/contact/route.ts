import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { PERSONAL } from "@/lib/constants";
import { ContactEmailTemplate } from "@/lib/email/contact-template";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("[Contact API] RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Serviço de email não configurado" },
        { status: 503 },
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { name, email, message } = parsed.data;
    const resend = new Resend(apiKey);

    const fromAddress =
      process.env.RESEND_FROM_EMAIL ?? "Portfolio VB <onboarding@resend.dev>";
    const toAddress = process.env.RESEND_TO_EMAIL ?? PERSONAL.email;

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: email,
      subject: `Novo contato: ${name}`,
      react: ContactEmailTemplate({ name, email, message }),
    });

    if (error) {
      console.error("[Contact API] Resend error:", error);
      return NextResponse.json(
        { error: "Falha ao enviar email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
