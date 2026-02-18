"use client";

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

export const primitivePreviews: Record<
  string,
  { preview: ReactNode; code: string }
> = {
  button: {
    preview: (
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
    ),
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
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    ),
    code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,
  },

  input: {
    preview: (
      <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
        <Input placeholder="Type something..." />
        <Input placeholder="Disabled" disabled />
      </div>
    ),
    code: `<Input placeholder="Type something..." />
<Input placeholder="Disabled" disabled />`,
  },

  card: {
    preview: (
      <Card className="mx-auto w-full max-w-xs">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Content goes here.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline">
            Action
          </Button>
        </CardFooter>
      </Card>
    ),
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
    preview: (
      <div className="mx-auto w-full max-w-xs space-y-3 text-center text-sm">
        <p className="text-muted-foreground">Section A</p>
        <Separator />
        <p className="text-muted-foreground">Section B</p>
        <Separator />
        <p className="text-muted-foreground">Section C</p>
      </div>
    ),
    code: `<p>Section A</p>
<Separator />
<p>Section B</p>`,
  },

  tabs: {
    preview: (
      <Tabs defaultValue="preview" className="mx-auto w-full max-w-sm">
        <TabsList className="w-full">
          <TabsTrigger value="preview" className="flex-1">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="flex-1">
            Code
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex-1">
            Docs
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="preview"
          className="rounded-lg border p-4 text-center text-sm text-muted-foreground"
        >
          Preview content
        </TabsContent>
        <TabsContent
          value="code"
          className="rounded-lg border p-4 text-center text-sm text-muted-foreground"
        >
          Code content
        </TabsContent>
        <TabsContent
          value="docs"
          className="rounded-lg border p-4 text-center text-sm text-muted-foreground"
        >
          Docs content
        </TabsContent>
      </Tabs>
    ),
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
