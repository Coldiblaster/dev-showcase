"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ButtonPreview() {
  const t = useTranslations("designSystemPage.previews.primitives");
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>{t("default")}</Button>
        <Button variant="destructive">{t("destructive")}</Button>
        <Button variant="outline">{t("outline")}</Button>
        <Button variant="secondary">{t("secondary")}</Button>
        <Button variant="ghost">{t("ghost")}</Button>
        <Button variant="link">{t("link")}</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button size="sm">{t("small")}</Button>
        <Button size="default">{t("default")}</Button>
        <Button size="lg">{t("large")}</Button>
      </div>
    </div>
  );
}

function BadgePreview() {
  const t = useTranslations("designSystemPage.previews.primitives");
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Badge>{t("default")}</Badge>
      <Badge variant="secondary">{t("secondary")}</Badge>
      <Badge variant="destructive">{t("destructive")}</Badge>
      <Badge variant="outline">{t("outline")}</Badge>
    </div>
  );
}

function InputPreview() {
  const t = useTranslations("designSystemPage.previews.primitives");
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <Input placeholder={t("typeSomething")} />
      <Input placeholder={t("disabled")} disabled />
    </div>
  );
}

function CardPreview() {
  const t = useTranslations("designSystemPage.previews.primitives");
  return (
    <Card className="mx-auto w-full max-w-xs">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{t("cardTitle")}</CardTitle>
        <CardDescription>{t("cardDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{t("contentGoesHere")}</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline">
          {t("action")}
        </Button>
      </CardFooter>
    </Card>
  );
}

function SeparatorPreview() {
  const t = useTranslations("designSystemPage.previews.primitives");
  return (
    <div className="mx-auto w-full max-w-xs space-y-3 text-center text-sm">
      <p className="text-muted-foreground">{t("sectionA")}</p>
      <Separator />
      <p className="text-muted-foreground">{t("sectionB")}</p>
      <Separator />
      <p className="text-muted-foreground">{t("sectionC")}</p>
    </div>
  );
}

function TabsPreview() {
  const t = useTranslations("designSystemPage.previews.primitives");
  return (
    <Tabs defaultValue="preview" className="mx-auto w-full max-w-sm">
      <TabsList className="w-full">
        <TabsTrigger value="preview" className="flex-1">
          {t("preview")}
        </TabsTrigger>
        <TabsTrigger value="code" className="flex-1">
          {t("code")}
        </TabsTrigger>
        <TabsTrigger value="docs" className="flex-1">
          {t("docs")}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        className="rounded-lg border p-4 text-center text-sm text-muted-foreground"
      >
        {t("previewContent")}
      </TabsContent>
      <TabsContent
        value="code"
        className="rounded-lg border p-4 text-center text-sm text-muted-foreground"
      >
        {t("codeContent")}
      </TabsContent>
      <TabsContent
        value="docs"
        className="rounded-lg border p-4 text-center text-sm text-muted-foreground"
      >
        {t("docsContent")}
      </TabsContent>
    </Tabs>
  );
}

export const primitivePreviews: Record<
  string,
  { preview: ReactNode; code: string }
> = {
  button: {
    preview: <ButtonPreview />,
    code: `<Button>Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

{/* Sizes */}
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`,
  },
  badge: {
    preview: <BadgePreview />,
    code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,
  },
  input: {
    preview: <InputPreview />,
    code: `<Input placeholder="Type something..." />
<Input placeholder="Disabled" disabled />`,
  },
  card: {
    preview: <CardPreview />,
    code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button size="sm" variant="outline">Action</Button>
  </CardFooter>
</Card>`,
  },
  separator: {
    preview: <SeparatorPreview />,
    code: `<p>Section A</p>
<Separator />
<p>Section B</p>`,
  },
  tabs: {
    preview: <TabsPreview />,
    code: `<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">
    Preview content
  </TabsContent>
  <TabsContent value="code">
    Code content
  </TabsContent>
</Tabs>`,
  },
};
