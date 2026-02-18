"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Code2, Rocket } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const contentPreviews: Record<
  string,
  { preview: ReactNode; code: string }
> = {
  featureCard: {
    preview: (
      <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-3">
        <motion.div whileHover={{ y: -2 }} className="h-full">
          <Card className="h-full border-border bg-card/50">
            <CardHeader className="p-4 pb-1">
              <CardTitle className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                Feature
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-muted-foreground">Description</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="h-full">
          <Card className="h-full border-border bg-card/50">
            <CardHeader className="p-4 pb-1">
              <CardTitle className="flex items-center gap-2 text-sm text-foreground">
                <Rocket className="h-3.5 w-3.5 text-primary" />
                Deploy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-muted-foreground">Ship fast</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    ),
    code: `<FeatureCard
  title="Feature"
  description="Description text"
  icon={CheckCircle2}
/>`,
  },

  stepCard: {
    preview: (
      <div className="mx-auto flex w-full max-w-sm items-stretch gap-3">
        <motion.div whileHover={{ y: -3 }} className="flex-1">
          <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-4 text-center">
            <div className="font-mono text-xs font-bold text-primary/40">
              01
            </div>
            <div className="mx-auto my-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <h4 className="text-sm font-semibold">Fork</h4>
            <p className="text-xs text-muted-foreground">Clone the repo</p>
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -3 }} className="flex-1">
          <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card/50 p-4 text-center">
            <div className="font-mono text-xs font-bold text-primary/40">
              02
            </div>
            <div className="mx-auto my-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <h4 className="text-sm font-semibold">Deploy</h4>
            <p className="text-xs text-muted-foreground">Ship to prod</p>
          </div>
        </motion.div>
      </div>
    ),
    code: `<StepCard
  icon={Code2}
  title="Fork"
  description="Clone the repo"
  step={1}
/>`,
  },

  codeBlock: {
    preview: (
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-border bg-[hsl(220,40%,6%)]">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">
              example.tsx
            </span>
          </div>
        </div>
        <pre className="p-3 font-mono text-xs text-foreground/90">
          <code>{`const greeting = "Hello";
console.log(greeting);`}</code>
        </pre>
      </div>
    ),
    code: `<CodeBlock
  title="example.tsx"
  code={\`const greeting = "Hello";
console.log(greeting);\`}
/>`,
  },

  viewSource: {
    preview: (
      <div className="mx-auto w-full max-w-sm">
        <div className="relative rounded-xl border border-border bg-card/50 p-4">
          <div className="text-center text-sm text-muted-foreground">
            Rendered content
          </div>
          <div className="absolute right-2 top-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 text-[10px]"
            >
              <Code2 className="h-3 w-3" />
              Source
            </Button>
          </div>
        </div>
      </div>
    ),
    code: `<ViewSource
  code={\`<Component prop="value" />\`}
  filePath="src/components/example.tsx"
>
  <Component prop="value" />
</ViewSource>`,
  },
};
