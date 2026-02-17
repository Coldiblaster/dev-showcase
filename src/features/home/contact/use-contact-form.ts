"use client";

import { useCallback, useState } from "react";

import { useRecaptcha } from "@/components/recaptcha-provider";

export type FormStatus = "idle" | "sending" | "sent" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface FormState {
  name: string;
  email: string;
  message: string;
  website: string;
}

interface UseContactFormOptions {
  validationName: string;
  validationEmail: string;
  validationMessage: string;
}

/** Hook com lógica do formulário de contato: estado, validação e envio. */
export function useContactForm({
  validationName,
  validationEmail,
  validationMessage,
}: UseContactFormOptions) {
  const { executeRecaptcha } = useRecaptcha();

  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (formState.name.trim().length < 2) {
      newErrors.name = validationName;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      newErrors.email = validationEmail;
    }

    if (formState.message.trim().length < 10) {
      newErrors.message = validationMessage;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState, validationName, validationEmail, validationMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    if (formState.website) return;

    setStatus("sending");
    setErrors({});

    try {
      const recaptchaToken = await executeRecaptcha("contact");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          recaptchaToken,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      setFormState({ name: "", email: "", message: "", website: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((s) => ({ ...s, [field]: value }));
  };

  return {
    formState,
    status,
    errors,
    isSending: status === "sending",
    updateField,
    handleSubmit,
  };
}
