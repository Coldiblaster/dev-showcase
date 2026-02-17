"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const AnimatedButton = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setClicked(!clicked)}
      className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
    >
      {clicked ? "Clicado!" : "Clique aqui"}
    </motion.button>
  );
};

export const LoadingSpinner = () => (
  <div className="flex items-center gap-3">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    <span className="text-sm text-muted-foreground">Carregando...</span>
  </div>
);

export const ToastNotification = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Button onClick={() => setShow(true)}>Mostrar Notificação</Button>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute left-0 top-12 flex items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-lg"
        >
          <Check className="h-5 w-5 text-green-500" />
          <div>
            <p className="font-medium">Sucesso!</p>
            <p className="text-sm text-muted-foreground">
              Ação concluída com sucesso
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShow(false)}
            className="ml-4"
          >
            Fechar
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export const GradientCard = () => (
  <div className="relative overflow-hidden rounded-xl border bg-card p-6 shadow-lg">
    <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent" />
    <div className="relative space-y-2">
      <h3 className="text-lg font-semibold">Card com Gradiente</h3>
      <p className="text-sm text-muted-foreground">
        Card moderno com gradiente sutil no fundo
      </p>
    </div>
  </div>
);

export const componentMap: Record<string, React.ComponentType> = {
  AnimatedButton,
  LoadingSpinner,
  ToastNotification,
  GradientCard,
};
