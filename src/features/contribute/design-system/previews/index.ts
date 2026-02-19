import type { ComponentType, ReactNode } from "react";

import { contentPreviews } from "./content";
import { feedbackPreviews } from "./feedback";
import { layoutPreviews } from "./layout";
import { navigationPreviews } from "./navigation";
import { primitivePreviews } from "./primitives";

export type PreviewData = {
  preview: ReactNode | ComponentType;
  code: string;
};

export const previewMap: Record<string, Record<string, PreviewData>> = {
  primitives: primitivePreviews,
  layout: layoutPreviews,
  feedback: feedbackPreviews,
  navigation: navigationPreviews,
  contentComponents: contentPreviews,
};
