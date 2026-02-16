import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { IconBadge } from "@/components/icon-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { fadeUp, stagger } from "@/lib/animation-variants";

export default function I18nTroubleshootingSection() {
  const t = useTranslations("i18nPage.troubleshooting");
  const { ref, isInView } = useSectionInView();

  const problems = [
    {
      icon: AlertTriangle,
      title: t("typo.title"),
      error: t("typo.error"),
      solution: t("typo.solution"),
      codeError: t.raw("typo.codeError"),
      codeSolution: t.raw("typo.codeSolution"),
    },
    {
      icon: AlertTriangle,
      title: t("namespace.title"),
      error: t("namespace.error"),
      solution: t("namespace.solution"),
      codeError: t.raw("namespace.codeError"),
      codeSolution: t.raw("namespace.codeSolution"),
    },
    {
      icon: AlertTriangle,
      title: t("ptLeak.title"),
      error: t("ptLeak.error"),
      solution: t("ptLeak.solution"),
      codeError: t.raw("ptLeak.codeError"),
      codeSolution: t.raw("ptLeak.codeSolution"),
    },
    {
      icon: AlertTriangle,
      title: t("tsAutocomplete.title"),
      error: t("tsAutocomplete.error"),
      solution: t("tsAutocomplete.solution"),
      codeError: t.raw("tsAutocomplete.codeError"),
      codeSolution: t.raw("tsAutocomplete.codeSolution"),
      extraTip: (
        <div className="mt-3">
          <span className="inline-block rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {t("tsAutocomplete.extraTip")}
          </span>
        </div>
      ),
    },
    {
      icon: AlertTriangle,
      title: t("missingFile.title"),
      error: t("missingFile.error"),
      solution: t("missingFile.solution"),
      codeError: t.raw("missingFile.codeError"),
      codeSolution: t.raw("missingFile.codeSolution"),
    },
  ];

  return (
    <section ref={ref} className="px-6 py-24 bg-secondary/20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="mb-2 text-3xl font-bold text-foreground md:text-4xl"
          >
            {t("title")}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground">
            {t("description")}
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid gap-6 md:grid-cols-2"
        >
          {problems.map((problem, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Card className="h-full border-border/50 bg-card">
                <CardHeader className="pb-4 flex flex-row items-center gap-2">
                  <IconBadge icon={problem.icon} />
                  <CardTitle className="text-lg font-semibold">
                    {problem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-destructive font-medium">
                    {problem.error}
                  </div>
                  <pre className="mb-2 rounded bg-muted px-3 py-2 text-xs overflow-x-auto">
                    {problem.codeError}
                  </pre>
                  <div className="mb-2 text-success font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    {problem.solution}
                  </div>
                  <pre className="rounded bg-muted px-3 py-2 text-xs overflow-x-auto">
                    {problem.codeSolution}
                  </pre>
                  {problem.extraTip}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
