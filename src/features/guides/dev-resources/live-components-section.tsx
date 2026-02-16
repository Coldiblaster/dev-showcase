"use client";

import { motion, useInView } from "framer-motion";
import { BookOpen, Check, Code, Copy, Eye } from "lucide-react";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { showcaseComponents } from "./data/showcase-components";

const AnimatedButton = () => {
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

const LoadingSpinner = () => (
  <div className="flex items-center gap-3">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    <span className="text-sm text-muted-foreground">Carregando...</span>
  </div>
);

const ToastNotification = () => {
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

const GradientCard = () => (
  <div className="relative overflow-hidden rounded-xl border bg-card p-6 shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
    <div className="relative space-y-2">
      <h3 className="text-lg font-semibold">Card com Gradiente</h3>
      <p className="text-sm text-muted-foreground">
        Card moderno com gradiente sutil no fundo
      </p>
    </div>
  </div>
);

const componentMap: Record<string, React.ComponentType> = {
  AnimatedButton,
  LoadingSpinner,
  ToastNotification,
  GradientCard,
};

export function LiveComponentsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="components" className="relative px-6 py-32" ref={ref}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <Badge variant="secondary" className="mb-4 font-mono text-xs">
            Componentes ao Vivo
          </Badge>
          <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Veja, Teste e Aprenda
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Componentes reais que você pode testar, ver o código e entender como
            funcionam
          </p>
        </motion.div>

        {/* Components Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {showcaseComponents.map((item, index) => {
            const Component = componentMap[item.componentKey];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-border bg-card">
                  <Tabs defaultValue="preview" className="w-full">
                    <div className="border-b px-6 pt-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="preview" className="gap-2">
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:inline">Visualizar</span>
                        </TabsTrigger>
                        <TabsTrigger value="code" className="gap-2">
                          <Code className="h-4 w-4" />
                          <span className="hidden sm:inline">Código</span>
                        </TabsTrigger>
                        <TabsTrigger value="explanation" className="gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span className="hidden sm:inline">Explicação</span>
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    {/* Preview Tab */}
                    <TabsContent value="preview" className="p-6">
                      <div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8">
                        {Component && <Component />}
                      </div>
                    </TabsContent>
                    {/* Code Tab */}
                    <TabsContent value="code" className="p-6">
                      <div className="relative">
                        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                          <code className="font-mono">{item.code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute right-2 top-2"
                          onClick={() => handleCopyCode(item.code, item.id)}
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="mr-1 h-3 w-3" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-3 w-3" />
                              Copiar
                            </>
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                    {/* Explanation Tab */}
                    <TabsContent value="explanation" className="p-6">
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                          {item.explanation}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
